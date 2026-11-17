const E=[
{id:'bully',min:6,max:15,w:3,run:()=>({t:'有同學一直找你麻煩，你要怎麼辦？',c:[
 ch('打回去',()=>{if(chance(.5)){chg('happy',5);return G('你贏了，同學不敢再惹你。')}chg('health',-8);chg('happy',-6);return B('你被打得很慘，還被叫去訓導處。')}),
 ch('告訴老師',()=>{chg('happy',2);return N('老師處理了這件事，情況改善了一些。')}),
 ch('默默忍耐',()=>{chg('happy',-6);return B('你忍了下來，心情很差。')})]})},
{id:'cheat',min:9,max:18,w:2,if:()=>!!S.school,run:()=>({t:'段考時，隔壁同學的答案就在你眼前。',c:[
 ch('偷看答案',()=>{if(chance(.4)){chg('happy',-8);S.grade=cl(S.grade-10);return B('你被監考老師抓到，成績被扣分。')}S.grade=cl(S.grade+8);return N('你沒被發現，成績變好了。')}),
 ch('誠實作答',()=>{chg('smarts',1);S.karma=cl(S.karma+3);return G('你靠自己的實力完成考試。')})]})},
{id:'pet',min:6,max:18,w:2,if:()=>!S.flags.pet,run:()=>({t:'家人問你想不想養寵物。',c:[
 ch('養狗',()=>{S.flags.pet='狗';chg('happy',8);chg('health',2);return G('你養了一隻柴犬，每天都很開心。')}),
 ch('養貓',()=>{S.flags.pet='貓';chg('happy',8);return G('你養了一隻橘貓，牠成了你的小主人。')}),
 ch('不養',()=>N('你覺得照顧寵物太麻煩了。'))]})},
{id:'cram',min:8,max:17,w:2,if:()=>!!S.school,run:()=>({t:'爸媽想幫你報名補習班。',c:[
 ch('乖乖去補習',()=>{chg('smarts',R(2,5));chg('happy',-4);S.grade=cl(S.grade+6);return N('你的成績進步了，但放學後沒什麼自由。')}),
 ch('拒絕',()=>{chg('happy',3);return N('你把時間拿去玩，爸媽有點失望。')})]})},
{id:'friend',min:5,max:70,w:3,run:()=>{const f=newFriend(),n=f.n;S.friends.push(f);chg('happy',4);return G(`你交到了新${f.kind}${n}（${f.tr}）。`)}},
{id:'skip',min:13,max:18,w:2,if:()=>!!S.school,run:()=>({t:'同學約你一起翹課去網咖。',c:[
 ch('一起去',()=>{if(chance(.4)){S.grade=cl(S.grade-8);chg('happy',-3);return B('你被教官抓到，記了一支警告。')}chg('happy',6);return N('你們玩得很開心。')}),
 ch('拒絕',()=>{chg('smarts',1);return N('你乖乖上課。')})]})},
{id:'smoke',min:14,max:30,w:2,if:()=>!S.flags.smoker,run:()=>({t:'朋友遞給你一根菸。',c:[
 ch('試一根',()=>{if(chance(.5)){S.flags.smoker=1;chg('health',-6);return B('你上癮了，健康每年都會受損。')}chg('health',-2);return N('你咳得很慘，決定不再碰。')}),
 ch('拒絕',()=>{chg('health',1);return G('你婉拒了，朋友也沒說什麼。')})]})},
{id:'parttime',min:15,max:22,w:2,if:()=>!!S.school,run:()=>({t:'便利商店在徵工讀生。',c:[
 ch('去打工',()=>{S.money+=R(60000,120000);chg('happy',-2);S.grade=cl(S.grade-3);return N('你賺到了零用錢，但成績稍微下滑。')}),
 ch('專心讀書',()=>{S.grade=cl(S.grade+3);return N('你把時間用在功課上。')})]})},
{id:'game',min:10,max:30,w:2,run:()=>({t:'你最近沉迷線上遊戲，常常熬夜。',c:[
 ch('戒掉',()=>{chg('happy',-3);chg('health',3);chg('smarts',2);return G('你下定決心戒掉了。')}),
 ch('繼續打',()=>{chg('happy',6);chg('health',-5);chg('smarts',-2);return B('你爽了一陣子，但作息大亂。')})]})},
{id:'loan',min:20,max:70,w:2,if:()=>S.friends.length>0,run:()=>{const f=pick(S.friends);return {t:`朋友${f.n}向你借 NT$50,000。`,c:[
 ch('借他',()=>{if(S.money<50000)return B('你自己都沒錢，沒辦法借。');S.money-=50000;if(chance(.6)){S.money+=50000;f.rel=cl(f.rel+10);return G('他很快還錢，感情更好了。')}f.rel=cl(f.rel-25);return B('他一直沒還錢，還開始躲你。')}),
 ch('拒絕',()=>{f.rel=cl(f.rel-8);return N('你婉拒了，他有點不高興。')})]}}},
{id:'scam',min:20,max:80,w:2,run:()=>({t:'你接到自稱「檢警」的電話，說你涉及洗錢，要你匯款。',c:[
 ch('照做',()=>{const l=R(100000,500000);S.money-=l;chg('happy',-15);return B(`你被詐騙了 ${money(l)}！`)}),
 ch('直接掛斷',()=>N('你覺得可疑，掛掉電話。')),
 ch('打 165 反詐騙專線',()=>{chg('happy',2);S.karma=cl(S.karma+2);return G('警察告訴你這是詐騙集團，你避開了損失。')})]})},
{id:'crash',min:18,max:80,w:2,run:()=>{const d=R(5,20);chg('health',-d);S.money-=R(5000,50000);chg('happy',-5);return B(`你騎車時發生車禍，健康 -${d}，還花了醫藥費。`)}},
{id:'sick',min:1,max:100,w:3,run:()=>{const d=R(3,9);chg('health',-d);return B('你得了重感冒，躺了好幾天。')}},
{id:'wbully',min:22,max:60,w:2,if:()=>!!S.job&&!S.job.founder,run:()=>({t:'主管總是把爛事丟給你，還當眾罵你。',c:[
 ch('頂回去',()=>{if(chance(.4)){S.job.perf=cl(S.job.perf+8);return G('主管被你唬住，之後收斂許多。')}S.job=null;chg('happy',-8);return B('你被叫去談話，隔天就被解僱了。')}),
 ch('默默承受',()=>{chg('happy',-8);chg('health',-3);return B('你忍氣吞聲，壓力很大。')}),
 ch('主動離職',()=>{S.job=null;chg('happy',5);return N('你遞出辭呈，決定重新出發。')})]})},
{id:'raise',min:22,max:60,w:2,if:()=>!!S.job&&!S.job.founder&&!S.job.var,run:()=>({t:'年終到了，你想向老闆爭取加薪。',c:[
 ch('開口要求',()=>{if(chance(S.job.perf/130)){S.job.sal=Math.round(S.job.sal*1.12);chg('happy',6);return G('老闆答應加薪 12%！')}chg('happy',-4);return B('老闆說公司最近不景氣，拒絕了你。')}),
 ch('不敢開口',()=>N('你什麼也沒說。'))]})},
{id:'startup',min:25,max:50,w:1,if:()=>S.money>=600000&&!S.flags.startup,run:()=>({t:'你有個創業點子，需要投入 NT$500,000。',c:[
 ch('放手一搏',()=>{S.flags.startup=1;S.money-=500000;if(chance(.35)){const g=R(2000000,8000000);S.money+=g;chg('happy',15);return G(`創業成功！你賺進 ${money(g)}。`)}chg('happy',-12);return B('公司撐不到一年就倒了，積蓄泡湯。')}),
 ch('穩穩上班',()=>N('你覺得風險太大，放棄了。'))]})},
{id:'lotto',min:18,max:100,w:1,run:()=>{const g=R(2000,50000);S.money+=g;chg('happy',4);return G(`你的統一發票中獎了，得到 ${money(g)}。`)}},
{id:'parentill',min:30,max:70,w:2,if:()=>S.mom.alive||S.dad.alive,run:()=>{const p=S.mom.alive?S.mom:S.dad;return {t:`你的${p.role}生了重病，需要人照顧。`,c:[
 ch('出錢請最好的醫療照護',()=>{S.money-=200000;p.rel=cl(p.rel+15);chg('happy',3);return G('你盡了全力，家人都很感謝你。')}),
 ch('只能盡量抽空探望',()=>{p.rel=cl(p.rel-5);chg('happy',-5);return N('你很忙，心裡有些愧疚。')})]}}},
{id:'trip',min:20,max:65,w:2,if:()=>S.friends.length>0,run:()=>({t:'朋友揪你一起出國玩，要花 NT$40,000。',c:[
 ch('出發',()=>{if(S.money<40000)return B('你的錢不夠，只好作罷。');S.money-=40000;chg('happy',12);return G('旅行超開心，留下很多回憶。')}),
 ch('不去',()=>N('你選擇留在家。'))]})},
{id:'midlife',min:40,max:50,w:2,run:()=>({t:'你進入中年，突然覺得人生好像少了點什麼。',c:[
 ch('買輛跑車犒賞自己（NT$800,000）',()=>{if(S.money<800000)return B('你的錢不夠買。');S.money-=800000;chg('happy',12);return N('你開著新車兜風，爽了一陣子。')}),
 ch('重新規劃人生',()=>{chg('happy',5);chg('smarts',2);return G('你開始學新東西，感覺充實。')}),
 ch('繼續撐著',()=>{chg('happy',-5);return N('日子照舊，但你有點迷惘。')})]})},
{id:'fight',min:20,max:80,w:2,if:()=>!!S.partner,run:()=>({t:`你和${S.partner.n}因為小事吵了一架。`,c:[
 ch('先道歉',()=>{S.partner.rel=cl(S.partner.rel+6);return G('你們很快和好了。')}),
 ch('冷戰',()=>{S.partner.rel=cl(S.partner.rel-15);chg('happy',-4);return B('冷戰讓感情降溫。')})]})},
{id:'wallet',min:8,max:90,w:1,run:()=>({t:'你在路上撿到一個裝有現金的皮夾。',c:[
 ch('交給警察',()=>{S.karma=cl(S.karma+6);chg('happy',4);return G('失主很感謝你。')}),
 ch('偷偷收下',()=>{S.money+=R(3000,20000);S.karma=cl(S.karma-6);return N('你拿走了裡面的現金。')})]})},
{id:'grand',min:55,max:100,w:3,if:()=>S.kids.some(k=>k.age>=25),run:()=>{chg('happy',8);return G('你的孫子來看你，家裡很熱鬧。')}},
{id:'quake',min:3,max:100,w:1,run:()=>{chg('happy',-3);return N('花蓮外海發生地震，全台搖晃，你嚇了一跳。')}},
{id:'typhoon',min:6,max:100,w:2,run:()=>{chg('happy',3);return N('颱風來了，放了一天颱風假。')}},
{id:'stock',min:20,max:80,w:2,if:()=>S.money>=300000,run:()=>({t:'朋友推薦你一檔飆股，要投入 NT$100,000。',c:[
 ch('投資',()=>{if(chance(.45)){const g=R(80000,250000);S.money+=g;chg('happy',6);return G(`你賺了 ${money(g)}。`)}const l=R(50000,100000);S.money-=l;chg('happy',-6);return B(`套牢！你賠了 ${money(l)}。`)}),
 ch('不碰',()=>N('你覺得風險太高。'))]})},
{id:'reunion',min:25,max:60,w:1,run:()=>({t:'有同學辦同學會。',c:[
 ch('參加',()=>{chg('happy',R(-3,9));return N('你和老同學聊了很多往事。')}),
 ch('不去',()=>N('你覺得沒必要。'))]})}
];
