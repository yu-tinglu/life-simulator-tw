/* ---- p63：伴侶檔案（逐步了解的個人故事）與多元互動 ---- */
const PBTAG=['溫柔','慢熱','幽默','嘴硬心軟','責任感強','愛操心','浪漫','理性','愛玩','自律','念舊','貪吃','內向','外向','固執','貼心','獨立','愛面子','樂觀','敏感'];
const PBHOB=['烘焙','爬山','攝影','看電影','打籃球','桌遊','露營','騎車','閱讀','咖啡','畫畫','彈吉他','旅行','健身','追劇','園藝','釣魚','瑜伽','電玩','看展','手作'];
const PBLL=['言語肯定','精心時刻','接受禮物','服務行動','肢體接觸'];
const PBDR=['開一間自己的小店','環遊世界一年','寫一本書','在海邊買房','成為領域裡頂尖的專家','組一個溫暖的家','學會一樣樂器並上台演出','創辦自己的品牌','考上理想的研究所','回鄉照顧家人','完成一次馬拉松','存夠錢提早退休'];
const PBWR=['怕自己不夠好','擔心父母的健康','害怕被拋下','對金錢沒有安全感','工作壓力很大','怕被拿來和別人比較','難以開口說出自己的需求','怕生活一成不變'];
const PBFP={rich:['從小走在父母安排好的路上，直到大學才第一次自己做決定。','家裡忙於事業，小時候多半由保母陪伴，所以特別在意有人陪。'],mid:['在普通的家庭長大，爸媽每個週末都帶全家出去走走，成了最珍貴的回憶。','小時候家裡開過小店，放學後常在店裡寫作業。'],poor:['家境不寬裕，很早就學會打工分擔家計，所以特別獨立。','小時候搬過好幾次家、換過好幾所學校，不太容易相信長久的關係。']};
const PBGP=['國中時曾被同學排擠，後來靠社團重新找回自信。','高中時差點放棄升學，是一位老師改變了想法。','大學時休學一年去旅行，回來後想法完全不同。','第一次失戀後，把自己埋在工作裡好幾個月。','曾經養過一隻很愛的寵物，牠離開後很久才走出來。','年輕時曾搬到外地獨自生活，學會了照顧自己。'];
const PBPL=['朋友的聚會','工作上的專案','社團活動','咖啡店的同一張長桌','運動場館','交友軟體上的一則訊息','共同朋友的婚禮','一場雨天的公車站'];
const PBIM=['對方一開始給人有點冷淡的印象，其實只是怕生。','你們一聊就聊到末班車快沒了。','你本來只當對方是普通朋友，後來卻每天都想傳訊息。','對方記住了你隨口提過的小事，讓你很意外。'];
const PBSE=['對方偷偷存了一筆錢，打算有天帶你去看極光。','對方其實很怕黑，一直不好意思說。','對方曾有一段很深的感情，結束得不太好，所以格外珍惜你。','對方偷偷報名了一個課程，想給你一個驚喜。','對方一直想換工作，但怕你擔心而沒說。','對方寫了一首歌（或一封長信）給你，還沒敢拿出來。'];
const PBSB=['獨生子女','有一位姊姊','有一位哥哥','有一位弟弟','有一位妹妹','有兩位手足'];
const PBHM=['台北','新北','桃園','台中','台南','高雄','新竹','嘉義','花蓮','屏東','宜蘭','彰化','苗栗','南投'];
function pbZod(m,d){const z=[['魔羯',20],['水瓶',19],['雙魚',21],['牡羊',20],['金牛',21],['雙子',22],['巨蟹',23],['獅子',23],['處女',23],['天秤',23],['天蠍',22],['射手',22]];const i=d<z[m-1][1]?(m+10)%12:m-1;return z[i][0]+'座'}
function pbFix(p){
 if(!p||p.pb)return p&&p.pb;
 pxFix(p);try{pFix2(p)}catch(e){}
 const m=R(1,12),d=R(1,28),tags=[],tg=PBTAG.slice();for(let i=0;i<3;i++)tags.push(tg.splice(R(0,tg.length-1),1)[0]);
 const hb=[],hh=PBHOB.slice();for(let i=0;i<3;i++)hb.push(hh.splice(R(0,hh.length-1),1)[0]);
 const yrs=Math.max(0,S.age-(p.since==null?S.age:p.since)),r=Math.random();
 const home=(S.cn||'TW')==='TW'?pick(PBHM):(CNS[S.cn]?CNS[S.cn].n:'');
 p.pb={zd:pbZod(m,d),bd:m+'月'+d+'日',tg:tags,hb,ll:pick(PBLL),dr:pick(PBDR),wr:pick(PBWR),
  ed:r<.15?'高中職':r<.7?'大學':r<.95?'碩士':'博士',hm:home,sb:pick(PBSB),
  past:pick(PBFP[p.fb||'mid'])+pick(PBGP),
  meet:`${calYear()-yrs} 年，你們在${pick(PBPL)}認識。${pick(PBIM)}`,
  se:pick(PBSE),kn:Math.min(100,R(5,15)+yrs*8),pet:null,mf:0,mi:0};
 return p.pb;
}
const pbKn=(p,d)=>{const b=pbFix(p);b.kn=Math.min(100,b.kn+d)};
const pbHe=p=>p.sx==='男'?'他':'她';
function pbProfile(p){
 const b=pbFix(p),k=b.kn,lock=n=>`<div class="sub">（再多了解${pbHe(p)}一些就會知道，了解度 ${k}／${n}）</div>`;
 let h=`<div class="item"><b>了解度 ${k}</b>${pbar(k)}<div class="sub">聊天、約會、陪伴都會增加了解，解鎖更多故事。</div></div>`;
 h+=`<div class="item"><b>基本資料</b><br>${S.age+(p.off||0)} 歲・${b.zd}（${b.bd}）・家鄉 ${esc(b.hm)}・${b.ed}畢業・${esc(p.job||'—')}・${b.sb}</div>`;
 h+=`<div class="item"><b>相識的故事</b><br>${esc(b.meet)}</div>`;
 h+=`<div class="item"><b>個性與喜好</b><br>`+(k>=15?`${b.tg.join('、')}<br>興趣：${b.hb.join('、')}<br>愛的語言：${b.ll}`:lock(15))+'</div>';
 h+=`<div class="item"><b>成長故事</b><br>`+(k>=35?esc(b.past):lock(35))+'</div>';
 h+=`<div class="item"><b>夢想與煩惱</b><br>`+(k>=60?`夢想：${b.dr}<br>煩惱：${b.wr}`:lock(60))+'</div>';
 h+=`<div class="item"><b>藏在心裡的小秘密</b><br>`+(k>=80?esc(b.se):lock(80))+'</div>';
 if(b.pet)h+=`<div class="item"><b>家裡的寵物</b><br>你們一起養了一隻${b.pet}。</div>`;
 return h;
}
/* 互動 */
const PBA=[
 ['cook','一起下廚',800,1,['烘焙','咖啡','園藝'],2,5,['你們一起煮了一桌菜，廚房亂成一團卻笑個不停。','你教對方做拿手菜，對方學得有模有樣。']],
 ['movie','看電影',600,1,['看電影','追劇','桌遊'],2,4,['你們窩在電影院，散場後聊了很久劇情。','對方在感人的片段偷偷擦眼淚，你假裝沒看到。']],
 ['sport','一起運動',0,1,['健身','爬山','騎車','打籃球','瑜伽'],2,4,['你們一起流汗，結束後互相打氣。','對方運動時意外地認真，你有點刮目相看。'],()=>{mFix();S.skl.fit=Math.min(100,S.skl.fit+1);chg('health',R(1,3))}],
 ['museum','逛展覽或書店',500,1,['看展','閱讀','畫畫','攝影'],2,4,['你們在展場慢慢走，對方分享了很多想法。','在書店各挑了一本書，約好交換讀完。'],()=>chg('smarts',1)],
 ['trip','小旅行',3000,1,['旅行','露營','爬山','釣魚'],4,8,['你們安排了一趟兩天一夜的小旅行，留下許多合照。','路上迷了路，卻意外發現一家很棒的小店。']],
 ['surprise','準備小驚喜',500,1,['手作','烘焙'],3,6,['你悄悄準備了一份小禮物，對方又驚又喜。','你記得對方提過的小東西，特別買來送給對方。'],null,'接受禮物'],
 ['letter','寫長訊息或手寫信',0,0,[],2,5,['你寫了一段很長的話，把平常不好意思說的都說了。','對方把你的信收進抽屜，說會一直留著。'],null,'言語肯定'],
 ['help','幫對方分擔事情',0,1,[],2,5,['你幫對方處理了一件麻煩事，對方鬆了口氣。','你主動分擔家事，對方很感動。'],null,'服務行動'],
 ['cuddle','安靜依偎的夜晚',0,0,[],2,4,['你們什麼也沒做，只是靠在一起，覺得很安心。','對方靠著你的肩膀睡著了。'],null,'肢體接觸'],
 ['game','一起打電動或玩桌遊',0,1,['電玩','桌遊'],2,4,['你們玩到忘了時間，輸的人要請宵夜。','對方玩輸了耍賴，你笑到不行。']],
 ['anniv','慶祝紀念日',3000,1,[],5,9,['你們訂了餐廳慶祝，回顧一路走來的點滴。','對方準備了一個小蛋糕，上面寫著你們的日期。']],
 ['dream','一起規劃夢想',0,1,[],3,7,['你們把各自的夢想寫下來，討論怎麼一起完成。','聊著聊著，兩人眼睛都亮了起來。'],null,null,60],
 ['night','深夜長談',0,1,[],1,3,['你們聊到天亮，聊到很多從沒講過的事。','在陽台吹著風，對方慢慢說起心裡的話。'],null,null,0,8]
];
function pbRun(id){
 const p=S.partner;if(!p)return B('目前沒有伴侶。');const b=pbFix(p);
 if(id==='mf'||id==='mi')return pbFam(id);
 if(id==='pet')return pbPet();
 if(id==='rec')return pbRec();
 const a=PBA.find(x=>x[0]===id);if(!a)return null;
 const [,,cost,ap,tags,lo,hi,tx,fx,ll,need,kn]=a;
 if(S.acts['pb'+id])return B('今年已經做過這件事了。');
 if(need&&b.kn<need)return B('還需要更了解對方才行。');
 if(ap&&S.ap<1)return B('行動點不足。');if(S.money<cost)return B('你的錢不夠。');
 S.acts['pb'+id]=1;if(ap)S.ap--;S.money-=cost;
 let g=R(lo,hi);const hit=tags.some(t=>b.hb.includes(t));if(hit)g+=2;if(ll&&b.ll===ll)g+=3;
 let m=pick(tx);
 if(hit)m+=`（這正好是${pbHe(p)}的興趣。）`;if(ll&&b.ll===ll)m+=`（${pbHe(p)}的愛的語言就是「${ll}」，效果特別好。）`;
 if(Math.random()<.1&&!hit){g=-R(1,3);m+='不過今天對方有點心不在焉，氣氛普通。'}
 p.rel=cl(p.rel+g);chg('happy',g>0?R(1,3):-1);fx&&fx();pbKn(p,kn||R(2,5));
 if(S.partner)p.lastI=S.age;
 const r=`${p.n}：${m}好感 ${g>=0?'+':''}${g}。`;log(r,g>0?'good':'');return g>0?G(r):N(r);
}
function pbFam(id){
 const p=S.partner,b=p.pb;
 if(id==='mf'){
  if(b.mf)return B('你已經拜訪過對方的家人了。');if(S.ap<1)return B('行動點不足。');S.ap--;b.mf=1;
  const ok=p.rel>=60||chance(.5),fb=p.fb==='rich'?'氣派的老家':p.fb==='poor'?'簡樸卻溫暖的老家':'乾淨整齊的老家';
  if(ok){p.rel=cl(p.rel+R(4,8));pbKn(p,10);const m=`你到${p.n}的${fb}拜訪，家人準備了豐盛的飯菜，氣氛不錯。`;log(m,'good');return G(m)}
  p.rel=cl(p.rel-R(2,6));pbKn(p,8);S.stress=cl(S.stress+3);const m=`${p.n}的家人對你有些保留，整頓飯氣氛有點緊繃。`;log(m,'bad');return B(m);
 }
 if(b.mi)return B('你已經帶對方見過你的家人了。');if(S.ap<1)return B('行動點不足。');
 const ps=[S.mom,S.dad].filter(x=>x&&x.alive);if(!ps.length)return B('你的父母都已不在了。');
 S.ap--;b.mi=1;const avg=ps.reduce((a,x)=>a+x.rel,0)/ps.length;
 if(chance(.35+avg/200)){p.rel=cl(p.rel+R(4,8));ps.forEach(x=>x.rel=cl(x.rel+2));const m=`你帶${p.n}回家，爸媽很喜歡${pbHe(p)}，還一直問你們的計畫。`;log(m,'good');return G(m)}
 p.rel=cl(p.rel-R(1,4));const m=`你帶${p.n}回家，爸媽問了很多問題，${p.n}回程時有點累。`;log(m,'bad');return N(m);
}
function pbPet(){
 const p=S.partner,b=p.pb;if(b.pet)return B('你們已經有寵物了。');if(!(p.married||p.cohab))return B('需要先同居或結婚。');
 if(S.money<8000)return B('你的錢不夠。');S.money-=8000;b.pet=pick(['貓','狗']);p.rel=cl(p.rel+R(4,8));chg('happy',6);
 const m=`你們領養了一隻${b.pet}，家裡多了一個小傢伙。`;log(m,'good');return G(m);
}
function pbRec(){
 const p=S.partner;if(S.acts.pbrec)return B('今年已經談過一次了。');if(S.ap<1)return B('行動點不足。');S.ap--;S.acts.pbrec=1;
 if(chance(.55)){p.rel=cl(p.rel+R(6,12));pbKn(p,6);const m=`你和${p.n}坐下來好好談了一次，誤會一一解開。`;log(m,'good');return G(m)}
 p.rel=cl(p.rel-R(1,4));S.stress=cl(S.stress+3);const m=`你們談得不順利，需要一點時間冷靜。`;log(m,'bad');return B(m);
}
function pbButtons(p){
 const b=pbFix(p);
 const mk=a=>{const [id,l,cost,ap,,,,,,,need]=a,used=S.acts['pb'+id],lock=need&&b.kn<need;
  return `<button class="btn" data-a="pb:${id}" ${used||lock||S.dead?'disabled':''}>${l}<small>${cost?'費用 '+money(cost)+'・':''}${ap?'1 點行動':'不耗行動點'}${lock?'・了解度 '+need+' 解鎖':''}${used?'（今年已做）':''}</small></button>`};
 let h=PBA.map(mk).join('');
 h+=`<button class="btn" data-a="pb:mf" ${b.mf?'disabled':''}>拜訪對方的家人<small>1 點行動・只能一次${b.mf?'（已完成）':''}</small></button>`;
 h+=`<button class="btn" data-a="pb:mi" ${b.mi?'disabled':''}>帶對方見你的家人<small>1 點行動・只能一次${b.mi?'（已完成）':''}</small></button>`;
 if(p.married||p.cohab)h+=`<button class="btn" data-a="pb:pet" ${b.pet?'disabled':''}>一起養寵物<small>費用 ${money(8000)}・只能一次${b.pet?'（已有）':''}</small></button>`;
 if(p.rel<50)h+=`<button class="btn" data-a="pb:rec" ${S.acts.pbrec?'disabled':''}>認真談一次、修復關係<small>1 點行動・可能成功也可能更僵</small></button>`;
 return h;
}
const _pp63=partnerPage;
partnerPage=function(){
 const h=_pp63(),p=S.partner;if(!p)return h;
 if(view.scene&&view.scene.k==='p')return h;
 const i=h.indexOf('<button class="btn"'),j=h.lastIndexOf('<button class="btn" data-a="rom:go:h">');
 if(i<0||j<0||j<i)return h;
 return h.slice(0,i)+'<div class="sec">伴侶檔案</div>'+pbProfile(p)+'<div class="sec">基本互動</div>'+h.slice(i,j)+'<div class="sec">更多互動（依對方的興趣與愛的語言，效果不同）</div>'+pbButtons(p)+h.slice(j);
};
const _hd63=handle;
handle=function(a){
 if(typeof a==='string'&&S&&a.startsWith('pb:')){const r=pbRun(a.slice(3));view.msg=r;view.tab='rel';render();showSheet('rel','partner');return}
 return _hd63(a);
};
const _y63=yearly;
yearly=function(){
 _y63();
 try{const p=S.partner;if(p){const b=pbFix(p);pbKn(p,(p.married||p.cohab)?5:3);if(b.pet){p.rel=cl(p.rel+1);if(chance(.4))log(`家裡的${b.pet}今年又闖了禍，卻讓你們笑了很久。`,'good')}}}catch(e){}
};
