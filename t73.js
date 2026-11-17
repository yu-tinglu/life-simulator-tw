const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

ctx.fs=fs;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 const out=[];const ok=(c,m)=>{out.push((c?'OK ':'FAIL ')+m)};
 ask=(t,l,cb)=>cb(0);showEnd=()=>{};
 // inheritance
 let got=0,tot=0;
 for(const fam of ['清寒','小康','富裕']){let s=0;for(let i=0;i<30;i++){newGame('甲','男');mFix();S.fam=fam;S.age=35;S.friends=[newFriend()];S.friends[0].sib=true;S.mom.alive=true;S.dad.alive=false;const m0=S.money;parentEstate(S.dad);s+=S.money-m0}out.push(fam+' avg dad inheritance '+Math.round(s/30))}
 newGame('乙','男');mFix();S.fam='小康';S.age=40;S.friends=[];S.mom.alive=true;S.dad.alive=false;let m1=S.money;parentEstate(S.dad);ok(S.money>m1,'got share w/ mom alive '+(S.money-m1)+' mom.est '+S.mom.est);
 S.mom.alive=false;m1=S.money;parentEstate(S.mom);ok(S.money>m1,'mom later '+(S.money-m1));
 out.push(S.log[S.log.length-1].lines.slice(-2).join(' | '));
 // salary
 newGame('丙','男');mFix();S.age=22;S.edu=4;S.school=null;S.money=0;S.mom.alive=false;S.dad.alive=false;S.partner=null;
 const idx=JOBS.findIndex(j=>j.t==='軟體工程師');S.job=hireJob(JOBS[idx]);S.job.perf=70;S.job.lv=1;const path=[S.job.sal];
 for(let y=0;y<15&&!S.dead&&S.job;y++){ageUp();if(S.job)path.push(S.job.sal)}
 out.push('salary path '+path.map(x=>Math.round(x/1000)).join(','));
 const L=S.log.map(x=>x.lines).flat().filter(l=>/年度收支/.test(l.t||l));ok(L.length>0,'summary '+(L[0]&&(L[0].t||L[0])).slice(0,100));
 // bank
 newGame('丁','女');mFix();S.age=30;S.money=2000000;S.fam='小康';
 handle('bk:amt:500000');handle('bk:dep');ok(S.bk.c===500000&&S.money===1500000,'dep');
 handle('bk:fd:2');ok(S.bk.fd.length===1,'fd');
 const nw=netWorth();ok(nw>=2000000-1,'nw includes bank '+nw);
 yearly();yearly();ok(S.bk.fd.length===0&&S.bk.c>500000,'fd matured c='+S.bk.c);
 const h=astHTML();ok(h.includes('銀行存款'),'ast bank section');
 S.money=-1000;S.bk.c=5000;yearly();ok(S.money>=-1000+0,'cover');
 for(let y of [1995,2003,2012,2021,2026,2030]){S.year=y;}
 return out}`,ctx);
console.log(ctx.T().join('\n'));
