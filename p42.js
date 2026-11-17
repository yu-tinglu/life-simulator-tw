/* ---- p42：國家圖鑑、挑戰模式與結局收集 ---- */
const DXK='lifesim_tw_dex_v1',CHK='lifesim_tw_chal_v1';
const dxGet=()=>lsGet(DXK,{});
function dxRec(){try{const d=dxGet();let ch=false;const add=k=>{if(k&&!d[k]){d[k]=S.age;ch=true}};add(S.cn||'TW');Object.keys(S.trav||{}).forEach(add);if(ch)lsSet(DXK,d);return Object.keys(d).length}catch(e){return 0}}
const _y42=yearly;yearly=function(){_y42();dxRec()};
ACH.push(['dx10','國家收集者（10 國）',()=>dxRec()>=10],['dx30','環遊世界（30 國）',()=>dxRec()>=30],['dx80','地球公民（80 國）',()=>dxRec()>=80]);
const CHAL={
 std:{n:'標準',d:'隨機家庭，一般難度',f:()=>{}},
 poor:{n:'赤貧起步',d:'清寒家庭，壓力大，從零奮鬥',f:()=>{S.fam='清寒';S.stress=Math.max(S.stress||0,35)}},
 rich:{n:'富二代',d:'富裕家庭，但家人期待很高',f:()=>{S.fam='富裕';S.stress=Math.max(S.stress||0,25)}},
 hard:{n:'逆境人生',d:'清寒家庭，健康與外貌偏低',f:()=>{S.fam='清寒';S.health=Math.min(S.health,60);S.looks=Math.min(S.looks,45)}},
 genius:{n:'天才但清寒',d:'智力很高，家境清寒',f:()=>{S.fam='清寒';S.smarts=Math.max(S.smarts,92)}}
};
function chalName(){return (CHAL[S&&S.chal]||CHAL.std).n}
/* 挑戰模式：開始畫面選擇 */
const _ng42=newGame;newGame=function(name,sx){_ng42(name,sx);S.chal=window.__chal||'std';try{(CHAL[S.chal]||CHAL.std).f()}catch(e){}};
if(typeof window==='undefined')globalThis.window=globalThis;
const _ss42=showStart;showStart=function(){_ss42();try{const b=$('startBody'),go=$('go');if(!b||!go||!b.insertAdjacentHTML)return;const sel=window.__chal||'std';
 const html=`<div class="sub" style="margin-top:10px">挑戰模式</div><div class="seg" id="cseg" style="flex-wrap:wrap">${Object.keys(CHAL).map(k=>`<button class="${k===sel?'on':''}" data-c="${k}">${CHAL[k].n}</button>`).join('')}</div><div class="sub" id="cdesc">${CHAL[sel].d}</div>`;
 go.insertAdjacentHTML('beforebegin',html);
 b.querySelectorAll('[data-c]').forEach(x=>x.onclick=()=>{window.__chal=x.dataset.c;b.querySelectorAll('[data-c]').forEach(y=>y.classList.toggle('on',y===x));$('cdesc').textContent=CHAL[x.dataset.c].d})}catch(e){}};
/* 圖鑑頁 */
function dxHTML(){
 const d=dxGet(),ks=Object.keys(CNS),n=Object.keys(d).filter(k=>CNS[k]).length,end=lsGet(ENDK,{}),ach=lsGet(ACHK,{});
 let h=`<h3>圖鑑與收集</h3><div class="sub">跨越所有人生累計。目前挑戰模式：${chalName()}</div>`;
 h+=`<div class="sec">國家圖鑑 ${n}／${ks.length}</div>${pbar(Math.round(n/ks.length*100))}`;
 const byR={};ks.forEach(k=>{const r=typeof regOf==='function'?regOf(k):'?';(byR[r]=byR[r]||[]).push(k)});
 Object.keys(byR).forEach(r=>{const v=byR[r].filter(k=>d[k]);h+=`<div class="sub"><b>${r}</b> ${v.length}／${byR[r].length}：${v.map(k=>esc(CNS[k].n||k)).join('、')||'尚未踏足'}</div>`});
 h+=`<div class="sec">結局收集 ${Object.keys(end).length} 種</div><div class="sub">${Object.keys(end).map(esc).join('、')||'尚無'}</div>`;
 h+=`<div class="sec">成就 ${Object.keys(ach).length}／${ACH.length}</div>`+ACH.map(a=>`<div class="ln ${ach[a[0]]?'good':''}">${ach[a[0]]?'已解鎖':'未解鎖'}　${esc(a[1])}${ach[a[0]]?`（${ach[a[0]]} 歲）`:''}</div>`).join('');
 return h+'<button class="btn" data-a="back">← 返回</button>';
}
const _lf42=lfHandle,_l42=lifeHTML,_m42=moreHTML;
lfHandle=function(x,y,z,u){if(x==='dx')return null;return _lf42(x,y,z,u)};
lifeHTML=function(){return view.lsub==='dx'?dxHTML():_l42()};
moreHTML=function(){return _m42().replace('<button class="tile" data-a="lf:health">','<button class="tile" data-a="lf:dx"><b>鑑</b>圖鑑與收集<small>國家・結局・成就</small></button><button class="tile" data-a="lf:health">')};
