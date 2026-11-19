const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub,createElement:()=>stub,body:stub,head:stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;ask=(t,l,cb)=>cb(0);
let bad=0,ran=0;const ids=E.filter(e=>/^(cq_|cqf_|np_)/.test(e.id)).map(e=>e.id);console.log(ids.length,'events');
function setup(){newGame('測','男');S.age=40;S.money=2e7;S.friends=[{n:'a',rel:60}];S.school=null;S.job={t:'工程師',sal:900000,lv:2,years:8,perf:50};g127();}
for(let i=0;i<400;i++){setup();
 for(const id of ids){const ev=E.find(e=>e.id===id);
  if(id==='cq_cheat'){S.school='高中';S.age=16}
  if(id==='np_r0'){S.school='國小';S.age=10}
  if(id.startsWith('cqf_')){cqAdd(id.slice(4),0,{n:'小傑',a:300000})}
  if(id==='np_r1'||id==='np_r2'||id==='np_r3'){S.npc.rival={n:'甲',s:+id[4]-1,t:'友'}}
  if(id==='np_m1'||id==='np_m2'){S.npc.mentor={n:'乙',s:+id[4]-1}}
  let ok=false;try{ok=!!ev.if()}catch(e){bad++;console.log('if',id,e.message)}
  if(!ok){ if(id!=='cq_loan'||0){} continue}
  const r=ev.run();r.c.forEach(c=>{try{const x=c.f();ran++;if(!x||!x[0])bad++}catch(e){bad++;console.log(id,e.message)}});
  S.age=40;S.school=null;
 }}
console.log('ran',ran,'bad',bad);
// goals
for(const g of GOALS){newGame('測','男');S.goal=g.id;const p=goalProg();if(!(p>=0&&p<=1))console.log('badprog',g.id,p);goalOK()}
console.log(goalHTML().length>100,dailyHTML().length>100);
dlStart();console.log('daily',S.daily);const a=Math.random();Math.random=mulb(dlDate());console.log(a===Math.random()? 'seed-ok':'seed-diff');
`,ctx);
