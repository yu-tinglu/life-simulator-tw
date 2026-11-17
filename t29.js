const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub,createElement:()=>stub,body:stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;showEnd=()=>{};const errs={};ask=(t,l,cb)=>cb(Math.random()*l.length|0);
globalThis.T=function(N){const by={},w60=[],byAge={};
 for(let r=0;r<N;r++){newGame('',r%2?'男':'女');S.money+=0;let g=0;
  while(!S.dead&&g++<120){
   if(S.age>=18&&!S.job&&!S.school&&!S.flags.retired)try{handle('job:'+R(0,JOBS.length-1))}catch(e){}
   try{ageUp()}catch(e){errs[e.message]=1;break}
   if(S.job&&!S.job.founder&&S.age>=22&&S.age<=64){(byAge[Math.floor(S.age/10)*10]=byAge[Math.floor(S.age/10)*10]||[]).push(S.job.sal)}
   if(S.age===60)w60.push(Math.round(S.money));
  }}
 w60.sort((a,b)=>a-b);const med=a=>{a.sort((x,y)=>x-y);return Math.round(a[a.length>>1]/1e4)};
 return {medW60:w60[w60.length>>1],age:Object.fromEntries(Object.entries(byAge).map(([k,v])=>[k,med(v)])),errs}};
globalThis.H=function(){newGame('',R(0,1)?'男':'女');S.edu=4;S.smarts=90;const o={};for(const t of ['軟體工程師','醫師','便利商店店員','YouTuber 網紅','護理師','行政助理']){const j=JOBS.find(x=>x.t===t);S.exp=0;S.expBy={};o[t]=salRange(j)}return o}`,ctx);
console.log(JSON.stringify(ctx.H()));console.log(JSON.stringify(ctx.T(+process.argv[2]||60)))
