/* ---- 全世界國家引擎（p32b）---- 數字為概略值（非官方、非即時） */
const CUR={EUR:0.907,CNY:6.6718,HKD:7.8455,MOP:8.1037,MNT:3599,KPW:900,THB:33.922,VND:25726.7884,MYR:4.0864,IDR:18236.5584,PHP:63.9475,KHR:4097.5678,LAK:22562.5107,MMK:2099.95,BND:1.2912,USD:1,INR:94.2498,PKR:277.1397,BDT:124.7154,LKR:333.5055,NPR:151.1144,BTN:94.4464,MVR:15.4,AFN:65,KZT:446.9455,UZS:12054.0335,KGS:87.4355,TJS:9.25,TMT:3.5,IRR:1374600,IQD:1518.8941,SYP:13002,LBP:89749.8596,JOD:0.709,ILS:3.2167,SAR:3.7882,AED:3.6726,QAR:3.6447,KWD:.31,BHD:0.3781,OMR:0.385,YER:236.5501,TRY:50.3692,CHF:0.8383,ISK:123.832,NOK:9.5722,SEK:10.0736,DKK:6.7791,PLN:3.9968,CZK:22.1341,HUF:330.8404,RON:4.852,BGN:1.7738,RSD:106.6625,BAM:1.7699,MKD:55.8307,ALL:82.2303,BYN:3.004,UAH:45.589,MDL:18.1553,RUB:82.8148,GEL:2.59,AMD:360.2534,AZN:1.7,MXN:18.5322,GTQ:7.6466,BZD:2.0167,HNL:26.9606,NIO:36.8824,CRC:449.3125,CUP:25.75,DOP:60.9376,JMD:158.4342,HTG:131.4918,BSD:1,BBD:2,TTD:6.8064,COP:3314.6655,VES:36,PEN:3.41,BOB:11.6781,BRL:5.6666,PYG:6207.9175,UYU:40.5676,ARS:1545.9193,CLP:997.5954,GYD:209.2647,SRD:37.49,EGP:53.4948,LYD:6.4598,TND:3.0098,DZD:137.1726,MAD:9.9418,SDG:601.5,SSP:130.26,ETB:163.8711,ERN:15,DJF:178.0439,SOS:572.9392,KES:130.0423,TZS:2653.8988,UGX:4131.0555,RWF:1481.9721,BIF:3009.8242,CDF:2319.6448,XAF:594.9382,XOF:594.9382,NGN:1346.3793,GMD:74.3198,GNF:8878.4865,SLL:20969.5,LRD:170.1853,GHS:11.7267,MRU:40.5683,CVE:99.93,AOA:916.3333,ZMW:20.5007,MWK:1738.194,MZN:63.9,NAD:16.9471,BWP:14.0155,ZAR:16.9373,LSL:16.9471,SZL:16.9432,MGA:4562.5588,MUR:47.62,SCR:13.8749,KMF:447.0003,NZD:1.81,AUD:1.4766,PGK:4.5628,FJD:2.2701,SBD:8.0977,VUV:118.43,WST:2.7509,TOP:2.4076,STN:22.5,XCD:2.7026};
const CSYM={EUR:'€',USD:'US$',CNY:'CN¥',HKD:'HK$',AUD:'A$',NZD:'NZ$',CHF:'CHF ',INR:'₹',TRY:'₺',RUB:'₽',BRL:'R$',MXN:'MX$',ZAR:'R',THB:'฿',VND:'₫',PHP:'₱',ILS:'₪',NGN:'₦',EGP:'E£',PLN:'zł',UAH:'₴',KZT:'₸',SAR:'SAR ',AED:'AED '};
const REGN={EA:'東亞',SE:'東南亞',SA:'南亞',CS:'中亞',ME:'中東',EW:'西歐、北歐與南歐',EE:'東歐與高加索',LA:'拉丁美洲與加勒比海',AF:'非洲',OC:'大洋洲',PI:'太平洋島國'};
const HVS=new Set('AR TR NG VE LB SD SS ZW IR EG ET GH MM SY YE MW LY CU HT AO CD SL LR PK LK MZ ZM UA RU BY AF KP SO'.split(' '));
const PEGC=new Set('USD HKD MOP XOF XAF AED SAR QAR BHD OMR DKK BGN BAM XCD BSD BBD BZD CVE KMF BND JOD KWD'.split(' '));
const GULF=new Set('AE QA KW BH OM SA'.split(' '));
const WHVC=new Set('NZ BE PL AT FR IE CZ DK NL SK HU LT IL TR SE IT SI EE AR'.split(' '));
const INVC={GR:250000,PT:500000,ES:500000,MT:600000,CY:300000,IT:250000,AE:2000000,TH:10000000};
const ANGLO=new Set('NZ IE'.split(' '));
const LGN2={mn:'蒙古語',th:'泰語',vn:'越南語',ms:'馬來語',id:'印尼語',tl:'他加祿語',km:'高棉語',lo:'寮語',my:'緬甸語',hi:'印地語',ur:'烏爾都語',bn:'孟加拉語',si:'僧伽羅語',ne:'尼泊爾語',ru:'俄語',uz:'烏茲別克語',fa:'波斯語',ar:'阿拉伯語',he:'希伯來語',tr:'土耳其語',fr:'法語',it:'義大利語',es:'西班牙語',pt:'葡萄牙語',nl:'荷蘭語',is:'冰島語',no:'挪威語',sv:'瑞典語',fi:'芬蘭語',da:'丹麥語',el:'希臘語',pl:'波蘭語',cs:'捷克語',sk:'斯洛伐克語',hu:'匈牙利語',ro:'羅馬尼亞語',bg:'保加利亞語',sl:'斯洛維尼亞語',hr:'克羅埃西亞語',sr:'塞爾維亞語',sq:'阿爾巴尼亞語',et:'愛沙尼亞語',lv:'拉脫維亞語',lt:'立陶宛語',uk:'烏克蘭語',ka:'喬治亞語',hy:'亞美尼亞語',az:'亞塞拜然語',sw:'斯瓦希里語',am:'阿姆哈拉語',so:'索馬利語',mg:'馬達加斯加語',ko:'韓語',ja:'日語',de:'德語',en:'英語',zh:'中文',sg:'英語／華語'};
Object.assign(LGN,LGN2);
/* 宗教模板 */
const RGT={
 CHN:[['無宗教',.74],['佛教',.12],['民間信仰／道教',.08],['基督教',.03],['伊斯蘭教',.02],['其他',.01]],
 HKM:[['無宗教',.55],['民間信仰／道教',.2],['佛教',.14],['基督教',.1],['其他',.01]],
 BUDT:[['佛教',.92],['伊斯蘭教',.04],['其他',.04]],BUDS:[['佛教',.70],['印度教',.13],['伊斯蘭教',.10],['基督教',.07]],
 VNM:[['無宗教',.7],['佛教',.15],['天主教',.07],['民間信仰／道教',.05],['其他',.03]],
 MYS:[['伊斯蘭教',.64],['佛教',.19],['基督教',.09],['印度教',.06],['其他',.02]],
 MUS:[['伊斯蘭教',.97],['其他',.03]],MUSL:[['伊斯蘭教',.82],['基督教',.12],['其他',.06]],MUSS:[['伊斯蘭教',.78],['無宗教',.12],['東正教',.07],['其他',.03]],
 AFM:[['基督教',.48],['伊斯蘭教',.48],['其他',.04]],AFC:[['基督教',.85],['伊斯蘭教',.07],['其他',.08]],AFT:[['基督教',.62],['伊斯蘭教',.15],['傳統信仰',.2],['其他',.03]],
 ETH:[['東正教',.43],['伊斯蘭教',.31],['基督新教',.23],['其他',.03]],EGY:[['伊斯蘭教',.9],['基督教',.1]],
 LAC:[['天主教',.62],['基督新教',.2],['無宗教',.13],['其他',.05]],LAP:[['天主教',.75],['基督新教',.15],['無宗教',.08],['其他',.02]],LAU:[['無宗教',.4],['天主教',.42],['基督新教',.12],['其他',.06]],
 CAR:[['基督新教',.6],['天主教',.2],['無宗教',.1],['其他',.1]],
 CTH:[['天主教',.7],['無宗教',.22],['其他',.08]],EWC:[['天主教',.5],['無宗教',.38],['伊斯蘭教',.07],['其他',.05]],PRT:[['基督新教',.55],['無宗教',.38],['其他',.07]],
 ORT:[['東正教',.7],['無宗教',.18],['伊斯蘭教',.06],['其他',.06]],SECU:[['無宗教',.65],['天主教',.15],['其他',.2]],
 BOS:[['伊斯蘭教',.5],['東正教',.31],['天主教',.15],['其他',.04]],ALB:[['伊斯蘭教',.57],['天主教',.1],['無宗教',.2],['東正教',.07],['其他',.06]],
 ISR:[['猶太教',.74],['伊斯蘭教',.18],['基督教',.02],['其他',.06]],LEB:[['伊斯蘭教',.6],['基督教',.35],['其他',.05]],
 HIN:[['印度教',.8],['伊斯蘭教',.14],['基督教',.02],['錫克教',.02],['其他',.02]],NEP:[['印度教',.81],['佛教',.09],['伊斯蘭教',.05],['其他',.05]],
 PHL:[['天主教',.8],['基督新教',.1],['伊斯蘭教',.06],['其他',.04]],PIC:[['基督教',.9],['其他',.1]],AUS:[['基督教',.5],['無宗教',.4],['其他',.1]],MUR:[['印度教',.48],['基督教',.32],['伊斯蘭教',.17],['其他',.03]],SECX:[['無宗教',.6],['其他',.4]]
};
const RGTX={CHN:'官方認可五大宗教，但多數人自稱沒有宗教信仰，民間信仰與祖先祭祀普遍。',HKM:'香港宗教自由，民間信仰、佛道教與基督教並存。',BUDT:'佛教是主要宗教，寺院與節慶活動融入日常。',MUS:'伊斯蘭教為主要宗教，齋戒月與開齋節是全國性大事。',MUSL:'伊斯蘭教為主要宗教，並有其他宗教少數社群。',MUSS:'穆斯林人口多，但社會世俗化程度較高。',AFC:'基督教（含傳統信仰影響）普遍，教會是社區的重要中心。',AFM:'基督徒與穆斯林人口接近，常見節日共同慶祝。',AFT:'基督教、伊斯蘭教與傳統信仰並存。',LAC:'天主教傳統深厚，近年新教與無宗教者增加。',LAP:'天主教傳統深厚，節慶與遊行是生活的一部分。',CAR:'基督教是主要宗教，教會活動與音樂文化緊密相連。',CTH:'天主教傳統深厚，近年世俗化趨勢明顯。',EWC:'天主教傳統與世俗化並存，社會政教分離。',PRT:'路德宗為主的國家教會傳統，但多數人不常參加禮拜。',ORT:'東正教是主要傳統，教堂與節日在文化中很重要。',SECU:'世俗化程度很高，多數人自稱無宗教。',ISR:'猶太教是國家身分的重要部分，並有伊斯蘭、基督教等社群。',HIN:'印度教為主要宗教，並有伊斯蘭教、錫克教等多元信仰。',PHL:'天主教為主要宗教，節慶與遊行與社區生活密切相關。',PIC:'基督教是主要宗教，教會是社區活動中心。'};
function wpick2(a){return wpick(a)}
/* 名字 */
Object.assign(NM,{
 es:{s:['García','Rodríguez','Martínez','López','Hernández','González'],M:['Carlos','José','Luis','Diego','Miguel'],F:['María','Sofía','Camila','Lucía','Valentina']},
 fr:{s:['Martin','Bernard','Dubois','Moreau','Laurent','Petit'],M:['Louis','Hugo','Lucas','Antoine','Nicolas'],F:['Camille','Léa','Chloé','Manon','Emma']},
 pt:{s:['Silva','Santos','Oliveira','Souza','Pereira','Costa'],M:['João','Pedro','Gabriel','Lucas','Rafael'],F:['Maria','Ana','Beatriz','Julia','Larissa']},
 it:{s:['Rossi','Russo','Ferrari','Esposito','Bianchi','Romano'],M:['Marco','Luca','Giovanni','Matteo','Andrea'],F:['Giulia','Sofia','Chiara','Francesca','Elena']},
 ru:{s:['Ivanov','Petrov','Smirnov','Kuznetsov','Popov','Sokolov'],M:['Aleksandr','Dmitry','Ivan','Sergey','Nikita'],F:['Anna','Olga','Natalia','Elena','Maria']},
 ar:{s:['Al-Farsi','Haddad','Hassan','Khalil','Rahman','Ibrahim'],M:['Ahmed','Omar','Youssef','Ali','Karim'],F:['Fatima','Layla','Amina','Noor','Salma']},
 tr:{s:['Yılmaz','Kaya','Demir','Şahin','Çelik','Aydın'],M:['Mehmet','Mustafa','Emre','Burak','Can'],F:['Ayşe','Elif','Zeynep','Merve','Defne']},
 hi:{s:['Sharma','Patel','Singh','Khan','Das','Reddy'],M:['Rahul','Amit','Vikram','Arjun','Imran'],F:['Priya','Anita','Sunita','Neha','Ayesha']},
 afr:{s:['Mensah','Okafor','Mwangi','Diallo','Nkosi','Abebe'],M:['Kwame','Chinedu','Juma','Moussa','Thabo'],F:['Amara','Ngozi','Zawadi','Aisha','Lindiwe']},
 slv:{s:['Nowak','Novák','Horvat','Kovač','Petrović','Ivanenko'],M:['Piotr','Jan','Marko','Milan','Andriy'],F:['Anna','Marta','Ivana','Katarina','Olena']},
 nor:{s:['Hansen','Johansson','Nielsen','Virtanen','Jensen','Andersson'],M:['Erik','Lars','Mikael','Jonas','Anders'],F:['Ingrid','Sara','Freja','Emma','Liis']},
 eur:{s:['Papadopoulos','Nagy','Popescu','De Vries','Ionescu','Georgiou'],M:['Nikos','Péter','Andrei','Jeroen','Giorgos'],F:['Eleni','Katalin','Maria','Sanne','Ioana']}
});
const LNK={ja:'jp',ko:'kr',en:'en',de:'de',fr:'fr',es:'es',pt:'pt',it:'it',ru:'ru',ar:'ar',fa:'ar',ur:'ar',az:'ar',uz:'ar',tr:'tr',hi:'hi',bn:'hi',ne:'hi',si:'hi',th:'th',km:'th',lo:'th',my:'th',vn:'vn',id:'id',ms:'id',tl:'ph',sw:'afr',am:'afr',so:'afr',mg:'afr',pl:'slv',cs:'slv',sk:'slv',sl:'slv',hr:'slv',sr:'slv',bg:'slv',uk:'slv',sq:'slv',sv:'nor',no:'nor',da:'nor',is:'nor',fi:'nor',et:'nor',lv:'nor',lt:'nor'};
const WK=[];const WD={};
const _lnk32=localNameKey;
function wNameKey(k){const w=WD[k];if(!w)return null;if(w.lg==='zh'||w.lg==='mn'&&false)return null;if(w.reg==='AF'&&w.lg!=='ar')return 'afr';return LNK[w.lg]||'eur'}
localNameKey=function(k){return WD[k]?wNameKey(k):_lnk32(k)};
/* ===== 建立國家 ===== */
function tuUSD(w){let t;if(ANGLO.has(w.k)||/^(US|CA|AU|GB)$/.test(w.k))t=Math.min(45000,Math.max(12000,w.gdp*1000*.4));
 else if(w.reg==='EW'||w.reg==='EE')t=w.k==='LU'||w.k==='CH'||w.k==='AT'||w.k==='NO'||w.k==='FR'||w.k==='IT'||w.k==='ES'||w.k==='PL'||w.k==='CZ'||w.k==='GR'||w.k==='PT'?3500:w.gdp>40?9000:w.gdp>20?4500:2500;
 else if(w.reg==='ME'&&GULF.has(w.k))t=12000;else t=Math.min(12000,Math.max(800,w.gdp*1000*.15));return t}
for(const r of WRL){
 const [k,n,reg,cur,gdp,le,lg,rt,eth,se,att]=r;if(CNS[k])continue;
 const x=CUR[cur]||1,hv=HVS.has(k),peg=PEGC.has(cur),g=+gdp,rich=g>=30,ea=att.split('、');
 const w={k,n,reg,cur,gdp:g,le:+le,lg,rt,s:+se[0],e:+se[1],att:ea[0],dish:ea[1]||ea[0]};
 WD[k]=w;WK.push(k);
 const gr=Math.min({EA:.04,SE:.05,SA:.055,CS:.045,ME:.03,EW:.015,EE:.025,LA:.025,AF:.04,OC:.02,PI:.03}[reg]||.03,rich?.02:.1);
 const tx=GULF.has(k)||k==='BN'?.03:g>45?.30:g>25?.24:g>10?.16:g>3?.1:.06;
 const gulf=GULF.has(k);
 CNS[k]={n,f:String.fromCodePoint(127397+k.charCodeAt(0),127397+k.charCodeAt(1)),sym:CSYM[cur]||cur+' ',w:Math.round(g*1000*.55*x),fx0:32.9/x,vol:hv?.22:peg?.015:.11,u:rich?.045:.07,g:gr,pi:hv?.09:rich?.022:g>6?.04:.06,tax:tx,dep:hv?.1:rich?.02:.045,lgn:lg,
  pr:gulf?30:rich?7:6,cit:gulf?99:rich?9:8,tu:Math.round(tuUSD(w)*x),src:'IMF、聯合國、Pew、GPI 與匯率資料（2025–2026，遊戲簡化）',wr:1,reg};
 if(WHVC.has(k))CNS[k].whv=[18,30,1];
 if(INVC[k])CNS[k].inv=INVC[k];
 CNAME[k]=n;XNK[k]=wNameKey(k);
 const dist=RGT[rt]||RGT.SECX;RGD[k]=dist;RGCTX[k]=RGTX[rt]||'該國宗教分布依近年統計概估，社會對宗教的開放程度各地不同。';
 ETHD[k]=eth.split('/').map(p=>{const m=p.match(/^(.*?)(\.\d+)$/);return [m?m[1]:p,m?+m[2]:.1]});
 ETHO[k]=[['鄰近國家',.5],['其他',.5]];
 CARE_N[k]='長照服務';
 /* 制度層（依區域與所得水準的通則，簡化） */
 const rg=reg,pooor=g<4,mid=g>=4&&g<20;
 const lvb={EW:25,EE:22,OC:20,ME:22,SE:14,EA:12,SA:16,LA:15,AF:18,CS:20,PI:15}[rg]||15,hol={EW:11,EE:12,ME:12,SE:14,EA:10,SA:15,LA:12,AF:12,OC:10,PI:12,CS:12}[rg]||12;
 CX[k]={law:n+'勞動法規（區域通則，遊戲簡化）',lv:y=>y<1?Math.round(lvb*.5):lvb,lvTxt:`依區域通則估算約 ${lvb} 天（實際依法規與公司而異）`,hol,ra:rich?66:rg==='EE'?63:rg==='LA'?62:60,rr:{EW:.5,EE:.45,LA:.4,AF:.3,SE:.35,SA:.3,ME:.4,EA:.4,OC:.35,PI:.3,CS:.4}[rg]||.35,hm:Math.max(.2,Math.min(1.5,g/40)),
  fam:`婚假、喪假、產假：${rich?'多有法定產假與陪產假':'制度與執行程度差異大，產假常為數週到數月'}（區域通則，遊戲簡化；請查閱當地法規）`,
  ot:`加班：${rich?'依法限制工時並計加班費':'法定工時常為 40–48 小時／週，執行程度各地不同'}（通則）`,
  mar:'你依當地規定與公司慣例請了婚假。',mat:'你依當地法規與公司制度請了產假。',pat:'你請了陪產假（依當地規定）。',mourn:'你依當地規定請了喪假。'};
 EST[k]={fh:(rg==='OC'||rg==='PI')?0:.5,pb:.01,lb:0,fp:0,sp:n=>.5,nm:n+'繼承法規（區域通則，簡化）'};
 const wl=CNS[k].w;
 HCS[k]=rich?{sys:`${n}：公共或社會保險為主，自付額較低（區域通則，簡化）`,use:'依當地醫療體系接受治療',oop:[Math.round(wl*.005),Math.round(wl*.04)],nj:[Math.round(wl*.005),Math.round(wl*.04)],pv:Math.round(wl*.15),wait:rg==='EW'?'公立專科預約可能需數週':null,ok:'費用大多由保險吸收。'}
  :pooor?{sys:`${n}：公共醫療資源有限，自付比例高（區域通則，簡化）`,use:'前往公立或私人診所治療',oop:[Math.round(wl*.05),Math.round(wl*.4)],nj:[Math.round(wl*.05),Math.round(wl*.4)],pv:Math.round(wl*.7),wait:'公立醫院排隊時間很長',ok:'醫療品質與設備有限，你還是恢復了。'}
  :{sys:`${n}：公私醫療並行，中產階級多買私人保險（區域通則，簡化）`,use:'在當地醫院接受治療',oop:[Math.round(wl*.02),Math.round(wl*.15)],nj:[Math.round(wl*.02),Math.round(wl*.15)],pv:Math.round(wl*.35),wait:'公立醫院等候較久',ok:'你的治療順利完成。'};
}
Object.assign(SSMY,{NL:2001,BE:2003,ES:2005,ZA:2006,NO:2009,SE:2009,PT:2010,IS:2010,AR:2010,DK:2012,FR:2013,NZ:2013,UY:2013,BR:2013,LU:2015,IE:2015,CO:2016,FI:2017,MT:2017,AT:2019,EC:2019,CR:2020,CH:2022,CL:2022,SI:2022,CU:2022,AD:2023,EE:2024,GR:2024,LI:2025,MX:2022,BO:2024});
const WN=()=>WK.length;
/* 確保存檔／新遊戲初始化（匯率、總體） */
function wEnsure(){cnInit();for(const k of WK){if(S.fx[k]==null){S.fx[k]=CNS[k].fx0;S.fxp[k]=CNS[k].fx0}if(!S.cs[k])S.cs[k]={g:CNS[k].g,u:CNS[k].u,pi:CNS[k].pi}}if(!S.trav)S.trav={}}
const _cys32=cnYearStart;
cnYearStart=function(){wEnsure();_cys32();
 const crisis=false;for(const k of WK){const c=CNS[k];S.fxp[k]=S.fx[k];const hv=HVS.has(k);
  let r=-.15*Math.log(S.fx[k]/c.fx0)+c.vol*(.5*nrm()+.8*nrm())-(hv?.05:0);
  S.fx[k]=Math.max(c.fx0*(hv?.1:.55),Math.min(c.fx0*1.8,S.fx[k]*Math.exp(r)))}};
