const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 ask=(t,l,cb)=>cb(0);showEnd=()=>{};const o={};
 const run=(sd)=>{window.__seed=sd;newGame('甲','男');mFix();const a=[S.smarts,S.looks,S.fam,S.health,S.byear,S.dad.n];for(let i=0;i<3;i++)ageUp();return JSON.stringify(a)+S.seed};
 o.a=run('ABC123');o.b=run('abc123');o.c=run('');o.same=o.a===o.b;o.diff=o.a!==o.c;
 S.cause='x';o.sum=sumHTML().includes('種子代碼 ');o.lt=/種子代碼/.test(lifeText());
 const p=setHTML();o.set=/減少動畫/.test(p)&&/特大/.test(p);o.rm=lfHandle('set','rm','1');applyPref();return o}`,ctx);
console.log(JSON.stringify(ctx.T()));
