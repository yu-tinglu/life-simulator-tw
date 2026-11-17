/* ---- p85：長說明收進摺疊、長下拉可搜尋、職缺改下拉 ---- */
(function(){try{const st=document.createElement('style');st.textContent=`details.note{margin:6px 0}details.note>summary{font-size:12px;color:var(--mut,#8a7f72);cursor:pointer;padding:4px 0;list-style:none}details.note>summary::-webkit-details-marker{display:none}details.note>summary::before{content:"說明 ▸ "}details.note[open]>summary::before{content:"說明 ▾ "}details.note>p{margin:4px 0 0}.frm .srch{margin-bottom:-2px}`;document.head.appendChild(st)}catch(e){}})();
function noteFold(root){
 if(!root||!root.querySelectorAll)return;
 root.querySelectorAll('p.sub').forEach(p=>{
  if(p.closest('details')||p.closest('.frm')||p.dataset.nf)return;
  const t=(p.textContent||'').trim();if(t.length<90)return;
  p.dataset.nf=1;const d=document.createElement('details');d.className='note';const s=document.createElement('summary');s.textContent=t.slice(0,18)+'…';
  p.parentNode.insertBefore(d,p);d.appendChild(s);d.appendChild(p);
 });
}
function selSearch(root){
 if(!root||!root.querySelectorAll)return;
 root.querySelectorAll('.frm select').forEach(sel=>{
  if(sel.dataset.sr||sel.options.length<=15)return;sel.dataset.sr=1;
  const all=Array.from(sel.options).map(o=>[o.value,o.textContent]),inp=document.createElement('input');
  inp.type='search';inp.placeholder='輸入關鍵字搜尋';inp.className='srch';inp.autocomplete='off';
  sel.parentNode.insertBefore(inp,sel);
  inp.addEventListener('input',()=>{
   const q=inp.value.trim().toLowerCase(),cur=sel.value,L=all.filter(x=>!q||x[1].toLowerCase().includes(q));
   sel.innerHTML=(L.length?L:[['','沒有符合的項目']]).map(x=>`<option value="${x[0]}">${x[1]}</option>`).join('');
   if(L.some(x=>x[0]===cur))sel.value=cur;
   const p=sel.id.split('_');if(sel.value!==''){const stt=frmState(p[1]);stt[p[2]]=sel.value}
  });
 });
}
const _ss85=showSheet;
showSheet=function(tab,sub){
 const r=_ss85(tab,sub);
 try{const b=document.getElementById('sheetBody');noteFold(b);selSearch(b)}catch(e){}
 return r;
};
/* 職缺：下拉＋詳細資料 */
const _jh85=jobHTML;
jobHTML=function(){
 let h=_jh85();
 const re=/<button class="btn" data-a="job:(\d+)"[^>]*>[\s\S]*?<\/button>/g,ids=[];
 h=h.replace(re,(m,i)=>{ids.push(+i);return ids.length===1?'@@JB@@':''});
 if(!ids.length)return h;
 h=h.replace(/<div class="sec">(?:國小|國中|高中職|高中|專科|大學|碩士|博士|不拘|無學歷|不限)[^<]*<\/div>(?=\s*(?:@@JB@@|<div class="sec">|$|<button))/g,'');
 const opts=ids.map(i=>{const j=JOBS[i],ok=S.edu>=j.edu&&!jobBlock(j)&&!S.acts['job'+i];return [String(i),`${j.t}・${salRange(j)}${ok?'':'（不能應徵）'}`]});
 const st=frmState('jb'),cur=opts.some(x=>x[0]===st.s)?st.s:opts[0][0],j=JOBS[+cur],blk=jobBlock(j);
 const info=`<div class="item"><b>${j.t}</b><div class="sub">薪資 ${salRange(j)}・需${EDU[j.edu]}${j.sm?'・智力 '+j.sm+'+':''}${j.lk?'・外貌 '+j.lk+'+':''}${blk?'・'+blk:''}${S.acts['job'+cur]?'（今年已應徵）':''}</div></div>`;
 return h.replace('@@JB@@',frmHTML('jb',{sl:'選擇職缺',opts,amt:false,btns:[['go','應徵','p']]})+info);
};
const _hd85=handle;
handle=function(a){
 if(typeof a==='string'&&S&&a==='frmgo:jb:go'){let s=frmState('jb').s;try{const e=document.getElementById('frm_jb_s');if(e&&e.value!=='')s=e.value}catch(e){}return _hd85('job:'+s)}
 return _hd85(a);
};
