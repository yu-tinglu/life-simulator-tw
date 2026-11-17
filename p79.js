/* ---- p79：其餘金額類操作改為「下拉＋自填金額」（公司融資增資擴廠、贈與子女、提前還房貸）---- */
const _frmH79=frmHTML;
frmHTML=function(id,o){
 if(o.opts&&o.opts.length)return _frmH79(id,o);
 const st=frmState(id),a=st.a!=null?st.a:(o.def||'');
 let h=`<div class="frm"><label for="frm_${id}_a">${o.al||'金額（新台幣）'}</label><input id="frm_${id}_a" type="text" inputmode="decimal" autocomplete="off" placeholder="例如 500000 或 50萬" value="${a}">`;
 h+=`<div class="chips">${(o.chips||[100000,500000,1000000,5000000]).map(v=>`<button type="button" data-fill="frm_${id}_a:${v}">${v>=1e8?v/1e8+' 億':v/1e4+' 萬'}</button>`).join('')}</div>`;
 h+=`<div class="acts">${o.btns.map(b=>`<button class="btn ${b[2]||''}" data-a="frmgo:${id}:${b[0]}">${b[1]}</button>`).join('')}</div></div>`;
 return h;
};
const _coH79=coHTML;
coHTML=function(sub){
 let h=_coH79(sub);const co=S.co;if(!co)return h;
 if(sub==='co:fin'){
  const corp=co.form!=='獨資',lm=creditLimit(co);
  h=h.replace(/<button class="btn" data-a="co:(loan|repay|self|ext):[^"]*"[^>]*>[\s\S]*?<\/button>/g,'');
  const opts=[['loan','向銀行借款'],['repayn','償還借款'],...(corp?[['ext','引進投資人增資'],['self','創辦人增資（個人出資）']]:[])];
  h=h.replace('<div class="sec">現金增資</div>','');
  h+=`<div class="sub">可再借額度約 ${money(lm)}・你的現金 ${money(S.money)}・公司現金 ${money(co.L.cash)}</div>`+frmHTML('cl',{sl:'要做什麼？',opts,def:'1000000',chips:[500000,1000000,5000000,20000000],btns:[['go','確認','p']]});
  const bk='<button class="btn" data-a="co:menu:main">← 公司主頁</button>';h=h.replace(bk,'')+bk;
 }
 if(sub==='co:capex'){
  h=h.replace(/<button class="btn" data-a="co:capex:[^"]*"[^>]*>[\s\S]*?<\/button>/g,'');
  h=h.replace(/(<button class="btn" data-a="co:menu:main">)/,frmHTML('cx',{sl:'',opts:null,def:'1000000',al:'擴廠投資金額（新台幣，含 5% 營業稅）',chips:[1000000,5000000,10000000,50000000],btns:[['go','投資','p']]})+'$1');
 }
 return h;
};
const _cho79=coHandle;
coHandle=function(x,y,z){
 if(x==='repayn'){const co=S.co,L=co.L,a=Math.min(+y,-L.loan,Math.max(0,L.cash));if(!(a>0))return B('無法還款（沒有借款或公司現金不足）。');const r=repayLoan(co,a);view.csub='co:fin';return r?G('已還款 '+money(r)):B('無法還款。')}
 return _cho79(x,y,z);
};
const _kh79=kidHTML;
kidHTML=function(i){
 let h=_kh79(i);
 h=h.replace(/<button class="btn" data-a="kid:gift:\d+:\d+"[^>]*>[\s\S]*?<\/button>/g,'');
 h=h.replace(/(<button class="btn" data-a="back">← 返回<\/button>)$/,frmHTML('kg'+i,{opts:null,def:'1000000',chips:[500000,1000000,5000000,20000000],al:'贈與現金（新台幣，依規定課贈與稅）',btns:[['go','贈與','p']]})+'$1');
 return h;
};
const _hs79=hsHTML;
hsHTML=function(){
 let h=_hs79();
 if(S.mort){
  h=h.replace(/<button class="btn" data-a="lf:hs:prepay:main"[^>]*>[\s\S]*?<\/button>/,frmHTML('hp',{opts:null,def:'1000000',al:'提前還款金額（新台幣，貸款餘額 '+money(S.mort.left)+'）',chips:[500000,1000000,5000000,10000000],btns:[['go','提前還款','p']]}));
 }
 return h;
};
const _hd79=handle;
handle=function(a){
 if(typeof a==='string'&&S&&a.startsWith('frmgo:')){
  const p=a.split(':'),id=p[1],g=frmGet(id),amt=g.a;
  const bad=m=>{view.msg=B(m);render();try{showSheet(view.tab,view.sub)}catch(e){}};
  if(id==='cl'||id==='cx'||id==='hp'||/^kg\d+$/.test(id)){
   if(!(amt>0))return bad('請輸入金額，例如 500000 或 50萬。');
   if(id==='cl')return _hd79('co:'+g.s+':'+amt);
   if(id==='cx')return _hd79('co:capex:'+amt);
   if(id==='hp'){view.ppAmt=amt;return _hd79('lf:hs:prepay:main')}
   return _hd79('kid:gift:'+id.slice(2)+':'+amt);
  }
 }
 return _hd79(a);
};
