const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub,createElement:()=>stub,body:stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;showEnd=()=>{};const cnt={},errs={};const _re=randEvents;randEvents=function(){const o=_re();o.forEach(e=>cnt[e.id]=(cnt[e.id]||0)+1);return o};
const _run=E.map(e=>e);E.forEach(e=>{const r=e.run;e.run=function(){try{return r.apply(this,arguments)}catch(x){errs[e.id]=x.message;throw x}}});
ask=(t,l,cb)=>cb(Math.random()*l.length|0);
globalThis.AU=function(N){let tot=0;for(let r=0;r<N;r++){newGame('',r%2?'男':'女');S.ori=oriPick('隨機');S.money+=3e6;let g=0;while(!S.dead&&g++<120){if(S.age>=18&&!S.job&&!S.school)handle('job:'+R(0,JOBS.length-1));try{if(S.age>=20&&!S.partner){handle('rom:meet');for(let i=0;i<S.crush.length;i++){handle('rom:act:'+i+':look');handle('rom:act:'+i+':talk');if(view.scene)handle('rom:pick:0');handle('rom:cf:'+i)}}if(S.partner&&!S.partner.married&&S.age>=25)handle('rom:act:p:propose');if(S.partner&&S.partner.married&&S.age<40&&S.kids.length<2)handle('rom:act:p:baby')}catch(e){}ageUp();}tot+=S.age}
const ids=E.map(e=>e.id),never=ids.filter(i=>!cnt[i]);const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1]);const T=top.reduce((s,x)=>s+x[1],0);
return {n:ids.length,fired:Object.keys(cnt).length,never,top:top.slice(0,12).map(([k,v])=>k+':'+(v/T*100).toFixed(1)+'%'),errs,per:(T/N).toFixed(1)}}`,ctx);
console.log(JSON.stringify(ctx.AU(150)));
