const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};
 let errs={},n=0,ev=E.filter(e=>/^[A-Z]{2}_(h\\d{4}|x[a-z]+)$/.test(e.id)),hist=0;
 for(const e of ev){const k=e.id.split('_')[0],m=e.id.match(/_h(\\d{4})$/);try{newGame('','男');busy=false;queue=[];mFix();S.age=30;S.money=5e6;wEnsure();S.cn=k;S.year=m?+m[1]:2020;S.ab={cn:k,visa:'work',left:5,yrs:0,wk:0,nojob:0,nu:0,minor:0};
  if(!e.if()){errs['gate '+e.id]=1;continue}if(m)hist++;
  for(let r=0;r<3;r++){const z=e.run();if(!z||!z.t||/undefined|NaN|null/.test(z.t)){errs['text '+e.id]=1;continue}z.c.forEach(c=>{const o=c.f();if(!o||!o[0]||/undefined|NaN/.test(o[0]))errs['res '+e.id]=1;n++})}}catch(x){errs[e.id+x.message]=1}}
 return {errs:Object.keys(errs),events:ev.length,hist,n}}`,ctx);
console.log(JSON.stringify(ctx.T()));
