const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};startSuccession=()=>{};
 newGame('','男');S.byear=2000;S.age=18;S.edu=4;S.money=2e6;busy=false;queue=[];
 for(let i=0;i<14;i++){S.health=90;ageUp();handle('pf:b:tw:1000000');}
 const out=S.log.filter(y=>y.age>=22).map(y=>y.age+': '+y.lines.map(l=>l.t).filter(t=>/年（|年：|投資組合/.test(t)).join(' | '));
 return {year:calYear(),pf:pfSum(),mh:S.mh.slice(-4),out:out.slice(0,6),pxi:S.pxi,cost:livingCost(),eco:ecoHTML().length,ast:astHTML().length};
}`,ctx);
console.log(JSON.stringify(ctx.T(),null,1));
