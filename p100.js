// 首頁提示收合、只看重點、搜尋歷史、舊紀錄壓縮
(function(){
 try{const st=document.createElement('style');st.textContent='.hbadge{grid-column:1/-1;display:inline-flex;align-items:center;gap:6px;font-size:12.5px;padding:6px 12px;border-radius:999px;background:color-mix(in srgb,var(--acc) 12%,var(--card));color:var(--acc);cursor:pointer;width:fit-content;margin-top:2px}.hbadge+span,.hint.hc span{display:none}.hint.ho span{display:block}.fbar{display:flex;gap:8px;align-items:center;margin:6px 0;font-size:12px;color:var(--mut,#8a7f72)}';document.head.appendChild(st)}catch(e){}
})();
const _r100=render;
render=function(){
 _r100();
 try{
  if(!S)return;view.hh=view.hh||{o:false};
  document.querySelectorAll('.hint').forEach(el=>{
   if(el.dataset.p100)return;el.dataset.p100='1';
   const n=el.querySelectorAll('span').length;if(!n)return;
   el.classList.add(view.hh.o?'ho':'hc');
   const b=document.createElement('div');b.className='hbadge';b.textContent=(view.hh.o?'收起提示':'提示 '+n+' 則')+'';
   b.onclick=()=>{view.hh.o=!view.hh.o;el.classList.toggle('ho',view.hh.o);el.classList.toggle('hc',!view.hh.o);b.textContent=view.hh.o?'收起提示':'提示 '+n+' 則'};
   el.insertBefore(b,el.firstChild);
  });
  const f=$('feed');
  if(f&&f.insertAdjacentHTML&&!document.getElementById('fbar')){
   const on=!!lsGet(PREFK,{}).hl;
   f.insertAdjacentHTML('afterbegin',`<div class="fbar" id="fbar"><button class="mini" id="hlTog">只看重點：${on?'開':'關'}</button><span>重大事件、財務與世界消息可在各年度展開</span></div>`);
   const t=document.getElementById('hlTog');
   if(t)t.onclick=()=>{const p=lsGet(PREFK,{});p.hl=!p.hl;lsSet(PREFK,p);render()};
  }
 }catch(e){}
};
/* 搜尋也找歷史紀錄 */
function moreSearch(v){
 const q=String(v||'').trim();
 document.querySelectorAll('.tile').forEach(t=>{t.style.display=!q||t.textContent.indexOf(q)>=0?'':'none'});
 document.querySelectorAll('.cgrp').forEach(g=>{const h=g.previousElementSibling;g.style.display=(q||!(h&&h.classList.contains('cl')))?'':'none'});
 const inp=document.getElementById('tq');if(!inp)return;
 let box=document.getElementById('hq');
 if(!box){box=document.createElement('div');box.id='hq';inp.insertAdjacentElement('afterend',box)}
 if(!q){box.innerHTML='';return}
 const out=[];
 for(let i=S.log.length-1;i>=0&&out.length<25;i--){const L=S.log[i];for(const l of L.lines){if((l.t||'').indexOf(q)>=0){out.push(`<div class="ln ${l.c}"><b>${L.age} 歲</b>　${esc(l.t)}</div>`);if(out.length>=25)break}}}
 box.innerHTML=out.length?`<div class="sec op">人生紀錄（${out.length}${out.length>=25?'+':''}）</div>`+out.join(''):'';
}
const _mh100=moreHTML;
moreHTML=function(){return _mh100().replace(/oninput="[^"]*"/,'oninput="moreSearch(this.value)"').replace('搜尋功能（例如：房、股、宗教）','搜尋功能或人生紀錄（例如：房、股、結婚）')};
/* 舊紀錄壓縮：超過 40 年前的年份只留重點 */
const _y100=yearly;
yearly=function(){
 _y100.apply(this,arguments);
 try{
  if(!S||!S.log||S.log.length<45)return;
  for(let i=0;i<S.log.length-40;i++){const L=S.log[i];if(L.cz)continue;L.cz=1;if(L.lines.length>4){const keep=L.lines.filter(l=>TLKEY.test(l.t||'')).slice(0,3);L.lines=keep.length?keep:L.lines.slice(0,2)}}
 }catch(e){}
};
