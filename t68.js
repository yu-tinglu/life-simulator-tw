const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

ctx.fs=fs;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 const out=[];const ok=(c,m)=>{out.push((c?'OK ':'FAIL ')+m)};
 ask=(t,l,cb)=>cb(0);showEnd=()=>{};
 newGame('甲','男');mFix();S.age=26;S.money=500000;S.ap=9;
 S.friends=[newFriend(),newFriend()];S.partner=null;
 S.crush=[newCrush('x')];mkPartner(S.crush[0]);S.ap=9;
 let h=relHTML();ok(h.includes('<svg'),'rel avatars '+(h.match(/<svg/g)||[]).length);
 ok(h.includes('kp:a'),'kp buttons');
 const r1=kpDo('a');ok(r1[1]==='good','kp a');ok(kpDo('a')[1]==='bad','kp a once');
 const r2=kpDo('b');ok(r2[1]==='good','kp b');
 ok(subHTML('mom').includes('npcbig'),'mom page avatar');ok(subHTML('f0').includes('npcbig'),'friend avatar');
 const pp=partnerPage();ok(pp.includes('伴侶檔案')&&pp.includes('npc'),'partner page '+pp.length);
 ok(pp.includes('data-a="pb:cook"'),'pb buttons');
 for(const a of PBA){S.acts={};S.ap=9;S.money=100000;const r=pbRun(a[0]);ok(r&&r[0],a[0]+': '+(r&&r[0]).slice(0,40))}
 S.partner.pb.kn=100;ok(pbProfile(S.partner).includes('小秘密')&&!/了解度 100／80/.test(pbProfile(S.partner)),'profile unlocked');
 S.ap=9;S.partner.cohab=true;ok(pbRun('pet')[1]==='good','pet');ok(pbRun('mf')[0].length>0,'mf');ok(pbRun('mi')[0].length>0,'mi');
 S.partner.rel=30;S.acts={};ok(partnerPage().includes('pb:rec'),'rec shown');
 handle('pb:night');handle('kp:a');
 const j=crush=>0;
 // tuition
 newGame('乙','女');mFix();S.age=18;S.fam='小康';enroll('大學',4,100000,0);S.grade=90;S.smarts=90;S.money=200000;queue.length=0;
 yearly();ok(queue.some(q=>q.run&&q.run().t&&/學費/.test(q.run().t)),'tuition event queued');
 const ev=queue.find(q=>q.run&&/學費/.test(q.run().t)).run();const m0=S.money;
 ev.c.forEach(c=>{S.money=m0;S.sloan=0;const r=c.f();ok(r&&r[0],c.l.slice(0,14)+' -> '+r[0].slice(0,24)+' loan '+S.sloan)});
 S.sloan=100000;S.school=null;S.sgr=0;yearly();yearly();ok(S.sloan<100000*1.02&&S.sloan>0||S.sloan===0,'repay '+S.sloan);
 ok(netWorth()<S.money+1,'networth includes loan');
 // abroad
 newGame('丙','男');mFix();S.fam='清寒';S.age=18;S.edu=3;S.school=null;S.grade=85;S.smarts=88;S.money=20000;
 let suc=0;for(let i=0;i<60;i++){S.acts={};S.cn='TW';S.ab=null;S.school=null;S.money=20000;S.sloan=0;const r=wUniSch('US');if(S.school==='大學')suc++}
 ok(suc>0,'sch success '+suc+'/60');
 S.acts={};S.cn='TW';S.ab=null;S.school=null;S.edu=3;const e=E_UNI.run();ok(e.c.some(c=>/出國/.test(c.l)),'E_UNI has abroad: '+e.c.map(c=>c.l).join('|'));
 const ab=e.c.find(c=>/出國/.test(c.l));ab.f();const ev2=queue[0].run();ok(/哪個國家/.test(ev2.t),'country pick '+ev2.c.length);
 ev2.c[0].f();const ev3=queue[0].run();ok(ev3.c.length===3,'mode pick');
 S.ab=null;S.cn='TW';S.age=15;S.school='高中';S.grade=90;S.smarts=90;S.acts={};let hs=0;for(let i=0;i<80;i++){S.acts={};S.cn='TW';S.ab=null;wHSsch('GB');if(S.ab)hs++}
 ok(hs>0,'hs sch '+hs);
 // whole-life sims
 for(let k=0;k<12;k++){newGame('丁','女');mFix();let g=0;while(!S.dead&&g++<100){try{ageUp()}catch(e){out.push('ERR '+e.stack.split('\\n').slice(0,3).join('|'));break}
  if(S.partner&&chance(.5))try{pbRun(PBA[R(0,PBA.length-1)][0])}catch(e){out.push('ERR pb '+e.message)}
  if(chance(.3))try{relHTML();partnerPage&&S.partner&&partnerPage()}catch(e){out.push('ERR html '+e.message)}}}
 return out}`,ctx);
console.log(ctx.T().join('\n'));
