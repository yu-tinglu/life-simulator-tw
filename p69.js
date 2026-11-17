/* ---- p69：海外以當地貨幣顯示；介面統一尺寸；每個按鈕附不重複圖示 ---- */
/* 世界與匯率頁面刻意以台幣比較，顯示時固定用 NT$ */
['cnHTML','wdHTML','fxHTML','pfHTML'].forEach(n=>{
 try{const f=eval(n);if(typeof f!=='function')return;
  eval(n+'=function(){const o=MNY_TW;MNY_TW=true;try{return f.apply(this,arguments)}finally{MNY_TW=o}}');
 }catch(e){}
});
const _ah69=astHTML;
astHTML=function(){
 const h=_ah69();
 if(!S||!S.cn||S.cn==='TW'||!CNS[S.cn])return h;
 const c=CNS[S.cn],f=fxr(S.cn),i=h.indexOf('</h3>');
 const card=`<div class="item"><b>目前以${c.sym}顯示金額</b><div class="sub">1 ${c.sym} ＝ NT$${f.toFixed(f<1?4:2)}。手頭現金視為當地貨幣（匯率變動每年有匯兌損益）；台灣的房子、存款以台幣計價並依匯率換算。</div></div>`;
 return i<0?card+h:h.slice(0,i+5)+card+h.slice(i+5);
};
/* ---- 圖示分配 ---- */
const UIKW=[[/存款|活存|定存|銀行|利息/,'bank'],[/貸款|學貸|還款|負債/,'scale'],[/打工|兼職|工作|求職|應徵|職涯|職業/,'briefcase'],[/跑|運動|訓練|健身|登山|健行|打球/,'run'],[/游泳/,'wave'],[/單車|環島|機車|外送/,'moped'],[/瑜伽|冥想|放鬆|休息/,'lotus'],[/歌|唱|音樂|樂器|演唱|樂團/,'headphones'],[/舞|派對|聚會/,'ferris'],[/畫|設計|藝術|展覽|攝影/,'palette'],[/讀書|學習|補習|書|才藝/,'book'],[/學校|大學|留學|畢業|學費|獎學|升學|考試/,'cap'],[/醫|病|健康|診/,'stetho'],[/藥/,'pill'],[/旅行|旅遊|出國|機票|出遊/,'plane'],[/吃|餐|美食|宵夜|煮|廚/,'bowl'],[/咖啡|茶|飲/,'cup'],[/禮|送/,'gift'],[/告白|戀愛|約會|愛|情/,'heart'],[/結婚|婚|求婚/,'ring'],[/孩子|子女|寶寶|小孩|領養/,'baby'],[/家人|父母|家庭|家族/,'family'],[/朋友|同學|同事|人脈/,'friends'],[/聊|談|溝通|訊息|問候|信/,'chat'],[/吵|爭|憤/,'angry'],[/分手|離婚|斷絕/,'heartbreak'],[/和好|道歉|修復/,'dove'],[/買|房|屋|居住|搬/,'house'],[/股|投資|基金|匯|外幣/,'swap'],[/錢|金|費|薪|收入|獎金|財/,'coin'],[/賭|彩|抽/,'dice'],[/偷|搶|詐/,'mask'],[/捐|志工|公益/,'medal'],[/比賽|競賽|冠軍|選秀|大賽/,'trophy'],[/紀錄|成績|名聲|統計|走勢|收支/,'chartbar'],[/設定|選項/,'gear'],[/關閉|返回|取消|放棄|算了|拒絕|婉拒/,'door'],[/解約|辭職|辭掉/,'crossc'],[/申請|報名|提交/,'clip'],[/電影|追劇|看/,'play'],[/遊戲|電玩|桌遊/,'dice'],[/宗教|信仰|祈/,'lotus'],[/法|警|律師|犯/,'scale'],[/軍|兵/,'helmet'],[/睡|夢|夜/,'moon'],[/天氣|曬/,'sun']];
const UIPOOL=['sparkle','star','flower','leaf','sprout','rainbow','rocket','wind','ticket','search','eye','dna','flask','news','pin','globe','tree','scissors','yarn','shades','hourglass','lock','refresh','inbox','chain','kid','person','elder','mug','image','building','factory','tie','cap','school','gift','cake','phone','mail','drop','moon','sun','menu','net','smile','meh','mask','question','nosmoke','headphones','play','check','checkc','crossc','square'];
const UITILE={'lf:ach':'trophy','lf:tree':'tree','lf:rev':'chartup','lf:tl':'hourglass','lf:ch':'chartbar','lf:dx':'book','lf:stat':'star','lf:led':'coin','open:act':'target','open:rel':'family','lf:pol':'scale','lf:art':'palette','lf:health':'stetho','lf:eth':'globe','lf:rg':'lotus','lf:skill':'rocket','open:job':'briefcase','open:ast':'house','open:eco':'wave','lf:hs':'building','lf:si':'lock','lf:wd':'plane','lf:sv':'refresh','lf:set':'gear','lf:help':'question'};
function uiLabel(el){let t='';el.childNodes.forEach(n=>{if(n.nodeType===3)t+=n.nodeValue;else if(n.nodeType===1&&!/^(SMALL|B|SVG)$/i.test(n.nodeName)&&!(n.classList&&n.classList.contains('ic')))t+=n.textContent});return t.replace(/\s+/g,'')}
const UIALT={bank:['coin','inbox','chartup','lock'],run:['target','rocket','wind','hourglass','star'],coin:['bank','inbox','chartup'],briefcase:['tie','ptie','building','clip'],book:['clip','news','cap','school'],cap:['school','book','star'],heart:['sparkle','flower','gift'],chat:['mail','phone','inbox'],trophy:['medal','star','rocket'],chartbar:['chartup','news','clip'],headphones:['play','star','sparkle'],palette:['image','scissors','yarn'],plane:['globe','pin','sun'],gift:['cake','flower'],house:['building','door'],swap:['refresh','chartup','coin'],gear:['lock','menu'],door:['crossc','x']};
function uiPick(label,used,pre){
 if(pre&&!used.has(pre))return pre;
 for(const [re,id] of UIKW)if(re.test(label)){if(!used.has(id))return id;for(const a of (UIALT[id]||[]))if(!used.has(a))return a}
 for(const id of UIPOOL)if(!used.has(id))return id;
 return 'dot';
}
function uiIcon(id){const s=mkIcon(id);s.classList.add('lead');return s}
function uiDecorate(root){
 try{
  if(!root||!root.querySelectorAll)return;
  if(typeof iconize==='function')iconize(root);
  const used=new Set();
  root.querySelectorAll('.btn,.tile').forEach(el=>{
   const tile=el.classList.contains('tile');
   let lead=null;
   if(tile){const b=el.querySelector('b');lead=b&&b.querySelector('svg.ic')?b.querySelector('svg.ic'):null}
   else{const f=el.firstElementChild;if(f&&f.nodeName.toLowerCase()==='svg'&&f.classList.contains('ic'))lead=f}
   let id=null;if(lead){const m=(lead.getAttribute('class')||'').match(/ic-([a-z0-9]+)/);id=m?m[1]:null}
   const label=uiLabel(el)||el.textContent;
   const pre=tile?UITILE[el.dataset.a]:null;
   let want=id;
   if(pre&&!used.has(pre))want=pre;
   else if(!id||used.has(id))want=uiPick(label,used,null);
   used.add(want);
   if(want!==id||!lead||!lead.classList.contains('lead')){
    const ic=uiIcon(want);
    if(tile){let b=el.querySelector('b');if(!b){b=document.createElement('b');el.insertBefore(b,el.firstChild)}b.textContent='';b.appendChild(ic)}
    else{if(lead&&lead.parentNode===el)el.removeChild(lead);el.insertBefore(ic,el.firstChild)}
   }
   el.classList.add('hi');
  });
  const MS={'人生記錄':'book','生活與家庭':'family','財務與職涯':'coin','世界':'globe','系統':'gear','其他':'menu'};
  root.querySelectorAll('.msec').forEach(b=>{if(b.querySelector('svg'))return;const t=(b.textContent||'').replace(/（.*$/,'');const sp=b.firstElementChild;if(sp)sp.insertBefore(mkIcon(MS[t]||'dot'),sp.firstChild)});
 }catch(e){}
}
const _ss69=showSheet;
showSheet=function(tab,sub){const r=_ss69(tab,sub);try{uiDecorate(document.getElementById('sheetBody'))}catch(e){}return r};
const _ask69=ask;
ask=function(text,labels,cb){const r=_ask69(text,labels,cb);try{uiDecorate(document.getElementById('modalBody'))}catch(e){}return r};
/* 常駐捷徑列的圖示 */
const UIQ={'運動':'run','比賽':'trophy','打工':'briefcase','才藝':'book','休閒':'cup'};
const _qb69=qbUpdate;
qbUpdate=function(){
 _qb69();
 try{const q=document.getElementById('qbar');if(!q)return;
  q.querySelectorAll('button').forEach(b=>{if(b.querySelector('svg'))return;const k=b.dataset.q,id=b.dataset.st?'star':b.dataset.ld?'coin':UIQ[k]||'dot';b.insertBefore(mkIcon(id),b.firstChild)});
 }catch(e){}
};
/* 活動分類標籤圖示 */
const _ah69b=actHTML;
actHTML=function(){return _ah69b().replace(/<button class="([^"]*)" data-a="ac:c:([^"]+)">/g,(m,c,k)=>`<button class="${c}" data-a="ac:c:${k}">${({'常用':'🎯','運動':'🏃','比賽':'🏆','才藝':'🎨','休閒':'☕','打工':'💼','冒險':'🎲'})[k]||''} `)};
/* ---- 統一尺寸與樣式 ---- */
(function(){try{
 const st=document.createElement('style');
 st.textContent=`
.btn{min-height:62px;padding:12px 16px;font-size:15px;line-height:1.35;border-radius:16px;margin:8px 0;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;text-align:left}
.btn.hi{position:relative;padding-left:52px}
.btn.hi>.ic.lead{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:24px;height:24px;margin:0}
.btn small{font-size:12px;line-height:1.4;margin-top:2px}
.btn.p{align-items:center;text-align:center}
.tile{min-height:104px;padding:14px 8px;font-size:14.5px;display:flex;flex-direction:column;align-items:center;justify-content:center}
.tile b{display:flex;align-items:center;justify-content:center;width:36px;height:36px;margin-bottom:6px;font-size:0;filter:none}
.tile b .ic{width:30px;height:30px;margin:0}
.tile small{font-size:11.5px}
.mini{min-height:40px;padding:8px 14px;font-size:14px;border-radius:12px}
.seg button{min-height:44px;font-size:14.5px;border-radius:12px}
.item{padding:12px 14px;border-radius:16px}
.sec{font-size:13px}
#qbar button,.acat button{min-height:36px;padding:6px 14px;font-size:13.5px;display:inline-flex;align-items:center;gap:6px}
#qbar button .ic,.acat button .ic{width:16px;height:16px}
.acat button.on .ic{color:#fff}
button.msec .ic{width:18px;height:18px;margin-right:8px;vertical-align:-3px}
`;
 document.head.appendChild(st);
}catch(e){}})();
