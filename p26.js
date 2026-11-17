/* ---- 伏筆與回響、個性分歧選項、事件多樣化、家族互動、提示與數值來源 ---- */
/* ===== 文字多樣化 ===== */
const LOGVAR={
 '你得了重感冒，躺了好幾天。':()=>S.age<6?pick(['你發燒了，爸媽輪流抱著你，一夜沒睡。','你流鼻水、咳嗽，被帶去給小兒科醫生看。']):pick(['你重感冒發燒，在家躺了好幾天。','換季時你一下子倒下，昏昏沉沉睡了三天。','流感在身邊流行，你也沒逃過，請假休養。','你喉嚨痛到說不出話，只好吃藥早早睡。']),
 '花蓮外海發生地震，全台搖晃，你嚇了一跳。':()=>pick(['凌晨一陣搖晃把你驚醒，手機接連響起警報。','花蓮外海地震，書桌上的杯子在晃，你趕緊躲到桌下。','午後突然搖了起來，大家紛紛看向天花板的燈。']),
 '你整理了一疊統一發票，沒有中獎。':()=>pick(['你對了這期統一發票，一張都沒中。','你把發票對完，只有一張中了 200 元的末三碼。']),
 '春天媽祖遶境，你跟著人潮看了一晚熱鬧。':()=>pick(['媽祖遶境的鞭炮聲響徹整條街，你跟著人潮看熱鬧。','你在廟口排隊鑽轎底，吃了好多小吃。'])
};
function logV(t){const f=LOGVAR[t];return f?f():t}
/* ===== 回響（伏筆） ===== */
const ECHO=[ // [tag, 正則, 好壞傾向]
 ['dil',/努力|認真|讀書|補習|加班|堅持|存錢|準備|訓練|衝刺|進修/],
 ['help',/幫|捐|道歉|和解|原諒|陪|照顧|分擔|借你|體諒|孝|志工/],
 ['conf',/吵|報復|冷戰|罵|威脅|舉報|打人/],
 ['risk',/賭|借錢|貸款|偷|搶|(?<!反)詐騙|衝動消費|投資朋友/],
 ['soc',/社團|派對|聚會|認識|邀|參加|分享|演講/],
 ['exp',/旅行|嘗試|創業|探索|轉職|出國|遊學|創作/],
 ['calm',/冥想|放鬆|諮商|休息|冷靜|忍耐/]
];
function echoReg(label,evid){
 if(S.age<8||/^(r|hcal|army|illdec|careev|pcare|covid|age|story)/.test(evid||''))return;
 let tag=null;for(const [t,re] of ECHO)if(re.test(label)){tag=t;break}
 if(!tag)return;S.dl=S.dl||[];if(S.dl.length>=8||!chance(.3))return;
 later(R(3,9),'echo',{tag,label:label.replace(/（[^）]*）/g,'').slice(0,16),a0:S.age});
}
function echoRec(a,res,txt){S.echoes=S.echoes||[];S.echoes.push({a0:a.a0,a1:S.age,label:a.label,res,txt});if(S.echoes.length>12)S.echoes.shift()}
DLH.echo=a=>{
 const t=a.tag,pre=`【回響】${a.a0} 歲時你選擇了「${a.label}」，`;let m,res='good';
 if(t==='dil'){bump('s','tech',2);if(S.job&&!S.job.founder)S.job.perf=cl(S.job.perf+6);if(S.school)S.grade=cl(S.grade+5);chg('happy',3);m=pre+'那份堅持，今天成了你的底氣。'}
 else if(t==='help'){S.net=cl((S.net||0)+4);S.friends.forEach(f=>{if(chance(.4))f.rel=cl(f.rel+5)});chg('happy',3);m=pre+'有人記得這份情，在你需要的時候伸出了手。'}
 else if(t==='conf'){res='bad';S.stress=cl(S.stress+4);S.net=cl((S.net||0)-3);const f=S.friends.find(x=>x.rel>30);if(f)f.rel=cl(f.rel-6);m=pre+'那次的衝突還是在人際圈裡留下了痕跡。'}
 else if(t==='risk'){if(chance(.6)){res='bad';const l=R(30,200)*1000;S.money-=l;bump('s','fin',-1);m=pre+`後來這個習慣讓你損失了 ${money(l)}。`}else{const g=R(30,150)*1000;S.money+=g;m=pre+`運氣不錯，這次賺回了 ${money(g)}。`}}
 else if(t==='soc'){S.net=cl((S.net||0)+4);bump('p','ext',1);m=pre+'當年認識的人，如今成了你的人脈。'}
 else if(t==='exp'){bump('p','opn',2);chg('happy',4);if(chance(.4))S.refer=1;m=pre+'那份好奇心替你打開了一扇新的門。'}
 else{S.stress=cl(S.stress-6);bump('p','sta',2);m=pre+'讓你學會在風浪裡保持平靜。'}
 log(m,res);echoRec(a,res,m);
};
const _endInfo26=endInfo;
endInfo=function(){
 let h=_endInfo26();const e=(S.echoes||[]).slice(-6);
 if(e.length)h+=`<div class="sec">選擇的回響</div>`+e.map(x=>`<div class="item"><b>${x.a0} 歲 → ${x.a1} 歲</b><div class="sub">${esc(x.txt.replace(/^【回響】/,''))}</div></div>`).join('');
 return h;
};
/* ===== 個性分歧選項 ===== */
const TRX=[
 ['ext','用你的魅力與人緣化解',()=>{S.net=cl((S.net||0)+2);chg('happy',2);bump('s','comm',1);return G('你靠著好人緣，輕鬆化解了這件事。')}],
 ['con','列出計畫，一步一步處理',()=>{S.stress=cl(S.stress-3);bump('p','con',1);return G('你把事情條理分明地處理好了。')}],
 ['agr','先站在對方的立場溝通',()=>{[S.mom,S.dad].forEach(p=>{if(p&&p.alive)p.rel=cl(p.rel+1)});S.friends.forEach(f=>{f.rel=cl(f.rel+1)});bump('p','agr',1);return G('對方感受到你的誠意，氣氛緩和下來。')}],
 ['opn','換個完全不同的做法試試',()=>{chg('smarts',1);chg('happy',2);bump('p','opn',1);return G('你的新點子帶來了意想不到的結果。')}],
 ['sta','深呼吸，保持冷靜再決定',()=>{S.stress=cl(S.stress-6);bump('p','sta',1);return G('冷靜之後，你做出了不後悔的決定。')}]
];
function decorate(e,c){
 if(!S.pt||c.length<2||/^(r|hcal|army|illdec|careev|pcare|covid|age|story|creq|kreq)/.test(e.id||''))return c;
 let o=c.slice();
 const gate=[[/演講|上台|主動告白|搭訕/,S.pt.ext,30],[/辭職|創業|出國打拚/,S.pt.opn,25]];
 for(const [re,v,min] of gate){if(v<min){const f=o.filter(x=>!re.test(x.l));if(f.length>=2)o=f}}
 const hi=TRX.filter(x=>S.pt[x[0]]>=68);
 if(hi.length&&chance(.3)){const x=pick(hi);o.push(ch(`${x[1]}（${PTN.find(q=>q[0]===x[0])[1]}）`,x[2]))}
 return o;
}
next=function(){
 if(!queue.length)return endYear();
 const e=queue.shift();if(e.if&&!e.if())return next();const r=e.run();
 if(!r)return next();
 if(Array.isArray(r)){log(r[0],r[1]);return next()}
 if(r.custom){render();return r.custom(()=>{render();next()})}
 const cs=decorate(e,r.c);
 render();
 ask(r.t,cs.map(c=>c.l),i=>{
  log(r.t);const sn=fxSnap();labelFx(cs[i].l);echoReg(cs[i].l,e.id);const res=cs[i].f();if(res)log(res[0],res[1]);
  const fx=fxDiff(sn);if(fx)log('影響：'+fx,'fx');next();
 });
};
/* ===== 事件多樣化：幼年、狀態專屬、家族 ===== */
const fam=()=>S.mom&&S.mom.alive||S.dad&&S.dad.alive;
const CNYAGE=()=>S.age>=3;
E.push(
{id:'bfirst',min:1,max:2,w:4,run:()=>{chg('happy',3);return [pick(['你邁出了人生的第一步，爸媽拿著手機拍個不停。','你說出的第一個詞是「媽媽」，全家都樂壞了。','你第一次自己拿湯匙吃飯，弄得滿臉都是。']),'good']}},
{id:'bdaycare',min:2,max:3,w:3,run:()=>({t:'爸媽要上班，你要開始上托嬰中心／幼兒園了。',c:[ch('哭鬧不肯放手',()=>{S.stress=cl(S.stress+2);return N('老師輕聲安撫，你哭累了才睡著。')}),ch('好奇地東張西望',()=>{bump('p','opn',1);bump('p','ext',1);return G('你很快和別的小朋友玩在一起。')})]})},
{id:'bfever',min:1,max:5,w:2,run:()=>{chg('health',-R(1,4));return B(pick(['半夜發高燒，爸媽急著帶你去急診。','腸病毒流行，你長了滿嘴的口瘡，吃不下東西。']))}},
{id:'bgrand',min:1,max:6,w:3,run:()=>{chg('happy',R(2,5));return [pick(['阿公阿嬤來家裡，帶了一大袋你愛吃的零食。','週末去阿公阿嬤家，阿嬤煮了你最愛的菜。']),'good']}},
{id:'bparty',min:3,max:7,w:2,run:()=>({t:'你過生日，爸媽問你想怎麼慶祝。',c:[ch('邀同學來家裡開派對',()=>{S.net=cl((S.net||0)+2);bump('p','ext',1);chg('happy',R(4,7));return G('一屋子的小朋友鬧哄哄，你開心得不得了。')}),ch('全家出去吃大餐',()=>{[S.mom,S.dad].forEach(p=>{if(p&&p.alive)p.rel=cl(p.rel+3)});chg('happy',4);return G('一家人聚在一起，你吹了蠟燭。')}),ch('只想要一個大蛋糕',()=>{chg('happy',3);chg('health',-1);return N('你吃了好大一塊，滿足地睡著了。')})]})},
/* 狀態專屬 */
{id:'insomnia',min:22,max:80,w:3,if:()=>S.stress>=60,run:()=>({t:'壓力太大，你連續好幾天睡不著。',c:[ch('下班後去運動，流流汗',()=>{chg('health',2);S.stress=cl(S.stress-8);return G('運動後，你睡得很沉。')}),ch('滑手機到天亮',()=>{chg('health',-2);S.stress=cl(S.stress+3);return B('隔天精神很差，工作也沒效率。')}),ch('去看身心科',()=>{S.money-=1500;S.stress=cl(S.stress-10);return N('醫師開了藥，也提醒你要調整作息。')})]})},
{id:'coffee',min:22,max:60,w:3,if:()=>emp()&&S.pt&&S.pt.ext>=45,run:()=>({t:'同事約你下班後一起去喝一杯。',c:[ch('欣然參加，順便認識其他部門的人',()=>{S.net=cl((S.net||0)+3);S.money-=1200;bump('p','ext',1);return G('聊得很開心，也拓展了人脈。')}),ch('婉拒，回家休息',()=>{S.stress=cl(S.stress-2);return N('你早早回家，好好睡了一覺。')})]})},
{id:'promo',min:25,max:60,w:3,if:()=>emp()&&S.job.perf>=60,run:()=>({t:'主管問你有沒有興趣帶一個小專案。',c:[ch('接下來，負責到底',()=>{bump('s','lead',2);S.stress=cl(S.stress+6);S.job.perf=cl(S.job.perf+6);return G('專案順利完成，你獲得主管肯定。')}),ch('婉拒，專心做好目前工作',()=>{S.stress=cl(S.stress-2);return N('你維持平穩的步調。')})]})},
{id:'ot',min:22,max:60,w:3,if:()=>emp()&&S.stress<80,run:()=>({t:'專案趕交期，主管暗示大家今晚留下來加班。',c:[ch('留下來加班',()=>{const b=Math.round(dayWage()*R(5,15)/10);S.money+=b;S.stress=cl(S.stress+6);chg('health',-1);S.job.perf=cl(S.job.perf+3);return N(`你加班到深夜，領到加班費 ${money(b)}。`)}),ch('準時下班',()=>{S.job.perf=cl(S.job.perf-2);chg('happy',2);return N('你準時下班，主管臉色有點不悅。')}),ch('跟主管溝通排程',()=>{bump('s','comm',1);return G('主管調整了工作分配，大家都鬆了一口氣。')})]})},
{id:'reunion',min:28,max:70,w:2,run:()=>({t:'老同學辦了二十年的同學會。',c:[ch('參加，敘舊',()=>{S.net=cl((S.net||0)+3);chg('happy',R(3,6));S.money-=2000;return G('大家都變了，也有些人沒變，聊到半夜。')}),ch('不去，怕比較',()=>{bump('p','ext',-1);return N('你沒有去，後來看著照片有點悵然。')})]})},
{id:'pet',min:10,max:75,w:2,if:()=>!S.flags.pet,run:()=>({t:'路邊有一隻小貓一直跟著你。',c:[ch('收養牠',()=>{S.flags.pet=1;chg('happy',5);S.stress=cl(S.stress-5);S.money-=8000;return G('你多了一位毛小孩，每天回家都有人迎接。')}),ch('送去認養中心',()=>{bump('p','agr',1);return N('你替牠找到了新家。')}),ch('不管牠',()=>N('小貓很快走遠了。'))]})},
{id:'impulse',min:18,max:70,w:3,run:()=>({t:'網路購物節，你看到一堆限時特價。',c:[ch('衝動消費，通通買下去',()=>{const c=R(10,40)*1000;S.money-=c;chg('happy',4);bump('s','fin',-1);return N(`你下單了約 ${money(c)} 的東西，爽了一下。`)}),ch('比價後只買需要的',()=>{const c=R(2,8)*1000;S.money-=c;bump('s','fin',1);return G(`你只花了 ${money(c)}，買到真正需要的東西。`)}),ch('關掉不看',()=>{S.stress=cl(S.stress-1);return N('你關掉了網頁。')})]})},
/* 家族 */
{id:'cny',min:3,max:90,w:5,run:()=>{
 if(S.age<18){const g=Math.round({清寒:R(2,8),小康:R(5,20),富裕:R(15,50)}[S.fam]*1000);S.money+=g;chg('happy',3);return G(`過年領到壓歲錢，一共 ${money(g)}。`)}
 return {t:'過年到了，要包紅包給家人。',c:[ch('給爸媽和晚輩都包大一點',()=>{const c=R(20,60)*1000;S.money-=c;[S.mom,S.dad].forEach(p=>{if(p&&p.alive)p.rel=cl(p.rel+4)});chg('happy',3);return G(`你包了約 ${money(c)} 的紅包，全家都很開心。`)}),ch('包象徵性的就好',()=>{const c=R(6,15)*1000;S.money-=c;return N(`你包了約 ${money(c)} 的紅包。`)}),ch('今年手頭緊，下次補',()=>{[S.mom,S.dad].forEach(p=>{if(p&&p.alive)p.rel=cl(p.rel-2)});return B('長輩沒說什麼，但你有點過意不去。')})]}}},
{id:'relcmp',min:8,max:28,w:3,run:()=>({t:'過年時，親戚拿你和表哥的成績比較。',c:[ch('笑笑帶過',()=>{bump('p','sta',1);return N('你不放在心上。')}),ch('心裡不服，更努力讀書',()=>{S.stress=cl(S.stress+3);if(S.school)S.grade=cl(S.grade+4);bump('p','con',1);return N('你決定下學期要拚。')}),ch('當場頂嘴',()=>{[S.mom,S.dad].forEach(p=>{if(p&&p.alive)p.rel=cl(p.rel-3)});bump('p','agr',-1);return B('場面一度尷尬，爸媽事後念了你一頓。')})]})},
{id:'gvisit',min:6,max:40,w:2,run:()=>({t:'阿公阿嬤年紀大了，想念你。',c:[ch('回鄉探望，陪他們吃飯',()=>{chg('happy',4);bump('p','agr',1);S.money-=3000;return G('阿嬤拉著你的手說了好多話。')}),ch('太忙了，打電話問候',()=>N('他們很高興聽到你的聲音。'))]})},
{id:'gdie',min:20,max:50,w:2,if:()=>!S.flags.gdie,run:()=>{S.flags.gdie=1;S.stress=cl(S.stress+8);chg('happy',-6);S.money-=R(20,60)*1000;return [`阿嬤／阿公過世了，全家人回鄉奔喪${emp()?'（依勞基法，祖父母喪假 3 天，工資照給）':''}。`,'bad']}},
{id:'sibmoney',min:25,max:70,w:3,if:()=>S.friends.some(f=>f.sib),run:()=>{const f=S.friends.find(x=>x.sib);const a=R(5,30)*10000;
 return {t:`${f.n}向你開口，想借 ${money(a)} 週轉。`,c:[ch('借他，不用急著還',()=>{S.money-=a;f.rel=cl(f.rel+8);if(chance(.4)){S.money+=a;return G('他很快就還了，並說了好多感謝。')}return N('他一直沒提還錢的事，你也沒有開口。')}),ch('借一半，並說好還款日',()=>{S.money-=a/2;f.rel=cl(f.rel+3);return N('你們寫了借據，他按時還了。')}),ch('拒絕，說明自己也有難處',()=>{f.rel=cl(f.rel-8);return B('他有些失落，之後來往變少了。')})]}}},
{id:'sibdisp',min:30,max:80,w:3,if:()=>S.friends.some(f=>f.sib)&&(!S.mom.alive||!S.dad.alive),run:()=>{const f=S.friends.find(x=>x.sib);
 return {t:`爸媽走後，${f.n}對家產的分配有不同意見。`,c:[ch('讓一步，維持手足感情',()=>{S.money-=R(5,30)*10000;f.rel=cl(f.rel+10);bump('p','agr',1);return G('你們達成共識，感情沒有變壞。')}),ch('依法律平分',()=>{f.rel=cl(f.rel-3);return N('雖然有點僵，但程序公平。')}),ch('找律師主張權益',()=>{S.money-=R(10,30)*10000;f.rel=cl(f.rel-15);S.stress=cl(S.stress+8);return B('訴訟拖了一年，手足關係嚴重受傷。')})]}}}
);
/* ===== 伴侶個性與契合度 ===== */
function ppt(p){if(!p.pt){const A=ARCH[p.a]||{};p.pt={ext:R(25,80),agr:R(25,80),con:R(25,80),opn:R(25,80),sta:R(25,80)}}return p.pt}
function compat(p){const a=ppt(p),b=S.pt;let d=0;for(const k of ['ext','agr','con','opn'])d+=Math.abs(a[k]-b[k]);d=d/4;const st=Math.min(a.sta,b.sta);return Math.max(0,Math.min(100,Math.round(100-d*1.1+(st-50)*.3)))}
const _pp26=partnerPage;
partnerPage=function(){
 let h=_pp26();const p=S.partner;if(!p)return h;ppt(p);const c=compat(p);
 const add=`<div class="item"><b>個性契合度 ${c}</b>${bar5(c,'#c0553a')}<div class="sub">${PTN.map(([k,n])=>`${n} ${p.pt[k]}`).join('・')}<br>${c>=70?'你們很合得來。':c>=45?'有些差異，需要互相包容。':'個性差異大，相處需要多磨合。'}</div></div>`;
 return h.replace(/(<button class="btn" data-a="back">)/,add+'$1');
};
const _y26=yearly;
yearly=function(){
 _y26();
 if(S.partner){const c=compat(S.partner);S.partner.rel=cl(S.partner.rel+(c>=70?1:c<40?-2:0))}
};
/* ===== 這一年重點、數值來源 ===== */
function hintsList(){
 const L=[];mFix();
 if(S.stress>=70)L.push('壓力很高，試試冥想或放長假（更多 → 身心健康）');
 if(S.health<=35)L.push('健康偏低，去運動或看醫生');
 if((S.dep||0)>=60)L.push('憂鬱傾向偏高，可以考慮心理諮商');
 if((S.ill||[]).some(i=>!i.hid&&!i.cured&&!i.tx))L.push('有確診的疾病還沒開始治療（更多 → 健康醫療）');
 if(S.money<0)L.push('現金是負的，要小心利息與信用');
 if(emp()){const l=leaveEnt(S.job.years)-((S.lv&&S.lv.tu)||0);if(l>=5)L.push(`特休還剩 ${l} 天，年底沒休完會折發工資`)}
 if(S.age>=60&&S.age<65&&!S.flags.retired&&!(S.job&&S.job.founder))L.push('快到 65 歲退休年齡了');
 if(S.age>=3&&S.age<18&&!L.length)L.push('成長期：多運動、多讀書、多交朋友');
 return L.slice(0,2);
}
const _render26=render;
render=function(){
 _render26();
 if(!S||S.dead)return;
 const hs=hintsList(),el=$('stats');
 if(el&&el.insertAdjacentHTML&&hs.length)el.insertAdjacentHTML('beforeend',`<div class="hint" style="grid-column:1/-1">${hs.map(h=>`<span>${esc(h)}</span>`).join('')}</div>`);
 try{document.querySelectorAll('#stats .st').forEach((n,i)=>{n.onclick=()=>showWhy(STATS[i][0])})}catch(e){}
};
function whyLines(k){
 const L=[],a=S.age,P=S.pt,K=S.skl;
 if(k==='stress'){
  L.push(['每年自然舒緩','−3～−7']);if(S.job)L.push(['有工作','+3']);if(S.mort)L.push(['房貸','+2']);if(S.co)L.push(['經營公司','+3']);
  const ky=S.kids.filter(x=>x.age<7).length;if(ky)L.push(['年幼子女 '+ky+' 位','+'+Math.min(6,ky*3)]);if(S.happy>70)L.push(['心情很好','−2']);
  const sd=Math.round((P.sta-50)/12);if(sd)L.push([`情緒穩定 ${P.sta}`,(sd>0?'−':'+')+Math.abs(sd)]);
  if(S.addict)L.push(['成癮問題','偏高']);
 }else if(k==='health'){
  L.push(['年齡自然衰退',a<=30?'+1～+4':a<=40?'0～+2':a<=60?'−0～−1':a<=75?'−0～−2':'−1～−3']);
  if(K.fit>50)L.push([`體能 ${K.fit}`,'有機會 +1']);if(S.stress>=75)L.push(['壓力過高','過勞風險']);
  const ill=(S.ill||[]).filter(i=>!i.hid&&!i.cured);ill.forEach(i=>L.push([i.n+(i.tx?'（治療中）':'（未治療）'),i.tx?'衰退減緩':'每年下滑']));
  if(S.dis)L.push(['失能程度 '+S.dis,'需要照顧']);
 }else if(k==='happy'){
  L.push(['事件與選擇的結果','隨時變動']);if(P.opn>65)L.push([`開放 ${P.opn}`,'旅行與新事物更開心']);if(S.stress>=70)L.push(['壓力很高','容易低落']);if(S.partner)L.push(['有伴侶，關係 '+S.partner.rel,S.partner.rel>=60?'加分':'普通']);
  if(S.money<0)L.push(['現金是負的','擔心']);
 }else if(k==='smarts'){L.push(['讀書、進修、課程','提升']);if(P.opn>65)L.push([`開放 ${P.opn}`,'偶爾 +1']);}
 else if(k==='looks'){L.push(['護膚醫美、生活習慣','影響']);L.push(['年齡','緩慢變化']);}
 if(!L.length)L.push(['目前沒有特別因素','—']);
 return L;
}
function showWhy(k){
 const n=(STATS.find(x=>x[0]===k)||[k,k])[1];
 $('modalBody').innerHTML=`<h3>${esc(n)} ${S[k]}</h3><div class="sub">這項數值目前受這些因素影響：</div>`+whyLines(k).map(([a,b])=>`<div class="item row"><div style="flex:1">${esc(a)}</div><b>${esc(b)}</b></div>`).join('')+`<button class="btn p" id="whyc">知道了</button>`;
 $('modal').classList.add('on');$('whyc').onclick=()=>$('modal').classList.remove('on');
}
