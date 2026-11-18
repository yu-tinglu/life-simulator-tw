// ===== 國家資料層／浮動匯率／移民（p9）=====
// 數字：各國官方統計機關近年公布值的「約略值」；匯率基準：美元兌新台幣取央行 2026/11 收盤約 32.9，其餘為估計。
const CNS={
 TW:{n:'台灣',f:'🇹🇼',sym:'NT$',w:761000,fx0:1,vol:0,u:.034,g:.035,pi:.020,tax:.09,dep:.016,lgn:'zh',src:'行政院主計總處、勞動部、中央銀行'},
 JP:{n:'日本',f:'🇯🇵',sym:'¥',w:4780000,fx0:.21,vol:.09,u:.026,g:.010,pi:.027,tax:.24,dep:.006,lgn:'ja',whv:[18,30,1],pr:10,cit:5,tu:1000000,src:'日本國稅廳民間給與實態統計、總務省統計局'},
 KR:{n:'南韓',f:'🇰🇷',sym:'₩',w:48000000,fx0:.0225,vol:.09,u:.028,g:.020,pi:.025,tax:.20,dep:.028,lgn:'ko',whv:[18,30,1],pr:5,cit:7,tu:8000000,src:'韓國統計廳(KOSTAT)、OECD'},
 US:{n:'美國',f:'🇺🇸',sym:'US$',w:80000,fx0:32.9,vol:.06,u:.042,g:.023,pi:.029,tax:.24,dep:.040,lgn:'en',pr:7,cit:12,tu:30000,inv:800000,src:'美國勞工統計局(BLS)、經濟分析局(BEA)、OECD'},
 CA:{n:'加拿大',f:'🇨🇦',sym:'C$',w:68000,fx0:23.8,vol:.07,u:.065,g:.015,pi:.024,tax:.25,dep:.030,lgn:'en',whv:[18,35,1],pr:3,cit:5,tu:20000,src:'加拿大統計局(Statistics Canada)、OECD'},
 AU:{n:'澳洲',f:'🇦🇺',sym:'A$',w:100000,fx0:21.5,vol:.09,u:.042,g:.018,pi:.030,tax:.25,dep:.038,lgn:'en',whv:[18,30,1],pr:4,cit:5,tu:35000,src:'澳洲統計局(ABS)、OECD'},
 GB:{n:'英國',f:'🇬🇧',sym:'£',w:42000,fx0:43.5,vol:.08,u:.047,g:.012,pi:.030,tax:.26,dep:.040,lgn:'en',whv:[18,30,2],pr:5,cit:6,tu:20000,src:'英國國家統計局(ONS)、OECD'},
 DE:{n:'德國',f:'🇩🇪',sym:'€',w:54000,fx0:38,vol:.07,u:.035,g:.005,pi:.022,tax:.40,dep:.020,lgn:'de',whv:[18,30,1],pr:5,cit:8,tu:1500,src:'德國聯邦統計局(Destatis)、OECD'},
 SG:{n:'新加坡',f:'🇸🇬',sym:'S$',w:78000,fx0:25.5,vol:.04,u:.020,g:.027,pi:.022,tax:.08,dep:.028,lgn:'sg',pr:5,cit:7,tu:40000,inv:10000000,src:'新加坡人力部(MOM)、統計局(SingStat)'}
};
const CNK=Object.keys(CNS).filter(k=>k!=='TW');
const LGN={zh:'中文',en:'英語',ja:'日語',ko:'韓語',de:'德語',sg:'英語／華語'};
const PUB=/公務員|警察|消防員|職業軍人|海關關員|外交官|法官|檢察官|稅務人員|航管員|捷運站務員|中研院/;
const LIC=/醫師|律師|會計師|建築師|護理師|藥師|心理師|治療師|營養師|社工師|老師|估價師|機師|船長|精算師/;
const nrm=()=>(Math.random()+Math.random()+Math.random()-1.5)*2;
const pct=v=>(v*100).toFixed(1)+'%';
const fmtL=(k,v)=>CNS[k].sym+Math.round(v).toLocaleString('en-US');
function cnInit(){
 if(S.cn)return;
 S.cn='TW';S.fx={};S.fxp={};S.fxh={};S.cs={};S.ab=null;S.lang={};S.inv=null;
 for(const k of CNK){S.fx[k]=CNS[k].fx0;S.fxp[k]=CNS[k].fx0}
 for(const k in CNS)S.cs[k]={g:CNS[k].g,u:CNS[k].u,pi:CNS[k].pi};
}
const fxr=k=>k==='TW'?1:(S.fx[k]!=null?S.fx[k]:(typeof wEnsure==='function'?(wEnsure(),S.fx[k]):1));
const wTW=k=>CNS[k].w*fxr(k);
function livingCost(){cnInit();return S.cn==='TW'?Math.round(pxiCost(S.house?395000:454000)):Math.round(.6*wTW(S.cn))}
function kidCost(){cnInit();return S.cn==='TW'?270000:Math.round(270000*wTW(S.cn)/761000)}
function langInit(k){const c=CNS[k];return c.lgn==='en'?Math.round(35+S.smarts*.4):c.lgn==='sg'?Math.round(40+S.smarts*.4):5}
function langF(k){const c=CNS[k],l=S.lang[k]!=null?S.lang[k]:langInit(k);return (c.lgn==='en'||c.lgn==='sg')?.75+.25*l/100:.45+.55*l/100}
function jobSal(j){cnInit();if(S.cn==='TW')return j.sal;const c=CNS[S.cn];return Math.round(j.sal*(wTW(S.cn)/761000)*langF(S.cn)*(1-c.tax)/(1-.09))}
function cnHire(){cnInit();const u=S.cs[S.cn].u;if(S.cn==='TW')return (.04-u)*1.5;const l=S.lang[S.cn]||0,c=CNS[S.cn];return -.08+(.04-u)*1.5-((c.lgn==='ja'||c.lgn==='ko'||c.lgn==='de')&&l<60?(60-l)/400:0)}
function layoffAdj(){cnInit();return Math.max(-.005,(S.cs[S.cn].u-.035))}
function jobBlock(j){
 cnInit();if(S.cn==='TW')return '';
 const v=S.ab&&S.ab.visa;
 if(v==='study')return '留學簽證不得全職工作';
 if(PUB.test(j.t))return '外國人不得任公職';
 if(v==='whv'&&j.edu>3)return '打工度假僅限一般職缺';
 if(LIC.test(j.t)&&(S.lang[S.cn]||0)<70)return '需當地執照（語言 70%+）';
 return '';
}
function cnJobNote(){cnInit();if(S.cn==='TW')return '';const c=CNS[S.cn];return `<p class="sub">${c.f} 你在${c.n}：職缺薪資 = 台灣職缺 × 當地平均薪資比 × 語言係數（目前 ${Math.round(langF(S.cn)*100)}%）× 稅後調整。外國人不能任公職、不能在當地創業；需執照職業要語言 70%+。</p>`}
function cnAssets(){
 if(!S.cn)return 0;let v=0;
 for(const k in S.fxh)v+=S.fxh[k]*S.fx[k];
 if(S.inv)v+=S.inv.v*S.fx[S.inv.cn];
 v+=(typeof pfSum==='function'?pfSum():0);
 return v;
}
// ---- 每年開始：匯率、各國統計 ----
function cnYearStart(){
 cnInit();const a=S.age;
 const crisis=CRISIS[S.year]!=null?!!CRISIS[S.year]:chance(.04),z0=nrm();
 for(const k of CNK){const c=CNS[k];S.fxp[k]=S.fx[k];
  let r=-.15*Math.log(S.fx[k]/c.fx0)+c.vol*(.6*z0+.8*nrm());
  if(crisis)r+=(k==='JP'||k==='US')?.07:-.04;
  S.fx[k]=Math.max(c.fx0*.55,Math.min(c.fx0*1.8,S.fx[k]*Math.exp(r)));}
 if(crisis&&a>=18)log('全球風險趨避：美元、日圓走強，其他貨幣兌新台幣走弱。','bad');
 for(const k in CNS){const c=CNS[k],s=S.cs[k];
  if(k==='TW'){s.g=S.gdp;s.pi=S.cpi!=null?S.cpi:Math.max(-.01,Math.min(.06,c.pi+nrm()*.006))}
  else{s.g=Math.max(-.08,Math.min(.08,c.g+(s.g-c.g)*.3+nrm()*.014-(crisis?.025:0)));s.pi=Math.max(-.01,Math.min(.09,c.pi+(s.pi-c.pi)*.5+nrm()*.007))}
  s.u=Math.max(.01,Math.min(.15,c.u-.35*(s.g-c.g)+(Math.random()-.5)*.006));
 }
 // 外幣存款相對持有新台幣的實質利差（簡化）
 for(const k in S.fxh){S.fxh[k]*=1+(CNS[k].dep-S.cs[k].pi)-(CNS.TW.dep-S.cs.TW.pi)}
 // 國外工作薪資隨匯率換算
 if(S.cn!=='TW'&&S.job&&!S.job.founder&&S.job.cn===S.cn)S.job.sal=Math.round(S.job.sal*S.fx[S.cn]/S.fxp[S.cn]);
 if(a>=18&&S.cn!=='TW'){const k=S.cn,d=S.fx[k]/S.fxp[k]-1;if(Math.abs(d)>.06)log(`${CNS[k].n}幣兌新台幣${d>0?'升值':'貶值'} ${Math.abs(d*100).toFixed(1)}%。`,d>0?'good':'bad')}
}
// ---- 每年結束：簽證、語言、事件 ----
function locJob(){return S.job&&!S.job.founder&&S.job.cn===S.cn}
function goHome(why){
 const c=CNS[S.cn];log(`你結束在${c.n}的生活，回到台灣。${why||''}`,'bad');
 if(S.job&&!S.job.founder)S.job=null;
 if(S.school&&S.ab&&S.ab.visa==='study'){S.school=null;S.tuition=0}
 S.cn='TW';S.ab=null;
}
const E_HOME={run:()=>({t:`你在${CNS[S.cn].n}想家了，農曆年快到了。`,c:[
 ch('飛回台灣探親',()=>{const f=Math.round(45000*wTW(S.cn)/761000+25000);S.money-=f;chg('happy',10);S.mom.rel=cl(S.mom.rel+5);S.dad.rel=cl(S.dad.rel+5);return G(`你回台灣過年，機票與開銷約 ${money(f)}。`)}),
 ch('視訊聊聊就好',()=>{chg('happy',-2);return N('你和家人視訊，聊了很久。')}),
 ch('參加當地台灣人社團',()=>{chg('happy',4);return G('你在台灣人社團吃到了久違的滷肉飯。')})]})};
const E_DISC={run:()=>({t:'你因為語言不夠好，在當地職場與生活遇到不少不便。',c:[
 ch('報名語言課（NT$30,000）',()=>{S.money-=30000;S.lang[S.cn]=Math.min(100,(S.lang[S.cn]||0)+15);return G('語言課讓你進步不少。')}),
 ch('忍耐，慢慢適應',()=>{chg('happy',-6);return B('你默默承受，心情低落。')}),
 ch('找同鄉互相幫忙',()=>{chg('happy',2);S.lang[S.cn]=Math.min(100,(S.lang[S.cn]||0)+4);return N('同鄉給了你很多實用建議。')})]})};
const E_HH={run:()=>({t:'當地獵頭開出比現職高 20% 的年薪挖角你，但要重新適應新團隊。',c:[
 ch('跳槽',()=>{if(!locJob())return N('你已經不在原公司了。');S.job.sal=Math.round(S.job.sal*1.2);S.job.perf=50;S.job.years=0;chg('happy',-2);return G('你跳槽了，年薪 +20%。')}),
 ch('留在原公司',()=>{if(locJob())S.job.perf=cl(S.job.perf+5);return N('你選擇穩定。')}),
 ch('拿 offer 跟老闆談加薪',()=>{if(!locJob())return N('你已經不在原公司了。');if(chance(.5)){S.job.sal=Math.round(S.job.sal*1.1);return G('老闆加薪 10%！')}S.job.perf=cl(S.job.perf-10);return B('老闆不太開心，你的績效評價下滑。')})]})};
function cnYearEnd(){
 cnInit();trYear();lifeYear();
 if(S.inv){S.inv.yrs++;S.inv.v=Math.round(S.inv.v*(1+.02+nrm()*.08))}
 if(S.cn==='TW')return;
 const c=CNS[S.cn],ab=S.ab;if(!ab){S.cn='TW';return}
 ab.yrs++;
 S.lang[S.cn]=Math.min(100,(S.lang[S.cn]||0)+(c.lgn==='en'||c.lgn==='sg'?6:18));
 if(S.house)S.money+=Math.round(S.house.value*.02); // 台灣房屋出租，租金報酬率約 2%（估計）
 if(S.jail>0&&ab.visa!=='cit'){goHome('你因入獄被遣返。');return}
 const emp=locJob();
 if(emp&&['work','psw','whv','ipr'].includes(ab.visa))ab.wk++;
 ab.nojob=emp?0:ab.nojob+1;
 if(['pr','cit','ipr'].includes(ab.visa)){
  if(!emp&&S.age<65&&ab.nu<cxOf(S.cn).uy){ab.nu++;const b=Math.round(cxOf(S.cn).ue*wTW(S.cn));S.money+=b;log(`你領了${c.n}的失業給付 ${money(b)}。`)}
  if(emp)ab.nu=0;
  if(S.age>=65&&ab.yrs>=10){S.money+=Math.round(cxOf(S.cn).pn*wTW(S.cn))}
  if(ab.visa==='ipr'){ab.left--;if(ab.left<=0){ab.visa='pr';log(`你的投資居留轉為${c.n}永久居留。`,'good')}}
 }else{
  if(S.age>=65){goHome('簽證不能養老，你決定回台灣。');return}
  if(ab.visa==='study'&&!S.school){ab.visa='psw';ab.left=1;log(`畢業了，你取得 1 年的${c.n}求職簽證。`)}
  else if(ab.visa==='study'){}
  else{
   if(ab.visa==='psw'&&emp){ab.visa='work';ab.left=3;log(`你在${c.n}找到工作，轉為 3 年工作簽證。`,'good')}
   else{
    ab.left--;
    if(ab.left<=0){
     if(ab.visa==='whv'){if(emp&&chance(.4+S.smarts/250)){ab.visa='work';ab.left=3;log(`雇主願意擔保，你轉為${c.n}工作簽證。`,'good')}else{goHome('打工度假簽證到期。');return}}
     else if(ab.visa==='psw'){goHome('求職簽證到期仍未找到工作。');return}
     else if(ab.visa==='work'){if(emp&&chance(.92)){ab.left=3;log('工作簽證續簽成功。')}else{goHome('工作簽證無法續簽。');return}}
    }
   }
   if(ab.visa==='work'&&ab.nojob>=2){goHome('失業超過一年，工作簽證失效。');return}
  }
 }
 if(S.age>=18&&chance(.3)){
  const r=Math.random();
  if(r<.35)queue.push(E_HOME);
  else if(r<.6&&(S.lang[S.cn]||0)<40)queue.push(E_DISC);
  else if(r<.85&&emp)queue.push(E_HH);
  else {chg('happy',R(-3,5));log(`你在${c.n}的日子${S.happy>50?'過得不錯':'有點孤單'}。`)}
 }
}
// ---- 簽證條件 ----
function workChance(k){
 const u=S.cs[k].u,l=S.lang[k]!=null?S.lang[k]:langInit(k),c=CNS[k];
 return Math.max(.05,Math.min(.85,.2+S.smarts/200+(S.edu-4)*.08+(S.job&&!S.job.founder&&S.job.years>=3?.12:0)+(.04-u)*2+((c.lgn==='ja'||c.lgn==='ko'||c.lgn==='de')?-.1:0)));
}
function tuitTW(k){return Math.round(CNS[k].tu*fxr(k))}
function invReq(k){return Math.round(CNS[k].inv*fxr(k))}
function visaBad(k,r){
 const c=CNS[k];
 if(S.age<18)return '需年滿 18 歲';
 if(S.jail)return '服刑中';
 if(S.school&&r!=='study')return '就學中';
 if(r==='whv'){if(!c.whv)return '台灣與該國無打工度假協議';if(S.age<c.whv[0]||S.age>c.whv[1])return `限 ${c.whv[0]}–${c.whv[1]} 歲`;if(S.money<150000)return '需備妥 NT$150,000'}
 if(r==='work'){if(S.edu<4)return '需大學學歷';if(S.money<50000)return '需 NT$50,000 申請與搬家費'}
 if(r==='study'){if(S.edu<4||S.edu>5)return '需大學或碩士學歷（未取得博士）';if(S.money<tuitTW(k)+Math.round(.6*wTW(k)))return '資金不足（學費＋一年生活費）'}
 if(r==='invest'){if(!c.inv)return '該國未提供投資移民（遊戲簡化）';if(S.money<invReq(k)+100000)return '資金不足'}
 return '';
}
function moveTo(k,r){
 cnInit();const c=CNS[k],bad=visaBad(k,r);
 if(bad)return B(bad);
 const key='mv'+k+r;if(S.acts[key])return B('今年已申請過，明年再試。');S.acts[key]=1;
 if(r==='work'){
  const p=workChance(k);
  if(!chance(p)){S.money-=10000;return B(`${c.n}工作簽證申請被拒（成功率約 ${Math.round(p*100)}%），損失申請費 NT$10,000。`)}
 }
 const cost={whv:60000,work:50000,study:60000,invest:100000}[r];S.money-=cost;
 if(S.job&&!S.job.founder)S.job=null;
 S.cn=k;S.ab={cn:k,visa:r,left:0,yrs:0,wk:0,nojob:0,nu:0};
 if(S.lang[k]==null)S.lang[k]=langInit(k);
 let m=`你移居${c.f}${c.n}（${{whv:'打工度假',work:'工作簽證',study:'留學',invest:'投資移民'}[r]}），搬遷費用 ${money(cost)}。`;
 if(r==='whv'){S.ab.left=c.whv[2]}
 else if(r==='work'){S.ab.left=3;
  const pool=JOBS.filter(j=>S.edu>=j.edu&&j.edu>=Math.max(3,S.edu-1)&&!PUB.test(j.t)&&!LIC.test(j.t)&&!j.var&&S.smarts>=j.sm-10&&(!j.lk||S.looks>=j.lk-15));
  if(pool.length){const j=pick(pool);S.job=hireJob(j);S.job.cn=k;m+=`雇主擔保你擔任「${j.t}」，年薪 ${money(S.job.sal)}。`}
 }
 else if(r==='study'){const t=tuitTW(k);if(S.edu===4)enroll('碩士',2,t,S.prestige);else enroll('博士',4,Math.round(t*.3),S.prestige);S.ab.left=0;m+=`學費每年 ${money(S.tuition)}。`}
 else if(r==='invest'){const q=invReq(k);S.money-=q;S.inv={cn:k,v:CNS[k].inv,yrs:0};
  if(k==='SG'){S.ab.visa='pr';m+='投資 S$10,000,000（遊戲估算門檻），取得永久居留。'}else{S.ab.visa='ipr';S.ab.left=2;m+='投資 US$800,000（遊戲估算門檻），2 年後轉永久居留。'}}
 chg('happy',R(-2,6));log(m,'good');return G(m);
}
// ---- UI ----
function cnHTML(sub){
 cnInit();
 let h='<h3>🌏 移民與匯率</h3>';
 if(sub==='fx')return h+fxHTML();
 if(sub&&CNS[sub]&&sub!=='TW')return cnPage(sub);
 const here=CNS[S.cn];
 h+=`<p>目前所在：${here.f} ${here.n}${S.cn==='TW'?'（預設）':''}</p>`;
 if(S.cn!=='TW'){
  const ab=S.ab,vn={whv:'打工度假簽證',work:'工作簽證',study:'留學簽證',psw:'求職簽證',pr:'永久居留',ipr:'投資居留（待轉永居）',cit:'公民'}[ab.visa];
  h+=`<div class="item"><b>${vn}</b>${ab.left>0&&ab.visa!=='pr'?`（剩 ${ab.left} 年）`:''}<br>旅居 ${ab.yrs} 年 ・ 工作年資 ${ab.wk} 年 ・ ${LGN[here.lgn]}程度 ${S.lang[S.cn]||0}%<br>當地失業率 ${pct(S.cs[S.cn].u)} ・ 經濟成長 ${pct(S.cs[S.cn].g)}<br>生活費 ${money(livingCost())}／年（當地平均年薪的 60%）</div>`;
  h+=`<button class="btn" data-a="cn:lang">上語言課<small>NT$30,000，語言 +12%</small></button>`;
  const okp=ab.wk>=here.pr&&((S.lang[S.cn]||0)>=60||here.lgn==='en'||here.lgn==='sg');
  if(!['pr','cit','ipr'].includes(ab.visa))h+=`<button class="btn" data-a="cn:pr" ${okp?'':'disabled'}>申請永久居留<small>需合法工作 ${here.pr} 年（已 ${ab.wk}）${here.lgn==='en'||here.lgn==='sg'?'':'、語言 60%+'}；簡化條件、費用 NT$30,000</small></button>`;
  const okc=ab.visa==='pr'&&ab.yrs>=here.cit&&((S.lang[S.cn]||0)>=60||here.lgn==='en'||here.lgn==='sg');
  if(ab.visa==='pr')h+=`<button class="btn" data-a="cn:cit" ${okc?'':'disabled'}>歸化為公民<small>需旅居滿 ${here.cit} 年（已 ${ab.yrs}）；簡化條件</small></button>`;
  if(S.inv&&S.inv.yrs>=5)h+=`<button class="btn" data-a="cn:inv">取回投資款<small>${fmtL(S.inv.cn,S.inv.v)}（約 ${money(S.inv.v*S.fx[S.inv.cn]*.98)}）</small></button>`;
  h+=`<button class="btn" data-a="cn:home">回台灣</button>`;
 }
 h+=`<div class="sec">匯率看板（1 單位外幣 = NT$）</div><table class="rt"><tr><th>國家</th><th>匯率</th><th>年變動</th><th>持有</th></tr>`+
  CNK.map(k=>{const d=S.fx[k]/S.fxp[k]-1,hv=S.fxh[k]||0;return `<tr><td>${CNS[k].f}${CNS[k].sym}</td><td>${S.fx[k].toFixed(S.fx[k]<1?4:2)}</td><td class="${d<0?'neg':''}">${d>=0?'+':''}${(d*100).toFixed(1)}%</td><td>${hv?fmtL(k,hv):'—'}</td></tr>`}).join('')+`</table>`;
 h+=`<button class="btn" data-a="cn:sub:fx">💱 外匯交易<small>買賣外幣、賺匯差與利差（價差 0.5%）</small></button>`;
 h+=`<div class="sec">想移民去哪？（點選看官方統計與簽證）</div>`+CNK.map(k=>{const c=CNS[k],s=S.cs[k];return `<button class="btn" data-a="cn:sub:${k}" ${k===S.cn?'disabled':''}>${c.f} ${c.n}<small>平均年薪 ${money(wTW(k))} ・ 失業 ${pct(s.u)} ・ 成長 ${pct(s.g)}</small></button>`}).join('');
 h+=`<p class="sub" style="line-height:1.6">說明：各國數字為其統計機關近年公布值的約略值（非即時）；美元匯率參考央行 2026/11 收盤約 32.9，其餘匯率為估計；匯率以均值回歸＋隨機波動模擬，並有 4% 年機率的全球避險年。簽證、永居、歸化條件為遊戲簡化版。在國外薪資與生活費都以當地行情計算；你留在台灣的公司仍會經營，但不模擬跨境稅務。</p>`;
 return h;
}
function cnPage(k){
 const c=CNS[k],s=S.cs[k],fx=fxr(k);
 let h=`<h3>${c.f} ${c.n}</h3><div class="item">平均年薪 ${fmtL(k,c.w)}（約 ${money(wTW(k))}；台灣 ${money(761000)}）<br>失業率 ${pct(s.u)} ・ 經濟成長 ${pct(s.g)} ・ 通膨 ${pct(s.pi)}<br>有效稅負＋社保約 ${pct(c.tax)}（台灣約 9%）<br>估算年生活費 ${money(.6*wTW(k))}<br>匯率 ${c.sym}1 = NT$${fx.toFixed(fx<1?4:2)}<br><small>資料：${c.src}（約略值）</small></div>`;
 const R4=[
  ['whv',c.whv?`打工度假（${c.whv[2]} 年，${c.whv[0]}–${c.whv[1]} 歲）`:'打工度假',c.whv?'可做高中職以下職缺；備妥 NT$150,000，費用 NT$60,000':'無協議'],
  ['work','工作簽證（3 年可續）',`需大學學歷；估計成功率約 ${Math.round(workChance(k)*100)}%；費用 NT$50,000`],
  ['study',`留學（${S.edu>=5?'博士 4 年':'碩士 2 年'}）`,`學費約 ${money(tuitTW(k))}／年；畢業後 1 年求職簽證`],
  ['invest','投資移民',c.inv?`最低投資約 ${fmtL(k,c.inv)}（遊戲估算）；${k==='SG'?'立即永居':'2 年後永居'}`:'此國無（簡化）']];
 h+='<div class="sec">移居途徑</div>'+R4.map(([r,n,d])=>{const bad=visaBad(k,r);return `<button class="btn" data-a="cn:mv:${k}:${r}" ${bad?'disabled':''}>${n}<small>${d}${bad?' ・'+bad:''}</small></button>`}).join('');
 return h+`<button class="btn" data-a="cn:sub:">← 返回</button>`;
}
function fxHTML(){
 let h='<p class="sub">買進外幣＝把新台幣換成外幣存款（賺匯差＋當地存款利率與通膨的實質利差）；買賣各有 0.5% 價差。</p>';
 h+=CNK.map(k=>{const c=CNS[k],hv=S.fxh[k]||0,fx=S.fx[k];return `<div class="item"><b>${c.f} ${c.sym}</b>　1 = NT$${fx.toFixed(fx<1?4:2)}<br>持有 ${hv?fmtL(k,hv)+'（約 '+money(hv*fx)+'）':'無'}</div>
 <button class="btn" data-a="cn:fxb:${k}:100000" ${S.money<100000?'disabled':''}>買進 NT$100,000</button>
 <button class="btn" data-a="cn:fxb:${k}:1000000" ${S.money<1000000?'disabled':''}>買進 NT$1,000,000</button>
 ${hv?`<button class="btn" data-a="cn:fxs:${k}">全部賣出</button>`:''}`}).join('');
 return h+`<button class="btn" data-a="cn:sub:">← 返回</button>`;
}
function cnHandle(x,y,z){
 cnInit();
 if(x==='sub'){view.cnsub=y||null;return null}
 if(x==='mv'){const r=moveTo(y,z);if(r[1]==='good')view.cnsub=null;return r}
 if(x==='lang'){if(S.cn==='TW'||S.money<30000)return B('無法上課。');S.money-=30000;S.lang[S.cn]=Math.min(100,(S.lang[S.cn]||0)+12);return G('語言課讓你進步了。')}
 if(x==='home'){if(S.cn==='TW')return N('你已在台灣。');goHome('');return N('你回到台灣了。')}
 if(x==='pr'){const c=CNS[S.cn],ab=S.ab;if(!ab||ab.wk<c.pr||S.money<30000)return B('條件不足。');S.money-=30000;if(chance(.8)){ab.visa='pr';ab.left=0;log(`你取得${c.n}永久居留！`,'good');return G('永久居留核准！')}return B('申請被退件，花掉 NT$30,000。')}
 if(x==='cit'){const c=CNS[S.cn],ab=S.ab;if(!ab||ab.visa!=='pr'||ab.yrs<c.cit)return B('條件不足。');ab.visa='cit';log(`你歸化成為${c.n}公民。`,'good');chg('happy',8);return G('你成為公民了！')}
 if(x==='inv'){if(!S.inv||S.inv.yrs<5)return B('尚不能取回。');const v=Math.round(S.inv.v*S.fx[S.inv.cn]*.98);S.money+=v;S.inv=null;return G(`取回投資款 ${money(v)}。`)}
 if(x==='fxb'){const t=+z;if(S.money<t)return B('現金不足。');S.money-=t;S.fxh[y]=(S.fxh[y]||0)+t*.995/S.fx[y];return G(`買進 ${fmtL(y,t*.995/S.fx[y])}。`)}
 if(x==='fxs'){const hv=S.fxh[y]||0;const v=Math.round(hv*S.fx[y]*.995);S.money+=v;delete S.fxh[y];return G(`賣出外幣，取得 ${money(v)}。`)}
 return null;
}
