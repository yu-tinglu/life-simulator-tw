const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(N){
 let errs={},stat={ipo:0,otc:0,lst:0,bust:0,sold:0,n:0,aud:0,late:0,nolUsed:0,loss:0,dtaMax:0};
 for(let r=0;r<N;r++){
  newGame('','男');S.age=30;S.money=R(2e7,8e8);busy=false;queue=[];S.edu=4;
  const cand=INDS.map((I,i)=>i).filter(i=>{const I=INDS[i];return I.fx<5e8&&I.cap<3e8});
  const ii=cand[Math.random()*cand.length|0],I=INDS[ii];
  const form=I.solo?'獨資':(Math.random()<.6?'股份有限公司':'有限公司');
  const f2=(form==='獨資'&&I.cap>0)?'有限公司':form;
  const need=I.fx*1.05+I.dep+Math.max(1000,I.cap*.001)+I.fx*.12;const cap=Math.max(I.cap,Math.ceil(need/1e5)*1e5);
  S.money=Math.max(S.money,cap*1.1);
  let e=foundCo(ii,f2,cap,cap,Math.random()<.5?cap*.3:0,'T'+r);if(e){e=foundCo(ii,f2,cap,cap,cap*.5,'T');if(e){errs['found '+e]=1;continue}}
  stat.n++;
  try{
  for(let y=0;y<30&&S.co;y++){
   const P=S.co.policy;['mk','rd','pay','comp','own','div','aud'].forEach(k=>{if(Math.random()<.3)coHandle('set',k,Math.random()*(k==='mk'||k==='rd'||k==='own'?4:k==='pay'?3:k==='div'?5:2)|0)});
   coHandle('set','file',Math.random()*4|0);
   S.age++;queue=[];busy=true;S.acts={};
   // actions
   const co=S.co,L=co.L;
   if(Math.random()<.3)coHandle('capex',String(Math.max(1e6,Math.round(co.faG*.25/1e5)*1e5)));
   if(Math.random()<.2)coHandle('loan',String(1e6));
   if(co.form!=='獨資'){
     if(Math.random()<.2)coHandle('ext',String(2e6));
     if(Math.random()<.2)coHandle('self',String(1e6));
     for(const st of ['pub','emg','otc','lst']){try{ if(ipoCheck(co,st).every(q=>q.ok)){coHandle('ipo',st);stat[st==='pub'?'ipo':st]++}}catch(x){errs['ipo '+x.message]=1}}
     if(co.stage>=2&&Math.random()<.3)coHandle('sellsh','0.1');
   }
   try{ipoHTML();coHTML(null);['co:pol','co:capex','co:fin','co:ipo','co:law','co:exit'].forEach(s=>coHTML(s));lawHTML()}catch(x){errs['html '+x.message]=1}
   coRun();
   // run queue items
   while(queue.length){const q=queue.shift();const rr=q.run();if(rr&&rr.custom){rr.custom(()=>{})}}
   const rec=S.co?S.co.rec:null;
   if(rec){let s=0;LEDG.forEach(k=>s+=S.co.L[k]);if(Math.abs(s)>1)errs['unbal']=1;
    if(rec.T.audit)stat.aud++;if(rec.T.late)stat.late++;if(rec.T.used>0)stat.nolUsed++;if(rec.NI<0)stat.loss++;stat.dtaMax=Math.max(stat.dtaMax,rec.T.dtaEnd||0);
    if(Math.abs(rec.cf.net-(rec.cf.end-rec.cf.begin))>2)errs['cf']=1;
    for(let t=0;t<4;t++)reportRows(rec,t)}
   else {stat.bust++;break}
   if(Math.random()<.02&&S.co){coHandle('sell');stat.sold++;break}
  }
  }catch(x){errs[x.message+' '+(x.stack||'').split('\\n')[1]]=1}
 }
 return {errs:Object.keys(errs).slice(0,10),stat};
}`,ctx);
console.log(JSON.stringify(ctx.T(+process.argv[2]||300),null,1));
