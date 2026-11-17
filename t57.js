const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

ctx.fs=fs;vm.createContext(ctx);
vm.createContext(ctx);vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){newGame('甲','男');mFix();const o={bad:0,rows:{}};
 for(const y of [2000,2008,2009,2013,2020,2022,2025,2027,2040]){S.year=y;S.ir=.02;S.irp=.02;S.irD=0;const r=mktRet(y,0,.03,0);S.fx=S.fx||{};for(const k in r){if(!isFinite(r[k]))o.bad++}o.rows[y]=['bond','tw','us','jp','eu','em','reit'].map(k=>(r[k]*100).toFixed(1)).join('/')}
 // avg over sim years 2000-2025 vs simple means
 return o}`,ctx);console.log(JSON.stringify(ctx.T()));
