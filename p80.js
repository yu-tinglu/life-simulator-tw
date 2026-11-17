/* ---- p80：今年建議（依狀態推薦下一步）、存檔下載成檔案與從檔案匯入 ---- */
function advList(){
 const a=[];if(!S||S.dead)return a;
 try{
  const lc=livingCost(),cash=Math.max(0,S.money),bk=typeof bkTotal==='function'?bkTotal():0,pf=typeof pfSum==='function'?pfSum():0;
  if(S.health<45)a.push(['身體狀況不太好','去看醫生或多運動','open:act']);
  else if((S.stress||0)>70)a.push(['壓力偏高','安排休息、旅行或紓壓活動','open:act']);
  if(S.age>=18&&S.age<65&&!S.job&&!S.school&&!S.co&&!(S.flags&&S.flags.retired))a.push(['目前沒有工作','到職業頁找工作或創業','open:job']);
  if(S.age>=18&&cash>lc*2&&bk+pf<cash*.3)a.push(['有閒置現金','拿一部分存定存或買投資組合','open:ast']);
  if(S.mort&&cash>S.mort.left*.4&&(S.mort.rate||0)>.025)a.push(['房貸利率偏高','現金充裕可考慮提前還款','lf:hs']);
  if(S.age>=18&&S.age<=45&&!S.partner&&!(S.crush&&S.crush.length)&&!S.on)a.push(['還沒有心儀的對象','到人際關係認識新朋友','rom:go:h']);
  if((S.ap||0)>=3&&(S.partner||(S.crush&&S.crush.length)))a.push(['還有行動點可以用','和心儀對象聊天、約會或看專屬章節','rom:go:h']);
  if(S.co&&S.co.rec&&S.co.rec.NI<0)a.push(['公司去年虧損','看診斷並執行經營改善','open:job']);
  if(S.age>=16&&S.age<=40&&!S.school&&S.edu>=3&&!(S.skills&&Object.keys(S.skills).length))a.push(['可以培養一項技能','提升收入與機會','lf:skill']);
 }catch(e){}
 return a.slice(0,3);
}
const _ah80=actHTML;
actHTML=function(){
 let h=_ah80();const l=advList();
 if(l.length){
  const box=`<div class="item"><b>今年建議</b>${l.map(x=>`<div class="sub" style="margin-top:6px"><b>${x[0]}</b>：${x[1]}<br><button class="mini" data-a="${x[2]}">前往</button></div>`).join('')}</div>`;
  h=h.replace(/(<h3>[^<]*<\/h3>)/,'$1'+box);if(!h.includes('今年建議'))h=box+h;
 }
 return h;
};
/* 存檔檔案 */
const _sh80=setHTML;
setHTML=function(){
 return _sh80().replace('<button class="btn" data-a="lf:set:copy">',`<button class="btn p" data-a="lf:set:dl">下載存檔檔案<small>分享或存到「檔案」，換手機時用</small></button><label class="btn" style="display:block;text-align:left"><input id="impfile" type="file" accept=".json,application/json,text/plain" style="display:none">從檔案匯入存檔<small style="display:block">選擇之前下載的存檔檔案</small></label><button class="btn" data-a="lf:set:copy">`);
};
const _lf80=lfHandle;
lfHandle=function(x,y,z){
 if(x==='set'&&y==='dl'){
  try{
   const txt=expAll(),fn='life-sim-backup-'+new Date().toISOString().slice(0,10)+'.json',f=new File([txt],fn,{type:'application/json'});
   if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f]}).catch(()=>{});}
   else{const u=URL.createObjectURL(new Blob([txt],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download=fn;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(u);a.remove()},1000)}
   try{localStorage.setItem('lifesim_lastbk',String(Date.now()))}catch(e){}
   return G('已產生存檔檔案。若沒有出現下載或分享，請改用「複製存檔文字」。');
  }catch(e){return B('這個環境無法下載檔案，請改用「複製存檔文字」。')}
 }
 return _lf80(x,y,z);
};
(function(){try{document.addEventListener('change',e=>{const t=e.target;if(!t||t.id!=='impfile'||!t.files||!t.files[0])return;const r=new FileReader();r.onload=()=>{try{const m=impAll(String(r.result||''));view.msg=m;render();showSheet(view.tab,view.sub)}catch(err){}};r.readAsText(t.files[0])},true)}catch(e){}})();
