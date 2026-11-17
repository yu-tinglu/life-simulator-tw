const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){ask=(t,l,cb)=>cb(0);showEnd=()=>{};let errs={},n=0,fired={};
 const ev=E.filter(e=>e.id.startsWith('pt_'));
 for(const e of ev){for(const v of [10,90]){newGame('甲','男');mFix();S.age=30;S.money=5e6;for(const k in S.pt)S.pt[k]=v;
  if(!e.if())continue;fired[e.id]=1;for(let r=0;r<2;r++){try{const z=e.run();z.c.forEach(c=>{const o=c.f();if(!o||!o[0]||/undefined|NaN/.test(o[0]))errs[e.id]=1;n++})}catch(x){errs[e.id+x.message]=1}}}}
 newGame('甲','男');mFix();const s=sumHTML(),t=ptTitle();return {errs:Object.keys(errs),n,fired:Object.keys(fired).length,ev:ev.length,t,ok:/個性/.test(sumHTML())}}`,ctx);
console.log(JSON.stringify(ctx.T()));
