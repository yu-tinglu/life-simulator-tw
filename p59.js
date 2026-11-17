/* ---- p59：活動分類頁、快捷列、兼職打工系統、自動存檔提示、更多頁收合 ---- */
/* 基本工資（時薪，台灣勞動部公告，各年 1 月起適用值）；2016 年以前為推估 */
const PTH={2007:95,2008:95,2009:95,2010:95,2011:98,2012:103,2013:109,2014:115,2015:120,2016:120,2017:133,2018:140,2019:150,2020:158,2021:160,2022:168,2023:176,2024:183,2025:190,2026:196};
function ptBase(){
 const y=calYear();let b=y>2026?196*(typeof WI==='function'?WI():1):(PTH[y]||66);
 const k=S.cn||'TW';
 if(k!=='TW'&&CNS[k]&&CNS.TW&&CNS[k].w&&CNS.TW.w)b*=Math.max(.15,Math.min(3,CNS[k].w/CNS.TW.w));
 return b;
}
const ptLic=()=>S.school==='大學'||S.school==='碩士'||S.school==='博士'||S.edu>=4;
/* 兼職清單：m=相對基本工資的倍數（遊戲設定，依常見時薪行情估算，非官方職缺資料） */
const PTJOBS=[
 {id:'brk',t:'早餐店助手',min:15,m:1.00,d:'假日與寒暑假早班',sk:'comm'},
 {id:'sup',t:'超市理貨員',min:15,m:1.00,d:'補貨、整理貨架',sk:'fit'},
 {id:'wash',t:'餐廳洗碗工',min:15,m:1.02,d:'日間班，不碰危險機具',sk:'fit'},
 {id:'flyer',t:'發傳單',min:15,m:1.08,d:'街頭發傳單、試吃活動',sk:'comm'},
 {id:'bub',t:'手搖飲店員',min:16,m:1.05,d:'備料、調飲、收銀',sk:'comm'},
 {id:'fast',t:'速食店員',min:16,m:1.05,d:'櫃檯與廚房輪替',sk:'comm'},
 {id:'cafe',t:'咖啡店店員',min:16,m:1.10,d:'沖煮與接待',sk:'comm'},
 {id:'cine',t:'電影院票務',min:16,m:1.05,d:'售票、驗票、整理場地',sk:'comm'},
 {id:'cvs',t:'便利商店店員',min:16,m:1.05,d:'日間班',sk:'comm'},
 {id:'promo',t:'賣場促銷員',min:16,m:1.20,d:'假日促銷、站櫃',sk:'comm',lk:55},
 {id:'cvsn',t:'超商夜班店員',min:18,m:1.30,d:'夜間班有加給',sk:'comm'},
 {id:'hotel',t:'飯店房務員',min:18,m:1.10,d:'整理客房',sk:'fit'},
 {id:'data',t:'客服／資料輸入',min:18,m:1.15,d:'電話與線上客服、資料建檔',sk:'comm'},
 {id:'site',t:'工地臨時工',min:18,m:1.35,d:'日薪制換算，體力活',sk:'fit',h:1},
 {id:'event',t:'活動場佈／接待',min:18,m:1.25,d:'展覽、婚宴、演唱會場務',sk:'comm',side:1},
 {id:'deliv',t:'外送員',min:18,m:1.50,d:'自備機車，時薪為尖峰平均估算',sk:'fit',side:1},
 {id:'tutor',t:'家教老師',min:18,m:3.00,d:'需大學以上學歷或在學',sk:'tech',side:1,need:()=>ptLic()?'':'需大學以上'},
 {id:'asst',t:'補習班助教',min:18,m:1.45,d:'批改作業、課後輔導',sk:'tech',need:()=>ptLic()?'':'需大學以上'},
 {id:'model',t:'平面模特兒',min:18,m:1.80,d:'接案拍攝，案量不穩',sk:'cre',lk:65,side:1}
];
function ptJob(id){return PTJOBS.find(j=>j.id===id)}
function ptRate(o){const j=ptJob(o.id);return Math.round(ptBase()*j.m*(1+.03*Math.min(o.yrs||0,5)))+(o.up||0)}
function ptOpts(side){
 if(S.age<18)return [6,10,15];
 if(side)return [6,10];
 if(S.school)return [8,15,25];
 return [20,30,40];
}
function ptWeeks(){return S.school?42:48}
function ptBlock(j){
 if(S.age<j.min)return `${j.min} 歲以上`;
 if(j.lk&&S.looks<j.lk)return `外貌 ${j.lk}+`;
 if(j.need){const r=j.need();if(r)return r}
 if(S.job&&!j.side)return '有正職時只能做兼差型工作';
 return '';
}
function ptHTML(){
 let h='<div class="sub">時薪依當年基本工資（台灣勞動部公告；2015 年以前為近似值，2007 年以前以約 NT$66 推估）乘上各職缺倍率，倍率為遊戲設定、非官方職缺資料；國外時薪依當地平均薪資比例換算。</div>';
 if(S.age<15)return h+'<p class="sub">滿 15 歲才能打工。</p>';
 if(S.age<18)h+='<div class="sub">未滿 18 歲：視為取得家長同意，每週最多 15 小時，且只能做日間輕鬆工作。</div>';
 const o=S.ptj;
 if(o){
  const j=ptJob(o.id),rate=ptRate(o),yr=rate*o.h*ptWeeks();
  h+=`<div class="item"><b>目前兼職：${j.t}</b><br>時薪 ${money(rate)} ・ 每週 ${o.h} 小時 ・ 年資 ${o.yrs} 年<br>預估全年收入約 ${money(yr)}（每年按 ${ptWeeks()} 週計）</div><div class="sec">每週工時</div><div class="seg">${ptOpts(j.side).map(x=>`<button class="${x===o.h?'on':''}" data-a="ac:ph:${x}">${x} 小時</button>`).join('')}</div>`;
  if(S.school&&o.h>=15)h+='<div class="sub">在學期間工時過長，會拖累成績與壓力。</div>';
  h+='<button class="btn" data-a="ac:pq">辭掉兼職</button>';
 }
 h+='<div class="sec">徵才（今年每個職缺只能應徵一次）</div>';
 h+=PTJOBS.map(j=>{const b=ptBlock(j),done=S.acts['pj'+j.id],rate=Math.round(ptBase()*j.m);
  return `<button class="btn" data-a="ac:pj:${j.id}" ${b||done||(o&&o.id===j.id)||S.jail?'disabled':''}>${j.t}<small>時薪 ${money(rate)} ・ ${j.min} 歲以上 ・ ${j.d}${b?' ・ '+b:''}${done?'（今年已應徵）':''}</small></button>`}).join('');
 return h;
}
function ptApply(id){
 const j=ptJob(id);if(!j)return null;const b=ptBlock(j);if(b)return B('條件不符：'+b);
 if(S.acts['pj'+id])return B('今年已經應徵過了。');
 S.acts['pj'+id]=1;mFix();
 const p=Math.max(.3,Math.min(.92,.55+(S.skl.comm-10)/150+(S.looks-50)/400+(S.age<18?-.08:0)+(S.record?-.15:0)));
 if(chance(p)){
  const h0=ptOpts(j.side)[0];S.ptj={id,h:h0,yrs:0,up:0};
  const m=`你錄取了兼職「${j.t}」，時薪 ${money(Math.round(ptBase()*j.m))}，每週 ${h0} 小時。`;log(m,'good');return G(m);
 }
 chg('happy',-2);const m=`你應徵兼職「${j.t}」沒被錄取。`;log(m,'bad');return B(m);
}
function ptPay(){
 const o=S.ptj;if(!o)return;
 const j=ptJob(o.id);
 if(!j||S.jail||S.army||S.age>=70||(S.job&&!j.side)){if(j&&S.job&&!j.side)log(`你有正職了，辭掉兼職「${j.t}」。`);S.ptj=null;return}
 const rate=ptRate(o),pay=rate*o.h*ptWeeks();
 ldset('兼職收入');S.money+=pay;ldset(null);o.yrs++;
 log(`兼職「${j.t}」：時薪 ${money(rate)}、每週 ${o.h} 小時，全年收入 ${money(pay)}。`,'good');
 mFix();S.skl[j.sk]=Math.min(100,(S.skl[j.sk]||0)+(o.h>=15?2:1));
 S.stress=cl(S.stress+Math.round(o.h/6));if(o.h>=25)chg('happy',-3);
 if(S.school){if(o.h>=15){S.grade=cl(S.grade-R(2,5));log('兼職工時太長，成績掉了一些。','bad')}else if(o.h>=10)S.grade=cl(S.grade-R(0,2))}
 if(j.h)chg('health',-R(0,2));
 if(chance(.15)){const u=R(3,8);o.up=(o.up||0)+u;log(`店長覺得你表現不錯，時薪加了 NT$${u}。`,'good')}
 if(chance(.06)){log(`兼職「${j.t}」因為人力調整，你被資遣了。`,'bad');S.ptj=null}
}
/* 寒暑假工讀（供事件使用）：時數與時薪明列 */
function ptSummer(){
 if(S.age<15)return N('你還太小，沒有人要請你。');
 const hr=Math.round(ptBase()*1.0),hours=R(120,280),pay=hr*hours;
 S.money+=pay;S.stress=cl(S.stress+3);chg('happy',-1);mFix();S.skl.comm=Math.min(100,S.skl.comm+1);
 return N(`你利用假期打工 ${hours} 小時，時薪 ${money(hr)}（基本工資），共賺 ${money(pay)}。`);
}
const _y59=yearly;
yearly=function(){
 _y59();
 try{ptPay()}catch(e){}
 if(S.flags&&S.flags.retired&&S.pension>0&&!S.dead)log(`今年領到退休金／年金 ${money(S.pension)}。`,'good');
};
/* 舊的「兼職打工」活動與事件改走新系統 */
(function(){const o=ACTS.find(a=>a.id==='pt');if(o)o.if=()=>false})();

/* ---- 活動頁：分類 ---- */
const ACATS=['常用','運動','比賽','才藝','休閒','打工','冒險'];
const ACMAP={gym:'運動',study:'才藝',doc:'休閒',med:'休閒',food:'休閒',beauty:'休閒',trip:'休閒',donate:'休閒',lotto:'冒險',bet:'冒險',steal:'冒險',rob:'冒險',fraud:'冒險'};
function acCat(a){return a.cat||ACMAP[a.id]||'休閒'}
function acBtn(a){
 const used=S.acts[a.id],poor=a.cost&&S.money<a.cost;
 return `<button class="btn" data-a="act:${a.id}" ${S.jail||used||poor||S.dead?'disabled':''}>${a.l}<small>${a.sub||(a.cost?'費用 '+money(a.cost):'免費')}${used?'（今年已做）':''}</small></button>`;
}
const _ah59=actHTML;
actHTML=function(){
 if(view.acat==='紀錄'&&typeof cpRecHTML==='function')return `<h3>活動</h3><div class="acat"><button data-a="ac:c:比賽">返回比賽</button></div>`+cpRecHTML();
 const vis=ACTS.filter(a=>S.age>=a.min&&(!a.max||S.age<=a.max)&&(!a.if||a.if()));
 const rc=(S.rcnt||[]).map(id=>vis.find(a=>a.id===id)).filter(Boolean);
 const cats=ACATS.filter(c=>c==='常用'?rc.length>0:c==='打工'?S.age>=15:c==='比賽'?vis.some(a=>acCat(a)==='比賽'):true);
 let cur=view.acat;if(!cats.includes(cur))cur=cats[0];
 let h=`<h3>活動</h3><div class="acat">${cats.map(c=>`<button class="${c===cur?'on':''}" data-a="ac:c:${c}">${c}</button>`).join('')}</div>`;
 if(cur==='打工')return h+ptHTML();
 if(cur==='常用')return h+'<div class="sub">最近做過的活動</div>'+rc.map(acBtn).join('');
 h+=`<div class="sub">每項活動每年限一次${cur==='比賽'?'・比賽結果見「比賽紀錄」':''}</div>`;
 if(cur==='比賽')h+='<button class="btn" data-a="ac:cr">比賽紀錄與名聲<small>歷年成績、獎金、出道邀約</small></button>';
 return h+vis.filter(a=>acCat(a)===cur).map(acBtn).join('');
};
const _hd59=handle;
handle=function(a){
 if(typeof a==='string'&&S){
  const p=a.split(':');
  if(p[0]==='act'){try{const id=p[1],r=S.rcnt||(S.rcnt=[]);const i=r.indexOf(id);if(i>=0)r.splice(i,1);r.unshift(id);if(r.length>6)r.length=6}catch(e){}}
  if(p[0]==='ac'){
   let r=null;
   if(p[1]==='c'){view.acat=p[2]}
   else if(p[1]==='cr'){view.acat='紀錄'}
   else if(p[1]==='go'){view.acat=p[2]}
   else if(p[1]==='pj'){r=ptApply(p[2])}
   else if(p[1]==='ph'){if(S.ptj){const j=ptJob(S.ptj.id);if(ptOpts(j.side).includes(+p[2]))S.ptj.h=+p[2]}}
   else if(p[1]==='pq'){if(S.ptj){log(`你辭掉了兼職「${ptJob(S.ptj.id).t}」。`);S.ptj=null;r=N('你辭掉了兼職。')}}
   view.msg=r;view.tab='act';render();showSheet('act');return;
  }
  if(p[0]==='mc'){view.mco=view.mco||{};view.mco[p[1]]=!view.mco[p[1]];showSheet('more');return}
 }
 return _hd59(a);
};
/* ---- 快捷列與自動存檔提示 ---- */
let QSAVE='';
const _sv59=save;
save=function(){_sv59();try{const d=new Date();QSAVE=('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2);qbUpdate()}catch(e){}};
function qbUpdate(){
 try{
  let q=document.getElementById('qbar');
  if(!q){const f=document.getElementById('feed');if(!f||!f.parentNode)return;q=document.createElement('div');q.id='qbar';f.parentNode.insertBefore(q,f);
   q.onclick=e=>{const b=e.target.closest('[data-q]');if(b)handle('ac:go:'+b.dataset.q)}}
  if(!S||S.dead){q.style.display='none';return}
  q.style.display='';
  const c=[['運動','運動'],['比賽','比賽']];if(S.age>=15)c.push(['打工','打工']);c.push(['才藝','學習']);c.push(['休閒','休閒']);
  q.innerHTML=c.map(x=>`<button data-q="${x[0]}">${x[1]}</button>`).join('')+`<span class="qs">${QSAVE?'已存檔 '+QSAVE:'自動存檔'}</span>`;
 }catch(e){}
}
const _rd59=render;
render=function(){_rd59();qbUpdate()};
(function(){try{
 const st=document.createElement('style');
 st.textContent='#qbar{display:flex;gap:6px;align-items:center;padding:6px 12px;overflow-x:auto;white-space:nowrap;border-bottom:1px solid var(--line)}#qbar button{flex:none;border:1px solid var(--line);background:#fff;border-radius:14px;padding:5px 12px;font-size:13px;color:var(--ink)}#qbar .qs{flex:none;margin-left:auto;font-size:11px;color:var(--mute);padding-left:6px}.acat{display:flex;gap:6px;overflow-x:auto;margin:6px 0 10px;padding-bottom:2px}.acat button{flex:none;border:1px solid var(--line);background:#fff;border-radius:14px;padding:6px 14px;font-size:14px;color:var(--ink)}.acat button.on{background:var(--accent,#c0553a);color:#fff;border-color:transparent}button.msec{display:flex;justify-content:space-between;width:100%;background:none;border:0;border-bottom:1px solid var(--line);padding:12px 2px;margin:6px 0 0;font-size:14px;font-weight:700;color:var(--ink);text-align:left}';
 document.head.appendChild(st);
}catch(e){}})();
/* ---- 更多頁：分組收合（常用展開、其餘點開） ---- */
function tqf(el){
 const q=el.value.trim();
 document.querySelectorAll('.tile').forEach(t=>{t.style.display=!q||t.textContent.indexOf(q)>=0?'':'none'});
 document.querySelectorAll('.grid[data-cl]').forEach(g=>{g.style.display=q?'':(g.dataset.cl==='1'?'none':'')});
}
const _mh59=moreHTML;
moreHTML=function(){
 let h=_mh59();view.mco=view.mco||{};let i=0;
 h=h.replace(/oninput="[^"]*"/,'oninput="tqf(this)"');
 return h.replace(/<div class="sec">([^<]*)<\/div><div class="grid">((?:(?!<\/div>)[\s\S])*)<\/div>/g,(m,n,body)=>{
  const k=i++,n2=(body.match(/class="tile"/g)||[]).length;
  const open=n==='常用'||view.mco[k];
  return `<button class="msec" data-a="mc:${k}"><span>${n}（${n2}）</span><span>${open?'收合':'展開'}</span></button><div class="grid" data-cl="${open?0:1}" style="${open?'':'display:none'}">${body}</div>`;
 });
};
