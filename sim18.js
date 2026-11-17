const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>stub,querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(runs,mode,SX){ask=(t,l,cb)=>cb(0);showEnd=()=>{};const ages=[],causes={},errs=[];let ill=0,dis=0;
 for(let r=0;r<runs;r++){newGame('',SX);let g=0;
  while(!S.dead&&g++<200){try{ if(mode>=1){handle('act:gym');handle('act:doc')} if(mode>=2&&S.age>=40){handle('lf:health:scr:basic');handle('lf:health:scr:ca')} ageUp();}catch(e){errs.push(e.message+' '+(e.stack||'').split('\\n')[1]);break}}
  ages.push(S.age);causes[S.cause]=(causes[S.cause]||0)+1;if((S.ill||[]).some(x=>!x.hid))ill++;if(S.dis)dis++}
 ages.sort((a,b)=>a-b);return {avg:+(ages.reduce((x,y)=>x+y,0)/runs).toFixed(1),p10:ages[runs/10|0],med:ages[runs/2|0],p90:ages[runs*.9|0],ill:ill/runs,dis:dis/runs,errs:errs.slice(0,3),causes}}`,ctx);
for(const m of [2])for(const sx of ['男','女']){const r=ctx.T(700,m,sx);const c=r.causes,t=Object.values(c).reduce((a,b)=>a+b,0);console.log('mode',m,sx,r.avg,r.p10,r.med,r.p90,'ill',r.ill,'dis',r.dis,JSON.stringify(r.errs));if(m===1)console.log(Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0,12).map(([k,v])=>k+(v/t*100).toFixed(0)+'%').join(' '))}
vm.runInContext(`globalThis.U=function(runs,SX){ask=(t,l,cb)=>cb(0);showEnd=()=>{};const H={},C={};for(let r=0;r<runs;r++){newGame('',SX);let g=0;while(!S.dead&&g++<200){handle('act:gym');handle('act:doc');ageUp();const b=S.age/10|0;(H[b]=H[b]||[]).push(S.health)}const k=S.causeK||'?';(C[k]=C[k]||[]).push(S.age)}
const o={};for(const b in H)o[b*10]=(H[b].reduce((x,y)=>x+y,0)/H[b].length).toFixed(0);const c={};for(const k in C)c[k]=C[k].length+'@'+(C[k].reduce((x,y)=>x+y,0)/C[k].length).toFixed(0);return [o,c]}`,ctx);
