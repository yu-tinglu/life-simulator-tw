const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
let code=fs.readFileSync('game.js','utf8')+`;globalThis.T=function(runs,gym){
 ask=(t,l,cb)=>cb(0);showEnd=()=>{};const ages=[];const causes={};
 for(let r=0;r<runs;r++){newGame('','男');let g=0;
  while(!S.dead&&g++<200){ if(gym){handle('act:gym');handle('act:doc');} ageUp();}
  ages.push(S.age);causes[S.cause]=(causes[S.cause]||0)+1;}
 ages.sort((a,b)=>a-b);return {avg:ages.reduce((x,y)=>x+y,0)/runs,p10:ages[runs/10|0],med:ages[runs/2|0],p90:ages[runs*.9|0],causes};}`;
vm.runInContext(code,ctx);
console.log(JSON.stringify(ctx.T(400,false)));console.log(JSON.stringify(ctx.T(400,true)));
