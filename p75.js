/* ---- p75：公司經營改善（診斷、可執行的經營行動）、報表摘要頁與版面穩定、財稅設定收進進階 ---- */
function coTmp(co){if(!co.tmp)co.tmp={g:[],s:[]};if(!co.actY)co.actY={};return co.tmp}
const _cb75=coBonus;
coBonus=function(co){let v=_cb75(co);try{if(co.tmp)v+=co.tmp.g.reduce((a,x)=>a+x.v,0)}catch(e){}return v};
const _cy75=coYear;
coYear=function(){
 const co=S.co;let sv=0;
 try{if(co&&co.tmp&&co.tmp.s.length&&co.prevRev){sv=co.tmp.s.reduce((a,x)=>a+x.v,0)*co.prevRev;if(sv>0)J(co.L,['cogs',-sv],['cash',sv])}}catch(e){}
 const r=_cy75.apply(this,arguments);
 try{if(co&&co.tmp){['g','s'].forEach(k=>{co.tmp[k].forEach(x=>x.y--);co.tmp[k]=co.tmp[k].filter(x=>x.y>0)})}}catch(e){}
 return r;
};
const CACT=[
 {k:'promo',n:'促銷檔期',d:'砸錢辦活動衝營收，只影響今年。',c:r=>Math.max(1e5,r*.015),t:'今年成長 +4 點'},
 {k:'newp',n:'開發新產品',d:'投入研發與上市費用，之後三年持續帶來成長。',c:r=>Math.max(2e5,r*.04),t:'未來 3 年成長 +2.5 點'},
 {k:'sup',n:'供應商議價',d:'不用花錢，但不一定談得成。',c:r=>0,t:'約 65% 成功：兩年成本降約 1.2% 營收'},
 {k:'lean',n:'撙節與精簡編制',d:'縮減開支和人力，要付資遣費，成長會略受影響。',c:r=>Math.max(1e5,r*.01),t:'兩年成本降約 3% 營收，但成長 −1.5 點'},
 {k:'key',n:'開發大客戶',d:'投入業務資源爭取大單。',c:r=>Math.max(1e5,r*.01),t:'約 55% 成功：今年成長 +8 點'}
];
function coDiag(co){
 const r=co.rec,I=INDS[co.ind],L=co.L,P=co.policy,out=[];
 if(!r||!r.R){return {head:'還沒有完整年度的數字，先撐過第一年。',items:[],loss:false}}
 const R=r.R,pl=r.pl,gm=(-pl.rev-pl.cogs)/R,sr=pl.staff/R,mr=pl.mkt/R,rr=pl.rent/R,loss=r.NI<0;
 const cap=co.faG*I.turn+I.base,util=co.prevRev/cap;
 const run=r.NI<0?L.cash/Math.max(1,-r.NI):99;
 const add=(t,btn)=>out.push({t,btn});
 if(loss&&run<1.5)add(`現金只夠撐約 ${run.toFixed(1)} 年，要先止血或補資金。`,[['借款或增資','menu:fin']]);
 if(sr>.35&&P.hr!==2)add(`人事費占營收 ${(sr*100).toFixed(0)}%，偏高。`,[['導入自動化','set:hr-2'],['外包／兼職','set:hr-0']]);
 if(mr>.08&&loss&&P.mk>0)add(`行銷費占營收 ${(mr*100).toFixed(0)}%，虧損時可先減量。`,[['行銷降一級','set:mk-'+(P.mk-1)]]);
 if(util<.6)add(`產能只用了 ${(util*100).toFixed(0)}%，需要更多訂單。`,[['促銷檔期','a:promo'],['開發大客戶','a:key']]);
 if(util>.95)add('產能快滿了，營收難再成長。',[['擴廠投資','menu:capex']]);
 if(gm<.25&&P.pr!==2)add(`毛利率只有 ${(gm*100).toFixed(0)}%，可以提高定價或壓低進貨成本。`,[['改高端定價','set:pr-2'],['供應商議價','a:sup']]);
 if(rr>.2)add(`租金與營運費占營收 ${(rr*100).toFixed(0)}%，偏高。`,[['撙節與精簡','a:lean']]);
 if(loss&&!out.length)add('各項比例都不算失控，可能是成長太慢，試著開發新產品。',[['開發新產品','a:newp']]);
 const head=loss?`去年虧損 ${money(-r.NI)}（營收 ${money(R)}，毛利率 ${(gm*100).toFixed(0)}%）。`:`去年獲利 ${money(r.NI)}（營收 ${money(R)}，毛利率 ${(gm*100).toFixed(0)}%）。`;
 return {head,items:out.slice(0,3),loss};
}
function coActHTML(){
 const co=S.co,d=coDiag(co);coTmp(co);
 const back='<button class="btn" data-a="co:menu:main">← 公司主頁</button>';
 let h=`<h3>經營改善</h3><p class="sub">${d.head}</p>`;
 d.items.forEach(x=>{h+=`<div class="item"><div class="sub" style="line-height:1.6">${x.t}</div>${x.btn.map(([n,a])=>`<button class="btn" data-a="co:act:${a.split(':')[0]}:${a.split(':').slice(1).join(':')}">${n}</button>`).join('')}</div>`});
 h+='<div class="sec">可執行的行動（每項每年一次）</div>';
 const base=Math.max(1e6,co.prevRev||0);
 h+=CACT.map(a=>{const c=a.c(base),used=co.actY[a.k]===co.yrs;return `<button class="btn" data-a="co:act:a:${a.k}" ${used||co.L.cash<c?'disabled':''}>${a.n}${c?'（'+money(Math.round(c))+'）':'（免費）'}<small>${a.d} ${a.t}${used?'・今年已執行':''}</small></button>`}).join('');
 const act=co.tmp.g.length+co.tmp.s.length;
 if(act)h+=`<p class="sub">目前持續中的效果：${[...co.tmp.g.map(x=>'成長 '+(x.v>0?'+':'')+(x.v*100).toFixed(1)+' 點（剩 '+x.y+' 年）'),...co.tmp.s.map(x=>'成本降 '+(x.v*100).toFixed(1)+'% 營收（剩 '+x.y+' 年）')].join('、')}。</p>`;
 h+='<p class="sub">行銷、定價、人力等長期設定在「經營決策」。</p>';
 return h+back;
}
function coActDo(k){
 const co=S.co,L=co.L,a=CACT.find(x=>x.k===k);if(!a)return null;coTmp(co);
 if(co.actY[k]===co.yrs)return B('今年已經做過了。');
 const c=Math.round(a.c(Math.max(1e6,co.prevRev||0)));
 if(L.cash<c)return B('公司現金不足。');
 if(c)J(L,['fee',c],['cash',-c]);co.actY[k]=co.yrs;
 let m;
 if(k==='promo'){co.tmp.g.push({v:.04,y:1});m='促銷檔期上線，今年營收有望加成。'}
 else if(k==='newp'){co.tmp.g.push({v:.025,y:3});m='新產品開發完成，之後三年持續貢獻成長。'}
 else if(k==='sup'){if(Math.random()<.65){co.tmp.s.push({v:.012,y:2});m='談成了！進貨成本下降，效果持續兩年。'}else m='供應商不肯讓步，這次沒談成。'}
 else if(k==='lean'){co.tmp.s.push({v:.03,y:2});co.tmp.g.push({v:-.015,y:2});m=`精簡編制完成，付出資遣費 ${money(c)}，兩年成本下降但成長稍慢。`}
 else if(k==='key'){if(Math.random()<.55){co.tmp.g.push({v:.08,y:1});m='談下大客戶訂單！今年營收可望大增。'}else m='大客戶最後選了別家，投入的業務費用沒有回收。'}
 log(`【${co.name}】${m}`,m.includes('沒')?'bad':'good');view.csub='co:act';return m.includes('沒')?B(m):G(m);
}
const _ch75=coHTML;
coHTML=function(sub){
 if(sub==='co:act')return coActHTML();
 let h=_ch75(sub);
 if(sub==='co:pol'){
  const i=h.indexOf('<div class="sec">租稅規劃');
  if(i>0){h=h.slice(0,i)+'<details style="margin-top:12px"><summary style="font-size:13px;font-weight:700;padding:10px 0;cursor:pointer">財稅與法遵設定（進階，維持預設即可）</summary>'+h.slice(i)+'</details>'}
 }
 if(S.co&&(!sub||sub==='co:main')){
  const co=S.co,d=coDiag(co);
  h=h.replace(/<p class="sub">申報方式：[\s\S]*?<\/p>/,'').replace(/｜可扣抵虧損餘額 [^<]*/,'');
  const box=`<div class="item"><b>${d.loss?'經營狀況：虧損中':'經營狀況'}</b><div class="sub" style="line-height:1.6">${d.head}${d.items.length?'<br>'+d.items.map(x=>'・'+x.t).join('<br>'):''}</div></div><button class="btn p" data-a="co:menu:act">經營改善行動<small>促銷、新品、議價、精簡、大客戶</small></button>`;
  const j=h.indexOf('<button class="btn" data-a="co:rep">');
  h=j>=0?h.slice(0,j)+box+h.slice(j):h+box;
 }
 return h;
};
const _cd75=coHandle;
coHandle=function(x,y,z){
 if(x==='act'){
  if(y==='a')return coActDo(z);
  if(y==='set'){const [key,v]=String(z).split('-'),co=S.co;if(co){co.policy[key]=+v;view.csub='co:act';const m='已調整經營決策，從今年開始生效。';return G(m)}return null}
  if(y==='menu'){view.csub='co:'+z;return null}
  return null;
 }
 return _cd75(x,y,z);
};
/* 報表：先看摘要（白話），再看詳細三大報表；固定高度避免切頁跑位 */
const _rp75=reportRows;
function repSummary(rec){
 const R=rec.R||1,pl=rec.pl,gp=-pl.rev-pl.cogs;
 const bars=[['進貨與製造成本',pl.cogs],['人事費用',pl.staff],['租金與營運',pl.rent],['行銷',pl.mkt],['研發',pl.rd],['其他（規費、折舊、稅捐、利息）',pl.depx+pl.fee+pl.audit+pl.gtax+pl.spx+pl.intx+pl.pen-pl.inti]];
 let h=`<table class="rt"><tr class="h"><td colspan="2">這一年的結果</td></tr><tr><td>營收</td><td>${k1(rec.R)}</td></tr><tr><td>毛利率</td><td>${(gp/R*100).toFixed(1)}%</td></tr><tr class="b"><td>稅後淨利</td><td class="${rec.NI<0?'neg':''}">${k1(rec.NI)}</td></tr><tr><td>年底現金</td><td>${k1(rec.close.cash)}</td></tr><tr class="h"><td colspan="2">每 100 元營收花在哪</td></tr>`;
 bars.forEach(([n,v])=>{h+=`<tr><td>${n}</td><td>${(v/R*100).toFixed(1)}</td></tr>`});
 h+='</table>';
 h+=`<p class="sub" style="line-height:1.6">${rec.NI<0?'虧損時：到公司主頁的「經營改善行動」看診斷與可做的事。':'獲利不錯，可考慮股利、擴廠或增資。'}</p>`;
 return h;
}
showReport=function(rec,cb){
 const names=['摘要','損益','資產負債','現金流','稅務'];
 const draw=()=>{
  const co=S.co,t=window.repTab75||0;
  $('modalBody').innerHTML=`<h3>${esc(rec.name)} ${rec.yr} 年度財報</h3><div class="sub">${rec.ind}・${rec.form}・單位：新臺幣千元</div>
  <div class="seg" style="margin:8px 0;display:grid;grid-template-columns:repeat(5,1fr);gap:4px">${names.map((n,i)=>`<button class="${i===t?'on':''}" style="font-size:12.5px;padding:8px 0;min-width:0" data-t="${i}">${n}</button>`).join('')}</div>
  <div style="min-height:330px">${t===0?repSummary(rec):`<table class="rt" style="table-layout:fixed;width:100%">${_rp75(rec,t-1)}</table>`}</div>
  ${rec.divDecl||co&&co.divDecl?`<p class="sub">董事會擬議於下年度發放現金股利約 ${money(co?co.divDecl:0)}。</p>`:''}
  <button class="btn p" id="repOk">${cb?'關閉並繼續':'關閉'}</button>`;
  $('modal').classList.add('on');
  $('modalBody').querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{window.repTab75=+b.dataset.t;draw()});
  $('repOk').onclick=()=>{$('modal').classList.remove('on');$('modalBody').onclick=null;if(cb)cb()};
 };
 window.repTab75=0;draw();
};
(function(){try{const st=document.createElement('style');st.textContent=`.rt td:last-child{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}.rt td:first-child{width:62%}.rt td[colspan]{text-align:left!important}#modalBody{scrollbar-gutter:stable}`;document.head.appendChild(st)}catch(e){}})();
