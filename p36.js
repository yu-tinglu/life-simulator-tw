/* ---- p36：多元才藝與各國特色課程 ---- */
const ARTCAT={mus:'音樂',dan:'舞蹈',mar:'武術與運動',cra:'手工藝與美術',per:'表演與影像',eat:'飲食與生活'};
/* id|名稱|類別|每年費用|相關職業|說明 */
const ARTS=`sing|唱歌|mus|10000|歌手|音樂|配音|主持|演員|聲樂與流行歌曲，練習發聲與舞台表現。
piano|鋼琴|mus|15000|音樂|老師|從基礎練習到演奏曲目。
guitar|吉他|mus|9000|音樂|歌手|彈唱與樂團演出。
violin|小提琴|mus|18000|音樂|老師|古典弦樂，需要長期練習。
drum|爵士鼓與樂團|mus|12000|音樂|歌手|節奏感與團隊演出。
dance|現代舞與街舞|dan|12000|歌手|演員|模特|健身|瑜伽|律動、編舞與舞台表現。
ballroom|國標舞與社交舞|dan|14000|健身|瑜伽|演員|雙人舞步與禮儀。
tkd|跆拳道|mar|8000|教練|軍人|警察|消防|品勢、對打與升段。
judo|柔道|mar|8000|教練|軍人|警察|消防|摔技、寢技與禮節。
karate|空手道|mar|8000|教練|軍人|警察|消防|型與組手。
boxing|拳擊|mar|10000|教練|運動員|體能與防守技巧。
swim|游泳|mar|9000|教練|運動員|救生|各式泳姿與耐力。
ball|球類（籃球、足球、羽球）|mar|6000|運動員|教練|隊伍戰術與體能。
yoga|瑜伽與身心訓練|mar|12000|瑜伽|健身|老師|呼吸、伸展與放鬆。
paint|繪畫|cra|10000|設計|漫畫|插畫|UI|藝術|水彩、素描與構圖。
calli|書法|cra|6000|老師|設計|作家|運筆、結構與氣韻。
craft|手工藝（編織、木工、陶藝）|cra|10000|花藝|設計|工藝|親手製作並販售作品。
cult|文創設計|cra|15000|設計|行銷|企劃|平面|產品包裝、品牌與文創商品。
flower|花藝|cra|8000|花藝|婚禮|設計|插花與空間佈置。
photo|攝影|per|12000|攝影|導演|剪輯|構圖與光線。
film|影像與剪輯|per|12000|剪輯|導演|YouTuber|實況|拍攝、剪輯與說故事。
write|寫作|per|6000|作家|編輯|記者|翻譯|散文、小說與評論。
act|戲劇表演|per|12000|演員|主持|配音|導演|表情、台詞與肢體。
cook|烹飪|eat|10000|廚師|麵包|咖啡|調酒|刀工、火候與調味。
bake|烘焙與甜點|eat|10000|麵包|廚師|咖啡|麵團、發酵與擺盤。
barista|咖啡與調飲|eat|8000|咖啡|調酒|茶藝|沖煮與風味。
chess|圍棋與西洋棋|eat|8000|老師|研究|分析|策略與計算。`.split('\n').map(l=>{const p=l.split('|');return {id:p[0],n:p[1],c:p[2],cost:+p[3],jobs:new RegExp(p.slice(4,p.length-1).join('|')),d:p[p.length-1]}});
/* 各國特色（ISO 代碼 → 項目），格式：id,名稱,類別,費用,相關職業(以／分隔),說明 */
const ARTX=`TW|guoyue,國樂（二胡與琵琶）,mus,10000,音樂／老師,民族樂器合奏。;puppet,布袋戲,per,9000,演員／配音,台灣傳統掌中戲，需要口白與操偶。;tea,台灣茶藝,eat,8000,茶藝／咖啡,沖泡、品茗與茶席佈置。;nativedance,原住民族傳統歌舞,dan,6000,演員／老師,在族人指導下學習傳統歌舞與文化意涵。
CN|wushu,中國武術,mar,8000,教練／軍人／演員,拳法、器械與套路。;taichi,太極拳,mar,6000,教練／瑜伽,以柔克剛的養生拳。;opera,京劇與戲曲,per,12000,演員／主持,唱念做打。;gpaint,國畫與水墨,cra,9000,設計／老師,寫意山水與花鳥。
HK|cantopera,粵劇,per,10000,演員／主持,南音與粵劇唱腔。;dimsum,港式點心,eat,10000,廚師／麵包,點心師傅的手藝。
JP|tea_jp,茶道,eat,12000,茶藝／老師,從禮儀到點茶。;ikebana,花道,cra,10000,花藝／設計,日本傳統插花。;kendo,劍道,mar,8000,教練／警察／軍人,面、小手、胴的練習。;shodo,書道,cra,7000,老師／設計,毛筆書寫與篆刻。;anime,動漫繪畫,cra,12000,漫畫／插畫／設計,角色、分鏡與上色。;taiko,和太鼓,mus,9000,音樂／演員,集體節奏與舞台演出。
KR|kpop,K-pop 舞蹈與練習生訓練,dan,20000,歌手／演員／模特,舞蹈、歌唱與舞台管理。;pansori,판소리 韓國說唱,mus,8000,歌手／演員,傳統敘事歌唱。;hapkido,合氣道,mar,8000,教練／警察,關節技與防身。;kfood,韓式料理與泡菜,eat,9000,廚師／麵包,發酵與調味。
SG|silat_sg,馬來傳統武術,mar,7000,教練,新加坡多元文化的武術。;peranakan,娘惹料理,eat,10000,廚師,峇峇娘惹的傳統菜餚。
MY|silat,馬來武術 Silat,mar,7000,教練／軍人,馬來傳統武術。;kuih,傳統糕點 Kuih,eat,8000,麵包／廚師,椰漿、斑蘭與米粉糕點。
TH|muaythai,泰拳,mar,8000,教練／運動員,八肢武術，拳腳膝肘並用。;thaidance,泰國古典舞,dan,8000,演員／模特,手勢與姿態都有象徵意義。;thaicook,泰式料理,eat,9000,廚師,酸辣鹹甜的平衡。
VN|waterpuppet,水上木偶戲,per,8000,演員／配音,紅河三角洲的傳統表演。;vnnon,越南斗笠與編織,cra,6000,花藝／設計,傳統竹編技藝。
ID|gamelan,甘美朗,mus,8000,音樂,爪哇與峇里島的傳統合奏。;batik,蠟染 Batik,cra,9000,設計／花藝,以蠟防染的傳統布藝。;pencak,班卡西拉武術,mar,7000,教練／軍人,東南亞傳統武術。
PH|tinikling,竹竿舞 Tinikling,dan,6000,老師／演員,跟著節奏跳過竹竿。;arnis,阿尼斯棍術,mar,6000,教練／軍人,菲律賓棍術與刀術。
IN|bolly,寶萊塢舞蹈,dan,9000,演員／歌手／模特,表情與節奏豐富的舞蹈。;sitar,西塔琴與印度古典音樂,mus,10000,音樂,拉格與塔拉節奏。;indcook,印度料理與香料,eat,8000,廚師,綜合香料與咖哩。
PK|qawwali,卡瓦力頌歌,mus,6000,歌手／音樂,蘇菲音樂。;truck,卡車彩繪,cra,6000,設計／藝術,鮮豔的民間彩繪。
BD|nakshi,刺繡被 Nakshi Kantha,cra,5000,設計／花藝,孟加拉傳統刺繡。;baul,包爾民謠,mus,5000,歌手／音樂,流浪詩人的民謠。
LK|kandyan,康提舞,dan,6000,演員／老師,斯里蘭卡傳統舞。;lakmask,面具雕刻,cra,6000,設計／藝術,傳統面具工藝。
NP|thangka,唐卡繪畫,cra,9000,藝術／設計,尼泊爾與西藏的宗教繪畫。;madal,瑪達鼓,mus,5000,音樂,山地民族的鼓樂。
MN|throat,呼麥（喉唱）,mus,6000,歌手／音樂,蒙古喉音唱法。;bokh,蒙古摔角,mar,6000,教練／運動員,那達慕三大技藝之一。
KZ|dombra,冬不拉,mus,5000,音樂,哈薩克傳統彈撥樂器。;kzhorse,馬術與馬背技藝,mar,9000,教練／運動員,遊牧文化的馬術。
IR|persianc,波斯書法,cra,6000,老師／設計,納斯塔利克體。;carpet,波斯地毯編織,cra,8000,設計／工藝,手工打結的圖案藝術。;santur,桑圖爾琴,mus,7000,音樂,波斯傳統打弦樂器。
TR|ebru,水拓畫 Ebru,cra,8000,藝術／設計,在水面上作畫的傳統藝術。;sema,旋轉舞 Sema,dan,6000,演員,蘇菲旋轉舞。;tcoffee,土耳其咖啡,eat,6000,咖啡／廚師,銅壺煮咖啡與占卜。
EG|belly,肚皮舞,dan,8000,演員／模特／健身,腰臀動作與節奏。;ud,烏德琴,mus,7000,音樂,阿拉伯傳統弦樂器。
SA|arabc,阿拉伯書法,cra,7000,藝術／設計,古蘭經書寫傳統。;oud_sa,烏德琴與阿拉伯音樂,mus,7000,音樂,阿拉伯傳統音樂。
AE|falcon,獵鷹訓練,mar,15000,教練,阿拉伯半島傳統文化。;arabc_ae,阿拉伯書法,cra,7000,藝術／設計,傳統書寫藝術。
IL|krav,馬伽（Krav Maga）,mar,10000,教練／警察／軍人,貼身防衛格鬥術。;klezmer,猶太民謠樂團,mus,7000,音樂,傳統猶太音樂。
IT|opera_it,義大利歌劇,mus,16000,歌手／音樂／演員,美聲唱法。;pasta,手工麵食與披薩,eat,9000,廚師／麵包,麵團與醬汁的功夫。
FR|patis,法式甜點,eat,18000,麵包／廚師,馬卡龍、可頌與塔類。;ballet_fr,芭蕾,dan,15000,演員／模特／健身,古典芭蕾基礎。;perfume,調香,cra,12000,設計／工藝,香水與香氛設計。
ES|flamenco,佛朗明哥,dan,10000,演員／歌手,舞蹈、吉他與歌唱結合。;classic_g,古典吉他,mus,10000,音樂,西班牙古典吉他。;tapas,西班牙小吃料理,eat,9000,廚師,Tapas 與海鮮飯。
PT|fado,法朵,mus,8000,歌手／音樂,葡萄牙城市民謠。;azulejo,瓷磚彩繪 Azulejo,cra,8000,藝術／設計,藍白瓷磚。
DE|organ,管風琴,mus,14000,音樂／老師,教堂音樂傳統。;brew,啤酒釀造,eat,12000,廚師／調酒,德式釀造技術。;bread_de,德式麵包,eat,9000,麵包,黑麥與天然酵母。
AT|waltz,華爾茲與維也納舞會,dan,10000,演員／老師,三拍子圓舞曲。;classic_at,古典音樂（維也納傳統）,mus,16000,音樂／老師,莫札特與舒伯特的故鄉。
CH|yodel,約德爾唱法,mus,6000,歌手／音樂,阿爾卑斯山區的傳統唱法。;watch,鐘錶製作,cra,20000,工藝／設計,精密機械與手工。
NL|clog,木鞋雕刻,cra,6000,工藝／設計,荷蘭傳統木工。;skate,溜冰與長距離滑冰,mar,10000,運動員／教練,冰上耐力運動。
BE|choco,巧克力工藝,eat,14000,麵包／廚師,調溫與模型。;lace,蕾絲編織,cra,8000,設計／工藝,布魯日傳統蕾絲。
IE|irishdance,愛爾蘭舞,dan,9000,演員／老師,快速踢踏舞步。;fiddle,愛爾蘭小提琴與民謠,mus,8000,音樂,凱爾特民謠。
GB|theatre,莎士比亞戲劇,per,12000,演員／主持／配音,舞台劇傳統。;bagpipe,蘇格蘭風笛,mus,8000,音樂,高地傳統管樂。;cricket,板球,mar,8000,運動員／教練,英國與大英國協的球類運動。
RU|ballet_ru,俄羅斯芭蕾,dan,15000,演員／模特／健身,嚴格訓練的古典芭蕾。;sambo,桑搏,mar,8000,教練／警察／軍人,蘇聯發展的格鬥術。;balalaika,巴拉萊卡琴,mus,6000,音樂,俄羅斯傳統弦樂。
UA|vyshyvanka,烏克蘭刺繡,cra,6000,設計／工藝,民俗刺繡襯衫。;bandura,班杜拉琴,mus,6000,音樂,烏克蘭傳統彈撥樂器。
PL|polish_f,波蘭民俗舞,dan,6000,演員／老師,傳統舞蹈。
SE|fika,瑞典糕點與 Fika 文化,eat,8000,麵包／咖啡,肉桂捲與咖啡文化。;nordicski,北歐滑雪,mar,12000,運動員／教練,越野與高山滑雪。
NO|nski,越野滑雪,mar,10000,運動員／教練,北歐冬季運動傳統。;hardanger,哈丹格小提琴,mus,8000,音樂,挪威傳統弦樂。
FI|sauna,桑拿與冬泳,mar,6000,健身,北歐放鬆文化。;kantele,康特勒琴,mus,6000,音樂,芬蘭傳統彈撥樂器。
DK|dkbake,丹麥麵包與糕點,eat,9000,麵包,丹麥酥與黑麥麵包。
IS|saga,冰島傳說與詩歌,per,6000,作家／編輯,古老敘事傳統。
GR|bouzouki,布祖基琴,mus,7000,音樂,希臘傳統音樂。;sirtaki,希臘傳統舞,dan,6000,老師／演員,圓圈舞。
US|bball,籃球,mar,8000,運動員／教練,美國職業聯盟文化。;jazz,爵士樂,mus,12000,音樂／歌手,即興與擺盪節奏。;hiphop,嘻哈與饒舌,mus,10000,歌手／音樂,節奏、押韻與街頭文化。;football,美式足球,mar,9000,運動員／教練,戰術與團隊配合。
CA|hockey,冰球,mar,10000,運動員／教練,加拿大國球。;curling,冰壺,mar,8000,運動員／教練,冰上策略運動。
MX|mariachi,墨西哥流浪樂隊,mus,8000,音樂／歌手,小號、吉他與歌唱。;lucha,墨西哥摔角（Lucha Libre）,mar,9000,運動員／演員,面具與空中技。;tamale,墨西哥料理,eat,8000,廚師,玉米餅、莎莎醬與摩爾醬。
BR|samba,森巴舞,dan,8000,演員／模特／健身,嘉年華舞步。;capoeira,卡波耶拉,mar,8000,教練／演員,結合舞蹈與武術。;soccer_br,足球,mar,6000,運動員／教練,巴西足球文化。
AR|tango,探戈,dan,10000,演員／老師,擁抱與步伐的藝術。;asado,阿根廷燒烤,eat,8000,廚師,炭火與熟成牛肉。
CU|salsa,薩爾薩舞,dan,7000,演員／老師,古巴音樂與舞蹈。
JM|reggae,雷鬼樂,mus,7000,音樂／歌手,節奏與歌詞。;sprint,短跑,mar,8000,運動員／教練,牙買加短跑傳統。
CO|cumbia,昆比亞舞,dan,6000,演員／老師,哥倫比亞傳統舞。;coffee_co,咖啡栽培與品評,eat,8000,咖啡,產地杯測。
PE|panpipe,排笛,mus,6000,音樂,安地斯傳統樂器。;weave_pe,安地斯編織,cra,6000,設計／工藝,羊駝毛手織。
AU|surf,衝浪,mar,10000,教練／運動員,海浪與平衡。;rugby_au,橄欖球,mar,8000,運動員／教練,澳洲球類運動。
NZ|haka,哈卡舞（毛利文化）,dan,6000,老師／演員,在毛利師傅指導下，尊重文化脈絡學習。;rugby,橄欖球,mar,8000,運動員／教練,紐西蘭的全民運動。
ZA|zdrum,非洲鼓與歌舞,mus,6000,音樂／老師,節奏與呼喊。;gumboot,長靴舞 Gumboot,dan,5000,演員／老師,礦工的敲擊舞。
KE|run_ke,中長跑,mar,5000,運動員／教練,高原跑者的訓練法。
ET|run_et,長跑與高原訓練,mar,5000,運動員／教練,馬拉松傳統。;coffee_et,傳統咖啡儀式,eat,5000,咖啡,烘豆與沖煮的儀式。
NG|afrobeat,非洲節拍音樂與舞蹈,dan,7000,歌手／演員／模特,節奏強烈的流行音樂。
GH|kente,肯特布編織,cra,6000,設計／工藝,傳統織錦。
SN|sabar,薩巴鼓,mus,6000,音樂,西非鼓樂傳統。
MA|zellige,摩洛哥馬賽克,cra,8000,設計／工藝,傳統磁磚拼貼。;tagine,塔吉鍋料理,eat,7000,廚師,香料與燉煮。
GE|polyphony,喬治亞多聲部合唱,mus,5000,歌手／音樂,聯合國教科文組織認可的傳統。;khinkali,喬治亞小籠包,eat,6000,廚師,手工餃子。
AM|duduk,杜杜克笛,mus,6000,音樂,亞美尼亞傳統雙簧管。
KH|apsara,阿普薩拉舞,dan,6000,演員／老師,高棉古典舞。
MM|myanmarmar,緬甸木偶與傳統戲,per,6000,演員／配音,傳統木偶戲。
LA|laoweave,寮國織錦,cra,5000,設計／工藝,手工絲綢。
PG|pgsing,傳統歌唱與頭飾工藝,cra,5000,設計／工藝,部落工藝。
FJ|meke,斐濟傳統歌舞 Meke,dan,5000,演員／老師,以舞蹈講述故事。
WS|siva,薩摩亞傳統舞 Siva,dan,5000,演員／老師,優雅的手勢舞。
TO|tapa,樹皮布工藝,cra,5000,設計／工藝,傳統織布。`;
const ARTREG={EA:'東亞傳統書畫與武術',SE:'東南亞傳統歌舞',SA:'南亞傳統歌舞',CS:'中亞馬背技藝與民謠',ME:'阿拉伯書法與傳統音樂',EW:'歐洲古典音樂',EE:'東歐民俗歌舞',LA:'拉丁舞蹈與打擊樂',AF:'非洲鼓與傳統舞蹈',OC:'衝浪與水上運動',PI:'太平洋傳統歌舞',NA:'流行音樂與運動'};
const ARTMAP={};
ARTX.split('\n').forEach(l=>{const [c,rest]=l.split('|');ARTMAP[c]=rest.split(';').map(s=>{const p=s.split(',');return {id:p[0],n:p[1],c:p[2],cost:+p[3],jobs:new RegExp(p[4].replace(/／/g,'|')),d:p.slice(5).join(',').replace(/。$/,'')+'。',cn:c}})});
const ARTALL={};ARTS.forEach(a=>ARTALL[a.id]=a);Object.values(ARTMAP).forEach(a=>a.forEach(x=>ARTALL[x.id]=x));
function artRegion(k){const rg=(typeof regOf==='function'?regOf(k):'EW');return {id:'reg_'+k,n:ARTREG[rg]||'當地傳統才藝',c:'dan',cost:7000,jobs:/演員|老師|音樂|歌手/,d:'當地特有的傳統歌舞與工藝，從社區教室學起。',cn:k}}
function artsFor(k){const l=(ARTMAP[k]||[]).slice();if(!l.length){const r=artRegion(k);ARTALL[r.id]=r;l.push(r)}return l}
const artLv=id=>(S.art&&S.art[id])||0;
const artMax=()=>Object.keys(S.art||{}).map(k=>[k,S.art[k]]).sort((a,b)=>b[1]-a[1])[0]||null;
const artStage=v=>v>=85?'名家':v>=65?'專業':v>=40?'中階':v>=15?'入門':'初學';
function artOK(a){const f=S.fam||'小康';return S.age>=18||!(f==='清寒'&&a.cost>12000)&&!(f==='小康'&&a.cost>16000)}
function artLearn(id){
 mFix();S.art=S.art||{};const a=ARTALL[id];if(!a)return null;
 if(S.age<6)return B('年紀還太小。');if(S.jail)return B('服刑中無法上課。');
 S.artn=S.artn||{};const yk=S.year||calYear();if(S.artn.y!==yk)S.artn={y:yk,n:0,ids:{}};
 if(S.artn.ids[id])return B('今年已經上過這門課了。');if(S.artn.n>=3)return B('一年最多同時學三門才藝。');
 const cost=S.age<18?0:a.cost;if(S.age<18&&!artOK(a))return B('家裡的預算負擔不起這門課。');if(S.money<cost)return B('你的錢不夠。');
 S.money-=cost;S.artn.n++;S.artn.ids[id]=1;
 const v=S.art[id]||0,d=Math.max(2,Math.round(R(4,9)*(1.1-v/150)*(1+(S.smarts-50)/250)));S.art[id]=Math.min(100,v+d);S.artY=S.artY||{};S.artY[id]=yk;
 const ct={mus:'cre',dan:'cre',mar:'fit',cra:'cre',per:'comm',eat:'fin'}[a.c];if(ct)bump('s',ct,1);
 if(a.c==='mar')chg('health',2);S.stress=cl(S.stress-2);chg('happy',3);
 const lv=S.art[id];return G(`你上了「${a.n}」，程度進步到${artStage(lv)}（${lv}）。`+(cost?`（學費 ${money(cost)}）`:'（爸媽出錢）'));
}
function artHTML(){
 mFix();S.art=S.art||{};let h='<h3>才藝與課程</h3><p class="sub">才藝需要長期累積：每門課每年一次，一年最多三門；久未練習會生疏。程度會影響比賽、表演、甄選，以及相關職業的錄取率與收入。未成年由爸媽出錢（家境會限制課程）。</p>';
 const mine=Object.keys(S.art).filter(k=>S.art[k]>0&&ARTALL[k]);
 if(mine.length)h+='<div class="sec">我的才藝</div>'+mine.sort((a,b)=>S.art[b]-S.art[a]).map(k=>`<div class="item"><b>${ARTALL[k].n}　${artStage(S.art[k])}（${S.art[k]}）</b>${bar5(S.art[k],'#c0553a')}</div>`).join('');
 const ck=S.cn||'TW',cname=CNAME&&CNAME[ck]?CNAME[ck]:(CNS[ck]?CNS[ck].n:'當地');
 const sec=(t,list)=>{if(!list.length)return;h+=`<div class="sec">${t}</div>`;list.forEach(a=>{const used=S.artn&&S.artn.y===(S.year||calYear())&&S.artn.ids[a.id],cost=S.age<18?0:a.cost,dis=S.age<6||used||S.money<cost||(S.age<18&&!artOK(a));h+=`<button class="btn" data-a="lf:art:learn:${a.id}" ${dis?'disabled':''}>${a.n}<small>${ARTCAT[a.c]}・${S.age<6?'6 歲以上':(S.age<18?(artOK(a)?'爸媽出錢':'家境負擔不起'):'費用 '+money(a.cost))}・${a.d}${used?'（今年已上）':''}</small></button>`})};
 sec(`${cname}的特色才藝`,artsFor(ck));
 const vis=Object.keys(S.trav||{}).filter(k=>k!==ck&&ARTMAP[k]).slice(0,2);
 vis.forEach(k=>{sec(`${(CNAME&&CNAME[k])||k}的特色才藝（旅居或造訪過）`,artsFor(k))});
 Object.keys(ARTCAT).forEach(c=>sec(`通用：${ARTCAT[c]}`,ARTS.filter(a=>a.c===c)));
 return h+'<button class="btn" data-a="back">← 返回</button>';
}
const _lf36=lfHandle,_l36=lifeHTML,_m36=moreHTML;
lfHandle=function(x,y,z,u){if(x==='art'){if(y==='learn')return artLearn(z);return null}return _lf36(x,y,z,u)};
lifeHTML=function(){return view.lsub==='art'?artHTML():_l36()};
moreHTML=function(){return _m36().replace('<button class="tile" data-a="lf:health">','<button class="tile" data-a="lf:art"><b>藝</b>才藝與課程<small>音樂・舞蹈・武術・工藝・各國特色</small></button><button class="tile" data-a="lf:health">')};
/* 職涯加成 */
function artRel(j){let best=0;if(!S.art)return 0;for(const k in S.art){const a=ARTALL[k];if(a&&a.jobs.test(j.t||j)&&S.art[k]>best)best=S.art[k]}return best}
const _sb36=skillBonus;skillBonus=function(j){return _sb36(j)+Math.max(0,(artRel(j)-30)/400)};
const _hj36=hireJob;hireJob=function(j){const o=_hj36(j),v=artRel(j);if(v>=60){o.sal=Math.round(o.sal*(1+(v-50)/400));o.s0=o.sal;if(j.var)o.fame+= (v-50)/150}return o};
/* 年度：生疏、事件 */
const _y36=yearly;
yearly=function(){_y36();if(S.art){const yk=S.year||calYear();for(const k in S.art){if(S.artY&&S.artY[k]===yk)continue;if(S.art[k]>25&&Math.random()<.6)S.art[k]--}}};
function aEv(id,min,max,w,iff,run){E.push({id:'art_'+id,min,max,w,if:()=>{const m=artMax();return m&&m[1]>=20&&(!iff||iff(m))},run})}
const topOf=(cat)=>{let b=null;for(const k in S.art||{}){const a=ARTALL[k];if(a&&a.c===cat&&(!b||S.art[k]>S.art[b]))b=k}return b};
aEv('comp',8,65,3,m=>S.age>=8,()=>{const m=artMax(),a=ARTALL[m[0]],lv=m[1],tier=lv>=60?'全國或國際':lv>=35?'縣市或全國':'地方';return {t:`你報名了${tier}的「${a.n}」比賽，要認真準備嗎？`,c:[
 ch('全力備戰（花一整年）',()=>{S.stress=cl(S.stress+5);const p=clmp(.15+lv/160+(S.smarts-50)/400,.08,.75);if(chance(p)){const b=lv>=60?R(100,400)*1000:R(10,60)*1000;S.money+=b;chg('happy',10);bump('p','con',1);return G(`你在「${a.n}」比賽中獲得名次，得到獎金與獎狀（${money(b)}）。`)}chg('happy',-2);return N('這次沒有得名，但累積了比賽經驗。')}),
 ch('抱著練習心態參加',()=>{if(S.art[m[0]]<100)S.art[m[0]]++;chg('happy',3);return N('你放鬆地參加，認識了同好。')}),
 ch('放棄比賽',()=>N('你把時間留給其他事情。'))]}});
aEv('belt',9,50,3,m=>topOf('mar')&&S.art[topOf('mar')]>=25,()=>{const k=topOf('mar'),a=ARTALL[k],lv=S.art[k];return {t:`${a.n}道館舉辦升段／檢定，你要參加嗎？`,c:[
 ch('報名檢定',()=>{S.money-=R(3,12)*1000;if(chance(clmp(.3+lv/130,.2,.9))){S.art[k]=Math.min(100,lv+4);chg('happy',5);bump('s','fit',1);return G(`你通過了${a.n}的升段，拿到新的段位證書！`)}return N('這次沒有通過，但教練幫你找出需要加強的地方。')}),
 ch('不考，繼續練習',()=>N('你覺得享受過程比證書重要。'))]}});
aEv('scout',13,26,2,m=>['sing','dance','act','kpop','bolly'].some(id=>artLv(id)>=50)||topOf('dan')&&S.art[topOf('dan')]>=55,()=>({t:'有經紀公司的人看到你的表演，說你很有舞台魅力，邀請你去試鏡。',c:[
 ch('去試鏡，進入培訓',()=>{S.stress=cl(S.stress+8);if(chance(.4+S.looks/300)){bump('s','cre',3);bump('s','comm',3);chg('happy',8);S.prestige=Math.min(5,(S.prestige||0)+0);return G('你通過了試鏡，開始一邊上學一邊接受培訓；之後可到職業頁嘗試演藝相關工作。')}chg('happy',-3);return N('這次沒有選上，但試鏡的經驗很寶貴。')}),
 ch('專心念書，婉拒邀請',()=>{chg('smarts',1);return N('你決定把學業擺在第一位。')}),
 ch('回家和父母商量',()=>{return N('父母擔心演藝圈不穩定，也支持你多方嘗試。')})]}));
aEv('perform',16,70,3,m=>m[1]>=40,()=>{const m=artMax(),a=ARTALL[m[0]];return {t:`社區、餐廳或市集邀請你表演「${a.n}」，可以賺些外快。`,c:[
 ch('接下表演',()=>{const b=Math.round(R(8,40)*1000*(m[1]/50));S.money+=b;chg('happy',5);S.stress=cl(S.stress+2);return G(`表演很成功，收到 ${money(b)}，也累積了人氣。`)}),
 ch('義演或公益表演',()=>{chg('happy',7);S.karma=cl(S.karma+4);return G('你把表演獻給社區，大家很感動。')}),
 ch('婉拒',()=>N('你覺得還沒準備好。'))]}});
aEv('market',18,70,2,m=>['cra','eat'].some(c=>topOf(c)&&S.art[topOf(c)]>=35),()=>{const k=topOf('cra')||topOf('eat'),a=ARTALL[k];return {t:`你想把自己做的「${a.n}」成果拿到市集或網路上販售。`,c:[
 ch('開攤試試',()=>{const b=Math.round(R(10,60)*1000*(S.art[k]/45));S.money+=b;chg('happy',4);return G(`作品賣得不錯，收入 ${money(b)}。`)}),
 ch('設計成品牌，做文創商品',()=>{S.money-=R(20,60)*1000;if(chance(.45)){const b=Math.round(R(60,260)*1000);S.money+=b;chg('happy',7);return G(`商品受到歡迎，賺進 ${money(b)}。`)}return N('銷量不如預期，但累積了品牌經驗。')}),
 ch('留著自己用',()=>N('你享受創作的過程。'))]}});
aEv('exhibit',18,75,2,m=>['cra','per'].some(c=>topOf(c)&&S.art[topOf(c)]>=55),()=>({t:'藝廊邀請你參加聯展，也有人想收藏你的作品。',c:[
 ch('參展並接受採訪',()=>{const b=R(20,120)*1000;S.money+=b;chg('happy',8);bump('s','comm',2);return G(`展覽獲得好評，售出作品 ${money(b)}。`)}),
 ch('參展但不賣',()=>{chg('happy',6);return N('你在展場交到許多創作者朋友。')}),
 ch('不參加',()=>N('你覺得作品還不夠成熟。'))]}));
aEv('injury',10,60,1.2,m=>['mar','dan'].some(c=>topOf(c)&&S.art[topOf(c)]>=30),()=>({t:'練習時你扭傷了腳踝／肌肉拉傷，教練提醒你要好好休息。',c:[
 ch('完整休養',()=>{chg('health',-2);S.money-=R(3,10)*1000;return N('你乖乖休息，恢復得很好。')}),
 ch('硬撐著繼續練習',()=>{chg('health',-R(3,8));S.stress=cl(S.stress+4);return B('傷勢拖長，影響了後續練習。')})]}));
/* 各國文化活動：參與當地特色才藝社團 */
E.push({id:'art_culture',min:10,max:80,w:2,if:()=>artsFor(S.cn||'TW').length>0&&S.age>=10,run:()=>{const k=S.cn||'TW',l=artsFor(k),a=l[(Math.random()*l.length)|0];return {t:`${(CNAME&&CNAME[k])||'當地'}社區中心有「${a.n}」體驗班，說是了解當地文化的好機會。`,c:[
 ch('報名體驗',()=>{S.art=S.art||{};S.art[a.id]=Math.min(100,(S.art[a.id]||0)+R(3,6));S.money-=S.age<18?0:Math.round(a.cost*.2);chg('happy',4);fxApply&&0;return G(`你學了「${a.n}」的基礎，還交到志同道合的朋友。`)}),
 ch('參觀就好',()=>{chg('happy',2);return N('你看了一場精彩的示範。')}),
 ch('沒興趣',()=>N('你婉拒了。'))]}}});
