const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
const code=fs.readFileSync('game.js','utf8')+`;var MONEY=2e10,MON=0;globalThis.setM=v=>{MON=v};globalThis.T=function(N,pol){
 const out=[];let errs=[],bad=0;
 for(let ii=0;ii<INDS.length;ii++){
  let surv=0,tot=0,ms=[],eqs=[],ipoN=0;
  for(let r=0;r<N;r++){
   newGame('','男');S.age=30;S.money=MONEY;busy=false;queue=[];
   const I=INDS[ii];const form=I.solo?'獨資':(I.cap>0?'股份有限公司':'有限公司');
   const need=I.fx*1.05+I.dep+Math.max(1000,I.cap*.001)+I.fx*.12;const base=Math.max(I.cap,Math.ceil(need/1e5)*1e5);
   S.money=base*(MON||1.3);const e=foundCo(ii,form,base,base,0,'測試');if(e){errs.push(I.n+':'+e);break}
   Object.assign(S.co.policy,pol||{});
   let yrs=0;
   for(;yrs<25&&S.co;yrs++){
    S.age++;queue=[];yearly_econ();
    let rec;try{rec=coYear()}catch(x){errs.push(I.n+' EXC '+x.message);break}
    const L=S.co.L;let s=0;LEDG.forEach(k=>s+=L[k]);PLA.forEach(k=>s+=L[k]);
    if(Math.abs(s)>1){bad++;errs.push(I.n+' unbalanced '+s)}
    if(Math.abs(rec.cf.net-(rec.cf.end-rec.cf.begin))>2){bad++;errs.push(I.n+' CF '+rec.cf.net+' vs '+(rec.cf.end-rec.cf.begin))}
    // 資產=負債+權益
    const b=rec.close;let ta=0;['cash','ar','inv','fa','depo','dta','vat','tax','ap','loan','capital','apic','reserve','re'].forEach(k=>ta+=b[k]);
    if(Math.abs(ta)>1){bad++;errs.push(I.n+' BS '+ta)}
    try{for(let t=0;t<4;t++)reportRows(rec,t)}catch(x){errs.push(I.n+' REP '+x.message);break}
    tot++;if(rec.R>0)ms.push(rec.NI/rec.R);
    if(rec.bust){break}
   }
   if(yrs>=25&&S.co){surv++;eqs.push(equity(S.co.L))}
  }
  ms.sort((a,b)=>a-b);eqs.sort((a,b)=>a-b);
  out.push([INDS[ii].n,surv+'/'+N,(ms[ms.length>>1]*100||0).toFixed(1)+'%',Math.round((eqs[eqs.length>>1]||0)/1e6)+'M']);
 }
 return {out,errs:errs.slice(0,15),bad};
};
function yearly_econ(){S.econ=Math.max(-.06,Math.min(.06,(S.econ||0)*.6+(Math.random()-.5)*.05))}
`;
vm.runInContext(code,ctx);
if(process.argv[3])ctx.setM(+process.argv[3]);const r=ctx.T(+process.argv[2]||12);
console.log('errs',JSON.stringify(r.errs),'bad',r.bad);
r.out.forEach(o=>console.log(o.join(' | ')));
