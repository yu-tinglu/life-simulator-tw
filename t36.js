const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(N){
 ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};
 const NL=String.fromCharCode(10);let errs={},ev={},top={};
 for(let r=0;r<N;r++){try{
  newGame('','男');busy=false;queue=[];mFix();
  for(let y=0;y<60;y++){S.health=100;S.money=Math.max(S.money,5e6);
   const l=artsFor(S.cn||'TW').concat(ARTS);for(let i=0;i<2;i++)artLearn(l[Math.random()*l.length|0].id);
   ageUp();if(S.dead)break;artHTML()}
  const m=artMax();if(m)top[ARTALL[m[0]].n]=(top[ARTALL[m[0]].n]||0)+1;
 }catch(x){errs[x.message+' '+(x.stack||'').split(NL)[1]]=1}}
 // 所有國家頁面
 let bad=0;for(const k of Object.keys(CNS)){try{S.cn=k;const h=artHTML();if(!h.includes('特色才藝'))bad++;artsFor(k).forEach(a=>{if(!ARTALL[a.id]||!a.n||!isFinite(a.cost))bad++})}catch(x){errs['ctry '+k+x.message]=1}}
 return {errs:Object.keys(errs),bad,cnt:Object.keys(ARTALL).length,top:Object.entries(top).sort((a,b)=>b[1]-a[1]).slice(0,8)};
}`,ctx);
console.log(JSON.stringify(ctx.T(60)));
