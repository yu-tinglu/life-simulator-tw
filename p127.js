/* ---- p127：人生目標進度、後果鏈、每日挑戰、長期人物、收集進度 ---- */
const g127=()=>{S.cq=S.cq||[];S.npc=S.npc||{};S.gms=S.gms||{};return S};
/* === 1. 人生目標：更多目標、進度條、里程碑 === */
GOALS.push({id:'famous',n:'🌟 成為名人',d:'名聲達 60'},{id:'social',n:'🤝 交遊廣闊',d:'人脈 80、朋友 8 位以上'},{id:'long',n:'🧓 長壽健康',d:'活到 90 歲且健康 50 以上'});
const _gk127=goalOK;
goalOK=function(){
 const g=S.goal;
 if(g==='famous')return typeof fmGet==='function'&&fmGet()>=60;
 if(g==='social')return (S.net||0)>=80&&(S.friends||[]).length>=8;
 if(g==='long')return S.age>=90&&S.health>=50;
 return _gk127.apply(this,arguments);
};
function goalProg(){
 const g=S.goal;if(!g)return 0;const c=x=>Math.max(0,Math.min(1,x));let v=0;
 try{
  if(g==='wealth')v=netWorth()/3e7;
  else if(g==='family')v=(S.partner&&S.partner.married?.34:S.partner?.12:0)+c(S.kids.length/2)*.33+(S.partner?c(S.partner.rel/60)*.33:0);
  else if(g==='career')v=(S.co&&S.co.stage>=2)||(S.arcD131&&S.arcD131.some(x=>x.hi))?1:S.job?c(S.job.lv/3):0;
  else if(g==='scholar')v=S.edu/6;
  else if(g==='calm')v=c(S.age/50)*(c((70-(S.stress||0))/35)*.5+c(S.happy/75)*.5);
  else if(g==='kind')v=(S.karma||0)/75;
  else if(g==='famous')v=fmGet()/60;
  else if(g==='social')v=(c((S.net||0)/80)+c((S.friends||[]).length/8))/2;
  else if(g==='long')v=c(S.age/90)*(S.health>=50?1:.7);
 }catch(e){}
 return S.flags&&S.flags.goalDone?1:c(v);
}
const _ay127=achYear;
achYear=function(){
 const r=_ay127.apply(this,arguments);
 try{
  g127();
  if(S.goal&&!S.flags.goalDone){const p=goalProg(),G=GOALS.find(x=>x.id===S.goal);
   [25,50,75].forEach(m=>{if(p*100>=m&&!S.gms[S.goal+m]){S.gms[S.goal+m]=1;log(`🎯 人生目標「${G.n.replace(/^\S+\s/,'')}」進度 ${m}%。`,'good')}})}
  const left=achLeft();
  if(left.length>0&&left.length<=3&&!S.flags.achNudge){S.flags.achNudge=1;log(`🏆 成就快集滿了，只差 ${left.length} 個：${left.map(x=>x[1].replace(/^\S+\s/,'')).join('、')}。`,'')}
 }catch(e){}
 return r;
};
function achLeft(){const got=lsGet(ACHK,{});return ACH.filter(a=>!got[a[0]])}
/* === 2. 後果鏈：選擇會在幾年後回來 === */
const cqAdd=(id,yrs,d)=>{g127();S.cq.push({id,due:S.age+yrs,d:d||{}})};
const cqDue=id=>{g127();return S.cq.find(x=>x.id===id&&x.due<=S.age)};
const cqTake=id=>{const i=S.cq.findIndex(x=>x.id===id&&x.due<=S.age);return i<0?null:S.cq.splice(i,1)[0]};
const cqHas=id=>{g127();return S.cq.some(x=>x.id===id)};
const fn127=()=>pick(['小傑','阿明','志豪','怡君','雅婷','建宏','家豪','淑芬']);
/* 借錢給朋友 */
E.push({id:'cq_loan',min:23,max:55,w:3,if:()=>(S.friends||[]).length>=1&&S.money>=px(400000)&&!cqHas('loan'),run:()=>{const n=fn127(),a=Math.round(px(R(200,500)*1000)/1000)*1000;return {t:`朋友${n}說生意周轉不靈，想跟你借 ${money(a)}。`,c:[
 ch('借他',()=>{S.money-=a;cqAdd('loan',R(3,8),{n,a});return N(`你把錢轉給${n}，他說一定會還。`)}),
 ch('只借一半',()=>{S.money-=Math.round(a/2);cqAdd('loan',R(3,8),{n,a:Math.round(a/2)});return N(`你借了一半，${n}說已經很感激。`)}),
 ch('婉拒',()=>{chg('happy',-1);return N(`你說最近手頭也緊，${n}沒再多說什麼。`)})]}}});
E.push({id:'cqf_loan',min:23,max:80,w:60,if:()=>!!cqDue('loan'),run:()=>{const s=cqTake('loan'),n=s.d.n,a=s.d.a,r=Math.random();
 if(r<.4)return {t:`${n}突然聯絡你，說當年的錢終於可以還了，還多包了一份心意。`,c:[ch('收下',()=>{S.flags.loanOK=1;S.money+=Math.round(a*1.2);chg('happy',5);return G(`連本帶利收回 ${money(Math.round(a*1.2))}，你們喝了一整晚的酒。`)}),ch('只收本金',()=>{S.flags.loanOK=1;S.money+=a;S.karma=cl((S.karma||50)+3);return G('你只收回本金，這份交情更穩了。')})]};
 if(r<.65)return {t:`${n}的事業做起來了，他回來還錢，還邀你入股新事業。`,c:[ch('入股',()=>{S.money+=a;const x=Math.round(a*(chance(.6)?3:-.5));S.money-=a;S.money+=x>0?x:0;chg('happy',3);return x>0?G(`${n}的公司成長得很好，你分到 ${money(x)}。`):B('新事業沒撐過去，你投進去的錢拿不回來。')}),ch('只拿回本金',()=>{S.money+=a;return N('你覺得穩穩的就好。')})]};
 return {t:`${n}早就換了電話，你再也聯絡不上，那筆錢像石沉大海。`,c:[ch('算了，當作買個教訓',()=>{chg('happy',-3);S.karma=cl((S.karma||50)+1);return B('你不再提這件事，只是之後對借錢謹慎多了。')}),ch('託人打聽',()=>{if(chance(.3)){S.money+=Math.round(a*.5);return N('輾轉聽到消息，他還了一半。')}chg('happy',-2);return B('沒有任何消息。')})]}}});
/* 資助清寒學生 */
E.push({id:'cq_mentee',min:28,max:60,w:3,if:()=>S.money>=px(300000)&&!cqHas('mentee'),run:()=>({t:'你在公益活動認識一位成績很好、家境清寒的學生，他可能得放棄升學。',c:[
 ch('長期資助他（每年一點）',()=>{S.money-=Math.round(px(120000));S.karma=cl((S.karma||50)+4);cqAdd('mentee',R(8,14),{});chg('happy',3);return G('你答應資助他到畢業，他紅著眼睛說會記得。')}),
 ch('介紹獎學金機構',()=>{cqAdd('mentee',R(8,14),{});return N('你幫他找到幾個管道，之後就沒有聯絡。')}),
 ch('婉拒',()=>N('你覺得自己的責任不在這裡。'))]})});
E.push({id:'cqf_mentee',min:35,max:85,w:60,if:()=>!!cqDue('mentee'),run:()=>{cqTake('mentee');const r=Math.random();
 return {t:r<.7?'一封信寄到你手上：當年那位學生已經是醫師／工程師，他說自己的人生是從那一年改變的。':'你收到一張卡片，是當年那位學生寄來的，他說他現在也開始幫助別人。',c:[ch('回信祝福',()=>{S.flags.menteeOK=1;chg('happy',8);S.karma=cl((S.karma||50)+3);try{fmAdd(1)}catch(e){}return G('你把信收進抽屜，每次心情不好都拿出來看。')}),ch('邀他吃頓飯',()=>{S.flags.menteeOK=1;chg('happy',10);S.net=cl((S.net||0)+2);return G('他把你介紹給他的朋友，你的人脈圈多了一群年輕人。')})]}}});
/* 作弊／抄襲 */
E.push({id:'cq_cheat',min:14,max:22,w:3,if:()=>!!S.school&&!cqHas('cheat'),run:()=>({t:'期中考快到了，你的進度落後，同學遞來一份答案。',c:[
 ch('收下來用',()=>{if(chance(.3)){chg('happy',-6);S.grade=cl((S.grade||60)-10);return B('被老師抓到，記了一支警告，家人也很失望。')}chg('smarts',-1);cqAdd('cheat',R(10,20),{});S.grade=cl((S.grade||60)+6);return N('成績漂亮地過關了，但你一直記得這件事。')}),
 ch('拒絕，硬著頭皮考',()=>{chg('happy',-1);S.smarts=cl(S.smarts+1);S.karma=cl((S.karma||50)+2);return N('分數不好看，但你心安。')})]})});
E.push({id:'cqf_cheat',min:28,max:70,w:60,if:()=>!!cqDue('cheat')&&!!S.job,run:()=>{cqTake('cheat');return {t:'老同學在聚會上無意間提到當年「幫你一把」的事，旁邊坐著你的主管。',c:[
 ch('坦白承認並道歉',()=>{if(chance(.7)){S.karma=cl((S.karma||50)+3);return N('主管笑笑說誰沒有年輕過，反而覺得你誠實。')}S.stress=cl(S.stress+5);return B('氣氛很尷尬，之後主管對你有點保留。')}),
 ch('矢口否認',()=>{if(chance(.5)){S.stress=cl(S.stress+8);chg('happy',-5);try{fmAdd(-2)}catch(e){}return B('有人當場拿出證據，你的名聲受了影響。')}return N('大家笑著帶過去，但你的手心全是汗。')})]}}});
/* 投資朋友的店 */
E.push({id:'cq_shop',min:24,max:55,w:3,if:()=>(S.friends||[]).length>=1&&S.money>=px(600000)&&!cqHas('shop'),run:()=>{const n=fn127(),a=Math.round(px(R(300,600)*1000)/1000)*1000;return {t:`朋友${n}想開一間咖啡店，邀你一起出資 ${money(a)}。`,c:[
 ch('入股',()=>{S.money-=a;cqAdd('shop',R(4,8),{a,n});chg('happy',2);return N(`你成了${n}的合夥人，開幕那天店裡擠滿了人。`)}),
 ch('給一點祝福金就好',()=>{S.money-=Math.round(a*.1);return N('你包了個紅包，祝他生意興隆。')}),
 ch('不參與',()=>N('你覺得餐飲業太辛苦了。'))]}}});
E.push({id:'cqf_shop',min:28,max:80,w:60,if:()=>!!cqDue('shop'),run:()=>{const s=cqTake('shop'),r=Math.random(),a=s.d.a,n=s.d.n;
 if(r<.3)return {t:`${n}的咖啡店開了第三間分店，要你決定要不要再加碼。`,c:[ch('加碼',()=>{S.money-=Math.round(a*.5);if(chance(.6)){S.money+=Math.round(a*3.5);return G('品牌做起來了，你分到一筆可觀的分紅。')}return B('擴張太快，資金鏈出了問題，加碼的錢泡湯了。')}),ch('維持原股份',()=>{S.money+=Math.round(a*1.6);return G(`這幾年的分紅加起來，已經比當初投入的多 ${money(Math.round(a*.6))}。`)})]};
 if(r<.65)return {t:`${n}說店面租約到期，生意只夠打平，問你要繼續還是退出。`,c:[ch('撤資',()=>{S.money+=Math.round(a*.7);return N('你拿回了七成，友情還在。')}),ch('繼續撐',()=>{if(chance(.5)){S.money+=Math.round(a*1.5);return G('撐過寒冬後生意慢慢好轉。')}chg('happy',-3);return B('最後還是關店，你血本無歸。')})]};
 return {t:`${n}的咖啡店結束營業了，他很不好意思地來見你。`,c:[ch('安慰他，沒關係',()=>{chg('happy',-2);S.karma=cl((S.karma||50)+3);return N('你們一起吃了最後一餐，友情反而更深。')}),ch('心裡難免有疙瘩',()=>{chg('happy',-4);return B('你們漸漸少了聯絡。')})]}}});
/* 照顧鄰居老人 */
E.push({id:'cq_elder',min:25,max:60,w:3,if:()=>!cqHas('elder'),run:()=>({t:'隔壁獨居的老人好幾天沒出門，你敲門才發現他不太舒服。',c:[
 ch('陪他去看醫生，之後常去探望',()=>{S.stress=cl(S.stress+2);S.karma=cl((S.karma||50)+4);cqAdd('elder',R(5,12),{});return G('他的子女不在身邊，你成了他最信任的人。')}),
 ch('幫忙叫救護車就好',()=>{S.karma=cl((S.karma||50)+1);return N('你確定他被送上救護車才回家。')}),
 ch('覺得不好介入',()=>N('你默默關上門，但一整晚心裡都不安。'))]})});
E.push({id:'cqf_elder',min:30,max:90,w:60,if:()=>!!cqDue('elder'),run:()=>{cqTake('elder');const big=chance(.25);return {t:big?'老人的律師聯絡你：他在遺囑裡留了一筆財產給你。':'老人的子女回國處理後事，特地來向你道謝，說父親常提起你。',c:[ch(big?'心懷感謝收下':'陪他們整理遺物',()=>{if(big){S.money+=Math.round(px(R(500,1500)*1000));chg('happy',3)}else chg('happy',4);S.karma=cl((S.karma||50)+3);return G(big?'你把一部分捐給了社區關懷協會，替他完成心願。':'你留下他送你的一個舊茶杯，每次用都想起他。')})]}}});
/* === 3. 家族成就（依世代）=== */
const FT127=[[2,'第二代','你的人生由下一代接續'],[3,'三代傳承','家族傳到第三代'],[5,'五代同堂','五個世代的故事'],[8,'百年家族','八個世代的家族']];
function famHTML(){
 const gn=S.gen||1,hist=S.hist||[];
 return `<div class="sec op">家族成就（目前第 ${gn} 代）</div>`+FT127.map(([n,t,d])=>`<div class="item"><b>${gn>=n?'✓':'○'} ${t}</b><div class="sub">${d}${gn>=n?'':`（還差 ${n-gn} 代）`}</div></div>`).join('')+(hist.length?`<div class="sub" style="margin-top:6px">已傳承的前代：${hist.map(x=>esc(x.name)).join('、')}</div>`:'');
}
/* === 4. 每日挑戰（同一組種子，本機排行榜）=== */
const DLK='lifesim_daily_v1',_rnd127=Math.random.bind(Math);
const dlDate=()=>{const d=new Date();return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()};
function mulb(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function dlStart(){
 const seed=dlDate();Math.random=mulb(seed);
 newGame('',Math.random()<.5?'男':'女');
 try{S.ori=oriPick('隨機')}catch(e){}
 S.daily=seed;$('sheet').classList.remove('on');$('start').classList.remove('on');render();save();
 toast('今日挑戰開始：'+seed);
}
function dlEnd(){
 if(S&&S.daily&&!S.dlDone){S.dlDone=1;const b=lsGet(DLK,[]);b.push({d:S.daily,s:score(),a:S.age,n:S.name});lsSet(DLK,b.slice(-60))}
 Math.random=_rnd127;
}
const _se127=showEnd;
showEnd=function(){try{dlEnd()}catch(e){}return _se127.apply(this,arguments)};
const _ss127=showStart;
showStart=function(){Math.random=_rnd127;return _ss127.apply(this,arguments)};
function dailyHTML(){
 const t=dlDate(),b=lsGet(DLK,[]),td=b.filter(x=>x.d===t).sort((p,q)=>q.s-p.s),all=b.slice().sort((p,q)=>q.s-p.s).slice(0,5);
 return `<h3>每日挑戰</h3><div class="sub">每天一組固定的出生與命運種子，玩到人生結束，比誰的人生分數高。排行榜只存在這支手機。</div>`
 +`<button class="btn p" data-a="lf:daily:go">開始今日挑戰（${t}）<small>會結束目前這局並重新投胎</small></button>`
 +`<div class="sec op">今日成績</div>`+(td.length?td.map(x=>`<div class="item"><b>${x.s} 分</b>　${esc(x.n)}・${x.a} 歲</div>`).join(''):'<div class="sub">今天還沒有完成的挑戰。</div>')
 +`<div class="sec op">歷史前五名</div>`+(all.length?all.map(x=>`<div class="item"><b>${x.s} 分</b>　${x.d}・${esc(x.n)}・${x.a} 歲</div>`).join(''):'<div class="sub">還沒有紀錄。</div>')
 +`<div class="sub" style="margin-top:8px">說明：種子只決定出生與隨機序列的起點，之後你的選擇不同，劇情就會分岔；讀檔後隨機序列也不會接續，所以分數是娛樂比較，不是嚴格公平的比賽。</div>`;
}
/* === 5. 長期人物：宿敵、導師、老同學 === */
const npcN=()=>fullName(pick(['男','女']),S.byear||2000);
const NP=()=>{g127();return S.npc};
E.push({id:'np_r0',min:8,max:13,w:5,if:()=>!NP().rival&&!!S.school,run:()=>{const n=npcN();return {t:`班上轉來一位同學${n}，成績幾乎和你不相上下，老師常把你們放在一起比較。`,c:[
 ch('友善地跟他交朋友',()=>{NP().rival={n,s:0,t:'友'};chg('happy',3);return G(`你和${n}一起討論題目，也成了競爭對手。`)}),
 ch('暗自較勁',()=>{NP().rival={n,s:0,t:'敵'};S.smarts=cl(S.smarts+2);S.stress=cl(S.stress+3);return N(`你暗暗發誓一定要贏過${n}。`)}),
 ch('不在意',()=>{NP().rival={n,s:0,t:'淡'};return N('你只做好自己的事。')})]}}});
E.push({id:'np_r1',min:15,max:19,w:30,if:()=>NP().rival&&NP().rival.s===0,run:()=>{const r=NP().rival;return {t:`升學考試放榜，你查了成績，也聽說${r.n}的結果。`,c:[
 ch('傳訊息恭喜他',()=>{r.s=1;if(r.t==='敵')r.t='友';chg('happy',2);return G('他很驚訝，回了一長串謝謝。')}),
 ch('私下請教他怎麼準備',()=>{r.s=1;S.smarts=cl(S.smarts+1);return N('他把筆記借給你，你們的關係近了一些。')}),
 ch('不聯絡',()=>{r.s=1;return N('你把成績單收進抽屜。')})]}}});
E.push({id:'np_r2',min:24,max:38,w:30,if:()=>NP().rival&&NP().rival.s===1&&!!S.job,run:()=>{const r=NP().rival;return {t:`你在一場業界活動遇到${r.n}，他現在在同一個領域，還是你的競爭對手。`,c:[
 ch('提議合作',()=>{r.s=2;if(chance(r.t==='敵'?.4:.7)){S.money+=Math.round(S.job.sal*.2);chg('happy',4);return G('兩人合作的案子成果很好，各自都有了名聲。')}return N('合作有一些磨擦，但結果不差。')}),
 ch('良性競爭',()=>{r.s=2;S.stress=cl(S.stress+3);S.job.perf=(S.job.perf||50)+3;return N('你們互相逼著對方進步。')}),
 ch('保持距離',()=>{r.s=2;return N('你點頭致意就離開了。')})]}}});
E.push({id:'np_r3',min:45,max:68,w:30,if:()=>NP().rival&&NP().rival.s===2,run:()=>{const r=NP().rival;return {t:`多年過去，你聽說${r.n}生了一場大病，也有人說他事業跌到谷底。`,c:[
 ch('去探望他',()=>{r.s=3;chg('happy',6);S.karma=cl((S.karma||50)+4);return G('他握著你的手說，這輩子最想念的就是當年那個對手。')}),
 ch('捎一份心意就好',()=>{r.s=3;return N('你請人送了一籃水果。')}),
 ch('覺得與我無關',()=>{r.s=3;chg('happy',-2);return N('你轉頭做自己的事，卻偶爾想起那段年輕歲月。')})]}}});
E.push({id:'np_m0',min:22,max:42,w:5,if:()=>!NP().mentor&&!!S.job&&S.job.years>=1&&!S.job.founder,run:()=>{const n=npcN();return {t:`資深前輩${n}看到你的潛力，主動說可以帶你。`,c:[
 ch('虛心請教',()=>{NP().mentor={n,s:0};S.smarts=cl(S.smarts+2);S.job.perf=(S.job.perf||50)+4;chg('happy',3);return G(`${n}教你的不只是技術，還有怎麼跟人相處。`)}),
 ch('客氣地保持距離',()=>{NP().mentor={n,s:0,cold:1};return N('你覺得靠自己比較自在。')})]}}});
E.push({id:'np_m1',min:28,max:50,w:30,if:()=>NP().mentor&&NP().mentor.s===0&&!!S.job&&S.job.years>=5,run:()=>{const m=NP().mentor;return {t:`${m.n}要轉去一個新的計畫，問你要不要跟他一起走。`,c:[
 ch('跟著他',()=>{m.s=1;if(chance(m.cold?.35:.65)){S.job.sal=Math.round(S.job.sal*1.15);chg('happy',4);return G('新計畫成功了，你的薪水和位置都往上了一階。')}S.stress=cl(S.stress+4);return N('計畫不如預期，但你學到很多。')}),
 ch('留在原地',()=>{m.s=1;return N('你祝福他，也守住了現在的位置。')})]}}});
E.push({id:'np_m2',min:50,max:80,w:30,if:()=>NP().mentor&&NP().mentor.s===1,run:()=>{const m=NP().mentor;return {t:`你收到消息：${m.n}已經退休／過世，家屬邀請故舊一起來聚一聚。`,c:[
 ch('到場致意並分享受過的指點',()=>{m.s=2;chg('happy',5);S.karma=cl((S.karma||50)+2);S.net=cl((S.net||0)+1);return G('在場的人都說，你是他最得意的學生之一。')}),
 ch('心意到了，人不到',()=>{m.s=2;chg('happy',-1);return N('你寄了一份花籃。')})]}}});
[30,40,50].forEach(a=>E.push({id:'np_c'+a,min:a,max:a+1,w:40,if:()=>(NP().cm||0)<a,run:()=>{NP().cm=a;const rich=netWorth()>=1e7;return {t:'老同學聚會的通知來了，大家說好久不見。',c:[
 ch('出席',()=>{chg('happy',rich?4:3);S.net=cl((S.net||0)+2);if(chance(.2))return G('多年沒聯絡的老同學互相介紹了朋友，你認識了新夥伴。');return N('大家聊著當年的糗事，笑成一片。')}),
 ch('不去',()=>{chg('happy',-1);return N('你覺得現在的自己還沒準備好。')})]}}}));
/* === 6. 頁面：人生目標與收集 === */
function goalHTML(){
 const g=S.goal?GOALS.find(x=>x.id===S.goal):null,p=Math.round(goalProg()*100),got=lsGet(ACHK,{}),left=achLeft();
 let h=`<h3>人生目標</h3>`;
 h+=g?`<div class="item"><b>${g.n}</b><div class="sub">${g.d}</div><div class="bar" style="margin:6px 0"><i style="width:${p}%;background:#c0553a"></i></div><div class="sub">${S.flags.goalDone?'已達成':'進度 '+p+'%'}</div></div>`:'<div class="sub">還沒有目標。選一個，遊戲會幫你追蹤進度。</div>';
 h+=`<div class="sec op">${g?'更換目標':'選擇目標'}</div>`+GOALS.map(x=>`<button class="btn ${S.goal===x.id?'p':''}" data-a="lf:goal:set:${x.id}">${x.n}<small>${x.d}</small></button>`).join('');
 h+=`<div class="sec">成就收集（${ACH.length-left.length}／${ACH.length}）</div><div class="bar" style="margin:4px 0"><i style="width:${Math.round((ACH.length-left.length)/ACH.length*100)}%;background:#c0553a"></i></div>`+(left.length?`<div class="sub">還沒達成：${left.slice(0,8).map(x=>esc(x[1])).join('、')}${left.length>8?'…':''}</div>`:'<div class="sub">全部成就都收集完了。</div>');
 return h+famHTML();
}
const _lh127=lifeHTML;
lifeHTML=function(){if(view.lsub==='goal')return goalHTML();if(view.lsub==='daily')return dailyHTML();return _lh127.apply(this,arguments)};
const _lf127=lfHandle;
lfHandle=function(x,y,z,u){
 if(x==='goal'){if(y==='set'){if(S.flags.goalDone)return B('目標已經達成，不需要再換了。');S.goal=z;S.gms={};const G=GOALS.find(q=>q.id===z);return N(`你把人生目標改成：${G?G.n:z}。`)}return null}
 if(x==='daily'){if(y==='go'){ask('開始今日挑戰會結束目前這局，確定嗎？',['確定','取消'],c=>{if(c===0)dlStart()});return null}return null}
 return _lf127(x,y,z,u);
};
LSUBT.goal='人生目標';LSUBT.daily='每日挑戰';
const _mh127=moreHTML;
moreHTML=function(){
 const h=_mh127.apply(this,arguments);
 const t='<button class="tile" data-a="lf:goal"><b>標</b>人生目標<small>進度・成就收集・家族</small></button><button class="tile" data-a="lf:daily"><b>日</b>每日挑戰<small>固定種子・本機排行榜</small></button>';
 return h.replace(/(<button class="tile"[^>]*data-a="lf:ach"[^>]*>[\s\S]*?<\/button>)/,'$1'+t);
};
FT125.push(['紀錄與傳承','人生目標・成就收集進度','L:goal','','目標 進度 成就 家族'],['紀錄與傳承','每日挑戰・排行榜','L:daily','','挑戰 排行 種子 比分']);
NX125.push(
 ['goal0',()=>S.age>=12&&!S.goal,'還沒立人生目標？到「更多→人生目標」選一個，遊戲會追蹤進度。'],
 ['goal1',()=>S.goal&&!S.flags.goalDone&&goalProg()>=.5,'你的人生目標進度已過半，繼續加油。']
);
