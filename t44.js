const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 ask=(t,l,cb)=>cb(0);showEnd=()=>{};const o={};
 window.__chal='poor';newGame('甲','男');mFix();o.fam=S.fam;o.ch=S.chal;
 S.cn='JP';S.trav={FR:1,KR:2};for(let i=0;i<5;i++)try{ageUp()}catch(e){o.err=String(e)}
 o.dex=Object.keys(JSON.parse(localStorage.getItem(DXK)||'{}'));view.lsub='dx';const h=lifeHTML();o.len=h.length;o.hasname=/日本/.test(h);o.sample=Object.values(CNS)[0];return o}`,ctx);
console.log(JSON.stringify(ctx.T()));
