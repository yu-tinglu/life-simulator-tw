/* ---- p34b：各國連動——世界事件同時影響多國的景氣、物價、匯率與簽證 ---- */
const REG9={TW:'EA',JP:'EA',KR:'EA',SG:'SE',US:'NA',CA:'NA',AU:'OC',GB:'EW',DE:'EW'};
const regOf=k=>(CNS[k]&&CNS[k].reg)||REG9[k]||'EW';
const ENEX=new Set('SA AE QA KW BH OM IQ IR NG AO LY DZ KZ RU NO BN GQ GA CG TM AZ VE EC CO BR CA'.split(' '));
const SAFEC=new Set('US JP CH'.split(' '));
const NEIGH={EA:['EA','SE'],SE:['SE','EA','SA','OC'],SA:['SA','CS','ME','SE'],CS:['CS','EE','SA','ME'],ME:['ME','AF','EE','SA'],EW:['EW','EE','AF','ME'],EE:['EE','EW','CS','ME'],LA:['LA','NA'],NA:['NA','LA'],AF:['AF','ME','EW'],OC:['OC','PI','SE'],PI:['PI','OC']};
/* 每個世界事件：n 名稱；w 權重；t 說明；f(k,reg)=>{g,pi,fx} 回傳各國影響 */
const WEV=[
 {n:'全球金融風暴',w:2,t:'金融市場動盪，各國景氣同步下滑，資金湧向美元、日圓與瑞士法郎。',tw:-.03,f:(k,r)=>({g:-.03,pi:-.008,fx:SAFEC.has(k)?.06:-.07})},
 {n:'全球傳染病大流行',w:1,t:'疫情蔓延，邊境管制、航班減少，觀光與餐飲受重創，居家辦公興起。',tw:-.012,trav:2,f:(k,r)=>({g:-.04,pi:.004,fx:-.02})},
 {n:'能源價格飆升',w:2,t:'石油與天然氣價格大漲，產油國受惠，能源進口國物價上升、成長放緩。',tw:-.01,f:(k,r)=>ENEX.has(k)?{g:.02,pi:.005,fx:.04}:{g:-.012,pi:.025,fx:-.03}},
 {n:'糧食價格大漲',w:1,t:'穀物與食用油價格飆漲，糧食進口國的民生壓力增加。',tw:-.002,f:(k,r)=>['AF','SA','ME','CS'].includes(r)?{g:-.015,pi:.04,fx:-.05}:{g:-.002,pi:.012,fx:0}},
 {n:'科技與 AI 投資熱潮',w:2,t:'全球企業大舉投資晶片與資料中心，電子供應鏈各國出口暢旺。',tw:.035,f:(k,r)=>(['EA','NA'].includes(r)||['SG','MY','VN','TH','DE','NL'].includes(k))?{g:.014,pi:.002,fx:.02}:{g:.003,pi:0,fx:0}},
 {n:'貿易摩擦升溫',w:2,t:'主要經濟體互加關稅，全球供應鏈重組，出口導向的國家受到衝擊。',tw:-.012,f:(k,r)=>(['EA','SE','NA'].includes(r))?{g:-.012,pi:.006,fx:-.02}:{g:-.004,pi:.003,fx:-.01}},
 {n:'全球降息與資金寬鬆',w:2,t:'主要央行降息，資金回流新興市場，多數貨幣兌美元走強。',tw:.012,f:(k,r)=>({g:.008,pi:.003,fx:k==='US'?-.03:.04})},
 {n:'美元大幅走強',w:2,t:'美國利率偏高，資金回流美元，多數貨幣貶值、進口物價上升。',tw:-.003,f:(k,r)=>k==='US'?{g:.004,pi:0,fx:.07}:{g:-.004,pi:.008,fx:-.06}},
 {n:'歐洲景氣與債務壓力',w:1,t:'歐洲經濟成長趨緩，債務與能源成本問題讓各國預算吃緊。',tw:-.004,f:(k,r)=>r==='EW'||r==='EE'?{g:-.018,pi:.006,fx:-.03}:{g:-.004,pi:.001,fx:-.01}},
 {n:'新興市場債務壓力',w:1,t:'部分新興經濟體外債壓力升高，貨幣劇貶，借貸成本上升。',tw:-.003,f:(k,r)=>['LA','AF','SA','EE','CS','ME'].includes(r)?{g:-.025,pi:.03,fx:-.14}:{g:-.003,pi:.002,fx:-.01}},
 {n:'旅遊業全面復甦',w:1,t:'長假與跨國旅遊暴增，觀光型國家的飯店與航空業人手吃緊。',tw:.006,f:(k,r)=>['SE','EW','PI','LA','ME','AF','OC'].includes(r)?{g:.014,pi:.004,fx:.02}:{g:.004,pi:.001,fx:0}},
 {n:'區域緊張局勢緩和',w:1,t:'多國達成協議，貿易與投資信心回升。',tw:.008,f:(k,r)=>({g:.008,pi:-.003,fx:.02})},
 {n:'極端氣候與糧食減產',w:1,t:'熱浪、乾旱與洪水接連發生，農作物減產，保險與災後重建支出增加。',tw:-.003,f:(k,r)=>['AF','SA','SE','CS','LA'].includes(r)?{g:-.012,pi:.02,fx:-.03}:{g:-.003,pi:.006,fx:-.005}}
];
const WEV_DISC='（遊戲隨機事件，並非對現實的預測。）';
function pickW(){const tot=WEV.reduce((a,x)=>a+x.w,0);let r=Math.random()*tot;for(const x of WEV){r-=x.w;if(r<=0)return x}return WEV[0]}
/* 局部事件：某國動亂或大型天災，鄰近國家受波及 */
function localEv(){
 const war=chance(.55),pool=war?WK.filter(k=>WD[k].s<=2):WK,k=pick(pool.length?pool:WK),d=WD[k];
 const w=war&&WD[k].s<=2;
 return {k,war:w,reg:d.reg,t:w?`${d.n}發生內亂或武裝衝突，鄰近國家邊境吃緊，油價與糧價受到波動。`:`${d.n}發生大型天災，國際社會展開救援。`}
}
function ripple(e,warK){
 const reg=regOf(warK),neigh=NEIGH[reg]||[reg];
 for(const k in CNS){if(k===warK)continue;const s=S.cs[k];if(!s)continue;const rk=regOf(k),near=rk===reg,adj=neigh.includes(rk);
  const dg=near?-.014:adj?-.006:-.002;s.g=Math.max(-.08,Math.min(.08,s.g+dg));s.pi=Math.min(.12,s.pi+(near?.01:.003));s.u=Math.min(.18,s.u-.35*dg)}
}
const _cys34=cnYearStart;
cnYearStart=function(){
 if(typeof wEnsure==='function')wEnsure();
 S.wh=S.wh||[];S.sOvr=S.sOvr||{};
 let e=null,loc=null;
 if(S.age>=0&&chance(.16)){e=pickW()}
 else if(chance(.08)){loc=localEv()}
 if(e){S.gdp=Math.max(-.08,Math.min(.12,S.gdp+(e.tw||0)));S.econ=Math.max(-.07,Math.min(.07,(S.gdp-.035)*.8))}
 _cys34();
 if(e){
  for(const k in CNS){if(k==='TW')continue;const s=S.cs[k];if(!s)continue;const x=e.f(k,regOf(k));
   s.g=Math.max(-.09,Math.min(.1,s.g+x.g));s.pi=Math.max(-.02,Math.min(.15,s.pi+x.pi));s.u=Math.max(.01,Math.min(.2,s.u-.35*x.g));
   if(x.fx&&S.fx[k]!=null){const c=CNS[k],nf=Math.max(c.fx0*.5,Math.min(c.fx0*2,S.fx[k]*Math.exp(x.fx)));if(k===S.cn&&S.job&&!S.job.founder&&S.job.cn===k)S.job.sal=Math.round(S.job.sal*nf/S.fx[k]);S.fx[k]=nf}}
  S.mk=(typeof MKT!=='undefined'&&MKT[e.n])||null;S.irShock=(typeof IRSH!=='undefined'&&IRSH[e.n])||0;S.hshock=(typeof HSH!=='undefined'&&HSH[e.n])||null;
  S.wh.push({y:S.year,n:e.n,t:e.t});if(S.wh.length>14)S.wh.shift();
  if(S.age>=10)log(`世界新聞（${S.year}）：${e.n}。${e.t}${WEV_DISC}`,e.tw<0?'bad':'good');
  // 連動：在受影響國家的朋友
  const hit=(S.friends||[]).filter(f=>f.o&&Math.random()<.3);
  if(hit.length&&e.tw<0&&S.age>=14){const f=hit[0];log(`你在${f.o}的朋友${f.n}傳訊息來，說這波${e.n}讓他的生活受到影響。`,'bad')}
  if(e.trav){S.sOvr.__trav=S.year+e.trav}
 }
 if(loc){
  ripple(loc,loc.k);const c=CNS[loc.k],s=S.cs[loc.k];
  if(s){s.g=Math.max(-.12,s.g-(loc.war?.07:.04));s.pi=Math.min(.2,s.pi+(loc.war?.05:.02));s.u=Math.min(.25,s.u+.03);if(S.fx[loc.k]!=null){const nf=Math.max(c.fx0*.4,S.fx[loc.k]*Math.exp(loc.war?-.2:-.08));if(loc.k===S.cn&&S.job&&S.job.cn===loc.k&&!S.job.founder)S.job.sal=Math.round(S.job.sal*nf/S.fx[loc.k]);S.fx[loc.k]=nf}}
  S.mk=(typeof MKT!=='undefined'&&MKT[loc.war?'區域衝突':'重大天災'])||null;
  const dur=loc.war?R(2,4):1;if(loc.war&&WD[loc.k])S.sOvr[loc.k]=S.year+dur;
  S.wh.push({y:S.year,n:(loc.war?'區域衝突：':'重大天災：')+(WD[loc.k]||{n:loc.k}).n,t:loc.t});if(S.wh.length>14)S.wh.shift();
  if(S.age>=10)log(`世界新聞（${S.year}）：${loc.t}${WEV_DISC}`,'bad');
  const fr=(S.friends||[]).find(f=>f.o===(WD[loc.k]||{}).n);if(fr&&S.age>=14)log(`你在${fr.o}的朋友${fr.n}傳訊息報平安，但很擔心接下來的生活。`,'bad');
  if(S.cn===loc.k&&loc.war&&S.cn!=='TW'){queue.push({run:()=>({t:`${CNS[loc.k].n}局勢惡化，外交部提醒國人撤離。你要怎麼做？`,c:[ch('搭撤僑班機回台灣',()=>{goHome('因當地動亂撤離。');S.stress=cl(S.stress+6);return N('你平安回到台灣，行李只帶得走一部分。')}),ch('留下來，自行承擔風險',()=>{chg('health',-R(2,8));S.stress=cl(S.stress+14);chg('happy',-8);return B('你留在當地，生活物資與安全都讓人緊張。')})]})})}
 }
 // 紅色警示過期清除
 for(const k in S.sOvr)if(k!=='__trav'&&S.sOvr[k]<=S.year)delete S.sOvr[k];
};
/* 旅行限制：局勢動盪或疫情期間 */
function travBlock(k){
 if(S.sOvr&&S.sOvr[k]&&S.sOvr[k]>S.year)return `${WD[k]?WD[k].n:k}目前局勢動盪，外交部發布紅色旅遊警示，暫時無法前往（遊戲簡化，約持續到 ${S.sOvr[k]} 年）。`;
 if(S.sOvr&&S.sOvr.__trav>S.year)return '疫情期間邊境管制，暫時無法出國旅行。';
 return ''}
const _wt34=wTrip;wTrip=function(k,d){const b=travBlock(k);return b?B(b):_wt34(k,d)};
const _wl34=wLearn;wLearn=function(k,w){const b=travBlock(k);return b?B(b):_wl34(k,w)};
const _wh34=wHS;wHS=function(k){const b=travBlock(k);return b?B(b):_wh34(k)};
const _wu34=wUni;wUni=function(k){const b=travBlock(k);return b&&S.cn!==k?B(b):_wu34(k)};
const _we34=wEx;wEx=function(k){const b=travBlock(k);return b?B(b):_we34(k)};
/* 世界頁面：近期世界事件 */
const _wdh34=wdHome;
wdHome=function(){let h=_wdh34();
 const hs=(S.wh||[]).slice(-6).reverse();
 const blk=`<h4 style="margin:12px 0 4px">近期世界事件（各國連動）</h4>`+(hs.length?hs.map(x=>`<div class="item"><b>${x.y} 年・${esc(x.n)}</b><div class="sub">${esc(x.t)}</div></div>`).join(''):'<div class="sub">目前沒有重大世界事件。</div>')+`<div class="sub">世界事件會同時改變多國的景氣、物價、匯率與簽證；你的收入、旅行與在海外的親友都會受到影響。</div>`;
 const i=h.lastIndexOf('<div class="sub" style="margin-top:8px">已對照來源');
 return i>=0?h.slice(0,i)+blk+h.slice(i):h+blk};
