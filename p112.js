/* ---- p112：創作與作品、共用名氣、比賽、跨領域合作（遊戲設定；沿用才藝課程的程度）---- */
UITILE['lf:wk']='star';
const WKIND={mus:'音樂作品',dan:'編舞作品',cra:'美術作品',per:'作品',eat:'創意作品'};
const WKSP={sing:'單曲',piano:'鋼琴曲',guitar:'吉他曲',violin:'小提琴曲',drum:'節奏作品',paint:'畫作',calli:'書法作品',craft:'手作作品',cult:'文創設計',flower:'花藝作品',photo:'攝影集',film:'短片',write:'小說',act:'劇本演出',bake:'甜點作品',barista:'特調飲品',dance:'編舞',ballroom:'編舞'};
function wkInit(){if(!S.wk)S.wk=[];return S.wk}
function fmGet(){return Math.round(ckInit().fame||0)}
function fmAdd(n){const r=ckInit(),f=r.fame||0;r.fame=Math.max(0,Math.min(100,f+(n>0?n*(1-f/120):n)))}
function fmLabel(){const f=fmGet();return f>=70?'名人':f>=40?'知名':f>=15?'小有名氣':'無名'}
function wkArts(){return Object.keys(S.art||{}).filter(k=>ARTALL[k]&&S.art[k]>=20&&k!=='cook'&&ARTALL[k].c!=='mar'&&k!=='chess')}
function wkUse(){S.acts=S.acts||{};S.acts.wk=(S.acts.wk||0)+1}
function wkLeft(){return 2-((S.acts&&S.acts.wk)||0)}
function wkClean(s,def){return String(s||'').replace(/[<>&"']/g,'').trim().slice(0,14)||def}
function wkCreate(id,title){
 const a=ARTALL[id];if(!a||!(S.art&&S.art[id]>=20))return B('這項才藝程度要 20 以上才能創作。');
 if(wkLeft()<=0)return B('今年創作的次數用完了（每年 2 次）。');
 if(wkInit().length>=30)return B('作品太多了，先整理一下（最多 30 件）。');
 const lv=S.art[id],q=Math.max(10,Math.min(100,Math.round(lv*.55+(S.smarts||50)*.12+R(0,26)))),kind=WKSP[id]||WKIND[a.c]||'作品';
 const t=wkClean(title,`${S.name[0]}的${kind}${wkInit().length+1}`);
 if(wkInit().some(w=>w.t===t))return B('已經有同名的作品了。');
 wkUse();wkInit().push({id:'w'+Date.now().toString(36)+R(0,99),art:id,k:kind,t,q,y:calYear(),sold:0});
 S.art[id]=Math.min(100,lv+1);const inc=Math.round(q*q*6*ckF()),f=Math.pow(q/100,2)*5;S.money+=inc;fmAdd(f);chg('happy',3+Math.round(q/30));
 const m=`你完成了${kind}「${t}」（水準 ${q}），發表後收入 ${money(inc)}，知名度 +${f.toFixed(1)}。`;log(m,q>=60?'good':'');return q>=60?G(m):N(m);
}
function wkCollab(a,b,title){
 if(a===b)return B('請選兩項不同的領域。');
 const get=id=>id==='cook'?(ckInit().sk||0):(S.art&&S.art[id])||0;
 if(get(a)<30||get(b)<30)return B('兩個領域的程度都要 30 以上。');
 if(wkLeft()<=0)return B('今年創作的次數用完了。');
 const nm=id=>id==='cook'?'料理':ARTALL[id]?ARTALL[id].n:id;
 const q=Math.max(15,Math.min(100,Math.round((get(a)+get(b))*.3+(S.smarts||50)*.1+R(5,28)))),t=wkClean(title,`${nm(a)}×${nm(b)}聯名企劃`);
 if(wkInit().some(w=>w.t===t))return B('已經有同名的作品了。');
 wkUse();wkInit().push({id:'w'+Date.now().toString(36)+R(0,99),art:a,k:'跨界合作',t,q,y:calYear(),sold:0,co:b});
 const inc=Math.round(q*q*8*ckF()),f=Math.pow(q/100,2)*7;S.money+=inc;fmAdd(f);chg('happy',5);
 const m=`你把${nm(a)}和${nm(b)}結合，推出「${t}」（水準 ${q}），收入 ${money(inc)}，知名度 +${f.toFixed(1)}。`;log(m,'good');return G(m);
}
function wkContest(id){
 const a=ARTALL[id];if(!a||!(S.art&&S.art[id]>=15))return B('這項才藝程度要 15 以上才能報名。');
 if(S.acts&&S.acts.wkc)return B('今年已經參加過比賽了。');S.acts=S.acts||{};S.acts.wkc=1;
 const best=wkInit().filter(w=>w.art===id).sort((x,y)=>y.q-x.q)[0],p=Math.max(.05,Math.min(.65,S.art[id]/160+(best?best.q/400:0)+fmGet()/500));
 if(Math.random()<p){const pz=Math.round(40000*(1+S.art[id]/50)*ckF());S.money+=pz;fmAdd(2);S.art[id]=Math.min(100,S.art[id]+2);chg('happy',8);const m=`你參加${a.n}比賽拿到名次，獎金 ${money(pz)}，知名度小幅上升。`;log(m,'good');return G(m)}
 S.art[id]=Math.min(100,S.art[id]+1);chg('happy',-2);return N(`你參加了${a.n}比賽，沒有得名，但學到很多。`);
}
function wkHTML(){
 const arts=wkArts(),W=wkInit(),all=Object.keys(S.art||{}).filter(k=>ARTALL[k]&&S.art[k]>=15);
 let h=`<h3>創作與作品</h3><div class="item"><b>知名度 ${fmGet()}（${fmLabel()}）</b>・作品 ${W.length} 件<div class="sub">今年還能創作 ${wkLeft()} 次${S.acts&&S.acts.wkc?'・比賽已報名':'・可報名 1 場比賽'}。知名度與食譜系統共用。</div></div>`;
 if(!all.length&&!ckInit().sk)return h+'<div class="sub">先到「才藝與課程」學一門才藝（程度 20 以上才能創作）。</div><button class="btn" data-a="back">← 返回</button>';
 if(arts.length){
  h+='<div class="sec op">創作</div><div class="frm"><label for="wk_a">才藝</label><select id="wk_a">'+arts.map(k=>`<option value="${k}">${esc(ARTALL[k].n)}（${S.art[k]}）</option>`).join('')+`</select><label for="wk_t">作品名稱（可留空）</label><input id="wk_t" type="text" maxlength="14" placeholder="例如：夏天的雨"><div class="acts"><button class="btn p" data-a="frmgo:wkc:c">創作並發表</button></div></div>`;
 }
 const co=[...arts.map(k=>[k,ARTALL[k].n]),...(ckInit().sk>=30?[['cook','料理']]:[])];
 if(co.length>=2)h+='<div class="sec op">跨界合作</div><div class="frm"><label for="wk_x">領域一</label><select id="wk_x">'+co.map(x=>`<option value="${x[0]}">${esc(x[1])}</option>`).join('')+'</select><label for="wk_y">領域二</label><select id="wk_y">'+co.map((x,i)=>`<option value="${x[0]}" ${i===1?'selected':''}>${esc(x[1])}</option>`).join('')+`</select><label for="wk_z">企劃名稱（可留空）</label><input id="wk_z" type="text" maxlength="14"><div class="acts"><button class="btn p" data-a="frmgo:wkc:x">合作推出</button></div></div>`;
 if(all.length)h+='<div class="sec op">比賽</div><div class="frm"><label for="wk_c">參賽項目</label><select id="wk_c">'+all.map(k=>`<option value="${k}">${esc(ARTALL[k].n)}（${S.art[k]}）</option>`).join('')+`</select><div class="acts"><button class="btn p" data-a="frmgo:wkc:g">報名參賽</button></div></div>`;
 if(W.length)h+='<div class="sec">我的作品</div>'+W.slice().reverse().slice(0,20).map(w=>`<div class="item"><b>${esc(w.t)}</b>${w.fam?'（家傳）':''}<div class="sub">${esc(w.k)}・水準 ${w.q}・${w.y} 年</div></div>`).join('');
 return h+'<button class="btn" data-a="back">← 返回</button>';
}
const _lh112=lifeHTML;
lifeHTML=function(){if(view.lsub==='wk')return wkHTML();return _lh112()};
const _lf112=lfHandle;
lfHandle=function(x,y,z,u){if(x==='wk'){view.lsub='wk';return null}return _lf112(x,y,z,u)};
const _mh112=moreHTML;
moreHTML=function(){
 const h=_mh112(),t='<button class="tile" data-a="lf:wk"><b>創</b>創作與作品<small>創作・合作・比賽・知名度</small></button>',m=h.match(/<button class="tile"[^>]*data-a="lf:cook"[^>]*>[\s\S]*?<\/button>/);
 return m?h.replace(m[0],m[0]+t):h+t;
};
const _hd112=handle;
handle=function(a){
 if(typeof a==='string'&&a.startsWith('frmgo:wkc:')){
  const x=a.split(':')[2],v=i=>{try{return document.getElementById(i).value}catch(e){return ''}};
  const m=x==='c'?wkCreate(v('wk_a'),v('wk_t')):x==='x'?wkCollab(v('wk_x'),v('wk_y'),v('wk_z')):wkContest(v('wk_c'));
  view.msg=m;view.lsub='wk';render();try{showSheet('life')}catch(e){}return;
 }
 return _hd112(a);
};
/* 每年：版稅與代言、名氣衰退 */
const _y112=yearly;
yearly=function(){
 const r=_y112.apply(this,arguments);
 try{if(S&&!S.dead&&S.rcp&&S.rcp.fame>0)S.rcp.fame=Math.max(0,S.rcp.fame-S.rcp.fame/25)}catch(e){}
 try{if(S&&!S.dead&&S.wk&&S.wk.length){
  let roy=0;S.wk.forEach(w=>{if(w.q>=60){const age=calYear()-w.y,dec=Math.max(.2,1-age*.06);roy+=Math.round(w.q*w.q*.9*dec*ckF()*(w.fam?.3:1))}});
  if(roy>0){S.money+=roy;try{ldset('作品版稅')}catch(e){}try{ldset(null)}catch(e){}}
  const f=fmGet();if(f>=40&&S.age>=18){S.money+=Math.round(f*1500*ckF())}
  
 }}catch(e){}
 return r;
};
/* 事件 */
const wkEv=(id,min,max,w,cond,run)=>E.push({id,min,max,w,if:()=>{try{return cond()}catch(e){return false}},run});
const alv=ids=>Math.max(0,...ids.map(i=>(S.art&&S.art[i])||0));
wkEv('wk_gallery',20,80,3,()=>alv(['paint','photo','craft','calli','cult'])>=40,()=>({t:'一間小型藝廊邀請你辦聯展，希望你拿出幾件代表作。',c:[
 ch('接受邀請',()=>{const m=wkInit().sort((x,y)=>y.q-x.q)[0];const inc=Math.round(((m?m.q:40)*1200+20000)*ckF());S.money+=inc;fmAdd(5);chg('happy',6);return G(`展覽人潮不錯，賣出幾件作品，收入約 ${money(inc)}，知名度上升。`)}),
 ch('覺得時機未到',()=>N('你婉拒了，說下次準備好再說。'))]}));
wkEv('wk_publisher',20,80,3,()=>alv(['write'])>=40,()=>({t:'一位出版社編輯看過你的文字，問你有沒有興趣出書。',c:[
 ch('簽約出書',()=>{wkInit().push({id:'w'+Date.now().toString(36),art:'write',k:'小說',t:wkClean('',`${S.name[0]}的出版作品`),q:Math.min(100,Math.round(alv(['write'])*.7+R(5,25))),y:calYear(),sold:0});const inc=Math.round(80000*ckF());S.money+=inc;fmAdd(6);chg('happy',6);return G(`新書上市，預付版稅 ${money(inc)}，知名度上升。`)}),
 ch('再磨一磨',()=>N('你說想先把作品打磨得更好。'))]}));
wkEv('wk_band',16,45,3,()=>alv(['sing','guitar','drum','piano'])>=35,()=>({t:'朋友組了一個樂團，缺人，問你要不要加入。',c:[
 ch('加入樂團',()=>{fmAdd(3);chg('happy',6);S.stress=cl(S.stress-2);const k=['sing','guitar','drum','piano'].find(i=>S.art&&S.art[i]>=35);if(k)S.art[k]=Math.min(100,S.art[k]+3);return G('你們在小場地演出，雖然觀眾不多，卻很開心。')}),
 ch('婉拒',()=>N('你說自己更適合一個人玩音樂。'))]}));
wkEv('wk_scout',22,70,3,()=>fmGet()>=30,()=>({t:'經紀公司注意到你的名氣，想談談合作。',c:[
 ch('聽聽看條件',()=>{const inc=Math.round(100000*ckF());S.money+=inc;fmAdd(5);S.stress=cl(S.stress+4);return G(`合約談成，簽約金 ${money(inc)}，行程也跟著變滿。`)}),
 ch('保持自由，婉拒',()=>{chg('happy',2);return N('你覺得自由比較重要。')})]}));
wkEv('wk_copy',25,75,2,()=>wkInit().some(w=>w.q>=65),()=>{const w=pick(wkInit().filter(x=>x.q>=65));return {t:`你發現有人的作品和你的「${w.t}」很像，網路上有些人在討論。`,c:[
 ch('公開說明、保留證據',()=>{fmAdd(2);S.stress=cl(S.stress+3);return N('網友大多站在你這邊，事情慢慢平息了。')}),
 ch('不想爭，繼續創作',()=>{chg('happy',-1);return N('你把心思放回下一件作品。')})]}});
wkEv('wk_crossfood',20,80,3,()=>ckInit().sk>=30&&alv(['paint','photo','write','craft','cult'])>=30,()=>({t:'朋友提議：你會做菜又會創作，要不要合作辦一場「料理與藝術」小展？',c:[
 ch('一起辦',()=>{const m=wkCollab('cook',['paint','photo','write','craft','cult'].find(i=>S.art&&S.art[i]>=30)||'paint','');return m}),
 ch('下次吧',()=>N('你笑笑說，這個點子先放在心裡。'))]}));
/* 傳承與墓誌銘 */
const _as112=applySuccession;
applySuccession=function(r,k){
 const old=(S.wk||[]).map(w=>Object.assign({},w,{fam:1}));
 _as112.apply(this,arguments);
 try{if(old.length){S.wk=old;log(`你留下了 ${old.length} 件作品，版稅會持續給家人。`,'good')}}catch(e){}
};
const _ep112=epitaph;
epitaph=function(){let t=_ep112.apply(this,arguments);try{const w=(S.wk||[]).sort((a,b)=>b.q-a.q)[0];if(w&&w.q>=60&&t)t=t.replace(/。$/,`，代表作是「${w.t}」。`)}catch(e){}return t};
