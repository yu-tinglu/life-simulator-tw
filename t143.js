const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub,createElement:()=>stub,body:stub,head:stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;ask=(t,l,cb)=>cb(0);
newGame('測','男');
// migration
const o=fix126({age:5,money:NaN,health:'x'});console.log(JSON.stringify([o.sv,o.money,o.health,o.acts,o.ap]));
// ac events
let bad=0,ran=0;
for(const k of ['sing','paint','ball','dance']){for(let i=0;i<300;i++){newGame('測','男');S.age=30;S.art={};S.art[k]=80;S.money=1e6;
 for(let st=1;st<=3;st++){const ev=E.find(e=>e.id==='ac126_'+st);S.ac126={};S.ac126[ARTALL[k].c]=st-1;
  if(!ev.if()){bad++;continue}const r=ev.run();r.c.forEach(c=>{try{const x=c.f();ran++;if(!x||!x[0])bad++}catch(e){bad++;console.log(e.message)}})}}}
console.log('ran',ran,'bad',bad);
`,ctx);
