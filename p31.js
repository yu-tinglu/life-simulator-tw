/* ---- 宗教與信仰（p31）----
   各國宗教分布為依近年人口普查／民調四捨五入的概略估計（Pew、各國普查、台灣內政部宗教統計等），遊戲內非官方精確數字。 */
const RGD={
 TW:[['民間信仰／道教',.43],['佛教',.22],['無宗教',.18],['基督新教',.055],['天主教',.015],['一貫道',.03],['伊斯蘭教',.005],['其他',.065]],
 US:[['基督新教',.40],['天主教',.19],['無宗教',.29],['猶太教',.02],['伊斯蘭教',.01],['佛教',.01],['印度教',.01],['其他',.07]],
 JP:[['神道／佛教（習俗）',.69],['無宗教',.25],['基督教',.015],['新興宗教',.03],['其他',.015]],
 KR:[['無宗教',.51],['基督新教',.20],['佛教',.16],['天主教',.08],['其他',.05]],
 DE:[['天主教',.25],['基督新教',.225],['無宗教',.40],['伊斯蘭教',.06],['其他',.065]],
 GB:[['基督教',.46],['無宗教',.37],['伊斯蘭教',.065],['印度教',.017],['錫克教',.009],['猶太教',.005],['佛教',.005],['其他',.069]],
 CA:[['基督教',.53],['無宗教',.35],['伊斯蘭教',.049],['印度教',.023],['錫克教',.021],['佛教',.01],['猶太教',.009],['其他',.008]],
 AU:[['基督教',.44],['無宗教',.39],['伊斯蘭教',.032],['印度教',.027],['佛教',.024],['錫克教',.008],['其他',.079]],
 SG:[['佛教',.31],['無宗教',.20],['基督教',.19],['伊斯蘭教',.16],['民間信仰／道教',.09],['印度教',.05],['其他',.01]]
};
function rgFam(r){if(!r)return'none';if(/無宗教/.test(r))return'none';if(/民間|道教|神道/.test(r))return'folk';if(/佛/.test(r))return'bud';if(/基督|新教|天主/.test(r))return'chr';if(/伊斯蘭/.test(r))return'isl';if(/印度教/.test(r))return'hin';if(/錫克/.test(r))return'sik';if(/猶太/.test(r))return'jew';if(/一貫道|新興/.test(r))return'new';return'oth'}
const FAMN={folk:'民間信仰',bud:'佛教',chr:'基督宗教',isl:'伊斯蘭教',hin:'印度教',sik:'錫克教',jew:'猶太教',new:'新興宗教',oth:'其他信仰',none:'無宗教'};
const RGDESC={
 folk:'以祖先崇拜、土地公與媽祖等神明信仰、廟會和歲時祭儀為主，常與生活習俗結合。',
 bud:'以佛陀教誨為核心，重視修行、慈悲與因果觀念，在各地發展出不同傳統與節日。',
 chr:'包括新教、天主教等，以耶穌基督為信仰核心，常見教會禮拜、聖誕節與復活節。',
 isl:'穆斯林每日禮拜、齋戒月白天禁食、飲食遵守清真規範，並於開齋節等節日團聚。',
 hin:'印度教有多元的神祇與傳統，常見廟宇參拜、家庭祭儀與排燈節等節慶。',
 sik:'錫克教強調平等與服務，信徒蓄髮、戴頭巾，並在謁師所（Gurdwara）共食與禮拜。',
 jew:'猶太教以律法與傳統維繫社群，包括安息日、逾越節與光明節等。',
 new:'包含一貫道、新興教團等，各團體有自己的教義與聚會方式。',
 oth:'你的家庭有自己獨特的信仰與傳統。',
 none:'你沒有特定宗教信仰；有些人是無神論者，也有些人保有個人的靈性追求。'};
const RGCTX={
 TW:'台灣宗教自由，民間信仰、佛教與道教信徒眾多，廟宇數量極多，民間信仰活動與節慶普遍。',
 US:'美國憲法保障宗教自由並政教分離，教會是許多社區的社交與互助中心。',
 JP:'日本多數人在新年參拜神社、喪禮採佛教儀式，宗教多半以習俗形式融入生活。',
 KR:'韓國宗教多元，基督新教、佛教與天主教並存，教會在社群中影響力大，也有祭祀祖先的傳統。',
 DE:'德國有教會稅制度：登記為天主教或新教徒者，需按所得稅一定比例繳納教會稅（約 8–9%）。',
 GB:'英國有國教（英格蘭教會），但社會高度多元，近年宣稱無宗教者增加。',
 CA:'加拿大推行多元文化政策，各宗教皆享有宗教自由，無宗教人口比例持續上升。',
 AU:'澳洲政教分離，社會多元，近年無宗教者與其他宗教人口持續增加。',
 SG:'新加坡是宗教多元的國家，有《維護宗教和諧法》，各族群都互相尊重彼此的節日與習俗。'};
const FEST={
 folk:{TW:'廟會、拜拜與農曆節日祭祀',JP:'新年初詣、神社祭典與盂蘭盆節',SG:'華人廟宇、拜拜與中元節',_:'傳統祭儀與節慶'},
 bud:{TW:'寺院、浴佛節與素食',JP:'寺院法事與盂蘭盆節',KR:'寺廟與釋迦誕辰日的燃燈會',SG:'佛寺與衛塞節',_:'佛學中心、禪修與衛塞節'},
 chr:{_:'教會禮拜、聖誕節與復活節'},isl:{_:'清真寺、主麻聚禮與齋戒月'},hin:{_:'廟宇參拜與排燈節'},sik:{_:'謁師所禮拜與瓦薩基節'},jew:{_:'安息日、逾越節與光明節'},new:{_:'教團聚會與法會'},oth:{_:'傳統節日'}};
const fest=(f,k)=>(FEST[f]&&(FEST[f][k]||FEST[f]._))||'節日活動';
const TRG={bud:['佛教',],chr:['基督新教','天主教','基督教'],isl:['伊斯蘭教'],hin:['印度教'],folk:['民間信仰／道教']};
function pickRg(k){return wpick(RGD[k]||RGD.TW)}
function rgInit(){
 if(S.rg)return S.rg;const k=S.cn||'TW';
 [S.mom,S.dad].forEach(p=>{if(p&&!p.rg){const r=pickRg(k);p.rg={r,d:/無宗教/.test(r)?0:R(25,80)}}});
 const par=pick([S.mom,S.dad].filter(Boolean));let r,d;
 if(par&&chance(.78)){r=par.rg.r;d=/無宗教/.test(r)?0:cl(par.rg.d*.7+R(0,30))}else{r=pickRg(k);d=/無宗教/.test(r)?0:R(20,75)}
 S.rg={r,d};return S.rg;
}
const rgN=()=>rgInit().r,rgD=()=>rgInit().d,rgF=()=>rgFam(rgN()),rgIs=()=>rgF()!=='none';
const _nk31=newKid;
newKid=function(sx,n){
 const k=_nk31(sx,n);rgInit();const a=S.rg,b=S.partner&&S.partner.rg;let p=a;
 if(b&&b.r!==a.r&&chance(.5))p=b;
 k.rg={r:p.r,d:/無宗教/.test(p.r)?0:cl(p.d*.7+R(0,25))};return k;
};
const _as31=applySuccession;
applySuccession=function(r,k){const rg=k.rg;_as31(r,k);S.rg=rg||null;rgInit()};
const _mk31=mkPartner;
mkPartner=function(c){
 _mk31(c);const p=S.partner;if(!p||p.rg)return;rgInit();const k=p.res||S.cn||'TW';
 const r=chance(.4)?S.rg.r:pickRg(k);p.rg={r,d:/無宗教/.test(r)?0:R(20,80)};
};
/* dv token */
const _fx31=fxApply;
fxApply=function(k,spec){const a=[];(spec||'').split(' ').forEach(t=>{const r=t.match(/^dv([+-]\d+)$/);if(t==='kx'){S.flags.kexit=1}else if(r){rgInit();if(+r[1]<=-100)S.rg={r:'無宗教',d:0};else if(S.rg.d>0||+r[1]>0&&rgIs())S.rg.d=cl(S.rg.d+ +r[1])}else a.push(t)});return _fx31(k,a.join(' '))};
/* 事件 helper */
function gEv(id,min,max,w,fams,text,opts,iff){
 E.push({id:'rg_'+id,min,max,w,if:()=>{rgInit();return (fams==='*'||fams.includes(rgF()))&&(!iff||iff())},run:()=>({t:typeof text==='function'?text():text,c:opts.map(o=>{
  const p=o.split('|');return ch(p[0],()=>{const m=fxApply(S.cn||'TW',p[1]);const tone={g:G,b:B,n:N}[p[2][0]]||N;return tone(p[2].slice(2)+(m?`（${m>0?'收入':'支出'}約 ${fmtL(S.cn||'TW',Math.abs(m))}）`:''))})})})});
}
const REL=['folk','bud','chr','isl','hin','sik','jew','new','oth'];
/* 童年 */
gEv('kid',4,12,4,REL,()=>`家人帶你參加${fest(rgF(),S.cn||'TW')}，你第一次認真看著大人們怎麼做。`,['跟著大人一起做，認真學|dv+5 fam+2 h+2|g:你記住了很多儀式與故事。','好奇地問東問西|opn+1 dv+2 sm+1|g:長輩樂於回答你的疑問。','覺得無聊，想去玩|dv-3|n:你心不在焉地坐在旁邊。']);
gEv('school',5,15,3,'*',()=>{const k=S.cn||'TW';return k==='GB'?'學校有宗教教育與集體晨會，老師講到不同宗教的故事。':k==='AU'?'學校提供宗教教育（SRE）選修，你要決定要不要參加。':k==='DE'?'學校要選修「宗教課」或「倫理課」，你和家人討論後做決定。':'同學之間聊起各自的宗教與節日，你好奇地聽著。'},['認真聽，也分享自己家的習俗|comm+1 opn+1 nt+1|g:你發現大家的習俗有很多相似處。','聽一聽就好||n:你覺得很有趣，但沒放在心上。','覺得自己和別人不一樣，有點不自在|st+1|n:你默默把話藏在心裡。']);
/* 節日與生活 */
gEv('fest',16,85,4,REL,()=>`${fest(rgF(),S.cn||'TW')}的日子到了，你想起這個信仰在你生活中的位置。`,['參加並與家人聚會|dv+4 fam+2 h+3 m-1000|g:熟悉的儀式與食物讓你心安。','抽空簡單參加|dv+2 h+1|n:你完成了最重要的部分。','忙碌，這次沒去|dv-3 st+1|n:你覺得有些愧疚。'],()=>rgD()>=25);
gEv('ram',16,80,3,['isl'],'齋戒月到了，日出到日落不吃不喝，同時還要上班或上課。',['照常齋戒，並向主管與同學說明|dv+6 h+2 comm+1 st+2|g:同事主動調整會議時間，開齋時也一起分享食物。','盡力而為，身體不適時調整|dv+2 hl-1|n:你在信仰與健康間找到平衡。','今年無法齋戒|dv-5 st+1|n:你心裡有些掙扎。'],()=>rgD()>=30);
gEv('work',20,62,3,['isl','jew','sik','hin','chr','bud'],()=>`你的工作需要配合信仰（${rgF()==='isl'?'每日禮拜、清真飲食':rgF()==='jew'?'安息日、猶太潔食':rgF()==='sik'?'頭巾與蓄髮':rgF()==='hin'?'素食與節日休假':'週日禮拜與節日休假'}），你要和公司溝通。`,['主動溝通，爭取彈性安排|comm+1 sta+1 dv+2|g:主管答應調整，同事也學到了新知。','自己配合工作，不多說|st+3 dv-2|n:你默默壓下自己的需求。','考慮換到更包容的公司|st+1 dv+1|n:你開始看其他機會。'],()=>hasJob()&&rgD()>=35);
gEv('don',25,85,3,REL,'你所屬的宗教團體發起募款或奉獻（建廟、修繕或救濟）。',['慷慨奉獻（年收入約 3%）|dv+3 sp-3 nt+2 h+2|g:你覺得這筆錢花得有意義。','量力而為（約 1%）|dv+1 sp-1 h+1|n:你捐了一份心意。','這次不捐|dv-1|n:你說明了自己的難處。'],()=>rgD()>=40&&(hasJob()||S.money>1e5));
gEv('vol',18,78,3,REL,'你所屬的宗教團體需要志工參與關懷活動（送餐、探訪或賑災）。',['投入志工，每週固定參加|dv+4 nt+3 h+4 st-2|g:你認識了一群很溫暖的夥伴。','只在大活動時幫忙|dv+1 nt+1 h+1|n:你幫忙了一天。','工作太忙，抽不出時間|dv-1|n:你說有機會再參加。'],()=>rgD()>=30);
gEv('elder',60,95,4,REL,'你年紀大了，面對人生的許多變化。信仰是你每天固定的一部分。',['每天固定禱告或修行，心很平靜|dv+3 h+4 st-4|g:這份平靜讓你睡得很安穩。','與同修／教友聚會，互相陪伴|dv+2 nt+3 h+3|g:大家陪你聊天、吃飯。','比較少做了，但依然記得||n:你偶爾還是會想起。'],()=>rgD()>=50);
/* 信仰轉變 */
gEv('doubt',14,65,2,REL,'一段遭遇讓你對信仰產生了懷疑：真的有神嗎？規範真的合理嗎？',['找長輩或神職人員談，重新確認|dv+7 st-2|g:談完之後，你的信念更堅定。','保持距離，自己思考一陣子|dv-8 opn+1|n:你的參與越來越少。','離開宗教，成為無宗教者|dv-100|n:你決定不再屬於任何宗教。'],()=>rgD()>=45);
E.push({id:'rg_conv',min:15,max:70,w:2.5,if:()=>{rgInit();return rgD()<=60&&(S.stress>=55||(S.partner&&S.partner.rg&&S.partner.rg.r!==rgN()&&!/無宗教/.test(S.partner.rg.r))||chance(.2))},run:()=>{
 const k=S.cn||'TW',cur=rgN();const cand=RGD[k].filter(x=>x[0]!==cur&&!/無宗教|其他/.test(x[0]));const tg=S.partner&&S.partner.rg&&S.partner.rg.r!==cur&&!/無宗教/.test(S.partner.rg.r)&&chance(.6)?S.partner.rg.r:(cand.length?wpick(cand):pick(['基督新教','佛教','伊斯蘭教','天主教'].filter(x=>x!==cur)));
 return {t:`你遇到一位${FAMN[rgFam(tg)]}的信徒，邀請你參加聚會，談到你最近的心情。`,c:[
  ch(`認真了解，後來決定改信「${tg}」`,()=>{S.rg={r:tg,d:R(40,70)};S.flags.rgconv=(S.flags.rgconv||0)+1;chg('happy',3);S.stress=cl(S.stress-4);return G(`你正式成為「${tg}」的一員，家人有人支持，也有人驚訝。`)}),
  ch('去看看，但維持原本的信仰',()=>{S.net=cl((S.net||0)+2);S.rg.d=cl(S.rg.d+1);return N('你多認識了一個信仰，也多了朋友。')}),
  ch('禮貌婉拒',()=>N('你說明自己的立場，對方表示尊重。'))]}}});
gEv('seek',18,70,2.5,['none'],'你沒有特定信仰，但最近常常思考人生的意義，也想為心找個寄託。',['嘗試靜心與冥想（不屬於特定宗教）|st-4 h+2|g:你找到了每天靜下來的方式。','參觀不同宗教場所，聽聽他們的故事|opn+2 nt+2|g:你對各種信仰有了更多理解。','用科學與哲學自己找答案|sm+1 opn+1|n:你讀了很多書。'],()=>true);
E.push({id:'rg_seek2',min:18,max:70,w:1,if:()=>{rgInit();return rgF()==='none'&&S.stress>=60&&chance(.3)},run:()=>{const k=S.cn||'TW',c2=RGD[k].filter(x=>!/無宗教|其他/.test(x[0])),tg=c2.length?wpick(c2):'佛教';return {t:`壓力很大的時候，朋友邀你去${tg}的聚會，說那裡讓人很安心。`,c:[ch('試著加入',()=>{S.rg={r:tg,d:R(30,55)};S.stress=cl(S.stress-5);chg('happy',3);return G(`你開始固定參加「${tg}」的聚會，也交到新朋友。`)}),ch('去一次就好',()=>{S.stress=cl(S.stress-2);return N('你覺得氣氛不錯，但沒有加入。')}),ch('不想參加',()=>N('你婉拒了邀請。'))]}}});
/* 家庭與伴侶 */
gEv('famdisp',15,45,3,['none'],'長輩要你一起去參加宗教活動，但你不太信。',['陪長輩去，把它當作家庭活動|fam+2 st+1|n:你理解這對長輩的意義。','直接說出自己的想法|fam-2 sta+1|n:家裡的氣氛有些沉重，但你覺得坦然。','找藉口避開|st+1|n:你避開了一次衝突。'],()=>(S.mom.alive||S.dad.alive)&&[S.mom,S.dad].some(p=>p&&p.alive&&p.rg&&p.rg.r&&!/無宗教/.test(p.rg.r)&&p.rg.d>=50));
E.push({id:'rg_mix',min:18,max:60,w:5,if:()=>{rgInit();const p=S.partner;return !!(p&&p.rg&&p.rg.r!==rgN()&&!S.flags.rgmix&&(rgIs()||!/無宗教/.test(p.rg.r)))},run:()=>{S.flags.rgmix=1;const p=S.partner;return {t:`你發現你和${p.n}的信仰不同（你：${rgN()}；對方：${p.rg.r}），家人與朋友對此看法不一。`,c:[
 ch('互相了解、尊重彼此的信仰',()=>{p.rel=cl(p.rel+4);rgInit();S.rg.d=cl(S.rg.d+0);return G('你們一起參加對方的節日，也分享自己的習俗。')}),
 ch('討論是否一起改信同一個宗教',()=>{if(chance(.5)){S.rg={r:p.rg.r,d:R(35,60)};p.rel=cl(p.rel+5);return G(`你決定跟著${p.n}一起信仰「${p.rg.r}」。`)}p.rel=cl(p.rel-2);return N('你們討論很久，決定維持各自的信仰。')}),
 ch('避免談論宗教話題',()=>{S.stress=cl(S.stress+2);return N('話題成了你們之間的敏感地帶。')})]}}});
E.push({id:'rg_kids',min:22,max:50,w:5,if:()=>{rgInit();return !S.flags.rgk&&(S.kids||[]).some(k=>(k.age||0)<=8)&&S.partner&&S.partner.rg&&S.partner.rg.r!==rgN()},run:()=>{S.flags.rgk=1;const p=S.partner;return {t:`你和${p.n}信仰不同，孩子需要決定怎麼接觸宗教。`,c:[
 ch('依你的信仰教養孩子',()=>{S.kids.forEach(k=>{if((k.age||0)<=8)k.rg={r:S.rg.r,d:/無宗教/.test(S.rg.r)?0:R(30,70)}});p.rel=cl(p.rel-1);return N('孩子跟著你參加儀式。')}),
 ch(`依${p.n}的信仰教養孩子`,()=>{S.kids.forEach(k=>{if((k.age||0)<=8)k.rg={r:p.rg.r,d:/無宗教/.test(p.rg.r)?0:R(30,70)}});p.rel=cl(p.rel+2);return N('孩子跟著伴侶參加儀式。')}),
 ch('兩邊都接觸，長大自己選',()=>{S.kids.forEach(k=>{if((k.age||0)<=8)k.rg={r:'無宗教',d:0}});chg('happy',2);return G('孩子參加了兩邊的節日，長大後再自己決定。')})]}}});
/* 風險：邪教、算命詐騙 */
E.push({id:'rg_cult',min:18,max:65,w:1.8,if:()=>{rgInit();return S.age>=18&&S.money>2e5&&(S.stress>=50||rgD()<35)},run:()=>({t:'有人熱情邀你加入一個「心靈成長」團體，說可以改運、消災，但需要繳高額課程費或奉獻。',c:[
 ch('參加一次說明會就婉拒',()=>{S.net=cl((S.net||0)+1);return N('你覺得氛圍怪怪的，沒有再去。')}),
 ch('相信了，投入大筆金額',()=>{const lost=Math.round(Math.max(sal(),S.money*.03)*R(30,100)/100);S.money-=lost;S.stress=cl(S.stress+8);chg('happy',-6);return B(`你被要求不斷繳錢與奉獻，總共損失約 ${money(lost)}，後來才發現是詐騙。`)}),
 ch('查證後向警方或消費者單位通報',()=>{S.stress=cl(S.stress-1);return G('你把可疑資訊整理後通報，避免更多人受騙。')})]})});
cEv('TW','fortune',16,80,3,'朋友介紹一位很有名的老師，可以算命、看風水或改運。',['去問問，但保持懷疑|m-1500 st-1|n:你當作參考，聽完就放下。','相信，花大錢改運|m-30000|b:事後發現沒有什麼改變，錢卻花了不少。','不信，也不花錢||n:你笑著婉拒。']);
cEv('TW','temple',8,85,3,'你到廟裡拜拜，向神明擲筊問事，也抽了一支籤。',['誠心禱告，也記得靠自己努力|st-2 h+2 dv+2|g:你覺得心裡踏實許多。','抽到好籤，開心拍照|h+3|g:籤詩讓你笑了一整天。','沒抽到好籤，心裡有點在意|st+1|n:你告訴自己只是參考。'],()=>rgF()==='folk'||rgF()==='bud'||rgF()==='none');
cEv('JP','hatsumode',3,95,4,'新年了，你和家人一起去神社初詣、抽籤、買護身符。',['排隊參拜，抽籤並綁在樹上|h+3 fam+2 dv+1|g:新年的氣氛讓人心情很好。','在家看電視，沒出門|h+1|n:你只在電視上看人潮。','買了護身符送給家人|m-1000 fam+3|g:家人很開心。']);
cEv('KR','chuseok',6,90,3,'中秋節（秋夕）家族要舉行祭祀祖先的儀式，但家裡有人是基督徒，意見不同。',['尊重家人，以追思方式參與|fam+2 st+1|n:全家以彼此都能接受的方式追思。','依自己的信仰，不參與祭祀|fam-2 dv+1|n:家裡氣氛有些尷尬。','大家討論出折衷方案|fam+3 comm+1|g:你們找到彼此都舒服的方式。'],()=>rgF()==='chr'||(S.mom&&S.mom.rg&&rgFam(S.mom.rg.r)==='chr'));
cEv('KR','church',10,80,3,'教會的小組聚會成為你認識朋友與互相幫忙的重要場合。',['固定參加，認識新朋友|nt+3 dv+3 h+2|g:你找到一群互相支持的夥伴。','偶爾去一次|nt+1|n:你覺得氣氛不錯。','不太習慣，婉拒||n:你保持自己的步調。'],()=>rgF()==='chr');
cEv('US','church',10,90,3,'教會是你所在社區的社交與互助中心，有主日學、查經班與食物銀行。',['加入小組，參與社區服務|nt+3 dv+3 h+3|g:你在社區裡有了一群互相支持的朋友。','偶爾參加活動|nt+1|n:你和鄰居聊了幾句。','沒有參與||n:你覺得時間不夠。'],()=>rgF()==='chr');
cEv('US','faithwork',20,62,2,'公司同事在休息室討論宗教與政治，氣氛開始緊張。',['轉移話題，維持和氣|comm+1 sta+1|g:大家笑一笑就過去了。','說明自己的看法，但保持尊重|comm+1 agr+0|n:雙方各自表達，沒有爭吵。','直接離席|st+1|n:你不想捲入。'],()=>hasJob());
cEv('DE','ktax',20,62,3,'你登記為教會成員，每月薪資單上有教會稅（約為所得稅的 8–9%）。',['繼續當教會成員，參加教會活動|dv+2|n:你覺得這筆稅是社群的一部分。','研究退出教會的程序與影響|fin+1|n:你查了法院或戶政單位的退出流程。','正式退出教會，省下教會稅|dv-30 kx|g:退出後每年節省一些稅款，但教會婚禮與葬禮可能受限。'],()=>hasJob()&&(rgF()==='chr')&&!S.flags.kexit);
cEv('GB','assembly',5,15,3,'學校的集體晨會與宗教教育課談到不同宗教與節日，大家各自分享。',['認真聽，也分享自己的家庭習俗|opn+1 comm+1|g:你發現同學們的家庭很不一樣。','聽一聽就好||n:你覺得有點無聊。'],()=>true);
cEv('CA','multifaith',5,90,3,'社區的多元信仰活動，讓不同宗教的鄰居分享各自的節日（如排燈節、開齋節、聖誕節）。',['帶著食物參加，認識新朋友|nt+3 h+3 opn+1 m-100|g:你吃到了好多不同的美食。','好奇地聽他人分享|opn+1|n:你學到不少新東西。','忙，沒參加||n:你錯過了一次聚會。'],()=>true);
cEv('AU','multifaith',5,90,3,'社區舉辦宗教與文化交流日，邀請各宗教代表分享。',['參加並聽他們說明|opn+1 nt+2|g:你學到很多尊重彼此的方式。','在旁邊看看||n:你拍了幾張照片。'],()=>true);
cEv('SG','harmony',5,90,4,'鄰居慶祝別的宗教的節日（例如開齋節、屠妖節或農曆新年），邀你去拜訪並共食。',['帶著伴手禮去拜訪，一起吃飯|nt+3 h+3 opn+1 m-100|g:大家笑得很開心，也學到了節日的意義。','簡單問候一下|nt+1|n:你收到了對方分享的點心。','這次沒去||n:你下次一定去。'],()=>true);
cEv('SG','halal',8,60,2,'同事聚餐要選餐廳，有人吃清真、有人吃素、有人不吃牛。',['選每個人都能吃的店|comm+1 nt+1|g:大家都吃得很開心。','分成幾桌各吃各的||n:聚餐還是順利。'],()=>hasJob());
/* 年度：虔誠度漂移與德國教會稅 */
const _y31=yearly;
yearly=function(){_y31();rgInit();const g=S.rg;
 if(g.d>0){g.d=cl(g.d+(S.age>60?1:0)+R(-2,1));if(g.d>=60&&chance(.5))S.stress=cl(S.stress-1)}
 if(S.cn==='DE'&&rgF()==='chr'&&!S.flags.kexit&&g.d>0&&hasJob()&&S.age>=18)S.money-=Math.round(sal()*.2*.09);
 if(S.cn==='DE'&&/無宗教/.test(g.r))S.flags.kexit=1};
/* 頁面 */
function rgHTML(){
 rgInit();const g=S.rg,k=S.cn||'TW',f=rgF();
 let h=`<h3>宗教與信仰</h3><div class="item"><b>你的信仰：${esc(g.r)}</b><div class="sub">${esc(RGDESC[f]||'')}</div></div>`;
 if(f!=='none')h+=`<div class="item"><b>虔誠度 ${g.d}%</b><div class="bar"><i style="width:${g.d}%"></i></div><div class="sub">常見活動：${esc(fest(f,k))}。</div><button class="btn" data-a="rg:prac">今年參與宗教活動</button></div>`;
 h+=`<div class="item"><b>${esc(CNS[k].n)}的宗教環境</b><div class="sub">${esc(RGCTX[k]||'')}</div></div>`;
 const par=[['媽媽',S.mom],['爸爸',S.dad]].filter(x=>x[1]&&x[1].rg).map(x=>x[0]+'：'+x[1].rg.r).join('、');
 if(par)h+=`<div class="item"><b>父母</b><div class="sub">${esc(par)}</div></div>`;
 if(S.partner&&S.partner.rg)h+=`<div class="item"><b>伴侶：${esc(S.partner.n)}</b><div class="sub">${esc(S.partner.rg.r)}</div></div>`;
 const ks=(S.kids||[]).filter(x=>x.rg);if(ks.length)h+=`<div class="item"><b>子女</b><div class="sub">${esc(ks.map(x=>x.n+'：'+x.rg.r).join('、'))}</div></div>`;
 h+=`<div class="sub" style="margin-top:8px">宗教分布為依近年普查與民調四捨五入的概略估計；遊戲中宗教僅影響生活經驗與人際關係，不代表任何宗教的優劣。</div><button class="btn" data-a="back">← 返回</button>`;
 return h;
}
const _life31=lifeHTML,_more31=moreHTML,_lfH31=lfHandle;
moreHTML=function(){return _more31().replace('<button class="tile" data-a="lf:health">','<button class="tile" data-a="lf:rg"><b>🕊</b>宗教與信仰<small>信仰・節日・各國環境</small></button><button class="tile" data-a="lf:health">')};
lfHandle=function(x,y,z,u){if(x==='rg'){if(y==='prac'){if(S.acts.rgp)return B('今年已經參與過了。');S.acts.rgp=1;rgInit();S.rg.d=cl(S.rg.d+5);S.stress=cl(S.stress-2);chg('happy',1);return G('你花時間參與信仰活動，心裡平靜了些。')}return null}return _lfH31(x,y,z,u)};
lifeHTML=function(){return view.lsub==='rg'?rgHTML():_life31()};
const _ei31=endInfo;
endInfo=function(){rgInit();return _ei31()+`<p>信仰：${esc(S.rg.r)}${S.rg.d>0?`（虔誠度 ${S.rg.d}%）`:''}</p>`};
