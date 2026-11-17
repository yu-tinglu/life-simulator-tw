/* ---- p84：居住安排（租屋品質、海外自住省租金）---- */
const HQN=['精簡（合租／小套房）','標準','舒適（獨立好房）'];
function ownsHere(){return !!(S.house&&(S.cn||'TW')==='TW')||(S.props||[]).some(p=>p.cn&&p.cn===S.cn)}
const _lc84=livingCost;
livingCost=function(){
 let v=_lc84();
 try{
  if(S.cn!=='TW'&&(S.props||[]).some(p=>p.cn===S.cn))v*=.88;
  if(!ownsHere())v*=[.92,1,1.1][S.hq==null?1:S.hq];
 }catch(e){}
 return Math.round(v);
};
const _y84=yearly;
yearly=function(){
 _y84();
 try{
  (S.props||[]).forEach(p=>{if(p.cn&&p.cn===S.cn)S.money-=Math.round(p.value*p.y)});
  if(!ownsHere()&&S.hq!=null&&S.hq!==1)chg('happy',S.hq===2?1:-1);
 }catch(e){}
};
const _hs84=hsHTML;
hsHTML=function(){
 let h=_hs84();
 if(!ownsHere()){
  const F=`<div class="sec">居住安排（租屋）</div>`+frmHTML('hq',{sl:'租屋品質（影響每年生活費與心情）',opts:HQN.map((n,i)=>[String(i),n+(i===0?'・生活費約 −8%、心情略低':i===2?'・生活費約 +10%、心情略高':'')]),amt:false,btns:[['go','套用','p']]});
  h=h.replace('<h3>房屋與房市</h3>','<h3>房屋與房市</h3>'+F);
 }else if(S.cn!=='TW'&&(S.props||[]).some(p=>p.cn===S.cn))h=h.replace('<h3>房屋與房市</h3>','<h3>房屋與房市</h3><p class="sub">你住在自己的海外房子裡，每年生活費約少 12%，這間房不再收租金。</p>');
 return h;
};
const _hd84=handle;
handle=function(a){
 if(typeof a==='string'&&S&&a==='frmgo:hq:go'){S.hq=+frmGet('hq').s;view.msg=G('已調整居住安排：'+HQN[S.hq]+'。');render();try{showSheet(view.tab,view.sub)}catch(e){}return}
 return _hd84(a);
};
