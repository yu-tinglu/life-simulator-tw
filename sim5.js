const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(N){
 ask=(t,l,cb)=>cb(0);showEnd=()=>{};showReport=(r,cb)=>{cb&&cb()};
 const res=[];let errs={};
 for(let r=0;r<N;r++){try{
  newGame('','男');S.age=24;S.edu=4;S.money=3e7;busy=false;queue=[];
  showSheet('job');
  handle('found:list');handle('found:pick:'+(Math.random()*20|0));handle('found:go');
  let g=0;
  while(!S.dead&&g++<90){ageUp();if(S.co&&Math.random()<.3){handle('co:capex:1000000');handle('co:rep')}}
  res.push([S.age,S.co?'co':'-',S.coHist,Math.round(netWorth()/1e6)]);
 }catch(x){errs[x.message+' '+(x.stack||'').split('\\n')[1]]=1}}
 return {errs:Object.keys(errs),sample:res.slice(0,12),withCo:res.filter(x=>x[1]==='co').length,n:res.length};
}`,ctx);
console.log(JSON.stringify(ctx.T(200)));
