/* ---- p134：平衡調整（職涯事件出現頻率、職業運動員門檻）---- */
const W134={jd_a:50,arc1:45,arc2:120,arc3:120};
E.forEach(e=>{if(W134[e.id]!=null)e.w=W134[e.id]});
const _jb134=jobBlock;
jobBlock=function(j){
 const r=_jb134.apply(this,arguments);
 if(r)return r;
 if(j&&j.t==='職業運動員'){if(S.age>32)return '年齡限制：32 歲以下';if(S.health<70)return '需要健康 70 以上'}
 return r;
};
const _y134=yearly;
yearly=function(){
 const r=_y134.apply(this,arguments);
 try{
  if(!S.dead&&S.job&&S.job.t==='職業運動員'&&S.age>=34){
   S.job.sal=Math.round(S.job.sal*.92);
   if(S.age>=36&&chance(Math.min(.9,.25+(S.age-36)*.15))){log('身體跟不上了，你宣布從職業運動員退役。','');S.job=null;chg('happy',-3)}
  }
 }catch(e){}
 return r;
};
