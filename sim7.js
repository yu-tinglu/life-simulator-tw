const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(N){
 ask=(t,l,cb)=>cb(Math.random()*l.length|0);
 let errs={},gens={},bad=0,taxes=[],ends=0,heirs=0;
 showEnd=()=>{ends++};
 // 自動選繼承人
 startSuccession=function(){const r=estateCalc(false);S.estate=r;taxes.push([S.cn,Math.round(r.NE/1e6),Math.round(r.tax/1e6)]);if(!S.kids.length){showEnd();return}const k=S.kids[Math.random()*S.kids.length|0];heirs++;applySuccession(r,k)};
 for(let r=0;r<N;r++){try{
  newGame('','男');S.age=22;S.edu=4;S.money=R(1,60)*1e7;busy=false;queue=[];
  const cc=CNK[r%CNK.length];if(r%3===0){S.cn=cc;S.ab={cn:cc,visa:'pr',left:0,yrs:5,wk:5,nojob:0,nu:0};S.lang[cc]=80}
  S.partner={n:'配偶',sx:'女',rel:80,married:true,off:0};
  if(r%2)S.will={mode:['equal','succ','ability','spouse'][r%4],sh:80,wt:r%5?0:30};
  let g=0,gen0=S.gen||1;
  while(g++<400){
    if(S.dead){break}
    ageUp();
    if(S.kids.length<3&&S.age<45&&S.partner&&Math.random()<.5)handle('do:partner:baby');
    if(S.kids.length&&Math.random()<.2)handle('kid:gift:0:'+1e6);
    if(S.kids.length&&Math.random()<.1)handle('lg:tr:gift:5000000:'+S.kids[0].id);
    legacyHTML();relHTML();if(S.kids.length)kidHTML(0);moreHTML();jobHTML();
    if(!isFinite(S.money))bad++;
    if(S.dead&&S.kids.length===0&&S.gen>1){}
    if(S.dead){break}
  }
  // 死亡後接班已由 startSuccession 處理：若有繼承，S.dead=false 續玩
  let guard=0;while(guard++<6){ if(S.dead)break; let h=0;while(!S.dead&&h++<120)ageUp(); if(!S.dead)break;}
  gens[S.gen||1]=(gens[S.gen||1]||0)+1;
 }catch(x){errs[x.message+' '+(x.stack||'').split('\\n')[1]]=1}}
 return {errs:Object.keys(errs),gens,bad,ends,heirs,taxes:taxes.slice(0,14)};
}`,ctx);
console.log(JSON.stringify(ctx.T(60)));
