const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

ctx.fs=fs;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){
 const out=[];const ok=(c,m)=>{out.push((c?'OK ':'FAIL ')+m)};
 ask=(t,l,cb)=>cb(0);newGame('甲','男');mFix();S.age=30;S.money=3000000;
 const a=money(1234567);ok(a==='NT$1,234,567','tw money '+a);
 S.cn='JP';S.fx.JP=.21;const b=money(2100);ok(/^¥10,000$/.test(b),'jp money '+b);
 MNY_TW=true;ok(money(2100)==='NT$2,100','force tw');MNY_TW=false;
 const h=astHTML();ok(h.includes('目前以¥顯示金額'),'ast card');
 S.cn='TW';S.ab=null;const c=cnHTML();ok(c.includes('NT$'),'cn page uses NT$ '+(c.match(/NT\\$[0-9,]+/)||[])[0]);
 S.cn='TW';
 for(let k=0;k<6;k++){newGame('丙','女');mFix();let g=0;while(!S.dead&&g++<100){try{ageUp();if(chance(.1)){astHTML();actHTML();relHTML()}}catch(e){out.push('ERR '+e.stack.split('\\n').slice(0,3).join('|'));break}}}
 return out}`,ctx);
console.log(ctx.T().join('\n'));
