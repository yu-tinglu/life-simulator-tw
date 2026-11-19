/* ---- p125：新手上手：全域搜尋／我想做索引／導覽遮罩／下一步建議／按鈕原因／紅點／二次確認 ---- */
/* [分類,名稱,目標(T:分頁|L:人生子頁),要展開的區塊文字,關鍵字] */
const FT125=[
 ['工作與學業','找工作・打工・應徵','T:job','徵才','求職 工作 打工 兼職 應徵 就業 履歷'],
 ['工作與學業','辭職・升遷・我的職業','T:job','','辭職 離職 升遷 加薪 職業 熟練 資歷'],
 ['工作與學業','買車','T:job','買車','汽車 車子 機車'],
 ['工作與學業','進修・在職專班・同等學力・考試','L:edu','','輟學 重考 學測 會考 統測 考試 進修 學歷 升學 空大 研究所'],
 ['工作與學業','料理與食譜','L:cook','','煮 食譜 廚師 餐廳 菜'],
 ['工作與學業','創作與作品・參賽','L:wk','','才藝 作品 比賽 出道 名聲 知名度'],
 ['家庭與感情','結婚・約會・分手・離婚','T:rel','','伴侶 戀愛 求婚 婚禮 交往 老婆 老公 女友 男友'],
 ['家庭與感情','認識新朋友','T:rel','認識新朋友','交友 朋友 社交'],
 ['家庭與感情','心儀對象・告白','T:rel','心儀對象','暗戀 告白 喜歡'],
 ['家庭與感情','孩子・教養','T:rel','教養決策','生小孩 懷孕 子女 小孩 養育'],
 ['家庭與感情','領養寵物','T:rel','領養','寵物 貓 狗'],
 ['家庭與感情','家族史・家族樹','L:tree','','祖先 家譜 親戚'],
 ['活動與成長','運動・才藝・旅遊・比賽','T:act','','活動 健身 運動 旅行 遊學 打工'],
 ['活動與成長','能力總覽','L:stat','','健康 快樂 智力 外貌 數值'],
 ['活動與成長','個性與技能','L:skill','','技能 個性 性格'],
 ['活動與成長','健康・看醫生','L:health','','生病 保養 醫院 疾病'],
 ['活動與成長','頭像・外觀','L:av','','換裝 頭貼 造型'],
 ['錢與資產','存款・定存・貸款','T:ast','銀行存款','銀行 活存 利息 借錢 房貸 學貸'],
 ['錢與資產','股票・基金・債券・黃金','T:ast','投資組合','投資 買股 理財 ETF 比特幣 全賣'],
 ['錢與資產','買房・租屋','T:ast','房屋','房子 房貸 租房 搬家 居住'],
 ['錢與資產','年度收支・記帳','L:led','','收入 支出 帳本 花費'],
 ['錢與資產','社會保險・退休金','L:si','','勞保 健保 年金 退休'],
 ['錢與資產','房市行情','L:hs','','房價'],
 ['社會與世界','移民・匯率','T:cn','','出國 外幣 國外 簽證'],
 ['社會與世界','政策與補助・選舉','L:pol','','政治 參選 津貼 補助'],
 ['社會與世界','世界大事','L:wd','','新聞 經濟 戰爭'],
 ['社會與世界','倫理與價值・宗教','L:eth','','信仰 價值觀 宗教'],
 ['紀錄與傳承','遺囑・傳承・繼承','T:lg','','遺產 立遺囑 接班 下一代'],
 ['紀錄與傳承','人生時間軸・年度回顧','L:tl','','歷史 回顧 紀錄'],
 ['紀錄與傳承','成就與結局圖鑑','L:ach','','成就 結局 收集'],
 ['系統','存檔・匯出匯入','L:sv','','備份 讀檔 手動存檔'],
 ['系統','設定（簡單模式、字體、波動度）','L:set','','簡單模式 精簡 動畫 對比'],
 ['系統','新手導覽（再看一次）','L:tour','','教學 怎麼玩 說明'],
 ['系統','說明','L:help','','幫助 FAQ']
];
const fxCats=()=>[...new Set(FT125.map(f=>f[0]))];
function fxOpen(q){
 q=String(q||'').trim();
 const sk=(i)=>{const f=FT125[i];return `<button class="btn fxi" data-fx="${i}">${f[1]}<small>${f[0]}</small></button>`};
 let list='';
 if(!q)list=fxCats().map(c=>`<div class="sec op" style="margin-top:10px">${c}</div>`+FT125.map((f,i)=>f[0]===c?sk(i):'').join('')).join('');
 else{
  const k=q.toLowerCase().replace(/\s+/g,''),m=FT125.map((f,i)=>[i,(f[1]+f[4]).toLowerCase().includes(k)?2:(k.length>1&&[...k].some(ch=>f[1].includes(ch))&&0)?1:0]).filter(x=>x[1]>0);
  list=m.length?m.map(x=>sk(x[0])).join(''):`<p class="sub">找不到「${esc(q)}」。可以試試：結婚、買房、股票、找工作、考試。</p>`;
 }
 const first=!$('modal').classList.contains('on')||!$('fxq');
 if(first){
  $('modalBody').innerHTML=`<h3>我想做…</h3><input type="search" id="fxq" placeholder="搜尋功能（例如：結婚、買房、股票）" style="width:100%;margin:4px 0 6px;padding:10px;border-radius:12px;border:1px solid var(--line);box-sizing:border-box"><div id="fxl" style="max-height:56vh;overflow:auto"></div><button class="btn" data-fx="x">關閉</button>`;
  $('modal').classList.add('on');
  $('fxq').oninput=()=>fxOpen($('fxq').value);
  $('modalBody').onclick=e=>{const b=e.target.closest('[data-fx]');if(!b)return;const v=b.dataset.fx;if(v==='x'){fxClose();return}fxGo(+v)};
 }
 $('fxl').innerHTML=list;
}
function fxClose(){$('modal').classList.remove('on');$('modalBody').onclick=null}
function fxGo(i){
 const f=FT125[i];if(!f)return;fxClose();
 view.fsub=null;view.csub=null;view.cnsub=null;view.rsub=null;
 if(f[2][0]==='T')showSheet(f[2].slice(2));else handle('lf:'+f[2].slice(2));
 if(f[3])setTimeout(()=>fxSec(f[3]),30);
}
function fxSec(t){
 try{
  const s=[...document.querySelectorAll('#sheetBody .sec')].find(e=>e.textContent.includes(t));if(!s)return;
  if(s.classList.contains('cl'))s.click();
  s.scrollIntoView({block:'start'});s.style.transition='background .3s';s.style.background='color-mix(in srgb,var(--acc) 25%,transparent)';setTimeout(()=>{s.style.background=''},1600);
 }catch(e){}
}
/* 更多頁頂端加入口 */
const _mh125=moreHTML;
moreHTML=function(){return `<button class="btn p" data-a="fx:open">我想做…（找功能）<small>不知道功能在哪？按這裡</small></button>`+_mh125()};
/* 搜尋鈕 + 下一步提示列 + 紅點 */
(function(){try{
 const st=document.createElement('style');
 st.textContent=`#fxb{border:0;background:color-mix(in srgb,var(--acc) 14%,var(--card));color:var(--acc);width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:none;margin-right:6px;padding:0}#fxb svg{width:18px;height:18px}
.tab{position:relative}.tab i.dot{position:absolute;top:6px;left:calc(50% + 8px);width:9px;height:9px;border-radius:50%;background:#d64545;border:2px solid var(--card);box-sizing:content-box}
#nx{display:none;margin:4px 10px 0;padding:8px 10px;border-radius:12px;background:color-mix(in srgb,var(--acc) 12%,var(--card));font-size:13px;line-height:1.45;align-items:center;gap:8px}#nx.on{display:flex}#nx span{flex:1}#nx button{border:0;background:none;color:var(--mute);font-size:16px;padding:2px 6px}
small.why{display:block;color:#b4452f!important;font-size:11.5px;margin-top:2px}
#coach{position:fixed;inset:0;z-index:99999}#coach .hole{position:absolute;border-radius:14px;box-shadow:0 0 0 9999px rgba(30,20,10,.62);transition:all .25s}#coach .tip{position:absolute;left:14px;right:14px;background:var(--card);color:var(--ink);border-radius:16px;padding:14px;box-shadow:0 10px 30px rgba(0,0,0,.3);font-size:14.5px;line-height:1.55}#coach .tip div{display:flex;gap:8px;margin-top:10px}#coach .tip button{flex:1;padding:10px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:var(--ink);font-size:14px}#coach .tip button.p{background:var(--acc);color:#fff;border-color:var(--acc)}`;
 document.head.appendChild(st);
 const hd=document.querySelector('#hd .row'),ab=hd&&hd.querySelector('.agebox');
 if(hd){const b=document.createElement('button');b.id='fxb';b.setAttribute('aria-label','搜尋功能');b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>';b.onclick=()=>{if(S)fxOpen('')};hd.insertBefore(b,ab)}
 const nx=document.createElement('div');nx.id='nx';nx.innerHTML='<span></span><button aria-label="略過">✕</button>';
 const feed=document.getElementById('feed');feed.parentNode.insertBefore(nx,feed);
}catch(e){}})();
const NX125=[
 ['age',()=>S.age<=1,'點下方中間的「年齡 +1」，人生就往前走一年。'],
 ['tabs',()=>S.age>=2&&!view.seenTab,'下方有職業、關係、活動、資產四個分頁，每年行動點有限，挑重要的做。'],
 ['job',()=>S.age>=16&&!S.job&&!S.school&&!S.jail&&!S.army&&!(S.flags&&S.flags.retired),'還沒有收入？到「職業」找打工或正職。'],
 ['rel',()=>S.age>=20&&!S.partner&&S.age<=40,'想談戀愛？到「關係」認識新朋友或心儀對象。'],
 ['ast',()=>S.age>=18&&S.money>=500000&&typeof pfSum==='function'&&pfSum()===0,'手上有閒錢？到「資產」存定存或投資，放著會被通膨吃掉。'],
 ['find',()=>S.age>=3&&!view.seenFx,'找不到功能？點右上角放大鏡，輸入想做的事（例如：結婚、買房）。']
];
function nxUpdate(){
 const nx=document.getElementById('nx');if(!nx||!S)return;
 S.nxd=S.nxd||{};
 const h=S.dead?null:NX125.find(x=>!S.nxd[x[0]]&&x[1]());
 if(!h){nx.classList.remove('on');return}
 nx.classList.add('on');nx.firstChild.textContent='下一步：'+h[2];nx.lastChild.onclick=()=>{S.nxd[h[0]]=1;nxUpdate()};
}
function dotsUpdate(){
 if(!S||!document.querySelectorAll)return;
 view.seen=view.seen||{};
 const cnt=S.nf?Object.keys(S.nf).length:0;if(view.nfc==null)view.nfc=cnt;if(cnt>view.nfc){view.nfc=cnt;view.seen.more=-1}
 const cond={
  job:()=>S.age>=15&&!S.job&&!S.school&&!S.jail&&!S.army&&!(S.flags&&S.flags.retired),
  rel:()=>S.age>=18&&!S.partner,
  act:()=>S.age>=6&&!S.jail&&ACTS.some(a=>S.age>=a.min&&(!a.max||S.age<=a.max)&&(!a.if||a.if())&&!S.acts[a.id]&&!(a.cost&&S.money<a.cost)),
  ast:()=>S.age>=18&&S.money>=500000&&typeof pfSum==='function'&&pfSum()===0,
  more:()=>view.seen.more===-1
 };
 document.querySelectorAll('.tab').forEach(b=>{
  const t=b.dataset.t,c=cond[t]&&!S.dead&&cond[t]()&&view.seen[t]!==S.age&&(t!=='more'||view.seen.more===-1);
  let d=b.querySelector('i.dot');if(c&&!d){d=document.createElement('i');d.className='dot';b.appendChild(d)}else if(!c&&d)d.remove();
 });
}
const _r125=render;
render=function(){const r=_r125.apply(this,arguments);try{nxUpdate();dotsUpdate()}catch(e){}return r};
const _ss125=showSheet;
showSheet=function(tab,sub){
 const r=_ss125.apply(this,arguments);
 try{
  if(S){view.seen=view.seen||{};view.seen[tab]=tab==='more'?0:S.age;view.seenTab=1;if(tab==='more')view.seenFx=1;dotsUpdate();nxUpdate();whyFix()}
 }catch(e){}
 return r;
};
/* 按鈕停用時顯示原因 */
function whyFix(){
 const body=document.getElementById('sheetBody');if(!body||!body.querySelectorAll||!S)return;
 body.querySelectorAll('button[disabled]').forEach(b=>{
  if(b.querySelector('.why'))return;
  const a=b.dataset.a||'';let r='';
  if(S.dead)r='已逝世';
  else if(S.jail&&/^(act|job|buy|do|rom|mt)/.test(a))r='服刑中無法進行';
  else if(/^act:/.test(a)){const o=ACTS.find(q=>q.id===a.split(':')[1]);if(o&&!S.acts[o.id]&&o.cost&&S.money<o.cost)r='現金不足，需要 '+money(o.cost)}
  else if(/^buyC:/.test(a)){const c=CARS[+a.split(':')[1]];if(c&&S.money<c.p)r='現金不足，需要 '+money(c.p)}
  else if(/^do:/.test(a)&&S.ap<1&&/:(talk|gift|date|look|chance|trip)$/.test(a))r='今年的行動點用完了，明年再來';
  else if(/^(mt:crush|mt:new)/.test(a)&&S.ap<1)r='今年的行動點用完了，明年再來';
  if(r){const s=document.createElement('small');s.className='why';s.textContent=r;b.appendChild(s)}
 });
}
/* 不可逆操作二次確認 */
const _h125=handle;
let _bp125=0;
handle=function(a){
 if(a==='fx:open'){fxOpen('');return}
 if(_bp125||!S||typeof a!=='string')return _h125.apply(this,arguments);
 let m=null;
 if(a==='dropout')m=`確定要從${S.school||'學校'}輟學嗎？之後可以考同等學力或進修，但這一年的學業會中斷。`;
 else if(/^frmgo:(pf|fx):a$/.test(a))m='確定要全部賣出嗎？會依目前價格結算。';
 else if(/^bk:fdx:/.test(a))m='確定要提前解約定存嗎？只會按活存利率計息，會損失一部分利息。';
 else if(/^do:[^:]+:breakup$/.test(a)){const p=S.partner;m=p&&p.married?'確定要離婚嗎？財產會分走一半，心情也會大受影響。':'確定要分手嗎？';}
 if(!m)return _h125.apply(this,arguments);
 const self=this,args=arguments;
 ask(m,['確定','取消'],c=>{if(c===0){_bp125=1;try{_h125.apply(self,args)}finally{_bp125=0}}});
};
/* 新手導覽：用遮罩圈出真正的按鈕 */
const CO125=[
 ['#ageBtn','這顆「年齡 +1」是核心：點一下，人生就往前走一年。每年會遇到需要你做選擇的事。'],
 ['.bottom','下方分頁：職業、關係、活動、資產。每年行動點有限，挑重要的做。分頁上的紅點代表有事可以做。'],
 ['.tab[data-t="more"]','找不到功能就來「更多」，或點右上角放大鏡搜尋（例如：結婚、買房、股票）。']
];
function coach(i){
 const old=document.getElementById('coach');if(old)old.remove();
 if(i>=CO125.length){try{localStorage.setItem('lifesim_tour_v2','1');localStorage.setItem('lifesim_coach125','1')}catch(e){}return}
 const el=document.querySelector(CO125[i][0]);if(!el){coach(i+1);return}
 const r=el.getBoundingClientRect(),pad=6,c=document.createElement('div');c.id='coach';
 const top=r.top>innerHeight/2;
 c.innerHTML=`<div class="hole" style="left:${r.left-pad}px;top:${r.top-pad}px;width:${r.width+pad*2}px;height:${r.height+pad*2}px"></div><div class="tip" style="${top?`bottom:${innerHeight-r.top+pad+12}px`:`top:${r.bottom+pad+12}px`}">${CO125[i][1]}<div class="sub" style="margin-top:6px;font-size:12px">${i+1} / ${CO125.length}</div><div><button data-k="s">略過</button><button class="p" data-k="n">${i===CO125.length-1?'開始玩':'下一步'}</button></div></div>`;
 c.onclick=e=>{const b=e.target.closest('[data-k]');if(!b)return;coach(b.dataset.k==='s'?99:i+1)};
 document.body.appendChild(c);
}
tourStep=function(i){coach(i||0)};
const _ng125=newGame;
newGame=function(){
 const r=_ng125.apply(this,arguments);
 try{if(!localStorage.getItem('lifesim_coach125')&&!localStorage.getItem('lifesim_tour_v2')){localStorage.setItem('lifesim_tour_v2','0');setTimeout(()=>{if(S&&S.age<=1)coach(0)},700)}}catch(e){}
 return r;
};
