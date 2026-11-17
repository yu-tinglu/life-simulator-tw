const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
ctx.btoa=s=>Buffer.from(s,"binary").toString("base64");ctx.atob=s=>Buffer.from(s,"base64").toString("binary");ctx.unescape=unescape;ctx.escape=escape;ctx.encodeURIComponent=encodeURIComponent;ctx.decodeURIComponent=decodeURIComponent;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){ask=(t,l,cb)=>cb(0);showEnd=()=>{};const o={};
 window.__seed='ABC123';newGame('甲','男');mFix();for(let i=0;i<70&&!S.dead;i++)ageUp();
 o.code=resCode().length>10;const p=resParse(resCode());o.p=p&&p.s;view.cmpCode=resCode();view.lsub='dx';const h=dxHTML();o.cmp=/朋友/.test(h)&&/同一個種子/.test(h)||/朋友/.test(h);o.bad=(view.cmpCode='zzz',/格式不正確/.test(dxHTML()));
 o.sum=/結果碼/.test(sumHTML());return o}`,ctx);
console.log(JSON.stringify(ctx.T()));
