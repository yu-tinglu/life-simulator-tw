/* ---- p126：存檔修復、才藝職涯成長線、年度摘要、長存檔效能 ---- */
/* 1. 舊存檔：補齊較新版本加入的欄位，避免 undefined／NaN */
const SV126=3;
function fix126(o){
 if(!o||typeof o!=='object'||o.sv>=SV126)return o;
 const d=(k,v)=>{if(o[k]==null)o[k]=v};
 d('flags',{});d('evc',{});d('gifts',[]);d('hist',[]);d('kids',[]);d('friends',[]);d('log',[]);d('acts',{});d('ap',4);d('nxd',{});d('nf',{});d('art',{});
 if(o.pf==null)o.pf={bond:0,tw:0,us:0,gold:0};
 ['health','happy','smarts','looks','stress'].forEach(k=>{if(typeof o[k]!=='number'||!isFinite(o[k]))o[k]=k==='stress'?20:50});
 if(typeof o.money!=='number'||!isFinite(o.money))o.money=0;
 o.sv=SV126;return o;
}
const _ls126=loadSave;
loadSave=function(){const o=_ls126.apply(this,arguments);try{return fix126(o)}catch(e){return o}};
/* 2. 才藝職涯成長線：各類才藝練到一定程度後，依階段出現發展機會 */
const AC126={
 mus:['音樂','登台演出','簽約發片','巡迴演出'],
 dan:['舞蹈','舞台演出','編舞與教學','大型舞團邀請'],
 mar:['武術與運動','校外賽事','教練資格','代表隊徵召'],
 cra:['創作','小型展出','個展或文創合作','策展人注意到你']
};
const ac126C=()=>{let b=null;for(const k of Object.keys(S.art||{})){const a=ARTALL[k];if(!a||!AC126[a.c])continue;if(!b||S.art[k]>b.v)b={c:a.c,v:S.art[k],n:a.n||k}}return b};
const ac126S=c=>{S.ac126=S.ac126||{};return S.ac126[c]||0};
const ac126U=c=>{S.ac126=S.ac126||{};S.ac126[c]=(S.ac126[c]||0)+1};
[[1,35,'你練了一段時間後，有人邀你上台。'],[2,55,'有經紀人或單位注意到你的實力，主動來談合作。'],[3,75,'一個更大的舞台向你招手，但需要你大量投入。']].forEach(([st,lv,txt])=>{
 E.push({id:'ac126_'+st,min:14,max:65,w:4,if:()=>{const a=ac126C();return a&&a.v>=lv&&ac126S(a.c)===st-1&&!S.jail&&!S.army},run:()=>{
  const a=ac126C(),nm=AC126[a.c][st],base=[0,8000,40000,150000][st];
  return {t:`${txt}（${a.n}・${nm}）`,c:[
   ch('全力以赴',()=>{S.stress=cl(S.stress+5);if(chance(.35+a.v/250)){ac126U(a.c);S.money+=Math.round(px(base));chg('happy',6);try{fmAdd(st)}catch(e){}return G(`${nm}很成功，你的名字開始被圈內人記得。`)}chg('happy',-2);return N('準備得不夠，這次沒有達到期待，但學到不少。')}),
   ch('輕鬆參與就好',()=>{if(chance(.2)){ac126U(a.c);S.money+=Math.round(px(base*.4));return G('沒想到反應不錯，機會還是留住了。')}chg('happy',2);return N('玩得開心，沒有太大的進展。')}),
   ch('婉拒，專心本業',()=>{chg('happy',-1);return N('你把時間留給現在的生活。')})]}}});
});
/* 3. 年度摘要：往年卡片標題顯示一句話；長存檔只畫最近 20 年 */
const _r126=render;
render=function(){
 let full=null;
 try{if(S&&S.log&&S.log.length>20&&!view.allLog){full=S.log;S.log=full.slice(-20)}}catch(e){}
 try{_r126.apply(this,arguments)}finally{if(full)S.log=full}
 try{
  const f=$('feed');if(!f||!f.querySelectorAll||!S)return;
  const yrs=[...f.querySelectorAll('.yr')];
  yrs.forEach((el,i)=>{
   if(i===yrs.length-1)return;const h4=el.querySelector('h4');if(!h4||h4.querySelector('.dg'))return;
   const ln=el.querySelector('.cgh + div .ln')||el.querySelector('.ln');if(!ln)return;
   const t=(ln.textContent||'').replace(/\s+/g,'').slice(0,16);
   h4.insertAdjacentHTML('beforeend',`<span class="dg" style="flex:1;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:12px;font-weight:400;color:var(--mute);margin:0 8px">${esc(t)}</span>`);
  });
  if(S.log&&S.log.length>20&&!view.allLog&&!f.querySelector('.more126')){
   const b=document.createElement('button');b.className='btn more126';b.textContent=`顯示更早的 ${S.log.length-20} 年`;b.onclick=()=>{view.allLog=1;render()};f.insertBefore(b,f.firstChild);
  }
 }catch(e){}
};
