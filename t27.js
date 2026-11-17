const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub,createElement:()=>stub,body:stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;showEnd=()=>{};const cnt={},errs={};
const _re=randEvents;randEvents=function(){const o=_re();if(globalThis.CUR&&S.cn===globalThis.CUR)o.forEach(e=>cnt[e.id]=(cnt[e.id]||0)+1);return o};
E.forEach(e=>{const r=e.run;e.run=function(){try{return r.apply(this,arguments)}catch(x){errs[e.id]=x.message;throw x}}});
ask=(t,l,cb)=>cb(Math.random()*l.length|0);
globalThis.T=function(k,N,mv){globalThis.CUR=k;for(const x in cnt)delete cnt[x];const lg=[];let tw=0,pens=0,army=0,ages=0;
 for(let r=0;r<N;r++){newGame('',r%2?'男':'女');S.money+=3e6;let g=0;
  while(!S.dead&&g++<120){
   if(S.age===(mv||26)&&!S.ab&&k!=='TW'){cnInit();S.cn=k;S.ab={cn:k,visa:'cit',left:0,yrs:0,wk:0,nojob:0,nu:0};S.lang[k]=70;S.job=null}
   if(S.age>=18&&!S.job&&!S.school&&!S.flags.retired)try{handle('job:'+R(0,JOBS.length-1))}catch(e){}
   try{ageUp()}catch(e){errs['ageUp']=e.message;break}
   const L=S.log[S.log.length-1];if(L&&S.cn===k)L.lines.forEach(l=>{if(/勞基法|統一發票|颱風|花蓮|媽祖|長照/.test(l.t)){tw++;(globalThis.LK=globalThis.LK||{})[l.t.slice(0,40)]=1}if(/老年年金|法定退休/.test(l.t))pens++;if(/入伍/.test(l.t))army++});
  }ages+=S.age;if(r==0)S.log.forEach(y=>y.lines.forEach(l=>{if(/退休|年金|入伍|回響/.test(l.t))lg.push(y.year+':'+l.t)}))}
 const mine=Object.keys(cnt).filter(i=>i.startsWith(k+'_')),tws=['scam','moto','typhoon','quake','typh2','mazu','inv','lotto','cny'].filter(i=>cnt[i]);
 return {k,avgAge:(ages/N).toFixed(1),local:mine.length,twLeak:tws,twTxt:tw,pens,army,errs,sample:lg.slice(0,4)}}`,ctx);
for(const k of ['US','JP','KR','DE','GB','CA','AU','SG']){console.log(JSON.stringify(ctx.T(k,24,(k==='KR'||k==='SG')?18:26)))}
console.log(Object.keys(ctx.LK||{}).slice(0,20).join('\n'))
