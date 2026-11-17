/* ---- p77：房價趨緩——實質漲幅縮小、價格過高時回檔，長期大致跟著薪資走 ---- */
const _hm77=hmYear;
hmYear=function(){
 hmEnsure();const old={};for(const c in S.hmi)old[c]=S.hmi[c];
 _hm77();
 const yy=S.year||calYear();if(HRN[yy])return;
 for(const c in S.hmi){
  const o=old[c],r0=S.hmi[c]/o-1,wg=(1+S.hg[c])/(1+r0);
  const r=Math.max(-.1,Math.min(.07,r0*.6+(1-o)*.08-.004));
  S.hmi[c]=Math.max(.6,Math.min(1.6,o*(1+r)));S.hg[c]=(1+r)*wg-1;
 }
};
