/* ===== p16：延遲後果、戀愛新路線、NPC 人生目標、設定（深色／字級／存檔匯出入）、提示 ===== */
function toast(t){try{let e=document.getElementById('toast');if(!e){e=document.createElement('div');e.id='toast';e.style.cssText='position:fixed;top:12px;left:50%;transform:translateX(-50%);background:#111;color:#fff;padding:10px 14px;border-radius:12px;font-size:14px;z-index:99;opacity:0;transition:opacity .3s;max-width:90%;pointer-events:none';document.body.appendChild(e)}
 e.textContent=t;e.style.opacity=1;clearTimeout(e._t);e._t=setTimeout(()=>{e.style.opacity=0},2600)}catch(x){}}

/* ---- 延遲後果：以可序列化資料記錄，幾年後觸發 ---- */
function later(k,type,arg){S.dl=S.dl||[];S.dl.push({at:S.age+k,type,arg})}
const DLH={
 foe:a=>{if(S.job&&!S.job.founder){S.job.perf=cl(S.job.perf-8);S.stress=cl(S.stress+5);log(`【後果】先前得罪的${a}如今成了你的主管，處處為難你。`,'bad')}},
 favor:a=>{S.refer=1;chg('happy',3);S.net=cl(S.net+3);log(`【後果】${a||'某位同事'}想起你當年的幫忙，主動介紹了一個機會（今年求職機率提高）。`,'good')},
 gossip:()=>{const p=S.partner;if(p){p.tru=cl(((p.tru==null)?50:p.tru)-6);log(`【後果】先前的風聲傳到了${p.n}耳中，信任下降。`,'bad')}},
 soften:()=>{S.mom.rel=cl(S.mom.rel+15);S.dad.rel=cl(S.dad.rel+15);chg('happy',5);log('【後果】經過這些年，家人逐漸接納了真實的你。','good')},
 scar:()=>{S.stress=cl(S.stress+8);chg('happy',-4);log('【後果】年少時被排擠的陰影在壓力大時浮現。','bad')},
 invest:a=>{const r=Math.random(),m=r<.35?0:r<.75?1.2:R(25,40)/10;const v=Math.round(a.amt*m);S.money+=v;
  const f=S.friends.find(x=>x.n===a.n);if(f){f.rel=cl(f.rel+(m===0?-6:8))}
  log(m===0?`【後果】${a.n}的事業失敗，你投資的 ${money(a.amt)} 血本無歸。`:`【後果】${a.n}的事業${m>=2.5?'大成功':'站穩腳步'}，你的投資回收 ${money(v)}。`,m===0?'bad':'good')},
 pup:()=>{const p=S.partner;if(p&&p.inc){p.inc=Math.round(p.inc*1.2);log(`【後果】${p.n}進修完成，收入提高了。`,'good')}},
 pbiz:()=>{const p=S.partner;if(!p||!p.inc)return;if(chance(.5)){p.inc=Math.round(p.inc*1.6);log(`【後果】${p.n}的創業站穩腳步，收入大幅提高。`,'good')}else{p.inc=Math.round(p.inc*.8);log(`【後果】${p.n}的創業失敗，回頭找工作，收入略降。`,'bad')}},
 back:a=>{const f=S.friends.find(x=>x.n===a);if(f){f.rel=cl(f.rel+8);f.job=pick(JL);log(`【後果】${a}學成歸來，帶著新的工作回到你身邊。`,'good')}}
};
function dlYear(){
 if(!S.dl||!S.dl.length)return;const keep=[];
 for(const d of S.dl){if(d.at>S.age){keep.push(d);continue}try{DLH[d.type]&&DLH[d.type](d.arg)}catch(e){}}
 S.dl=keep;
}

/* ---- 新戀愛路線 ---- */
const compatSx=sx=>S.ori==='雙性戀'||(S.ori==='異性戀'&&sx!==S.sx)||(S.ori==='同性戀'&&sx===S.sx);
E.push(
{id:'rask',min:16,max:70,w:4,if:()=>!S.partner&&S.crush.some(c=>c.aff>=40),run:()=>{const c=S.crush.filter(x=>x.aff>=40)[0];const w=pick(['看電影','吃飯','散步','逛書展']);
 return {t:`${c.n}主動約你一起去${w}。`,c:[
  ch('欣然答應',()=>{c.aff=cl(c.aff+R(6,12));c.last=S.age;chg('happy',3);return G('你們度過了愉快的時光。')}),
  ch('帶朋友一起去',()=>{c.aff=cl(c.aff+R(2,5));c.last=S.age;return N('氣氛輕鬆，但少了點浪漫。')}),
  ch('婉拒',()=>{c.aff=cl(c.aff-R(3,8));return B('對方有點失落。')})]}}},
{id:'roffice',min:20,max:55,w:2.5,if:()=>S.job&&!S.job.founder&&S.crush.some(c=>c.aff>=50&&['公司','客戶端','同事介紹'].includes(c.src)),run:()=>{const c=S.crush.filter(x=>x.aff>=50&&['公司','客戶端','同事介紹'].includes(x.src))[0];
 return {t:`你和同事${c.n}的曖昧在公司裡傳開了。`,c:[
  ch('大方公開',()=>{c.aff=cl(c.aff+6);S.job.perf=cl(S.job.perf-3);S.stress=cl(S.stress+3);return N('有人祝福，也有人說閒話。')}),
  ch('低調保密',()=>{c.aff=cl(c.aff+2);return N('你們默默經營這段關係。')}),
  ch('保持距離，避免麻煩',()=>{c.aff=cl(c.aff-10);S.stress=cl(S.stress-2);return N('你選擇以工作為重。')})]}}},
{id:'rld',min:22,max:60,w:3,if:()=>!!(S.partner&&S.cn&&S.cn!=='TW'&&!S.partner.ld),run:()=>{const p=S.partner;p.ld=1;return {t:`你在${CNS[S.cn].n}生活，和${p.n}變成了遠距離。`,c:[
  ch('邀請對方一起生活（NT$150,000）',()=>{if(S.money<150000)return B('你的錢不夠。');S.money-=150000;if(chance(.7)){p.rel=cl(p.rel+8);p.abroad=1;return G(`${p.n}決定搬來和你一起生活。`)}p.rel=cl(p.rel-10);return B('對方不想離開熟悉的環境。')}),
  ch('維持遠距離',()=>{p.rel=cl(p.rel-6);p.tru=cl((p.tru==null?50:p.tru)-4);return N('時差和距離讓關係變得吃力。')}),
  ch('和平分手',()=>interact('partner','breakup'))]}}},
{id:'rfriend',min:18,max:60,w:2,if:()=>!S.partner&&S.friends.some(f=>f.sx&&!f.sib&&f.rel>=75&&(f.tru||0)>=70&&compatSx(f.sx)),run:()=>{const f=S.friends.filter(x=>x.sx&&!x.sib&&x.rel>=75&&(x.tru||0)>=70&&compatSx(x.sx))[0];
 return {t:`你發現自己對好友${f.n}的感覺正在改變…`,c:[
  ch('鼓起勇氣說出來',()=>{if(S.crush.length>=5)return N('你心儀的對象已經太多，先處理好手邊的關係。');
   if(chance(.6)){S.friends=S.friends.filter(x=>x!==f);S.crush.push({id:Date.now()%1e6+R(0,9999),n:f.n,sx:f.sx,a:R(0,ARCH.length-1),aff:60,ok:true,seen:{t:0,g:0,p:0,o:0},met:S.age,last:S.age,src:'朋友',st:0,tru:f.tru});return G(`${f.n}也有同樣的感覺！你們的關係進入了新階段。`)}
   f.rel=cl(f.rel-20);f.tru=cl(f.tru-10);return B('對方只把你當好朋友，友誼出現了裂痕。')}),
  ch('珍惜友情，維持現狀',()=>{f.tru=cl(f.tru+3);return N('你把這份心意藏在心裡。')})]}}},
{id:'rexcl',min:18,max:70,w:3,if:()=>S.ex&&S.ex.some(x=>!x.cl&&x.at!=null&&S.age-x.at<=2&&S.age>x.at),run:()=>{const x=S.ex.find(q=>!q.cl&&q.at!=null&&S.age-q.at<=2&&S.age>q.at);
 return {t:`分手後，你偶爾還是會想起${x.n}。`,c:[
  ch('完全封鎖，往前走',()=>{x.cl=1;S.stress=cl(S.stress-4);return N('你把聯絡方式都刪了。')}),
  ch('和平地成為朋友',()=>{x.cl=1;if(S.friends.length<14)S.friends.push({n:x.n,rel:45,tru:50,kind:'前任',tr:pick(FTR),loan:0,sx:x.sx});return N('你們約定做普通朋友。')}),
  ch('寫一封告別信',()=>{x.cl=1;chg('happy',-2);S.stress=cl(S.stress-6);return N('寫完之後，你感覺輕鬆了一些。')})]}}}
);

/* ---- NPC 人生目標：朋友與伴侶 ---- */
const FGOAL=[{k:'創業',t:'想創業'},{k:'出國進修',t:'打算出國進修'},{k:'考證照',t:'準備考專業證照'},{k:'轉職',t:'想換一份工作'},{k:'買房',t:'打算買房'}];
E.push(
{id:'farc',min:22,max:70,w:2.5,if:()=>S.friends.some(f=>!f.sib&&(f.rel||0)>=45),run:()=>{const f=pick(S.friends.filter(x=>!x.sib&&x.rel>=45)),g=pick(FGOAL);
 if(g.k==='創業'){const amt=Math.max(100000,Math.round(sal()*.3));return {t:`${f.n}（${f.job||'上班族'}）${g.t}，想聽聽你的意見。`,c:[
  ch(`投資 ${money(amt)}`,()=>{if(S.money<amt)return B('你的錢不夠。');S.money-=amt;f.rel=cl(f.rel+6);later(R(3,6),'invest',{n:f.n,amt});return N('你決定押注在朋友身上。')}),
  ch('鼓勵但不出錢',()=>{f.rel=cl(f.rel+4);return N('對方很感謝你的支持。')}),
  ch('勸對方別冒險',()=>{f.rel=cl(f.rel-3);f.tru=cl((f.tru||50)+2);return N('對方若有所思。')})]}}
 return {t:`${f.n}${g.t}，想聽聽你的意見。`,c:[
  ch('全力支持',()=>{f.rel=cl(f.rel+5);if(g.k==='出國進修')later(R(2,4),'back',f.n);return G('你的支持讓對方更有信心。')}),
  ch('提醒對方評估風險',()=>{f.tru=cl((f.tru||50)+3);return N('對方覺得你很務實。')})]}}},
{id:'parc',min:24,max:60,w:2,if:()=>!!(S.partner&&(S.partner.married||S.partner.cohab)&&S.partner.inc&&!S.partner.arc),run:()=>{const p=S.partner,k=pick(['進修','創業','換工作','移居']);p.arc=1;
 if(k==='進修')return {t:`${p.n}想${k}，需要學費與時間。`,c:[
  ch('支持（NT$300,000）',()=>{if(S.money<300000)return B('你的錢不夠。');S.money-=300000;p.rel=cl(p.rel+6);later(R(2,3),'pup');return G('你出錢出力，對方充滿幹勁。')}),
  ch('希望對方先穩定工作',()=>{p.rel=cl(p.rel-8);p.tru=cl((p.tru==null?50:p.tru)-4);return B('對方覺得不被支持。')})]};
 if(k==='創業')return {t:`${p.n}想${k}，需要不少資金。`,c:[
  ch('出資支持（NT$800,000）',()=>{if(S.money<800000)return B('你的錢不夠。');S.money-=800000;p.rel=cl(p.rel+8);later(R(2,5),'pbiz');return N('你們一起承擔風險。')}),
  ch('反對，風險太高',()=>{p.rel=cl(p.rel-10);p.tru=cl((p.tru==null?50:p.tru)-5);return B('對方有些失望。')})]};
 if(k==='換工作')return {t:`${p.n}想${k}，但薪水可能暫時下降。`,c:[
  ch('支持並一起規劃',()=>{p.rel=cl(p.rel+5);if(chance(.6))p.inc=Math.round(p.inc*1.08);return G('對方順利轉職。')}),
  ch('勸對方不要冒險',()=>{p.rel=cl(p.rel-4);return N('對方勉強同意。')})]};
 return {t:`${p.n}想要${k}到另一個城市發展。`,c:[
  ch('一起搬家（NT$150,000）',()=>{if(S.money<150000)return B('你的錢不夠。');S.money-=150000;p.rel=cl(p.rel+8);S.stress=cl(S.stress+4);return N('你們重新適應新的生活圈。')}),
  ch('遠距離支持',()=>{p.rel=cl(p.rel-8);return N('距離讓感情有點吃力。')}),
  ch('不同意',()=>{p.rel=cl(p.rel-12);p.tru=cl((p.tru==null?50:p.tru)-6);return B('對方放棄了計畫，但很失落。')})]}}}
);
const _relYear3=relYear;
relYear=function(){_relYear3();try{dlYear()}catch(e){}};

/* ---- 設定：主題、字級、存檔匯出匯入 ---- */
const PREFK='lifesim_tw_pref';
function applyPref(){
 const p=lsGet(PREFK,{th:'auto',fs:1});
 try{const dk=p.th==='dark'||(p.th==='auto'&&typeof matchMedia==='function'&&matchMedia('(prefers-color-scheme:dark)').matches);
  document.documentElement.classList.toggle('dark',!!dk);document.body.style.zoom=[.92,1,1.12][p.fs==null?1:p.fs]}catch(e){}
}
applyPref();
function expAll(){
 const o={v:1,t:Date.now(),slots:[0,1,2].map(i=>{try{return localStorage.getItem(slotKey(i))}catch(e){return null}}),ach:lsGet(ACHK,{}),end:lsGet(ENDK,{}),rom:lsGet(ROMK,{}),pref:lsGet(PREFK,{})};
 return JSON.stringify(o);
}
function impAll(txt){
 let o;try{o=JSON.parse(txt)}catch(e){return B('格式錯誤，請貼上完整的匯出文字。')}
 if(!o||o.v!==1||!Array.isArray(o.slots))return B('這不是人生模擬器的存檔。');
 let n=0;o.slots.forEach((s,i)=>{if(s){try{const q=JSON.parse(s);if(q&&q.age!=null){localStorage.setItem(slotKey(i),s);n++}}catch(e){}}});
 const mg=(k,v)=>{lsSet(k,Object.assign({},lsGet(k,{}),v||{}))};mg(ACHK,o.ach);mg(ENDK,o.end);mg(ROMK,o.rom);
 return G(`已匯入 ${n} 個存檔與成就紀錄。請按「回到標題畫面」選擇存檔。`)
}
function setHTML(){
 const p=lsGet(PREFK,{th:'auto',fs:1}),sg=(k,arr,cur)=>`<div class="seg" style="margin:6px 0">${arr.map(([v,t])=>`<button class="${cur===v?'on':''}" data-a="lf:set:${k}:${v}">${t}</button>`).join('')}</div>`;
 return `<h3>⚙️ 設定</h3><div class="sec">外觀</div>${sg('th',[['auto','自動'],['light','淺色'],['dark','深色']],p.th)}<div class="sec">字級</div>${sg('fs',[['0','小'],['1','標準'],['2','大']],String(p.fs==null?1:p.fs))}
 <div class="sec">存檔匯出／匯入</div><p class="sub">瀏覽器的存檔只存在這個裝置。換手機時，先在舊裝置按「複製存檔」，再到新裝置貼上匯入。</p>
 <button class="btn" data-a="lf:set:copy">📋 複製存檔文字</button>
 <textarea id="impbox" rows="4" style="width:100%;border:1px solid var(--line);border-radius:10px;padding:8px;font-size:13px" placeholder="在這裡貼上匯出的存檔文字"></textarea>
 <button class="btn" data-a="lf:set:imp">📥 匯入存檔</button><button class="btn" data-a="lf:set:title">🏠 回到標題畫面</button><button class="btn" data-a="back">← 返回</button>`;
}
const _lfh2=lfHandle;
lfHandle=function(x,y,z){
 if(x==='set'){
  if(y==='th'||y==='fs'){const p=lsGet(PREFK,{th:'auto',fs:1});if(y==='th')p.th=z;else p.fs=+z;lsSet(PREFK,p);applyPref();return null}
  if(y==='copy'){try{navigator.clipboard.writeText(expAll());return G('已複製，請貼到安全的地方保存。')}catch(e){return B('瀏覽器不允許自動複製，請改用長按文字框複製。')}}
  if(y==='imp'){let t='';try{t=document.getElementById('impbox').value}catch(e){}return impAll(t)}
  if(y==='title'){try{save()}catch(e){}$('sheet').classList.remove('on');showStart();return null}
  return null}
 return _lfh2(x,y,z);
};
const _life2=lifeHTML;
lifeHTML=function(){if(view.lsub==='set')return setHTML();return _life2()};
const _more2=moreHTML;
moreHTML=function(){return _more2().replace('<button class="tile" data-a="lf:help">',`<button class="tile" data-a="lf:set"><b>⚙️</b>設定<small>深色・字級・存檔匯出</small></button><button class="tile" data-a="lf:help">`)};
