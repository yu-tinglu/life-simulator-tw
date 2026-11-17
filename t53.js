const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{_d:{},setItem(k,v){this._d[k]=v},getItem(k){return this._d[k]||null},removeItem(k){delete this._d[k]}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
ctx.fs=fs;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(){ask=(t,l,cb)=>cb(0);showEnd=()=>{};const o={};
 newGame('甲','男');mFix();const bad=s=>/NaN|undefined|Infinity/.test(s);
 const svgs=[];for(const age of [0,2,6,12,16,25,40,55,70,90]){S.age=age;svgs.push(avSVG(avSelf(),100))}o.svgBad=svgs.some(bad);
 fs.writeFileSync('/tmp/av_ages.html',svgs.join(''));
 S.age=30;S.partner={n:'乙',sx:'女',rel:70,married:true,off:0,o:'日本'};avPartner();
 for(let i=0;i<8;i++){const k=newKid(i%2?'男':'女','子'+i);k.age=R(0,20);S.kids.push(k)}
 o.kidsSvg=S.kids.map(k=>avSVG({g:kidGenome(k),o:{},age:k.age,sx:k.sx,happy:60,health:80,stress:20},80));o.kidBad=o.kidsSvg.some(bad);fs.writeFileSync('/tmp/av_kids.html',o.kidsSvg.join(''));
 o.like=S.kids.map(likeWho);view.lsub='av';o.page=avHTML().length;
 for(const y of ['dye2','hs3','gym','skin','glasses','tattoo','plast','lasik']){S.acts={};S.money=1e7;S.age=30;try{o[y]=avDo(y)[0].slice(0,12)}catch(e){o[y]='ERR '+e.message}}
 o.tree=treeHTML().includes('家族面孔');
 // heredity stats
 let blk=0;const A={...genFor('TW'),hc:0},B={...genFor('JP'),hc:0};for(let i=0;i<500;i++)if(avChild(A,B).hc===0)blk++;o.blackKids=blk/500;
 const C={...genFor('FR'),hc:3},D={...genFor('FR'),hc:3};let bl=0;for(let i=0;i<500;i++)if(avChild(C,D).hc===3)bl++;o.blondKids=bl/500;
 S.kids=S.kids.slice(0,1);S.kids[0].age=20;S.dead=true;S.cause='x';
 try{const r={NE:1e6,tax:0,cost:0,A:{live:0,pf:0,house:0},parts:{},hasSp:true};o.skipSucc=1}catch(e){}
 return o}`,ctx);
const o=ctx.T();console.log(JSON.stringify(o,(k,v)=>k==='kidsSvg'?undefined:v));
