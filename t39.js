const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(N){
 ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};
 let mjs={},errs={},st={},edus={},inc=[],sample=[],cost=0;
 for(let r=0;r<N;r++){try{
  newGame('','男');S.age=28;S.money=5e8;S.health=100;busy=false;queue=[];
  S.partner={n:'配偶',sx:'女',rel:80,married:true,off:0};
  S.kids.push(newKid('男','甲'));S.kids[0].tutor=r%2===0;S.kids[0].train=r%3===0;
  for(let y=0;y<30;y++){S.health=100;S.happy=70;ageUp();if(S.dead)break}
  const k=S.kids[0];if(!k)continue;mjs[k.mj||"-"]=(mjs[k.mj||"-"]||0)+1;if(k.mj&&sample.length<6)sample.push([k.mj,k.occ,Math.round(k.inc/1e4)]);
  edus[k.edu]=(edus[k.edu]||0)+1;st[k.sn]=(st[k.sn]||0)+1;if(k.inc)inc.push(k.inc);
  if(sample.length<8)sample.push([k.tal,k.pers,k.sm,k.tutor,EDU[k.edu],k.sn,k.occ,Math.round(k.inc/1e4)]);
 }catch(x){errs[x.message+' '+(x.stack||'').split('\\n')[1]]=1}}
 inc.sort((a,b)=>a-b);
 return {errs:Object.keys(errs),mjs,sample};
}`,ctx);
console.log(JSON.stringify(ctx.T(120)));
