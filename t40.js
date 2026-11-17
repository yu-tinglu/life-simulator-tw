const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 ask=(t,l,cb)=>cb(0);showEnd=()=>{};
 const o={};newGame('測試','男');mFix();
 for(let i=0;i<40;i++){try{ageUp()}catch(e){o.err=String(e);break}}
 o.age=S.age;o.nh=(S.netHist||[]).length;
 o.sv=slSave(1);o.s1=slSave(2);const a=S.age;S.age=99;o.ld=slLoad(1);o.back=S.age===a;
 for(const sub of ['sv','tl','ch']){view.lsub=sub;const h=lifeHTML();o[sub]=h.length}
 o.more=moreHTML().includes('lf:tl');o.del=slDel(2);return o};`,ctx);
console.log(JSON.stringify(ctx.T()));
