const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

ctx.OFFP=process.env.OFFP||"";vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;showEnd=()=>{};
const OFF=(globalThis.OFFP||"").split(",").filter(Boolean);if(OFF.length)for(let i=E.length-1;i>=0;i--)if(OFF.some(p=>E[i].id.startsWith(p)))E.splice(i,1);
const NEG=/借|貸|賭|抽菸|菸|酒|吸|偷|詐|逃|不理|硬撐|違法|飆|不戴|不繳|放棄|拒絕就醫|熬夜|冒險|忽略|不去|堅持不|不管/,POS=/就醫|檢查|運動|儲蓄|存|學習|報名|諮詢|休息|保險|健康|謹慎|專業|求助|接受|好好|認真|道歉|協助|陪伴|準備/;
ask=(t,l,cb)=>{let b=[],bs=-9;l.forEach((x,i)=>{const s=(POS.test(x)?1:0)-(NEG.test(x)?2:0)+Math.random()*.5;if(s>bs){bs=s;b=[i]}});cb(b[0])};
globalThis.T=function(N){
 const rows=[],q=(a,p)=>{a=[...a].sort((x,y)=>x-y);return a[Math.min(a.length-1,Math.floor(a.length*p))]};
 for(let i=0;i<N;i++){newGame('甲',i%2?'男':'女');mFix();S.ori=oriPick('隨機');let n60=null,h60=null,k60=0,sal45=0,err=0;
  for(let k=0;k<115&&!S.dead;k++){
   try{
    if(S.age>=18&&!S.job&&!S.school&&!S.flags.retired&&!S.army)handle('job:'+R(0,JOBS.length-1));
    for(const id of ['gym','med','study','pt'])if(!(id==='pt'&&S.age>22)&&!(id==='study'&&!S.school))try{handle('act:'+id)}catch(e){}
    if((S.health<75||S.age>45)&&S.age%2===0)try{handle('act:doc')}catch(e){}
    if(S.age>=20&&!S.partner){handle('rom:meet');for(let j=0;j<S.crush.length;j++){handle('rom:act:'+j+':look');handle('rom:act:'+j+':talk');if(view.scene)handle('rom:pick:0');handle('rom:cf:'+j)}}
    if(S.partner&&!S.partner.married&&S.age>=25)handle('rom:act:p:propose');
    if(S.partner&&S.partner.married&&S.age<40&&S.kids.length<2)handle('rom:act:p:baby');
   }catch(e){}
   try{ageUp()}catch(e){err=1;break}
   if(S.job&&S.age===45)sal45=S.job.sal;if(S.age===60){n60=netWorth();h60=S.happy;k60=S.kids.length}}
  rows.push({age:S.age,died:n60==null,n60,h60,k60,sal45,err,cause:S.cause||''})}
 const a=rows.map(r=>r.age),al=rows.filter(r=>!r.died),nets=al.map(r=>r.n60/1e4),av=x=>x.reduce((p,c)=>p+c,0)/Math.max(1,x.length),cs={};
 rows.filter(r=>r.age<60).forEach(r=>{const k=r.cause.replace(/[0-9]/g,'').slice(0,8);cs[k]=(cs[k]||0)+1});
 return {n:N,errs:rows.filter(r=>r.err).length,ageMed:q(a,.5),ageAvg:+av(a).toFixed(1),p10:q(a,.1),p90:q(a,.9),pre60:+(rows.filter(r=>r.died).length/N).toFixed(2),netP10:Math.round(q(nets,.1)),netMed:Math.round(q(nets,.5)),netP90:Math.round(q(nets,.9)),neg:+(nets.filter(x=>x<0).length/Math.max(1,nets.length)).toFixed(2),kids:+av(al.map(r=>r.k60)).toFixed(2),happy60:Math.round(av(al.map(r=>r.h60))),sal45萬:Math.round(av(al.filter(r=>r.sal45).map(r=>r.sal45))/1e4),topCause:Object.entries(cs).sort((x,y)=>y[1]-x[1]).slice(0,6)}}`,ctx);
console.log(JSON.stringify(ctx.T(+process.argv[2]||300)));
