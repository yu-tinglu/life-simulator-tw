/* ---- 世界頁面、旅遊、遊學、留學與在地就讀、地區事件（p32c）---- */
Object.assign(WD,{
 JP:{k:'JP',n:'日本',reg:'EA',gdp:36.1,le:85,lg:'ja',s:5,e:4,att:'東京與京都',dish:'壽司'},KR:{k:'KR',n:'南韓',reg:'EA',gdp:36.4,le:85,lg:'ko',s:4,e:4,att:'景福宮',dish:'烤肉'},
 SG:{k:'SG',n:'新加坡',reg:'SE',gdp:99.4,le:84,lg:'sg',s:5,e:5,att:'濱海灣',dish:'海南雞飯'},US:{k:'US',n:'美國',reg:'NA',gdp:90.3,le:80,lg:'en',s:2,e:5,att:'大峽谷',dish:'漢堡'},
 CA:{k:'CA',n:'加拿大',reg:'NA',gdp:55.8,le:83,lg:'en',s:5,e:5,att:'洛磯山脈',dish:'楓糖鬆餅'},AU:{k:'AU',n:'澳洲',reg:'OC',gdp:66.4,le:84,lg:'en',s:5,e:4,att:'大堡礁',dish:'肉派'},
 GB:{k:'GB',n:'英國',reg:'EW',gdp:57.7,le:82,lg:'en',s:4,e:5,att:'大笨鐘',dish:'炸魚薯條'},DE:{k:'DE',n:'德國',reg:'EW',gdp:61.3,le:82,lg:'de',s:5,e:5,att:'布蘭登堡門',dish:'德式香腸'}});
REGN.NA='北美洲';
const REGO=['EA','SE','SA','CS','ME','EW','EE','NA','LA','AF','OC','PI'];
const WALL=Object.keys(WD);
const wFlight=k=>{const w=WD[k];if(!w)return 30000;if(k==='HK'||k==='MO')return 6000;if(k==='CN')return 9000;return {EA:9000,SE:12000,SA:18000,CS:28000,ME:25000,EW:34000,EE:30000,NA:42000,LA:48000,AF:42000,OC:30000,PI:40000}[w.reg]||30000};
const wDaily=k=>{const w=WD[k];return Math.round(Math.max(1500,Math.min(9000,1400+90*(w?w.gdp:30))))};
const _fx32=fxApply;
fxApply=function(k,spec){const a=[];let extra=0;(spec||'').split(' ').forEach(t=>{const r=t.match(/^mw([+-]\d+(?:\.\d+)?)$/);if(r){const c=CNS[k];extra+=Math.round(c.w*(+r[1])/100)}else a.push(t)});
 let m=_fx32(k,a.join(' '));if(extra){S.money+=Math.round(extra*fxr(k));m+=extra}return m};
const _wc32=workChance;
workChance=function(k){let p=_wc32(k);const c=CNS[k];if(WD[k]&&c.wr&&!['en','sg','zh'].includes(c.lgn)&&(S.lang[k]||0)<60)p=Math.max(.05,p-.12);return p};
const famShare=()=>S.fam==='富裕'?1:S.fam==='小康'?.5:0;
const clmp=(v,a,b)=>Math.max(a,Math.min(b,v));
function addForeignFriend(k,kind){
 if(!S.friends||S.friends.length>=14)return null;const f=newFriend(kind||'旅途認識的朋友');const key=wNameKey(k)||XNK[k]||null;
 if(key)f.n=nameOf(key,f.sx);f.o=(WD[k]||{}).n;f.kind=kind||'旅途認識的朋友';S.friends.push(f);return f}
function maybeRomance(k,plat){
 if(S.age<18||S.partner||S.on||!chance(.05))return '';
 const sx=chance(.5)?'男':'女';if(!oriOK(sx))return '';const key=wNameKey(k)||XNK[k]||null,n=key?nameOf(key,sx):fullName(sx);
 S.on={n,sx,cn:k,rel:70,st:2,a:R(0,ARCH.length-1),since:S.age,plat:plat||'旅行途中'};return `你和當地的${n}特別聊得來，互相留了聯絡方式。`}
const noFam=k=>{if(S.age>=18)return '';if(S.fam==='清寒')return '家裡經濟吃緊，沒辦法負擔。';if(S.fam==='小康'&&WD[k].gdp>30)return '家裡負擔不起這麼貴的國家。';return ''};
/* ===== 旅遊 ===== */
function wTrip(k,d){
 wEnsure();const w=WD[k];
 if(S.acts.wtrip)return B('今年已經出遊過了。');if(S.age<3)return B('你還太小。');if(S.cn===k)return B('你已經住在當地了。');if(S.jail>0)return B('服刑中無法出國。');
 const nf=noFam(k);if(nf)return B(nf);
 const minor=S.age<18,cost=minor?0:wFlight(k)+wDaily(k)*d;
 if(cost>S.money)return B(`旅費約 ${money(cost)}，你的錢不夠。`);
 S.money-=cost;S.acts.wtrip=1;const first=!S.trav[k];S.trav[k]=(S.trav[k]||0)+1;
 const long=d>=10;chg('happy',(long?8:4)+(first?2:0));S.stress=cl(S.stress-(long?15:8));fxApply(S.cn||'TW','opn+1');
 if(!['en','sg','zh'].includes(w.lg)||true)S.lang[k]=cl((S.lang[k]!=null?S.lang[k]:langInit(k))+(long?4:2));
 let t=`你${minor?'跟家人':''}到${w.n}旅行 ${d} 天${cost?`，花費約 ${money(cost)}`:''}${first?'（第一次造訪）':''}。`,tone='good';
 const pm=(6-w.s)*.07+(minor?-.04:0),r=Math.random();
 if(r<pm){
  const ev=pick(w.s<=2?['loot','scam','ill','riot']:['scam','ill','delay','lost']);
  if(ev==='loot'){S.money-=Math.round(wDaily(k)*6);chg('health',-4);S.stress=cl(S.stress+10);t+='途中遭到搶劫，受了一點傷，損失不少財物。';tone='bad'}
  else if(ev==='riot'){S.stress=cl(S.stress+14);chg('happy',-5);t+='當地突然發生示威與衝突，行程被打亂，你提早離開。';tone='bad'}
  else if(ev==='scam'){S.money-=Math.round(wDaily(k)*R(1,4));t+='途中被扒手或詐騙，損失了一些錢，但人平安。';tone='bad'}
  else if(ev==='ill'){S.money-=Math.round(wDaily(k)*R(1,3));chg('health',-3);t+='吃壞肚子，在旅館休息了兩天。';tone='bad'}
  else if(ev==='delay'){S.money-=Math.round(wDaily(k)*2);S.stress=cl(S.stress+4);t+='航班取消，多住了兩晚，花了一些錢。';tone='bad'}
  else{S.money-=Math.round(wDaily(k)*3);S.stress=cl(S.stress+5);t+='證件差點遺失，補辦花了不少功夫。';tone='bad'}
 }else{
  const ev=pick(['dish','att','local','fr']);
  if(ev==='dish')t+=`你吃到了道地的「${w.dish}」，驚為天人。`;
  else if(ev==='att')t+=`你參觀了${w.att}，景色讓你留下難忘的印象。`;
  else if(ev==='local')t+='當地人熱情地替你指路，還邀你分享一餐。';
  else{const f=addForeignFriend(k);if(f)t+=`你認識了來自${w.n}的${f.n}，成為朋友。`;else t+='你在旅途中遇到不少有趣的人。'}
  const rm=maybeRomance(k);if(rm)t+=rm;
 }
 log(t,tone);return tone==='good'?G(t):B(t);
}
/* ===== 遊學 ===== */
function wLearn(k,wk){
 wEnsure();const w=WD[k];
 if(S.age<10)return B('需年滿 10 歲。');if(S.acts.wls)return B('今年已經遊學過了。');if(S.cn===k)return B('你已經住在當地了。');
 if(hasJob()&&wk>=12)return B('三個月的遊學需要先離職。');
 const nf=noFam(k);if(nf)return B(nf);
 const minor=S.age<18,cost=minor?0:wFlight(k)+Math.round(wk*(wDaily(k)*7*.9+8000+w.gdp*60));
 if(cost>S.money)return B(`遊學費用約 ${money(cost)}，你的錢不夠。`);
 S.money-=cost;S.acts.wls=1;S.acts.wtrip=1;S.trav[k]=(S.trav[k]||0)+1;
 const gain=Math.round({2:6,4:10,12:22}[wk]*(S.smarts>70?1.2:1));S.lang[k]=cl((S.lang[k]!=null?S.lang[k]:langInit(k))+gain);
 chg('happy',{2:4,4:6,12:9}[wk]);S.stress=cl(S.stress-{2:3,4:5,12:8}[wk]);fxApply(S.cn||'TW',`opn+${wk>=4?2:1}`);if(wk>=4)chg('smarts',1);
 if(hasJob()&&wk>=4)S.job.perf=cl(S.job.perf-3);
 let t=`你到${w.n}遊學 ${wk} 週${cost?`，費用約 ${money(cost)}`:'（由家人負擔）'}，${LGN[w.lg]||'當地語言'}進步了約 ${gain}%。`;
 if(chance(wk>=4?.5:.3)){const f=addForeignFriend(k,'遊學同學');if(f)t+=`你在課堂上認識了來自各國的同學${f.n}。`}
 const rm=maybeRomance(k,'遊學課堂');if(rm)t+=rm;
 log(t,'good');return G(t);
}
/* ===== 在地就讀 ===== */
function wHS(k){
 wEnsure();if(S.age<12||S.age>17)return B('限 12–17 歲的國中與高中階段。');if(!['國中','高中','高職'].includes(S.school))return B('需正在就讀國中或高中。');if(S.ab)return B('你已經在國外。');
 if(famShare()===0)return B('家裡負擔不起留學費用。');
 const cost=Math.round(tuitTW(k)*.9+.5*wTW(k));if(famShare()<1&&cost>900000)return B('每年費用超出家裡能負擔的範圍。');
 S.cn=k;S.ab={cn:k,visa:'study',left:0,yrs:0,wk:0,nojob:0,nu:0,minor:1,fam:1};S.tuition=0;
 S.lang[k]=cl((S.lang[k]!=null?S.lang[k]:langInit(k))+20);[S.mom,S.dad].forEach(p=>{if(p&&p.alive)p.rel=cl(p.rel-4)});S.trav[k]=(S.trav[k]||0)+1;
 chg('happy',R(-3,6));const m=`你前往${WD[k].n}就讀${S.school}（寄宿或國際學校，每年約 ${money(cost)} 由家人負擔）。`;log(m,'good');return G(m);
}
function wUni(k){
 wEnsure();const same=S.cn===k&&S.ab;
 if(S.edu!==3||S.school||S.age<17)return B('需高中（職）畢業且目前沒有在學。');
 if(S.cn!=='TW'&&!same)return B('你目前住在國外，請先回台灣或直接在當地就讀。');
 if(S.acts['wuni'+k])return B('今年已經申請過了。');
 const yrs=(['GB','AU','NZ','IE'].includes(k)||(WD[k]&&WD[k].reg==='EW'))?3:4,t=tuitTW(k),liv=Math.round(.6*wTW(k)),share=famShare();let ownT=Math.round(t*(1-share));
 const need=ownT+Math.round(liv*(1-share))+(same?0:30000);if(S.money<need)return B(`需備妥第一年學費與生活費約 ${money(need)}。`);
 const e=WD[k]?WD[k].e:3,lang=S.lang[k]!=null?S.lang[k]:langInit(k),islang=['en','sg'].includes(CNS[k].lgn);
 const p=clmp(.35+(S.smarts-50)/150+(S.grade-60)/300-(e-3)*.06+(islang||lang>=50?.08:-.15),.08,.92);
 S.acts['wuni'+k]=1;
 if(!chance(p)){S.money-=10000;return B(`${WD[k].n}的大學沒有錄取你（錄取率約 ${Math.round(p*100)}%），損失申請費 NT$10,000。`)}
 if(S.smarts>=80&&S.grade>=70&&chance(.3)){ownT=Math.round(ownT*.4);log('你獲得了獎學金，學費大幅減免。','good')}
 if(!same){S.money-=30000;S.cn=k;S.ab={cn:k,visa:'study',left:0,yrs:0,wk:0,nojob:0,nu:0,minor:0}}
 S.ab.fam=share;S.lang[k]=cl((S.lang[k]!=null?S.lang[k]:langInit(k))+(islang?10:20));S.trav[k]=(S.trav[k]||0)+1;
 enroll('大學',yrs,ownT,e>=5?3:e>=4?2:e>=3?1:0);chg('happy',6);
 const m=`你考上了${WD[k].n}的大學（${yrs} 年），${ownT?`每年學費約 ${money(ownT)}${share?`（家人另負擔 ${Math.round(share*100)}%）`:''}`:'學費由家人負擔'}。`;log(m,'good');return G(m);
}
function wEx(k){
 wEnsure();if(S.school!=='大學')return B('需在就讀大學期間。');if(S.acts.wex)return B('今年已經申請過了。');if(S.cn!==(S.cn&&'TW'))return B('你目前不在台灣。');
 if(S.cn!=='TW')return B('你目前不在台灣。');
 const cost=wFlight(k)+Math.round(.5*wTW(k));if(S.money<cost)return B(`交換一年約需 ${money(cost)}。`);
 S.money-=cost;S.acts.wex=1;S.acts.wtrip=1;S.trav[k]=(S.trav[k]||0)+1;const w=WD[k];
 S.lang[k]=cl((S.lang[k]!=null?S.lang[k]:langInit(k))+25);chg('happy',8);fxApply('TW','opn+2');S.stress=cl(S.stress-4);S.grade=cl(S.grade+2);
 let t=`你到${w.n}當了一年交換學生，費用約 ${money(cost)}，${LGN[w.lg]||'當地語言'}進步很多。`;
 const f=addForeignFriend(k,'交換同學');if(f)t+=`你認識了${f.n}，成為好朋友。`;
 const rm=maybeRomance(k,'交換學生');if(rm)t+=rm;log(t,'good');return G(t);
}
/* E_UNI / E_GRAD / E_PHD：在國外就學時的銜接 */
const _eu32=E_UNI.run;
E_UNI.run=function(){const r=_eu32();
 if(S.ab&&S.ab.visa==='study'&&S.cn!=='TW'){r.c=r.c.map(o=>({l:o.l,f:()=>{goHome('');return o.f()}}));r.c.unshift(ch(`留在${CNS[S.cn].n}念大學`,()=>wUni(S.cn)))}
 return r};
[E_GRAD,E_PHD].forEach(E0=>{const run0=E0.run;E0.run=function(){const r=run0();
 if(S.ab&&S.ab.visa==='study'&&S.cn!=='TW'){r.c=r.c.map((o,i)=>i===0?{l:o.l,f:()=>{const x=o.f();if(S.school&&S.ab){S.tuition=Math.round(tuitTW(S.cn)*(S.school==='博士'?.3:1)*(1-(S.ab.fam||0)))}return x}}:o)}
 return r}});
const _y32=yearly;
yearly=function(){_y32();if(S.ab&&S.ab.visa==='study'&&S.ab.fam&&S.age>=18&&S.age<23&&S.school&&(S.mom.alive||S.dad.alive))S.money+=Math.round(livingCost()*S.ab.fam)};
/* ===== 世界頁面 ===== */
const stars=n=>'★'.repeat(n)+'☆'.repeat(5-n);
function entryNote(k){const w=WD[k];return w.s<=2?'治安或局勢較不穩，出發前請查詢外交部領事事務局的旅遊警示（遊戲簡化）。':w.gdp<5?'簽證與入境規定請以外交部領事事務局公布為準；基礎設施可能較不完善（遊戲簡化）。':'短期旅遊的簽證與入境規定請以外交部領事事務局公布為準（遊戲簡化）。'}
function topList(a,n){const t=a.reduce((s,x)=>s+x[1],0)||1;return a.slice().sort((x,y)=>y[1]-x[1]).slice(0,n).map(x=>`${x[0]} ${Math.round(x[1]/t*100)}%`).join('、')}
function wdHome(){
 wEnsure();const vis=Object.keys(S.trav||{}).length;
 let h=`<h3>世界各國</h3><div class="item"><b>已造訪 ${vis} 個國家／地區</b><div class="sub">目前住在：${CNS[S.cn||'TW'].n}。共收錄 ${WALL.length+1} 個國家／地區（含台灣）；原有 9 國擁有深度內容，其餘國家使用區域通則與概略數據。</div></div>`;
 h+=REGO.map(r=>{const n=WALL.filter(k=>WD[k].reg===r).length;return `<button class="btn" data-a="lf:wd:reg:${r}">${REGN[r]}<small>${n} 國</small></button>`}).join('');
 if(vis)h+=`<div class="sec">去過的地方</div><div class="sub">${esc(Object.keys(S.trav).filter(k=>WD[k]).map(k=>CNS[k].f+' '+WD[k].n+(S.trav[k]>1?'×'+S.trav[k]:'')).join('、'))}</div>`;
 h+=`<div class="sub" style="margin-top:8px">已對照來源：人均GDP（IMF 2025）、平均壽命（聯合國 WPP 2024）、匯率（2026/11/16）、宗教（Pew 2020年資料）、治安分級（全球和平指數 GPI 2024，衡量和平程度而非單純犯罪率）。仍為遊戲估計：族群比例、教育品質、薪資（約為人均GDP×0.55）、學費、簽證、法規與制度（依區域通則簡化）。</div><button class="btn" data-a="back">← 返回</button>`;return h}
function wdReg(r){
 let h=`<h3>${esc(REGN[r])}</h3>`;
 h+=WALL.filter(k=>WD[k].reg===r).sort((a,b)=>WD[a].n.localeCompare(WD[b].n,'zh-Hant')).map(k=>{const w=WD[k],c=CNS[k];return `<button class="btn" data-a="lf:wd:ctry:${k}">${c.f} ${esc(w.n)}${WD[k].gdp&&!c.wr?'・深度內容':''}<small>人均 GDP 約 US$${w.gdp}k・治安 ${stars(w.s)}${S.trav&&S.trav[k]?'・已造訪':''}</small></button>`}).join('');
 return h+`<button class="btn" data-a="lf:wd:up:x">← 返回</button>`}
function wdCtry(k){
 wEnsure();const w=WD[k],c=CNS[k],here=S.cn===k;
 const btn=(a,l,sm,bad)=>`<button class="btn" data-a="${a}" ${bad?'disabled':''}>${l}<small>${sm}${bad?'・'+bad:''}</small></button>`;
 let h=`<h3>${c.f} ${esc(w.n)}</h3><div class="item"><b>基本資料</b><div class="sub">人均 GDP 約 US$${w.gdp}k・平均壽命約 ${w.le} 歲<br>平均年薪 ${fmtL(k,c.w)}（約 ${money(wTW(k))}；台灣 ${money(761000)}）<br>匯率 ${c.sym}1 ≈ NT$${fxr(k).toFixed(fxr(k)<1?4:2)}・語言 ${esc(LGN[w.lg]||w.lg)}${S.lang&&S.lang[k]!=null?`（你的程度 ${S.lang[k]}%）`:''}<br>治安 ${stars(w.s)}・教育品質 ${stars(w.e)}</div></div>`;
 h+=`<div class="item"><b>宗教與族群</b><div class="sub">宗教：${esc(topList(RGD[k]||[],3))}<br>族群：${esc(topList(ETHD[k]||[],3))}</div></div>`;
 h+=`<div class="item"><b>景點與美食</b><div class="sub">${esc(w.att)}、${esc(w.dish)}</div></div><div class="item"><b>入境提醒</b><div class="sub">${esc(entryNote(k))}</div></div>`;
 const T=d=>{const c0=S.age<18?0:wFlight(k)+wDaily(k)*d;return S.age<18?'家人負擔':'約 '+money(c0)};
 h+=`<div class="sec">旅遊</div>`+btn(`lf:wd:t5:${k}`,'短途旅行（5 天）',T(5),here?'你已住在當地':S.acts.wtrip?'今年已出遊':'')+btn(`lf:wd:t14:${k}`,'長途旅行（14 天）',T(14),here?'你已住在當地':S.acts.wtrip?'今年已出遊':'');
 const L=wk=>S.age<18?'家人負擔':'約 '+money(wFlight(k)+Math.round(wk*(wDaily(k)*7*.9+8000+w.gdp*60)));
 h+=`<div class="sec">遊學（語言與文化課程）</div>`+[2,4,12].map(wk=>btn(`lf:wd:ls${wk}:${k}`,`${wk===2?'2 週':wk===4?'1 個月':'3 個月'}遊學`,L(wk),S.age<10?'需年滿 10 歲':S.acts.wls?'今年已遊學':here?'你已住在當地':'')).join('');
 h+=`<div class="sec">留學與在地就讀</div>`;
 const share=famShare();
 h+=btn(`lf:wd:hs:${k}`,'國中・高中小留學','寄宿或國際學校，家人負擔',S.age<12||S.age>17?'限 12–17 歲就學中':S.ab?'你已在國外':share===0?'家裡負擔不起':'');
 h+=btn(`lf:wd:uni:${k}`,'直接去當地念大學',`學費約 ${money(Math.round(tuitTW(k)*(1-share)))}／年（扣除家人負擔）`,S.edu!==3||S.school||S.age<17?'需高中畢業且未在學':'');
 h+=btn(`cn:mv:${k}:study`,S.edu>=5?'博士留學（4 年）':'碩士留學（2 年）',`學費約 ${money(tuitTW(k))}／年`,visaBad(k,'study'));
 h+=btn(`lf:wd:ex:${k}`,'交換學生（一年）','大學在學期間',S.school!=='大學'?'需就讀大學':S.acts.wex?'今年已申請':'');
 h+=`<div class="sec">移居與工作</div>`+['whv','work','invest'].map(r=>{const bad=visaBad(k,r);const nm={whv:'打工度假',work:'工作簽證（3 年可續）',invest:'投資移民'}[r];return btn(`cn:mv:${k}:${r}`,nm,r==='work'?`估計成功率約 ${Math.round(workChance(k)*100)}%`:r==='whv'?'限有協議國家':'此國無投資移民則不可用',bad)}).join('');
 return h+`<button class="btn" data-a="lf:wd:up:x">← 返回</button>`}
function wdHTML(){return view.wdk?wdCtry(view.wdk):view.wdr?wdReg(view.wdr):wdHome()}
const _life32=lifeHTML,_more32=moreHTML,_lfH32=lfHandle;
moreHTML=function(){return _more32().replace('<button class="tile" data-a="lf:health">','<button class="tile" data-a="lf:wd"><b>🌐</b>世界各國<small>旅遊・遊學・留學・移居</small></button><button class="tile" data-a="lf:health">')};
lfHandle=function(x,y,z,u){
 if(x==='wd'){
  if(!y){view.wdr=null;view.wdk=null;return null}
  if(y==='reg'){view.wdr=z;view.wdk=null;return null}
  if(y==='ctry'){view.wdk=z;return null}
  if(y==='up'){if(view.wdk)view.wdk=null;else view.wdr=null;return null}
  if(y==='t5')return wTrip(z,5);if(y==='t14')return wTrip(z,14);
  if(y==='ls2')return wLearn(z,2);if(y==='ls4')return wLearn(z,4);if(y==='ls12')return wLearn(z,12);
  if(y==='hs')return wHS(z);if(y==='uni')return wUni(z);if(y==='ex')return wEx(z);
  return null}
 return _lfH32(x,y,z,u)};
lifeHTML=function(){if(view.lsub==='wd')return wdHTML();return _life32()};
const _ei32=endInfo;
endInfo=function(){const n=Object.keys(S.trav||{}).length;return _ei32()+(n?`<p>造訪過的國家／地區：${n} 個</p>`:'')};
const _as32=applySuccession;
applySuccession=function(r,k){_as32(r,k);S.trav={}};
/* ===== 地區事件 ===== */
const EUC=new Set('FR IT ES PT NL BE LU AT FI SE DK NO IS PL CZ SK HU SI HR EE LV LT GR MT CH LI'.split(' '));
function wOpt(o){const p=o.split('|');return ch(p[0],()=>{const m=fxApply(S.cn,p[1]);const tone={g:G,b:B,n:N}[p[2][0]]||N;return tone(p[2].slice(2)+(m?`（${m>0?'收入':'支出'}約 ${fmtL(S.cn,Math.abs(m))}）`:''))})}
function wEv(id,min,max,w,regs,text,opts,iff){
 E.push({id:'wd_'+id,min,max,w,
  if:()=>{const k=S.cn;if(!k||k==='TW'||!CNS[k]||!CNS[k].wr)return false;const d=WD[k];return (regs==='*'||regs.includes(d.reg))&&(!iff||iff(d,k))},
  run:()=>{const d=WD[S.cn];return {t:typeof text==='function'?text(d):text,c:opts.map(wOpt)}}});
}
wEv('food',16,90,4,'*',d=>`你在${d.n}嘗試當地的招牌美食「${d.dish}」。`,['大快朵頤，還向店家請教做法|h+3 nt+1 mw-0.3|g:你吃得很滿足，也學到了做法。','淺嘗一口，其他還是吃熟悉的|h+1|n:你覺得還需要時間適應。','吃壞肚子，休息幾天|hl-2 mw-0.2|b:你學到了選擇餐廳的經驗。']);
wEv('sight',16,90,3,'*',d=>`週末你去參觀${d.n}的${d.att}。`,['請當地導覽，深入了解歷史|h+3 opn+1 mw-0.4|g:你對這個地方有了新的認識。','自己慢慢逛，拍了很多照片|h+2|g:你留下很美的回憶。','人太多，只是匆匆走過|h+0 st+1|n:你覺得有些可惜。']);
wEv('host',16,80,3,'*',d=>`${d.n}的鄰居邀請你到家作客，準備了家常菜。`,['帶著伴手禮赴約，好好聊聊|nt+3 h+3 ln+3 mw-0.1|g:你被熱情款待，也多了一個朋友。','簡短拜訪後就離開|nt+1 ln+1|n:你覺得有些拘謹。','婉拒邀約|st-1|n:你想一個人休息。']);
wEv('bur',18,70,3,'*',d=>`你在${d.n}辦理證件與居留手續，文件與流程比想像中繁瑣。`,['找當地朋友陪同，慢慢處理|nt+1 ln+3 st+1|g:手續終於辦完，你也學到不少。','花錢請代辦處理|mw-1.5 st-1|n:代辦處理得很順利。','自己跑好幾趟|st+4 ln+2|n:你多跑了幾趟才辦成。'],d=>d.gdp<30);
wEv('corr',20,70,2.5,['AF','LA','SA','CS','EE','ME','SE'],d=>`在${d.n}辦事時，有人暗示要給「紅包」才能加快流程。`,['依慣例給一點小錢，節省時間|mw-0.2 st+1|n:事情很快辦好，但你心裡不太舒服。','拒絕，並按正式流程等待|st+3 h-1|n:你多等了幾週。','向上級單位反映|st+2 nt+1|n:你的投訴被受理，過程很費神。'],d=>d.gdp<15);
wEv('power',18,70,2.5,['AF','SA','SE','LA','CS'],d=>`${d.n}的電力與網路不穩，工作時突然停電。`,['買行動電源與備用網路|mw-0.8 st-1|g:之後停電也不太受影響。','忍耐，等恢復再說|st+3|n:你工作拖延了幾天。','搬到設備更穩定的社區|mw-2 st-2|g:新住處供電穩定，租金也高一些。'],d=>d.gdp<8);
wEv('infl',18,70,3,'*',d=>`${d.n}的物價與匯率波動很大，薪水一個月比一個月不夠花。`,['把一部分存款換成外幣保值|mw-0.3 st-1|g:你保住了部分購買力。','提前採購大量生活必需品|mw-1 st+1|n:你囤了一批米與油。','只能忍耐，縮衣節食|h-3 st+3|b:日子過得很緊。'],(d,k)=>HVS.has(k));
const CLIM={EA:'颱風與豪雨',SE:'颱風與水患',SA:'季風豪雨與洪水',ME:'酷暑熱浪',EW:'熱浪或暴風雪',EE:'嚴寒冬季',NA:'暴風雪與颶風',LA:'颶風或地震',AF:'乾旱或洪災',OC:'森林大火或氣旋',PI:'氣旋與海平面上升',CS:'嚴寒與暴風雪'};
wEv('clim',3,90,3,'*',d=>`${d.n}近期遇到${CLIM[d.reg]||'極端天氣'}，影響了日常生活。`,['提前準備物資，安全度過|mw-0.5 st-1|g:你的準備很充分，平安度過。','受到小災損，修繕花了一些錢|mw-2 st+4|b:損失不大，但很折騰。','暫時避到安全的地方|mw-1 st+2|n:你在朋友家住了幾天。']);
wEv('safe',18,70,3,'*',d=>`${d.n}近來發生了治安事件（搶劫或示威），讓人不太安心。`,['避開危險區域，改變作息|st+2|n:你調整了生活習慣。','加強住所安全措施|mw-1.5 st+1|n:你裝了門鎖與監視器。','考慮搬到更安全的地區|mw-3 st+3|n:你開始找新住處。'],d=>d.s<=2);
wEv('expat',20,70,3,'*',d=>`你在${d.n}加入了外國人社群的聚會，認識來自各國的朋友。`,['固定參加，分享經驗|nt+3 h+3|g:你不再感到孤單。','偶爾參加|nt+1 h+1|n:你換到了不少實用資訊。','比較喜歡獨處|st-1|n:你維持自己的步調。']);
wEv('minor',16,70,2,'*',d=>`你注意到${d.n}不同族群之間在教育、就業與生活機會上有些差距。`,['參加跨族群的社區活動|nt+2 opn+1 h+1|g:你認識了很多不同背景的朋友。','捐款支持相關服務組織|mw-0.4 h+1|g:你覺得盡了一份心力。','保持旁觀||n:你沒有特別的行動。']);
wEv('eu',18,60,3,['EW','EE'],d=>`週末，你搭火車去${d.n}鄰國走走。`,['來一趟兩日小旅行|mw-1.2 h+4 opn+1|g:你喜歡這種輕鬆跨國的生活。','待在家休息|st-2|n:你偷得半日閒。','找朋友一起去|mw-1.5 nt+2 h+4|g:大家笑聲不斷。'],(d,k)=>EUC.has(k));
wEv('dark',18,70,3,['EW','EE'],d=>`${d.n}的冬天白天很短，你感到情緒低落。`,['使用光照燈，早晚固定運動|mw-0.3 hl+1 st-2|g:你的情緒慢慢穩定下來。','規劃去南方曬太陽|mw-1.5 h+4|g:短暫的假期讓你振作許多。','忍耐，等春天來臨|h-4 st+3|b:冬天特別漫長。'],(d,k)=>'NO SE FI IS DK EE LV'.split(' ').includes(k));
wEv('gulf',20,60,3,['ME'],d=>`${d.n}夏季氣溫常超過 40 度，生活多半在室內。`,['調整作息，早晚出門運動|hl+1 st-1|g:你慢慢適應了氣候。','週末去商場與室內遊樂場|mw-0.4 h+2|n:室內活動成了日常。','提前回台灣避暑|mw-1.5 h+3|g:你過了涼爽的夏天。'],(d,k)=>GULF.has(k));
wEv('tax',22,65,2,'*',d=>`${d.n}的報稅季到了，要處理收入與扣除額。`,['請會計師處理|mw-0.5 fin+1|g:申報很順利。','自己研究並申報|fin+1 st+2|n:你花了不少時間，但學到很多。','拖到最後一刻才處理|st+3|b:你差點錯過期限。'],d=>hasJob()&&d.gdp>=15);
wEv('visa',20,65,3,'*',d=>`${d.n}移民局要求你補交文件，確認居留與工作身分。`,['迅速備齊文件並送件|st+1|g:審查順利通過。','請律師協助|mw-2 st-1|n:律師處理得很專業。','拖了幾週才處理|st+4|b:你差點被罰款。'],()=>S.ab&&['work','psw','whv','study'].includes(S.ab.visa));
