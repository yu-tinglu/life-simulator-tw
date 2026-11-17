/* ===== p15：戀愛劇情線、婚後生活、NPC 人生、教學與難度、年度回顧、選單分組 ===== */
const trv=t=>t.tru==null?50:t.tru;
const hbc=(v,c)=>`<div class="bar"><i style="width:${Math.max(0,Math.min(100,v))}%;background:${c}"></i></div>`;
const ROMK='lifesim_tw_rom_v1';
const STORY=[
 [{t:'{n}發現你加班到很晚，默默留了一盞燈和一份宵夜。',o:['誠心道謝，約對方週末喝咖啡','開玩笑說「你是不是喜歡我？」','客氣收下，說不用麻煩了']},
  {t:'下雨天，{n}把唯一的傘塞給你，自己淋雨跑走。',o:['追上去一起撐傘','買薑茶和藥送去對方家','隔天假裝什麼都沒發生']},
  {t:'{n}說：「我其實一直在等你開口。」',o:['認真說出心意','牽起對方的手','說還沒準備好']}],
 [{t:'{n}把你的筆記本搶走：「字好醜，我幫你重抄。」結果抄得超工整。',o:['認真道謝並請吃飯','故意逗對方「你是不是在意我」','說隨便你']},
  {t:'你生病請假，{n}嘴上說「活該」，卻出現在你家門口提著粥。',o:['坦率說你很開心','調侃「某人擔心得要命」','說不用你管']},
  {t:'{n}低著頭：「才不是喜歡你…只是，不想看到你跟別人在一起。」',o:['溫柔地說我也是','抱住對方','裝作沒聽到']}],
 [{t:'{n}遞來一張黑卡：「今晚想吃什麼都行。」眼神卻有點緊張。',o:['說比起排場更想一起散步','大方接受並挑最貴的','婉拒說不習慣']},
  {t:'{n}的競爭對手放話挑釁，對方卻只在意你有沒有被嚇到。',o:['陪對方一起面對','主動出面替對方說話','勸對方別連累自己']},
  {t:'{n}在高樓夜景前說：「我的世界很忙，但我想把空位留給你。」',o:['答應一起走下去','要求對方承諾不再工作到深夜','說需要更多時間']}],
 [{t:'{n}拉你參加路跑，你跑到最後一公里幾乎放棄。',o:['咬牙跑完，抱著對方笑','請對方背你跑','中途退出']},
  {t:'{n}在慶功宴上被朋友起鬨，滿臉通紅地看你。',o:['大方地牽起對方的手','開玩笑接下起鬨','假裝沒看到']},
  {t:'日出的海邊，{n}大聲說：「做我的專屬隊友吧！」',o:['說好，我們一起','比賽誰先跑到海裡','說讓我再想想']}],
 [{t:'{n}借你一本書，書頁裡夾著一張寫著問題的小紙條。',o:['認真寫下答案還給對方','寫一首短詩回覆','忘了讀就還回去']},
  {t:'{n}邀你去聽獨立樂團，散場後說：「這首歌讓我想到你。」',o:['說出你的真實感受','說對方才是那首歌','說你不太懂音樂']},
  {t:'{n}寫了一封長信，約你在書店深處見面。',o:['讀完後當面回應','在信末寫下回信','說最近太忙']}],
 [{t:'{n}總是在你加班時默默出現，什麼也不說，只放下一杯熱茶。',o:['輕聲說謝謝並邀請一起走一段','追問對方為什麼這樣做','裝作沒發現']},
  {t:'一個雨夜，{n}突然說出自己不為人知的過去。',o:['靜靜聽完並握住對方的手','說「你不用一個人撐著」','說這不關你的事']},
  {t:'{n}別過頭：「…如果你想走，現在就說。」',o:['說我不會走','靠近並輕輕擁抱','說我需要想想']}],
 [{t:'{n}翻出小時候的合照：「你還是一點都沒變。」',o:['說你也是，我一直很珍惜','笑對方的傻樣開玩笑','說都過去了']},
  {t:'你發現{n}為你默默做了很多事，卻從不邀功。',o:['認真感謝並回報','故意問「是不是喜歡我」','覺得理所當然']},
  {t:'{n}輕聲說：「我們認識這麼久，要不要換個身分？」',o:['說好，我也一直想說','說那要先約會看看','說我們還是朋友比較好']}],
 [{t:'{n}毒舌地批改你的報告，卻在最後寫了一行：「進步很多。」',o:['認真請教並道謝','回嗆「你也沒多厲害」','說不想被批評']},
  {t:'你搞砸了重要的事，{n}嘴上嫌棄，卻熬夜幫你補救。',o:['誠實道歉並請對方吃飯','說對方其實很溫柔','說不用幫我']},
  {t:'{n}冷冷地說：「我只對你這麼有耐心，笨蛋。」',o:['說我知道，謝謝你','拉住對方：「那就一直這樣吧」','說我們不適合']}]];
const STH=[35,55,75];
function storyT(){
 const c=[];const p=S.partner;
 if(p&&(p.st||0)<3&&p.rel>=STH[p.st||0])c.push(p);
 S.crush.forEach(x=>{if((x.st||0)<3&&x.aff>=STH[x.st||0])c.push(x)});
 return c.length?pick(c):null;
}
function addAff(t,d){if(t===S.partner)t.rel=cl(t.rel+d);else t.aff=cl(t.aff+d)}
function endRomance(p){
 const A=ARCH[p.a],tr=trv(p),e=(p.rel>=75&&tr>=65)?'甜蜜結局':tr>=40?'平淡長跑':'遺憾收場';
 const g=lsGet(ROMK,{});g[A.n+'・'+e]=1;lsSet(ROMK,g);
 if(e==='甜蜜結局'){chg('happy',10);log(`💞 與${p.n}的故事迎來「甜蜜結局」。`,'good')}
 else if(e==='平淡長跑'){log(`與${p.n}的關係進入平淡而穩定的長跑。`)}
 else{p.rel=cl(p.rel-20);chg('happy',-6);log(`與${p.n}之間的信任不足，故事走向「遺憾收場」。`,'bad')}
}
function storyPick(t,isP,i){
 const A=ARCH[t.a],st=t.st||0;let d,dt,q;
 if(i===0){d=R(6,10);dt=R(5,9);q='g'}
 else if(i===1){if(chance(.6)){d=R(10,15);dt=R(0,3);q='g'}else{d=-R(3,6);dt=-R(2,5);q='b'}}
 else{d=-R(2,6);dt=-R(4,8);q='b'}
 if(S.looks>75&&d>0)d++;
 addAff(t,d);t.tru=cl(trv(t)+dt);t.st=st+1;
 if(isP)t.lastI=S.age;else t.last=S.age;
 const tx=pick(A[q]);log(`【${A.n}・第${st+1}章】${t.n}：${tx.replace(/^對方/,'')}`,q==='g'?'good':'bad');
 if(isP&&t.st>=3)endRomance(t);
 return q==='g'?G(`好感 +${d}，信任 ${dt>=0?'+':''}${dt}。`):B(`好感 ${d}，信任 ${dt>=0?'+':''}${dt}。`);
}
ACH.push(['rom3','💘 解鎖 3 種戀愛結局',()=>Object.keys(lsGet(ROMK,{})).length>=3],['sweet','🍯 達成甜蜜結局',()=>Object.keys(lsGet(ROMK,{})).some(k=>k.endsWith('甜蜜結局'))]);
E.push({id:'rstory',min:15,max:80,w:6,if:()=>{mFix();return storyT()!=null},run:()=>{
 const t=storyT();if(!t)return null;const isP=t===S.partner,A=ARCH[t.a],st=t.st||0,cp=STORY[t.a][st];
 return {t:`【${A.em}${A.n}・第 ${st+1} 章】${cp.t.replace('{n}',t.n)}`,c:cp.o.map((l,i)=>ch(l,()=>storyPick(t,isP,i)))}}});
const _cp=crushPage;
crushPage=function(i){const c=S.crush[i];return _cp(i).replace('<div class="sub">喜歡的語氣',`<div class="sub">信任 ${trv(c)}・劇情 ${c.st||0}／3</div>${hbc(trv(c),'#0ea5e9')}<div class="sub">喜歡的語氣`)};
const _pp=partnerPage;
partnerPage=function(){const p=S.partner;return _pp().replace(/(<div class="bar"><i style="width:[0-9.]+%;background:#ec4899"><\/i><\/div>)/,`$1<div class="sub">信任 ${trv(p)}・嫉妒 ${p.jel||0}・劇情 ${p.st||0}／3${p.job?`・${esc(p.job)}`:''}</div>${hbc(trv(p),'#0ea5e9')}`)};
const _ach=achHTML;
achHTML=function(){const g=lsGet(ROMK,{}),k=Object.keys(g);return _ach().replace('<button class="btn" data-a="back">',`<div class="sec">💘 戀愛結局圖鑑（${k.length}）</div>`+(k.length?k.map(x=>`<div class="item">${x}</div>`).join(''):'<p class="sub">與伴侶完成三章劇情就會解鎖結局。</p>')+'<button class="btn" data-a="back">')};

/* ---- 婚後與多元家庭事件 ---- */
const married=()=>!!(S.partner&&S.partner.married);
E.push(
{id:'mhouse',min:22,max:75,w:2.5,if:married,run:()=>({t:'結婚後，家務與瑣事的分工成了日常爭執的來源。',c:[
  ch('平均分擔',()=>{S.partner.rel=cl(S.partner.rel+3);return N('你們訂下了分工表。')}),
  ch('我多做一點',()=>{S.partner.rel=cl(S.partner.rel+5);S.stress=cl(S.stress+4);return N('你承擔了更多，有點累。')}),
  ch('請鐘點幫傭（NT$60,000／年）',()=>{if(S.money<60000)return B('你的錢不夠。');S.money-=60000;S.partner.rel=cl(S.partner.rel+4);S.stress=cl(S.stress-3);return G('花錢買到了更多相處的時間。')})]})},
{id:'min',min:25,max:70,w:2,if:married,run:()=>({t:`${S.partner.n}的家人對你們的生活方式有許多意見。`,c:[
  ch('常回去探望，主動溝通',()=>{S.partner.rel=cl(S.partner.rel+4);S.stress=cl(S.stress+3);return N('關係慢慢改善，但你花了不少心力。')}),
  ch('客氣但保持距離',()=>{S.stress=cl(S.stress-1);return N('雙方維持表面和氣。')}),
  ch('直接表達立場',()=>{if(chance(.5)){S.partner.rel=cl(S.partner.rel+3);return G('對方家人調整了態度。')}S.partner.rel=cl(S.partner.rel-8);S.stress=cl(S.stress+4);return B('場面一度尷尬。')})]})},
{id:'mtempt',min:25,max:65,w:2,if:married,run:()=>{const p=S.partner,c=S.crush.slice().sort((a,b)=>b.aff-a.aff)[0];const nm=c?c.n:fullName(pick(['男','女']));
 return {t:`你在${pick(['公司','聚會','旅途中'])}遇到了很有魅力的${nm}，對方明顯對你有好感。`,c:[
  ch('保持界線',()=>{S.karma=cl(S.karma+3);p.tru=cl(trv(p)+3);return G('你守住了和另一半的承諾。')}),
  ch('曖昧但不越線',()=>{p.tru=cl(trv(p)-6);later(R(1,3),'gossip');if(chance(.35)){p.rel=cl(p.rel-15);return B(`${p.n}發現了你們的訊息，吵了一架。`)}return N('你有點心虛。')}),
  ch('越過界線',()=>{S.karma=cl(S.karma-10);p.tru=cl(trv(p)-15);if(chance(.6)){p.rel=cl(p.rel-25);log(`${p.n}發現了你的背叛。`,'bad');if(p.rel<30&&chance(.5))return interact('partner','breakup');return B('關係出現嚴重裂痕。')}return N('暫時沒有人發現，但你知道。')})]}}},
{id:'mkid',min:24,max:50,w:2,if:()=>married()&&S.kids.some(k=>k.age<7),run:()=>({t:'孩子還小，夫妻要決定怎麼分工照顧。',c:[
  ch('一方暫停工作專心照顧',()=>{if(S.job&&!S.job.founder)S.job.perf=cl(S.job.perf-8);S.partner.rel=cl(S.partner.rel+4);S.stress=cl(S.stress-2);return N('家庭時間增加，但事業受到影響。')}),
  ch('請保母（NT$200,000／年）',()=>{if(S.money<200000)return B('你的錢不夠。');S.money-=200000;S.stress=cl(S.stress-4);return N('專業照顧減輕了壓力。')}),
  ch('請長輩協助',()=>{S.mom.rel=cl(S.mom.rel+3);S.dad.rel=cl(S.dad.rel+3);S.stress=cl(S.stress+2);return N('長輩幫了大忙，也多了不少意見。')})]})},
{id:'mill',min:30,max:85,w:2,if:()=>!!S.partner&&S.partner.rel>=30,run:()=>({t:`${S.partner.n}突然生了一場大病。`,c:[
  ch('親自陪伴照顧（NT$30,000）',()=>{S.money-=30000;S.partner.rel=cl(S.partner.rel+8);S.stress=cl(S.stress+4);return G('你的陪伴讓對方很感動。')}),
  ch('聘請看護（NT$150,000）',()=>{if(S.money<150000)return B('你的錢不夠。');S.money-=150000;S.partner.rel=cl(S.partner.rel+2);return N('對方獲得良好照顧。')}),
  ch('忙於工作，很少探望',()=>{S.partner.rel=cl(S.partner.rel-25);S.partner.tru=cl(trv(S.partner)-12);return B('對方非常失望。')})]})},
{id:'mjob',min:24,max:60,w:1.5,if:()=>!!(S.partner&&(S.partner.married||S.partner.cohab)&&S.partner.inc&&!S.partner.jl),run:()=>({t:`${S.partner.n}被公司資遣了，情緒很低落。`,c:[
  ch('全力支持，一起規劃下一步',()=>{S.partner.jl=R(1,2);S.partner.rel=cl(S.partner.rel+6);return G('你們一起度過難關。')}),
  ch('嘴上安慰，心裡擔心經濟',()=>{S.partner.jl=R(1,3);S.stress=cl(S.stress+4);return N('壓力讓兩人都不太好受。')}),
  ch('忍不住抱怨',()=>{S.partner.jl=R(2,3);S.partner.rel=cl(S.partner.rel-10);S.partner.tru=cl(trv(S.partner)-8);return B('對方覺得被責怪。')})]})},
{id:'rdisc',min:20,max:60,w:2,if:()=>S.ori!=='異性戀'&&!!S.flags.out&&!!S.job&&!S.job.founder,run:()=>({t:'同事得知你的性向後，反應各有不同。',c:[
  ch('坦然面對，主動說明',()=>{if(chance(.7)){chg('happy',3);S.net=cl(S.net+2);return G('多數同事表示支持。')}S.stress=cl(S.stress+4);S.job.perf=cl(S.job.perf-3);return B('有少數人私下議論。')}),
  ch('保持低調，不多談',()=>{S.stress=cl(S.stress+2);return N('你選擇不引起波瀾。')}),
  ch('向公司反映不當言論',()=>{if(chance(.65)){S.job.perf=cl(S.job.perf+2);return G('公司介入處理，職場氣氛好轉。')}S.stress=cl(S.stress+5);return B('處理過程讓你很疲憊。')})]})},
{id:'rkidsch',min:25,max:55,w:2,if:()=>S.partner&&S.partner.sx===S.sx&&S.kids.some(k=>k.age>=5&&k.age<=15),run:()=>({t:'孩子在學校被問到：「為什麼你有兩個爸爸／兩個媽媽？」',c:[
  ch('陪孩子練習坦然說明',()=>{S.kids.forEach(k=>{k.rel=cl(k.rel+4)});return G('孩子變得更有自信。')}),
  ch('找老師溝通，請學校推動友善教育',()=>{S.stress=cl(S.stress+3);S.kids.forEach(k=>{k.rel=cl(k.rel+2)});return N('老師願意配合，但需要持續溝通。')}),
  ch('叫孩子少回答',()=>{S.kids.forEach(k=>{k.rel=cl(k.rel-3)});return B('孩子覺得自己需要隱藏。')})]})},
{id:'fhelp',min:22,max:75,w:2.5,if:()=>S.friends.length>0,run:()=>{const f=pick(S.friends);if(f.sib&&chance(.5))return null;const amt=Math.max(30000,Math.round(sal()*.1));
 return {t:`${f.n}${pick(['被公司資遣','生意週轉不靈','家人生病需要錢'])}，來找你幫忙。`,c:[
  ch(`借錢（${money(amt)}）`,()=>{if(S.money<amt)return B('你的錢不夠。');S.money-=amt;f.loan=(f.loan||0)+amt;f.rel=cl(f.rel+8);f.tru=cl((f.tru||50)+6);return G('對方非常感激。')}),
  ch('幫忙介紹工作',()=>{if(S.net>=40){f.rel=cl(f.rel+10);f.tru=cl((f.tru||50)+8);later(R(2,5),'favor',f.n);return G('你的人脈幫上了忙。')}return N('你努力了，但人脈不夠，沒有成功。')}),
  ch('婉拒',()=>{f.rel=cl(f.rel-8);f.tru=cl((f.tru||50)-6);return B('對方有點失望。')})]}}}
);

/* ---- NPC 人生：朋友與伴侶的年齡、職業、收入 ---- */
const JL=['工程師','護理師','業務','設計師','教師','店員','公務員','行政人員','自營小店','工廠作業員','會計','廚師'];
function fFix2(f){if(f.off==null)f.off=f.age!=null?f.age-S.age:R(-4,4);if(!f.job)f.job=pick(JL)}
function pFix2(p){if(!p.job)p.job=pick(JL.concat(['律師','醫師','自由工作者']));if(p.inc==null)p.inc=Math.round(Math.max(3e5,Math.min(2e6,380000*Math.exp((Math.random()+Math.random()+Math.random()-1.5)*.9)))/1e4)*1e4}
const _mFix=mFix;
mFix=function(){_mFix();if(S){S.friends.forEach(fFix2);if(S.partner)pFix2(S.partner);if(S.diff==null)S.diff=1;if(!S.hs)S.hs=[]}};
const _fx=friendExtra;
friendExtra=function(k){const p=getP(k);fFix2(p);return _fx(k).replace('<div class="sub">'+p.kind,`<div class="sub">${S.age+p.off} 歲・${esc(p.job)}・${p.kind}`)};
function npcYear(){
 for(let i=S.friends.length-1;i>=0;i--){const f=S.friends[i];fFix2(f);const a=S.age+f.off;
  if(a>=25&&!f.mar&&chance(.04)){f.mar=1;log(`${f.n}結婚了，你收到了喜帖。`)}
  if(a>=22&&chance(.02)){f.rel=cl(f.rel-12);log(`${f.n}搬到外地發展，聯絡變少了。`)}
  if((a>=70&&chance(Math.pow(a-68,2)*.0008))||(a>=40&&chance(.0015))){log(`你的${f.kind}${f.n}過世了，享年 ${a} 歲。`,'bad');chg('happy',-6);S.stress=cl(S.stress+4);S.friends.splice(i,1)}}
 const p=S.partner;
 if(p&&(p.married||p.cohab)&&S.age>=18){pFix2(p);
  if(p.jl>0){p.jl--}
  const pa=S.age+(p.off||0),inc=(pa<65&&!p.jl)?Math.round(p.inc*.78):0,cost=kidCost();
  ldset('配偶收入分擔',p.n);S.money+=inc;ldset('配偶份生活與家庭開支',p.n);S.money-=cost;ldset(null);
  if(!p.fl){p.fl=1;log(`${p.n}（${p.job}）與你共同生活：分擔收入約 ${money(inc)}、家庭支出增加約 ${money(cost)}／年（估算）。`)}}
}
const _lc=livingCost;
livingCost=function(){return Math.round(_lc()*[.9,1,1.12][S.diff==null?1:S.diff])};
function diffYear(){
 const d=S.diff==null?1:S.diff;
 if(d===0){S.stress=cl(S.stress-4);if(S.age<60)chg('health',1)}
 else if(d===2){S.stress=cl(S.stress+3);if(S.age>40)chg('health',-1)}
}
function histYear(){
 S.hs=S.hs||[];S.hs.push({a:S.age,w:Math.round(netWorth()/1e4),h:S.happy,s:S.stress,n:S.net,hp:S.health});if(S.hs.length>110)S.hs.shift();
}
function jealYear(){
 const p=S.partner;if(!p)return;
 p.jel=cl((p.jel||0)+(S.crush.some(c=>c.aff>=45)?12:-6));
 if(p.jel>=60){p.tru=cl(trv(p)-4)}
 else if(p.rel>=60&&p.jel<20)p.tru=cl(trv(p)+1);
}
const _relYear2=relYear;
relYear=function(){_relYear2();npcYear();diffYear();jealYear();histYear()};

/* ---- 教學與玩法說明 ---- */
const TUT=[
 '按「年齡 +1」過一年，系統會隨機出事件，依你的想法選擇。分頁：💼職業、👪關係（家人、朋友、戀愛）、🏠資產、☰更多。',
 '健康靠運動、健檢和看醫生維持；壓力高會傷身（更多 → 身心健康、健康醫療）。戀愛與朋友要花行動點經營。',
 '金額皆以 2026 年幣值估算，部分為遊戲簡化。祝你有個精彩的人生！'];
function tutorial(i){
 i=i||0;
 if(i>=TUT.length){lsSet('lifesim_tw_tut',1);return}
 ask(`（${i+1}／${TUT.length}）${TUT[i]}`,[i===TUT.length-1?'開始人生！':'下一步 ▶','略過教學'],k=>{if(k===1){lsSet('lifesim_tw_tut',1);return}tutorial(i+1)});
}
function helpHTML(){return `<h3>❓ 玩法說明</h3>`+TUT.map((t,i)=>`<div class="item"><b>${i+1}.</b> ${esc(t)}</div>`).join('')+`<div class="item"><b>難度</b><div class="sub">目前：${['休閒（生活費 −10%、較少壓力）','寫實','地獄（生活費 +12%、壓力與健康衰退加重）'][S.diff==null?1:S.diff]}。開新局時可選擇。</div></div><button class="btn" data-a="back">← 返回</button>`}

/* ---- 年度回顧圖 ---- */
function revHTML(){
 const hs=S.hs||[];if(hs.length<2)return `<h3>📈 年度回顧</h3><p class="sub">至少度過兩年後才會有圖表。</p><button class="btn" data-a="back">← 返回</button>`;
 const W=340,H=130,P=6,x=i=>P+i*(W-2*P)/Math.max(1,hs.length-1);
 const line=(k,c,mx,mn)=>{const lo=mn==null?0:mn,hi=mx;return `<polyline fill="none" stroke="${c}" stroke-width="2" points="${hs.map((p,i)=>x(i).toFixed(1)+','+(H-P-(Math.max(lo,Math.min(hi,p[k]))-lo)/(hi-lo||1)*(H-2*P)).toFixed(1)).join(' ')}"/>`};
 const wmax=Math.max(1,...hs.map(p=>p.w)),wmin=Math.min(0,...hs.map(p=>p.w));
 const svg=(b)=>`<svg viewBox="0 0 ${W} ${H}" style="width:100%;background:#fff;border:1px solid var(--line);border-radius:10px">${b}</svg>`;
 return `<h3>📈 年度回顧</h3><div class="sub">${hs[0].a}～${hs[hs.length-1].a} 歲</div><div class="sec">心情／壓力／健康／人脈（0–100）</div>`
 +svg(line('h','#d97706',100)+line('s','#64748b',100)+line('hp','#e11d48',100)+line('n','#c0553a',100))
 +`<div class="sub"><span style="color:#d97706">■快樂</span>　<span style="color:#64748b">■壓力</span>　<span style="color:#e11d48">■健康</span>　<span style="color:#c0553a">■人脈</span></div>`
 +`<div class="sec">淨資產（萬元，2026 年幣值）：最高 ${wmax.toLocaleString('en-US')}、最低 ${wmin.toLocaleString('en-US')}</div>`+svg(line('w','#2563eb',wmax,wmin))
 +`<button class="btn" data-a="back">← 返回</button>`;
}
const _life=lifeHTML;
lifeHTML=function(){const s=view.lsub;if(s==='help')return helpHTML();if(s==='rev')return revHTML();return _life()};

/* ---- 更多選單分組 ---- */
moreHTML=function(){
 const G_=[['人生',[['rom','💘','戀愛與人脈','攻略・劇情・告白'],['lfmind','🧠','身心健康','壓力・憂鬱・成癮'],['lfach','🏆','成就與結局','目標・圖鑑'],['lftree','🌳','家族史','世代・配偶・子女'],['lfrev','📈','年度回顧','心情・資產曲線']]],
  ['生活與家庭',[['act','🎯','活動','讀書、運動、旅行'],['rel','🏫','家庭與子女','天賦・升學・贈與'],['lfpol','📰','社會與政策','基本工資・補助・同婚']]],
  ['工作與財務',[['job','💼','職業','求職・創業'],['ast','🏠','資產與投資','房車・股票・黃金'],['eco','📊','經濟儀表板','景氣・物價・歷史'],['cn','🌏','移民與匯率','簽證・外匯'],['lg','📜','傳承','遺囑・信託・遺產稅']]],
  ['其他',[['lfhelp','❓','玩法說明','教學・難度']]]];
 const a=k=>k==='rom'?'rom:go:h':k.startsWith('lf')?'lf:'+k.slice(2):'open:'+k;
 return '<h3>☰ 更多功能</h3>'+G_.map(([t,L])=>`<div class="sec">${t}</div><div class="grid">`+L.map(([k,i,n,d])=>`<button class="tile" data-a="${a(k)}"><b>${i}</b>${n}<small>${d}</small></button>`).join('')+'</div>').join('');
};
