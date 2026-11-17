const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

ctx.fs=fs;vm.createContext(ctx);
vm.createContext(ctx);vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){const o={};newGame('陳甲','男');mFix();
 const cnt={};for(let i=0;i<4000;i++){const c=pick(SUR);cnt[c]=(cnt[c]||0)+1}o.top=Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,12).map(x=>x[0]+(x[1]/40).toFixed(1)+'%').join(' ');o.nsur=Object.keys(cnt).length;
 o.era=[1950,1970,1985,1995,2005,2015].map(y=>[1,2,3,4,5,6,7,8].map(()=>twGiven('男',y)).join('/')+' | '+[1,2,3,4,5,6,7,8].map(()=>twGiven('女',y)).join('/'));
 o.full=[1,2,3,4,5,6].map(()=>fullName(pick(['男','女']))).join(' ');
 o.parents=S.mom.n+' '+S.dad.n;
 let bad=0;for(let i=0;i<5000;i++){const n=fullName(i%2?'男':'女');if(!n||/undefined|NaN/.test(n)||n.length<2||n.length>6)bad++}o.bad=bad;
 o.nm=Object.fromEntries(Object.entries(NM).map(([k,v])=>[k,v.s.length+'/'+v.M.length+'/'+v.F.length]));
 o.foreign=['jp','kr','en','de','es','ar','hi','afr'].map(k=>nameOf(k,'男')+'; '+nameOf(k,'女')).join(' || ');
 let dup=0;for(const k in NM)for(const x of ['s','M','F'])if(new Set(NM[k][x]).size!==NM[k][x].length)dup++;o.dup=dup;
 return o}`,ctx);console.log(JSON.stringify(ctx.T(),null,1));
