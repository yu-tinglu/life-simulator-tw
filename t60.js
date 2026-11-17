const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

ctx.fs=fs;vm.createContext(ctx);
vm.createContext(ctx);vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){ask=(t,l,cb)=>cb(0);showEnd=()=>{};let kept=0,mx=0,n=30,evs=0;for(let i=0;i<n;i++){newGame('甲',i%2?'男':'女');mFix();S.partner={n:'丙',sx:i%2?'女':'男',rel:70,married:true,off:0,a:0,seen:{t:1,g:1,p:1,o:1},since:S.age,cohab:true};let g=0;S.age=24;while(!S.dead&&g++<70){try{ageUp()}catch(e){break}if(S.age===50&&S.partner)kept++}
  mx+=Object.keys(S.seen).filter(k=>k.startsWith('mx_')).length;evs+=Object.keys(S.seen).length}return {kept,n,mxPerLife:mx/n,evsPerLife:evs/n}}`,ctx);console.log(JSON.stringify(ctx.T()));
