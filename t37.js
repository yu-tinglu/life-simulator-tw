const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};
 const NL=String.fromCharCode(10);let errs={},n=0,seen={};
 const labels=['天主教','基督新教','基督教','東正教','伊斯蘭教','佛教','印度教','錫克教','猶太教','民間信仰／道教','神道／佛教（習俗）','一貫道','新興宗教','傳統信仰','其他','無宗教'];
 const evs=E.filter(e=>/^rgx_/.test(e.id));
 for(const l of labels){newGame('','男');busy=false;queue=[];mFix();S.age=30;S.money=5e6;S.rg={r:l,d:60};
  for(const e of evs){try{
   if(!e.if())continue;seen[e.id]=(seen[e.id]||0)+1;
   const r=e.run();if(!r||!r.t||r.c.length<2){errs['bad '+e.id]=1;continue}
   r.c.forEach(c=>{const o=c.f();if(!o||!o[0])errs['res '+e.id]=1;n++});
  }catch(x){errs[e.id+' '+l+' '+x.message]=1}}}
 const never=evs.filter(e=>!seen[e.id]).map(e=>e.id);
 // 實際人生
 for(let r=0;r<40;r++){try{newGame('','男');busy=false;queue=[];mFix();for(let y=0;y<70;y++){S.health=100;ageUp();if(S.dead)break}}catch(x){errs['life '+x.message+(x.stack||'').split(NL)[1]]=1}}
 return {errs:Object.keys(errs),n,evs:evs.length,never};
}`,ctx);
console.log(JSON.stringify(ctx.T()));
