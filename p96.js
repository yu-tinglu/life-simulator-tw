// 圖示化與精簡文字
const AIC=[
 [/銀行|存款|定存|活存/,'bank'],[/匯|外幣/,'swap'],[/股票|投資組合|基金|投資|創投/,'chartup'],[/房|屋|住宅|宅/,'house'],[/貸款|還款|借/,'coin'],[/稅/,'clip'],
 [/遺囑|信託|遺產|傳承|繼承|接班/,'scale'],[/贈與|送禮|禮物/,'gift'],[/孩|子女|孫|領養|教養/,'baby'],[/伴侶|戀愛|約會|告白|結婚|婚/,'heart'],[/朋友|人脈|社交/,'friends'],
 [/公司|創業|工作|職業|求職|轉職|升遷|薪/,'briefcase'],[/學校|升學|補習|教育|留學|學歷/,'school'],[/健康|醫|看診|復健|體檢/,'stetho'],[/旅行|出國|機票|簽證|移居|移民|搬到/,'plane'],
 [/選舉|政治|參選|施政|罷免/,'scale'],[/設定|存檔/,'gear'],[/法規|法條|版權|資料來源|導覽/,'clip'],[/成就|結局|獎/,'trophy'],[/國家|海外|國外/,'globe'],
 [/運動|健身|跑步|游泳/,'run'],[/才藝|藝術|收藏/,'palette'],[/休閒|咖啡|旅宿|按摩/,'cup'],[/比賽|球隊|競賽/,'trophy'],[/慈善|基金會|捐/,'dove'],
 [/太空|火箭|衛星/,'rocket'],[/人工智慧|研究院|AI/,'brain'],[/能源|核融合|電/,'sun'],[/媒體|新聞|平台/,'news'],[/島|度假/,'wave'],[/車/,'moped'],
 [/保險|保障/,'lock'],[/退休|年金|勞退/,'hourglass'],[/報表|損益|財報/,'chartbar'],[/宗教|信仰|祈/,'lotus'],[/兵役|軍/,'helmet'],[/犯罪|法院|訴訟|律師/,'scale'],
 [/返回|關閉/,null]
];
function aiKey(t){for(const [re,k] of AIC)if(re.test(t))return k;return null}
function autoIc(root){
 try{
  if(!root||!root.querySelectorAll)return;
  const els=[...root.querySelectorAll('.btn,.sec')];if(root.matches&&root.matches('.btn,.sec'))els.push(root);
  for(const el of els){
   if(el.dataset.ai||el.querySelector('svg.ic')||el.closest('.seg,.chips,.tabs,.mini'))continue;
   el.dataset.ai='1';
   const lab=(el.firstChild&&el.firstChild.nodeType===3?el.firstChild.nodeValue:el.textContent||'').slice(0,40);
   const k=aiKey(lab);if(!k)continue;
   el.insertBefore(mkIcon(k),el.firstChild);
  }
 }catch(e){}
}
const _ic96=iconize;
iconize=function(root){_ic96(root);autoIc(root)};
/* 精簡文字 */
(function(){
 try{
  const st=document.createElement('style');
  st.textContent='body.lite .btn small{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}';
  document.head.appendChild(st);
 }catch(e){}
})();
function liteApply(){try{const p=lsGet(PREFK,{});document.body.classList.toggle('lite',p.lite!==false)}catch(e){}}
liteApply();
const _sh96=setHTML;
setHTML=function(){
 const p=lsGet(PREFK,{}),on=p.lite!==false;
 return _sh96().replace('<div class="sec">存檔匯出／匯入</div>',`<div class="sec">精簡文字（按鈕說明只顯示一行）</div><div class="seg" style="margin:6px 0"><button class="${on?'on':''}" data-a="lf:set:lite:1">開</button><button class="${on?'':'on'}" data-a="lf:set:lite:0">關</button></div><div class="sec">存檔匯出／匯入</div>`);
};
const _lf96=lfHandle;
lfHandle=function(x,y,z,u){
 if(x==='set'&&y==='lite'){const p=lsGet(PREFK,{});p.lite=z==='1';lsSet(PREFK,p);liteApply();return null}
 return _lf96(x,y,z,u);
};
