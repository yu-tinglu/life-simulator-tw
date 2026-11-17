const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
let code=fs.readFileSync('game.js','utf8');
code+=`
;globalThis.T=function(runs){
 ask=(t,l,cb)=>cb(Math.floor(Math.random()*l.length));
 showEnd=()=>{};
 let stats={ages:[],errs:0};
 for(let r=0;r<runs;r++){
  newGame('',Math.random()<.5?'男':'女');
  let guard=0;
  while(!S.dead&&guard++<200){
   // random actions
   for(const a of ACTS){if(Math.random()<.2)handle('act:'+a.id)}
   if(!S.job&&Math.random()<.7)handle('job:'+Math.floor(Math.random()*JOBS.length));
   for(const k of ['mom','dad','partner','k0','f0']){if(getP(k)){for(const kind of ['talk','gift','fight','date','propose','baby','breakup']){if(Math.random()<.05)handle('do:'+k+':'+kind)}}}
   if(Math.random()<.05)handle('buyH:'+Math.floor(Math.random()*3)+':'+(Math.random()<.5?'cash':'loan'));
   if(Math.random()<.05)handle('buyC:0');
   if(S.house&&Math.random()<.02)handle('sellH');
   if(S.car&&Math.random()<.02)handle('sellC');
   ['job','rel','act','ast'].forEach(t=>showSheet(t));
   ageUp();
   if(busy&&!S.dead){throw new Error('stuck busy at '+S.age)}
  }
  if(!S.dead)throw new Error('not dead');
  stats.ages.push(S.age);
  if(isNaN(S.money)||isNaN(S.health)||isNaN(S.happy))throw new Error('NaN');
 }
 const a=stats.ages;return {n:a.length,avg:a.reduce((x,y)=>x+y,0)/a.length,min:Math.min(...a),max:Math.max(...a)};
}`;
vm.runInContext(code,ctx);
console.log(JSON.stringify(ctx.T(300)));
