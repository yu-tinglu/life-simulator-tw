const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const store={};
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{setItem(k,v){store[k]=v},getItem(k){return store[k]||null},removeItem(k){delete store[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.U=function(){
 ask=(t,l,cb)=>cb(0);showEnd=()=>{};startSuccession=()=>{};
 newGame('甲','男');S.age=30;S.money=1e7;mFix();
 const c=newCrush('x');c.aff=80;c.tru=80;S.crush.push(c);mkPartner(c);S.partner.st=2;S.partner.rel=85;S.partner.married=true;
 const r=storyPick(S.partner,true,0);
 const out={r,end:Object.keys(JSON.parse(localStorage.getItem('lifesim_tw_rom_v1')||'{}'))};
 const m0=S.money;S.partner.fl=0;npcYear();out.cash=S.money-m0;out.job=S.partner.job;out.inc=S.partner.inc;
 achYear();out.ach=Object.keys(JSON.parse(localStorage.getItem('lifesim_tw_ach_v1')||'{}'));
 out.art=actStart(S.partner,true,'art');out.adopt=adopt(S.partner);
 later(0,'foe','甲');later(0,'gossip');later(0,'favor','乙');later(0,'invest',{n:'丙',amt:1e5});later(0,'pbiz');later(0,'scar');S.job={t:'x',sal:5e5,var:0,lv:1,years:1,perf:60};S.age++;dlYear();out.dl=S.dl.length;
 handle('lf:set');handle('lf:set:th:dark');handle('lf:set:fs:2');save();const ex=expAll();out.exp=ex.length;out.imp=impAll(ex);out.setHTML=setHTML().length;
 out.more=moreHTML().length;out.rev=(()=>{S.hs=[{a:1,w:1,h:50,s:20,n:3,hp:90},{a:2,w:5,h:60,s:30,n:9,hp:80}];return revHTML().includes('polyline')})();
 return out}`,ctx);
console.log(JSON.stringify(ctx.U(),null,1));
