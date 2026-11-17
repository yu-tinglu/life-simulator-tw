const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

ctx.fs=fs;vm.createContext(ctx);
vm.createContext(ctx);vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};const o={errs:[]},mx=E.filter(e=>e.id.startsWith('mx_'));o.n=mx.length;
 for(const e of mx){for(let r=0;r<6;r++){newGame('甲','男');mFix();S.age=40+(r%3)*8;S.money=3e6;S.job={t:'x',sal:1e6,var:0,lv:2,years:3,perf:50,cn:'TW'};S.kids=[newKid('男','乙')];S.kids[0].age=r%2?10:25;S.partner={n:'丙',sx:'女',rel:60,married:true,off:0,a:0,seen:{t:1,g:1,p:1,o:1},since:S.age-12,cohab:true,job:'老師',inc:6e5,tru:50,jel:0};S.partner.vl=['m','f','c','r'][r%4];S.partner.fb=['rich','mid','poor'][r%3];
  try{const ok=e.if();const z=e.run();z.c.forEach(c=>{const x=c.f();if(!x||!x[0]||/undefined|NaN/.test(x[0]+z.t))o.errs.push(e.id)})}catch(x){o.errs.push(e.id+x.message)}}}
 newGame('甲','女');mFix();S.age=45;S.partner={n:'丙',sx:'男',rel:60,married:true,off:0,a:0,seen:{t:1,g:1,p:1,o:1},since:30,cohab:true};o.page=partnerPage().includes('家庭背景');
 // firing rate
 let cnt=0,lives=0;for(let i=0;i<40;i++){newGame('甲',i%2?'男':'女');mFix();S.partner={n:'丙',sx:i%2?'女':'男',rel:70,married:true,off:0,a:0,seen:{t:1,g:1,p:1,o:1},since:20,cohab:true};lives++;S.age=24;let g=0;while(!S.dead&&g++<70){try{ageUp()}catch(e){break}}
  Object.keys(S.seen||{}).forEach(k=>{if(k.startsWith("mx_"))cnt++})}
 o.fire=cnt/lives;o.rcmx=S.rc&&S.rc.mx;o.ep=S.partner?1:0;o.age=S.age;o.dead=S.dead;return o}`,ctx);console.log(JSON.stringify(ctx.T()));
