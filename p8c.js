function coYear(){
 const co=S.co,I=INDS[co.ind],L=co.L,P=co.policy,yr=co.yrs+1,corp=co.form!=='獨資';
 co.yrs=yr;const open=co.open;
 const ev=[];
 // (a) 上年度議決之現金股利
 let divPaid=0;
 if(co.divDecl>0){divPaid=Math.min(co.divDecl,Math.max(0,L.cash*.9));if(divPaid>1){J(L,['re',divPaid],['cash',-divPaid]);personalDividend(co,divPaid)}co.divDecl=0}
 // (b) 繳納上年度營業稅與所得稅（含未分配盈餘加徵）
 let x=-L.vat;J(L,['vat',x],['cash',-x]);x=-L.tax;J(L,['tax',x],['cash',-x]);
 // (c) 營收
 P.ch=P.ch||0;P.pr=P.pr==null?1:P.pr;P.hr=P.hr==null?1:P.hr;P.ex=P.ex||0;P.tp=P.tp||0;
 const chG=[.02,.012,.015,.004][P.ch],gmD=[0,0,-.03,0][P.ch]+[-.04,0,.04][P.pr],prV=[1.06,1,.95][P.pr],chC=[.01,.02,0,0][P.ch],hrS=[.88,1,.82][P.hr],hrR=[.03,0,.01][P.hr],hrC=[0,0,.01][P.hr],exG=[0,.025,.045][P.ex],exC=[0,.015,.03][P.ex],exR=[0,.03,.10][P.ex];
 const cap=(co.faG*I.turn+I.base),mkE=[0,.02,.04,.05][P.mk],rdE=[0,.01,.03,.05][P.rd]*(I.rd?1.6:.8),payE=[-.01,0,.015][P.pay];
 const n=Math.random()+Math.random()+Math.random()-1.5;
 let R;
 if(!co.prevRev)R=cap*.55*(1+n*.2);
 else{const util=co.prevRev/cap;R=co.prevRev*(1+I.g+Math.max(0,.45*(.95-util))+S.econ*((I.cat==='科技'||I.cat==='製造')?1.4:1)+mkE+rdE+payE+coBonus(co)+chG+exG+n*I.vol*.8)}
 if(I.cat==='生技'&&P.rd>=1&&chance(.1)){R*=1.8;ev.push('授權金入帳，營收大增')}
 if(co.prevRev&&chance(.07-S.econ*.6)){const k=.55+Math.random()*.3,why=pick(['主要客戶流失','景氣急凍','競爭對手殺價搶客','供應鏈中斷','負面輿情擴散']);R*=k;ev.push(why+'，營收衰退 '+Math.round((1-k)*100)+'%')}
 if(P.ex===2&&chance(exR)){R*=.85;ev.push('海外據點遇到匯率與法規衝擊，營收受損')}
 R=Math.max(0,Math.min(R*prV,cap*1.02));
 const vr=vatMode(I,R),vf=vr.m==='std'?1:1.05;
 // (d) 成本費用
 const cogs=R*(1-Math.max(.02,Math.min(.95,I.gm+gmD)))*vf,invT=cogs*I.inv/365,invO=L.inv;
 let invE=invT,PU=cogs+invE-invO;if(PU<0){PU=0;invE=Math.max(0,invO-cogs)}
 const prod=[.92,1,1.06][P.pay],nst=Math.max(1,Math.ceil(Math.max(R,.9*co.prevRev)/(I.rpe*prod))),wageY=Math.max(MINW*12,I.wage*[.9,1,1.2][P.pay]);
 const ownS=corp?[0,6e5,12e5,24e5][P.own]:0;
 const staff=hrS*nst*(wageY+onCost(wageY/12)*12)+(ownS?ownS+onCost(ownS/12)*12:0);
 const rent=(R*I.ot+R*exC)*vf,mkt=R*([.01,.03,.06,.10][P.mk]+chC)*vf,rdx=R*[0,.02,.05,.10][P.rd]*(I.rd?1:.5)*vf;
 const must=corp&&(finMust(co,R)||nst>=100),wantAud=must||P.aud;
 const mustTax=corp&&(co.stage>=1||['商業銀行','保險公司','證券商'].includes(I.n));
 let file=mustTax?'cpa':P.file;
 const finFee=wantAud?(3e5+R*.0003)*(co.stage>=1?2.5:1)*vf:0,taxFee=file==='cpa'?(1.5e5+R*.0002)*vf:0;
 const audit=finFee+taxFee,listFee=[0,1.5e6,1.5e6,3e6,6e6][co.stage];
 const fee=I.fee*(1+.5*P.comp)+listFee+R*hrC;
 const dep=Math.min(L.fa,co.faG*.1);
 const loanA=-L.loan,intx=loanA*.035,inti=Math.max(0,L.cash)*.007;
 const gtax=vr.m==='gross'?R*vr.r:0,spx=I.sp?R*I.sp[1]:0;
 let pen=0,riskTxt=null;
 if(chance(.07*(P.comp?.55:1)*(P.pay===2?.85:1)+hrR)){pen=Math.round(R*(.003+Math.random()*.012)+30000+Math.random()*120000);riskTxt=I.risk}
 // (e) 過帳
 const outV=vr.m==='std'?R*(1-I.ex)*.05:0,B=R+outV;
 J(L,['ar',B],['rev',-R],['vat',-outV]);
 if(gtax)J(L,['gtax',gtax],['vat',-gtax]);
 J(L,['cogs',cogs],['inv',-cogs]);
 const base=PU+rent+mkt+rdx+audit,inV=vr.m==='std'?base*.05:0;
 J(L,['inv',PU],['rent',rent],['mkt',mkt],['rd',rdx],['audit',audit],['vat',inV],['ap',-(base+inV)]);
 const arE=B*I.ar/365,col=L.ar-arE;J(L,['cash',col],['ar',-col]);
 const apE=(base+inV)*I.ap/365,pay=-L.ap-apE;J(L,['ap',pay],['cash',-pay]);
 J(L,['staff',staff],['cash',-staff]);
 J(L,['depx',dep],['fa',-dep]);
 J(L,['fee',fee],['cash',-fee]);
 J(L,['intx',intx],['cash',-intx]);J(L,['cash',inti],['inti',-inti]);
 if(pen)J(L,['pen',pen],['cash',-pen]);
 if(spx)J(L,['spx',spx],['cash',-spx]);
 const netV=-L.vat,vd=netV-netV/6;J(L,['vat',vd],['cash',-vd]);
 const prov=co.prevTax*.5;if(prov>0)J(L,['tax',prov],['cash',-prov]);
 // (f) 稅務
 const plSum=()=>PLA.filter(k=>k!=='taxx').reduce((s,k)=>s+L[k],0);
 const PBT=-plSum();
 if(file==='sum'&&!(R<=3e7&&R>0&&PBT/R>=.06))file='gen';
 const ent=R*.005,lim=R*((file==='blue'||file==='cpa')?.0045:.003),exc=Math.max(0,ent-lim);
 const tpAdj=P.tp===2?Math.min(Math.max(0,PBT)*.5,Math.max(0,staff-(co.prevStaff||staff))*.3):0;co.prevStaff=staff;
 const income=PBT+pen+exc-tpAdj;
 co.nol=co.nol.filter(e=>yr-e.y<=10&&e.amt>1);
 const T={form:co.form,file,mustTax,PBT,pen,exc,income,must,wantAud,finFee,taxFee,prov,late:false,sum:null};
 let NI,eqPre=equity(L);
 if(corp){
  let elig=file==='blue'||file==='cpa';
  const ueB=co.ue?Math.max(0,co.ue.ni-co.ue.off-co.ue.res-divPaid):0,ueTax=P.tp===1?0:ueB*.05;if(P.tp===1&&ueB>0){const a=Math.min(ueB,Math.max(0,-L.re));if(a>1){J(L,['re',a],['capital',-a]);co.fs+=co.fs/co.shares*(a/10);co.shares+=a/10;ev.push('盈餘轉增資 '+money(a)+'，免加徵 5% 未分配盈餘稅')}}
  let tx=calcTax(co,income,elig,rdx);
  let due=tx.pay+ueTax-prov,late=false;
  if(due>L.cash){const need=due-L.cash,lm=creditLimit(co);if(need<=lm)drawLoan(co,need+1,'繳納營所稅週轉');else late=true}
  if(late){elig=false;tx=calcTax(co,income,false,rdx);const lf=Math.max(0,tx.pay+ueTax-prov)*.03;if(lf>0)J(L,['pen',lf],['cash',-lf]);T.late=true;T.lateFee=lf;log('現金不足無法如期繳納營所稅，加徵滯納金並喪失本年度盈虧互抵資格。','bad')}
  Object.assign(T,tx,{elig,ueB,ueTax});
  co.nol=tx.nl.filter(e=>e.amt>1);
  if(income<0){if(elig&&!late)co.nol.push({y:yr,amt:-income});else T.lostLoss=true}
  co.lossStreak=PBT<0?co.lossStreak+1:0;
  const nolS=co.nol.reduce((s,e)=>s+e.amt,0),dtaT=co.lossStreak>=3?0:nolS*.2;
  let adAdd=0,adFine=0;
  const ap_={gen:.12,blue:.06,cpa:.03,sum:.02}[file]||.1;
  if(chance(ap_)&&chance(.5)){adAdd=Math.max(20000,tx.pay*(.05+Math.random()*.15));adFine=adAdd*.4;T.audit={add:adAdd,fine:adFine};log(`國稅局查核結算申報，調整補稅 ${money(adAdd)}，並依所得稅法裁處罰鍰 ${money(adFine)}。`,'bad')}
  J(L,['taxx',tx.pay+ueTax+adAdd],['pen',adFine],['tax',-(tx.pay+ueTax+adAdd+adFine)]);
  const dd=dtaT-L.dta;J(L,['dta',dd],['taxx',-dd]);
  T.dtaEnd=dtaT;T.nolEnd=nolS;T.cur=tx.pay+ueTax+adAdd;T.def=-dd;
  co.prevTax=tx.pay;
 }else{
  const pt=PT(Math.max(0,income-228000));T.ptax=pt;T.taxable=Math.max(0,income-228000);S.money-=pt;co.prevTax=0;
  if(pt>0)log(`【${co.name}】獨資營利所得併入你的綜合所得，繳納個人所得稅 ${money(pt)}。`);
 }
 NI=-PLA.reduce((s,k)=>s+L[k],0);
 const pl={};PLA.forEach(k=>pl[k]=L[k]);
 const deficitBefore=Math.max(0,L.re);
 const lines=PLA.map(k=>[k,-L[k]]);lines.push(['re',PLA.reduce((s,k)=>s+L[k],0)]);
 J(L,...lines);
 // (g) 法定盈餘公積與分派
 let res=0;
 if(corp&&NI>0&&-L.re>0){const b=Math.max(0,Math.min(NI,-L.re));res=Math.min(.1*b,Math.max(0,-L.capital+L.reserve));if(res>0)J(L,['re',res],['reserve',-res])}
 if(corp)co.ue={ni:NI,off:Math.min(Math.max(0,NI),deficitBefore),res};
 if(!corp&&NI>0){const dr=Math.min(Math.max(0,NI-(T.ptax||0))*.7,Math.max(0,L.cash*.6));if(dr>1){J(L,['re',dr],['cash',-dr]);S.money+=dr;log(`【${co.name}】業主提取 ${money(dr)}。`)}}
 const dist=Math.max(0,-L.re);
 co.divDecl=0;
 if(corp&&dist>0){const D=dist*DIVP[P.div];co.divDecl=Math.round(Math.min(D,Math.max(0,L.cash-.25*(staff+rent+cogs))))}
 // (h) 業主薪資
 if(ownS){const nt=ownS-Math.min(ownS/12,45800)*.025*12-Math.min(ownS/12,313000)*.0155*12;S.money+=nt}
 // (i) 現金不足處理
 let ok=rescue(co);
 // (j) 市場情緒
 co.sent=Math.max(.6,Math.min(1.5,.7*co.sent+.3*(1+S.econ*3)+(Math.random()-.5)*.25));
 co.prevRev=R;
 if(co.stage>=1)co.stageYrs++;
 const close=snap(L),eqE=equity(L);
 // (k) 現金流量表（間接法）
 const d=k=>close[k]-open[k];
 const adj={ar:-d('ar'),inv:-d('inv'),dta:-d('dta'),ap:-d('ap'),vat:-d('vat'),tax:-d('tax')};
 const CFO=NI+dep+adj.ar+adj.inv+adj.dta+adj.ap+adj.vat+adj.tax;
 const capex=d('fa')+dep,CFI=-capex-d('depo');
 const loanChg=-d('loan'),eqIn=-(d('capital')+d('apic')),divOut=d('re')+d('reserve')+NI;
 const CFF=loanChg+eqIn-divOut;
 const PBTc=-PLA.filter(k=>k!=='taxx').reduce((s,k)=>s+pl[k],0);
 const rec={PBTc,outV,inV,gtax,spx,yr,age:S.age,name:co.name,form:co.form,ind:I.n,R,pl,PBT,NI,T,open,close,dep,
  cf:{NI,dep,adj,CFO,capex,depo:d('depo'),CFI,loanChg,eqIn,divOut,CFF,net:CFO+CFI+CFF,begin:open.cash,end:close.cash},
  nst,ownS,vr,eps:NI/co.shares,eqE,ev,riskTxt,pen,divPaid,must,wantAud,stage:co.stage,sent:co.sent,
  mkt:mkt,rdx:rdx,util:cap?R/cap:0};
 co.open=close;co.rec=rec;co.hist.push(rec);if(co.hist.length>12)co.hist.shift();
 if(!ok||eqE<0&&close.cash<1&&co.lossStreak>=2)rec.bust=true;
 return rec;
}
function coRun(){
 const co=S.co;let rec;
 try{rec=coYear()}catch(e){throw e}
 const wt=rec.NI>=0?'good':'bad';
 log(`【${co.name}】${rec.yr} 年度：營收 ${money(rec.R)}，稅後淨利 ${money(rec.NI)}${rec.ev.length?'（'+rec.ev.join('、')+'）':''}。`,wt);
 if(rec.riskTxt)log(`【${co.name}】因「${rec.riskTxt}」遭主管機關裁罰 ${money(rec.pen)}（罰款不得列為費用）。`,'bad');
 queue.push({run:()=>({custom:cb=>showReport(rec,cb)})});
 if(rec.bust)queue.push({run:()=>{coBust(co);return null}});
}
