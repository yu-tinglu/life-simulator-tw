/* ---- p48：行業景氣循環（依真實年份，部分為估計）與地區薪資 ---- */
const SECT=[['tech',/工程師|軟體|程式|資訊|數據|AI|演算|資安/],['fin',/金融|銀行|證券|會計|分析師|保險|理財|交易/],['trv',/空服|導遊|旅|餐|飯店|廚|調酒|民宿|服務生/],['con',/營造|建築|土木|施工|水電|裝潢/],['mfg',/技術員|作業員|工廠|製造|半導體|機械|電子/],['hlt',/醫|護|藥|治療/],['med',/記者|編輯|導演|YouTuber|網紅|演員|歌手|主播/]];
const CYC={
 tech:{2000:.1,2001:-.15,2002:-.12,2003:-.05,2009:-.05,2013:.03,2014:.03,2015:.03,2016:.03,2017:.04,2018:.04,2019:.03,2020:.08,2021:.12,2022:-.03,2023:-.08,2024:.03,2025:.1},
 fin:{2001:-.04,2002:-.05,2008:-.15,2009:-.1,2010:-.03,2021:.06,2022:-.03},
 trv:{2003:-.1,2020:-.35,2021:-.3,2022:-.12,2023:.05,2024:.08,2025:.04},
 con:{2008:-.1,2009:-.08,2016:.04,2017:.04,2018:.04,2021:.03},
 mfg:{2001:-.06,2008:-.12,2009:-.15,2010:.1,2020:-.05,2021:.07,2022:-.04,2023:-.05},
 hlt:{2020:.08,2021:.08},
 med:{2020:.05,2009:-.04}
};
function sectOf(t){const s=SECT.find(x=>x[1].test(t||''));return s?s[0]:null}
function cycNow(t){const s=sectOf(t),y=S.year||calYear();return s&&CYC[s]&&CYC[s][y]||0}
const CITYW={tpe:1.12,ntp:1.05,txg:1,khh:.97,rural:.88};
const _hj48=hireJob;hireJob=function(j){const o=_hj48(j);let f=1+cycNow(j.t);if((S.cn||'TW')==='TW'&&S.house&&CITYW[S.house.c])f*=CITYW[S.house.c];if(f!==1){o.sal=Math.round(o.sal*f);o.s0=o.sal}return o};
const _y48=yearly;yearly=function(){_y48();try{if(S.job&&!S.job.founder&&S.job.t){const c=cycNow(S.job.t);if(c<=-.08||c>=.08){S.job.sal=Math.round(S.job.sal*(1+c*.3));log(c<0?`${sectOf(S.job.t)&&SECTN[sectOf(S.job.t)]}景氣低迷，薪資調整受到影響。`:`${SECTN[sectOf(S.job.t)]}景氣熱絡，你的薪資跟著提升。`,c<0?'bad':'good')}}}catch(e){}};
const SECTN={tech:'科技業',fin:'金融業',trv:'旅遊餐飲業',con:'營建業',mfg:'製造業',hlt:'醫療業',med:'媒體演藝業'};
const _eco48=ecoHTML;ecoHTML=function(){return _eco48()+'<p class="sub">行業景氣：科技、金融、旅遊餐飲、營建、製造、醫療與媒體各有景氣循環，年份依真實大事（網路泡沫、金融海嘯、疫情、AI 熱潮）估計；強度為遊戲估計，並非官方統計。</p>'};
/* 黃金真實年度報酬（美元計價，來源 upmyinterest.com 彙整）*/
const GDR={2000:-6.06,2001:1.41,2002:23.96,2003:21.74,2004:4.40,2005:17.77,2006:23.92,2007:31.59,2008:3.97,2009:25.04,2010:30.60,2011:7.80,2012:8.69,2013:-27.61,2014:-.44,2015:-11.61,2016:8.62,2017:9.54,2018:-1.06,2019:18.28,2020:25.75,2021:-3.73,2022:2.08,2023:13.14,2024:27.20,2025:64.6};
const _mr48=mktRet;mktRet=function(y,cr,g,fxu){const r=_mr48(y,cr,g,fxu);if(GDR[y]!=null)r.gold=GDR[y]/100+fxu;return r};
const _pf48=pfHTML;pfHTML=function(){return _pf48().replace('採實際年度報酬；','與黃金（2000–2025，美元計價）採實際年度報酬；').replace('債券、日股、歐股、新興市場、黃金、REITs','債券、日股、歐股、新興市場、REITs')};
