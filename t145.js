const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub,createElement:()=>stub,body:stub,head:stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;ask=(t,l,cb)=>cb(0);
let bad=0,ran=0;const ids=E.filter(e=>/^(cq_|cqf_|turn_|wish128)/.test(e.id)&&/whistle|stay|post|turn|wish/.test(e.id));
function setup(){newGame('測','男');S.age=40;S.money=2e7;S.friends=[{n:'a',rel:60}];S.school=null;S.job={t:'工程師',sal:900000,lv:2,years:8,perf:50};g127();S.partner={n:'x',rel:50,married:true};}
for(let i=0;i<400;i++){setup();for(const ev of ids){
 const id=ev.id;if(id.startsWith('cqf_')){const k=id.slice(4),act=['report','warn','silent'][i%3];cqAdd(k,0,{n:'小傑',act,half:i%2})}
 if(id==='wish128'){S.wish={goal:'wealth',from:'前人'}}
 let ok=false;try{ok=!!ev.if()}catch(e){bad++;console.log('if',id,e.message)}
 if(!ok)continue;const r=ev.run();r.c.forEach(c=>{try{const x=c.f();ran++;if(!x||!x[0])bad++}catch(e){bad++;console.log(id,e.message)}});}}
console.log('ran',ran,'bad',bad);
// succession
newGame('老王','男');S.age=80;S.money=5e7;S.goal='wealth';S.flags.goalDone=1;S.karma=80;
S.kids=[{id:1,n:'小王',age:50,sx:'男',rel:70,done:0,cn:'TW'}];
try{const r=estateCalc(false);applySuccession(r,S.kids[0]);console.log('after',S.name,S.gen,JSON.stringify(S.lg),S.flags.motto,S.net)}catch(e){console.log('succ err',e.message)}
console.log(famHTML().length>50);
`,ctx);
