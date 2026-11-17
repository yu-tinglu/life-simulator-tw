const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

ctx.fs=fs;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};const seen={};const cnt={};
 for(let run=0;run<30;run++){
  newGame('甲','男');mFix();S.age=21;S.edu=4;S.school=null;S.fam='小康';S.money=0;S.mom.alive=false;S.dad.alive=false;S.partner=null;S.kids=[];
  const idx=JOBS.findIndex(j=>j.t==='軟體工程師');const mk=()=>{const o=hireJob(JOBS[idx>=0?idx:40]);o.perf=65;let v=o.sal;Object.defineProperty(o,'sal',{get(){return v},set(x){const d=(x-v)/v;if(Math.abs(d)>.03){const st=new Error().stack.split('\\n').slice(2,4).map(s=>s.trim().replace(/.*evalmachine.\\w+:(\\d+):(\\d+)\\)?/,'L$1')).join(',');const k=(d>0?'+':'-')+st;(seen[k]=seen[k]||[]).push(Math.round(d*100))}v=x},enumerable:true});return o};
  S.job=mk();
  for(let y=0;y<30&&!S.dead;y++){try{const had=S.job;ageUp();if(S.job&&S.job!==had&&!Object.getOwnPropertyDescriptor(S.job,'sal').get){const s=S.job.sal;}}catch(e){break}}
 }
 const o={};for(const k in seen){const a=seen[k];o[k]=a.length+'x avg '+Math.round(a.reduce((x,y)=>x+y,0)/a.length)+'% min '+Math.min(...a)+' max '+Math.max(...a)}return o}`,ctx);
const r=ctx.T();const src=fs.readFileSync('game.js','utf8').split('\n');for(const k in r){const m=k.match(/L(\d+)/);console.log(k,r[k],'|',m?src[+m[1]-1].trim().slice(0,100):'')}
