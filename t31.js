const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub,createElement:()=>stub,body:stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;showEnd=()=>{};const errs={};ask=(t,l,cb)=>cb(Math.random()*l.length|0);
globalThis.T=function(N,cn){const dist={},ev={},conv=[0,0];
 for(let r=0;r<N;r++){newGame('',r%2?'男':'女');if(cn&&cn!=='TW'){try{S.cn=cn;S.ab={cn,visa:'cit',left:0,yrs:0,wk:0,nojob:0,nu:0};S.rg=null;S.mom.rg=null;S.dad.rg=null;S.eth=null}catch(e){}}let g=0;
  while(!S.dead&&g++<120){
   try{ageUp()}catch(e){errs[e.message+(e.stack||'').split(String.fromCharCode(10))[1]]=1;break}
   if(g===3){dist[S.rg.r]=(dist[S.rg.r]||0)+1}
   try{rgHTML();moreHTML()}catch(e){errs['ui:'+e.message]=1}
  }
  conv[0]+=S.flags.rgconv||0;conv[1]+=S.rg.d==0&&rgIs?1:0;
  try{endInfo()}catch(e){errs['end:'+e.message]=1}}
 return {dist,conv,errs}};`,ctx);
for(const k of ['TW','US','JP','KR','DE','GB','CA','AU','SG'])console.log(k,JSON.stringify(ctx.T(60,k)));
vm.runInContext(`globalThis.F=function(){let n=0,bad=[];const names=['民間信仰／道教','佛教','基督新教','伊斯蘭教','印度教','錫克教','猶太教','一貫道','其他','無宗教'];
 for(const cn of ['TW','US','JP','KR','DE','GB','CA','AU','SG'])for(const r of names){newGame('',R(0,1)?'男':'女');S.cn=cn;S.age=30;S.money=800000;S.job={t:'x',sal:900000,lv:1,years:1,perf:50};S.partner={n:'P',sx:'女',rel:70,rg:{r:'佛教',d:50}};S.kids=[{n:'K',age:3}];S.rg={r,d:60};S.pt={ext:50,agr:50,con:50,opn:50,sta:50};S.skl={comm:5,lead:5,tech:5,fin:5,cre:5,fit:5};
  for(const e of E.filter(x=>/^(rg_|TW_fortune|TW_temple|JP_hats|KR_chu|KR_church|US_church|US_faithwork|DE_ktax|GB_assembly|CA_multifaith|AU_multifaith|SG_harmony|SG_halal)/.test(x.id))){
   let ok=false;try{ok=e.if()}catch(x){bad.push(e.id+' if '+x.message)}
   if(!ok)continue;try{const o=e.run();o.c.forEach(c=>{const r2=c.f();if(!Array.isArray(r2))bad.push(e.id+' ret');n++})}catch(x){bad.push(e.id+' '+x.message)}}}
 return [n,bad.slice(0,5)]}`,ctx);
console.log(JSON.stringify(ctx.F()));
