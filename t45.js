const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 ask=(t,l,cb)=>cb(0);const o={};newGame('甲','男');mFix();for(let i=0;i<60&&!S.dead;i++)try{ageUp()}catch(e){o.err=String(e);break}
 S.cause=S.cause||'自然老化';const h=sumHTML();o.len=h.length;o.d=sumData();o.ei=endInfo().length;try{showEnd();o.show='ok'}catch(e){o.show=String(e)}return o}`,ctx);
console.log(JSON.stringify(ctx.T()).slice(0,900));
