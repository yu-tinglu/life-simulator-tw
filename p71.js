/* ---- p71：乙女系統擴充（劇情章節、更多互動、隨機事件、回憶相簿、網路交友整合）---- */
const CGK='lifesim_cg_v1';
function cgAll(){try{return JSON.parse(localStorage.getItem(CGK)||'[]')}catch(e){return []}}
function cgAdd(e){try{const a=cgAll(),i=a.findIndex(x=>x.a===e.a&&x.k===e.k);if(i<0)a.push(e);else if(e.q<a[i].q)a[i]=e;localStorage.setItem(CGK,JSON.stringify(a))}catch(x){}}
function onFix(o){
 if(!o)return;if(o.aff==null)o.aff=o.rel!=null?o.rel:40;
 if(!o.seen)o.seen={t:0,g:0,p:0,o:0};if(o.ch==null)o.ch=0;o.id='o';if(o.ok==null)o.ok=chance(.8);
 try{Object.defineProperty(o,'rel',{get(){return this.aff},set(v){this.aff=v},configurable:true,enumerable:false})}catch(e){}
}
const _tg71=tgtOf;tgtOf=k=>k==='o'?(S.on?(onFix(S.on),S.on):null):_tg71(k);
function otGet(k){return k==='p'?S.partner:k==='o'?(S.on?(onFix(S.on),S.on):null):S.crush[+k]}
const otAff=(t,k)=>(k==='p'?t.rel:t.aff);
function otAdd(t,k,d){const v=cl((k==='p'?t.rel:t.aff)+d);if(k==='p')t.rel=v;else t.aff=v;if(k==='p')t.lastI=S.age;else t.last=S.age;return d}
const otTone=d=>d>=0?'good':'bad';
/* ===== 劇情章節：每種個性 4 章，好感夠高才開放；選項順序隨機 ===== */
const OTREQ=[15,35,55,75];
const OTSTORY=[
[ // 溫柔學長姊型
 ['雨天的傘','下課時下起大雨，{N}撐著傘走到你面前：「一起走吧，你肩膀都濕了。」',['道謝，順便邀他去喝杯熱飲','你們在咖啡廳聊到雨停，氣氛很溫暖。'],['說不用麻煩，自己跑回去','{N}笑著點頭，眼神卻有點失落。'],['嫌太近，往旁邊躲','氣氛瞬間尷尬，{N}默默把傘收了起來。']],
 ['深夜的關心','你熬夜到很晚，{N}傳來訊息：「還沒睡嗎？別太勉強自己。」',['老實說最近壓力很大','{N}靜靜聽你說了一整晚，沒有打斷。'],['回說只是在忙','{N}說：「那我陪你到忙完。」'],['已讀不回','隔天{N}小心翼翼地問你是不是不開心。']],
 ['生日的蛋糕','{N}偷偷準備了小蛋糕：「想說你應該忘了自己的生日。」',['許願時看著{N}笑','{N}耳根微紅：「願望…可以說出來嗎？」'],['開心收下，分給大家','{N}笑著說：「喜歡就好。」'],['說自己不愛吃甜的','{N}的笑容僵了一下，把蛋糕默默收好。']],
 ['河堤的散步','{N}約你到河堤散步，欲言又止：「如果我說了任性的話，你會原諒我嗎？」',['會，只要是你說的','{N}輕輕鬆了口氣：「那我就安心了。」'],['看情況吧','{N}苦笑：「也是，我不該這樣問。」'],['岔開話題','{N}望著河面，沒有再說下去。']]],
[ // 傲嬌型
 ['便當事件','{N}把便當推過來：「多做的，才不是特地幫你準備的！」',['認真吃光並稱讚好吃','{N}別過臉，耳朵紅透了：「…算你識貨。」'],['說謝謝，但沒吃完','{N}哼了一聲：「浪費。」卻默默收走。'],['說你已經吃過了','{N}瞪你一眼：「那、那就算了！」']],
 ['雨中追逐','你把傘忘在教室，{N}氣喘吁吁追出來：「笨蛋！下雨還亂跑！」',['接過傘並一起撐','{N}小聲嘀咕：「…就這一次喔。」'],['笑他其實很緊張','{N}臉紅大吼：「才沒有！」'],['說不用你管','{N}愣住，轉身就走。']],
 ['誤會的告白','朋友起鬨說{N}喜歡你。{N}慌張地否認：「誰會喜歡你啊！」',['微笑說：我可是有點期待','{N}說不出話，整個人僵在原地。'],['順著說：我也開玩笑的','{N}鬆了口氣，卻又有點失望。'],['生氣地走開','{N}看著你的背影，拳頭握得很緊。']],
 ['不坦率的心意','{N}遞來一個小袋子：「撿到的…給你。」袋裡是你提過想要的東西。',['認真說：我知道是特地買的','{N}低下頭：「…笨蛋。」嘴角卻翹著。'],['開心收下道謝','{N}別過頭：「用壞了別怪我。」'],['說這種東西到處都有','{N}的表情瞬間冷下來：「…那還我。」']]],
[ // 霸道總裁型
 ['深夜加班','你加班到深夜，{N}把外套披在你肩上：「別逞強，我送你回去。」',['接受並說謝謝','車上很安靜，{N}低聲說：「以後別一個人撐。」'],['婉拒，自己搭車','{N}挑眉：「隨你，但我會看著你上車。」'],['說他管太多了','{N}沉默了幾秒：「…是我越界了。」']],
 ['高級餐廳','{N}訂了一間高級餐廳：「今晚我的時間都給你。」',['誠實說：我更想吃路邊攤','{N}愣了一下，竟然笑出來：「好，帶路。」'],['優雅地享用，說很好吃','{N}滿意地點頭：「你很上道。」'],['顯得拘謹，一直看菜單','{N}看出你不自在，語氣放軟了些，卻有點挫折。']],
 ['公開宣示','有人在聚會上對你出言不遜，{N}站到你面前：「他是我的人，你說話小心點。」',['握住{N}的手，說我自己也能應付','{N}看著你，眼神軟了下來：「…我知道。」'],['靠在{N}身後，享受保護','{N}輕笑：「這麼依賴我？」'],['尷尬地說別鬧大','{N}眉頭一皺：「你不需要忍耐。」']],
 ['示弱的一夜','{N}難得地露出疲態：「今晚…陪我一下，好嗎？」',['安靜陪在身邊，泡了杯茶','{N}低聲說：「謝謝你，沒有問為什麼。」'],['說些笑話讓他放鬆','{N}笑了笑：「你真是個麻煩的傢伙。」'],['說你明天還要早起','{N}點點頭：「嗯，是我強人所難了。」']]],
[ // 陽光運動型
 ['晨跑約定','{N}拍拍你的肩：「明天早上六點，一起跑步！我等你！」',['準時出現，還帶了水','{N}大笑：「太棒了！你是第一個準時的！」'],['遲到十分鐘','{N}邊暖身邊說：「沒關係，我們跑慢一點！」'],['睡過頭沒去','{N}傳訊息：「沒事！下次我去叫你起床！」，笑容卻淡了。']],
 ['球賽之後','比賽輸了，{N}坐在場邊沒有說話，毛巾蓋著頭。',['遞上飲料，坐在旁邊不說話','{N}悶聲說：「謝謝你…你在，我就好多了。」'],['大聲說下次一定贏','{N}抬頭笑了：「對！下次一定！」'],['分析他哪裡打得不好','{N}苦笑：「你說得對…但現在不太想聽。」']],
 ['海邊的夕陽','{N}拉你到海邊，笑著說：「來比賽誰先踩到浪！」',['全力衝過去，鞋子都濕了','你們笑成一團，{N}說：「跟你在一起超開心！」'],['在旁邊拍照記錄','{N}湊過來：「拍好看一點喔！」'],['說會弄髒衣服不去','{N}撓撓頭：「好吧…那下次換個地方。」']],
 ['認真的一刻','{N}難得安靜下來：「欸，我有件事想說，但不知道怎麼開口。」',['認真看著他：慢慢說，我在聽','{N}深呼吸：「我…好像越來越在意你了。」'],['開玩笑：你要告白嗎？','{N}紅著臉大笑：「被你看穿了啦！」'],['看手機說等等再聊','{N}勉強笑笑：「也、也沒什麼啦。」']]],
[ // 文青才子型
 ['雨中書店','{N}在書店角落遞給你一本書：「這本，我想你會喜歡。」',['翻開並認真討論內容','{N}眼睛亮了：「你是少數會認真讀完的人。」'],['道謝並說回去看','{N}微笑點頭：「不急，慢慢讀。」'],['說我不太看書','{N}推了推眼鏡：「…沒關係。」語氣淡了些。']],
 ['深夜的信','你收到{N}寫的一封長信，字句溫柔而克制。',['認真回信，寫下真心話','{N}回覆：「我反覆讀了很多次。」'],['傳訊息說謝謝寫得很好','{N}回：「能讓你開心就好。」'],['回說太長沒看完','{N}輕輕嘆息：「是我寫得太多了。」']],
 ['畫展與沉默','{N}帶你看展，停在一幅畫前許久：「你看見什麼？」',['說出你最誠實的感受','{N}轉頭看你：「原來你是這樣看世界的。」'],['說很漂亮','{N}微笑：「是啊，很漂亮。」'],['說看不懂','{N}點點頭：「沒關係，不需要懂。」，卻有點孤單。']],
 ['未寄出的詩','{N}把一張摺好的紙塞給你，轉身快步離開。',['追上去說：我讀懂了','{N}停下腳步，回頭時眼眶有點紅。'],['打開來默默讀完','你讀著那些詩句，心跳漸漸加快。'],['隨手塞進口袋忘了','幾天後{N}小心翼翼問你：「有看嗎？」']]],
[ // 神秘冷酷型
 ['雨夜同行','{N}沉默地陪你走了一段路，什麼也沒說。',['也不說話，只是並肩走','到路口，{N}低聲說：「…路上小心。」'],['找話題打破沉默','{N}淡淡應了幾聲，卻沒有離開。'],['說你很難相處','{N}停下腳步：「…我知道。」轉身消失在夜色裡。']],
 ['被發現的秘密','你無意間看到{N}在照顧一隻流浪貓。{N}看到你，表情瞬間僵住。',['蹲下來一起摸貓，什麼都不問','{N}小聲說：「…別告訴別人。」'],['笑著說：好可愛的一面','{N}別開臉：「…囉嗦。」'],['拿出手機想拍','{N}眼神一冷：「刪掉。」']],
 ['舊傷','{N}手臂上有一道舊疤，被你不小心看見。',['不追問，只說我在這裡','{N}握緊拳頭又放開：「…謝謝。」'],['關心地問怎麼來的','{N}沉默良久：「…以後再說。」'],['好奇追問細節','{N}眼神冰冷：「這不關你的事。」']],
 ['唯一的例外','{N}站在你面前，聲音低到幾乎聽不見：「…你是例外。」',['說：我知道，我也是','{N}終於露出一個極淡的笑容。'],['愣愣地說：什麼意思？','{N}別過頭：「…沒什麼，當我沒說。」'],['說你想太多了','{N}轉身離開，背影有些落寞。']]],
[ // 青梅竹馬型
 ['小時候的約定','{N}突然問：「你還記得我們小時候的約定嗎？」',['說出那個約定的細節','{N}笑得很燦爛：「你居然記得！」'],['笑著說記得一點點','{N}說：「沒關係，我記得就好。」'],['說你忘光了','{N}愣了一下，低聲說：「…是喔。」']],
 ['搶零食的午後','{N}熟門熟路地搶走你的零食：「這個我小時候就吃過了！」',['搶回來並順便搶他的','你們打鬧成一團，笑聲停不下來。'],['乖乖分一半','{N}說：「還是你最大方。」'],['生氣說不要亂碰我的東西','{N}縮回手：「…抱歉，我習慣了。」']],
 ['生病的夜晚','你發燒躺在床上，{N}提著粥衝進來：「笨蛋，生病也不說！」',['說謝謝，有你在真好','{N}紅著臉：「這是應該的啦。」'],['逞強說沒事','{N}嘆氣坐下：「那我陪你到退燒。」'],['說你別來，會傳染','{N}站在門口，有些受傷：「…好吧。」']],
 ['陌生的距離','{N}最近跟別人走得很近，看到你時只是點點頭。',['主動問：你最近還好嗎','{N}愣了愣：「你…都有發現啊。」'],['裝作不在意','{N}低頭：「…也是，我們本來就只是朋友。」'],['賭氣不理他','{N}傳訊息：「我是不是做錯什麼了？」']]],
[ // 毒舌天才型
 ['筆記與嘴硬','{N}丟來一份筆記：「拿去，別誤會，我只是怕你拖累我。」',['認真讀完並整理心得','{N}翻看你的筆記：「…整理得還不錯。」'],['道謝後收起來','{N}哼了一聲：「記得還。」'],['說我才不需要','{N}挑眉：「隨便你，反正掛科的又不是我。」']],
 ['深夜辯論','你和{N}為了一個問題爭得面紅耳赤。',['認真反駁並提出新論點','{N}沉默片刻，嘴角微微上揚：「有意思。」'],['讓步說你說得對','{N}反而皺眉：「我不喜歡敷衍。」'],['生氣地說不想吵了','{N}冷冷地說：「逃避不是辯論。」']],
 ['罕見的失誤','{N}在報告上犯了錯，難得露出慌張。',['幫他一起檢查並修正','{N}小聲說：「…欠你一次。」'],['安慰說誰都會犯錯','{N}扶額：「別用這種語氣。」'],['嘲笑他終於也有今天','{N}冷冷看你：「很好笑嗎。」']],
 ['笨拙的真心','{N}別開視線：「我只說一次…跟你討論的時間，是我最不想結束的時間。」',['說：我也是，我們繼續吧','{N}耳根通紅：「…誰準你說得這麼直接。」'],['笑著說你剛剛是在告白嗎','{N}惱羞：「不、不是！…算是吧。」'],['說你想太多了','{N}推了推眼鏡：「…當我沒說。」']]]
];
function otChapter(t,k){
 const A=t.a,ch=t.ch||0;if(ch>=4)return null;if(otAff(t,k)<OTREQ[ch])return null;
 const key='ch'+(t.id||k)+'_'+ch;if(S.acts[key])return null;return {a:A,i:ch,key,d:OTSTORY[A][ch]};
}
function otStory(k){
 const t=otGet(k);if(!t)return B('對象已不在了。');const c=otChapter(t,k);if(!c)return N('目前沒有可進行的章節。');
 if(S.ap<1)return B('今年的行動點用完了。');
 const d=c.d,nm=t.n,fill=s=>s.replace(/\{N\}/g,nm);
 const order=[0,1,2].sort(()=>Math.random()-.5);
 const labels=order.map(i=>d[2+i][0]);
 ask(`第 ${c.i+1} 章「${d[0]}」\n${fill(d[1])}`,labels,pi=>{
  const oi=order[pi],op=d[2+oi];S.acts[c.key]=1;S.ap--;
  let dl=oi===0?R(10,16):oi===1?R(3,6):-R(3,8);if(k==='p')dl=Math.round(dl*.6);if(dl>0&&S.looks>75)dl++;
  otAdd(t,k,dl);t.ch=(t.ch||0)+1;if(oi===0)t.bc=(t.bc||0)+1;
  chg('happy',oi===0?4:oi===1?1:-2);
  cgAdd({a:t.a,k:c.i,q:oi,n:nm,y:calYear()});
  let m=`你選了「${op[0]}」。\n${fill(op[1])}（好感 ${dl>=0?'+':''}${dl}）`;
  if(t.ch>=4){
   if((t.bc||0)>=3){t.route='真';m+=`\n\n你們走完了所有章節，心意早已相通——這是屬於你們的「真結局」路線。`}
   else m+=`\n\n你們走完了所有章節。結局如何，取決於之後的相處。`;
  }
  log(`與${nm}的專屬章節「${d[0]}」：好感 ${dl>=0?'+':''}${dl}。`,otTone(dl));
  view.rmsg={q:dl<0?'b':oi===0?'g':'n',t:m};otDone(k);
 });
 return null;
}
/* ===== 更多互動 ===== */
const OTA=[
 {id:'msg',l:'傳訊息',s:'免費・每年最多 3 次',ap:0,run:(t,k,A)=>{const n=(S.acts['m'+t.n]||0);if(n>=3)return B('今年已經聊得夠多了，留點話題下次再說。');S.acts['m'+t.n]=n+1;const d=R(2,5);otAdd(t,k,d);return G(`${t.n}回覆了你。${pick(A.sc)}（好感 +${d}）`)}},
 {id:'movie',l:'一起看電影',s:'NT$600・1 點',ap:1,cost:600,min:20,run:(t,k,A)=>{const d=R(4,9);otAdd(t,k,d);chg('happy',3);return G(`你們一起看了電影，散場後聊了很久。${pick(A.g)}（好感 +${d}）`)}},
 {id:'study',l:'一起念書／運動',s:'1 點・能力小幅提升',ap:1,min:15,run:(t,k,A)=>{const d=R(3,7);otAdd(t,k,d);if(chance(.5))chg('smarts',1);else chg('health',1);return G(`你們一起${chance(.5)?'念書':'運動'}，互相督促進步。（好感 +${d}）`)}},
 {id:'call',l:'深夜通話',s:'1 點・好感 35 以上',ap:1,min:35,run:(t,k,A)=>{if(chance(.2)){const d=R(2,6);otAdd(t,k,-d);return B(`電話那頭突然安靜了很久，氣氛有點尷尬。${pick(A.b)}（好感 -${d}）`)}const d=R(5,10);otAdd(t,k,d);S.stress=cl(S.stress-3);return G(`你們聊到天快亮。${pick(A.g)}（好感 +${d}）`)}},
 {id:'surp',l:'準備驚喜',s:'NT$3,000・1 點・好感 45 以上',ap:1,cost:3000,min:45,run:(t,k,A)=>{if(chance(.78)){const d=R(8,14);otAdd(t,k,d);chg('happy',4);return G(`驚喜成功了！${pick(A.g)}（好感 +${d}）`)}const d=R(1,4);otAdd(t,k,-d);return B(`時機不太對，驚喜變成了小小的尷尬。（好感 -${d}）`)}},
 {id:'fam',l:'見對方家長',s:'好感 70 以上・每年 1 次',ap:1,min:70,pOnly:1,run:(t,k,A)=>{if(S.acts['fam'+t.n])return B('今年已經拜訪過了。');S.acts['fam'+t.n]=1;const ok=chance(.4+S.looks/300+(S.job?.1:0));const d=ok?R(6,12):-R(2,6);otAdd(t,k,d);return ok?G(`${t.n}的家人很喜歡你，餐桌上笑聲不斷。（好感 +${d}）`):B(`${t.n}的家人有些保留，場面稍微尷尬。（好感 ${d}）`)}},
 {id:'mend',l:'好好和解',s:'1 點・好感低於 60 才需要',ap:1,max:60,pOnly:1,run:(t,k,A)=>{if(chance(.6)){const d=R(8,15);otAdd(t,k,d);return G(`你放下身段好好溝通，誤會慢慢化開了。（好感 +${d}）`)}const d=R(1,4);otAdd(t,k,-d);return B(`對方還需要一些時間，這次沒能談攏。（好感 -${d}）`)}}
];
function otAct(id,k){
 const t=otGet(k);if(!t)return B('對象已不在了。');const o=OTA.find(x=>x.id===id);if(!o)return null;
 const A=ARCH[t.a];
 if(o.ap&&S.ap<1)return B('今年的行動點用完了。');
 if(o.cost&&S.money<o.cost)return B('你的錢不夠。');
 if(o.min&&otAff(t,k)<o.min)return B(`好感還不夠（需要 ${o.min}）。`);
 if(o.max&&otAff(t,k)>=o.max)return N('目前感情穩定，不需要特別和解。');
 const r=o.run(t,k,A);if(r[1]!=='bad'||/尷尬|沒能|不太對|安靜/.test(r[0])){}
 if(r&&(r[1]==='good'||/好感 -/.test(r[0]))){if(o.ap)S.ap--;if(o.cost)S.money-=o.cost}
 return r;
}
function otDone(k){view.tab='rel';render();showSheet('rel',view.rsub)}
/* ===== 在對象頁加入「專屬章節與互動」區塊 ===== */
function otBlock(t,k){
 const A=ARCH[t.a],c=otChapter(t,k),ch=t.ch||0;
 let h='<div class="sec">專屬章節與互動</div>';
 h+=`<div class="item"><b>專屬章節 ${ch}／4${t.route?'・真結局路線':''}</b><div class="bar"><i style="width:${ch*25}%;background:#ec4899"></i></div><div class="sub">${c?`第 ${c.i+1} 章「${OTSTORY[t.a][c.i][0]}」已開放`:ch>=4?'這位對象的章節已全部走完':`下一章需要好感 ${OTREQ[ch]}（目前 ${otAff(t,k)}）`}</div></div>`;
 if(c)h+=`<button class="btn p" data-a="ot:story:${k}">進入章節：第 ${c.i+1} 章「${esc(OTSTORY[t.a][c.i][0])}」<small>1 點行動點・選項會影響好感與結局</small></button>`;
 OTA.forEach(o=>{if(o.pOnly&&k!=='p')return;h+=`<button class="btn" data-a="ot:act:${k}:${o.id}">${o.l}<small>${o.s}</small></button>`});
 return h;
}
const _rm71=romHTML;
romHTML=function(k){
 if(k==='Ro'){if(!S.on){view.rsub=null;return romHome()}return onPage()}
 let h=_rm71(k);
 try{
  let t=null,kk=null;
  if(k==='Rp'&&S.partner){t=S.partner;kk='p'}else if(k&&k.startsWith('Rc')){const i=+k.slice(2);if(S.crush[i]){t=S.crush[i];kk=String(i)}}
  if(t){const back='<button class="btn" data-a="rom:go:h">← 返回</button>',j=h.lastIndexOf(back);if(j>=0)h=h.slice(0,j)+otBlock(t,kk)+h.slice(j)}
 }catch(e){}
 return h;
};
const _hd71=handle;
handle=function(a){
 if(typeof a==='string'&&S&&a.startsWith('ot:')){
  const p=a.split(':'),x=p[1];let r=null;
  if(x==='story'){r=otStory(p[2]);if(r){view.rmsg={q:r[1]==='bad'?'b':'n',t:r[0]};otDone(p[2])}return}
  if(x==='act'){r=otAct(p[3],p[2]);if(r)view.rmsg={q:r[1]==='bad'?'b':r[1]==='good'?'g':'n',t:r[0]};view.rsub=p[2]==='p'?'Rp':p[2]==='o'?'Ro':'Rc'+p[2];otDone(p[2]);return}
  if(x==='open'){view.rsub='Ro';view.scene=null;view.tab='rel';render();showSheet('rel','Ro');return}
 }
 return _hd71(a);
};
/* 真結局路線：告白更容易、伴侶感情每年小幅上升 */
const _cf71=confess;
confess=function(c){if(c&&c.route==='真'){c.ok=true;c.aff=Math.max(c.aff,60)}return _cf71(c)};
const _y71=yearly;
yearly=function(){
 _y71();
 try{if(S.partner&&S.partner.route==='真'&&!S.dead){S.partner.rel=cl(S.partner.rel+2);if(!S.partner.rlog){S.partner.rlog=1;log(`你和${S.partner.n}走的是命中注定的「真結局」路線，感情會越來越穩。`,'good')}}}catch(e){}
};
/* ===== 網友頁（同樣套用乙女系統：個性、語氣、禮物、劇情）===== */
function onPage(){
 const o=S.on;onFix(o);const A=ARCH[o.a];
 let h=`<h3>${A.em} ${esc(o.n)}</h3><div class="sub">${esc(CNAME[o.cn])}・${A.n}・${ONST[Math.min(2,o.st)]}・認識於${esc(o.plat)}・行動點 ${S.ap}</div>${hbar(o.aff)}`;
 h+=`<div class="sub">喜歡的語氣：${o.seen.t?A.tone:'？'}　禮物：${o.seen.g?A.gift:'？'}　${romOK()?'你們可以發展感情':'對方不是你有興趣的性別，只能當朋友'}</div>`;
 h+=romBubble();
 if(view.scene&&view.scene.k==='o')return h+sceneHTML(o,'o');
 h+=`<button class="btn" data-a="rom:act:o:talk">聊天<small>選擇語氣・1 點</small></button><button class="btn" data-a="rom:act:o:gift">寄禮物<small>1 點</small></button><button class="btn" data-a="on:vid">視訊通話<small>好感 45 以上・1 點</small></button><button class="btn" data-a="on:meet">去見面<small>先視訊、好感 60 以上；費用含機票</small></button>`;
 if(romOK())h+=`<button class="btn p" data-a="on:conf">告白<small>見過面且好感 75 以上</small></button>`;
 h+=otBlock(o,'o');
 h+=`<button class="btn" data-a="on:end">結束往來</button><button class="btn" data-a="back">← 返回</button>`;
 return h;
}
const _rhd71=romHandle;
romHandle=function(x,y,z){
 if(x==='act'&&y==='o'){if(!S.on)return B('網友已不在了。');onFix(S.on);view.rsub='Ro';view.rmsg=null;view.scene=null;return actStart(S.on,false,z)}
 return _rhd71(x,y,z);
};
/* ===== 隨機乙女事件 ===== */
function otTargets(kind){
 const L=[];
 if(S.partner&&S.partner.a!=null&&S.age>=16)L.push({t:S.partner,k:'p'});
 S.crush.forEach((c,i)=>{if(c.aff>=(kind==='c'?25:20))L.push({t:c,k:String(i)})});
 if(S.on&&S.on.st>=1){onFix(S.on);L.push({t:S.on,k:'o'})}
 return L.filter(x=>kind==='p'?x.k==='p':kind==='c'?x.k!=='p':true);
}
const OTE=[
 ['rival','c','情敵出現','另一個人也在追{N}，還送了花。',[['大方公平競爭，照常相處',6,'你沒有慌亂，{N}反而覺得你很穩重。'],['趁早告白搶先一步',0,'__confess'],['默默退後，覺得算了',-8,'你退縮了，{N}有些不解。']]],
 ['mis','a','誤會','朋友說看到{N}和別人很親密，你心裡很不舒服。',[['當面問清楚',8,'原來是誤會，{N}笑著解釋，你們的距離更近了。'],['等對方自己解釋',-2,'沉默讓氣氛有點微妙。'],['賭氣不理對方',-10,'{N}不知道哪裡惹你生氣，難過了好幾天。']]],
 ['bday','a','生日','{N}的生日快到了。',[['精心準備驚喜（NT$3,000）',10,'{N}又驚又喜：「你居然記得！」',3000],['傳訊息祝福',3,'{N}回了好幾個笑臉。'],['不小心忘了',-12,'{N}沒說什麼，但看起來有點失望。']]],
 ['sick','a','生病','{N}生病了，在家休養。',[['請假去照顧',12,'{N}握著你的手：「有你在真好。」'],['買藥送過去並傳訊息',4,'{N}說謝謝，語氣很溫柔。'],['說最近很忙，晚點再說',-6,'{N}只回了一句「沒事，你忙吧」。']]],
 ['rain','c','共傘','下雨了，你和{N}都沒帶傘。',[['把外套舉在頭上，一起衝向公車站',8,'你們淋成落湯雞，卻笑個不停。'],['提議在屋簷下聊到雨停',5,'雨聲裡，你們聊起了很多心事。'],['自己先跑走',-5,'{N}看著你的背影，愣在原地。']]],
 ['fire','a','煙火大會','城市有煙火大會，{N}傳來訊息問你要不要去。',[['答應，並準備小零食（NT$800）',8,'煙火綻放時，你們的肩膀靠得很近。',800],['說人太多不想去',-2,'{N}傳來一個失落的表情。'],['約改天再去看夜景',3,'{N}說：「好，我等你。」']]],
 ['low','a','低潮','{N}最近很低落，看起來有心事。',[['陪在身邊，認真傾聽',9,'{N}終於說出了藏在心裡很久的話。'],['鼓勵並帶去散心',5,'{N}勉強笑了：「謝謝你。」'],['說加油就好',-4,'{N}沒有再多說什麼。']]],
 ['teased','c','被起鬨','同學／同事看見你和{N}走得近，開始起鬨。',[['大方承認我們很要好',7,'{N}臉紅了，卻沒有否認。'],['笑著說只是朋友',-5,'{N}的笑容淡了一下。'],['拉著{N}離開現場',4,'{N}小聲說：「謝謝你替我解圍。」']]],
 ['far','a','遠方的機會','{N}得到去外地發展的機會。',[['支持對方，約定保持聯絡',6,'{N}紅了眼眶：「我會常常聯絡你。」'],['要對方留下來',-10,'{N}沉默良久，氣氛很沉重。'],['說我也會努力追上你',8,'{N}笑著說：「那我等你。」']]],
 ['jeal','p','吃醋','你和異性朋友吃飯，{N}看起來悶悶不樂。',[['主動解釋並安撫',6,'{N}抱住你：「我只是怕失去你。」'],['說你想太多',-10,'{N}轉身離開，留下一室安靜。'],['之後減少聚會',3,'{N}雖然沒說，但心情明顯好轉。']]],
 ['gift','c','禮物','{N}突然送你一份小禮物：「剛好看到，覺得適合你。」',[['開心收下，回送小禮（NT$1,500）',6,'{N}笑得很開心。',1500],['道謝收下',3,'{N}說：「喜歡就好。」'],['婉拒說這太貴重了',-8,'{N}尷尬地收回手。']]],
 ['night','a','宵夜','你加班到很晚，{N}提著宵夜出現在門口。',[['感動地說：幸好有你',10,'你們坐在一起吃宵夜，什麼都不用說。'],['說你吃過了',-3,'{N}笑笑，把宵夜放在桌上。'],['請對方別來打擾',-9,'{N}默默離開，宵夜還是留了下來。']]],
 ['family','p','見家長','{N}的家人邀你吃飯。',[['精心準備伴手禮（NT$2,000）',9,'{N}的家人很喜歡你，餐桌上笑聲不斷。',2000],['普通出席',3,'一切平順，沒有特別的火花。'],['找藉口缺席',-12,'{N}默默替你向家人解釋，語氣很失望。']]],
 ['ex','p','前任','{N}的前任突然聯絡，說想見面聊聊。',[['坦然支持，並說我相信你',5,'{N}很感動：「我只想要你。」'],['說你不准去',-9,'{N}皺起眉頭：「我需要被信任。」'],['陪對方一起去見面',2,'場面有點尷尬，卻也化解了疑慮。']]],
 ['lost','c','迷路','你和{N}逛街時走散了。',[['原地等待並傳訊息',6,'{N}氣喘吁吁跑來：「找到你了！」'],['四處亂找',2,'你們繞了好久才碰頭，笑著說差點成了迷路小隊。'],['乾脆自己回家',-8,'{N}傳了很多訊息，卻沒等到回覆。']]],
 ['newyear','a','跨年','跨年夜，{N}問你有沒有空一起倒數。',[['答應並一起倒數（NT$800）',8,'倒數的那一刻，{N}輕聲說：「新年快樂。」',800],['各自跨年，只傳訊息',-1,'{N}回覆：「也好，新年快樂。」'],['約元旦再見',3,'{N}說：「那就元旦見。」']]],
 ['hurt','a','受傷','{N}運動受傷，需要人陪著去醫院。',[['立刻陪著去，全程照顧',11,'{N}靠在你肩上：「還好有你在。」'],['傳訊息關心並匯款（NT$1,000）',3,'{N}說：「你人真好。」',1000],['說自己有事走不開',-7,'{N}笑著說沒關係，聲音卻很輕。']]]
];
OTE.forEach((d,i)=>{
 const [id,kind,ttl,txt,opts]=d;
 E.push({id:'ote_'+id,min:15,max:75,w:2,if:()=>otTargets(kind).length>0&&!S.jail,run:()=>{
  const tg=pick(otTargets(kind)),t=tg.t,k=tg.k,nm=t.n,f=s=>s.replace(/\{N\}/g,nm);
  return {t:f(txt)+`（${ttl}）`,c:opts.map(o=>ch(f(o[0]),()=>{
   if(o[3]){if(S.money<o[3])return B('你的錢不夠。');S.money-=o[3]}
   if(o[2]==='__confess'){if(k==='p'||k==='o'||t.aff<40){otAdd(t,k,3);return N(`你鼓起勇氣表達心意，${nm}說需要一點時間。（好感 +3）`)}const r=confess(t);return r}
   const d=k==='p'?Math.round(o[1]*.8):o[1];otAdd(t,k,d);chg('happy',d>=6?3:d<0?-3:0);
   const m=f(o[2])+`（好感 ${d>=0?'+':''}${d}）`;log(`${nm}：${ttl}，好感 ${d>=0?'+':''}${d}。`,otTone(d));return d<0?B(m):d>=6?G(m):N(m)
  }))}
 }})
});
/* ===== 回憶相簿 ===== */
const _lh71=lifeHTML;
lifeHTML=function(){return view.lsub==='cg'?cgHTML():_lh71()};
function cgHTML(){
 const all=cgAll(),got={};all.forEach(x=>got[x.a+'_'+x.k]=x);
 let n=0;ARCH.forEach((A,a)=>{for(let k=0;k<4;k++)if(got[a+'_'+k])n++});
 let h=`<h3>戀愛回憶</h3><div class="sub">每走完一章專屬章節就會收進相簿（跨人生累積），完美選擇會標示星星。已收集 ${n}／${ARCH.length*4}。</div>`;
 ARCH.forEach((A,a)=>{
  const c=[0,1,2,3].filter(k=>got[a+'_'+k]).length;
  h+=`<div class="sec">${A.em} ${A.n}（${c}／4）</div>`+[0,1,2,3].map(k=>{const x=got[a+'_'+k];return `<div class="item"><b>${x?esc(OTSTORY[a][k][0]):'？？？'}${x&&x.q===0?'　★':''}</b><div class="sub">${x?`與 ${esc(x.n)} 的回憶・${x.y} 年`:'尚未解鎖'}</div></div>`}).join('');
 });
 return h+'<button class="btn" data-a="back">← 返回</button>';
}
