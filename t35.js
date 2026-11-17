const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(N){
 ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};
 const NL=String.fromCharCode(10);let errs={},st={scam:0,crypto:0,house:0,props:0,sold:0,nwbad:0};
 for(let r=0;r<N;r++){try{
  newGame('','男');busy=false;queue=[];mFix();
  S.money=3e8;
  for(let y=0;y<60;y++){S.health=100;
   if(S.age>=20&&Math.random()<.4)S.pf&&0;
   if(S.age>=25&&!S.house&&Math.random()<.5)lfHandle('hs','buy',(Math.random()*14|0)+'_'+(Math.random()<.5?'c':'l'));
   if(S.house&&S.age>=35&&Math.random()<.3)lfHandle('hs','buy',(Math.random()*14|0)+'_i');
   if(S.age>=22){pfHandle('b',['btc','eth','alt','tw','us','jp','eu','em','reit','bond','gold'][Math.random()*11|0],'1000000')}
   if(S.house&&Math.random()<.05)lfHandle('hs','sell','main');
   if(S.props&&S.props.length&&Math.random()<.1)lfHandle('hs','sell','0');
   S.money=Math.max(S.money,1e7);
   ageUp();if(S.dead)break;
   if(!isFinite(netWorth()))st.nwbad++;
   hsHTML();astHTML();pfHTML();
  }
  if(S.house)st.house++;if(S.props&&S.props.length)st.props++;st.scam+=S.flags.scam||0;
 }catch(x){errs[x.message+' '+(x.stack||'').split(NL)[1]]=1}}
 return {errs:Object.keys(errs),st,ir:S.ir,hmi:S.hmi,pf:S.pf,pfr:S.pfr};
}`,ctx);
console.log(JSON.stringify(ctx.T(60)));
