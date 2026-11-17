const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

ctx.fs=fs;vm.createContext(ctx);
vm.createContext(ctx);vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){newGame('甲','女');mFix();S.age=45;S.partner={n:'丙',sx:'男',rel:60,married:true,off:0,a:0,seen:{t:1,g:1,p:1,o:1},since:30,cohab:true};const c={};for(let i=0;i<300;i++){S.rc={};try{randEvents().forEach(e=>c[e.id]=(c[e.id]||0)+1)}catch(x){c.err=x.message}}return c}`,ctx);console.log(JSON.stringify(ctx.T()));
