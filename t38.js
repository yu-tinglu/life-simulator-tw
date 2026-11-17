const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};
 const NL=String.fromCharCode(10);let errs={},n=0,fired={};
 const gl=E.filter(e=>/^wd_(ethn|relfest|lang|hiinc|loinc|edu)$/.test(e.id)),nx=E.filter(e=>/_x[a-z]+$/.test(e.id)&&!/^wd_/.test(e.id));
 for(const k of WK){newGame('','男');busy=false;queue=[];mFix();S.age=30;S.money=5e6;wEnsure();S.cn=k;S.ab={cn:k,visa:'work',left:5,yrs:0,wk:0,nojob:0,nu:0,minor:0};
  for(const e of gl){try{if(!e.if())continue;fired[e.id]=(fired[e.id]||0)+1;const r=e.run();if(!r||!r.t||/undefined|null|NaN/.test(r.t)){errs['text '+e.id+k]=1;continue}r.c.forEach(c=>{const o=c.f();if(!o||!o[0])errs['res '+e.id]=1;n++})}catch(x){errs[e.id+k+x.message]=1}}}
 for(const e of nx){const k=e.id.split('_')[0];try{newGame('','男');busy=false;queue=[];mFix();S.age=30;S.money=5e6;wEnsure();S.cn=k;S.ab={cn:k,visa:'work',left:5,yrs:0,wk:0,nojob:0,nu:0,minor:0};if(!e.if()){errs['gate '+e.id]=1;continue}const r=e.run();r.c.forEach(c=>{const o=c.f();if(!o||!o[0])errs['res '+e.id]=1;n++})}catch(x){errs[e.id+x.message]=1}}
 return {errs:Object.keys(errs),n,fired,nx:nx.length};
}`,ctx);
console.log(JSON.stringify(ctx.T()));
