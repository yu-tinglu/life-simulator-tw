/* ---- 勞基法假別、親子與人際互動（金額與機率為遊戲簡化） ---- */
/* ===== 勞基法：特休／病假／事假與法定假 ===== */
function leaveEnt(y){return y<1?3:y<2?7:y<3?10:y<5?14:y<10?15:Math.min(30,15+(y-9))}
function emp(){return S.job&&!S.job.founder&&!S.army&&!S.jail}
function lvInit(){if(!S.lv)S.lv={tu:0,sk:0,pe:0,snap:null};if(!S.lv.snap)S.lv.snap=lvSnap()}
function lvSnap(){return {m:S.partner&&S.partner.married?1:0,k:S.kids.length,ma:S.mom&&S.mom.alive?1:0,da:S.dad&&S.dad.alive?1:0}}
function dayWage(){return S.job?Math.round(S.job.sal/360):0}
function lvBlock(){
 if(!emp())return '';lvInit();const e=leaveEnt(S.job.years),L=S.lv,left=e-L.tu,sk=30-L.sk,pe=14-L.pe;
 const b=(a,t,s,dis)=>`<button class="btn" data-a="lv:${a}" ${dis?'disabled':''}>${t}${s?`<small>${s}</small>`:''}</button>`;
 return `<div class="sec">請假（依勞基法）</div>
 <div class="item"><b>特別休假：剩 ${left}／${e} 天</b><div class="sub">年資 ${S.job.years} 年：${S.job.years<1?'滿 6 個月 3 天':S.job.years<2?'滿 1 年 7 天':S.job.years<3?'滿 2 年 10 天':S.job.years<5?'滿 3 年 14 天':S.job.years<10?'滿 5 年 15 天':'滿 10 年起每年加 1 天，最多 30 天'}。年底沒休完，公司要折發工資。</div></div>`
 +b('ta:3','休 3 天特休，小旅行','壓力 −、心情 +',left<3)+b('ta:7','休 7 天特休，長假','壓力大幅下降',left<7)+b('ta:7:trip','休 7 天特休，出國旅行','NT$60,000',left<7||S.money<60000)
 +`<div class="item"><b>病假：已休 ${L.sk}／30 天</b><div class="sub">一年內未住院累計 30 天內，工資折半發給。</div></div>`+b('sk:3','請病假 3 天，好好休養','健康 +，工資折半',sk<3)
 +`<div class="item"><b>事假：已休 ${L.pe}／14 天</b><div class="sub">一年內 14 天內，不給工資。</div></div>`+b('pe:2','請事假 2 天處理私事','不給薪',pe<2)
 +`<details class="adv"><summary>其他法定假別（遇到時自動請）</summary><div class="sub" style="line-height:1.7">婚假 8 天（工資照給）<br>喪假：父母、配偶 8 天（工資照給）<br>產假 8 週（工資照給，年資滿 6 個月）；陪產檢及陪產假 7 天（工資照給）<br>育嬰留職停薪：子女滿 3 歲前，最長 2 年<br>生理假、家庭照顧假（併入病假、事假計算）</div></details>`;
}
function lvHandle(x,y,z){
 if(!emp())return B('你目前沒有受僱的工作。');lvInit();const L=S.lv,w=dayWage(),e=leaveEnt(S.job.years);
 if(x==='ta'){const d=+y;if(e-L.tu<d)return B('特休天數不夠。');L.tu+=d;
  if(z==='trip'){if(S.money<60000)return B('錢不夠。');S.money-=60000;S.stress=cl(S.stress-18);chg('happy',R(10,16));return G('你請了 7 天特休出國，放鬆又開心。')}
  S.stress=cl(S.stress-(d>=7?16:8));chg('happy',d>=7?R(6,10):R(3,6));S.job.perf=cl(S.job.perf-0);return G(`你休了 ${d} 天特休，整個人煥然一新。`)}
 if(x==='sk'){const d=+y;if(30-L.sk<d)return B('病假天數用完了。');L.sk+=d;S.money-=Math.round(w*d/2);chg('health',R(3,8));S.stress=cl(S.stress-5);return N(`你請了 ${d} 天病假，工資折半，扣掉約 ${money(Math.round(w*d/2))}。`)}
 if(x==='pe'){const d=+y;if(14-L.pe<d)return B('事假天數用完了。');L.pe+=d;S.money-=w*d;S.stress=cl(S.stress-4);return N(`你請了 ${d} 天事假，沒有薪水，少領 ${money(w*d)}。`)}
 return null;
}
const _job24=jobHTML;
jobHTML=function(){const h=_job24();if(view.fsub||S.co)return h;return h.replace(/(<button class="btn" data-a="quit">辭職<\/button>)/,'$1'+lvBlock())};
const _yearly24=yearly;
yearly=function(){
 lvInit();const had=emp(),e0=had?leaveEnt(S.job.years):0,L=S.lv,job0=S.job;
 _yearly24();
 if(had&&S.job&&S.job===job0&&emp()){const un=Math.max(0,e0-L.tu);if(un>0){const p=un*dayWage();S.money+=p;log(`特休沒休完的 ${un} 天，公司折發工資 ${money(p)}。`,'good')}}
 L.tu=0;L.sk=0;L.pe=0;
 /* 法定假別（婚假、產假、喪假）自動使用 */
 const s=L.snap,n=lvSnap();
 if(emp()){
  if(n.m>s.m)log('你結婚了，依勞基法請了婚假 8 天，工資照給。','good');
  if(n.k>s.k){if(S.sx==='女')log('依勞基法，你請了 8 週產假，工資照給（年資滿 6 個月）；之後也可申請育嬰留職停薪。','good');else log('依勞基法，你請了 7 天陪產檢及陪產假，工資照給。','good')}
  if(n.ma<s.ma||n.da<s.da){log('依勞基法，你請了 8 天喪假，工資照給。')}
 }
 L.snap=n;
 /* 孝親費 */
 const f=S.flags.filial;if(f){const al=(S.mom&&S.mom.alive?1:0)+(S.dad&&S.dad.alive?1:0);if(al&&S.age>=22){S.money-=f*al/2;[S.mom,S.dad].forEach(p=>{if(p&&p.alive)p.rel=cl(p.rel+2)})}}
};
/* ===== 親子互動 ===== */
const KITEMS=[ // [名稱, 費用, 最小年齡, 最大年齡, 類型]
 ['新玩具',1500,3,9,'toy'],['整套繪本',1200,3,9,'edu'],['腳踏車',6000,5,12,'sport'],['樂高積木',3000,5,13,'toy'],
 ['遊戲主機',12000,9,17,'game'],['智慧型手機',15000,10,16,'phone'],['新球鞋',4500,8,18,'shoes'],['補習班學費',60000,9,18,'edu'],
 ['筆記型電腦',35000,12,22,'pc'],['演唱會門票',6000,13,22,'fun'],['機車',60000,16,22,'moto'],['新手機',25000,15,22,'phone']
];
function parentOK(cost,type){
 const f=S.fam,b=S.bg||{sty:'開明'};let p={清寒:.3,小康:.6,富裕:.85}[f]||.5;
 p-=cost>40000?.3:cost>15000?.15:cost>5000?.05:0;
 p+={溺愛:.25,放任:.1,嚴格:-.15,虎媽:type==='edu'||type==='pc'?.3:-.2,開明:0}[b.sty]||0;
 const r=((S.mom&&S.mom.alive?S.mom.rel:50)+(S.dad&&S.dad.alive?S.dad.rel:50))/200;p+=(r-.5)*.3;p-=(S.flags.spoil||0)*.03;
 return Math.max(.05,Math.min(.95,p));
}
function itemEff(it,own){
 const t=it[4];
 if(t==='toy'||t==='fun')chg('happy',R(4,8));else if(t==='game'){chg('happy',R(6,10));chg('smarts',-1)}
 else if(t==='phone'){chg('happy',R(4,8));S.net=cl((S.net||0)+3)}else if(t==='pc'){chg('smarts',R(2,5));chg('happy',3)}
 else if(t==='edu'){if(S.school)S.grade=cl(S.grade+R(3,7));chg('smarts',R(1,3));S.stress=cl(S.stress+3)}
 else if(t==='shoes'){chg('looks',R(0,2));chg('happy',3)}else if(t==='sport'){chg('health',R(2,5));chg('happy',4)}
 else if(t==='moto'){chg('happy',8);S.net=cl((S.net||0)+2)}
}
function parentAsk(it,how){
 if(!(S.mom&&S.mom.alive)&&!(S.dad&&S.dad.alive))return B('你沒有可以開口的家人了。');
 let p=parentOK(it[1],it[4]);
 if(how==='cute')p+=S.age<11?.12:-.05;if(how==='promise')p+=.15;
 if(chance(p)){itemEff(it);S.flags.spoil=(S.flags.spoil||0)+1;[S.mom,S.dad].forEach(q=>{if(q&&q.alive)q.rel=cl(q.rel+(how==='cute'&&S.age>=11?-1:2))});
  if(how==='promise'){S.stress=cl(S.stress+4);S.flags.promise=S.age}
  return G(`爸媽答應買「${it[0]}」（約 ${money(it[1])}）給你。${how==='promise'?'但你保證要考好一點。':''}`)}
 chg('happy',-3);[S.mom,S.dad].forEach(q=>{if(q&&q.alive)q.rel=cl(q.rel-(how==='cute'&&S.age>=11?3:1))});
 return B(`爸媽說「${pick(['先別買','太貴了','考好再說','你已經有了'])}」，沒有答應買「${it[0]}」。`);
}
function kidAge(a){return KITEMS.filter(i=>a>=i[2]&&a<=i[3])}
function kids22(){return S.kids.filter(k=>{kidFix(k);return k.age>=3&&k.age<22})}
if(typeof E!=='undefined')E.push(
/* 玩家是孩子：向爸媽要東西 */
{id:'creq',min:3,max:22,w:3,if:()=>(S.mom&&S.mom.alive||S.dad&&S.dad.alive)&&(!S.job||S.age<18),run:()=>{
 const it=pick(kidAge(S.age));if(!it)return null;
 return {t:`你很想要「${it[0]}」（約 ${money(it[1])}），要怎麼跟爸媽開口？`,c:[
  ch('好好拜託',()=>parentAsk(it,'ask')),ch('撒嬌耍賴',()=>parentAsk(it,'cute')),
  ch('保證成績進步',()=>parentAsk(it,'promise')),
  ch(S.money>=it[1]?`用自己的錢買（${money(it[1])}）`:'自己存錢再買（錢不夠）',()=>{if(S.money<it[1]){chg('happy',-1);return N('你的零用錢還不夠，決定再存一陣子。')}S.money-=it[1];itemEff(it);return G(`你用自己的錢買了「${it[0]}」。`)}),
  ch('算了',()=>N('你把這個念頭放下了。'))]}}},
{id:'cmoney',min:6,max:22,w:2,if:()=>(S.mom&&S.mom.alive||S.dad&&S.dad.alive)&&!S.job,run:()=>({t:'你的零用錢花光了，想跟爸媽多要一點。',c:[
 ch('開口要零用錢',()=>{const g={清寒:R(500,1500),小康:R(2000,6000),富裕:R(5000,20000)}[S.fam]*(S.age>=15?2:1);if(chance(parentOK(g,'x')+.1)){S.money+=g;return G(`爸媽給了你 ${money(g)}。`)}return B('爸媽說「自己要學會規劃」，沒有給。')}),
 ch('找機會打工賺',()=>{if(S.age<15)return N('你還太小，沒有人要請你。');const g=R(8000,30000);S.money+=g;chg('happy',-1);return N(`你假日打工賺了 ${money(g)}。`)}),ch('省著用',()=>{chg('happy',-1);return N('你決定忍一忍。')})]})},
{id:'cvac',min:6,max:22,w:3,if:()=>!!S.school,run:()=>{
 const rich=S.fam==='富裕',a=S.age;
 const l=[ch('去補習班衝刺',()=>{S.grade=cl(S.grade+R(3,8));chg('smarts',R(1,3));S.stress=cl(S.stress+6);chg('happy',-3);return N('整個假期都在補習，成績進步了，也很累。')}),
  ch('參加營隊',()=>{chg('happy',R(5,9));S.net=cl((S.net||0)+R(1,3));return G('你在營隊認識了不少新朋友。')}),
  ch('在家耍廢',()=>{chg('happy',R(5,9));chg('health',-1);S.grade=cl(S.grade-R(0,3));return N('你睡到中午、打電動、看漫畫，爽翻了。')})];
 if(a>=15)l.push(ch('找打工',()=>{const g=R(30000,80000);S.money+=g;S.stress=cl(S.stress+3);return N(`你打工賺了 ${money(g)}，也學到不少社會經驗。`)}));
 if(rich&&a>=12)l.push(ch('出國遊學',()=>{chg('smarts',R(2,5));chg('happy',R(6,10));return G('你去國外遊學一個月，眼界大開。')}));
 return {t:`寒暑假到了，你想怎麼過？`,c:l}}},
{id:'chw',min:6,max:18,w:3,if:()=>!!S.school&&(S.mom&&S.mom.alive||S.dad&&S.dad.alive),run:()=>{
 const L=[['老師要求準備美勞材料',300,6,12],['老師要求自備平板電腦上課',15000,9,18],['校外教學費用',1500,6,18],['畢業旅行費用',12000,12,18],['班服與運動服',2000,6,18],['才藝表演服裝',1500,6,15],['科展實驗材料',2500,11,18],['老師要求加買參考書與測驗卷',1800,9,18]].filter(x=>S.age>=x[2]&&S.age<=x[3]);
 const it=pick(L);if(!it)return null;
 return {t:`${it[0]}，大約要 ${money(it[1])}，你要怎麼辦？`,c:[
  ch('跟爸媽拿錢',()=>{if(chance(Math.min(.95,parentOK(it[1],'edu')+.25))){return G(`爸媽拿錢給你，順利準備好了。`)}chg('happy',-3);S.grade=cl(S.grade-2);return B('爸媽嫌太貴，你只好硬著頭皮跟老師說。')}),
  ch(S.money>=it[1]?`用自己的零用錢（${money(it[1])}）`:'用自己的零用錢（不夠）',()=>{if(S.money<it[1]){chg('happy',-2);return B('你的錢不夠。')}S.money-=it[1];return N('你自己出錢準備好了。')}),
  ch('找同學一起分擔／借用',()=>{S.net=cl((S.net||0)+1);return N('同學願意借你，你很感謝。')}),
  ch('不準備，被老師唸',()=>{S.grade=cl(S.grade-3);chg('happy',-3);return B('老師當著大家的面唸了你一頓。')})]}}},
/* 玩家是家長：孩子向你要 */
{id:'kreq',min:20,max:70,w:4,if:()=>kids22().length>0,run:()=>{
 const k=pick(kids22()),it=pick(kidAge(k.age));if(!it)return null;const c=Math.round(it[1]);
 return {t:`${k.n}（${k.age} 歲）吵著想要「${it[0]}」（約 ${money(c)}）。`,c:[
  ch(`買給他（${money(c)}）`,()=>{if(S.money<c)return B('你手頭不夠，只好跟他說明。');S.money-=c;k.rel=cl(k.rel+R(4,9));S.flags.spoilK=(S.flags.spoilK||0)+1;return G(`${k.n}高興極了。`)}),
  ch('開出條件：考好才買',()=>{k.rel=cl(k.rel+R(0,3));k.grd=cl((k.grd||60)+R(2,6));return N(`${k.n}答應努力，之後成績有起色。`)}),
  ch('解釋為什麼不買',()=>{k.rel=cl(k.rel-R(0,5));return N(`${k.n}悶悶不樂，但聽進了你的話。`)}),
  ch('讓他自己存錢買',()=>{k.rel=cl(k.rel+R(0,2));k.sm=cl(k.sm+1);return G(`${k.n}開始存零用錢，學會了理財。`)})]}}},
{id:'kvac',min:22,max:62,w:4,if:()=>kids22().some(k=>k.age>=6&&k.age<=17),run:()=>{
 const k=pick(kids22().filter(k=>k.age>=6&&k.age<=17));
 return {t:`寒暑假到了，${k.n}（${k.age} 歲）要怎麼過？`,c:[
  ch('報名補習班（約 NT$60,000）',()=>{S.money-=60000;k.grd=cl((k.grd||60)+R(4,9));k.sm=cl(k.sm+2);k.rel=cl(k.rel-R(0,4));return N(`${k.n}成績進步，但抱怨沒有玩到。`)}),
  ch('送去營隊（約 NT$25,000）',()=>{S.money-=25000;k.rel=cl(k.rel+R(2,5));k.sm=cl(k.sm+1);return G(`${k.n}在營隊玩得很開心。`)}),
  ch('全家出遊（約 NT$80,000）',()=>{S.money-=80000;k.rel=cl(k.rel+R(5,10));chg('happy',R(5,9));S.stress=cl(S.stress-8);return G('全家一起出去玩，留下美好回憶。')}),
  ch('出國遊學（約 NT$200,000）',()=>{S.money-=200000;k.sm=cl(k.sm+R(3,6));k.rel=cl(k.rel+R(1,4));return G(`${k.n}到國外遊學，視野變寬了。`)}),
  ch('在家，自己安排',()=>{k.rel=cl(k.rel+R(0,3));return N(`${k.n}在家玩電動、看書，過得很悠閒。`)})]}}},
{id:'khw',min:22,max:62,w:3,if:()=>kids22().some(k=>k.age>=6&&k.age<=17),run:()=>{
 const k=pick(kids22().filter(k=>k.age>=6&&k.age<=17));
 const L=[['老師要求準備美勞材料',300],['要自備平板電腦上課',15000],['校外教學費用',1500],['畢業旅行費用',12000],['班服與運動服',2000],['科展實驗材料',2500]];
 const it=pick(L);
 return {t:`${k.n}說：「老師要求${it[0]}，要 ${money(it[1])}。」`,c:[
  ch('馬上準備',()=>{S.money-=it[1];k.rel=cl(k.rel+R(1,4));return N(`你幫${k.n}準備好了。`)}),
  ch('幫他買便宜一點的版本',()=>{S.money-=Math.round(it[1]*.6);return N('你選了比較省錢的做法，孩子也能接受。')}),
  ch('叫他自己想辦法',()=>{k.rel=cl(k.rel-R(2,6));k.grd=cl((k.grd||60)-R(0,3));return B(`${k.n}覺得被忽視，有些不開心。`)}),
  ch('打電話跟老師溝通',()=>{k.rel=cl(k.rel+1);S.stress=cl(S.stress+2);return N('老師說明了原因，也提供了替代方案。')})]}}},
/* 父母向你要孝親費 */
{id:'pmon',min:24,max:70,w:3,if:()=>S.job&&!S.job.founder&&!S.flags.filial&&(S.mom&&S.mom.alive||S.dad&&S.dad.alive),run:()=>{
 const m=Math.round(S.job.sal*.12/12/1000)*1000||1000;
 return {t:`爸媽提起，希望你每月給一點孝親費。`,c:[
  ch(`固定每月給（約 ${money(m)}／人）`,()=>{S.flags.filial=m*12;[S.mom,S.dad].forEach(p=>{if(p&&p.alive)p.rel=cl(p.rel+8)});return G('爸媽很欣慰。往後每年自動轉給他們。')}),
  ch('逢年過節包紅包就好',()=>{const g=m*2;S.money-=g;[S.mom,S.dad].forEach(p=>{if(p&&p.alive)p.rel=cl(p.rel+3)});return N(`你包了 ${money(g)} 的紅包。`)}),
  ch('目前負擔不起',()=>{[S.mom,S.dad].forEach(p=>{if(p&&p.alive)p.rel=cl(p.rel-3)});return B('爸媽沒說什麼，但有點失望。')})]}}}
);
/* 父母頁面：可以要錢、要東西、孝親 */
const _sub24=subHTML;
subHTML=function(k){
 let h=_sub24(k);
 if(k==='mom'||k==='dad'){
  const a=S.age,btn=(act,t,s,d)=>`<button class="btn" data-a="do:${k}:${act}" ${d?'disabled':''}>${t}${s?`<small>${s}</small>`:''}</button>`;
  let add='';
  if(a>=3&&a<=22)add+=btn('askmoney','💰 跟他要零用錢',S.acts['pm'+k]?'今年已問過':'看家境與關係',!!S.acts['pm'+k])+btn('askbuy','🎁 拜託他買東西',S.acts['pb'+k]?'今年已問過':'隨機一項想要的東西',!!S.acts['pb'+k]);
  if(a>=22){add+=btn('filial','💰 給孝親費','NT$30,000・關係 +')+btn('trip','✈️ 帶爸媽出遊','NT$60,000・關係與心情 +')}
  h=h.replace(/(<button class="btn" data-a="back">)/,add+'$1');
 }
 return h;
};
const _int24=interact;
interact=function(k,kind){
 const p=getP(k);
 if(k==='mom'||k==='dad'){
  if(kind==='askmoney'){if(!p||!p.alive)return B('他已經不在了。');if(S.acts['pm'+k])return B('今年已經要過了。');S.acts['pm'+k]=1;
   const g=Math.round({清寒:R(500,1500),小康:R(2000,6000),富裕:R(5000,20000)}[S.fam]*(S.age>=15?2:1));
   if(chance(Math.min(.95,parentOK(g,'x')+.15+(p.rel-50)/300))){S.money+=g;p.rel=cl(p.rel-1);return G(`${p.role}給了你 ${money(g)}。`)}p.rel=cl(p.rel-2);return B(`${p.role}說「錢要省著花」，沒有給你。`)}
  if(kind==='askbuy'){if(!p||!p.alive)return B('他已經不在了。');if(S.acts['pb'+k])return B('今年已經拜託過了。');S.acts['pb'+k]=1;const it=pick(kidAge(S.age));if(!it)return B('你現在沒有特別想要的東西。');return parentAsk(it,'ask')}
  if(kind==='filial'){if(S.money<30000)return B('你的錢不夠。');S.money-=30000;p.rel=cl(p.rel+R(6,12));chg('happy',2);return G(`你給了${p.role}孝親費，他很高興。`)}
  if(kind==='trip'){if(S.money<60000)return B('你的錢不夠。');S.money-=60000;p.rel=cl(p.rel+R(8,15));chg('happy',R(3,7));return G(`你帶${p.role}出去旅行，留下了好多合照。`)}
 }
 return _int24(k,kind);
};
