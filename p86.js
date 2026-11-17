/* ---- p86：退休金／年金依薪資指數調整（避免後代退休金遠低於生活費）---- */
const _y86=yearly;
yearly=function(){
 try{
  if(S.pension>0&&S.flags&&(S.flags.retired||S.flags.fpen)){
   if(!S.flags.pwi&&(S.pension===360000||S.pension===150000)){S.pension=Math.round(S.pension*Math.max(1,WI()));S.flags.pwi=1}
  }
 }catch(e){}
 const r=_y86.apply(this,arguments);
 try{if(S.pension>0&&S.flags&&(S.flags.retired||S.flags.fpen)&&calYear()>2026)S.pension=Math.round(S.pension*(1+(wageGrow()-1)*.85))}catch(e){}
 return r;
};
/* 老年安全網：65 歲以上入不敷出時，政府津貼補貼部分生活費（簡化自中低收入老人生活津貼）*/
const _y86b=yearly;
yearly=function(){
 const r=_y86b.apply(this,arguments);
 try{if(S.age>=65&&S.money<0&&!S.co){const a=Math.round(Math.min(-S.money,livingCost()*.3));if(a>0){ldset('老年生活津貼');S.money+=a;ldset(null);log(`政府提供老年生活津貼 ${money(a)}。`)}}}catch(e){}
 return r;
};
