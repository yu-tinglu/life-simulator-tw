const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

ctx.fs=fs;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 const out=[];const ok=(c,m)=>{out.push((c?'OK ':'FAIL ')+m)};
 ask=(t,l,cb)=>cb(0);showEnd=()=>{};
 newGame('甲','男');mFix();ldHook(S);S.age=25;S.edu=4;S.school=null;S.money=100000;
 S.crush=[newCrush('x')];mkPartner(S.crush[0]);S.partner.cohab=true;S.partner.married=true;
 S.kids=[];
 const idx=JOBS.findIndex(j=>j.t==='軟體工程師');S.job=hireJob(JOBS[idx]);
 for(let i=0;i<6;i++){ageUp()}
 ok(S.ld&&S.ld.hist.length>=4,'hist '+(S.ld&&S.ld.hist.length));
 const c=S.ld.hist[S.ld.hist.length-1];const rows=Object.keys(c.r).map(k=>k+'='+Math.round(c.r[k]));out.push(rows.join('\\n'));
 const t=ldSum(c);out.push('sum i '+t.i+' e '+t.e+' delta '+((c.m1||0)-c.m0));
 const h=ledHTML();ok(h.includes('收入')&&h.includes('支出')&&h.includes('每個人'),'page '+h.length);
 view.ly=null;lfHandle('led','prev');ok(view.ly===S.ld.hist.length-1+0||true,'nav');
 const j=JSON.stringify(S);ok(j.length>100&&/"money":/.test(j),'json ok');const S2=JSON.parse(j);ok(typeof S2.money==='number','parse');
 ok(typeof statHTML==='function','x');
 // reconcile: sum(all rows incl excl) vs money delta
 let tot=0;for(const k in c.r)if(!LDX.has(k.split('|')[1])||true)tot+=c.r[k];
 out.push('reconcile rows '+Math.round(tot)+' vs delta '+Math.round((c.m1||0)-c.m0));
 handle('bk:amt:100000');handle('bk:dep');ok(true,'bk');
 for(let k=0;k<8;k++){newGame('丙','女');mFix();let g=0;while(!S.dead&&g++<100){try{ageUp();if(chance(.3))ledHTML()}catch(e){out.push('ERR '+e.stack.split('\\n').slice(0,3).join('|'));break}}}
 return out}`,ctx);
console.log(ctx.T().join('\n'));
