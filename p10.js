// ===== 世代傳承：遺產、遺產稅、遺囑、信託、贈與、接班（p10）=====
// 稅制：台灣 115 年（免稅額 1,333 萬、配偶 553 萬、直系卑親屬 56 萬/人、父母 138 萬、喪葬 138 萬；稅率 10/15/20%）、
// 美國 2026（免稅額 US$15M、稅率 40%）、英國 2026/27（NRB £325k、RNRB £175k、40%）、日本（基礎控除 3,000 萬円＋600 萬円×法定繼承人）、
// 德國（配偶 €50 萬、子女 €40 萬、稅率 7–30%）、南韓（一括控除 5 億韓元＋配偶最低 5 億，稅率 10–50%）。加拿大/澳洲/新加坡無遺產稅。
// 其餘（程序費、遺留分、扶養請求機率、信託報酬等）為遊戲估算，非官方；各國細節（農地、事業傳承特例、州稅等）未模擬。
const EST={
 TW:{fh:.5,pb:.003,lb:2,fp:0,sp:n=>1/(n+1),nm:'民法§1138、遺產及贈與稅法'},
 JP:{fh:.5,pb:.005,lb:7,fp:0,sp:n=>.5,nm:'相続税法（遺留分 1/2）'},
 KR:{fh:.5,pb:.005,lb:10,fp:0,sp:n=>1.5/(1.5+n),nm:'상속세및증여세법（遺留分 1/2）'},
 US:{fh:0,pb:.03,lb:99,fp:0,sp:n=>.5,nm:'聯邦遺產稅（不含各州）'},
 CA:{fh:0,pb:.015,lb:0,fp:.15,sp:n=>.5,nm:'無遺產稅，視同處分課資本利得'},
 AU:{fh:0,pb:.02,lb:0,fp:.3,sp:n=>.5,nm:'無遺產稅，家屬可請求扶養'},
 GB:{fh:0,pb:.02,lb:7,fp:.3,sp:n=>.5,nm:'Inheritance Tax（7 年規則）'},
 DE:{fh:.5,pb:.01,lb:10,fp:0,sp:n=>.5,nm:'ErbStG（Pflichtteil 1/2）'},
 SG:{fh:0,pb:.01,lb:0,fp:.1,sp:n=>.5,nm:'無遺產稅（2008 年廢止）'}
};
const prog=(v,t)=>{if(v<=0)return 0;for(const [lim,r,sub] of t)if(v<=lim)return v*r-sub;return 0};
const TWE=[[56210000,.10,0],[112420000,.15,2810500],[Infinity,.20,8431500]];
const TWG=[[28110000,.10,0],[56210000,.15,1405500],[Infinity,.20,4216500]];
const JPE=[[1e7,.1,0],[3e7,.15,5e5],[5e7,.2,2e6],[1e8,.3,7e6],[2e8,.4,1.7e7],[3e8,.45,2.7e7],[6e8,.5,4.2e7],[Infinity,.55,7.2e7]];
const JPG=[[2e6,.1,0],[4e6,.15,1e5],[6e6,.2,3e5],[1e7,.3,9e5],[1.5e7,.4,1.9e6],[3e7,.45,2.65e6],[4.5e7,.5,4.15e6],[Infinity,.55,6.4e6]];
const KRE=[[1e8,.1,0],[5e8,.2,1e7],[1e9,.3,6e7],[3e9,.4,1.6e8],[Infinity,.5,4.6e8]];
const DEE=[[75000,.07],[300000,.11],[600000,.15],[6e6,.19],[13e6,.23],[26e6,.27],[Infinity,.30]];
const deTax=v=>{if(v<=0)return 0;for(const [l,r] of DEE)if(v<=l)return v*r;return 0};
function estTax(k,c){
 const fx=fxr(k),ne=Math.max(0,c.gross-c.debts);let tax=0;
 const twRule=(gross,debts,hasSp,kids,par)=>{
  const ded=13330000+1380000+(hasSp?5530000:0)+kids.length*560000+kids.reduce((s,x)=>s+Math.max(0,18-x.age)*560000,0)+par*1380000;
  return prog(Math.max(0,gross-debts-ded),TWE)};
 if(k==='TW')tax=twRule(c.gross,c.debts,c.hasSp,c.kids,c.par);
 else if(k==='JP'){
  const N=(c.hasSp?1:0)+c.kids.length||1,g=ne/fx,basic=3e7+6e6*N,tb=g-basic;
  if(tb>0){const spS=c.hasSp?(c.kids.length?.5:1):0,kS=c.kids.length?(1-spS)/c.kids.length:0;
   let tj=(c.hasSp?prog(tb*spS,JPE):0)+c.kids.length*prog(tb*kS,JPE);
   const ex=Math.min(c.spAmt/fx,Math.max(1.6e8,g*spS));if(c.hasSp)tj-=tj*Math.min(1,ex/g);
   tax=Math.max(0,tj)*fx}}
 else if(k==='KR'){
  const g=ne/fx,spLaw=1.5/(1.5+Math.max(1,c.kids.length));
  const sd=c.hasSp?Math.max(5e8,Math.min(c.spAmt/fx,g*spLaw,3e9)):0;
  tax=prog(Math.max(0,g-5e8-sd),KRE)*fx}
 else if(k==='US'){const ex=15e6*(c.widow?2:1);tax=Math.max(0,ne/fx-c.spAmt/fx-ex)*.4*fx}
 else if(k==='CA'){tax=Math.max(0,ne-c.spAmt)*.30*.5*.45}
 else if(k==='GB'){
  const g=ne/fx;let rn=(c.house&&c.kids.length)?175000*(c.widow?2:1):0;if(g>2e6)rn=Math.max(0,rn-(g-2e6)/2);
  tax=Math.max(0,g-c.spAmt/fx-325000*(c.widow?2:1)-rn)*.4*fx}
 else if(k==='DE'){
  let t=0;if(c.hasSp)t+=deTax(c.spAmt/fx-756000);
  for(const x of c.kids)t+=deTax(x.amt/fx-400000);tax=t*fx}
 let twx=0;
 if(k!=='TW'&&c.twS>0){const twT=twRule(c.twS,0,c.hasSp,c.kids,c.par);twx=Math.max(0,twT-tax*c.twS/Math.max(1,c.gross))}
 return {tax:Math.round(tax+twx),twx:Math.round(twx)};
}
function giftAmt(code,amt,kidId,dry){
 // 回傳 {tx 稅額(TWD), ta 計入遺產加回的金額}
 const fx=fxr(code),gs=S.gifts||[],yr=S.age;
 const sumK=(lbYrs)=>gs.filter(g=>g.to===kidId&&yr-g.age<=lbYrs).reduce((s,g)=>s+g.amt,0);
 let tx=0,ta=amt;
 if(code==='TW'){const all=gs.filter(g=>g.age===yr).reduce((s,g)=>s+g.amt,0);tx=prog(Math.max(0,all+amt-2440000),TWG)-prog(Math.max(0,all-2440000),TWG)}
 else if(code==='JP'){const c=gs.filter(g=>g.to===kidId&&g.age===yr).reduce((s,g)=>s+g.amt,0)/fx;tx=(prog(Math.max(0,c+amt/fx-1.1e6),JPG)-prog(Math.max(0,c-1.1e6),JPG))*fx}
 else if(code==='KR'){const c=sumK(10)/fx;tx=(prog(Math.max(0,c+amt/fx-5e7),KRE)-prog(Math.max(0,c-5e7),KRE))*fx}
 else if(code==='DE'){const c=sumK(10)/fx;tx=(deTax(c+amt/fx-4e5)-deTax(c-4e5))*fx}
 else if(code==='US'){
  const yrK=gs.filter(g=>g.to===kidId&&g.age===yr).reduce((s,g)=>s+g.amt,0)/fx,ex=Math.max(0,19000-yrK),tg=Math.max(0,amt/fx-ex);ta=tg*fx;
  const cum=gs.reduce((s,g)=>s+g.ta,0)/fx;tx=(Math.max(0,cum+tg-15e6)-Math.max(0,cum-15e6))*.4*fx}
 else if(code==='GB'){ta=Math.max(0,amt-3000*fx)}
 else ta=0;
 return {tx:Math.max(0,Math.round(tx)),ta:Math.round(ta)};
}
function giftTaxEst(a,k){cnInit();return giftAmt(S.cn,a,k?k.id:0).tx}
function giftTo(k,amt){
 cnInit();if(S.money<amt)return B('現金不足。');
 const g=giftAmt(S.cn,amt,k.id);
 if(S.money<amt+g.tx)return B('現金不足以支付贈與稅。');
 S.money-=amt+g.tx;k.m=(k.m||0)+amt;k.rel=cl(k.rel+4);
 (S.gifts=S.gifts||[]).push({age:S.age,amt,ta:g.ta,tx:g.tx,to:k.id});
 const m=`贈與 ${k.n} ${money(amt)}，贈與稅 ${money(g.tx)}。`;log(m);return G(m);
}
// ---- 遺產試算（dry=true 為「若現在過世」預估）----
function estateCalc(dry){
 cnInit();const k=S.cn,E=EST[k];
 const A={cash:Math.max(0,S.money)+(typeof bkTotal==='function'?bkTotal():0),house:(S.house?S.house.value:0)+(S.props?S.props.reduce((a,p)=>a+p.value-(p.mort?p.mort.left:0),0):0),car:S.car?S.car.value:0,fx:0,inv:S.inv?S.inv.v*S.fx[S.inv.cn]:0,pf:pfSum(),co:typeof stake==='function'?stake(S.co):0,live:S.tr&&S.tr.kind==='live'?S.tr.v:0};
 for(const q in S.fxh)A.fx+=S.fxh[q]*S.fx[q];
 const debts=Math.max(0,-S.money)+(S.mort?S.mort.left:0);
 let add=0,credit=0;
 for(const g of (S.gifts||[]))if(E.lb&&S.age-g.age<=E.lb){add+=g.ta;credit+=g.tx}
 const gross0=A.cash+A.house+A.car+A.fx+A.inv+A.pf+A.co+A.live,gross=gross0+add;
 const sp=S.partner&&S.partner.married?S.partner:null,kids=S.kids.map(kidFix),nK=kids.length;
 const law=E.sp(nK),lawSh={},sh={};
 if(sp&&nK){lawSh.sp=law;kids.forEach(x=>lawSh[x.id]=(1-law)/nK)}else if(sp)lawSh.sp=1;else kids.forEach(x=>lawSh[x.id]=1/nK);
 Object.assign(sh,lawSh);
 const w=S.will;let wtxt='未立遺囑，依法定繼承';
 if(w&&(nK||sp)){
  const kp=sp?1-law:1;
  if(w.mode==='spouse'&&sp){sh.sp=1;kids.forEach(x=>sh[x.id]=0);wtxt='遺囑：全部留給配偶'}
  else if(w.mode==='succ'&&kids.find(x=>x.id===w.succ)){const s=w.sh/100;kids.forEach(x=>sh[x.id]=kp*(x.id===w.succ?(nK>1?s:1):(nK>1?(1-s)/(nK-1):0)));wtxt=`遺囑：指定接班人分得子女份額的 ${w.sh}%`}
  else if(w.mode==='ability'&&nK){const ws=kids.map(x=>(x.sm+x.gr+x.ts)/3),sm=ws.reduce((a,b)=>a+b,0);kids.forEach((x,i)=>sh[x.id]=kp*ws[i]/sm);wtxt='遺囑：依能力加權分配'}
  else if(w.mode==='equal'){wtxt='遺囑：子女均分'}
 }
 let forced='';
 if(E.fh&&(nK||sp)){
  let def=0,exc=0;const ids=Object.keys(sh);
  for(const h of ids){const m=E.fh*lawSh[h];if(sh[h]<m-1e-9){def+=m-sh[h];sh[h]=m}else exc+=sh[h]-m}
  if(def>1e-6&&exc>0){for(const h of ids){const m=E.fh*lawSh[h];if(sh[h]>m+1e-9)sh[h]-=(sh[h]-m)/exc*def}forced='遺囑超出「遺留分」限制，已依法調整（各繼承人至少保有法定份額的一半）。'}
 }
 let claim='';
 if(E.fp&&nK>1&&w){for(const x of kids){if(sh[x.id]<.1*lawSh[x.id]&&!dry&&chance(E.fp)){const t=.25*lawSh[x.id],o=Object.keys(sh).filter(h=>h!==String(x.id)&&sh[h]>0);const tot=o.reduce((s,h)=>s+sh[h],0);if(tot>0){o.forEach(h=>sh[h]-=sh[h]/tot*t);sh[x.id]+=t;claim=`${x.n}向法院請求扶養／分配，取得一部分遺產。`}}}}
 const funeral=Math.round(1380000*wTW(k)/761000),pbase=Math.max(0,gross0-A.live),probate=Math.round(E.pb*pbase);
 const NE=Math.max(0,gross0-debts),shAmt=h=>(sh[h]||0)*NE;
 const ctx={gross,debts,spAmt:shAmt('sp'),hasSp:!!sp,kids:kids.map(x=>({age:x.age,amt:shAmt(x.id)})),par:(S.mom.alive?1:0)+(S.dad.alive?1:0),house:A.house>0,widow:!!S.flags.widow,twS:k==='TW'?0:A.house+A.co};
 ctx.par=0;
 let et=estTax(k,ctx);let tax=Math.max(0,et.tax-credit);
 const cost=funeral+probate,N=Math.max(0,NE-tax-cost);
 const parts={};Object.keys(sh).forEach(h=>parts[h]=Math.round(sh[h]*N));
 return {k,A,gross0,add,gross,debts,NE,tax,twx:et.twx,credit,funeral,probate,cost,N,sh,parts,wtxt,forced,claim,sp,kids,live:A.live};
}
function estateLines(r){
 const c=CNS[r.k];
 return `<table class="rt"><tr class="h"><td colspan="2">遺產結算（${c.f}${c.n}・${EST[r.k].nm}）</td></tr>
 <tr><td>遺產總額</td><td>${money(r.gross0)}</td></tr>${r.add?`<tr><td>加回生前贈與（${EST[r.k].lb}年內）</td><td>${money(r.add)}</td></tr>`:''}
 <tr><td>債務（含房貸）</td><td>-${money(r.debts)}</td></tr>
 <tr><td>遺產稅${r.twx?`（含台灣財產課稅 ${money(r.twx)}）`:''}</td><td>-${money(r.tax)}</td></tr>
 <tr><td>喪葬＋繼承程序費</td><td>-${money(r.cost)}</td></tr>
 <tr class="b"><td>可分配淨遺產</td><td>${money(r.N)}</td></tr></table>`;
}
// ---- 死亡後：結算＋接班 ----
function startSuccession(){
 const r=estateCalc(false);S.estate=r;
 const kids=S.kids;
 let h=`<h3>🕊️ ${esc(S.name)} 享年 ${S.age} 歲</h3><p>死因：${S.cause}（第 ${S.gen||1} 代）</p>`+estateLines(r);
 h+=`<p class="sub">${r.wtxt}${r.forced?'<br>'+r.forced:''}${r.claim?'<br>'+r.claim:''}</p>`;
 if(!kids.length){
  h+=`<p>${r.sp?'遺產由配偶承受，家族到此為止。':'沒有繼承人，遺產歸國庫，家族到此為止。'}</p><button class="btn p" id="sx_end">查看人生總結</button>`;
  $('modalBody').innerHTML=h;$('modal').classList.add('on');
  $('sx_end').onclick=()=>{$('modal').classList.remove('on');showEnd()};return;
 }
 h+=`<div class="sec">各繼承人分得（稅後）</div><table class="rt">`+(r.sp?`<tr><td>配偶 ${esc(r.sp.n)}</td><td>${money(r.parts.sp||0)}</td></tr>`:'')+kids.map(x=>`<tr><td>${esc(x.n)}（${x.age} 歲）</td><td>${money(r.parts[x.id]||0)}</td></tr>`).join('')+`</table>`;
 const pre=S.will&&kids.findIndex(x=>x.id===S.will.succ);
 h+=`<div class="sec">${pre>=0?'依遺囑由接班人繼續':'選擇由哪位子女繼續你的家族'}</div>`+kids.map((x,i)=>`<button class="btn ${i===pre?'p':''}" data-i="${i}">${esc(x.n)}・${x.age} 歲・${x.tal}天賦・${x.pers}<small>${EDU[x.edu]}${x.occ?'・'+esc(x.occ):''}｜智力${x.sm} 毅力${x.gr}｜分得 ${money(r.parts[x.id]||0)}</small></button>`).join('');
 $('modalBody').innerHTML=h;$('modal').classList.add('on');
 $('modalBody').onclick=e=>{const b=e.target.closest('[data-i]');if(!b)return;$('modalBody').onclick=null;$('modal').classList.remove('on');applySuccession(r,kids[+b.dataset.i])};
}
function applySuccession(r,k){
 const yNow=calYear(),old={name:S.name,age:S.age,cause:S.cause,sx:S.sx,gen:S.gen||1,net:r.NE,tax:r.tax,cn:S.cn,ab:S.ab,sp:S.partner,spOff:S.partner?S.partner.off:0,will:S.will,tr:S.tr,sibs:S.kids.filter(x=>x!==k),job:S.job?S.job.t:'',ori:S.ori,kids:S.kids.length,spn:S.partner?S.partner.n:''};
 const A=r.A,sold=[];
 let others=0;Object.keys(r.parts).forEach(h=>{if(String(h)!==String(k.id))others+=r.parts[h]});
 const need=r.tax+r.cost;// 只有繳不出遺產稅／喪葬費才變賣；其他繼承人的份額只用現金支付，不為此賣資產
 let have=Math.max(0,S.money)+A.live;
 const H={house:S.house,mort:S.mort,car:S.car,co:S.co,fxh:S.fxh,inv:S.inv};
 const liq=(cond,val,fn,label)=>{if(have<need&&cond){have+=val;fn();sold.push(label)}};
 liq(A.pf>0,A.pf*.997,()=>{S.pf={bond:0,tw:0,us:0,gold:0}},'投資組合');
 liq(A.fx>0,A.fx*.995,()=>{H.fxh={}},'外匯存款');
 liq(!!H.inv,A.inv*.9,()=>{H.inv=null},'海外投資');
 liq(!!H.car,A.car*.9,()=>{H.car=null},'汽車');
 liq(!!H.house,Math.max(0,A.house*.97-(H.mort?H.mort.left:0)),()=>{H.house=null;H.mort=null},'房產');
 liq(!!H.co,A.co*.8,()=>{H.co=null},'公司股權（急售折價 20%）');
 const othPaid=Math.min(others,Math.max(0,have-need)),left=Math.max(0,have-need-othPaid);
 // 建立下一代
 const gen=old.gen+1,dead={role:old.sx==='男'?'父親':'母親',n:old.name,rel:k.rel,alive:false,off:old.age-k.age};
 const spk=old.sp&&old.sp.married?old.sp:null;
 const sx=old.sx==='男'?'女':'男';
 const surv=spk?{role:old.sx==='男'?'母親':'父親',n:spk.n,rel:k.rel,alive:true,off:old.age+(spk.off||0)-k.age,est:r.parts.sp||0}:{role:old.sx==='男'?'母親':'父親',n:'（已故）',rel:50,alive:false,off:30};
 const net=Math.round(left+(H.house?H.house.value-(H.mort?H.mort.left:0):0)+(H.car?H.car.value:0)+(k.m||0));
 Object.assign(S,{name:k.n,sx:k.sx,age:k.age,health:k.hl,happy:55,smarts:k.sm,looks:k.lk,money:Math.round(left+(k.m||0)),edu:k.edu,school:null,schoolEnd:0,tuition:0,grade:Math.round(k.grd),prestige:k.pre,
  job:null,jail:0,record:0,karma:50,fam:net>3e7?'富裕':net>3e6?'小康':'清寒',pension:0,partner:null,kids:[],acts:{},flags:{},seen:{},dead:false,army:false,
  house:H.house,mort:H.mort,car:H.car,co:H.co,fxh:H.fxh,inv:H.inv,gifts:[],will:null,tr:null,estate:null,gen,cause:'',bg:null,crush:[],ex:[],net:0,stress:20,dep:0,addict:null,goal:null,ori:null,ap:4,sc:null,refer:0});
 S.byear=yNow-k.age;
 if(dead.role==='父親'){S.dad=dead;S.mom=surv}else{S.mom=dead;S.dad=surv}
 S.friends=old.sibs.map(x=>({n:x.n,rel:cl(x.rel),sib:1,age:x.age}));
 (S.hist=S.hist||[]).push({gen:old.gen,name:old.name,age:old.age,cause:old.cause,net:old.net,tax:old.tax,cn:old.cn,job:old.job,ori:old.ori,kids:old.kids,spn:old.spn});
 // 學業／職業／所在國
 if(k.sch){const m={es:'小學',jh:'國中',hs:k.voc==='高職'?'高職':'高中',un:'大學',gr:'碩士',ph:'博士'};S.school=m[k.stage];S.schoolEnd=k.se;S.tuition=k.tu}
 else if(k.done&&k.inc&&!H.co)S.job={t:k.occ.replace(/（.*）/,''),sal:k.inc,var:0,lv:1,years:Math.max(0,k.age-22),perf:50,cn:k.cn};
 else if(S.edu===3&&S.age>=18&&S.age<=22&&(k.pend==='un'||k.nx==='un'))queue.push(E_UNI);
 if(H.co){
  if(S.age>=18)S.job={t:H.co.name+' 負責人',sal:0,founder:1,lv:1,years:0,perf:50};
  if(!k.bz){H.co.sent=Math.min(H.co.sent,.85);log('接班人缺乏經營歷練，市場對公司信心下滑。','bad')}
 }
 S.cn='TW';S.ab=null;
 if(k.cn&&k.cn!=='TW'&&old.cn===k.cn){
  const pv=old.ab&&old.ab.visa;
  if(['cit','pr','ipr'].includes(pv)){S.cn=k.cn;S.ab={cn:k.cn,visa:pv==='cit'?'cit':'pr',left:0,yrs:k.age,wk:0,nojob:0,nu:0};S.lang[k.cn]=Math.max(S.lang[k.cn]||0,80)}
  else if(k.done&&k.cnS===k.cn&&S.job){S.cn=k.cn;S.ab={cn:k.cn,visa:'work',left:3,yrs:0,wk:0,nojob:0,nu:0};S.lang[k.cn]=Math.max(S.lang[k.cn]||0,70)}
 }
 // 信託
 if(old.tr&&old.tr.kind==='gift'&&old.tr.ben===k.id)S.tr={kind:'inh',v:old.tr.v,rel:old.tr.rel};
 const wt=old.will&&old.will.wt;
 if(wt&&S.age<wt&&S.money>0){const v=Math.round(S.money*.7);S.money-=v;S.tr=S.tr?{kind:'inh',v:S.tr.v+v,rel:wt}:{kind:'inh',v,rel:wt}}
 S.log.push({age:S.age,lines:[]});
 log(`第 ${gen} 代：你是 ${old.name} 的${k.sx==='男'?'兒子':'女兒'}，今年 ${S.age} 歲。遺產稅 ${money(r.tax)}，你分得約 ${money(net)}。`,'good');
 if(sold.length)log(`為繳納遺產稅與喪葬費，不得不變賣了：${sold.join('、')}。`,'bad');
 if(S.tr)log(`遺囑信託：${money(S.tr.v)} 交付信託，每年撥付 4%，${S.tr.rel} 歲時交付全額。`);
 busy=false;queue=queue||[];save();render();
 $('modalBody').innerHTML=`<h3>🌱 第 ${gen} 代</h3><p>你現在是 <b>${esc(S.name)}</b>（${S.age} 歲），${k.tal}天賦、${k.pers}。</p><p>${net>3e7?'家境富裕':net>3e6?'家境小康':'家境清寒'}，淨資產約 ${money(net)}。</p><button class="btn p" id="gcont">開始</button>`;
 $('modal').classList.add('on');$('gcont').onclick=()=>$('modal').classList.remove('on');
}
// ---- 信託每年運作、父母二次繼承 ----
function trYear(){
 const t=S.tr;if(!t)return;
 t.v=Math.round(t.v*(1+.025+nrm()*.09));
 if(t.kind==='inh'){
  if(S.age>=t.rel){S.money+=t.v;log(`信託到期，你取得信託資產 ${money(t.v)}。`,'good');S.tr=null}
  else if(S.age>=18){const p=Math.round(t.v*.04);t.v-=p;S.money+=p}
 }else if(t.kind==='gift'){
  const b=S.kids.find(x=>x.id===t.ben);if(!b)return;
  if(b.age>=t.rel){b.m=(b.m||0)+t.v;log(`${b.n} 的信託到期，領回 ${money(t.v)}。`);S.tr=null}
  else if(b.age>=18){const p=Math.round(t.v*.04);t.v-=p;b.m=(b.m||0)+p}
 }else if(t.kind==='live'){t.v-=Math.round(t.v*.002)}
}
function parentEstate(p){
 if(!p.est||p.est<=0)return;
 cnInit();const k=S.cn,sib=S.friends.filter(f=>f.sib),n=1+sib.length;
 const ctx={gross:p.est,debts:0,spAmt:0,hasSp:false,kids:Array.from({length:n},()=>({age:S.age,amt:p.est/n})),par:0,house:false,widow:true,twS:0};
 const t=estTax(k,ctx).tax,fn=Math.round(1380000*wTW(k)/761000),net=Math.max(0,p.est-t-fn),mine=Math.round(net/n);
 S.money+=mine;log(`你分得${p.role}留下的遺產 ${money(mine)}（稅 ${money(t)}）。`,'good');p.est=0;
}
// ---- 介面：傳承頁 ----
function legacyHTML(){
 cnInit();const E=EST[S.cn],c=CNS[S.cn];
 let h='<h3>📜 傳承與遺囑</h3>';
 const r=estateCalc(true);
 h+=`<div class="sec">若你現在過世（試算）</div>`+estateLines(r);
 const names=[];if(r.sp)names.push(`配偶 ${money(r.parts.sp||0)}`);r.kids.forEach(x=>names.push(`${x.n} ${money(r.parts[x.id]||0)}`));
 h+=`<p class="sub">${names.length?names.join('、'):'目前沒有法定繼承人（遺產歸國庫）'}。${r.wtxt}。${r.forced}</p>`;
 h+=`<p class="sub" style="line-height:1.6">${c.n}規則：${E.nm}。${E.fh?`有「遺留分」：配偶與子女至少保有法定份額的 ${E.fh*100}%。`:'無強制遺留分，但家屬可能請求扶養（有機率分走一部分）。'}生前贈與在 ${E.lb?E.lb+' 年':'—'}內會加回遺產計稅。</p>`;
 // 遺囑
 const w=S.will||{mode:'law'};
 const md=[['law','不立遺囑（依法定繼承）'],['equal','子女均分，配偶依法定'],['succ','指定接班人獨得大部分家業'],['ability','依能力（智力＋毅力＋才藝）加權'],['spouse','全部留給配偶（二次繼承再傳子女）']];
 h+=`<div class="sec">遺囑（立遺囑費用約 NT$30,000，公證／律師估價）</div>`+md.map(([m,t])=>`<button class="btn ${((w.mode||'law')===m)?'p':''}" data-a="lg:will:${m}" ${!S.kids.length&&m!=='law'&&!(m==='spouse'&&S.partner)?'disabled':''}>${t}${(w.mode||'law')===m?' ✓':''}</button>`).join('');
 if(w.mode==='succ'){
  const sc=S.kids.find(x=>x.id===w.succ);
  h+=`<div class="item">接班人：<b>${sc?esc(sc.n):'尚未指定（請到子女頁按「指定為家業接班人」）'}</b>　其子女份額占比 ${w.sh}%</div><div class="seg">${[100,80,60].map(v=>`<button class="${w.sh===v?'on':''}" data-a="lg:sh:${v}">${v}%</button>`).join('')}</div>`;
 }
 h+=`<div class="sec">遺囑信託：接班人分得的現金 70% 交付信託，滿幾歲才領完（防敗家）</div><div class="seg">${[0,25,30,35].map(v=>`<button class="${(w.wt||0)===v?'on':''}" data-a="lg:wt:${v}">${v?v+' 歲':'不設'}</button>`).join('')}</div>`;
 // 信託
 h+=`<div class="sec">信託</div>`;
 if(S.tr){
  h+=`<div class="item"><b>${{live:'生前信託（可撤銷，仍計入遺產，但免繼承程序費）',gift:'他益信託（不可撤銷，視同贈與）',inh:'遺囑信託（分期給你）'}[S.tr.kind]}</b><br>信託資產 ${money(S.tr.v)}${S.tr.kind==='gift'?`・受益人 ${esc((S.kids.find(x=>x.id===S.tr.ben)||{n:'—'}).n)}・${S.tr.rel} 歲交付`:''}</div>`;
  if(S.tr.kind==='live')h+=`<button class="btn" data-a="lg:trout">撤銷信託取回資產</button>`;
 }else if(S.age>=18){
  h+=`<button class="btn" data-a="lg:tr:live:5000000" ${S.money<5150000?'disabled':''}>設立生前信託（放入 NT$5,000,000＋費用 150,000）<small>避免繼承程序費${S.cn==='TW'?'（台灣約 0.3%，效益小）':`（${c.n}約 ${(E.pb*100).toFixed(1)}%）`}，計入遺產</small></button>`;
  h+=S.kids.map((x,i)=>`<button class="btn" data-a="lg:tr:gift:5000000:${x.id}" ${S.money<5150000?'disabled':''}>為 ${esc(x.n)} 設立他益信託（NT$5,000,000，30 歲交付）<small>視同贈與課稅；${E.lb?E.lb+' 年內過世仍加回遺產':'資產移出遺產'}；防止子女揮霍</small></button>`).join('');
 }
 h+=`<p class="sub">贈與：到「家庭」→子女頁可贈與現金（依${c.n}規則課稅）。想節稅可考慮提早贈與、搬到無遺產稅的國家（新加坡、澳洲、加拿大）；台灣財產仍可能被課台灣遺產稅。</p>`;
 return h;
}
function lgHandle(x,y,z,u){
 cnInit();
 if(x==='will'){
  if(y!=='law'&&!(S.will)){if(S.money<30000)return B('立遺囑需 NT$30,000。');S.money-=30000}
  if(y==='law'){S.will=null;return N('已撤銷遺囑。')}
  S.will=S.will||{sh:80,wt:0};S.will.mode=y;return G('遺囑已更新。');
 }
 if(x==='sh'){if(S.will){S.will.sh=+y}return N('已更新比例。')}
 if(x==='wt'){if(!S.will){if(S.money<30000)return B('先立遺囑（NT$30,000）。');S.money-=30000;S.will={mode:'equal',sh:80,wt:0}}S.will.wt=+y;return N(+y?`遺囑信託：${y} 歲交付。`:'已取消遺囑信託。')}
 if(x==='tr'){
  const a=+z;if(S.tr)return B('已有一份信託。');
  if(y==='live'){if(S.money<a+150000)return B('現金不足。');S.money-=a+150000;S.tr={kind:'live',v:a,rel:0};return G('生前信託設立完成。')}
  if(y==='gift'){const k=S.kids.find(q=>String(q.id)===String(u));if(!k)return B('找不到受益人。');
   const g=giftAmt(S.cn,a,k.id);if(S.money<a+g.tx+150000)return B('現金不足。');
   S.money-=a+g.tx+150000;(S.gifts=S.gifts||[]).push({age:S.age,amt:a,ta:g.ta,tx:g.tx,to:k.id});S.tr={kind:'gift',v:a,ben:k.id,rel:30};
   return G(`他益信託設立完成，贈與稅 ${money(g.tx)}。`)}
 }
 if(x==='trout'){if(!S.tr||S.tr.kind!=='live')return B('沒有可撤銷的信託。');S.money+=S.tr.v;S.tr=null;return N('已取回信託資產。')}
 return null;
}
