const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub,createElement:()=>stub,body:stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};
globalThis.T=function(N){let fx=0,ex=[];const pt={ext:0,agr:0,con:0,opn:0,sta:0},sk={comm:0,lead:0,tech:0,fin:0,cre:0,fit:0};
for(let r=0;r<N;r++){newGame('',r%2?'男':'女');let g=0;while(!S.dead&&g++<120){if(S.age>=18&&!S.job&&!S.school)handle('job:'+R(0,JOBS.length-1));ageUp()}
 for(const L of S.log)for(const x of L.lines)if(x.c==='fx'){fx++;if(ex.length<6&&Math.random()<.05)ex.push(L.age+' '+x.t)}
 for(const k in pt)pt[k]+=S.pt[k]/N;for(const k in sk)sk[k]+=S.skl[k]/N}
 return {fx:fx/N,ex,pt,sk}}`,ctx);
console.log(JSON.stringify(ctx.T(60)));
