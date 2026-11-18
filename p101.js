// 簡單模式、下一個目標、選項標籤、財務總覽、回饋、人生故事、無障礙
const SIMPLE_UNLOCK=[['財務與職涯',15],['人生記錄',18],['世界',18]];
const _mh101=moreHTML;
moreHTML=function(){
 let h=_mh101();
 try{
  const p=lsGet(PREFK,{});if(p.simple===false||!S)return h;
  const age=S.age||0,box=document.createElement('div');box.innerHTML=h;
  [...box.querySelectorAll('.sec')].forEach(sec=>{
   const t=(sec.textContent||'').trim();
   for(const [n,a] of SIMPLE_UNLOCK){if(t.indexOf(n)===0&&age<a){const g=sec.nextElementSibling;if(g&&g.classList.contains('grid'))g.remove();sec.remove();break}}
  });
  const hint=age<18?`<div class="sub" style="margin:8px 0">簡單模式：更多功能會隨年齡解鎖（15 歲財務、18 歲人生記錄與世界）。可在設定關閉。</div>`:'';
  return box.innerHTML+hint;
 }catch(e){return h}
};
const _sh101=setHTML;
setHTML=function(){
 const p=lsGet(PREFK,{}),on=p.simple!==false;
 return _sh101().replace('<div class="sec">存檔匯出／匯入</div>',`<div class="sec">簡單模式（依年齡逐步解鎖功能）</div><div class="seg" style="margin:6px 0"><button class="${on?'on':''}" data-a="lf:set:simple:1">開</button><button class="${on?'':'on'}" data-a="lf:set:simple:0">關</button></div><div class="sec">存檔匯出／匯入</div>`)+`<button class="btn" data-a="lf:set:fbk">回饋統計（只存在你的手機）</button>`;
};
/* 下一個目標 */
function nextGoal(){
 try{
  const nw=netWorth(),age=S.age,c=[];
  const ms=[1e6,5e6,1e7,3e7,5e7,1e8,3e8,5e8,1e9,5e9];const m=ms.find(x=>x>nw);
  if(m&&nw>m*.1)c.push([ (m-nw)/m, `淨資產離 ${money(m)} 還差 ${money(m-nw)}`]);
  if(age<65&&age>=30)c.push([.5,`距離 65 歲退休還有 ${65-age} 年`]);
  if(age<18)c.push([.2,`${18-age} 年後成年`]);
  if(S.cn==='TW'||S.cn){const y=calYear();if(age>=20&&age<23)c.push([.4,`${23-age} 年後可以參選里長或議員`]);
   else if(age>=23&&age<26)c.push([.6,`${26-age} 年後可以參選立委`])}
  if(S.kids&&S.kids.length){const k=S.kids.filter(x=>x.age<18).sort((a,b)=>b.age-a.age)[0];if(k)c.push([.3,`${k.n}再 ${18-k.age} 年成年`])}
  if(S.pol&&S.pol.office)c.push([.1,`任期到 ${S.pol.office.end} 年`]);
  if(!c.length)return '';
  c.sort((a,b)=>a[0]-b[0]);return c[0][1];
 }catch(e){return ''}
}
const _r101=render;
render=function(){
 _r101();
 try{
  if(!S||S.dead)return;const el=$('stats');if(!el||!el.insertAdjacentHTML)return;
  const g=nextGoal();document.querySelectorAll('.goal101').forEach(x=>x.remove());
  if(g)el.insertAdjacentHTML('beforeend',`<div class="goal101" style="grid-column:1/-1;font-size:12px;color:var(--acc);margin-top:2px">下一個目標：${esc(g)}</div>`);
 }catch(e){}
};
/* 選項標籤 */
const TG101={};
function tagsOf(l,f){
 const t=[],s=String(f||'');
 if(/S\.money\s*-=|S\.money=S\.money-|money-=/.test(s)||/NT\$|花|出錢|資助|捐/.test(l))t.push('花錢');
 if(/chance\(|Math\.random\(\)/.test(s)||/賭|冒險|隱瞞|護航|投資/.test(l))t.push('有風險');
 if(/\.rel\s*=\s*cl\(|\.rel\s*[+-]=|rel\+|rel-/.test(s)&&!/S\.mom|S\.dad/.test(s.slice(0,0)))t.push('影響關係');
 if(/S\.job/.test(s)&&/null|perf/.test(s))t.push('影響工作');
 return t.slice(0,2);
}
E.forEach(e=>{const r=e.run;if(typeof r!=='function'||r.__t)return;const w=function(){const o=r.apply(this,arguments);try{if(o&&o.c)o.c.forEach(c=>{TG101[c.l]=tagsOf(c.l,c.f)})}catch(x){}return o};w.__t=1;e.run=w});
(function(){try{const st=document.createElement('style');st.textContent='.tg101{display:inline-block;font-size:10.5px;margin-left:6px;padding:1px 7px;border-radius:999px;background:color-mix(in srgb,var(--acc) 14%,transparent);color:var(--acc);vertical-align:middle;white-space:nowrap}';document.head.appendChild(st)}catch(e){}})();
const _ak101=ask;
ask=function(text,labels,cb){
 const r=_ak101(text,labels,cb);
 try{
  const mb=document.getElementById('modalBody');if(!mb||!mb.querySelectorAll||!Array.isArray(labels))return r;
  mb.querySelectorAll('button.btn[data-i]').forEach(b=>{
   const l=labels[+b.dataset.i],tg=TG101[l]||(typeof DSLT!=='undefined'?DSLT[l]:null);if(!tg||!tg.length||b.querySelector('.tg101'))return;
   b.insertAdjacentHTML('beforeend',tg.map(x=>`<span class="tg101">${x}</span>`).join(''));
  });
 }catch(e){}
 return r;
};
/* 財務總覽 */
const _ah101=astHTML;
astHTML=function(){
 const h=_ah101();
 try{
  if(view.pjOn)return h;
  const bank=typeof bkTotal==='function'?bkTotal():0,pf=typeof pfSum==='function'?pfSum():0;
  const re=(S.house?S.house.value-(S.mort?S.mort.left:0):0)+(S.props?S.props.reduce((a,p)=>a+p.value-(p.mort?p.mort.left:0),0):0);
  const co=typeof stake==='function'?stake(S.co):0,pj=typeof pjTotal==='function'?pjTotal():0,car=S.car?S.car.value:0;
  const total=netWorth();
  const parts=[['現金與存款',S.money+bank,'#c0553a'],['投資組合',pf,'#4b7bec'],['房產（扣貸款）',re,'#2f9e6b'],['公司股權',co,'#a46be0'],['大型專案',pj,'#e0a33b'],['車輛',car,'#6c7a91']];
  const known=parts.reduce((a,x)=>a+x[1],0);parts.push(['其他資產',total-known,'#99a1ad']);
  const pos=parts.filter(x=>x[1]>0),sum=pos.reduce((a,x)=>a+x[1],0);
  if(sum<=0)return h;
  const bar=pos.map(x=>`<div style="flex:${x[1]};background:${x[2]};min-width:3px"></div>`).join('');
  const lg=pos.map(x=>`<div style="display:flex;align-items:center;gap:6px;font-size:12px"><span style="width:10px;height:10px;border-radius:3px;background:${x[2]};display:inline-block"></span>${x[0]}　${Math.round(x[1]/sum*100)}%　${money(x[1])}</div>`).join('');
  const rec=(S.log||[]).slice(-5).reduce((a,L)=>a+((L.d&&L.d.nw)||0),0);
  const card=`<div class="item"><b>財務總覽</b>　淨資產 ${money(total)}<div style="display:flex;height:12px;border-radius:6px;overflow:hidden;margin:8px 0">${bar}</div>${lg}<div class="sub" style="margin-top:6px">近 5 年淨資產變化：${rec>=0?'+':''}${money(rec)}</div></div>`;
  const i=h.indexOf('</h3>');return i<0?card+h:h.slice(0,i+5)+card+h.slice(i+5);
 }catch(e){return h}
};
/* 回饋統計 */
const FBK='lifesim_fb_v1';
function fbAdd(k){const o=lsGet(FBK,{});o[k]=(o[k]||0)+1;lsSet(FBK,o)}
const _se101=showEnd;
showEnd=function(){
 _se101();
 try{
  const mb=document.getElementById('modalBody');if(!mb||!mb.insertAdjacentHTML)return;
  mb.insertAdjacentHTML('beforeend',`<div class="sec op">這局感覺如何？（選填，只存在你的手機）</div><div class="seg" id="fb101">${[['fun','很有趣'],['busy','太亂'],['hard','太難'],['easy','太簡單']].map(x=>`<button data-fb="${x[0]}">${x[1]}</button>`).join('')}</div><button class="btn" id="story101">產生人生故事</button>`);
  mb.querySelectorAll('[data-fb]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();fbAdd(b.dataset.fb);b.classList.add('on');b.textContent+=' ✓'}));
  const sb=document.getElementById('story101');if(sb)sb.addEventListener('click',e=>{e.stopPropagation();showStory()});
 }catch(e){}
};
/* 人生故事 */
function lifeStory(){
 const by=calYear()-S.age,cn=(S.cn&&CNS[S.cn])?CNS[S.cn].n:'台灣';
 let t=`${S.name}，${by} 年出生，一生主要在${cn}度過${(S.gen||1)>1?`，是家族的第 ${S.gen} 代`:''}。最高學歷${EDU[S.edu]||'—'}。`;
 const ev=[];
 for(const L of S.log||[]){const ls=(L.lines||[]).filter(x=>TLKEY.test(x.t||'')&&!/成就解鎖/.test(x.t||''));if(ls.length)ev.push(`${L.age} 歲，${ls[0].t}`)}
 const pick8=ev.length>8?ev.filter((_,i)=>i%Math.ceil(ev.length/8)===0).slice(0,8):ev;
 if(pick8.length)t+='\n\n人生中的重要時刻：\n'+pick8.map(x=>'・'+x).join('\n');
 const gk=S.kids.reduce((a,k)=>a+(k.rm&&k.rm.gk?k.rm.gk.length:0),0);
 t+=`\n\n家庭：${S.partner&&S.partner.married?'與'+S.partner.n+'結為夫妻。':'沒有結婚。'}養育了 ${S.kids.length} 個孩子${gk?`，有 ${gk} 位孫子女`:''}。`;
 try{const h=(S.pol&&S.pol.hist)||[];const w=h.filter(x=>x.won);if(w.length)t+=`\n從政：曾 ${w.length} 次當選公職，最高為${PL(Math.max(...w.map(x=>x.lv))).n}。`}catch(e){}
 try{if(pjTotal()>0)t+=`\n投資：名下大型專案價值約 ${money(pjTotal())}。`}catch(e){}
 t+=`\n\n財富：離世時淨資產約 ${money(netWorth())}。`;
 t+=`\n結局：${endTitle().replace(/[^一-龥A-Za-z]/g,'')}，享年 ${S.age} 歲，死因${S.cause}。`;
 return t;
}
function showStory(){
 const t=lifeStory(),mb=document.getElementById('modalBody');if(!mb)return;
 mb.innerHTML=`<h3>人生故事</h3><div class="item" style="white-space:pre-wrap;line-height:1.7">${esc(t)}</div><button class="btn p" id="stCopy">複製文字</button><button class="btn" id="stBack">返回</button>`;
 document.getElementById('stCopy').onclick=()=>{try{navigator.clipboard.writeText(t);document.getElementById('stCopy').textContent='已複製'}catch(e){document.getElementById('stCopy').textContent='請長按文字複製'}};
 document.getElementById('stBack').onclick=()=>{showEnd()};
}
const _lf101=lfHandle;
lfHandle=function(x,y,z,u){
 if(x==='set'&&y==='simple'){const p=lsGet(PREFK,{});p.simple=z==='1';lsSet(PREFK,p);return null}
 if(x==='set'&&y==='fbk'){view.lsub='fbk';return null}
 return _lf101(x,y,z,u);
};
const _lh101=lifeHTML;
lifeHTML=function(){
 if(view.lsub==='fbk'){const o=lsGet(FBK,{}),n=k=>o[k]||0;return `<h3>回饋統計</h3><div class="sub">每局結束時按下的感受，只存在這支手機，用來看哪裡最需要調整。</div><div class="item">很有趣：<b>${n('fun')}</b>　太亂：<b>${n('busy')}</b>　太難：<b>${n('hard')}</b>　太簡單：<b>${n('easy')}</b></div><button class="btn" data-a="lf:set:legalx">← 返回設定</button>`}
 return _lh101();
};
/* 無障礙：標籤與狀態 */
(function(){
 try{
  const lab=()=>{
   document.querySelectorAll('button[data-a="close"],#modal .x').forEach(b=>{if(!b.getAttribute('aria-label'))b.setAttribute('aria-label','關閉')});
   document.querySelectorAll('#nav button,.nav button').forEach(b=>{if(!b.getAttribute('aria-label')&&b.textContent.trim())b.setAttribute('aria-label',b.textContent.trim())});
   document.querySelectorAll('.sec.cz,.yr>h4.yh,.cgh').forEach(h=>{h.setAttribute('role','button');h.setAttribute('tabindex','0');if(!h.dataset.kb){h.dataset.kb='1';h.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();h.click()}})}});
   document.querySelectorAll('.sec.cz').forEach(h=>h.setAttribute('aria-expanded',h.classList.contains('cl')?'false':'true'));
   document.querySelectorAll('svg.ic').forEach(s=>s.setAttribute('aria-hidden','true'));
  };
  new MutationObserver(()=>{clearTimeout(lab._t);lab._t=setTimeout(lab,200)}).observe(document.body,{childList:true,subtree:true});
 }catch(e){}
})();
