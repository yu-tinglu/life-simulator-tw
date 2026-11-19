const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub,createElement:()=>stub,body:stub,head:stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;ask=(t,l,cb)=>cb(0);
let bad=0,ran=0;const A=E.find(e=>e.id==='jd_a'),M=E.find(e=>e.id==='jd_ms');
for(const j of JOBS){for(let i=0;i<80;i++){newGame('測','男');S.age=35;S.money=1e6;S.job={t:j.t,sal:j.sal,lv:2,years:11,perf:50,mast:30};
 for(const ev of [A,M]){S.job.jdm=0;let ok=false;try{ok=ev.if()}catch(e){bad++;console.log('if',j.t,e.message)}
  if(!ok){bad++;console.log('noif',j.t,ev.id);continue}
  const r=ev.run();if(!r.t||r.t.includes('undefined'))bad++;r.c.forEach(c=>{try{const x=c.f();ran++;if(!x||!x[0]||String(x[0]).includes('undefined'))bad++}catch(e){bad++;console.log(j.t,e.message)}})}}}
console.log('ran',ran,'bad',bad);
newGame('測','男');S.age=50;S.flags={dream:1,famFirst:1,fit:1,push:1,bold:1,memoir:1};S.partner={n:'x',rel:50};S.job={t:'廚師',sal:5e5,lv:1,years:3,perf:50,mast:10};const h=S.health;yearly();console.log('yearly ok',S.partner.rel,S.health>=h);
`,ctx);
