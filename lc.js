const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

vm.createContext(ctx);vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=()=>{const o=[];for(const y of [2000,2015,2026,2040,2060,2080]){newGame('a','男');mFix();S.age=35;S.year=y;S.byear=y-35;S.edu=4;S.job={t:'行政助理',sal:0,var:0,lv:1,years:10,perf:50,cn:'TW'};const j=JOBS.find(x=>x.t==='行政助理');S.job=hireJob(j);S.job.years=10;o.push([y,Math.round(S.job.sal/1e4),Math.round(livingCost()/1e4),Math.round(WI()*100)/100])}return o}`,ctx);console.log(JSON.stringify(ctx.T()));
