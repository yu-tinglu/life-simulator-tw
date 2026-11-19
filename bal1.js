const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub,createElement:()=>stub,body:stub,head:stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.B=function(runs){
 showEnd=()=>{};ask=(t,l,cb)=>cb(globalThis.POL===0?0:Math.floor(Math.random()*l.length));
 let cnt=0;const byId={};for(const e of E){const r=e.run;e.run=function(){cnt++;byId[e.id]=(byId[e.id]||0)+1;return r.apply(this,arguments)}}
 const nw={20:[],30:[],40:[],50:[],60:[],70:[]},age=[],fame=[],evBand={'0-17':[0,0],'18-39':[0,0],'40-64':[0,0],'65+':[0,0]},big=[],errs=[];const job40={};let rich=0,famed=0,evy=[];
 const fmx=typeof fmGet==='function'?fmGet:()=>0;
 for(let r=0;r<runs;r++){newGame('',Math.random()<.5?'男':'女');let g=0,mf=0,mx=0;
  while(!S.dead&&g++<200){const c0=cnt,a0=S.age;try{if(!S.job&&!S.school&&S.age>=18&&!S.jail&&!S.dead){const L=JOBS.map((j,i)=>[j,i]).filter(([j,i])=>S.edu>=j.edu&&!jobBlock(j)&&!S.acts['job'+i]).sort(()=>Math.random()-.5).slice(0,4);for(const [j,i] of L){try{handle('job:'+i)}catch(e){}if(S.job)break}}ageUp()}catch(e){errs.push(e.message.slice(0,80));break}
   const d=cnt-c0,b=a0<18?'0-17':a0<40?'18-39':a0<65?'40-64':'65+';evBand[b][0]+=d;evBand[b][1]++;evy.push(d);
   if(S.age===40&&S.job){(job40[S.job.t]=job40[S.job.t]||[]).push(netWorth())}if(nw[S.age]){try{nw[S.age].push(netWorth()/(px(1000)/1000))}catch(e){}}
   try{mf=Math.max(mf,fmx())}catch(e){} try{mx=Math.max(mx,netWorth()/(px(1000)/1000))}catch(e){}}
  age.push(S.age);fame.push(mf);big.push(mx);if(mx>=1e8)rich++;if(mf>=60)famed++}
 const q=(a,p)=>{a=a.slice().sort((x,y)=>x-y);return a.length?a[Math.min(a.length-1,Math.floor(a.length*p))]:0};
 const o={runs,errs:[...new Set(errs)].slice(0,3),richPct:rich/runs,famedPct:famed/runs,ageMed:q(age,.5),evPerYear:{}};
 for(const b in evBand)o.evPerYear[b]=+(evBand[b][0]/Math.max(1,evBand[b][1])).toFixed(2);
 o.years3plus=evy.filter(x=>x>=3).length/evy.length;o.years5plus=evy.filter(x=>x>=5).length/evy.length;
 o.nw={};for(const a in nw)o.nw[a]=[q(nw[a],.1),q(nw[a],.5),q(nw[a],.9),q(nw[a],.99)].map(x=>Math.round(x/1e4)+'萬');
 o.fameP=[q(fame,.5),q(fame,.9),q(fame,.99)];o.maxNW=[q(big,.5),q(big,.9),q(big,.99)].map(x=>Math.round(x/1e4)+'萬');
 o.mine=Object.entries(byId).filter(x=>/^(jd_|arc[123]|cq|np_|x_|turn_|wish|ac126)/.test(x[0])).sort((a,b)=>b[1]-a[1]).map(x=>x[0]+':'+(x[1]/runs).toFixed(2));o.top=Object.entries(byId).sort((a,b)=>b[1]-a[1]).slice(0,18).map(x=>x[0]+':'+(x[1]/runs).toFixed(2));
 o.jobs=Object.entries(job40).filter(x=>x[1].length>=3).map(x=>[x[0],x[1].length,Math.round(q(x[1],.5)/1e4)]).sort((a,b)=>b[2]-a[2]);return o}`,ctx);
globalThis.POL=+process.argv[3]||0;ctx.POL=globalThis.POL;console.log(JSON.stringify(ctx.B(+process.argv[2]||150),null,1));
