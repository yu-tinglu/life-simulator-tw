// 政黨支持度、孫輩接班、新結局
function polSupInit(){const p=polInit();if(!p.sup)p.sup={rul:50,opp:50};return p.sup}
function polWave(){const s=polSupInit();return Math.max(-10,Math.min(10,(s.rul-s.opp)/3))+R(-3,3)}
const _el97=elHTML;
elHTML=function(){
 let h=_el97();const s=polSupInit();
 return h.replace('<div class="sec op">登記參選</div>',`<div class="item">政黨支持度：執政黨系 <b>${Math.round(s.rul)}%</b>・在野黨系 <b>${Math.round(s.opp)}%</b><div class="sub">支持度會隨任內施政與景氣起伏，影響下次選舉的政黨加成。</div></div><div class="sec op">登記參選</div>`);
};
const _y97=yearly;
yearly=function(){
 _y97.apply(this,arguments);
 try{
  if(!S||S.dead||!S.pol)return;
  const s=polSupInit(),p=S.pol;
  let d=R(-3,3);
  if(p.office&&(p.party==='rul'||p.party==='opp')){const e=(polRep()-50)/25;d+=p.party==='rul'?e:-e}
  const m=p.mod||{w:0,h:0};if(p.office&&(m.w>0)){d+=(p.party==='rul'?1:-1)*.5}
  s.rul=Math.max(25,Math.min(75,s.rul+d+(50-s.rul)*.05));s.opp=100-s.rul;
 }catch(e){}
};
/* 孫子女接班 */
const _su97=startSuccession;
startSuccession=function(){
 _su97();
 try{
  const gks=[];S.kids.forEach(k=>{if(k.rm&&k.rm.gk)k.rm.gk.forEach(g=>gks.push({k,g}))});
  const mb=document.getElementById('modalBody');
  if(!gks.length||!mb||!document.getElementById('modal').classList.contains('on')||!mb.insertAdjacentHTML)return;
  mb.insertAdjacentHTML('beforeend',`<div class="sec op">或由孫子女繼續（簡化：家族樹會把你視為其父母）</div>`+gks.map((x,i)=>`<button class="btn" data-g="${i}">${esc(x.g.n)}・${x.g.age} 歲<small>${esc(x.k.n)}的孩子</small></button>`).join(''));
  mb.addEventListener('click',function f(e){
   const b=e.target.closest&&e.target.closest('[data-g]');if(!b)return;
   mb.removeEventListener('click',f);mb.onclick=null;$('modal').classList.remove('on');
   const x=gks[+b.dataset.g],r=S.estate,kk=newKid(x.g.sx,x.g.n);
   kk.age=x.g.age;kk.rel=x.g.rel||70;kk.m=x.g.m||0;kk.done=kk.age>=6?1:0;kk.nx=kk.age<6?'es':null;kk.edu=kk.age>=18?3:kk.age>=12?2:kk.age>=6?1:0;
   r.parts[kk.id]=(r.parts[x.k.id]||0);r.parts[x.k.id]=0;
   S.kids.push(kk);applySuccession(r,kk);
  });
 }catch(e){}
};
/* 新結局 */
const _et97=endTitle;
endTitle=function(){
 try{
  const h=(S.pol&&S.pol.hist)||[];
  if(h.some(x=>x.won&&x.lv>=4))return '⚖ 政治家';
  if(S.pj&&S.pj.fnd&&(S.flags.donor||0)>=8)return '🕊 慈善家';
  if(pjTotal()>=1e9)return '🚀 投資家';
  const gk=S.kids.reduce((a,k)=>a+(k.rm&&k.rm.gk?k.rm.gk.length:0),0);
  if(gk>=3&&S.kids.length>=2)return '🌳 三代同堂';
 }catch(e){}
 return _et97();
};
