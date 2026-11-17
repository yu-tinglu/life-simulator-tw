const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);ctx.OFFP=process.env.OFFP||"";
vm.runInContext(fs.readFileSync('game.js','utf8')+`;const OFF=(globalThis.OFFP||"").split(",").filter(Boolean);if(OFF.length)for(let i=E.length-1;i>=0;i--)if(OFF.some(p=>E[i].id.startsWith(p)))E.splice(i,1);globalThis.T=function(N){
 ask=(t,l,cb)=>cb(0);showEnd=()=>{};
 const rows=[],q=(a,p)=>{a=[...a].sort((x,y)=>x-y);return a[Math.min(a.length-1,Math.floor(a.length*p))]};
 for(let i=0;i<N;i++){newGame('甲',Math.random()<.5?'男':'女');mFix();let err=0;let n60=null,h60=null,k60=0,j60=null;for(let k=0;k<115&&!S.dead;k++){if(S.age>=18&&!S.job&&!S.school&&!S.flags.retired)try{handle('job:'+R(0,JOBS.length-1))}catch(e){}try{ageUp()}catch(e){err=1;break}if(S.age===60){n60=netWorth();h60=S.happy;k60=S.kids.length;j60=!!S.job}}
  rows.push({age:S.age,net:n60==null?netWorth():n60,died:n60==null,edu:S.edu,kids:k60||S.kids.length,married:!!(S.partner&&S.partner.married)||!!S.wasMarried,rec:S.record||0,happy:h60==null?S.happy:h60,job:!!S.job,err})}
 const alive60=rows.filter(r=>!r.died),ages=rows.map(r=>r.age),nets=alive60.map(r=>r.net/1e4),av=a=>a.reduce((x,y)=>x+y,0)/a.length;
 const edu={};rows.forEach(r=>edu[r.edu]=(edu[r.edu]||0)+1);
 return {alive60:alive60.length,n:N,errs:rows.filter(r=>r.err).length,ageAvg:+av(ages).toFixed(1),ageP10:q(ages,.1),ageP50:q(ages,.5),ageP90:q(ages,.9),young:+(ages.filter(a=>a<40).length/N).toFixed(3),
  netP10:Math.round(q(nets,.1)),netP50:Math.round(q(nets,.5)),netP90:Math.round(q(nets,.9)),negShare:+(nets.filter(x=>x<0).length/Math.max(1,nets.length)).toFixed(3),
  kidsAvg:+av(rows.map(r=>r.kids)).toFixed(2),kids0:+(rows.filter(r=>!r.kids).length/N).toFixed(2),recShare:+(rows.filter(r=>r.rec>0).length/N).toFixed(2),happyAvg:Math.round(av(rows.map(r=>r.happy))),edu}}`,ctx);
console.log(JSON.stringify(ctx.T(+process.argv[2]||600)));
