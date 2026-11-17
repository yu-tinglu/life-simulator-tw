const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

ctx.fs=fs;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 const out=[];const ok=(c,m)=>{out.push((c?'OK ':'FAIL ')+m)};
 ask=(t,l,cb)=>cb(0);showEnd=()=>{};
 newGame('甲','男');mFix();tlInit();
 S.age=16;S.school='高中';S.edu=2;S.money=100000;S.skl.comm=40;S.looks=80;
 ok(actHTML().includes('ac:c:'),'cat tabs');
 view.acat='打工';ok(actHTML().includes('ac:pj:cvs'),'pt list');
 ok(/NT\\$\\d+/.test(ptHTML()),'rate shown');
 let n=0;for(let i=0;i<30&&!S.ptj;i++){S.acts={};handle('ac:pj:cvs');n++}
 ok(!!S.ptj,'hired after '+n);
 handle('ac:ph:10');ok(S.ptj.h===10,'hours set');
 const m0=S.money;ptPay();ok(S.money>m0,'paid '+(S.money-m0)+' rate '+ptRate(S.ptj));
 handle('ac:pq');ok(!S.ptj,'quit');
 ok(/NT\\$\\d+/.test(ptSummer()[0]),'summer');
 // competitions
 S.tl.sing=90;S.looks=90;let champ=0,deb=0;
 for(let i=0;i<60;i++){S.ent=null;S.job=null;queue.length=0;const d=CPD.find(x=>x.id==='nat_sing');const r=cpRun(d);if(/冠軍/.test(r[0]))champ++;if(queue.length)deb++}
 ok(champ>0,'champs '+champ+' debut offers '+deb);
 S.ent=null;S.school=null;S.age=20;cpSign('演員／歌手','X');ok(S.job&&S.job.t==='演員／歌手','debut job');
 S.job=null;S.school='大學';cpSign('演員／歌手','X');ok(!!S.ent,'trainee');S.school=null;S.age=22;yearly();ok(S.job&&!S.ent,'auto debut '+(S.job&&S.job.t));
 // running
 S.runlv=50;S.skl.fit=60;S.age=25;const r5=rnRun('5K',5);ok(/成績/.test(r5[0]),r5[0]);
 const rm=rnRun('全程馬拉松',42.195);ok(true,rm[0]);
 ok(cpRecHTML().includes('歷年成績'),'rec page');
 view.acat='紀錄';ok(actHTML().includes('歷年成績'),'rec via act');
 for(const c of ['常用','運動','比賽','才藝','休閒','冒險']){view.acat=c;actHTML()}
 handle('act:runtrain');ok(true,'act run');
 ok(/展開|收合/.test(moreHTML()),'more collapse');
 // pocket money log
 newGame('乙','女');mFix();S.age=6;S.fam='小康';const l0=JSON.stringify(S.log);yearly();ok(/零用錢/.test(JSON.stringify(S.log)),'pocket log');
 // full-life sim
 for(let k=0;k<10;k++){newGame('丙','男');mFix();let g=0;while(!S.dead&&g++<100){try{ageUp()}catch(e){out.push('ERR '+e.stack.split('\\n').slice(0,3).join('|'));break}
  if(S.age>=10&&chance(.5)){for(const a of ACTS)if(canAct(a)&&!S.acts[a.id]&&chance(.3)&&(!a.cost||S.money>=a.cost)){try{handle('act:'+a.id)}catch(e){out.push('ERR act '+a.id+' '+e.message)}}}
  if(S.age>=15&&!S.ptj&&chance(.3)){try{handle('ac:pj:'+PTJOBS[R(0,PTJOBS.length-1)].id)}catch(e){out.push('ERR pj '+e.message)}}}}
 return out}`,ctx);
console.log(ctx.T().join('\n'));
