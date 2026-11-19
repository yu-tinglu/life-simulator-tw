/* ---- p124：投資頁優化：圖示、標題列固定、說明合併、金額即時預覽與上限、商品卡片、配置比例條、累計損益 ---- */
IC.up='<path d="M12 20V6M6 12l6-6 6 6"/>';
UIKW.unshift([/^買進$/,'up'],[/^賣出$/,'down'],[/^全賣$/,'x']);
/* 1. 標題列：不讓內容從固定標題上方露出來 */
(function(){try{const st=document.createElement('style');st.id='iv124';st.textContent=`
#sheetBody{padding-top:0!important}
#sheetBody .sh{margin:0 -14px 8px!important;padding-top:14px!important;top:0}
.frm .pv{font-size:12.5px;color:var(--mut,#8a7f72);min-height:18px;margin-top:-2px}
.frm .pv.bad{color:#b4472f}
.frm .acts .btn{white-space:nowrap}
.pfbar{display:flex;height:14px;border-radius:7px;overflow:hidden;background:var(--line);margin:6px 0 4px}
.pfbar i{display:block;height:100%}
.pfleg{display:flex;flex-wrap:wrap;gap:4px 12px;font-size:12px;color:var(--mut,#8a7f72);margin-bottom:8px}
.pfleg span::before{content:"";display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--c);margin-right:5px}
.pfcard .row2{display:flex;flex-wrap:wrap;gap:2px 14px;font-size:13px;margin-top:4px}
.pfcard .pos{color:#2e7d4f}.pfcard .neg{color:#b4472f}
`;document.head.appendChild(st)}catch(e){}})();
/* 2. 金額欄：即時顯示格式化金額、現金不足／超過持有提示 */
function pvText(id,s,amt){
 if(!(amt>0))return {t:'',bad:0};
 let t='約 '+money(amt),bad=0;
 try{
  if(id==='pf'){
   const hold=(S.pf&&S.pf[s])||0;
   t+=`・買進後剩 ${money(Math.max(0,S.money-amt))}`;
   if(amt>S.money){t='超過手頭現金（'+money(S.money)+'），無法買進';bad=1}
  }
 }catch(e){}
 return {t,bad};
}
const _fh124=frmHTML;
frmHTML=function(id,o){
 let h=_fh124(id,o);
 h=h.replace(/(<input id="frm_(\w+)_a"[^>]*>)/,(m,inp,i)=>{
  const st=frmState(i),sel=st.s!=null?st.s:(o.opts&&o.opts[0]?o.opts[0][0]:''),a=st.a!=null?st.a:(o.def||'');
  const p=pvText(i,sel,frmNum(a));return inp+`<div class="pv${p.bad?' bad':''}" id="frm_${i}_pv">${p.t}</div>`});
 h=h.replace(/(data-a="frmgo:(?:pf|fx):a">)全部賣出/g,'$1全賣');
 return h};
(function(){try{
 const upd=t=>{if(!t||!t.id||!/^frm_\w+_a$/.test(t.id))return;const i=t.id.split('_')[1],pv=document.getElementById('frm_'+i+'_pv');if(!pv)return;const se=document.getElementById('frm_'+i+'_s'),p=pvText(i,se?se.value:'',frmNum(t.value));pv.textContent=p.t;pv.classList.toggle('bad',!!p.bad)};
 document.addEventListener('input',e=>upd(e.target),true);
 document.addEventListener('click',e=>{const b=e.target&&e.target.closest?e.target.closest('[data-fill]'):null;if(!b)return;setTimeout(()=>upd(document.getElementById(b.dataset.fill.split(':')[0])),0)},true);
}catch(e){}})();
/* 3. 累計損益：以買進金額追蹤成本（從這次更新後的買賣開始計算） */
const _hd124=handle;
handle=function(a){
 if(typeof a==='string'&&a.startsWith('frmgo:pf:')&&S){
  const k=frmGet('pf').s,b=(S.pf&&S.pf[k])||0;
  const r=_hd124.apply(this,arguments);
  try{const af=(S.pf&&S.pf[k])||0;S.pfc=S.pfc||{};if(S.pfc[k]==null)S.pfc[k]=b;
   if(af>b)S.pfc[k]+=af-b;else if(af<b&&b>0)S.pfc[k]*=af/b;if(af<=0)delete S.pfc[k]}catch(e){}
  return r}
 return _hd124.apply(this,arguments)};
/* 4. 投資組合頁：配置比例條、商品卡片、說明合併 */
const PFCAT=[['股票',['tw','us','jp','eu','em','kr','gb','in','au','sg'],'#b5573d'],['債券／定存',['bond'],'#5b8c85'],['不動產信託',['reit'],'#c9a14a'],['黃金',['gold'],'#8a6bb0'],['加密貨幣',['btc','eth'],'#6b7a88']];
const _pf124=pfHTML;
pfHTML=function(){
 let h=_pf124();
 try{
  S.pf=S.pf||{};const sum=pfSum();
  /* 說明合併 */
  const notes=[];h=h.replace(/<p class="sub">([\s\S]*?)<\/p>/g,(m,t)=>{notes.push(t);return notes.length===1?'@@NOTE@@':''});
  /* 配置比例條 */
  let bar='';
  if(sum>0){
   const segs=PFCAT.map(([n,ks,c])=>[n,ks.reduce((s,k)=>s+((S.pf[k])||0),0),c]).filter(x=>x[1]>0);
   bar=`<div class="pfbar">${segs.map(x=>`<i style="width:${(x[1]/sum*100).toFixed(1)}%;background:${x[2]}"></i>`).join('')}</div><div class="pfleg">${segs.map(x=>`<span style="--c:${x[2]}">${x[0]} ${Math.round(x[1]/sum*100)}%</span>`).join('')}</div>`;
  }else bar='<div class="sub">目前沒有投資部位。</div>';
  const nd=notes.length?`<details class="note"><summary>報酬、費用與資料標示</summary>${notes.map(t=>`<p class="sub">${t}</p>`).join('')}</details>`:'';
  h=h.replace('@@NOTE@@',bar+nd);
  /* 選單簡化 + 商品卡片 */
  h=h.replace(/(<select id="frm_pf_s">[\s\S]*?<\/select>)/,m=>m.replace(/（含匯率風險）/g,''));
  const st=frmState('pf'),ks=PFK.filter(k=>pfAvail(k,calYear())),k=ks.includes(st.s)?st.s:ks[0];
  if(k){
   const hold=S.pf[k]||0,cost=S.pfc&&S.pfc[k]!=null?S.pfc[k]:null,pl=cost!=null&&hold>0?hold-cost:null,lr=S.pfr&&S.pfr[k]!=null?S.pfr[k]:null;
   const card=`<div class="item pfcard"><b>${esc(PFN[k][0])}</b><div class="row2"><span>持有 ${money(hold)}</span>${lr!=null?`<span>去年報酬 <b class="${lr>=0?'pos':'neg'}">${lr>=0?'+':''}${(lr*100).toFixed(1)}%</b></span>`:''}${pl!=null?`<span>累計損益 <b class="${pl>=0?'pos':'neg'}">${pl>=0?'+':'−'}${money(Math.abs(Math.round(pl)))}</b></span>`:''}</div></div>`;
   h=h.replace(/(<select id="frm_pf_s">[\s\S]*?<\/select>)/,'$1'+card);
  }
 }catch(e){}
 return h};
