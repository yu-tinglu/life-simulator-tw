const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub,createElement:()=>stub,body:stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;showEnd=()=>{};const errs={};ask=(t,l,cb)=>cb(Math.random()*l.length|0);
globalThis.T=function(N){const eth={},ev={},st={on:0,vid:0,visit:0,conf:0,wed:0,mig:0,newres:0};
 for(let r=0;r<N;r++){newGame('',r%2?'男':'女');let g=0;
  while(!S.dead&&g++<120){
   try{ageUp()}catch(e){errs[e.message+(e.stack||"").split(String.fromCharCode(10))[1]]=1;break}
   if(g===5){ethInit();eth[S.eth.g]=(eth[S.eth.g]||0)+1}
   if(S.on)st.on++;if(S.flags.xwed){st.wed++}if(S.flags.xmig===1)st.mig++;if(S.flags.xmig===2)st.newres++;
   try{ethHTML();moreHTML()}catch(e){errs['ui:'+e.message]=1}
  }
  try{endInfo()}catch(e){errs['end:'+e.message]=1}}
 return {eth,st,errs}};
globalThis.F=function(){newGame('',R(0,1)?'男':'女');S.age=26;S.ori='異性戀';S.money=900000;S.on={n:'Test',sx:S.sx==='男'?'女':'男',cn:'JP',rel:90,st:0,a:0,since:20,plat:'x'};
 const run=id=>{const e=E.find(x=>x.id===id);return e.run()};
 const out=[];for(const id of ['xvid','xvisit','xconf']){const r=run(id);r.c[0].fn?r.c[0].fn():0;out.push(id+':'+(r.c[0].f?'':'ok'))}return [S.on&&S.on.st,!!S.partner,S.partner&&S.partner.eth]};`,ctx);
console.log(JSON.stringify(ctx.T(150)));
vm.runInContext(`globalThis.F2=function(){newGame('',R(0,1)?'男':'女');S.age=26;S.ori='異性戀';S.money=900000;S.on={n:'Test',sx:S.sx==='男'?'女':'男',cn:'JP',rel:95,st:0,a:0,since:24,plat:'x'};
 const o=[];for(const id of ['xvid','xvisit','xconf']){const e=E.find(x=>x.id===id);o.push(e.if());const r=e.run();let res;do{res=r.c[0].f()}while(0);o.push(res[0])}
 S.partner.married=true;const w=E.find(x=>x.id==='xwed');o.push(w.if());let res=w.run().c[0].f();o.push(res[0],S.cn,S.partner.cohab);
 S.kids=[];const k=newKid('男','小');o.push(JSON.stringify(k.eth));return o}`,ctx);
for(let i=0;i<3;i++)console.log(JSON.stringify(ctx.F2()));
