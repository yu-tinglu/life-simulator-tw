const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};let t0=Date.now(),n=0,mx=0,ages=[];
 for(let i=0;i<40;i++){newGame('測','男');mFix();let a=Date.now();for(let k=0;k<110&&!S.dead;k++){try{ageUp()}catch(e){return 'ERR '+e}}mx=Math.max(mx,Date.now()-a);ages.push(S.age);n++}
 return {lives:n,totalMs:Date.now()-t0,worstLifeMs:mx,avgAge:ages.reduce((a,b)=>a+b)/n,saveKB:Math.round(JSON.stringify(S).length/1024)}};`,ctx);
console.log(JSON.stringify(ctx.T()));
