/* ---- p66：加薪幅度上限、年度收支明細、父母遺產（配偶在世時依法分配） ---- */
const _y66=yearly;
yearly=function(){
 const j=S.job,m0=S.money,sal0=j&&!j.founder&&!j.var?j.sal:0,lv0=j?j.lv:0,a0=S.age;
 _y66();
 try{
  if(j&&S.job===j&&sal0>0){
   const cap=sal0*(j.lv>lv0?1.16:1.08);
   if(j.sal>cap){j.sal=Math.round(cap);j.s0=j.sal}
  }
 }catch(e){}
};
/* 父母遺產 */
function pHouse(){
 if(S.pH==null){
  const w=wTW(S.cn||'TW')/761000,b={清寒:R(300,1200)*1000,小康:R(4,16)*1000000,富裕:R(40,200)*1000000}[S.fam]||R(2,8)*1000000;
  S.pH=Math.round(b*w/10000)*10000;
 }
 return S.pH;
}
parentEstate=function(p){
 cnInit();const k=S.cn||'TW',E=EST[k]||EST.TW,oth=p===S.mom?S.dad:S.mom,H=pHouse();
 if(p.est==null)p.est=Math.round(H/2);
 if(oth&&oth.est==null)oth.est=Math.round(H/2);
 if(!p.est||p.est<=0)return;
 const sib=S.friends.filter(f=>f.sib),n=1+sib.length,spAlive=!!(oth&&oth.alive),sf=spAlive?E.sp(n):0,E0=p.est;
 const ctx={gross:E0,debts:0,spAmt:E0*sf,hasSp:spAlive,kids:Array.from({length:n},()=>({age:S.age,amt:E0*(1-sf)/n})),par:0,house:false,widow:!spAlive,twS:0};
 const t=estTax(k,ctx).tax,fn=Math.round(1380000*wTW(k)/761000),net=Math.max(0,E0-t-fn),sp=Math.round(net*sf),mine=Math.round((net-sp)/n);
 p.est=0;
 if(net<=0){log(`${p.role}沒有留下足夠的遺產（遺產約 ${money(E0)}，喪葬費用約 ${money(fn)}）。`);return}
 S.money+=mine;
 if(spAlive)oth.est=(oth.est||0)+sp;
 log(`你分得${p.role}留下的遺產 ${money(mine)}（遺產約 ${money(E0)}${spAlive?`；${oth.role}還在世，依法先分得約 ${money(sp)}，其餘由你與 ${n-1} 位手足均分`:`；由你與 ${n-1} 位手足均分`}${t?`，遺產稅 ${money(t)}`:''}，喪葬費約 ${money(fn)}）。`,'good');
};
