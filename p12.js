// ===== 歷史景氣／物價分項／投資組合／職場與家庭連鎖事件（p12）=====
// 經濟成長率 2001–2024、CPI 2004–2024 採主計總處公布值（2001–2019 年成長率為約略值），2025 年起為模擬；
// CPI 分項權重取主計總處 2025 家庭收支調查消費結構（居住 24.1%、食品 15.4%、醫療 14.1%）。分項漲幅、資產報酬為遊戲估算。
const HG={2001:-1.4,2002:5.6,2003:4.1,2004:6.5,2005:5.4,2006:5.6,2007:6.5,2008:0.7,2009:-1.6,2010:10.6,2011:3.8,2012:2.1,2013:2.2,2014:4.7,2015:1.5,2016:2.2,2017:3.3,2018:2.8,2019:3.1,2020:3.4,2021:6.6,2022:2.6,2023:1.1,2024:4.6};
const HC={2004:1.61,2005:2.31,2006:.60,2007:1.79,2008:3.54,2009:-.88,2010:.97,2011:1.42,2012:1.93,2013:.80,2014:1.20,2015:-.31,2016:1.40,2017:.62,2018:1.36,2019:.55,2020:-.23,2021:1.97,2022:2.95,2023:2.49,2024:2.18,2026:2.07};
const HEV={1997:'亞洲金融風暴',2001:'網路泡沫與九一一事件',2003:'SARS 疫情',2008:'金融海嘯',2009:'金融海嘯後衰退',2010:'景氣強勁反彈',2020:'COVID-19 疫情',2021:'疫後出口暢旺',2022:'升息與通膨潮',2023:'庫存調整',2024:'AI 需求帶動出口'};
const CRISIS={1997:1,2001:1,2008:1,2009:1,2020:1};
const calYear=()=>(S.byear!=null?S.byear:2026-S.age)+S.age;
function macroYear(){
 const y=calYear();S.year=y;
 if(HG[y]!=null){S.gdp=HG[y]/100;S.econ=Math.max(-.07,Math.min(.07,(S.gdp-.035)*.8))}
 else if(y>2026&&chance(.07)){S.gdp=-.01-Math.random()*.04;S.econ=Math.max(-.07,(S.gdp-.035)*.8)}
 let ev=HEV[y]||(S.gdp<-.005?'景氣衰退':'');
 const base=HC[y]!=null?HC[y]/100:Math.max(-.01,Math.min(.07,.02+nrm()*.009+(S.econ>.03?.004:0)));
 S.cpi=base;
 const rp=S.rp=S.rp||{h:1,f:1,m:1,o:1},old={...rp};
 const comp={h:base+.012+S.econ*.3+nrm()*.008,f:base+nrm()*.02+(y===2008?.05:0),m:base+.012+nrm()*.006,o:base-.003+nrm()*.004};
 for(const c in rp){rp[c]=Math.max(.6,Math.min(2.2,rp[c]*(1+comp[c])/(1+base)))}
 S.hrg=rp.h/old.h;
 S.pxi=.241*rp.h+.154*rp.f+.141*rp.m+.464*rp.o;
 S.cpic={h:comp.h,f:comp.f,m:comp.m};
 (S.mh=S.mh||[]).push({y,g:S.gdp,c:base});if(S.mh.length>14)S.mh.shift();
 return ev;
}
function pxiCost(base){
 if(!S.rp)return base;
 return base*(S.house?(.154*S.rp.f+.141*S.rp.m+.464*S.rp.o)/.759:S.pxi);
}
function wageGrow(){return Math.max(.99,Math.min(1.04,1+.014-.4*((S.cpi==null?.02:S.cpi)-.02)+S.econ*.15))}
// ---- 投資組合 ----
const PFN={bond:['公債／定存',0,0],tw:['台股 ETF',0,0],us:['美股 ETF（含匯率風險）',0,0],gold:['黃金',0,0]};
const pfSum=()=>S.pf?Object.keys(S.pf).reduce((a,k)=>a+(S.pf[k]||0),0):0;
function pfYear(){
 if(!S.pf)return;
 const y=S.year||calYear(),cr=CRISIS[y]?1:0,g=S.gdp==null?.035:S.gdp;
 const fxu=(S.fx&&S.fxp&&S.fxp.US)?S.fx.US/S.fxp.US-1:0;
 const r=mktRet(y,cr,g,fxu);
 let tot=0,t0=pfSum();
 for(const k in r){S.pf[k]=Math.max(0,Math.round((S.pf[k]||0)*(1+r[k])))}
 tot=pfSum()-t0;S.pfr=r;
 if(t0>1e6&&S.age>=18)log(`投資組合今年${tot>=0?'賺':'賠'} ${money(Math.abs(tot))}（台股 ${(r.tw*100).toFixed(0)}%、美股 ${(r.us*100).toFixed(0)}%${r.btc!=null&&(S.pf.btc||0)>0?`、比特幣 ${(r.btc*100).toFixed(0)}%`:''}）。`,tot<0?'bad':'good');
}
function pfHTML(){
 S.pf=S.pf||{bond:0,tw:0,us:0,gold:0};const y=calYear();
 let h=`<div class="sec">投資組合（總值 ${money(pfSum())}）</div><p class="sub">各市場報酬會隨景氣、利率與世界事件連動（金融風暴、降息、能源與科技循環等）；2011–2026 年的比特幣與 2017–2026 年的以太幣採實際年度漲跌幅，之後為模擬。賣出收 0.3% 稅費（加密貨幣 1%）。非官方數字，非投資建議。</p>`;
 if(S.pfr)h+=`<p class="sub">去年報酬：${PFK.filter(k=>pfAvail(k,y)).map(k=>`${PFN[k][0].replace(/（.*?）/g,'')} ${(S.pfr[k]*100).toFixed(0)}%`).join('、')}</p>`;
 for(const k of PFK){if(!pfAvail(k,y))continue;h+=`<div class="item"><b>${PFN[k][0]}</b>　${money(S.pf[k]||0)}</div><div class="seg"><button data-a="pf:b:${k}:1000000" ${S.money<1e6?'disabled':''}>買 100 萬</button><button data-a="pf:b:${k}:5000000" ${S.money<5e6?'disabled':''}>買 500 萬</button><button data-a="pf:s:${k}" ${(S.pf[k]||0)<=0?'disabled':''}>全賣</button></div>`}
 return h;
}
function pfHandle(x,y,z){
 S.pf=S.pf||{bond:0,tw:0,us:0,gold:0};
 if(x==='b'){const a=+z;if(!pfAvail(y,calYear()))return B('這個商品現在還沒有發行。');if(S.money<a)return B('現金不足。');const fee=['btc','eth','alt'].includes(y)?.01:0;S.money-=a;S.pf[y]=(S.pf[y]||0)+Math.round(a*(1-fee));return G(`買進 ${PFN[y][0]} ${money(a)}。`)}
 if(x==='s'){const fee=['btc','eth','alt'].includes(y)?.01:.003;const v=Math.round((S.pf[y]||0)*(1-fee));S.money+=v;S.pf[y]=0;return G(`賣出取得 ${money(v)}。`)}
 return null;
}
// ---- 經濟儀表板 ----
function ecoHTML(){
 let h='<h3>📊 經濟儀表板</h3>';
 const s=S.cs&&S.cs.TW,y=calYear();
 h+=`<div class="item"><b>${y} 年</b>${S.hev?`・${S.hev}`:''}<br>經濟成長率 ${((S.gdp||0)*100).toFixed(1)}% ・ CPI ${((S.cpi||0)*100).toFixed(1)}% ・ 失業率 ${s?pct(s.u):'—'}</div>`;
 if(S.cpic)h+=`<p class="sub">分項漲幅：居住 ${(S.cpic.h*100).toFixed(1)}%、食品 ${(S.cpic.f*100).toFixed(1)}%、醫療 ${(S.cpic.m*100).toFixed(1)}%。相對物價指數（含權重）：${(S.pxi||1).toFixed(2)}，年生活費 ${money(livingCost())}。</p>`;
 h+=`<table class="rt"><tr class="h"><td>年度</td><td>成長率 / CPI</td></tr>`+(S.mh||[]).slice().reverse().map(r=>`<tr><td>${r.y}${HG[r.y]!=null?'':'（模擬）'}</td><td>${(r.g*100).toFixed(1)}% / ${(r.c*100).toFixed(1)}%</td></tr>`).join('')+`</table>`;
 h+=`<p class="sub" style="line-height:1.6">2001–2024 年成長率與 2004–2024 年 CPI 採主計總處公布值（2001–2019 成長率為約略值）；2025 年起為模擬。你的出生年是 ${S.byear||'—'} 年，所以會親身經歷當年的景氣。</p>`;
 return h;
}
// ---- 每年生活事項 ----
function lifeYear(){
 if(S.flags.ins){S.money-=[0,36000,80000][S.flags.ins]}
 if(S.flags.careYrs>0){S.money-=S.flags.careCost||0;if(S.flags.careHl){chg('health',-3);chg('happy',-3)}S.flags.careYrs--}
 pfYear();
}
// ---- 事件 ----
const sal=()=>S.job&&!S.job.founder?S.job.sal:0;
E.push(
{id:'raise',min:24,max:60,w:3,if:()=>S.job&&!S.job.founder&&!S.job.var,run:()=>({t:`年度績效面談，主管問你對薪資有沒有想法。（目前年薪 ${money(sal())}，績效 ${S.job.perf}）`,c:[
 ch('提出加薪要求',()=>{const p=.25+S.job.perf/200;if(chance(p)){S.job.sal=Math.round(S.job.sal*1.1);return G('主管同意加薪 10%。')}S.job.perf=cl(S.job.perf-5);return B('主管說預算有限，印象分數下降。')}),
 ch('默默努力，不提',()=>{S.job.perf=cl(S.job.perf+3);return N('你把精力放在表現上。')}),
 ch('拿其他公司 offer 談判',()=>{if(chance(.55)){S.job.sal=Math.round(S.job.sal*1.15);return G('公司留人，加薪 15%。')}if(chance(.25)){const m='你被視為不忠誠，遭到解僱。';S.job=null;chg('happy',-8);return B(m)}return N('談判無果，但你保住了工作。')})]})},
{id:'ot',min:22,max:58,w:2,if:()=>S.job&&!S.job.founder,run:()=>({t:'公司專案吃緊，主管要求你連續三個月每週加班 15 小時（勞基法：延長工時每月上限 46 小時，須付加班費 1.34／1.67 倍）。',c:[
 ch('配合加班領加班費',()=>{const b=Math.round(sal()*.08);S.money+=b;chg('health',-4);chg('happy',-4);S.job.perf=cl(S.job.perf+8);return N(`你多賺了 ${money(b)}，但很累。`)}),
 ch('依法拒絕',()=>{S.job.perf=cl(S.job.perf-8);return N('你守住下班時間，績效評價下滑。')}),
 ch('向勞動局檢舉違法加班',()=>{if(chance(.6)){const b=Math.round(sal()*.05);S.money+=b;S.job.perf=cl(S.job.perf-10);return G(`公司被裁罰並補發加班費 ${money(b)}，但同事對你態度冷淡。`)}S.job.perf=cl(S.job.perf-12);return B('查無違法，你在公司的處境變難。')})]})},
{id:'mba',min:28,max:46,w:2,if:()=>S.job&&!S.job.founder&&S.edu>=4,run:()=>({t:'你考慮念 EMBA（學費約 NT$600,000，需兩年週末上課）。',c:[
 ch('報名就讀',()=>{if(S.money<6e5)return B('學費不足，放棄了。');S.money-=6e5;chg('smarts',2);chg('happy',-3);if(S.job&&chance(.7)){S.job.sal=Math.round(S.job.sal*1.15);S.job.lv++;return G('畢業後你獲得升遷，年薪 +15%。')}return N('你學到不少，但職涯沒有立即改變。')}),
 ch('不念，把時間留給家人',()=>{chg('happy',3);return N('你選擇平衡生活。')})]})},
{id:'care',min:50,max:70,w:2,if:()=>(S.mom.alive||S.dad.alive)&&!(S.flags.careYrs>0),run:()=>({t:'你的父母失能，需要長期照顧。（長照 2.0 可申請補助；外籍看護與機構每年約 NT$600,000–720,000，為遊戲估算）',c:[
 ch('聘請外籍看護（3 年，每年 60 萬）',()=>{S.flags.careYrs=3;S.flags.careCost=6e5;S.flags.careHl=0;const p=S.mom.alive?S.mom:S.dad;p.rel=cl(p.rel+5);return N('你申請了長照補助並聘請看護，家裡漸漸安定。')}),
 ch('送安養機構（3 年，每年 72 萬）',()=>{S.flags.careYrs=3;S.flags.careCost=72e4;S.flags.careHl=0;return N('你選了評價不錯的機構，定期探望。')}),
 ch('自己照顧（辭去工作）',()=>{S.flags.careYrs=3;S.flags.careCost=0;S.flags.careHl=1;if(S.job&&!S.job.founder){log('你辭去工作專心照顧父母。');S.job=null}const p=S.mom.alive?S.mom:S.dad;p.rel=cl(p.rel+12);return N('你親自照顧，父母很感動，但你的身心都很疲憊。')})]})},
{id:'ill',min:35,max:90,w:3,if:()=>S.health<70||S.age>55,run:()=>({t:'健檢發現重大疾病，醫師建議治療。（重大傷病可免健保部分負擔；自費新藥另計）',c:[
 ch('健保標準治療',()=>{const c=Math.round(R(8,25)*1e4);S.money-=c;chg('health',-4);return N(`治療花費自付約 ${money(c)}。`)}),
 ch('自費標靶／新藥（約 150 萬）',()=>{const rb=[0,.5,.8][S.flags.ins||0],c=Math.round(1.5e6*(1-rb));S.money-=c;chg('health',12);return G(`自費治療，扣除保險理賠自付 ${money(c)}，病情控制良好。`)}),
 ch('保守觀察',()=>{chg('health',-12);chg('happy',-5);return B('你選擇不積極治療，身體明顯變差。')})]})},
{id:'insure',min:24,max:50,w:3,if:()=>!S.flags.ins&&S.age>=24,run:()=>({t:'保險業務員建議你規劃醫療保障。',c:[
 ch('不買',()=>N('你覺得健保就夠了。')),
 ch('醫療險（每年 3.6 萬，理賠自費 50%）',()=>{S.flags.ins=1;return N('你買了實支實付醫療險。')}),
 ch('醫療＋重大疾病（每年 8 萬，理賠 80%）',()=>{S.flags.ins=2;return N('你買了完整的醫療與重大疾病保障。')})]})},
{id:'presale',min:28,max:52,w:2,if:()=>!S.house&&S.money>2e6,run:()=>({t:'朋友介紹一個熱門預售屋建案，你要買房嗎？',c:HOUSES.slice(0,6).filter(h=>h.p<=Math.max(S.money*3,sal()*10)).map((h,i)=>ch(`${h.n}　${money(h.p)}（頭期 ${money(h.p*.2)}）`,()=>{if(S.money<h.p*.2)return B('頭期款不夠，沒買成。');const r=buyHouse(i,'loan');return r})).concat([ch('繼續租屋',()=>{chg('happy',1);return N('你決定再觀望。')})])})},
{id:'bonus',min:23,max:60,w:3,if:()=>S.job&&!S.job.founder&&!S.job.var,run:()=>{const b=Math.round(sal()*.15);return {t:`年終獎金入帳 ${money(b)}，你要怎麼運用？`,c:[
 ch('投入台股 ETF',()=>{S.pf=S.pf||{bond:0,tw:0,us:0,gold:0};S.money+=b;const a=Math.min(b,S.money);S.money-=a;S.pf.tw+=a;return N('你分批買進台股 ETF。')}),
 ch('存起來',()=>{S.money+=b;return N('你把錢放進銀行。')}),
 ch('出國旅行犒賞自己',()=>{chg('happy',8);S.money+=Math.round(b*.4);return G('你放了一個很棒的長假。')})]}}}
);
