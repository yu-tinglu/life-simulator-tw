const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub,createElement:()=>stub,body:stub,head:stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;ask=(t,l,cb)=>cb(0);
let bad=0,ran=0;const ids=['x_rival_biz','x_loan_biz','x_mentee_job','x_stay_friend','x_arc_mentor'].map(id=>E.find(e=>e.id===id));
for(let i=0;i<500;i++){newGame('測','男');S.age=40;S.job={t:'廚師',sal:6e5,lv:2,years:8,perf:60,mast:20};
 S.npc={rival:{n:'甲',s:2,t:['友','敵','淡'][i%3]},mentor:{n:'乙',s:0}};S.arc131={'廚師':{st:1,br:'A',q:0,y:30}};Object.assign(S.flags,{loanOK:1,menteeOK:1,stayOK:1});
 for(const ev of ids){let ok=false;try{ok=!!ev.if()}catch(e){bad++;console.log('if',ev.id,e.message)}if(!ok){bad++;console.log('noif',ev.id);continue}
  const r=ev.run();r.c.forEach(c=>{try{const x=c.f();ran++;if(!x||!x[0]||String(x[0]).includes('undefined'))bad++}catch(e){bad++;console.log(ev.id,e.message)}})}}
console.log('ran',ran,'bad',bad);
// arc3 mentor path
newGame('測','男');S.age=45;S.job={t:'廚師',sal:6e5,lv:2,years:12,perf:60,mast:20};S.npc={mentor:{n:'乙',s:1}};S.arc131={'廚師':{st:2,br:'A',q:0,y:40}};const e3=E.find(e=>e.id==='arc3');console.log(e3.if(),String(e3.run().c[0].f()[0]).slice(0,60));
`,ctx);
