/* ===== p14：身心健康、社會政策、目標成就結局、存檔與家族樹、公司合夥與併購 ===== */
const MINWY={2016:20008,2017:21009,2018:22000,2019:23100,2020:23800,2021:24000,2022:25250,2023:26400,2024:27470,2025:28590,2026:29500};
const SSMY={TW:2019,US:2015,CA:2005,AU:2017,GB:2014,DE:2017};   // 同性婚姻合法化年份（公開紀錄；日本、南韓、新加坡尚未合法）
const GOALS=[{id:'wealth',n:'💰 財富自由',d:'淨資產達 NT$3,000 萬'},{id:'family',n:'👨‍👩‍👧 幸福家庭',d:'結婚、2 個以上子女、感情穩定'},{id:'career',n:'🏆 事業巔峰',d:'職位升到高階或公司上市櫃'},{id:'scholar',n:'🎓 學術成就',d:'取得博士學位'},{id:'calm',n:'🍃 平靜知足',d:'50 歲後壓力低、心情好'},{id:'kind',n:'🤝 善良的人',d:'善行（karma）達 75 以上'}];
function goalOK(){
 const g=S.goal;if(!g)return false;
 if(g==='wealth')return netWorth()>=3e7;
 if(g==='family')return !!(S.partner&&S.partner.married&&S.kids.length>=2&&S.partner.rel>=60);
 if(g==='career')return !!((S.job&&S.job.lv>=3)||(S.co&&S.co.stage>=2));
 if(g==='scholar')return S.edu>=6;
 if(g==='calm')return S.age>=50&&S.stress<35&&S.happy>=75;
 if(g==='kind')return S.karma>=75;
 return false;
}
const ACH=[
 ['firstjob','💼 第一份工作',()=>!!S.job],['tenmil','💰 千萬資產',()=>netWorth()>=1e7],['hundredmil','🏦 億萬富翁',()=>netWorth()>=1e8],
 ['founder','🚀 創業家',()=>!!S.co],['ipo','📈 站上資本市場',()=>!!(S.co&&S.co.stage>=2)],['phd','🎓 博士',()=>S.edu>=6],
 ['cent','🎂 人瑞（100 歲）',()=>S.age>=100],['bigfam','👨‍👩‍👧‍👦 子孫滿堂（3 位以上子女）',()=>S.kids.length>=3],['gen3','🌳 三代傳承',()=>(S.gen||1)>=3],
 ['lovelong','💞 白頭偕老（結婚且 65 歲以上）',()=>!!(S.partner&&S.partner.married&&S.age>=65)],['samesex','🏳️‍🌈 與同性伴侶結婚',()=>!!(S.partner&&S.partner.married&&S.partner.sx===S.sx)],
 ['abroad','🌏 移居海外',()=>S.cn&&S.cn!=='TW'],['networker','🕸️ 人脈王（人脈 70）',()=>S.net>=70],['zen','🧘 身心平衡',()=>S.age>=40&&S.stress<=25&&S.happy>=70],
 ['sober','🚭 戒癮成功',()=>!!S.flags.sober],['clean','⚖️ 奉公守法（60 歲無前科）',()=>S.age>=60&&!S.record],['adopter','🍼 領養家庭',()=>S.kids.some(k=>k.adopt)],
 ['comeout','🌈 勇敢做自己',()=>!!S.flags.out],['otome','💘 攻略達人（交往 3 位對象）',()=>(S.flags.lovers||0)>=3],['covid','😷 度過疫情',()=>calYear()>=2022&&S.byear!=null&&S.byear<=2020&&S.age>=2],
 ['goal','🎯 人生目標達成',()=>!!S.flags.goalDone]];
const ACHK='lifesim_tw_ach_v1',ENDK='lifesim_tw_end_v1';
const lsGet=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
const lsSet=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
function achYear(){
 const got=lsGet(ACHK,{});let ch=false;
 for(const [id,n,f] of ACH){if(!got[id]){let ok=false;try{ok=!!f()}catch(e){}if(ok){got[id]=S.age;ch=true;log(`🏆 成就解鎖：${n}`,'good');toast('🏆 成就解鎖：'+n)}}}
 if(ch)lsSet(ACHK,got);
 if(S.goal&&!S.flags.goalDone&&S.age>=30&&goalOK()){S.flags.goalDone=1;chg('happy',10);log('🎯 你達成了人生目標！','good')}
}
function endTitle(){
 if(S.co&&netWorth()>=3e8)return '🏢 企業大亨';if(S.edu>=6&&S.smarts>=80)return '📚 學術殿堂';if((S.gen||1)>=3)return '🌳 家族傳承者';
 if(S.partner&&S.partner.married&&S.age>=70&&S.partner.rel>=70)return '💞 白頭偕老';
 if(!S.partner&&!S.kids.length&&S.net<25&&S.age>=60)return '🌙 孤獨終老';
 if(S.record>0&&S.karma>=60)return '🔄 浪子回頭';
 if(S.stress>=60&&S.happy<45)return '😮‍💨 勞碌一生';
 if(S.happy>=70)return '🌈 平凡而幸福';
 return '🚶 平凡人生';
}
function endInfo(){
 const t=endTitle(),g=S.goal?GOALS.find(x=>x.id===S.goal):null,ok=goalOK()||S.flags.goalDone;
 const got=lsGet(ACHK,{}),n=Object.keys(got).length,end=lsGet(ENDK,{});
 return `<p><b>人生結局：${t}</b>${g?`<br>人生目標：${g.n}（${ok?'✅ 達成':'❌ 未達成'}）`:''}<br>成就：${n}／${ACH.length}　已收集結局：${Object.keys(end).length} 種</p>`;
}
const _die=die;
die=function(c){try{achYear()}catch(e){}const e=lsGet(ENDK,{}),t=endTitle();e[t]=(e[t]||0)+1;lsSet(ENDK,e);_die(c)};

/* ---- 身心健康 ---- */
function mhYear(){
 if(S.dep==null)S.dep=0;
 S.dep=cl(S.dep+(S.stress>70?6:0)+(S.happy<30?5:0)+(S.net<18&&S.age>=18?3:0)-(S.happy>65?4:0)-(S.net>=55?3:0)-2);
 if(S.dep>=70){chg('happy',-3);chg('health',-1)}
 const a=S.addict;
 if(a){a.lv=Math.min(10,a.lv+1);S.stress=cl(S.stress+1);const sl=S.job&&!S.job.founder?S.job.sal:600000;
  if(a.k==='酒精'||a.k==='抽菸')chg('health',-R(1,2)-(a.lv>6?1:0));
  else if(a.k==='賭博'){const l=Math.round(Math.max(30000,sl*.05*a.lv));S.money-=l;log(`沉迷賭博，今年輸了 ${money(l)}。`,'bad')}
  else if(a.k==='手遊'){const l=Math.round(Math.max(10000,sl*.02*a.lv));S.money-=l;chg('happy',-1)}}
}
const MHK=['酒精','抽菸','手遊','賭博'];
function quitAdd(cost){
 const a=S.addict;if(!a)return B('你目前沒有成癮問題。');if(S.money<cost)return B('你的錢不夠。');S.money-=cost;
 if(chance(Math.max(.15,.6-a.lv*.04))){S.addict=null;S.flags.sober=1;chg('happy',6);S.stress=cl(S.stress-6);return G('你成功戒除了成癮，重新掌握生活。')}
 a.lv=Math.max(1,a.lv-1);return N('戒癮過程不順利，但你沒有放棄。')
}
E.push(
{id:'burnout',min:20,max:65,w:4,if:()=>S.stress>=75&&!S.jail,run:()=>({t:'長期壓力讓你身心俱疲，快要撐不住了。',c:[
  ch('請假好好休息',()=>{if(S.job&&!S.job.founder)S.job.perf=cl(S.job.perf-5);S.stress=cl(S.stress-30);chg('happy',4);return G('休息過後，你重新找回了節奏。')}),
  ch('就醫與心理諮商（NT$8,000）',()=>{if(S.money<8000)return B('你的錢不夠。');S.money-=8000;S.stress=cl(S.stress-25);S.dep=cl((S.dep||0)-10);return G('專業協助讓你好多了。')}),
  ch('硬撐下去',()=>{chg('health',-R(3,7));S.stress=cl(S.stress-5);S.dep=cl((S.dep||0)+8);return B('你的身體發出了警訊。')})]})},
{id:'depr',min:15,max:90,w:3,if:()=>(S.dep||0)>=50,run:()=>({t:'你已經好一陣子提不起勁，對什麼都沒興趣。',c:[
  ch('尋求專業協助（NT$12,000）',()=>{if(S.money<12000)return B('你的錢不夠。');S.money-=12000;S.dep=cl(S.dep-20);chg('happy',4);return G('持續治療讓你逐漸好轉。')}),
  ch('找朋友聊聊',()=>{const f=S.friends.filter(x=>x.rel>=50)[0];if(!f)return N('你想找人談談，卻不知道找誰。');f.rel=cl(f.rel+6);S.dep=cl(S.dep-10);return G(`${f.n}耐心聽你說完，你覺得輕鬆了些。`)}),
  ch('獨自承受',()=>{S.dep=cl(S.dep+8);chg('happy',-6);return B('情況沒有好轉。')})]})},
{id:'addst',min:16,max:70,w:2.5,if:()=>!S.addict&&(S.stress>=50||S.happy<40),run:()=>{const ks=samp(MHK,3);return {t:'壓力很大的時候，身邊有東西可以讓你暫時逃避一下。',c:ks.map(k=>ch('試試看：'+k,()=>{S.addict={k,lv:1};S.stress=cl(S.stress-8);return N(`你開始依賴「${k}」來紓壓。`)})).concat([ch('拒絕，找別的方式放鬆',()=>{S.stress=cl(S.stress-3);return N('你選擇健康的方式紓壓。')})])}}},
{id:'addhelp',min:18,max:80,w:2,if:()=>!!S.addict&&S.addict.lv>=3,run:()=>({t:`家人朋友發現你有「${S.addict.k}」的問題，勸你尋求協助。`,c:[
  ch('接受協助（NT$30,000）',()=>quitAdd(30000)),
  ch('再說吧',()=>{S.addict.lv=Math.min(10,S.addict.lv+1);return B('你還沒準備好面對。')})]})},
{id:'goal',min:16,max:22,w:6,if:()=>!S.goal,run:()=>({t:'你開始思考：這輩子最想完成什麼？',c:GOALS.map(g=>ch(g.n,()=>{S.goal=g.id;return N(`你立下人生目標：${g.n}（${g.d}）`)}))})}
);

/* ---- 社會與政策（臺灣，依曆年）---- */
const POLS=[
 {y:2009,n:'消費券',d:'每人發放 3,600 元消費券（金融海嘯後）',v:3600},
 {y:2020,n:'振興三倍券',d:'付 1,000 元可得 3,000 元，等於多 2,000 元可用',v:2000},
 {y:2021,n:'振興五倍券',d:'付 1,000 元可得 5,000 元，等於多 4,000 元可用',v:4000},
 {y:2023,n:'普發現金 6,000 元',d:'疫後復甦，首次直接發放現金',v:6000},
 {y:2025,n:'普發現金 10,000 元',d:'因應美國關稅衝擊，全民普發 1 萬元',v:10000}];
function polYear(){
 if((S.cn||'TW')!=='TW')return;const y=calYear();
 const mw=MINWY[y];
 if(mw&&S.job&&!S.job.founder&&S.job.sal<mw*12){S.job.sal=mw*12;log(`基本工資調整為每月 ${money(mw)}，你的薪資同步調整。`,'good')}
 if(S.age>=18)for(const p of POLS)if(p.y===y){S.money+=p.v;log(`政策：${p.n}（${p.d}），你多了 ${money(p.v)}。`,'good')}
 if(y===2021&&S.age>=3){chg('happy',-3);S.stress=cl(S.stress+6);log('2021 年 5 月起全國三級警戒近 3 個月，生活受到衝擊。','bad')}
}
function birthSubsidy(){if((S.cn||'TW')==='TW'&&calYear()>=2026){S.money+=100000;log('領到政府生育補助 NT$100,000（2026 年起每胎 10 萬）。','good')}}
const _int2=interact;
interact=function(k,kind){const n0=S.kids.length,r=_int2(k,kind);if(kind==='baby'&&S.kids.length>n0)birthSubsidy();return r};
const _relYear=relYear;
relYear=function(){_relYear();mhYear();polYear();achYear()};

/* ---- 公司：合夥人、人才與併購 ---- */
function coBonus(co){return (co.pt||[]).reduce((s,p)=>s+p.g,0)+(co.tl||[]).reduce((s,p)=>s+p.g,0)+(co.mag||0)}
const PROLE=[{k:'技術長',g:.012,d:'產品與研發能力'},{k:'業務長',g:.015,d:'開拓客戶與通路'},{k:'財務長',g:.008,d:'成本控制，降低合規風險'}];
const _coYear=coYear;
coYear=function(){const rec=_coYear();const co=S.co;if(!co)return rec;
 (co.tl||[]).forEach(t=>t.y--);co.tl=(co.tl||[]).filter(t=>t.y>0);co.mag=(co.mag||0)*.5;if(co.mag<.002)co.mag=0;
 if(co.ma&&co.ma.yr<co.yrs)co.ma=null;
 if(co.pt&&co.pt.length&&chance(.07)){const p=pick(co.pt);co.cflt=p.n}
 return rec};
function teamHTML(){
 const co=S.co,I=INDS[co.ind],L=co.L,back='<button class="btn" data-a="co:menu:main">← 公司主頁</button>';
 co.pt=co.pt||[];co.tl=co.tl||[];
 let h=`<h3>🤝 合夥人與併購</h3><div class="sub">目前額外成長加成：+${(coBonus(co)*100).toFixed(1)} 點／年</div><div class="sec">共同創辦人</div>`;
 h+=co.pt.length?co.pt.map((p,i)=>`<div class="item row"><div style="flex:1"><b>${esc(p.n)}</b>・${p.k}・持股 ${(p.pct*100).toFixed(1)}%・成長 +${(p.g*100).toFixed(1)} 點</div><button class="mini" data-a="co:tm:buy:${i}">買回</button></div>`).join(''):'<p class="sub">目前沒有共同創辦人。</p>';
 if(co.form!=='獨資'&&co.pt.length<3)h+=PROLE.filter(r=>!co.pt.some(p=>p.k===r.k)).map(r=>`<button class="btn" data-a="co:tm:add:${r.k}">邀請${r.k}加入<small>以約 8% 股權換取（${r.d}），稀釋你的持股</small></button>`).join('');
 else if(co.form==='獨資')h+='<p class="sub">獨資企業不能發行股份，需先改組為公司才能引進合夥人（遊戲簡化）。</p>';
 h+=`<div class="sec">核心人才</div><p class="sub">${co.tl.length?co.tl.map(t=>`明星人才（剩 ${t.y} 年，+${(t.g*100).toFixed(1)} 點）`).join('、'):'目前沒有招募明星人才。'}</p>`;
 h+=`<button class="btn" data-a="co:tm:talent" ${L.cash<1.6e6?'disabled':''}>🌟 招募明星人才<small>簽約金 NT$1,500,000（公司現金）→ 成長 +1.0 點 × 4 年，有被挖角風險</small></button>`;
 co.ma=co.ma||null;
 if(!co.ma||!co.ma.list){const rev=Math.max(5e6,co.prevRev||0);co.ma={yr:co.yrs,list:[0,1,2].map(()=>{const tr=Math.round(rev*(.1+Math.random()*.25)/1e5)*1e5;return {n:pick(['海岸','啟航','星河','晨光','新創','聚力','恆通','鼎立'])+pick(['科技','實業','行銷','國際','工坊','顧問']),rev:tr,px:Math.round(tr*(.5+Math.random()*.6)/1e5)*1e5}})}}
 h+=`<div class="sec">併購（遊戲估算：以 0.5～1.1 倍營收收購）</div>`+co.ma.list.map((t,i)=>`<button class="btn" data-a="co:tm:ma:${i}" ${L.cash<t.px*1.05?'disabled':''}>併購「${esc(t.n)}」<small>營收約 ${money(t.rev)}・收購價 ${money(t.px)}（公司現金）・整合風險 25%</small></button>`).join('');
 return h+`<p class="sub">併購成功：營收併入、產能增加；整合失敗：商譽減損、當年成長受損。每年名單更新。</p>`+back;
}
function teamHandle(y,z,u){
 const co=S.co,L=co.L;view.csub='co:team';co.pt=co.pt||[];co.tl=co.tl||[];
 if(y==='add'){const r=PROLE.find(q=>q.k===z);if(!r||co.pt.length>=3||co.form==='獨資')return B('目前無法邀請。');
  const pct=.08,ns=co.shares*pct/(1-pct);co.shares+=ns;co.pt.push({n:fullName(pick(['男','女'])),k:r.k,pct,g:r.g,ns});const m=`${co.pt[co.pt.length-1].n}以${r.k}身分加入，取得 ${(pct*100).toFixed(0)}% 股權。`;log(m,'good');return G(m)}
 if(y==='buy'){const p=co.pt[+z];if(!p)return null;const price=Math.round(coValue(co)*(p.ns/co.shares)*1.1);if(L.cash<price)return B('公司現金不足（需 '+money(price)+'）。');
  J(L,['re',price],['cash',-price]);co.shares-=p.ns;co.pt.splice(+z,1);return G(`公司買回了${p.n}的股份，花費 ${money(price)}。`)}
 if(y==='talent'){if(L.cash<1.6e6)return B('公司現金不足。');J(L,['re',1.5e6],['cash',-1.5e6]);co.tl.push({y:4,g:.01});return G('你重金延攬到一位明星人才。')}
 if(y==='ma'){const t=co.ma&&co.ma.list[+z];if(!t)return null;if(L.cash<t.px*1.05)return B('公司現金不足。');
  buyFA(co,t.px);co.ma.list.splice(+z,1);
  if(chance(.75)){co.prevRev=(co.prevRev||0)+t.rev*.85;co.mag=(co.mag||0)+.012;const m=`併購「${t.n}」成功，營收併入並產生綜效。`;log(m,'good');return G(m)}
  const w=Math.round(t.px*.4);J(L,['re',w],['fa',-w]);co.mag=(co.mag||0)-.02;const m=`併購「${t.n}」後整合失敗，認列減損 ${money(w)}。`;log(m,'bad');return B(m)}
 return null
}
E.push({id:'copart',min:20,max:80,w:5,if:()=>!!(S.co&&S.co.cflt),run:()=>{const co=S.co,p=(co.pt||[]).find(x=>x.n===co.cflt);co.cflt=null;if(!p)return null;
 return {t:`共同創辦人${p.n}（${p.k}）與你在經營方向上嚴重分歧，想要離開。`,c:[
  ch('挽留並讓出決策權',()=>{p.g=Math.max(.004,p.g*.7);return N('對方留下了，但積極度不如以往。')}),
  ch('買回股份，好聚好散',()=>{const price=Math.round(coValue(co)*(p.ns/co.shares)*1.1);if(co.L.cash<price){co.pt=co.pt.filter(x=>x!==p);co.shares-=p.ns;return B('公司現金不足，對方折價賣回股份離開。')}J(co.L,['re',price],['cash',-price]);co.shares-=p.ns;co.pt=co.pt.filter(x=>x!==p);return N(`你買回股份（${money(price)}），對方離開。`)}),
  ch('撕破臉',()=>{co.pt=co.pt.filter(x=>x!==p);co.mag=(co.mag||0)-.015;co.sent=Math.max(.5,(co.sent||1)-.1);return B('對方帶走了部分客戶，公司元氣大傷。')})]}}});
const _coHTML=coHTML;
coHTML=function(sub){if(sub==='co:team')return teamHTML();let h=_coHTML(sub);if(!sub||sub==='co:main')h=h.replace('<button class="btn" data-a="co:menu:capex">','<button class="btn" data-a="co:menu:team">🤝 合夥人與併購</button><button class="btn" data-a="co:menu:capex">');return h};
const _coHandle=coHandle;
coHandle=function(x,y,z){if(x==='tm'){return teamHandle(y,z)}return _coHandle(x,y,z)};

/* ---- 存檔三格與開始畫面 ---- */
let CURSLOT=0;try{CURSLOT=+(localStorage.getItem('lifesim_slot')||0)||0}catch(e){}
const slotKey=i=>i?SAVEKEY+'_s'+i:SAVEKEY;
function slotLoad(i){try{const t=localStorage.getItem(slotKey(i));if(!t)return null;const o=JSON.parse(t);return o&&o.age!=null&&!o.dead?o:null}catch(e){return null}}
save=function(){try{localStorage.setItem(slotKey(CURSLOT),JSON.stringify(S))}catch(e){}};
loadSave=function(){return slotLoad(CURSLOT)};
showStart=function(){
 const sv=[0,1,2].map(slotLoad);let sx='男',ori='異性戀',diff=1,tgt=sv.findIndex(x=>!x);if(tgt<0)tgt=CURSLOT;
 const B_=$('startBody');
 const draw=()=>{
  B_.innerHTML=`<h3>🎲 人生模擬器</h3><p>從出生到死亡，每一個選擇都會影響你的一生。</p>
  <div class="sec">存檔（共三格）</div>`+[0,1,2].map(i=>{const s=sv[i];return `<div class="item row" style="${i===tgt?'border-color:var(--acc)':''}"><div style="flex:1"><b>存檔 ${i+1}</b>${s?`・${esc(s.name)}・${s.age} 歲・第${s.gen||1}代<br><span class="sub">現金 ${money(s.money)}</span>`:'・空'}</div>${s?`<button class="mini" data-c="${i}">繼續</button>`:''}<button class="mini" data-n="${i}">${i===tgt?'✔ 新局':'選為新局'}</button></div>`}).join('')
  +`<div class="sec">新的人生${sv[tgt]?`<span class="sub">（將覆蓋存檔 ${tgt+1}）</span>`:''}</div>
  <input type="text" id="nm" placeholder="姓名（留空則隨機）" maxlength="6" value="${esc(B_.dataset.nm||'')}">
  <div class="seg"><button class="${sx==='男'?'on':''}" data-s="男">男</button><button class="${sx==='女'?'on':''}" data-s="女">女</button></div>
  <div class="sub" style="margin-top:10px">戀愛傾向</div><div class="seg">`+['異性戀','同性戀','雙性戀','隨機'].map(o=>`<button class="${ori===o?'on':''}" data-o="${o}">${o}</button>`).join('')+`</div>
  <div class="sub" style="margin-top:10px">難度</div><div class="seg">`+['休閒','寫實','地獄'].map((o,i)=>`<button class="${diff===i?'on':''}" data-d="${i}">${o}</button>`).join('')+`</div>
  <button class="btn p" id="go" style="margin-top:12px">出生！</button>`;
  $('start').classList.add('on');
  B_.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{B_.dataset.nm=$('nm').value;sx=b.dataset.s;draw()});
  B_.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{B_.dataset.nm=$('nm').value;ori=b.dataset.o;draw()});
  B_.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{B_.dataset.nm=$('nm').value;diff=+b.dataset.d;draw()});
  B_.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{B_.dataset.nm=$('nm').value;tgt=+b.dataset.n;draw()});
  B_.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{CURSLOT=+b.dataset.c;try{localStorage.setItem('lifesim_slot',CURSLOT)}catch(e){}S=sv[CURSLOT];busy=false;queue=[];$('start').classList.remove('on');render()});
  $('go').onclick=()=>{CURSLOT=tgt;try{localStorage.setItem('lifesim_slot',CURSLOT)}catch(e){}newGame($('nm').value.trim(),sx);S.ori=oriPick(ori);S.diff=diff;B_.dataset.nm='';$('start').classList.remove('on');render();save();if(!lsGet('lifesim_tw_tut',0))tutorial()};
 };
 draw();
};

/* ---- 「人生」分頁：身心、成就、家族史、政策 ---- */
function lifeHTML(){
 const s=view.lsub;mFix();
 if(s==='mind')return mindHTML();if(s==='ach')return achHTML();if(s==='tree')return treeHTML();if(s==='pol')return polHTML();
 return '';
}
function mindHTML(){
 const a=S.addict,b=(k,t,sm,dis)=>`<button class="btn" data-a="lf:mind:${k}" ${dis||S.acts['m'+k]?'disabled':''}>${t}${sm?`<small>${sm}${S.acts['m'+k]?'（今年已做）':''}</small>`:''}</button>`;
 let h=`<h3>🧠 身心健康</h3><div class="item"><b>壓力 ${S.stress}</b>${pbar(S.stress)}<b>憂鬱傾向 ${S.dep||0}</b>${pbar(S.dep||0)}<div class="sub">${a?`成癮：${a.k}（程度 ${a.lv}／10）`:'沒有成癮問題'}${S.stress>=75?'<br>⚠️ 壓力過高，可能過勞':''}</div></div>`;
 h+=b('med','🧘 冥想放鬆','免費・壓力 −6')+b('couns','🗣️ 心理諮商','自費約 NT$2,500／次；15～45 歲每年前 3 次免費（遊戲簡化）・壓力 −15、憂鬱 −10')+b('trip','🏖️ 放長假','NT$60,000・壓力 −25、心情 +5');
 if(a)h+=b('rehab','💊 戒癮門診','NT$30,000・成功率依成癮程度');
 h+='<p class="sub">費用與成效為遊戲估算，並非醫療建議。若現實中感到困擾，請尋求專業協助。</p>';
 return h+`<button class="btn" data-a="back">← 返回</button>`;
}
function lfHandle(x,y,z){
 mFix();
 if(x==='mind'&&y){const key='m'+y;if(S.acts[key])return B('今年已經做過了。');
  if(y==='med'){S.acts[key]=1;S.stress=cl(S.stress-6);return G('你靜下心來，感覺好多了。')}
  if(y==='couns'){const free=S.age>=15&&S.age<=45&&(S.flags.cn3||0)<3;if(!free&&S.money<2500)return B('你的錢不夠。');S.acts[key]=1;if(free)S.flags.cn3=(S.flags.cn3||0)+1;else S.money-=2500;S.stress=cl(S.stress-15);S.dep=cl((S.dep||0)-10);return G('談一談之後，你覺得輕鬆許多。')}
  if(y==='trip'){if(S.money<60000)return B('你的錢不夠。');S.acts[key]=1;S.money-=60000;S.stress=cl(S.stress-25);chg('happy',5);return G('你放了一個長假，整個人煥然一新。')}
  if(y==='rehab'){S.acts[key]=1;return quitAdd(30000)}}
 return null
}
function achHTML(){
 const got=lsGet(ACHK,{}),end=lsGet(ENDK,{});
 let h=`<h3>🏆 成就與結局</h3><div class="sub">已解鎖 ${Object.keys(got).length}／${ACH.length}（跨人生累積）</div>`;
 const g=S.goal?GOALS.find(x=>x.id===S.goal):null;
 h+=`<div class="item"><b>🎯 人生目標</b><div class="sub">${g?`${g.n}：${g.d}　${S.flags.goalDone?'✅ 已達成':goalOK()?'即將達成':'進行中'}`:'16～22 歲時會立下人生目標'}</div></div>`;
 h+=ACH.map(([id,n])=>`<div class="item">${got[id]!=null?'✅':'🔒'} ${n}${got[id]!=null?`<span class="sub">　（${got[id]} 歲）</span>`:''}</div>`).join('');
 h+=`<div class="sec">已收集的結局</div>`+(Object.keys(end).length?Object.keys(end).map(k=>`<div class="item">${k}　×${end[k]}</div>`).join(''):'<p class="sub">還沒有結局紀錄。</p>');
 return h+`<button class="btn" data-a="back">← 返回</button>`;
}
function treeHTML(){
 const hist=S.hist||[];let h='<h3>🌳 家族史</h3>';
 hist.forEach((x,i)=>{h+=`<div class="item" style="margin-left:${Math.min(i,5)*10}px"><b>第 ${x.gen} 代　${esc(x.name)}</b><div class="sub">享年 ${x.age} 歲・${esc(x.cause||'')}${x.job?'・'+esc(x.job):''}${x.spn?'<br>配偶：'+esc(x.spn):''}${x.kids!=null?'・子女 '+x.kids+' 人':''}<br>遺產 ${money(x.net)}・遺產稅 ${money(x.tax)}</div></div>`});
 h+=`<div class="item" style="margin-left:${Math.min(hist.length,5)*10}px;border-color:var(--acc)"><b>第 ${S.gen||1} 代　${esc(S.name)}（目前）</b><div class="sub">${S.age} 歲・${S.sx}・${S.job?esc(S.job.t):'無職'}${S.partner?'<br>配偶／伴侶：'+esc(S.partner.n):''}・性向 ${S.ori||'—'}<br>家世：${S.fam}${S.goal?'・目標：'+GOALS.find(x=>x.id===S.goal).n:''}</div></div>`;
 if(S.kids.length)h+=`<div class="sec">下一代</div>`+S.kids.map(k=>`<div class="item" style="margin-left:${Math.min(hist.length+1,5)*10}px">${esc(k.n)}・${k.age} 歲・${k.tal}${k.adopt?'・領養':''}${k.occ?'・'+esc(k.occ):''}</div>`).join('');
 const sibs=S.friends.filter(f=>f.sib);if(sibs.length)h+=`<div class="sec">手足</div>`+sibs.map(f=>`<div class="item">${esc(f.n)}</div>`).join('');
 return h+`<button class="btn" data-a="back">← 返回</button>`;
}
function polHTML(){
 const y=calYear(),cn=S.cn||'TW',mw=MINWY[y]||(y>2026?MINW:null);
 let h=`<h3>📰 社會與政策</h3><div class="sub">${y} 年・${CNS[cn].n}</div>`;
 if(cn==='TW'){
  h+=`<div class="item"><b>基本工資</b><div class="sub">${mw?`每月 ${money(mw)}（${MINWY[y]?'當年實施值':'沿用 2026 年水準'}）`:'2016 年以前不在遊戲內建資料中'}</div></div>`;
  h+=`<div class="item"><b>生育補助</b><div class="sub">${y>=2026?'每胎 NT$100,000（2026/1/1 起）':'2026 年起每胎 10 萬元'}</div></div>`;
 }
 const sy=SSMY[cn];h+=`<div class="item"><b>同性婚姻</b><div class="sub">${sy?(y>=sy?`已於 ${sy} 年合法`:`${sy} 年才合法（目前尚未）`):'目前不承認'}</div></div>`;
 h+='<div class="sec">臺灣歷年現金／振興措施</div>'+POLS.map(p=>`<div class="item">${p.y>y?'⏳':S.byear!=null&&p.y<S.byear+18?'—':'✅'} ${p.y} ${p.n}<div class="sub">${p.d}</div></div>`).join('');
 h+='<p class="sub">資料：勞動部歷年基本工資、行政院生育補助方案（2025/9）、經濟日報與財政部歷次振興措施紀錄、Pew／Our World in Data 同婚資料。成人才會領到現金；其餘政策影響為遊戲簡化。</p>';
 return h+`<button class="btn" data-a="back">← 返回</button>`;
}
