/* ---- 族群、外來人口、網路跨國戀情與婚姻移民（p30）----
   台灣原住民族人口 62 萬 9,456 人、占 2.7%、16 族（內政部 2025 年底）；阿美 37.3%、排灣 18.1%、泰雅 16.3%。
   其餘族群比例、各國族群結構與外來人口來源為遊戲估算（身分可重疊，只用來決定家庭文化與相遇的人，不決定能力或命運）。 */
const ETHD={
 TW:[['閩南',.66],['客家',.13],['外省',.09],['原住民',.027],['新住民及其子女',.045],['混合／其他',.048]],
 US:[['非拉美裔白人',.58],['拉美裔',.195],['非裔',.125],['亞裔',.063],['原住民',.013],['多族裔／其他',.024]],
 JP:[['日本人',.97],['外國出身居民及其子女',.03]],
 KR:[['韓國人',.955],['外國出身／多文化家庭',.045]],
 DE:[['無移民背景',.70],['土耳其裔',.035],['東歐／波蘭裔',.07],['中東裔',.04],['俄語區／烏克蘭裔',.05],['其他',.105]],
 GB:[['白人英國人',.744],['其他白人',.073],['亞裔（南亞為主）',.093],['黑人',.04],['混合族裔',.029],['其他',.021]],
 CA:[['歐裔',.685],['原住民（First Nations／Métis／Inuit）',.05],['南亞裔',.071],['華裔',.047],['黑人',.043],['菲律賓裔',.026],['其他',.078]],
 AU:[['盎格魯／愛爾蘭裔',.60],['其他歐洲裔',.10],['亞裔',.17],['原住民及托雷斯海峽島民',.038],['中東／非洲／其他',.092]],
 SG:[['華人',.74],['馬來人',.135],['印度人',.09],['歐亞裔／其他',.035]]
};
const ETHO={TW:[['中國大陸',.45],['越南',.25],['印尼',.12],['泰國',.05],['菲律賓',.05],['日本',.03],['其他',.05]],
 US:[['墨西哥',.3],['印度',.12],['中國',.1],['菲律賓',.06],['其他',.42]],JP:[['中國',.25],['越南',.2],['韓國',.12],['菲律賓',.08],['其他',.35]],
 KR:[['中國（朝鮮族）',.3],['越南',.14],['泰國',.08],['其他',.48]],DE:[['土耳其',.3],['敘利亞',.1],['烏克蘭',.1],['其他',.5]],
 GB:[['印度',.2],['波蘭',.1],['巴基斯坦',.1],['其他',.6]],CA:[['印度',.25],['中國',.15],['菲律賓',.12],['其他',.48]],
 AU:[['英國',.2],['中國',.15],['印度',.15],['其他',.5]],SG:[['馬來西亞',.35],['中國',.2],['印度',.2],['其他',.25]]};
const IND=[['阿美族',.373],['排灣族',.181],['泰雅族',.163],['布農族',.09],['太魯閣族',.063],['卑南族',.037],['魯凱族',.028],['賽德克族',.018],['賽夏族',.011],['鄒族',.01],['達悟族',.01],['噶瑪蘭族',.005],['撒奇萊雅族',.004],['邵族',.003]];
function wpick(a){let t=a.reduce((s,x)=>s+x[1],0),r=Math.random()*t;for(const x of a){r-=x[1];if(r<=0)return x[0]}return a[0][0]}
const NM={
 jp:{s:['佐藤','鈴木','高橋','田中','伊藤','渡邊','山本','中村'],M:['健太','大輔','翔太','拓也','陽翔'],F:['美咲','陽菜','結衣','葵','彩香']},
 kr:{s:['金','李','朴','崔','鄭','趙','姜'],M:['民俊','瑞俊','智訓','賢宇'],F:['秀賢','智妍','書妍','河恩']},
 en:{s:['Smith','Johnson','Brown','Taylor','Wilson','Davis','Clark','Walker'],M:['Ethan','Noah','Liam','Jack','Oliver','Daniel','Lucas'],F:['Emma','Olivia','Sophie','Grace','Chloe','Hannah','Mia']},
 de:{s:['Müller','Schmidt','Weber','Fischer','Wagner','Becker'],M:['Lukas','Jonas','Felix','Paul','Leon'],F:['Anna','Mia','Lena','Laura','Clara']},
 vn:{s:['Nguyễn','Trần','Lê','Phạm'],M:['Minh','Hùng','Dũng'],F:['Lan','Hương','Mai']},
 id:{s:['Pratama','Wijaya','Santoso','Hidayat'],M:['Budi','Agus','Eko'],F:['Siti','Dewi','Rina']},
 ph:{s:['Santos','Reyes','Cruz','Garcia'],M:['Jose','Mark','Paolo'],F:['Maria','Angel','Joy']},
 th:{s:['Srisai','Chaiyasit','Wongsawat'],M:['Somchai','Anan','Kittipong'],F:['Pimchanok','Napat','Suda']},
 sgm:{s:['bin Ismail','bin Rahman','binti Hassan'],M:['Ahmad','Hafiz','Farid'],F:['Nur','Aisyah','Siti']},
 sgi:{s:['Kumar','Nair','Pillai','Singh'],M:['Rajesh','Arun','Vikram'],F:['Priya','Divya','Anitha']}
};
const NKEY={日本:'jp',韓國:'kr',美國:'en',英國:'en',加拿大:'en',澳洲:'en',德國:'de',越南:'vn',印尼:'id',菲律賓:'ph',泰國:'th',馬來西亞:'sgm',印度:'sgi'};
function nameOf(key,sx){const p=NM[key];if(!p)return fullName(sx);const g=sx==='男'?'M':'F',s=pick(p.s),n=pick(p[g]);return (key==='jp'||key==='kr')?s+n:key==='sgm'?n+' '+s:n+' '+s}
const CNAME={TW:'台灣',JP:'日本',KR:'南韓',US:'美國',CA:'加拿大',AU:'澳洲',GB:'英國',DE:'德國',SG:'新加坡'};
function localNameKey(k){if(k==='SG'){const r=Math.random();return r<.74?null:r<.875?'sgm':r<.965?'sgi':'en'}return {JP:'jp',KR:'kr',US:'en',CA:'en',AU:'en',GB:'en',DE:'de'}[k]||null}
const LANGN={閩南:'台語',客家:'客語',外省:'家鄉話',原住民:'族語','新住民及其子女':'母國語言','拉美裔':'西班牙語','亞裔':'祖籍語言','馬來人':'馬來語','印度人':'印度語系語言','華人':'華語與方言','土耳其裔':'土耳其語','南亞裔':'祖籍語言','華裔':'華語與方言','菲律賓裔':'塔加洛語'};
/* ===== 初始化與繼承 ===== */
function ethInit(){
 if(S.eth)return;const k=S.cn||'TW',g=wpick(ETHD[k]||ETHD.TW),e={g,sub:'',o:''};
 if(k==='TW'){
  if(g==='原住民')e.sub=wpick(IND);
  if(g==='新住民及其子女'){e.o=wpick(ETHO.TW);const par=Math.random()<.85?S.mom:S.dad;if(par){par.o=e.o;par.eth='新住民'}}
  if(g==='混合／其他'){const a=pick(['閩南','客家','外省']),b=pick(['閩南','客家','外省','原住民']);e.g=a===b?a:a+'／'+b}
 }else if(/外國|多文化|其他|移民/.test(g)||g.includes('混')){e.o=wpick(ETHO[k]||[['其他',1]])}
 S.eth=e;if(S.mt==null)S.mt=LANGN[e.g]?R(25,70):null;
}
const ethName=e=>e?(e.sub||e.g)+(e.o&&!/^混/.test(e.g)?`（${e.o}）`:''):'';
const _newKid30=newKid;
newKid=function(sx,n){
 const k=_newKid30(sx,n);ethInit();const a=S.eth,b=S.partner&&S.partner.eth;let c;
 if(!b||(b.g===a.g&&b.sub===a.sub))c=Object.assign({},a);
 else if(b.g==='外國籍'||a.g==='外國籍'){const o=b.g==='外國籍'?b.o:a.o;c=S.cn==='TW'?{g:'新住民及其子女',sub:'',o}:{g:'混血（含'+o+'）',sub:'',o}}
 else c=Math.random()<.5?Object.assign({},a):Object.assign({},b);
 k.eth=c;k.mt=S.mt==null?null:Math.round(S.mt*.8);return k;
};
const _as30=applySuccession;
applySuccession=function(r,k){
 const eth=k.eth,mt=k.mt;_as30(r,k);
 S.si=undefined;S.exp=0;S.expBy={};S.pend=null;S.lastSal=0;S.on=null;S.eth=eth||null;S.mt=mt==null?null:mt;S.wf=S.wf;
 if(S.eth&&S.eth.g==='新住民及其子女'&&S.cn==='TW'){const par=Math.random()<.85?S.mom:S.dad;if(par&&S.eth.o){par.o=S.eth.o;par.eth='新住民'}}
 ethInit();
};
/* 伴侶、朋友的族群與名字 */
const _mkP30=mkPartner;
mkPartner=function(c){
 const n0=c.n;_mkP30(c);const p=S.partner;if(!p)return;
 p.cn=c.cn||S.cn||'TW';
 if(c.cn&&c.cn!==(S.cn||'TW')){p.eth={g:'外國籍',sub:'',o:CNAME[c.cn]||c.cn};p.res=c.cn}
 else{const k=S.cn||'TW',g=wpick(ETHD[k]||ETHD.TW);p.eth=c.eth||{g,sub:g==='原住民'?wpick(IND):'',o:''};if(!c.eth&&/外國|多文化|其他|移民/.test(g)&&k!=='TW')p.eth.o=wpick(ETHO[k]||[['其他',1]]);if(!c.eth&&g==='新住民及其子女'){p.eth.o=wpick(ETHO.TW)}}
};
const _nc30=newCrush;
newCrush=function(src){
 const c=_nc30(src),k=S.cn||'TW';
 if(k!=='TW'){const key=localNameKey(k);if(key&&chance(.9))c.n=nameOf(key,c.sx)}
 return c;
};
const _nf30=newFriend;
newFriend=function(kind){
 const f=_nf30(kind),k=S.cn||'TW';
 if(k!=='TW'){const key=localNameKey(k);if(key&&chance(.85))f.n=nameOf(key,f.sx)}
 else if(chance(.07)){const o=wpick(ETHO.TW.filter(x=>x[0]!=='其他'));const key=NKEY[o]||null;f.o=o;f.kind=pick(['移工朋友','新住民朋友','外籍同事']);if(key)f.n=nameOf(key,f.sx)}
 return f;
};
/* 母語 */
const _fx30=fxApply;
fxApply=function(k,spec){const a=[];(spec||'').split(' ').forEach(t=>{const r=t.match(/^mt([+-]\d+)$/);if(r){if(S.mt!=null)S.mt=cl(S.mt+ +r[1])}else a.push(t)});return _fx30(k,a.join(' '))};
const famLang=()=>{ethInit();return LANGN[S.eth.g]==='母國語言'?(S.eth.o+'語'):(LANGN[S.eth.g]||'母語')};
/* ===== 台灣：族群與外來人口事件 ===== */
const tEv=(id,min,max,w,text,opts,iff)=>cEv('TW',id,min,max,w,text,opts,iff);
const isE=(...g)=>()=>{ethInit();return g.includes(S.eth.g)};
tEv('accent',8,45,3,'同學或同事學你的口音、模仿你家人說話的腔調，有人當作玩笑，也有人讓你不舒服。',['笑笑帶過|sta+1|n:你學會把尷尬化成玩笑。','直接告訴對方這樣會讓你不舒服|comm+1 st-2 agr+0|g:對方道歉，之後收斂了。','為了不被笑，盡量不開口說母語|mt-6 st+1|n:你慢慢失去了一些母語的自在。']);
tEv('lang',6,16,3,()=>`長輩習慣用${famLang()}跟你說話。`,['努力用母語回答|mt+8 fam+2 h+1|g:長輩笑得很開心，說你很有天分。','聽得懂，但都用國語回答|mt+1|n:長輩也習慣了，只是越來越少說母語。','很少聽，漸漸聽不太懂|mt-6 fam-1|n:有些話你開始不確定意思。'],()=>{ethInit();return S.mt!=null&&LANGN[S.eth.g]});
tEv('min_pray',5,90,3,'農曆七月家家戶戶普渡拜拜，家裡長輩準備了牲禮與金紙。',['跟著長輩一起準備，聽他們講故事|fam+3 h+2 mt+3|g:你知道了很多家族的故事。','幫忙拿東西，其餘不太參與|fam+1|n:你完成了份內的事。','忙著打電動，沒參與|fam-1|n:長輩沒說什麼，但有點可惜。'],isE('閩南'));
tEv('min_family',18,80,2,'春節祭祖與拜天公，親戚到齊，家族長輩談起渡海來台的祖先。',['認真聽，並記下家族歷史|fam+2 h+3|g:你替家譜補了幾行。','只顧著吃團圓飯|h+2|n:你吃得很開心。'],isE('閩南'));
tEv('hak_yimin',6,80,3,'農曆七月的義民祭，客家庄的廟前辦起祭典，家人帶著你去。',['跟著長輩參加祭典，吃客家米食|fam+3 h+3 mt+3|g:你在廟前看到了客家人的團結。','在旁邊看熱鬧|h+2|n:你吃了好多粄。'],isE('客家'));
tEv('hak_food',8,80,3,'春天的客家桐花祭，山上白花像下雪；家裡阿婆做了擂茶和粄。',['學做粄和擂茶|h+4 fam+2 cre+1|g:阿婆說你學得很快。','去賞桐花拍照|h+3 m-300|g:你在花雨中走了很久。']);
tEv('wai_village',6,60,3,'長輩在眷村長大，餐桌上有牛肉麵、饅頭和各省口味，聊天時總提起老家。',['聽長輩講老家的故事|fam+3 h+2|g:你第一次知道家族是怎麼走到今天的。','陪長輩去眷村文化園區走走|h+3 m-500|g:老眷村的巷弄讓你很有感觸。','不太感興趣，覺得是上一代的事|fam-1|n:長輩有些失落。'],isE('外省'));
tEv('wai_return',30,85,2,'兩岸開放探親後，長輩一直想回老家看看，希望你陪他一起去。',['陪長輩回鄉探親|m-60000 fam+5 h+3|g:長輩在老家的祖墳前哭了很久。','幫他安排行程，自己沒去|m-30000 fam+2|n:長輩獨自完成了心願。','工作太忙，下次再說|fam-2|b:長輩沒有再提起，但你知道他很想去。'],()=>{ethInit();return S.eth.g==='外省'&&S.year>=1987&&(S.mom.alive||S.dad.alive)});
tEv('ind_fest',5,90,3,()=>`部落裡的傳統祭典（例如${S.eth.sub||'族'}的祭儀）又到了，大家穿上傳統服飾、唱歌跳舞。`,['回部落參加，跟長輩學歌舞|fam+3 h+4 mt+5|g:你在圍成的圈裡跟著大家唱起古調。','因為工作或課業沒空回去|st+2 h-1|n:你錯過了祭典，心裡有點空。','帶朋友一起去體驗|nt+2 h+3 opn+1|g:朋友玩得很開心，也更了解你的文化。'],isE('原住民'));
tEv('ind_lang',6,40,3,'學校或社區有族語課程，也有族語認證可以報考。',['認真學，報考族語認證|mt+8 sm+1 h+1|g:你通過了一個級別，長輩很驕傲。','上課但不太用功|mt+2|n:你學了一些簡單的詞。','覺得用不到，沒有參加|mt-3|n:你和族語的距離又遠了一點。'],()=>{ethInit();return S.eth.g==='原住民'});
tEv('ind_city',17,35,3,'你要離開部落，到都市念書或工作。',['進城奮鬥，常回部落|m-8000 st+3 fam+1|n:你在城市裡努力適應，週末常想念部落。','留在部落附近找工作|st-2 h+2 fam+3|g:你離家人與山林都很近。','進城後很少回去|st+2 fam-3 mt-4|n:你漸漸跟部落疏遠了。'],()=>{ethInit();return S.eth.g==='原住民'});
tEv('new_lang',6,12,4,()=>`學校開了新住民語文課，可以選學媽媽母國的語言（${S.eth.o||'母國'}語）。`,['選修，並常跟媽媽練習|mt+8 fam+3 h+2|g:媽媽很開心，你也多了一種語言。','選修但不太在意|mt+2|n:你學了幾個詞。','不想被同學知道，沒有選|mt-4 st+1|n:你覺得有點不自在。'],isE('新住民及其子女'));
tEv('new_label',7,25,3,'有人說你是「外籍媽媽的小孩」，帶著玩笑或刻板印象。',['向大家介紹媽媽的家鄉與文化|comm+1 sta+1 agr+0|g:同學對你的家鄉有了新的認識。','不在意，笑笑帶過|sta+1|n:你不想讓這種話影響自己。','很生氣，跟對方吵起來|st+4 agr-1|b:老師找你們兩個談話。'],isE('新住民及其子女'));
tEv('new_visit',10,40,3,()=>`暑假要去外婆家（${S.eth.o||'母國'}）探親，需要自己出機票錢或由家人出資。`,['去探親，體驗不同的生活|m-30000 fam+4 h+4 opn+1|g:外婆家的菜和語言讓你很難忘。','只用視訊聯絡|fam+1|n:外婆說下次一定要回去看看。'],isE('新住民及其子女'));
tEv('mw',15,75,3,'你身邊有外籍移工同事、鄰居，或照顧家人的看護，彼此的日常有了互動。',['主動學幾句他們的語言，一起吃飯|opn+1 h+3 nt+2|g:對方很開心，也教了你拿手菜。','保持禮貌，但不太互動||n:你們點頭示意。','聽到刻板印象的玩笑，出面澄清|agr+1 st+1|g:你替他們說了幾句公道話。']);
E.push({id:'ethmar',min:20,max:60,w:4,if:()=>!!(S.partner&&S.partner.eth&&(ethInit(),S.partner.eth.g!==S.eth.g)&&!S.flags.ethm),run:()=>{S.flags.ethm=1;return {t:'長輩得知你的伴侶來自不同的族群背景（或國家），有人好奇，也有人擔心。',c:[ch('帶對方參加家族聚會，讓長輩慢慢認識',()=>{[S.mom,S.dad].forEach(p=>{if(p&&p.alive)p.rel=cl(p.rel+2)});S.partner.rel=cl(S.partner.rel+3);return G('一次次聚會後，長輩逐漸接納了對方。')}),ch('直接告訴長輩這是你的決定',()=>{[S.mom,S.dad].forEach(p=>{if(p&&p.alive)p.rel=cl(p.rel-3)});S.stress=cl(S.stress+3);return N('氣氛有些緊繃，但你的立場很清楚。')}),ch('先不談，等關係更穩定',()=>{S.stress=cl(S.stress+1);return N('你決定時機成熟再說。')})]}}});
/* ===== 其他國家 ===== */
cEv('US','race',8,70,3,'填表時又看到「族裔／種族」欄位，旁邊還有一長串選項。',['照實勾選自己的身分|sta+1|n:你想起家人怎麼介紹自己的來歷。','選「其他」或不回答|opn+0|n:你覺得身分很難用一格說完。','和朋友聊起各自家族的故事|nt+2 h+2|g:你們發現彼此有很多共同點。']);
cEv('US','lang',5,18,3,'爸媽希望你週末去上祖語學校（如中文、西班牙文或韓文學校）。',['認真去上課|mt+6 sm+1 st+1|g:你的雙語能力成了優勢。','每週去，但提不起勁|mt+2|n:你在課堂上畫了很多畫。','不想去，只想跟朋友玩|mt-3 h+2|n:爸媽有些失望。'],()=>{ethInit();return S.eth.g!=='非拉美裔白人'});
cEv('US','bias',12,60,2,'你遇到有人因你的外貌或口音說了不禮貌的話。',['冷靜回應並指出問題|sta+1 comm+1|g:對方尷尬地道歉。','忍下來，但記在心裡|st+3|n:你一整天心情都不太好。','向學校／公司舉報|st+2 comm+1|n:有人替你說話，事情被認真處理。']);
cEv('JP','rent',20,60,3,'你去看房，仲介說「房東不接受外國人」。',['請仲介找接受外國人的房源，多付一點保證費|m-60000 st+2|n:你終於找到房子。','找專門服務外國人的仲介公司|m-30000|g:對方熟悉流程，很快就辦好。','乾脆住公司宿舍或合租屋|nt+2|n:你住進了有其他外國人的合租屋。'],()=>S.ab&&S.ab.visa!=='cit');
cEv('JP','hafu',3,20,3,'學校的同學好奇你為什麼和大家長得不太一樣，問個不停。',['大方介紹自己家人的來歷|comm+1 h+2|g:同學對你很感興趣。','覺得被當成稀有動物，有點不舒服|st+2|n:你只想低調地過日子。','乾脆自己多學當地語言和禮儀，融入群體|ln+4|g:你的日語越來越流利。'],()=>{ethInit();return /混血|外國/.test(S.eth.g)});
cEv('KR','multi',5,18,3,'學校裡有「多文化家庭」的孩子，有人好奇，也有人說閒話。',['主動和他們交朋友|nt+2 agr+1 h+2|g:你交到了新朋友，也知道很多不同的故事。','保持距離|h+0|n:你們之間沒有太多交集。','聽到有人說閒話，出面制止|agr+1 st+1|g:你的行動讓氣氛緩和了不少。']);
cEv('KR','foreignwk',20,60,2,'你在公司裡和外國勞工、留學生同事共事，大家的語言不太通。',['學幾句彼此的語言，建立默契|ln+3 nt+2|g:合作順暢很多。','只用簡單的英語溝通|st+1|n:溝通有些吃力，但可以完成工作。'],()=>true);
cEv('DE','integration',20,50,3,'你需要上「融合課程」（Integrationskurs），學德語與德國社會文化，通過 B1 考試。',['認真上課，順利通過|ln+10 sm+1 st+1|g:你拿到了證書，找工作更順利。','邊工作邊上課，進度較慢|ln+5 st+3|n:你慢慢累積。','找語言交換夥伴一起練習|ln+7 nt+2 h+1|g:你的口語進步很快。'],()=>S.ab&&S.ab.visa!=='cit');
cEv('DE','name',20,50,2,'你投了很多履歷，發現名字和外貌似乎影響了面試邀約。',['用當地常見的名字或加上德文資歷再投|ln+2 st+2|n:回覆率提高了一些。','堅持用原名，並強調專業能力|sta+1 st+3|n:你多花了時間，最終找到合適的工作。','透過人脈內推|nt+2|g:朋友的引薦成了關鍵。'],()=>{ethInit();return S.eth.g!=='無移民背景'});
cEv('GB','diaspora',5,70,3,'家裡慶祝傳統節日（如農曆新年、排燈節或開齋節），全家聚在一起。',['邀請朋友一起過節，分享食物|nt+3 h+4 m-120|g:朋友們對你家的文化很感興趣。','只和家人過節|fam+3 h+3|g:團圓飯讓你覺得安心。','為了工作沒去|st+2|n:你只在電話裡道賀。'],()=>{ethInit();return S.eth.g!=='白人英國人'});
cEv('CA','truth',8,90,2,'九月三十日是「真相與和解國家日」，學校與社區舉辦紀念活動，談寄宿學校的歷史。',['參加活動，閱讀與傾聽|opn+1 h+1|g:你更了解這段歷史。','穿橘色衣服表達支持|h+1 agr+1|g:你默默表達了心意。','沒特別參與||n:這一天過得和平常一樣。'],()=>true);
cEv('CA','mosaic',5,90,3,'社區的多元文化節，各國美食攤位和表演輪番上陣。',['每個攤位都吃一點|h+4 m-80|g:你吃得很撐，也交到新朋友。','上台表演自己家鄉的節目|nt+3 h+3 comm+1|g:掌聲很熱烈。','在旁邊看看就好|h+2|n:你拍了好多照片。']);
cEv('AU','sorry',8,90,2,'五月底是「全國和解週」，七月有 NAIDOC 週，慶祝原住民文化與歷史。',['參加社區活動，聽長老說故事|opn+1 h+2|g:你學到了很多沒聽過的故事。','在學校或公司安排相關分享|comm+1 nt+1|g:大家討論得很熱烈。','沒特別參與||n:你沒有特別的感受。']);
cEv('SG','racial',5,90,3,'七月二十一日是種族和諧日，學校與公司都會穿各族傳統服裝、分享各族美食。',['穿上別族的服飾，一起拍照|nt+3 h+3 opn+1|g:大家玩得很開心。','在公司舉辦美食分享會|nt+2 h+3|g:同事們互相交流了食譜。','照常上班||n:你只是看著大家的服裝經過。']);
cEv('SG','eip',24,50,3,'組屋有「族群融合政策」（EIP），各族群在每棟樓與社區有比例限制，你申購或轉售時會受到影響。',['依規定調整選屋範圍|st+2|n:你放寬了條件，仍然找到合適的組屋。','研究是否有更合適的社區|fin+1|g:你找到了條件更適合的組屋。','請教仲介|m-5000 st-1|n:仲介幫你整理了選項。']);
cEv('SG','mt',6,16,3,'學校規定每個學生都要上母語課（華語、馬來語或淡米爾語）。',['認真學母語|mt+6 sm+1|g:你的母語能力進步了。','只求及格|mt+2|n:你勉強過關。','不太喜歡，覺得是負擔|st+2|n:你把時間花在其他科目上。'],()=>true);
/* ===== 網路認識的外國朋友 → 交往 → 結婚 → 移民 ===== */
const XC=['JP','KR','US','CA','AU','GB','DE','SG','TW'];
const XNK={JP:'jp',KR:'kr',US:'en',CA:'en',AU:'en',GB:'en',DE:'de',SG:'sgm',TW:null};
const PLAT=['遊戲公會','語言交換 App','Discord 社群','興趣論壇','社群媒體留言'];
const oriOK=sx=>{const o=S.ori,opp=S.sx==='男'?'女':'男';return o==='異性戀'?sx===opp:o==='同性戀'?sx===S.sx:true};
const flightCost=k=>({JP:20000,KR:15000,SG:18000,AU:35000,US:42000,CA:45000,GB:38000,DE:36000,TW:18000}[k]||(typeof wFlight==='function'?wFlight(k):30000));
E.push({id:'xnet',min:14,max:60,w:3,if:()=>!S.on&&!S.flags.xnetDone&&!(S.partner&&S.partner.ld),run:()=>{
 const cn=pick(XC.filter(k=>k!==(S.cn||'TW'))),sx=chance(.5)?'男':'女',key=XNK[cn],n=key?nameOf(key,sx):fullName(sx),a=R(0,ARCH.length-1),plat=pick(PLAT);
 return {t:`你在${plat}認識了一位來自${CNAME[cn]}的網友「${n}」，聊得很投緣。`,c:[
  ch('持續聊天，交個朋友',()=>{S.on={n,sx,cn,rel:R(40,60),st:0,a,since:S.age,plat};S.net=cl((S.net||0)+2);return G(`你和${n}成了固定聊天的網友。`)}),
  ch('客氣回覆，不太深入',()=>N('你們只是偶爾互相按讚。')),
  ch('保持距離，擔心是詐騙',()=>{S.flags.xnetDone=1;return N('你選擇謹慎，沒有進一步往來。')})]}}});
const onP=()=>S.on&&S.on.st>=0;
const romOK=()=>S.on&&S.age>=18&&oriOK(S.on.sx)&&!S.partner;
E.push({id:'xvid',min:14,max:80,w:6,if:()=>S.on&&S.on.st===0&&S.on.rel>=55,run:()=>{const o=S.on;return {t:`你和${o.n}已經聊了一段時間，對方提議開視訊見面。`,c:[
 ch('開視訊，聊聊彼此的生活',()=>{o.st=1;o.rel=cl(o.rel+8);S.stress=cl(S.stress-2);return G(`視訊裡的${o.n}比文字更有親切感，你們約好定期通話。`)}),
 ch('不太習慣，維持文字聊天',()=>{o.rel=cl(o.rel-2);return N('你們繼續用訊息聊天。')})]}}});
E.push({id:'xvisit',min:18,max:80,w:6,if:()=>S.on&&S.on.st===1&&S.on.rel>=70&&S.age>=18,run:()=>{const o=S.on,c=flightCost(o.cn);return {t:`${o.n}邀請你到${CNAME[o.cn]}見面，機票與住宿大約 ${money(c)}。`,c:[
 ch('去見面',()=>{if(S.money<c)return B('你的錢不夠買機票。');S.money-=c;o.st=2;o.rel=cl(o.rel+R(-6,12));S.lang[o.cn]=Math.max(S.lang[o.cn]||0,(S.lang[o.cn]||0)+5);chg('happy',5);return G(`你第一次親眼見到${o.n}，一起逛了城市，也見了對方的朋友。`)}),
 ch('邀請對方來台灣',()=>{if(S.money<5000)return B('你的錢不夠招待。');S.money-=5000;o.st=2;o.rel=cl(o.rel+R(-6,12));chg('happy',4);return G(`${o.n}來到台灣，你帶對方吃遍在地小吃。`)}),
 ch('再等等，先維持線上交流',()=>N('你覺得時機未到。'))]}}});
E.push({id:'xconf',min:18,max:80,w:6,if:()=>romOK()&&S.on.st===2&&S.on.rel>=80,run:()=>{const o=S.on;return {t:`見面之後，你和${o.n}之間有種特別的默契，對方似乎有些話想說。`,c:[
 ch('向對方告白，嘗試遠距戀愛',()=>{if(!chance(Math.min(.9,o.rel/100)))return B('對方表示更把你當成重要的朋友。');S.crush=S.crush||[];const c=newCrush('網路');c.n=o.n;c.sx=o.sx;c.a=o.a;c.aff=Math.max(60,o.rel);c.cn=o.cn;mkPartner(c);const p=S.partner;p.cn=o.cn;p.eth={g:'外國籍',sub:'',o:CNAME[o.cn]};p.ld=1;p.online=1;p.res=o.cn;S.on=null;S.flags.xnetDone=1;chg('happy',10);return G(`${o.n}答應了，你們開始了遠距戀愛。`)}),
 ch('維持朋友關係',()=>{o.rel=cl(o.rel-4);return N('你們繼續當好朋友。')})]}}});
E.push({id:'xfade',min:15,max:90,w:2,if:()=>S.on&&S.on.st<3&&S.age-S.on.since>=3,run:()=>{const o=S.on;S.on=null;S.flags.xnetDone=1;return {t:`時間一久，你和${o.n}的聯絡越來越少，最後只剩偶爾的問候。`,c:[ch('好好珍藏這段回憶',()=>N('你不覺得遺憾。'))]}}});
E.push({id:'xld',min:18,max:80,w:5,if:()=>!!(S.partner&&S.partner.ld&&!S.partner.married),run:()=>{const p=S.partner,c=flightCost(p.cn);return {t:`和${p.n}（${CNAME[p.cn]||p.res}）遠距離戀愛已經一段時間，時差與距離讓人疲憊。`,c:[
 ch('安排見面，維持感情',()=>{if(S.money<c)return B('你的錢不夠買機票。');S.money-=c;p.rel=cl(p.rel+8);chg('happy',5);return G('相聚的幾天甜蜜又短暫。')}),
 ch('只用視訊維持',()=>{p.rel=cl(p.rel-1);S.stress=cl(S.stress+3);return N('你們靠視訊互道晚安。')}),
 ch('提出分手',()=>{S.partner=null;S.stress=cl(S.stress+8);chg('happy',-8);return B('你們和平分手，各自繼續生活。')})]}}});
E.push({id:'xwed',min:20,max:70,w:10,if:()=>!!(S.partner&&S.partner.married&&S.partner.ld&&S.partner.cn&&S.partner.cn!==(S.cn||'TW')&&!S.flags.xwed),run:()=>{S.flags.xwed=1;const p=S.partner,k=p.cn,home=S.cn||'TW';return {t:`你和${p.n}結婚了，兩人分處兩國，需要決定住在哪裡。`,c:[
 ch(`搬到${CNAME[k]}，申請配偶簽證`,()=>{S.money-=40000;if(chance(.8)){if(S.job&&!S.job.founder)S.job=null;S.cn=k;S.ab={cn:k,visa:'pr',left:0,yrs:0,wk:0,nojob:0,nu:0};if(S.lang[k]==null)S.lang[k]=langInit(k);p.ld=0;p.cohab=true;S.flags.xmig=1;chg('happy',6);return G(`配偶簽證核准，你搬到${CNAME[k]}與${p.n}同住，需重新找工作並適應生活。`)}S.stress=cl(S.stress+8);return B('簽證審查拖延，你們暫時仍分居兩地。')}),
 ch(`邀請${p.n}搬來台灣`,()=>{if(home!=='TW')return N('你們決定先在目前的國家生活。');if(chance(.85)){p.ld=0;p.cohab=true;p.eth={g:'新住民',sub:'',o:CNAME[k]};S.flags.xmig=2;chg('happy',6);return G(`${p.n}搬到台灣，成為新住民，開始適應新的生活。`)}return B('居留申請遇到一些波折，暫時還沒辦成。')}),
 ch('先維持兩地分居',()=>{p.rel=cl(p.rel-3);S.stress=cl(S.stress+4);return N('你們決定等條件成熟再說。')})]}}});
/* 年度：網友關係漂移 */
const _y30=yearly;
yearly=function(){_y30();if(S.on){const o=S.on;o.rel=cl(o.rel+R(-3,5));if(o.st<=1&&o.rel<20)S.on=null}
 if(S.mt!=null&&S.age>6&&!S.acts.mtp)S.mt=cl(S.mt-(S.age>20?1:0))};
/* ===== 族群與文化頁面 ===== */
const GN={閩南:'閩南人是台灣人口比例最高的族群，祖先多在清代由福建南部移居，台語（閩南語）是主要語言。',客家:'客家人多分布在桃竹苗、六堆與花東，客語、客家米食與義民信仰是文化特色。',外省:'外省族群多隨 1949 年前後的遷台而來，許多人住過眷村，家鄉口味影響了台灣的飲食。',原住民:'台灣原住民族共 16 族，使用各自的南島語言，並保有祭典、編織與狩獵等文化；人口 62.9 萬人、占 2.7%（內政部 2025 年底）。','新住民及其子女':'新住民多來自中國大陸、越南、印尼、泰國等地，與台灣人結婚後定居，許多家庭是多語言與多文化並存。'};
function ethHTML(){
 ethInit();const e=S.eth,k=S.cn||'TW',lg=LANGN[e.g];
 let h=`<h3>族群與文化</h3><div class="item"><b>你的族群背景：${esc(ethName(e))}</b><div class="sub">${esc(GN[e.g]||'你的家庭有自己的文化與傳統。')}</div></div>`;
 if(S.mt!=null&&lg)h+=`<div class="item"><b>${esc(e.g==='新住民及其子女'?famLang():lg)}熟練度 ${S.mt}%</b><div class="bar"><i style="width:${S.mt}%"></i></div><div class="sub">多和家人使用母語，才不會慢慢流失。</div><button class="btn" data-a="eth:prac">今年多練習母語</button></div>`;
 const par=[['媽媽',S.mom],['爸爸',S.dad]].filter(x=>x[1]).map(x=>x[0]+(x[1].o?`（來自${x[1].o}）`:'')).join('、');
 if(par)h+=`<div class="item"><b>父母</b><div class="sub">${esc(par)}</div></div>`;
 if(S.partner&&S.partner.eth)h+=`<div class="item"><b>伴侶：${esc(S.partner.n)}</b><div class="sub">${esc(ethName(S.partner.eth))}${S.partner.ld?'（遠距離）':''}</div></div>`;
 if(S.on)h+=`<div class="item"><b>網路認識的朋友：${esc(S.on.n)}</b><div class="sub">來自${esc(CNAME[S.on.cn])}，認識於${esc(S.on.plat)}，目前${['文字聊天','視訊往來','已見過面'][Math.min(2,S.on.st)]}。</div></div>`;
 const ks=(S.kids||[]).filter(x=>x.eth);if(ks.length)h+=`<div class="item"><b>子女</b><div class="sub">${esc(ks.map(x=>x.n+'：'+ethName(x.eth)).join('、'))}</div></div>`;
 h+=`<div class="sub" style="margin-top:8px">族群身分僅影響家庭文化與生活中遇到的人與事，不影響能力與命運。台灣原住民人口取自內政部；各國族群比例、新住民來源與事件機率為遊戲估算。</div><button class="btn" data-a="back">← 返回</button>`;
 return h;
}
const _life30=lifeHTML,_more30=moreHTML,_lfH30=lfHandle;
moreHTML=function(){return _more30().replace('<button class="tile" data-a="lf:health">','<button class="tile" data-a="lf:eth"><b>🌐</b>族群與文化<small>母語・家族・跨國緣分</small></button><button class="tile" data-a="lf:health">')};
lfHandle=function(x,y,z,u){if(x==='eth'){if(y==='prac'){if(S.acts.mtp)return B('今年已經練習過了。');S.acts.mtp=1;S.mt=cl((S.mt||0)+6);return G('你多花時間用母語和家人聊天。')}return null}return _lfH30(x,y,z,u)};
lifeHTML=function(){return view.lsub==='eth'?ethHTML():_life30()};
const _ei30=endInfo;
endInfo=function(){ethInit();return _ei30()+`<p>族群背景：${esc(ethName(S.eth))}${S.mt!=null&&LANGN[S.eth.g]?`，母語熟練度 ${S.mt}%`:''}</p>`};
