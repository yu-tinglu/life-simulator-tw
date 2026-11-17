const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

ctx.fs=fs;vm.createContext(ctx);
vm.createContext(ctx);vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){ask=(t,l,cb)=>cb(0);showEnd=()=>{};newGame('甲','男');mFix();const o={};for(let i=0;i<5;i++){ageUp()}
 const L=S.log.filter(x=>x.d);o.withD=L.length;o.chips=ysChips(L[L.length-1].d).slice(0,200);
 o.bold='你花了 NT$12,000，報酬 -12.5%，30 歲存了 300 萬。'.replace(BOLDRE,'<b>$1</b>');return o}`,ctx);console.log(JSON.stringify(ctx.T()));
