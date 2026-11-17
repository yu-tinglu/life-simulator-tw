const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub,createElement:()=>stub,body:stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;showEnd=()=>{};const errs={};ask=(t,l,cb)=>cb(Math.random()*l.length|0);
globalThis.D=function(){const bad=[];for(const k of WK){const c=CNS[k];for(const f of ['w','fx0','vol','u','g','pi','tax','dep','pr','cit','tu'])if(!(c[f]>=0)||!isFinite(c[f]))bad.push(k+'.'+f+'='+c[f]);
  if(!RGD[k]||!ETHD[k]||!CX[k]||!HCS[k])bad.push(k+' tbl');if(!/[A-Za-z]/.test(WD[k].n)==false&&false)bad.push(k)}return [WK.length,Object.keys(CNS).length,bad.slice(0,10)]};
globalThis.PG=function(){newGame('',1);const o=[];o.push(wdHome().length);for(const r of REGO){o.push(wdReg(r).length)}for(const k of WALL){try{wdCtry(k)}catch(e){o.push(k+':'+e.message)}}return o.filter(x=>typeof x==='string')};
globalThis.L=function(k,yrs){newGame('',R(0,1)?'男':'女');mFix();wEnsure();S.age=25;S.edu=4;S.smarts=70;S.money=3e6;S.cn=k;S.ab={cn:k,visa:'work',left:3,yrs:0,wk:0,nojob:0,nu:0};S.lang[k]=60;
 const j=JOBS.find(x=>S.edu>=x.edu&&!PUB.test(x.t)&&!LIC.test(x.t));S.job=hireJob(j);S.job.cn=k;let g=0;
 try{while(!S.dead&&g++<yrs){ageUp()}}catch(e){errs[k+':'+e.message+(e.stack||'').split(String.fromCharCode(10))[1]]=1}
 return isFinite(S.money)};
globalThis.A=function(){const out={};newGame('',1);mFix();S.age=30;S.money=5e6;S.edu=3;const r={};
 r.trip=wTrip('FR',5)[0];S.acts={};r.trip2=wTrip('SO',14)[0];S.acts={};r.ls=wLearn('ES',4)[0];S.acts={};
 r.uni=wUni('NZ')[0];return r};
globalThis.H=function(){newGame('',1);mFix();S.age=14;S.fam='富裕';S.school='國中';const a=wHS('CH')[0];const c=[S.cn,S.ab&&S.ab.visa];for(let i=0;i<6;i++){try{ageUp()}catch(e){errs['hs:'+e.message]=1;break}}return [a,c,S.age,S.cn,S.school,S.edu]};
globalThis.EXC=function(){newGame('',1);mFix();S.age=20;S.school='大學';S.money=2e6;return wEx('FR')[0]};
`,ctx);
console.log(JSON.stringify(ctx.D()));console.log(JSON.stringify(ctx.PG()));
console.log(JSON.stringify(ctx.A()));console.log(JSON.stringify(ctx.H()));console.log(ctx.EXC());
const ks=vm.runInContext('WK',ctx);let bad=0;for(const k of ks){for(let i=0;i<2;i++){if(!vm.runInContext(`L('${k}',20)`,ctx))bad++}}
console.log('bad',bad,JSON.stringify(vm.runInContext('errs',ctx)).slice(0,1500));
