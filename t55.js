const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

vm.createContext(ctx);vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};const errs={},o={};
 const hx=E.filter(e=>e.id.startsWith('hx_'));
 for(const e of hx){newGame('甲','男');mFix();S.age=40;S.money=5e7;S.flags={scamAw:1,tattoo:1,widow:1,quit:1};S.looks=95;S.trav={FR:1,JP:1,KR:1,US:1,GB:1,DE:1};S.arcDone={law:30,ill:30,abr:20,st:30};S.job={t:'x',sal:1e6,var:0,lv:1,years:3,perf:50,cn:'TW'};S.av={g:genFor('TW'),o:{build:-.8}};
  try{if(!e.if()){errs['gate '+e.id]=1;continue}for(let r=0;r<3;r++){const z=e.run();z.c.forEach(c=>{const x=c.f();if(!x||!x[0]||/undefined|NaN/.test(x[0]))errs[e.id]=1})}}catch(x){errs[e.id+x.message]=1}}
 o.hx=hx.length;o.errs=Object.keys(errs);
 // repetition metric: per life count of events by category per decade
 let n=0,rep=0;for(let i=0;i<60;i++){newGame('甲','男');mFix();let last={};for(let k=0;k<80&&!S.dead;k++){const seenCats=[];try{ageUp()}catch(e){break}
  const L=S.log[S.log.length-1];}}
 return o}`,ctx);console.log(JSON.stringify(ctx.T()));
