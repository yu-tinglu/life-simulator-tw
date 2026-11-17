const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

ctx.fs=fs;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 ask=(t,l,cb)=>cb(0);showEnd=()=>{};const rows=[];
 for(let run=0;run<3;run++){
  newGame('甲','男');mFix();S.age=21;S.edu=4;S.school=null;S.fam='小康';S.money=0;S.mom.alive=false;S.dad.alive=false;S.partner=null;S.kids=[];S.flags.retired=false;
  const idx=JOBS.findIndex(j=>j.t==='軟體工程師');S.job=hireJob(JOBS[idx>=0?idx:40]);S.job.perf=70;
  for(let y=0;y<40&&!S.dead;y++){const m0=S.money,s0=S.job?S.job.sal:0,a0=S.age;try{ageUp()}catch(e){rows.push('ERR '+e.message);break}
   if(run===0&&(y%3===0))rows.push(a0+'→'+S.age+' sal '+s0+' -> '+(S.job?S.job.sal:0)+' dMoney '+(S.money-m0)+' live '+(typeof livingCost==='function'?livingCost():'?'))}
 }
 return rows.join('\\n')}`,ctx);
console.log(ctx.T());
