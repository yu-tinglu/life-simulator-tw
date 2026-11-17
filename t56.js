const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

ctx.fs=fs;vm.createContext(ctx);
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){ask=(t,l,cb)=>{};showEnd=()=>{};const o={},bad=s=>/NaN|undefined|Infinity/.test(s);let bads=0,n=0;
 newGame('甲','男');mFix();
 for(const ex of [null,'happy','sad','cry','angry','sick','shock'])for(const sp of [null,'wedding','grad','hospital'])for(const sx of ['男','女'])for(const age of [2,10,30,70]){const a=Object.assign(avSelf(),{ex,sp,sx,age});const s=avSVG(a,60);n++;if(bad(s))bads++}
 o.n=n;o.bads=bads;
 S.age=30;S.log.push({age:30,lines:[{t:'你的婚禮盛大舉行',c:'good'},{t:'x',c:'good'}]});S.age=30;o.ctx=avCtx();
 S.log.push({age:30,lines:[{t:'親人過世',c:'bad'}]});o.ctx2=avCtx();
 const ob={innerHTML:''};document.getElementById=()=>ob;ask=(function(){return 0});
 return o}`,ctx);console.log(JSON.stringify(ctx.T()));
