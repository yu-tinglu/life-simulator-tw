/* ---- p78：下拉選單＋自填金額（外匯、銀行存款、投資組合、移民國家），取代一長串按鈕 ---- */
function frmNum(s){
 s=String(s==null?'':s).replace(/[０-９]/g,c=>String.fromCharCode(c.charCodeAt(0)-65248)).replace(/．/g,'.').replace(/[,，\s]/g,'').replace(/元$|塊$/,'').replace(/NT\$?/i,'');const m=s.match(/^([\d.]+)(億|千萬|百萬|萬|千|k|K|w|W|m|M)?$/);if(!m)return NaN;
 const u={'億':1e8,'千萬':1e7,'百萬':1e6,'萬':1e4,'千':1e3,'k':1e3,'K':1e3,'w':1e4,'W':1e4,'m':1e6,'M':1e6}[m[2]]||1;return Math.round(parseFloat(m[1])*u);
}
function frmState(id){view.frm=view.frm||{};return view.frm[id]||(view.frm[id]={})}
function frmGet(id){
 const st=frmState(id);let s=st.s,a=st.a;
 try{const es=document.getElementById('frm_'+id+'_s'),ea=document.getElementById('frm_'+id+'_a');if(es&&es.value!=null&&es.value!=='')s=es.value;if(ea&&ea.value!=null&&ea.value!=='')a=ea.value}catch(e){}
 st.s=s;st.a=a;return {s,a:frmNum(a),raw:a};
}
function frmHTML(id,o){
 const st=frmState(id),s=st.s!=null&&o.opts.some(x=>String(x[0])===String(st.s))?st.s:o.opts[0][0],a=st.a!=null?st.a:(o.def||'');
 let h=`<div class="frm"><label for="frm_${id}_s">${o.sl||'項目'}</label><select id="frm_${id}_s">${o.opts.map(x=>`<option value="${x[0]}" ${String(x[0])===String(s)?'selected':''}>${x[1]}</option>`).join('')}</select>`;
 if(o.amt!==false){
  h+=`<label for="frm_${id}_a">${o.al||'金額（新台幣）'}</label><input id="frm_${id}_a" type="text" inputmode="decimal" autocomplete="off" placeholder="例如 500000 或 50萬" value="${a}">`;
  h+=`<div class="chips">${(o.chips||[100000,500000,1000000,5000000]).map(v=>`<button type="button" data-fill="frm_${id}_a:${v}">${v>=1e8?v/1e8+' 億':v/1e4+' 萬'}</button>`).join('')}</div>`;
 }
 h+=`<div class="acts">${o.btns.map(b=>`<button class="btn ${b[2]||''}" data-a="frmgo:${id}:${b[0]}">${b[1]}</button>`).join('')}</div></div>`;
 return h;
}
/* 輸入狀態與快速金額 */
(function(){try{
 document.addEventListener('input',e=>{const t=e.target;if(t&&t.id&&t.id.startsWith('frm_')){const p=t.id.split('_'),st=frmState(p[1]);st[p[2]]=t.value}},true);
 document.addEventListener('change',e=>{const t=e.target;if(t&&t.id&&t.id.startsWith('frm_')){const p=t.id.split('_'),st=frmState(p[1]);st[p[2]]=t.value;if((p[2]==='s'||p[1]==='hb'||p[1]==='jb')&&typeof render==='function'&&view.tab!=null){const x=document.getElementById('frm_'+p[1]+'_a');if(x)st.a=x.value;try{render();showSheet(view.tab,view.sub)}catch(err){}}}},true);
 document.addEventListener('click',e=>{const b=e.target&&e.target.closest?e.target.closest('[data-fill]'):null;if(!b)return;e.preventDefault();e.stopPropagation();const [id,v]=b.dataset.fill.split(':'),x=document.getElementById(id);if(x){x.value=v;const p=id.split('_');frmState(p[1])[p[2]]=v}},true);
 const st=document.createElement('style');st.textContent=`.frm{display:grid;gap:8px;margin:6px 0 12px}.frm label{font-size:12px;color:var(--mut,#8a7f72)}.frm select,.frm input{width:100%;box-sizing:border-box;padding:12px;font-size:15px;font-family:inherit;color:var(--ink);background:var(--card);border:1px solid var(--line);border-radius:var(--r,12px);-webkit-appearance:none;appearance:none}.frm select{background-image:linear-gradient(45deg,transparent 50%,var(--ink) 50%),linear-gradient(135deg,var(--ink) 50%,transparent 50%);background-position:calc(100% - 18px) 50%,calc(100% - 13px) 50%;background-size:5px 5px;background-repeat:no-repeat;padding-right:34px}.frm .chips{display:flex;gap:6px;flex-wrap:wrap}.frm .chips button{padding:6px 10px;font-size:12.5px;border:1px solid var(--line);background:var(--card);border-radius:999px;color:var(--ink)}.frm .acts{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px}.frm .acts .btn{margin:0}`;document.head.appendChild(st);
}catch(e){}})();
function frmAmt(g,needMsg){if(!(g.a>0))return null;return g.a}
const _hd78=handle;
handle=function(a){
 if(typeof a==='string'&&S&&a.startsWith('frmgo:')){
  const p=a.split(':'),id=p[1],act=p[2],g=frmGet(id),amt=g.a;
  const need=['fx:b','fx:s','bk:dep','bk:wd','bk:fd','pf:b','pf:s'];
  const key=id+':'+act;
  const go=s=>{_hd78(s)};
  const bad=m=>{view.msg=B(m);view.tab=view.tab||'ast';render();try{showSheet(view.tab,view.sub)}catch(e){}};
  if(id==='fx'){
   if(act==='a')return go('cn:fxs:'+g.s);
   if(!(amt>0))return bad('請輸入金額，例如 500000 或 50萬。');
   return go((act==='b'?'cn:fxb:':'cn:fxp:')+g.s+':'+amt);
  }
  if(id==='bk'){
   if(act==='wda')return go('bk:wda');
   if(!(amt>0))return bad('請輸入金額，例如 500000 或 50萬。');
   if(act==='in'&&amt>S.money)return bad(`現金不足：要存 ${money(amt)}，目前現金只有 ${money(S.money)}。`);
   view.bka=amt;
   if(act==='in')return go(g.s==='c'?'bk:dep':'bk:fd:'+g.s);
   if(act==='out'){if(g.s!=='c')return bad('定存要到期才能領回，或到下方定存單提前解約；這裡只能提領活存。');return go('bk:wd')}
   return null;
  }
  if(id==='pf'){
   if(act==='a')return go('pf:s:'+g.s);
   if(!(amt>0))return bad('請輸入金額，例如 500000 或 50萬。');
   return go((act==='b'?'pf:b:':'pf:sp:')+g.s+':'+amt);
  }
  if(id==='cn'){return go('cn:sub:'+g.s)}
  return null;
 }
 return _hd78(a);
};
/* 外匯 */
const _cnH78=cnHandle;
cnHandle=function(x,y,z){
 if(x==='fxp'){cnInit();const hv=S.fxh[y]||0,t=+z;if(hv<=0)return B('沒有持有這個外幣。');const fx=S.fx[y],u=Math.min(hv,t/(fx*.995)),v=Math.round(u*fx*.995);S.money+=v;S.fxh[y]=hv-u;if(S.fxh[y]<1e-6)delete S.fxh[y];return G(`賣出外幣，取得 ${money(v)}。`)}
 return _cnH78(x,y,z);
};
fxHTML=function(){
 cnInit();
 const opts=CNK.map(k=>{const c=CNS[k],fx=S.fx[k],hv=S.fxh[k]||0;return [k,`${c.n} ${c.sym}・1=NT$${fx.toFixed(fx<1?4:2)}${hv?'・持有 '+fmtL(k,hv):''}`]});
 let h='<p class="sub">買進外幣＝把新台幣換成外幣存款，賺匯差與當地利息；買賣各有 0.5% 價差。</p>';
 h+=frmHTML('fx',{sl:'幣別',opts,def:'500000',btns:[['b','買進','p'],['s','賣出'],['a','全部賣出']]});
 const held=CNK.filter(k=>S.fxh[k]>0);
 if(held.length)h+=`<table class="rt"><tr class="h"><td colspan="2">目前持有</td></tr>`+held.map(k=>`<tr><td>${CNS[k].n}</td><td>${fmtL(k,S.fxh[k])}・約 ${money(S.fxh[k]*S.fx[k])}</td></tr>`).join('')+`</table>`;
 return h+`<button class="btn" data-a="cn:sub:">← 返回</button>`;
};
/* 移民國家改為下拉 */
const _cnHT78=cnHTML;
cnHTML=function(sub){
 let h=_cnHT78(sub);
 if(sub)return h;
 const re=new RegExp(`<button class="btn" data-a="cn:sub:(${CNK.join('|')})"[^>]*>[\\s\\S]*?</button>`,'g');
 let n=0;h=h.replace(re,()=>n++===0?'@@CNSEL@@':'');
 if(n){
  const opts=CNK.filter(k=>k!==S.cn).map(k=>{const c=CNS[k],s=S.cs[k];return [k,`${c.n}・年薪 ${money(wTW(k))}・失業 ${pct(s.u)}`]});
  h=h.replace('@@CNSEL@@',frmHTML('cn',{sl:'國家',opts,amt:false,btns:[['go','查看簽證與條件','p']]}));
 }
 return h;
};
/* 銀行存款 */
bkHTML=function(){
 const b=bkInit();
 let h=`<div class="sec">銀行存款</div><div class="item"><b>活期存款</b>　${money(b.c)}<div class="sub">活存年利率 ${bkDm().toFixed(2)}%・定存 1 年期 ${bkFd().toFixed(2)}%（歷史為台灣牌告的大致水準，未來依物價與景氣推估；未計利息所得稅）</div></div>`;
 h+=`<div class="sub">可用現金 ${money(S.money)}</div>`;
 h+=frmHTML('bk',{sl:'存款種類',opts:[['c',`活存・年利率 ${bkDm().toFixed(2)}%・隨時可提領`],...[1,2,3].map(y=>[String(y),`定存 ${y} 年・年利率約 ${(bkFd()+(y-1)*.05).toFixed(2)}%・到期轉入活存`])],def:'100000',chips:[100000,1000000,5000000,20000000,50000000,100000000],btns:[['in','存入','p'],['out','提領活存'],['wda','全部提領活存']]});
 if(b.fd.length)h+='<div class="sec">定存單</div>'+b.fd.map((f,i)=>`<div class="item row"><div style="flex:1"><b>${money(f.amt)}</b>・${f.yrs} 年期・利率 ${f.r.toFixed(2)}%<div class="sub">還有 ${f.left} 年到期</div></div><button class="mini" data-a="bk:fdx:${i}">提前解約</button></div>`).join('');
 h+=`<button class="btn" data-a="open:cn">外幣存款與匯率<small>買進外幣存款，賺匯差與利差</small></button>`;
 return h;
};
/* 投資組合 */
const _pfH78=pfHTML;
pfHTML=function(){
 let h=_pfH78();S.pf=S.pf||{};const y=calYear();
 const ks=PFK.filter(k=>pfAvail(k,y));
 const re=/<div class="item"><b>[^<]*<\/b>　[^<]*<\/div><div class="seg">[\s\S]*?<\/div>/g;
 let n=0;h=h.replace(re,()=>n++===0?'@@PFSEL@@':'');
 if(n){
  const opts=ks.map(k=>[k,`${PFN[k][0]}・持有 ${money(S.pf[k]||0)}`]);
  h=h.replace('@@PFSEL@@',frmHTML('pf',{sl:'投資商品',opts,def:'1000000',btns:[['b','買進','p'],['s','賣出'],['a','全部賣出']]}));
 }
 return h;
};
const _pfHd78=pfHandle;
pfHandle=function(x,y,z){
 if(x==='sp'){S.pf=S.pf||{};const t=Math.min(+z,S.pf[y]||0);if(t<=0)return B('沒有持有這個商品。');const fee=['btc','eth','alt'].includes(y)?.01:.003;const v=Math.round(t*(1-fee));S.pf[y]-=t;S.money+=v;return G(`賣出取得 ${money(v)}。`)}
 return _pfHd78(x,y,z);
};
/* 公司主頁：資金、股權、IPO、退場收進一個下拉；法規說明移到財稅進階設定內 */
const _co78=coHTML;
coHTML=function(sub){
 let h=_co78(sub);const co=S.co;if(!co)return h;
 if(!sub||sub==='co:main'){
  const corp=co.form!=='獨資';
  h=h.replace(/<button class="btn" data-a="co:menu:(fin|capex|eq|ipo|law|exit)"[^>]*>[\s\S]*?<\/button>/g,'');
  const opts=[['menu:fin','融資與增資'],['menu:capex','擴廠投資'],...(corp?[['menu:eq','股權與資本運作'],['menu:ipo','公開發行與 IPO']]:[]),['menu:exit','出售或結束公司']];
  h+='<div class="sec">資金與股權</div>'+frmHTML('cm',{sl:'要處理什麼？',opts,amt:false,btns:[['go','前往','p']]});
 }
 if(sub==='co:pol')h=h.replace('</details>','<button class="btn" data-a="co:menu:law">產業法規與稅務重點（參考資料）</button></details>');
 return h;
};
const _hd78b=handle;
handle=function(a){
 if(typeof a==='string'&&S&&a.startsWith('frmgo:cm:')){const g=frmGet('cm');return _hd78b('co:'+g.s)}
 return _hd78b(a);
};
