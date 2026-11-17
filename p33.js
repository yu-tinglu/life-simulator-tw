/* ---- p33：依考試分數選學校與科系 ---- */
const MJC={med:'醫藥衛生',eng:'理工資訊',sci:'自然科學',biz:'商管',law:'法政',hum:'人文傳播',soc:'社會科學',edu:'教育',art:'藝術設計',agr:'農林建築'};
const MJCD={med:'要念很久、壓力大，專業證照門檻高，薪水穩定偏高。',eng:'數理要求高，科技業需求大。',sci:'偏研究導向，常往碩博士發展。',biz:'出路廣，進入金融與企業。',law:'競爭激烈，國考決定出路。',hum:'重表達與寫作，出路較分散。',soc:'偏分析與人，可走研究、公職或社福。',edu:'培育教師與照顧工作者。',art:'靠作品說話，興趣與天賦影響大。',agr:'農林、建築與環境。'};
/* [id,名稱,類別,難度,相關職業,技能加成,學制年數,壓力] */
const MJ=[
['md','醫學系','med',20,/^醫師$|研究員/,{tech:8,comm:3},6,4],['dm','牙醫系','med',18,/牙醫師/,{tech:8,comm:3},6,3],['ph','藥學系','med',11,/藥師|研究員/,{tech:6,fin:1},4,2],['nu','護理系','med',3,/護理師|照護|營養/,{comm:5,tech:3},4,3],['pt','物理治療系','med',7,/物理治療|職能治療|健身/,{tech:5,fit:4},4,2],['vt','獸醫系','med',9,/獸醫/,{tech:6},5,3],
['ee','電機系','eng',11,/工程師|研究員|半導體|IC設計|韌體/,{tech:9},4,3],['cs','資訊工程系','eng',10,/軟體|前端|後端|韌體|資料|AI|資安|系統|產品經理|工程師/,{tech:10},4,3],['me','機械系','eng',6,/機械|工程師|技術員/,{tech:8},4,2],['ch','化學工程系','eng',6,/化學工程|半導體|工程師|研究員/,{tech:8},4,2],['ce','土木系','eng',3,/土木|建築師|工程師|地政/,{tech:7},4,2],['mt','材料系','eng',4,/半導體|工程師|研究員/,{tech:8},4,2],
['ma','數學物理系','sci',8,/研究員|資料|精算|AI|工程師|老師/,{tech:7},4,2],['cm','化學系','sci',3,/研究員|化學|工程師|專利/,{tech:6},4,2],['lf','生命科學系','sci',4,/研究員|藥師|專利|營養/,{tech:6},4,2],
['ba','企業管理系','biz',5,/管理|企劃|業務|行銷|產品經理|人資|顧問|銀行|財務|稽核/,{lead:5,comm:3},4,1],['ac','會計系','biz',6,/會計|稅務|稽核|記帳|財務/,{fin:7},4,2],['fn','財務金融系','biz',8,/財務|銀行|證券|基金|投資|精算|理專/,{fin:8},4,2],['it','國際貿易系','biz',2,/貿易|業務|行銷|企劃|外交|海關/,{comm:5,fin:2},4,1],['mk','行銷系','biz',3,/行銷|企劃|業務|公關|產品經理/,{comm:6,cre:2},4,1],
['lw','法律系','law',14,/律師|法官|檢察官|公務員|專利|海關/,{comm:5,lead:3},4,4],['pl','政治系','law',6,/公務員|外交|記者|公關|研究員/,{comm:5,lead:3},4,1],['dp','外交系','law',8,/外交|公務員|翻譯|海關|記者/,{comm:6},4,1],
['zh','中文系','hum',1,/記者|編輯|作家|翻譯|老師|公關|導演/,{comm:4,cre:4},4,1],['en','外文系','hum',4,/翻譯|空服|外交|老師|編輯|公關|領隊|導遊/,{comm:7},4,1],['hs','歷史系','hum',1,/老師|編輯|記者|研究員|作家|公務員/,{comm:3,cre:2},4,0],['ph2','哲學系','hum',0,/老師|作家|編輯|研究員/,{comm:3},4,0],['jn','新聞傳播系','hum',6,/記者|編輯|公關|行銷|導演|剪輯|主持/,{comm:6,cre:3},4,2],
['ps','心理系','soc',6,/心理師|人資|研究員|社工|行銷/,{comm:5},4,1],['so','社會系','soc',2,/社工|研究員|公務員|人資|記者/,{comm:4},4,1],['sw','社工系','soc',1,/社工|公務員|人資/,{comm:5},4,2],['ec','經濟系','soc',9,/財務|分析|銀行|精算|公務員|顧問|研究員|資料/,{fin:5,tech:3},4,2],
['ed','教育系','edu',4,/老師|保母|教授|社工/,{comm:6},4,1],['se','特殊教育系','edu',2,/老師|社工|保母|職能/,{comm:5},4,2],['ec2','幼兒教育系','edu',0,/老師|保母/,{comm:5,cre:2},4,1],
['dg','設計系','art',5,/設計|攝影|插畫|UI|平面|導演|剪輯/,{cre:9},4,2],['fa','美術系','art',3,/設計|藝術|漫畫|插畫|攝影|老師/,{cre:9},4,1],['mu','音樂系','art',4,/音樂|老師|演員|配音|歌手/,{cre:9},4,2],['dr','戲劇系','art',4,/演員|導演|主持|配音|編/,{cre:7,comm:4},4,2],
['ag','農學系','agr',0,/農|營養|研究員|公務員/,{tech:4},4,1],['fo','森林環境系','agr',0,/公務員|研究員|工程師/,{tech:4},4,1],['ar','建築系','agr',9,/建築師|設計|土木|地政|不動產/,{tech:5,cre:5},5,4],['ld','景觀系','agr',1,/設計|建築|公務員|土木/,{cre:5,tech:3},4,1]
];
const MJX={};MJ.forEach(m=>MJX[m[0]]=m);
/* 學校層級（台灣）：b=基準分數 */
const TWT=[
 {k:'top',n:'頂尖國立大學',tu:55000,b:70,pre:3,f:1},
 {k:'nat',n:'國立大學',tu:55000,b:52,pre:2,f:.9},
 {k:'ptop',n:'頂尖私立大學',tu:120000,b:40,pre:2,f:.75},
 {k:'priv',n:'私立大學',tu:100000,b:28,pre:1,f:.6},
 {k:'tech',n:'科技大學',tu:90000,b:20,pre:1,f:.5,cats:['eng','biz','art','agr'],ids:['nu','pt']}
];
function tierOK(t,m){
 if(t.cats&&!t.cats.includes(m[2])&&!(t.ids||[]).includes(m[0]))return false;
 if((m[0]==='md'||m[0]==='dm')&&!(t.k==='top'||t.k==='nat'||t.k==='ptop'))return false;
 if(m[0]==='vt'&&!(t.k==='top'||t.k==='nat'))return false;
 if((m[2]==='law')&&t.k==='tech')return false;
 return true}
function tierReq(t,m,voc){return Math.round(t.b+m[3]*t.f+(voc&&t.k==='nat'?8:0))}
function admitPr(sc,req){return clmp((8-(req-sc))/16,0,1)}
const exScore=()=>{mFix();return Math.round(clmp(S.grade*.5+S.smarts*.42+(S.prestige||0)*2+R(-9,9),0,100))};
function majorRel(j){const M=S.major;if(!M)return false;const t=j.t||j;
 return [M.id,M.gid].some(id=>id&&MJX[id]&&MJX[id][4].test(t))}
function setMajor(m,tier,pre){S.major={id:m[0],n:m[1],cat:m[2],tier,yrs:m[6]};S.lic=S.lic||{}}
function applyMajorSkill(){const M=S.major;if(!M||M.sk)return;M.sk=1;mFix();const m=MJX[M.id];Object.keys(m[5]).forEach(k=>bump('k',k,m[5][k]));
 if(M.gid){const g=MJX[M.gid];Object.keys(g[5]).forEach(k=>bump('k',k,Math.round(g[5][k]*.6)))}}
/* 步驟1：選類組 */
function catEvent(ctx){
 return {run:()=>({t:`你的${ctx.exam}成績約 ${S.exam} 分（換算成百分制）。想念哪一類的科系？（類組只決定你能選的科系，成績決定學校層級）`,
  c:Object.keys(MJC).map(c=>ch(`${MJC[c]}｜${MJCD[c]}`,()=>{queue.unshift(majEvent(ctx,c));return N(`你傾向${MJC[c]}類。`)}))})};
}
/* 步驟2：選科系 */
function majEvent(ctx,cat){
 return {run:()=>({t:`${MJC[cat]}類有以下科系（難度越高分數要求越高）：`,
  c:MJ.filter(m=>m[2]===cat).map(m=>{
   let best=null;
   if(ctx.abroad)best={pr:admitPr(S.exam,50+m[3]),n:ctx.abroad};
   else TWT.forEach(t=>{if(!tierOK(t,m))return;if(ctx.voc&&t.k==='top')return;const p=admitPr(S.exam,tierReq(t,m,ctx.voc));if(p>.03&&(!best||t.b>best.t.b))best={t,pr:p,n:t.n}});
   const tag=best?(ctx.abroad?`可選`:`最高可試：${best.n}（錄取率約${Math.round(best.pr*100)}%）`):'目前分數不足，只能選擇重考或備取';
   return ch(`${m[1]}｜難度 ${m[3]}｜${tag}`,()=>{
    if(ctx.abroad){return finishMajor(ctx,m,null)}
    queue.unshift(tierEvent(ctx,m));return N(`你想念${m[1]}。`)})
  }).concat([ch('回上一步，換類組',()=>{queue.unshift(catEvent(ctx));return N('你重新考慮。')})])})};
}
/* 步驟3：選學校層級（台灣） */
function tierEvent(ctx,m){
 return {run:()=>({t:`${m[1]}可以選擇的學校（你的成績約 ${S.exam} 分）：`,
  c:TWT.filter(t=>tierOK(t,m)&&!(ctx.voc&&t.k==='top')).map(t=>{
   const req=tierReq(t,m,ctx.voc),p=admitPr(S.exam,req);
   return ch(`${t.n}${m[1]}｜每年學費${money(t.tu)}｜需約${req}分｜錄取率約${Math.round(p*100)}%`,()=>{
    if(chance(p))return finishMajor(ctx,m,t);
    // 落榜：找最低門檻的備取
    const alt=TWT.filter(x=>tierOK(x,m)&&!(ctx.voc&&x.k==='top')).sort((a,b)=>tierReq(a,m,ctx.voc)-tierReq(b,m,ctx.voc))[0];
    if(alt&&chance(Math.max(.2,admitPr(S.exam,tierReq(alt,m,ctx.voc))))){chg('happy',-4);const r=finishMajor(ctx,m,alt);return B(`沒有考上${t.n}，改念${alt.n}${m[1]}。`)}
    chg('happy',-8);S.stress=cl(S.stress+6);
    queue.unshift(catEvent(ctx));return B(`你沒有考上${t.n}${m[1]}。可以重新選擇志願（遊戲簡化：視為重新填志願）。`)
   })}).concat([ch('不升學，直接工作',()=>N('你決定先踏入社會。'))])})};
}
function finishMajor(ctx,m,t){
 const yrs=m[6];let tu=t?t.tu:(S.tuition||0),pre=t?t.pre:(S.prestige||0);
 if(ctx.abroad){tu=S.tuition||0}
 else enroll('大學',yrs,tu,pre);
 setMajor(m,t?t.n:ctx.abroad,pre);
 if(ctx.abroad&&yrs>4){S.schoolEnd=S.age+yrs}
 chg('happy',7);log(`你進入${t?t.n:ctx.abroad}的${m[1]}就讀。`,'good');
 return G(`你進入${t?t.n:ctx.abroad}的${m[1]}（${yrs} 年）。`);
}
/* 出發點：E_UNI（台灣）與國外銜接 */
const _eu33=E_UNI.run;
E_UNI.run=function(){
 if((S.cn||'TW')==='TW'&&!(S.ab&&S.ab.visa)){
  const voc=S.hsTrack==='高職';
  return {t:`${voc?'高職':'高中'}畢業了，接下來要做什麼？`,c:[
   ch(voc?'參加四技二專統測，選擇科系':'參加學測，選擇科系',()=>{S.exam=exScore();return (queue.unshift(catEvent({exam:voc?'統測':'學測',voc})),N(`你參加了${voc?'統測':'學測'}，成績約 ${S.exam} 分。`))}),
   ch('直接去工作',()=>N('你決定先踏入社會。'))]};
 }
 const r=_eu33();
 if(S.ab&&S.ab.visa==='study'&&S.cn!=='TW'){const first=r.c[0],last=r.c[r.c.length-1];
  r.c=[first,ch('回台灣升學（學測）',()=>{goHome('');queue.unshift(E_UNI);return N('你決定回台灣參加學測。')}),last]}
 return r};
/* 國外直接念大學：之後選科系 */
const _wuni33=wUni;
wUni=function(k){const was=S.school,r=_wuni33(k);
 if(!was&&S.school==='大學'&&!S.major){S.exam=exScore();queue.push(catEvent({exam:'當地入學考試',abroad:`${WD[k]?WD[k].n:''}大學`}))}
 return r};
/* 國中畢業：會考與高中職 */
const HST=[
 {n:'明星高中',k:'star',tu:25000,b:80,pre:2,tr:'高中'},
 {n:'公立高中',k:'pub',tu:25000,b:58,pre:1,tr:'高中'},
 {n:'私立高中',k:'pri',tu:120000,b:38,pre:0,tr:'高中'},
 {n:'高職（技職體系）',k:'voc',tu:30000,b:26,pre:0,tr:'高職'}
];
function hsEvent(){
 return {run:()=>({t:`國中畢業了！你的會考成績約 ${S.exam} 分，要念哪裡？`,c:HST.map(h=>{
  const p=admitPr(S.exam,h.b);
  return ch(`${h.n}｜每年約${money(h.tu)}｜需約${h.b}分｜錄取率約${Math.round(p*100)}%`,()=>{
   let use=h;
   if(!chance(p)){use=HST.filter(x=>x.b<=Math.max(26,S.exam)).sort((a,b)=>b.b-a.b)[0]||HST[3];chg('happy',-3)}
   S.hsTrack=use.tr;enroll(use.tr,3,use.tu,use.pre);
   return use===h?G(`你考上了${h.n}。`):B(`沒有考上${h.n}，改念${use.n}。`)})})})};
}
const _g33=graduate;
graduate=function(){
 const was=S.school,M=S.major;_g33();
 if(was==='國中'&&(S.cn||'TW')==='TW'&&S.school&&!(S.ab&&S.ab.visa)){S.exam=exScore();S.school=null;S.tuition=0;queue.push(hsEvent())}
 if(was==='大學'&&M){applyMajorSkill();if(M.id==='md'||M.id==='dm'||M.id==='vt')S.edu=Math.max(S.edu,5)}
};
/* 碩士：同領域、轉領域 */
const _eg33=E_GRAD.run;
E_GRAD.run=function(){
 if(!S.major||(S.ab&&S.ab.visa&&S.cn!=='TW'))return _eg33();
 const M=S.major,base=MJX[M.id];
 const lst=[['國內頂尖碩士班',72,3,`${base[1]}研究所（頂尖）`],['國內碩士班',48,2,`${base[1]}研究所`]];
 const sw=[['cs','轉念資訊碩士'],['ba','轉念商管碩士（MBA）'],['lw','轉念法律研究所']].filter(x=>x[0]!==M.id);
 const sc=Math.round(S.grade*.5+S.smarts*.42+(S.prestige||0)*2);
 const c=lst.map(x=>ch(`${x[0]}（${x[3]}）｜需約${x[1]}分｜錄取率約${Math.round(admitPr(sc,x[1])*100)}%`,()=>{
  const ok=chance(admitPr(sc,x[1]));const u=ok?x:lst[1];
  if(!ok&&!chance(admitPr(sc,lst[1][1])))return B('這次沒有考上研究所，你準備找工作。');
  enroll('碩士',2,60000,u[2]);S.major.gid=S.major.gid||null;return ok?G(`你考上了${u[3]}。`):B(`沒有考上頂尖研究所，改念${u[3]}。`)}));
 sw.forEach(x=>c.push(ch(`${x[1]}｜需約${50}分｜錄取率約${Math.round(admitPr(sc,50)*100)}%`,()=>{
  if(!chance(admitPr(sc,50)))return B('跨領域考試沒有通過，你準備找工作。');
  enroll('碩士',2,60000,2);S.major.gid=x[0];return G(`你轉換領域，進入${x[1]}。`)})));
 c.push(ch('進入職場',()=>N('你準備找工作。')));
 return {t:`大學畢業了（${M.tier}${M.n}），要繼續念研究所嗎？`,c}};
/* 工作限制與加成 */
const STRICT=[[/^醫師$/,['md'],'醫學系'],[/牙醫師/,['dm'],'牙醫系'],[/藥師/,['ph'],'藥學系'],[/護理師/,['nu'],'護理系'],[/物理治療師|職能治療師/,['pt','se'],'物理治療系'],[/獸醫師/,['vt'],'獸醫系'],[/中醫師/,['md','ph','dm'],'醫藥相關科系'],[/律師|法官|檢察官/,['lw'],'法律系'],[/建築師/,['ar','ce'],'建築或土木系'],[/會計師/,['ac'],'會計系'],[/精算師/,['ma','fn','ec'],'數學或財金相關科系']];
const _jb33=jobBlock;
jobBlock=function(j){
 const r=_jb33(j);if(r)return r;
 const M=S.major;if(!M||S.cn==null)return '';
 for(const [re,ids,nm] of STRICT){if(re.test(j.t)){
  const ok=ids.includes(M.id)||ids.includes(M.gid);
  if(!ok)return `需${nm}背景（你讀的是${M.n}）`;
  if(['med','law','biz'].includes(MJX[ids.includes(M.id)?M.id:M.gid][2])&&!(S.lic&&S.lic[MJX[ids.includes(M.id)?M.id:M.gid][2]]))return '需先通過專業證照國考';
  }}
 return '';
};
const _sb33=skillBonus;
skillBonus=function(j){return _sb33(j)+(majorRel(j)?.12:0)};
const _hj33=hireJob;
hireJob=function(j){const o=_hj33(j);if(majorRel(j)){o.sal=Math.round(o.sal*1.08);o.s0=o.sal;o.mj=1}return o};
/* 大學期間 */
const _y33=yearly;
yearly=function(){const sc=S.school==='大學'&&S.major;_y33();if(sc){const m=MJX[S.major.id];S.stress=cl(S.stress+m[7]);}};
/* 事件 */
function mEv(id,min,max,w,cond,run){E.push({id:'mj_'+id,min,max,w,if:()=>S.major&&cond(),run})}
mEv('intern',19,24,3,()=>S.school==='大學'&&!S.acts.mjin,()=>{S.acts.mjin=1;const M=S.major;return {t:`暑假有${MJC[M.cat]}相關的實習機會，要去嗎？`,c:[
 ch('去實習（累但學到東西）',()=>{S.stress=cl(S.stress+5);mFix();Object.keys(MJX[M.id][5]).forEach(k=>bump('k',k,2));S.exp=(S.exp||0)+.3;return G('你在實習中累積了實務經驗，也認識了業界前輩。')}),
 ch('打工賺零用錢',()=>{S.money+=60000;return N('你打工賺了 NT$60,000。')}),
 ch('好好放假',()=>{chg('happy',4);S.stress=cl(S.stress-6);return N('你放鬆了一個夏天。')})]}});
mEv('switch',18,22,2,()=>S.school==='大學'&&!S.acts.mjsw&&S.happy<65,()=>{S.acts.mjsw=1;return {t:`你開始懷疑自己念的${S.major.n}適不適合你。`,c:[
 ch('轉到別的科系',()=>{const o=pick(MJ.filter(m=>m[0]!==S.major.id&&m[3]<=S.major.yrs*5+S.exam/6));S.major.id=o[0];S.major.n=o[1];S.major.cat=o[2];S.major.sk=0;S.schoolEnd+=1;chg('happy',5);return N(`你轉到${o[1]}，多讀了一年。`)}),
 ch('雙主修（比較累）',()=>{S.stress=cl(S.stress+6);const o=pick(MJ.filter(m=>m[0]!==S.major.id));S.major.gid=o[0];return G(`你加修${o[1]}，視野更廣。`)}),
 ch('撐下去',()=>{S.stress=cl(S.stress+3);return N('你決定先把這個科系讀完。')})]}});
mEv('natex',22,45,4,()=>!S.school&&S.edu>=4&&['med','law','biz'].includes(S.major.cat)&&!(S.lic&&S.lic[S.major.cat])&&!S.acts.mjex,()=>{S.acts.mjex=1;const c=S.major.cat,nm={med:'專技醫事人員國考',law:'律師／司法官國考',biz:'會計師等專技高考'}[c];return {t:`${nm}報名了，要認真準備嗎？`,c:[
 ch('全力衝刺（一年，辭掉工作）',()=>{S.job=null;S.stress=cl(S.stress+10);const p=clmp(.28+S.grade/200+S.smarts/300+(c==='law'?-.15:c==='med'?.2:0),.08,.85);if(chance(p)){S.lic=S.lic||{};S.lic[c]=1;chg('happy',12);return G(`你通過了${nm}，取得專業資格！`)}return B(`這次沒有通過${nm}，明年可以再考。`)}),
 ch('邊工作邊準備',()=>{S.stress=cl(S.stress+5);const p=clmp(.16+S.grade/300+S.smarts/400,.05,.5);if(chance(p)){S.lic=S.lic||{};S.lic[c]=1;chg('happy',10);return G(`你通過了${nm}。`)}return B('邊工作邊準備，這次沒有上榜。')}),
 ch('先不考',()=>N('你決定暫時不考。'))]}});
/* 能力頁顯示 */
