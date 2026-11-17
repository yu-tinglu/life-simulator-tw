const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(N){
 ask=(t,l,cb)=>cb(0);showEnd=()=>{};startSuccession=()=>{};showReport=(r,cb)=>{cb&&cb()};
 let errs={},res={},bad=0;
 const opts={ch:4,pr:3,hr:3,ex:3,tp:3};
 for(let r=0;r<N;r++){try{
  newGame('','男');S.age=30;S.edu=4;S.money=3e7;busy=false;queue=[];S.health=100;
  handle('found:list');handle('found:pick:'+(Math.random()*40|0));handle('found:go');
  if(!S.co)continue;
  const P=S.co.policy;for(const k in opts)P[k]=R(0,opts[k]-1);
  coHTML('co:pol');
  for(let y=0;y<25&&!S.dead;y++){S.health=100;ageUp();if(!S.co)break}
  const key=[P.ch,P.pr,P.hr,P.ex,P.tp].join('');res.n=(res.n||0)+1;res.alive=(res.alive||0)+(S.co?1:0);
 }catch(x){errs[x.message+' '+(x.stack||'').split('\\n')[1]]=1}}
 return {errs:Object.keys(errs),res};
}`,ctx);
console.log(JSON.stringify(ctx.T(150)));
