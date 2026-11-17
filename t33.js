const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(N){
 ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};
 let errs={},maj={},tiers={},jobs={},lic=0,hs={},n=0,docs=0;
 for(let r=0;r<N;r++){try{
  newGame('','男');busy=false;queue=[];
  for(let y=0;y<45;y++){S.health=100;ageUp();if(S.dead)break}
  n++;if(S.major){maj[S.major.n]=(maj[S.major.n]||0)+1;tiers[S.major.tier]=(tiers[S.major.tier]||0)+1;if(S.lic&&S.lic[S.major.cat])lic++}
  if(S.job)jobs[S.job.t]=(jobs[S.job.t]||0)+1;
  hs[S.hsTrack]=(hs[S.hsTrack]||0)+1;
 }catch(x){errs[x.message+' '+(x.stack||'').split(String.fromCharCode(10))[1]]=1}}
 return {n,errs:Object.keys(errs),majors:Object.keys(maj).length,maj,tiers,lic,hs,jobs:Object.entries(jobs).sort((a,b)=>b[1]-a[1]).slice(0,12)};
}`,ctx);
console.log(JSON.stringify(ctx.T(150)));
