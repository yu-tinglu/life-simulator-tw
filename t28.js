const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub,createElement:()=>stub,body:stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;showEnd=()=>{};const errs={};ask=(t,l,cb)=>cb(Math.random()*l.length|0);
globalThis.T=function(k,N){const out=[];let ws=[];
 for(let r=0;r<N;r++){newGame('',r%2?'男':'女');S.money+=3e6;let g=0,mv=27;
  while(!S.dead&&g++<120){
   if(S.age===mv&&k!=='TW'&&!S.ab){cnInit();S.cn=k;S.ab={cn:k,visa:'cit',left:0,yrs:0,wk:0,nojob:0,nu:0};S.lang[k]=70}
   if(S.age>=18&&!S.job&&!S.school&&!S.flags.retired)try{handle('job:'+R(0,JOBS.length-1))}catch(e){}
   try{ageUp()}catch(e){errs[e.message]=1;break}
   if(S.age===60)ws.push(Math.round(S.money));
  }
  const s=S.si||{};out.push({age:S.age,lab:s.lab,np:s.np,lt:Math.round(s.lt||0),ltPaid:Math.round(s.ltPaid||0),pen:S.pension,bal:s.bal&&Math.round((s.bal.oa||0)+(s.bal.sa||0)+(s.bal.b||0)),m:Math.round(S.money)});}
 ws.sort((a,b)=>a-b);
 try{S.job=S.job;view.lsub='si';var h=siHTML();}catch(e){errs['html:'+e.message]=1}
 return {k,medW60:ws[ws.length>>1],sample:out.slice(0,3),errs,html:(typeof h==='string'?h.length:0)}}`,ctx);
if(process.argv[2]==='nocpf')ctx.eval('PAY.SG.cpf=0;PAY.GB.wp=0;PAY.AU.su=0');for(const k of ['SG','AU','GB']){console.log(JSON.stringify(ctx.T(k,70)))}
