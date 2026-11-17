const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};let errs={},done={},starts={},fin={};
 for(let i=0;i<400;i++){newGame('甲','男');mFix();for(let k=0;k<90&&!S.dead;k++){try{ageUp()}catch(e){errs[String(e).slice(0,80)]=1;break}}
  for(const id of Object.keys(S.arcDone||{}))done[id]=(done[id]||0)+1;if(S.arcs)for(const id of Object.keys(S.arcs))fin[id]=(fin[id]||0)+1}
 return {errs:Object.keys(errs),done,unfinished:fin}}`,ctx);
console.log(JSON.stringify(ctx.T()));
