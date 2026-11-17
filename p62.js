/* ---- p62：所有頁面區塊可收合；一鍵維繫人際關係 ---- */
function secCollapse(){
 try{
  const body=document.getElementById('sheetBody');if(!body||!body.querySelectorAll||!body.querySelectorAll('.sec').length)return;
  view.col=view.col||{};
  [...body.querySelectorAll('.sec')].forEach(sec=>{
   if(sec.dataset.cz)return;sec.dataset.cz='1';
   const key=(view.tab||'')+'|'+(view.sub||view.lsub||'')+'|'+sec.textContent.trim();
   const arr=[];let n=sec.nextSibling;
   while(n){
    if(n.nodeType===1&&(n.classList.contains('sec')||n.dataset&&n.dataset.a==='close'||n.classList.contains('msec')))break;
    arr.push(n);n=n.nextSibling;
   }
   if(!arr.length)return;
   const grp=document.createElement('div');grp.className='cgrp';
   sec.parentNode.insertBefore(grp,arr[0]);arr.forEach(x=>grp.appendChild(x));
   sec.classList.add('cz');
   const apply=c=>{grp.style.display=c?'none':'';sec.classList.toggle('cl',c)};
   const cur=()=>view.col[key]==null?true:!!view.col[key];
   apply(cur());
   sec.onclick=()=>{view.col[key]=!cur();apply(view.col[key])};
  });
 }catch(e){}
}
const _ss62=showSheet;
showSheet=function(tab,sub){const r=_ss62(tab,sub);secCollapse();return r};
(function(){try{const st=document.createElement('style');st.textContent='.sec.cz{cursor:pointer;display:flex;justify-content:space-between;user-select:none}.sec.cz::after{content:"收合";font-weight:400;font-size:12px}.sec.cz.cl::after{content:"展開"}';document.head.appendChild(st)}catch(e){}})();

/* 一鍵維繫 */
function kpPeople(){
 const a=[];
 if(S.mom&&S.mom.alive)a.push(S.mom);if(S.dad&&S.dad.alive)a.push(S.dad);
 if(S.partner)a.push(S.partner);
 (S.friends||[]).forEach(f=>a.push(f));(S.kids||[]).forEach(k=>a.push(k));
 return a;
}
function kpDo(kind){
 const ps=kpPeople();if(!ps.length)return B('身邊沒有可以聯絡的人。');
 const key=kind==='a'?'kpA':'kpB';
 if(S.acts[key])return B('今年已經做過了。');
 const cost=kind==='b'?px(1000)*ps.length:0;
 if(S.money<cost)return B('你的錢不夠。');
 S.acts[key]=1;S.money-=cost;
 ps.forEach(p=>{const d=kind==='a'?(p===S.partner?R(2,4):R(1,3)):(p===S.partner?R(4,7):R(3,6));p.rel=cl(p.rel+d)});
 S.net=cl((S.net||0)+(kind==='a'?0:1));chg('happy',kind==='a'?1:3);
 const m=kind==='a'?`你一一傳訊息問候了 ${ps.length} 位家人與朋友，關係都有一點改善。`:`你請大家吃飯、準備小禮物，一共花了 ${money(cost)}，${ps.length} 位的關係都明顯提升。`;
 log(m,'good');return G(m);
}
const _rh62=relHTML;
relHTML=function(){
 const h=_rh62(),ps=kpPeople(),n=ps.length,dis=S.jail||S.dead;
 if(!n)return h;
 const blk=`<button class="btn p" data-a="kp:a" ${dis||S.acts.kpA?'disabled':''}>一鍵問候全部（${n} 人）<small>免費・全員好感小幅提升・每年 1 次${S.acts.kpA?'（今年已做）':''}</small></button><button class="btn" data-a="kp:b" ${dis||S.acts.kpB||S.money<px(1000)*n?'disabled':''}>一鍵請客送禮<small>費用 ${money(px(1000)*n)}（每人 ${money(px(1000))}）・全員好感明顯提升・每年 1 次${S.acts.kpB?'（今年已做）':''}</small></button>`;
 return h.replace('</h3>','</h3>'+blk);
};
const _hd62=handle;
handle=function(a){
 if(typeof a==='string'&&S&&a.startsWith('kp:')){const r=kpDo(a.slice(3));view.msg=r;view.tab='rel';render();showSheet('rel');return}
 return _hd62(a);
};
