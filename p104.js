/* ---- p104：各國福利與制度參數（失業給付、兒童津貼、老年年金）---- 為遊戲設定值，約略參考 OECD 與各國官方制度，非精算 */
// ue 失業給付（占當地平均薪資）、uy 最長領取年數、cb 每名未成年子女每年津貼、pn 老年年金（PR/公民滿 10 年）
const CNX={
 US:{ue:.30,uy:1,cb:.025,pn:.30,note:'失業保險約半年、聯邦兒童稅額抵減、社會安全年金'},
 JP:{ue:.35,uy:1,cb:.035,pn:.35,note:'雇用保險、兒童手當、國民／厚生年金'},
 KR:{ue:.35,uy:1,cb:.03,pn:.20,note:'雇用保險、育兒津貼、國民年金'},
 CA:{ue:.35,uy:1,cb:.06,pn:.30,note:'就業保險、加拿大兒童福利金、OAS／CPP'},
 AU:{ue:.30,uy:2,cb:.05,pn:.30,note:'JobSeeker、家庭稅福利、年齡年金'},
 GB:{ue:.15,uy:1,cb:.035,pn:.27,note:'求職者津貼偏低、兒童福利金、國家年金'},
 DE:{ue:.45,uy:1,cb:.055,pn:.40,note:'失業金 I（約六成淨薪）、兒童金、法定年金'},
 SG:{ue:0,uy:0,cb:.03,pn:.15,note:'無失業保險、嬰兒花紅與兒童發展帳戶、公積金'}
};
const CXD={ue:.20,uy:1,cb:.01,pn:.20,note:'簡化參數'};
function cxOf(k){return CNX[k]||CXD}
const _y104=yearly;
yearly=function(){
 const r=_y104.apply(this,arguments);
 try{
  if(S&&!S.dead&&S.cn&&S.cn!=='TW'&&S.ab&&['pr','cit','ipr'].includes(S.ab.visa)){
   const n=(S.kids||[]).filter(k=>k.age!=null&&k.age<18&&!k.dead).length;
   if(n>0){const b=Math.round(cxOf(S.cn).cb*wTW(S.cn)*Math.min(n,3));if(b>0){try{ldset('兒童津貼')}catch(e){}S.money+=b;try{ldset(null)}catch(e){}}}
  }
 }catch(e){}
 return r;
};
const _pol104=polHTML;
polHTML=function(){
 const h=_pol104();
 try{
  const cn=S.cn||'TW';if(cn==='TW')return h;
  const c=cxOf(cn),w=wTW(cn);
  const blk=`<div class="item"><b>${CNS[cn].n}福利（遊戲設定）</b><div class="sub">失業給付：${c.uy?`約年薪 ${Math.round(c.ue*100)}%，最長 ${c.uy} 年`:'無'}<br>兒童津貼：每名未成年子女約 ${money(Math.round(c.cb*w))}／年（最多計 3 人）<br>老年年金：約 ${money(Math.round(c.pn*w))}／年（居留滿 10 年）<br>${esc(c.note)}</div></div>`;
  return h.replace('<div class="item"><b>同性婚姻</b>',blk+'<div class="item"><b>同性婚姻</b>');
 }catch(e){return h}
};
/* 海外居住成本（房租）依各國差異 */
const RENTF={US:1.0,JP:.85,KR:.9,CA:1.05,AU:1.1,GB:1.1,DE:.9,SG:1.25};
const _lc104=livingCost;
livingCost=function(){const v=_lc104.apply(this,arguments);try{if(S.cn&&S.cn!=='TW'&&RENTF[S.cn])return Math.round(v*RENTF[S.cn])}catch(e){}return v};
/* 聯合政府：議會制國家的最高職位可能需組聯合政府，施政效果打折且有垮台風險 */
const PARL=['GB','DE','JP','CA','AU'];
const _pr104=polRun;
polRun=function(lv,bud,party){
 const r=_pr104.apply(this,arguments);
 try{const p=polInit();
  if(lv===5&&PARL.includes(S.cn)&&p.office&&p.office.lv===5&&p.office.y0===calYear()&&Math.random()<.55){p.office.coal=1;log('國會沒有單一政黨過半，你與其他政黨組成聯合政府；施政效果打折，聯盟也可能破局。','')}
 }catch(e){}
 return r;
};
const _ea104=elAct;
elAct=function(k){
 const p=polInit(),m0=Object.assign({},elMod()),r=_ea104.apply(this,arguments);
 try{if(p.office&&p.office.coal){const m=elMod();m.w=m0.w+(m.w-m0.w)*.7;m.h=m0.h+(m.h-m0.h)*.7}}catch(e){}
 return r;
};
const _y104b=yearly;
yearly=function(){
 const r=_y104b.apply(this,arguments);
 try{const p=S.pol;if(p&&p.office&&p.office.coal&&!p.office.cr&&Math.random()<.1){log('聯合政府破局，你的內閣提前下台。','bad');chg('happy',-8);p.office=null;elReset()}}catch(e){}
 return r;
};
/* 海外房市：各國自己的景氣循環與長期趨勢（遊戲設定值，疊加在薪資成長之上）*/
const HTR={JP:-.006,CN:-.02,KR:.004,US:.004,CA:.004,AU:.005,GB:0,DE:-.002,SG:.004,CH:.003,TH:.002,AE:.006};
function hcyc(k){
 const y=calYear();if(!S.hcyc)S.hcyc={};let c=S.hcyc[k];
 if(!c){c=S.hcyc[k]={y:y-1,x:0}}
 while(c.y<y){c.x=c.x*.65+nrm()*.03;c.y++}
 return c.x;
}
const _hv104=hvYear;
hvYear=function(h){
 const v=_hv104.apply(this,arguments);
 if(!h.cn)return v;
 try{
  let adj=(HTR[h.cn]||0)+hcyc(h.cn);
  const base=wTW(h.cn)*(FRAT[h.cn]||9);if(base>0&&v/Math.max(1,fxn(h.cn))*fxn(h.cn)>base*2.2)adj-=.03;
  adj=Math.max(-.12,Math.min(.12,adj));
  h.vl=(h.vl||v/fxn(h.cn))*(1+adj);return Math.round(v*(1+adj));
 }catch(e){return v}
};
