/* ---- p68：年度收支帳本（每筆收入與支出分類、標示是哪位家人） ---- */
let LDC=null,LDW=null,LDE=null;
const LDH=new WeakSet();
const LDX=new Set(['資產買賣與轉換','存款轉換','存款利息（入活存，不計入現金）']);
function ldset(c,w){LDC=c||null;LDW=c?(w||null):null}
function ldCur(){
 if(!S)return null;
 if(!S.ld)S.ld={cur:null,hist:[]};
 if(!S.ld.cur)S.ld.cur={age:S.age,y:calYear(),m0:S.money,r:{}};
 return S.ld.cur;
}
function ldPut(d,cat,who){
 const L=ldCur();if(!L||!d)return;
 const k=(d>0?'i':'e')+'|'+cat+'|'+(who||'你');
 L.r[k]=(L.r[k]||0)+d;
}
function ldAdd(cat,who,d){ldPut(d,cat,who)}
function ldRec(d){
 const cat=LDC||(LDE?'事件｜'+LDE:'其他');
 if(cat==='__skip')return;
 ldPut(d,cat,LDW);
}
function ldHook(s){
 if(!s||LDH.has(s)||typeof s.money!=='number')return;
 let v=s.money;
 try{Object.defineProperty(s,'money',{get(){return v},set(x){const d=x-v;v=x;if(d&&s===S){try{ldRec(d)}catch(e){}}},enumerable:true,configurable:true});LDH.add(s)}catch(e){}
}
function ldSum(c){
 let i=0,e=0;
 for(const k in c.r){const p=k.split('|');if(LDX.has(p[1]))continue;if(p[0]==='i')i+=c.r[k];else e+=c.r[k]}
 return {i,e:-e};
}
function ldRoll(){
 ldHook(S);const c=ldCur();if(!c)return;
 if(c.age!==S.age||Object.keys(c.r).length){
  if(c.age!==S.age){
   c.m1=S.money;S.ld.hist.push(c);if(S.ld.hist.length>40)S.ld.hist.shift();
   const t=ldSum(c);
   if(c.age>=12&&(t.i||t.e))log(`${c.age} 歲這一年：收入 ${money(t.i)}、支出 ${money(t.e)}、現金變動 ${S.money-c.m0>=0?'+':'-'}${money(Math.abs(S.money-c.m0))}（明細見「年度收支」）。`);
   S.ld.cur={age:S.age,y:calYear(),m0:S.money,r:{}};
  }
 }
}
const _y68=yearly;
yearly=function(){try{LDE=null;LDC=null;LDW=null;ldRoll()}catch(e){}return _y68()};
const _rd68=render;
render=function(){try{if(S&&S.money!=null)ldHook(S)}catch(e){}return _rd68()};
/* 事件選項產生的金錢變動，記在該事件名下 */
const _ask68=ask;
ask=function(text,labels,cb){return _ask68(text,labels,function(i){const o=LDE,t=String(text).replace(/\s+/g,'');LDE=t.slice(0,18)+(t.length>18?'…':'');try{return cb(i)}finally{LDE=o}})};
/* 依功能標記類別 */
function ldWrap(name,label,whoFn){
 try{
  const f=eval(name);if(typeof f!=='function')return;
  eval(name+'=function(){const c=LDC,w=LDW;LDC=label;if(whoFn){try{LDW=whoFn.apply(null,arguments)}catch(e){}}try{return f.apply(this,arguments)}finally{LDC=c;LDW=w}}');
 }catch(e){}
}
[['coRun','公司事業'],['coYear','公司事業'],['pfYear','投資收益'],['mortYear','房貸本息'],['disYear','疾病與意外'],['illYear','疾病與醫療'],['polYear','政府補助與政策'],['histCalamity','天災與時事'],['lifeStyle','生活型態'],['funeral','喪葬費用'],['parentEstate','遺產'],['dlYear','先前決定的後續影響'],['trYear','信託'],['hmYear','居住'],['mhYear','心理健康'],['cnYearEnd','海外生活稅費'],
 ['buyHouse','資產買賣與轉換'],['sellHouse','資產買賣與轉換'],['buyCar','資產買賣與轉換'],['sellCar','資產買賣與轉換'],['buyFA','資產買賣與轉換'],['buyNew','資產買賣與轉換'],['sellNew','資產買賣與轉換'],['pfHandle','資產買賣與轉換'],['bkDo','存款轉換'],
 ['cnHandle','外匯與移居'],['kidHandle','子女教育與贈與'],['lgHandle','傳承與贈與'],['interact','人際互動花費'],['romHandle','戀愛約會花費'],['kpDo','人際維繫花費'],['tfEvent','學費來源']].forEach(x=>ldWrap(x[0],x[1]));
ldWrap('kidYear','子女養育費',k=>k&&k.n);
ldWrap('pbRun','伴侶互動花費',()=>S.partner&&S.partner.n);
const _hd68=handle;
handle=function(a){
 if(typeof a==='string'&&S){
  const p=a.split(':')[0],m={act:'活動與比賽',job:'求職',buyH:'資產買賣與轉換',sellH:'資產買賣與轉換',buyC:'資產買賣與轉換',sellC:'資產買賣與轉換'}[p];
  if(m){const c=LDC;LDC=m;try{return _hd68(a)}finally{LDC=c}}
 }
 return _hd68(a);
};
/* 頁面 */
function ldRows(c,kind){
 const o={};
 for(const k in c.r){const p=k.split('|');if(p[0]!==kind)continue;const x=LDX.has(p[1]);if(x)continue;const cat=p[1]==='其他'?(kind==='i'?'其他收入':'其他支出'):p[1];(o[cat]=o[cat]||[]).push([p[2],c.r[k]])}
 return Object.keys(o).map(cat=>({cat,tot:o[cat].reduce((a,x)=>a+x[1],0),who:o[cat]})).sort((a,b)=>Math.abs(b.tot)-Math.abs(a.tot));
}
function ldTable(rows){
 if(!rows.length)return '<p class="sub">這一年沒有這類項目。</p>';
 return '<table class="rt">'+rows.map(r=>{const w=r.who.length>1||r.who[0][0]!=='你'?r.who.map(x=>`${esc(x[0])} ${money(Math.abs(x[1]))}`).join('・'):'';return `<tr><td>${esc(r.cat)}${w?`<br><span class="sub">${w}</span>`:''}</td><td>${money(Math.abs(r.tot))}</td></tr>`}).join('')+'</table>';
}
function ledHTML(){
 ldCur();const hist=S.ld.hist,all=hist.concat([S.ld.cur]);
 let i=view.ly==null?all.length-1:Math.max(0,Math.min(all.length-1,view.ly));view.ly=i;
 const c=all[i],cur=i===all.length-1,t=ldSum(c),end=cur?S.money:(c.m1!=null?c.m1:S.money);
 let h=`<h3>年度收支</h3><div class="seg"><button data-a="lf:led:prev" ${i<=0?'disabled':''}>前一年</button><button class="on">${c.age} 歲${cur?'（今年）':''}</button><button data-a="lf:led:next" ${cur?'disabled':''}>後一年</button></div>`;
 h+=`<div class="item"><b>${c.y} 年</b>　收入 ${money(t.i)}　支出 ${money(t.e)}<br>現金 ${money(c.m0)} → ${money(end)}（${end-c.m0>=0?'+':'-'}${money(Math.abs(end-c.m0))}）<div class="sub">另有資產買賣、存款轉換等不計入收支的項目，見最下方。</div></div>`;
 h+='<div class="sec">收入</div>'+ldTable(ldRows(c,'i'));
 h+='<div class="sec">支出</div>'+ldTable(ldRows(c,'e'));
 const pw={};for(const k in c.r){const p=k.split('|');if(LDX.has(p[1]))continue;const w=p[2];pw[w]=pw[w]||{i:0,e:0};if(p[0]==='i')pw[w].i+=c.r[k];else pw[w].e-=c.r[k]}
 const ws=Object.keys(pw);
 if(ws.length>1||(ws[0]&&ws[0]!=='你'))h+='<div class="sec">每個人的收支</div><table class="rt">'+ws.map(w=>`<tr><td>${esc(w)}<br><span class="sub">收入 ${money(pw[w].i)}・支出 ${money(pw[w].e)}</span></td><td>${pw[w].i-pw[w].e>=0?'+':'-'}${money(Math.abs(pw[w].i-pw[w].e))}</td></tr>`).join('')+'</table>';
 const ex={};for(const k in c.r){const p=k.split('|');if(LDX.has(p[1]))ex[p[1]]=(ex[p[1]]||0)+c.r[k]}
 const eks=Object.keys(ex);
 if(eks.length)h+='<div class="sec">不計入收支的項目</div><table class="rt">'+eks.map(k=>`<tr><td>${esc(k)}</td><td>${ex[k]>=0?'+':'-'}${money(Math.abs(ex[k]))}</td></tr>`).join('')+'</table>';
 return h;
}
const _lf68=lifeHTML;
lifeHTML=function(){return view.lsub==='led'?ledHTML():_lf68()};
const _lh68=lfHandle;
lfHandle=function(x,y,z,u){
 if(x==='led'){if(y==='prev')view.ly=(view.ly==null?(S.ld?S.ld.hist.length:0):view.ly)-1;else if(y==='next')view.ly=(view.ly==null?0:view.ly)+1;else view.ly=null;return null}
 return _lh68(x,y,z,u);
};
const _ah68=astHTML;
astHTML=function(){const h=_ah68();if(S.age<12)return h;const i=h.indexOf('</h3>');const b='<button class="btn" data-a="lf:led">年度收支明細<small>每一筆收入與支出，包含每位家人</small></button>';return i<0?h+b:h.slice(0,i+5)+b+h.slice(i+5)};
const _qb68=qbUpdate;
qbUpdate=function(){
 _qb68();
 try{const q=document.getElementById('qbar');if(q&&S&&!S.dead&&S.age>=12&&!q.querySelector('[data-ld]')){q.insertAdjacentHTML('afterbegin','<button data-ld="1">收支</button>');q.querySelector('[data-ld]').onclick=e=>{e.stopPropagation();view.ly=null;handle('lf:led')}}}catch(e){}
};
