const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(N){ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};const c={},ages=[];
 for(let i=0;i<N;i++){newGame('甲',i%2?'男':'女');mFix();for(let k=0;k<115&&!S.dead;k++){try{ageUp()}catch(e){break}}
  const key=(S.cause||'?').replace(/[0-9]/g,'');c[key]=c[key]||[0,0];c[key][0]++;c[key][1]+=S.age;ages.push(S.age)}
 const o=Object.entries(c).map(([k,v])=>[k,v[0],Math.round(v[1]/v[0])]).sort((a,b)=>b[1]-a[1]).slice(0,14);
 ages.sort((a,b)=>a-b);return {o,med:ages[N>>1],p10:ages[N/10|0]}}`,ctx);
console.log(JSON.stringify(ctx.T(400)));
