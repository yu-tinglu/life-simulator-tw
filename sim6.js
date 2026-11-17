const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(N){
 ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};
 let errs={},bad=0,visas={},ret=0,pr=0,cit=0,res=[];
 for(let r=0;r<N;r++){try{
  newGame('','男');S.age=20;S.edu=4;S.money=2e7;busy=false;queue=[];
  const k=CNK[r%CNK.length],route=['whv','work','study','invest'][r%4];
  if(route==='whv')S.age=24;
  showSheet('cn');handle('cn:sub:'+k);handle('cn:mv:'+k+':'+route);
  let g=0,seen=S.cn!=='TW';
  while(!S.dead&&g++<75){
    ageUp();
    if(S.cn!=='TW'){seen=true;visas[S.ab.visa]=(visas[S.ab.visa]||0)+1;
      if(!S.job&&Math.random()<.9)for(let t=0;t<6;t++)handle('job:'+(Math.random()*JOBS.length|0));
      if(Math.random()<.2)handle('cn:lang');if(Math.random()<.3)handle('cn:pr');if(Math.random()<.2)handle('cn:cit');
      handle('cn:fxb:'+k+':100000');
    }
    cnHTML(null);cnHTML('fx');cnHTML(k);jobHTML();astHTML();
    for(const q in S.fx)if(!isFinite(S.fx[q])||S.fx[q]<=0)bad++;
    if(!isFinite(S.money)||!isFinite(netWorth()))bad++;
    if(Math.random()<.05&&S.cn!=='TW')handle('cn:home');
  }
  if(seen&&S.cn==='TW')ret++;
  res.push([k,route,S.age,S.cn,S.ab&&S.ab.visa,Math.round(netWorth()/1e6)]);
 }catch(x){errs[x.message+' '+(x.stack||'').split('\\n')[1]]=1}}
 return {errs:Object.keys(errs),bad,visas,ret,sample:res.slice(0,16)};
}`,ctx);
console.log(JSON.stringify(ctx.T(160)));
