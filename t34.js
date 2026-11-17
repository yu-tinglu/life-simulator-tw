const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};
 const NL=String.fromCharCode(10);let errs={};
 // 1) 世界事件模擬
 let cnt={},fxmin=9,ev=0;
 for(let r=0;r<40;r++){try{newGame('','男');busy=false;queue=[];for(let y=0;y<60;y++){S.health=100;ageUp();if(S.dead)break}
  (S.wh||[]).forEach(x=>cnt[x.n]=(cnt[x.n]||0)+1);ev+=(S.wh||[]).length;
  for(const k in S.fx){if(!isFinite(S.fx[k])||S.fx[k]<=0)errs['badfx '+k]=1}
  for(const k in S.cs){const c=S.cs[k];if(![c.g,c.pi,c.u].every(isFinite))errs['badcs '+k]=1}
 }catch(x){errs[x.message+' '+(x.stack||'').split(NL)[1]]=1}}
 // 2) 在各國生活
 let fired={},tot=0;
 const ks=WK.slice();
 for(const k of ks){try{newGame('','男');busy=false;queue=[];S.age=30;S.money=2e7;mFix();wEnsure();S.cn=k;S.ab={cn:k,visa:'work',left:5,yrs:0,wk:0,nojob:0,nu:0,minor:0};
  const evs=E.filter(e=>e.id===k+'_cult');if(evs.length!==1){errs['noev '+k]=1;continue}
  const r=evs[0].run();if(!r||!r.t||r.c.length!==3){errs['badrun '+k]=1;continue}
  r.c.forEach(c=>{const o=c.f();if(!o||!o[0])errs['badres '+k]=1});tot++;
 }catch(x){errs[k+x.message+' '+(x.stack||'').split(NL)[1]]=1}}
 // 3) 世界頁面與旅行限制
 let page=0;try{newGame('','男');busy=false;S.age=30;wEnsure();S.wh=[{y:2030,n:'測試',t:'測試事件'}];S.sOvr={FR:S.year+3};const r=wTrip('FR',5);page=[wdHome().includes('近期世界事件'),r&&r[0]]}catch(x){errs['page '+x.message]=1}
 return {errs:Object.keys(errs),ev,cnt,tot,page};
}`,ctx);
console.log(JSON.stringify(ctx.T()));
vm.runInContext(`newGame('','男');busy=false;mFix();wEnsure();S.age=30;S.money=5e7;S.year=2030;S.sOvr={FR:S.year+3};console.log(S.year,JSON.stringify(wTrip('FR',5)),JSON.stringify(wTrip('IT',5)));S.sOvr={__trav:S.year+1};console.log(JSON.stringify(wLearn('ES',2)))`,ctx);
