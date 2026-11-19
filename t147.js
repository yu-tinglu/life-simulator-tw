const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub,createElement:()=>stub,body:stub,head:stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;ask=(t,l,cb)=>cb(0);
const keys=Object.keys(ARC131);console.log('arcs',keys.length,'missing',keys.filter(k=>!JOBS.find(j=>j.t===k)).join(','));
let bad=0,ran=0;const [A1,A2,A3]=['arc1','arc2','arc3'].map(id=>E.find(e=>e.id===id));
for(const k of keys){const j=JOBS.find(x=>x.t===k);for(let i=0;i<60;i++){newGame('測','男');S.age=35;S.job={t:k,sal:j.sal,lv:2,years:6,perf:60,mast:30};
 for(const ev of [A1,A2,A3]){let ok;try{ok=ev.if()}catch(e){bad++;console.log('if',k,e.message);continue}
  if(!ok){bad++;console.log('noif',k,ev.id);break}
  const r=ev.run();if(r.t.includes('undefined'))bad++;const c=r.c[i%r.c.length];try{const x=c.f();ran++;if(!x||String(x[0]).includes('undefined')){bad++;console.log(k,ev.id,x)}}catch(e){bad++;console.log(k,e.message)}
  const a=S.arc131[k];if(a&&a.st>0)S.age+=4;}}}
console.log('ran',ran,'bad',bad);
`,ctx);
