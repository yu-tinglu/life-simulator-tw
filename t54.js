const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};

ctx.fs=fs;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){ask=(t,l,cb)=>cb(0);showEnd=()=>{};const o={};
 newGame('甲','男');mFix();const bad=s=>/NaN|undefined|Infinity/.test(s);
 const out=[];let bads=0;
 const regs=['TW','JP','IN','NG','FR','BR','EG','US'];
 regs.forEach((c,i)=>{const g=genFor(c);for(const age of [8,28,60]){const a={g,o:{beard:i%5,hat:i%4,dye:null,lip:i%2?'#c4343b':null,shadow:i%3===0?'#8a6fb0':null,gstyle:i%4},age,sx:i%2?'女':'男',happy:60,health:80,stress:30,job:age===28};const s=avSVG(a,100);if(bad(s))bads++;out.push(s)}});
 o.bads=bads;fs.writeFileSync('/tmp/av2.html',out.join(''));
 for(let h=0;h<12;h++){const g=genFor('FR');g.hs=h;const s=avSVG({g,o:{},age:25,sx:h%2?'女':'男',happy:50,health:80,stress:30},100);if(bad(s))o.hsBad=h;}
 S.age=30;S.sx='男';avEnsure();const a=avSelf();o.h=avHeight(a);o.bmi=avBMI(a);o.ch=avCharm(a).all;
 S.partner={n:'乙',sx:'女',rel:70,married:true,off:0,o:'日本'};avPartner();for(let i=0;i<4;i++){const k=newKid(i%2?'男':'女','子'+i);k.age=R(0,20);S.kids.push(k)}
 view.lsub='av';const p=avHTML();o.page=p.length;o.pageBad=bad(p);view.lsub='avs';o.avs=avsHTML().length;
 const keys=['dye:3','hs:5','beard:2','lip:1','shd:1','blu:1','lens:3','gst:2','hat:1','ear','glasses','gym','diet','feast','skin','acne','tan','braces','mole','tattoo','lasik','ed','nose','jaw','plast','hair','genes'];
 for(const k of keys){const [y,z]=k.split(':');S.acts={};S.money=1e8;S.age=30;S.av.g.my=1;try{const r=avDo(y,z);o[k]=r?r[0].slice(0,6):'null'}catch(e){o[k]='ERR '+e.message}}
 lfHandle('avs','pres','女');lfHandle('avs','mut','2');o.set=avS().pres+avS().mut;lfHandle('avs','pres','auto');lfHandle('avs','mut','1');
 o.tree=treeHTML().includes('家族面孔');yearly&&1;return o}`,ctx);
console.log(JSON.stringify(ctx.T()));
