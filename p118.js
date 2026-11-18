/* ---- p118：學歷與進修：同等學力測驗（國中／高中職）、在職進修、全職重回校園；校內比賽限在學 ---- */
/* 題庫：依會考／學測／統測題型與難度自編（每題 [題幹,[選項],正解序號]），非歷屆試題原文 */
const EQB={
 hj:{n:'會考題型（國中同等學力）',sub:{
  '國文':[['「春風化雨」比喻什麼？',['良好教育的感化','天氣變化','農事忙碌','旅途辛苦'],0],['下列哪一個詞語的字形完全正確？',['川流不息','穿流不息','川流不熄','穿流不熄'],0],['「近朱者赤，近墨者黑」主要在說明什麼？',['環境會影響一個人','顏色可以調配','書法需要練習','墨水容易乾'],0],['「亡羊補牢」的意思是？',['出事後設法補救，避免再犯','到處尋找走失的羊','羊群很容易走散','牢房需要整修'],0]],
  '英文':[['She ____ to school by bike every day.',['go','goes','going','gone'],1],['—How was your weekend? —It was great. We ____ a movie.',['watch','watches','watched','watching'],2],['Which word means the opposite of "ancient"?',['modern','old','broken','heavy'],0],['If it ____ tomorrow, we will stay home.',['rain','rains','rained','raining'],1]],
  '數學':[['計算 (−3)×(−4)＋2 等於多少？',['−10','10','14','−14'],2],['解方程式 2x＋5＝17，x 等於多少？',['6','11','12','5.5'],0],['直角三角形兩股長 3 與 4，斜邊長是多少？',['5','6','7','√7'],0],['圓的半徑為 5，周長是多少？（π 取 3.14）',['15.7','31.4','78.5','62.8'],1]],
  '社會':[['臺灣的最高峰是哪一座山？',['雪山','玉山','阿里山','合歡山'],1],['下列哪一個機關屬於五權中的考試權？',['立法院','考試院','監察院','司法院'],1],['世界上面積最大的大洋是？',['大西洋','印度洋','太平洋','北冰洋'],2],['臺灣於哪一年解除戒嚴？',['1949','1987','1996','2000'],1]],
  '自然':[['水在一大氣壓下的沸點約是攝氏幾度？',['0','50','100','212'],2],['植物行光合作用時會吸收什麼氣體？',['二氧化碳','氧氣','氮氣','氫氣'],0],['地球自轉一周約需多久？',['1 小時','1 天','1 個月','1 年'],1],['聲音在下列哪一種物質中傳播最快？',['真空','空氣','水','鋼鐵'],3]]}},
 sc:{n:'學測題型（高中同等學力・普通科）',sub:{
  '國文':[['「不經一番寒徹骨，怎得梅花撲鼻香」意在說明什麼？',['努力與磨練才有成果','冬天適合賞梅','香氣可以治病','天冷要多穿衣'],0],['下列哪一位是唐代詩人？',['李白','蘇軾','陶淵明','辛棄疾'],0],['「學而不思則罔，思而不學則殆」出自哪一部書？',['論語','孟子','莊子','史記'],0],['「他做事向來____，說做就做。」填入哪一個成語最恰當？',['優柔寡斷','雷厲風行','畏首畏尾','猶豫不決'],1]],
  '英文':[['Despite the heavy rain, the game ____ as planned.',['went on','went off','went out','went up'],0],['The scientist, ____ research changed medicine, won the award.',['who','whose','whom','which'],1],['Choose the word closest in meaning to "reluctant".',['unwilling','eager','careless','generous'],0],['By the time we arrived, the movie ____.',['has started','had started','starts','will start'],1]],
  '數學':[['已知 log₁₀2 ≈ 0.3010，則 log₁₀8 約為多少？',['0.602','0.903','1.204','0.301'],1],['方程式 x²−5x＋6＝0 的兩根之和為？',['5','6','−5','1'],0],['等差數列首項為 3、公差為 4，第 10 項是多少？',['39','43','40','36'],0],['sin30°＋cos60° 等於多少？',['1/2','1','√3','0'],1]],
  '社會':[['工業革命最早發生在哪個國家？',['法國','德國','英國','美國'],2],['在供給不變下，需求增加，均衡價格通常會怎樣？',['上升','下降','不變','先降後升'],0],['在我國中央機關中，掌理憲法解釋與憲法訴訟的是？',['行政院','司法院','立法院','監察院'],1],['季風的形成主要是因為什麼？',['海陸受熱不均','月球引力','地震','火山活動'],0]],
  '自然':[['牛頓第二運動定律可表示為？',['F＝ma','E＝mc²','V＝IR','P＝mgh'],0],['下列何者是 DNA 的組成單位？',['胺基酸','核苷酸','葡萄糖','脂肪酸'],1],['氫氣燃燒後主要生成什麼？',['水','二氧化碳','氨','甲烷'],0],['地球四季變化的主要原因是什麼？',['地軸傾斜並繞日公轉','地球離太陽的遠近','月球繞地球','太陽黑子'],0]]}},
 vc:{n:'統測題型（高職同等學力）',sub:{
  '國文':[['「一寸光陰一寸金」勸人什麼？',['珍惜時間','努力賺錢','愛惜黃金','準時上班'],0],['「見賢思齊」的意思是？',['見到賢人就想向他看齊','見到賢人就嫉妒','見到賢人就逃走','見到賢人要下跪'],0],['「桃李滿天下」用來形容？',['老師的學生很多','果園豐收','春天景色','商人遍布各地'],0]],
  '英文':[['I would like to ____ a table for two.',['reserve','reverse','remove','reply'],0],['Please ____ the form and sign your name.',['fill out','fill off','fill up on','fill away'],0],['The meeting has been ____ until next Monday.',['put off','put on','put in','put up'],0]],
  '數學':[['3/4＋1/6 等於多少？',['4/10','11/12','1/2','5/6'],1],['某商品原價 800 元，打七五折，售價是多少？',['600','650','560','700'],0],['若 a：b＝2：3，且 b＝12，則 a 等於多少？',['6','8','9','18'],1]]}}
};
const EQG={
 '電機與電子群資電類':{'基本電學':[['歐姆定律的公式是什麼？',['V＝IR','F＝ma','P＝mgh','E＝mc²'],0],['兩個 10 歐姆的電阻串聯，總電阻是多少？',['5 歐姆','10 歐姆','20 歐姆','100 歐姆'],2],['電流的 SI 單位是什麼？',['安培','伏特','歐姆','瓦特'],0]],'程式設計實習':[['for i in range(3) 這個迴圈會執行幾次？',['2','3','4','0'],1],['在多數程式語言中，「==」代表什麼？',['指定數值','比較是否相等','加法','註解'],1],['變數的主要用途是什麼？',['儲存資料','列印紙張','連上網路','關閉電腦'],0]]},
 '機械群':{'機械力學':[['力的三要素是什麼？',['大小、方向、作用點','質量、速度、時間','長、寬、高','壓力、溫度、體積'],0],['力的 SI 單位是什麼？',['牛頓','瓦特','焦耳','帕斯卡'],0],['槓桿平衡時，支點兩側的什麼相等？',['力×力臂','力＋力臂','力－力臂','力÷力臂'],0]],'機件原理':[['齒輪的主要功用是什麼？',['傳遞動力與改變轉速','發光','導電','過濾'],0],['軸承的主要作用是什麼？',['減少摩擦並支撐旋轉軸','增加溫度','切割材料','儲存油料'],0],['螺栓通常搭配什麼零件鎖緊？',['螺帽','滾珠','皮帶','鏈條'],0]]},
 '商管群':{'會計學':[['會計恆等式是什麼？',['資產＝負債＋業主權益','資產＝負債－業主權益','收入＝資產＋費用','負債＝資產＋收入'],0],['下列何者屬於資產？',['現金','應付帳款','銀行借款','預收款項'],0],['收入大於費用時，差額稱為什麼？',['淨利','淨損','負債','資本'],0]],'經濟學':[['依需求法則，價格上升時，需求量通常會怎樣？',['減少','增加','不變','無關'],0],['通貨膨脹指的是什麼？',['物價普遍且持續上漲','物價普遍下跌','薪水一定增加','匯率固定不變'],0],['GDP 代表什麼？',['一國一段期間生產的最終財貨與勞務總價值','政府的總支出','家庭的總儲蓄','外國人的總投資'],0]]},
 '餐旅群':{'餐飲服務技術':[['正式西餐的第一道菜通常是什麼？',['開胃菜','甜點','主菜','咖啡'],0],['冷藏食品宜保存在攝氏幾度以下？',['7','20','30','40'],0],['食材管理的「先進先出」簡稱是什麼？',['FIFO','GPS','CEO','ATM'],0]],'觀光餐旅業導論':[['護照的主要用途是什麼？',['出國時證明身分','搭乘捷運','購物折扣','就醫掛號'],0],['在飯店「check-in」指的是什麼？',['辦理入住','辦理退房','訂餐','打掃房間'],0],['旅館的 single room 通常指什麼？',['供一人使用的房間','兩張床的房間','套房','家庭房'],0]]},
 '設計群':{'色彩原理':[['色光的三原色是什麼？',['紅、綠、藍','紅、黃、藍','青、洋紅、黃','黑、白、灰'],0],['色彩的三屬性是什麼？',['色相、明度、彩度','大小、形狀、材質','冷、暖、中','深、淺、粗'],0],['色相環上相對位置的兩色互稱為什麼？',['互補色','類似色','同色系','中間色'],0]],'設計概論':[['平面構成中的「對比」指什麼？',['差異明顯的元素並置','完全相同的重複','留白','對稱'],0],['「版面」的英文是什麼？',['layout','logo','slogan','poster'],0],['解析度 dpi 指的是什麼？',['每英吋的點數','檔案大小','顏色數量','紙張重量'],0]]},
 '衛生與護理類':{'基礎護理':[['成人安靜時脈搏每分鐘約幾下？',['60–100','20–30','120–160','30–50'],0],['成人正常體溫約是攝氏幾度？',['36–37.5','38–40','33–34','40–42'],0],['血壓的常用單位是什麼？',['mmHg','kg','cm','L'],0]],'健康概論':[['下列何者是優質蛋白質來源？',['豆腐','白飯','蘋果','橄欖油'],0],['缺乏維生素 C 可能導致什麼？',['壞血病','夜盲症','佝僂病','腳氣病'],0],['BMI 的計算方式是什麼？',['體重(公斤)÷身高(公尺)²','身高÷體重','體重×身高','體重²÷身高'],0]]}
};
/* 私有事件佇列：在頁面裡跑多步驟對話，結束後不會觸發「過一年」 */
function edFlow(first){
 const keep=queue;queue=[first];
 const step=()=>{
  if(!queue.length){queue=keep;try{render();view.lsub='edu';showSheet('life')}catch(e){}return}
  const e=queue.shift();if(e.if&&!e.if())return step();const r=e.run();
  if(!r)return step();if(Array.isArray(r)){log(r[0],r[1]);return step()}
  if(r.custom)return r.custom(()=>step());
  render();ask(r.t,r.c.map(c=>c.l),i=>{log(r.t);const res=r.c[i].f();if(res)log(res[0],res[1]);step()});
 };
 step();
}
const edEv=(t,c)=>({run:()=>({t,c})});
function edQuiz(title,items,done){
 let i=0,ok=0;const miss=[];
 const nx=()=>{
  if(i>=items.length)return done(ok,miss);
  const it=items[i],ord=samp([0,1,2,3],4);
  ask(`${title}・第 ${i+1}／${items.length} 題（${it.s}）｜${it.q}`,ord.map((k,j)=>'ABCD'[j]+'. '+it.o[k]),idx=>{if(ord[idx]===it.a)ok++;else miss.push(it.s);i++;nx()});
 };
 nx();
}
const edPick=(arr)=>arr[Math.floor(Math.random()*arr.length)];
function edItems(sub){return Object.keys(sub).map(s=>{const q=edPick(sub[s]);return {s,q:q[0],o:q[1],a:q[2]}})}
function edScore(c){return Math.round(clmp(25+c*9+(S.smarts-50)*.25+R(-4,4),0,100))}
function edBlock(){return S.school?'目前在學中':S.jail?'服刑中':S.army?'服役中':S.dead?'已離世':null}
function eqExam(level,track,grp){
 const b=edBlock();if(b)return B(b+'，無法報名。');
 if(S.acts.eq)return B('今年已經報名過一次了，明年再來。');
 const fee=px(1500);if(S.money<fee)return B('報名費不夠：'+money(fee));
 S.acts.eq=1;S.money-=fee;
 let key,title,items;
 if(level===2){key='hj';title='國中同等學力測驗';items=edItems(EQB.hj.sub)}
 else if(track==='g'){key='sc';title='高中同等學力・學測題型';items=edItems(EQB.sc.sub)}
 else{key='vc';title=`高職同等學力・統測題型（${grp}）`;items=edItems(EQB.vc.sub);const g=EQG[grp];Object.keys(g).forEach(s=>{const q=edPick(g[s]);items.push({s:'專業科目・'+s,q:q[0],o:q[1],a:q[2]})})}
 edFlow(edEv(`${title}共 ${items.length} 題，每科一題，答對 3 題以上算通過。報名費 ${money(fee)} 已繳。準備好了嗎？`,[ch('開始作答',()=>{
  queue.unshift({run:()=>({custom:cb=>{edQuiz(title,items,(ok,miss)=>{
   const pass=ok>=3,tx=`${title}：答對 ${ok}／${items.length} 題${miss.length?'，答錯的科目：'+miss.join('、'):''}。`;
   if(!pass){chg('happy',-3);S.stress=cl(S.stress+3);log(tx+'未通過，明年可以再報名。','bad');return cb()}
   log(tx+(level===2?'取得國中同等學力！':'取得高中職同等學力！'),'good');chg('happy',6);
   if(level===2){S.edu=Math.max(S.edu,2)}
   else{S.edu=Math.max(S.edu,3);S.hsTrack=track==='v'?'高職':'高中';S.eq=1;S.exam=edScore(ok);
    queue.unshift(edEv(`你的${track==='v'?'統測':'學測'}題型成績換算約 ${S.exam} 分。要現在填志願升學嗎？`,[ch('填志願，繼續升學',()=>{queue.unshift(catEvent({exam:track==='v'?'統測':'學測',voc:track==='v'}));return N('你決定繼續升學。')}),ch('先不升學',()=>N('你決定先工作，之後還能從「學歷與進修」再報名。'))]))}
   cb()})}})});
  return null})]));
 return null;
}
/* 進修管道（在職／全職重回校園） */
function edEnroll(kind){
 const b=edBlock();if(b)return B(b+'，無法報名。');
 if(S.edu<3)return B('需要高中職學歷或同等學力。');
 if(S.age<18)return B('年滿 18 歲才能報名。');
 const job=!!S.job;
 if(kind==='ms'||kind==='phd'){
  const need=kind==='ms'?4:5;if(S.edu!==need)return B(kind==='ms'?'需要大學學歷（尚未取得碩士）。':'需要碩士學歷（尚未取得博士）。');
  if(job&&S.job.years<(kind==='ms'?2:3))return B(`在職專班通常要求 ${kind==='ms'?2:3} 年以上工作經驗（你目前 ${S.job.years} 年）。`);
  const tu=kind==='ms'?(job?120000:60000):(job?90000:30000),yrs=kind==='ms'?(job?3:2):(job?6:4);
  if(S.money<tu)return B('第一年學費不夠：'+money(tu));
  enroll(kind==='ms'?'碩士':'博士',yrs,tu,S.prestige);if(job)S.ptw=1;S.stress=cl(S.stress+(job?3:0));
  log(`你${job?'一邊工作一邊':''}報考並就讀${kind==='ms'?(job?'碩士在職專班':'研究所'):(job?'博士班（在職）':'博士班')}，預計 ${yrs} 年。`,'good');return G('錄取了，新的學習階段開始。');
 }
 S.exam=exScore();
 const ctx=kind==='open'?{exam:'空中大學入學申請',voc:true,ptw:1,open:1}:job?{exam:'進修部入學甄試',voc:true,ptw:1}:{exam:'學測（重考）'};
 edFlow(edEv(kind==='open'?'空中大學採申請入學，學費低、課程自主，但修業期間較長。':job?'進修部多在晚上或假日上課，學費比日間部低，要兼顧工作。':'你決定全職重回校園，重新考一次大學。',[ch('選擇科系',()=>{queue.unshift(catEvent(ctx));return N('你開始研究想念的科系。')}),ch('再想想',()=>N('你決定再考慮看看。'))]));
 return null;
}
const _fm118=finishMajor;
finishMajor=function(ctx,m,t){
 const r=_fm118(ctx,m,t);
 try{if(ctx&&ctx.ptw&&S.school==='大學'){S.ptw=1;S.stress=cl(S.stress+2);
  if(ctx.open){S.tuition=Math.round(S.tuition*.35);S.schoolEnd=S.age+m[6]+2;if(S.major)S.major.tier='空中大學'}
  else{S.tuition=Math.round(S.tuition*.8);S.schoolEnd=S.age+m[6]+1;if(S.major&&t)S.major.tier=t.n+'進修部'}}}catch(e){}
 return r};
const _y118=yearly;yearly=function(){_y118();if(S&&!S.school)S.ptw=0;try{if(S&&S.ptw&&S.school&&S.job){S.stress=cl(S.stress+2);if(chance(.25)&&S.job.perf>20){S.job.perf=cl(S.job.perf-3);log('白天上班、晚上上課，兩邊都有點吃力，工作表現略有下滑。','bad')}}}catch(e){}};
function eduHTML(){
 const b=edBlock(),job=!!S.job;let h=`<h3>學歷與進修</h3><div class="item"><b>目前學歷：${EDU[S.edu]}${S.eq?'（同等學力）':''}</b>${S.school?`<div class="sub">${S.school}在學中${S.ptw?'（在職進修）':''}，預計 ${S.schoolEnd} 歲畢業。</div>`:''}</div>`;
 if(b&&S.school)return h+`<div class="sub">在學期間不能再報名其他學制；畢業或輟學後才能報名。</div><button class="btn" data-a="back">← 返回</button>`;
 if(S.edu<3&&S.age>=15){
  h+='<div class="sec op">同等學力測驗</div><div class="sub">每科各一題，答對 3 題以上通過。題目依會考、學測、統測的題型與程度自編，不是歷屆試題原文。報名費約 '+money(px(1500))+'，每年限報名一次。有工作也可以報名，不需要辭職。</div>';
  if(S.edu<2)h+=`<button class="btn" data-a="ed:eq:2">國中同等學力測驗<small>會考題型・國文、英文、數學、社會、自然各一題</small></button>`;
  else{
   h+=`<button class="btn" data-a="ed:eq:g">高中同等學力（普通科）<small>學測題型・國文、英文、數學、社會、自然各一題</small></button>`;
   h+=`<div class="sub" style="margin-top:8px">高職同等學力（統測題型）：國文、英文、數學加上所選群別的兩科專業科目</div><div class="frm"><label for="ed_grp">選擇群別</label><select id="ed_grp">${Object.keys(EQG).map(g=>`<option value="${g}">${g}（${Object.keys(EQG[g]).join('、')}）</option>`).join('')}</select><div class="acts"><button class="btn" data-a="ed:eq:v">報名統測題型</button></div></div>`}
 }
 if(S.edu>=3){
  h+=`<div class="sec op">${job?'在職進修':'重回校園'}</div><div class="sub">${job?'邊工作邊讀書：學費較低、壓力會增加。':'目前沒有工作，可全職重回校園。'}取得同等學力者也能報名。上班族不需要辭職；在職專班通常要求 2 年以上工作經驗。</div>`;
  if(S.edu===3||S.edu===4&&!S.major)h+=`<button class="btn" data-a="ed:in:${job?'uni':'fu'}">${job?'大學進修部（夜間・假日）':'重考大學（全職就讀）'}<small>${job?'學費約日間部八折，學制多一年':'依目前成績選科系與學校'}</small></button>`;
  if(S.edu===3||S.edu===4&&!S.major)h+=`<button class="btn" data-a="ed:in:open">空中大學<small>學費約三成五，修業年限較長</small></button>`;
  if(S.edu===4)h+=`<button class="btn" data-a="ed:in:ms">${job?'碩士在職專班（3 年）':'報考研究所（2 年）'}<small>學費約 ${money(job?120000:60000)} 起／年（遊戲設定）</small></button>`;
  if(S.edu===5)h+=`<button class="btn" data-a="ed:in:phd">${job?'博士班（在職，6 年）':'博士班（4 年）'}<small>學費約 ${money(job?90000:30000)} 起／年（遊戲設定）</small></button>`;
  if(S.edu>=6)h+='<div class="sub">你已經是博士了，沒有更高的學制可念。</div>';
 }
 if(S.edu<3&&S.age<15)h+='<div class="sub">年滿 15 歲才能報名同等學力測驗。</div>';
 return h+`<button class="btn" data-a="back">← 返回</button>`;
}
UITILE['lf:edu']='cap';
const _mh118=moreHTML;
moreHTML=function(){return _mh118()+'<button class="tile" data-a="lf:edu"><b>學</b>學歷與進修<small>同等學力・在職進修・重考</small></button>'};
const _lf118=lfHandle;lfHandle=function(x,y,z,u){if(x==='edu'){view.lsub='edu';return null}return _lf118(x,y,z,u)};
const _lh118=lifeHTML;lifeHTML=function(){if(view.lsub==='edu')return eduHTML();return _lh118()};
const _hd118=handle;
handle=function(a){
 if(typeof a==='string'&&a.startsWith('ed:')&&S){
  const p=a.split(':');let m=null;
  if(p[1]==='eq'){const g=document.getElementById('ed_grp');m=p[2]==='2'?eqExam(2):p[2]==='g'?eqExam(3,'g'):eqExam(3,'v',g&&g.value||'電機與電子群資電類')}
  else if(p[1]==='in')m=edEnroll(p[2]);
  if(m){log(m[0],m[1]);view.lsub='edu';render();try{showSheet('life')}catch(e){}}
  return;
 }
 return _hd118.apply(this,arguments);
};
/* 校內比賽、校園活動：只有在學期間才能參加 */
(function(){const ids=['cp_sch_sing','cp_sch_dance','cp_band','cp_speech','cp_sci','cp_write','cp_art'];
 ACTS.forEach(a=>{if(ids.includes(a.id)){const o=a.if;a.if=()=>!!S.school&&(!o||o())}})})();
/* 進修部與空中大學不開設醫學、牙醫、獸醫等長學制科系 */
const _mj118=majEvent;
majEvent=function(ctx,cat){
 const r=_mj118(ctx,cat);
 if(ctx&&ctx.ptw){const run=r.run;r.run=()=>{const x=run();x.c=x.c.filter(c=>!/^(醫學系|牙醫系|獸醫系)｜/.test(c.l));return x}}
 return r};
