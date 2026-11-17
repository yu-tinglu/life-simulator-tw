/* ---- p35c：房屋系統（城市房價指數、利率連動、貸款、房地合一稅、出租）---- */
const HCITY={tpe:'台北',ntp:'新北',txg:'台中',khh:'高雄／台南',rural:'其他縣市'};
const HL=[
 {n:'台北小套房（舊公寓）',c:'tpe',p:12e6,y:.022},{n:'台北電梯大樓',c:'tpe',p:25e6,y:.021},{n:'台北豪宅',c:'tpe',p:60e6,y:.017,lux:1},
 {n:'新北小套房',c:'ntp',p:9e6,y:.026},{n:'新北電梯大樓',c:'ntp',p:15e6,y:.024},{n:'新北新成屋',c:'ntp',p:20e6,y:.022},{n:'新北豪宅',c:'ntp',p:30e6,y:.018,lux:1},
 {n:'台中電梯大樓',c:'txg',p:12e6,y:.025},{n:'台中新成屋',c:'txg',p:18e6,y:.023},{n:'台中豪宅',c:'txg',p:30e6,y:.018,lux:1},
 {n:'高雄電梯大樓',c:'khh',p:9e6,y:.03},{n:'台南電梯大樓',c:'khh',p:8e6,y:.03},{n:'高雄小套房',c:'khh',p:6e6,y:.032},
 {n:'鄉下透天厝',c:'rural',p:5e6,y:.035}
];
const HSH={'全球金融風暴':{all:-.08},'全球傳染病大流行':{all:-.03},'能源價格飆升':{all:-.02},'科技與 AI 投資熱潮':{tpe:.04,ntp:.03,txg:.04,khh:.02},'全球降息與資金寬鬆':{all:.04},'美元大幅走強':{all:-.01},'貿易摩擦升溫':{all:-.02},'旅遊業全面復甦':{all:.01},'區域緊張局勢緩和':{all:.01}};
const ann=(L,r,n)=>{if(n<=0)return L;if(r<=0)return L/n;return L*r/(1-Math.pow(1+r,-n))};
const hmi=c=>(S.hmi&&S.hmi[c])||1;
function hmEnsure(){if(!S.hmi){S.hmi={tpe:1,ntp:1,txg:1,khh:1,rural:1};S.hg={tpe:0,ntp:0,txg:0,khh:0,rural:0}}if(!S.props)S.props=[]}
/* 內政部住宅價格指數第四季年增率（來源：信義房屋企研室引述內政部統計）；2025 各城市另列 */
const HRN={2021:{all:.0862},2022:{all:.0852},2023:{all:.0681},2024:{all:.1085},2025:{all:-.0362,tpe:-.0004,ntp:-.0161,txg:-.0665,khh:-.0491}};
function hmYear(){
 hmEnsure();const g=S.gdp==null?.035:S.gdp,iD=S.irD||0,sh=S.hshock||{};
 const w=WI(),wg=S.wip?w/S.wip:1.02;S.wip=w;
 const ex={tpe:.004,ntp:.002,txg:.002,khh:0,rural:-.008};
 for(const c in S.hmi){let r=.004+(1-S.hmi[c])*.1+(g-.035)*.8-5*iD+(S.ir!=null&&S.ir>.035?-.02:0)+(ex[c]||0)+(sh.all||0)+(sh[c]||0)+nrm()*.025;
  const yy=S.year||calYear(),RN=HRN[yy];if(RN){const n=RN[c]!=null?RN[c]:RN.all;r=(1+n)/wg-1}
  r=Math.max(-.2,Math.min(.25,r));S.hmi[c]=Math.max(.4,Math.min(3,S.hmi[c]*(1+r)));S.hg[c]=(1+r)*wg-1}
 S.hshock=null;
}
function hvYear(h){hmEnsure();const c=h.c||'ntp';return Math.round(h.value*(1+(S.hg[c]!=null?S.hg[c]:R(-3,6)/100)))}
const mrate=()=>Math.max(.012,(S.ir==null?.02:S.ir)+.0075);
/* 房貸：m={left,rate,yrs,pay,fixed,grace} */
function mkMort(L,yrs,o){o=o||{};const m={left:Math.round(L),rate:o.rate!=null?o.rate:mrate(),yrs,fixed:o.fixed||0,grace:o.grace||0};m.pay=Math.round(m.grace>0?m.left*m.rate:ann(m.left,m.rate,m.yrs));return m}
function mortStep(m){
 if(m.rate==null){return m.pay}
 const r=m.fixed>0?m.rate:mrate();if(m.fixed>0)m.fixed--;else m.rate=r;
 const it=m.left*r;let pay;
 if(m.grace>0){pay=it;m.grace--}else{pay=ann(m.left,r,m.yrs);m.left-=pay-it;m.yrs--}
 m.pay=Math.round(pay);return Math.round(pay);
}
function mortYear(){
 const m=S.mort;if(m.rate==null){S.money-=m.pay;m.left-=m.pay}else{S.money-=mortStep(m)}
 if(m.left<=1||(m.rate!=null&&m.yrs<=0&&m.grace<=0)){S.mort=null;log('房貸全部還清了！','good')}
}
const _y35=yearly;
yearly=function(){
 hmEnsure();_y35();
 if(S.house)S.money-=Math.round(S.house.value*.0045);
 (S.props||[]).slice().forEach(p=>{
  p.value=hvYear(p);
  const occ=p.vac>0?(p.vac--,0):1,rent=Math.round(p.value*p.y*occ);
  S.money+=rent-Math.round(p.value*.011);
  if(p.mort){S.money-=mortStep(p.mort);if(p.mort.left<=1||(p.mort.yrs<=0&&p.mort.grace<=0))p.mort=null}
 });
};
const _cys35c=cnYearStart;
cnYearStart=function(){_cys35c();hmYear()};
/* 購買 */
function hPrice(h){return Math.round(h.p*hmi(h.c)*WI()/1e4)*1e4}
function buyNew(i,mode){
 hmEnsure();const h=HL[i];if(!h)return B('找不到這間房子。');const pr=hPrice(h),fee=Math.round(pr*.015);
 const inv=mode==='i'||mode==='ic'||(S.house&&mode!=='c'&&mode!=='l'&&mode!=='y');
 const cash=mode==='c'||mode==='ic';
 if(!inv&&S.house)return B('你已經有自住的房子，請改買投資用房。');
 if(inv&&!S.house)return B('請先擁有自住房，再買投資用房（遊戲簡化）。');
 let ltv=h.lux?.5:inv?.5:.8,yrs=inv?20:mode==='y'?40:mode==='l30'?30:20,opt={};
 if(mode==='y'){if(!(calYear()>=2023&&S.age>=20&&S.age<=39&&!S.house&&pr<=12.5e6))return B('新青安條件不符（2023 年起、20–39 歲、首購、房價約 1,250 萬以內；遊戲簡化）。');opt={rate:.01775,fixed:5,grace:5}}
 const down=cash?pr:Math.round(pr*(1-ltv));
 if(S.money<down+fee)return B(`需要 ${money(down+fee)}（含頭期款與約 1.5% 的仲介、代書與契稅費用）。`);
 S.money-=down+fee;
 const o={n:h.n,c:h.c,value:pr,bp:pr,since:S.age,y:h.y,self:!inv};
 if(!cash)o.mort=mkMort(pr-down,yrs,opt);
 if(inv){o.vac=0;S.props.push({...o,mort:o.mort||null});}
 else{S.house={n:h.n,c:h.c,value:pr,bp:pr,since:S.age,self:1};S.mort=o.mort||null}
 chg('happy',inv?4:10);const m=`你${inv?'買下投資用的':'買了'}${h.n}，成交價 ${money(pr)}${cash?'（全額現金）':`，貸款 ${money(pr-down)}（利率約 ${(o.mort.rate*100).toFixed(2)}%，${yrs} 年）`}。`;log(m,'good');return G(m)
}
/* 賣出（含房地合一稅，簡化） */
function sellTax(bp,val,hold,self){
 const fee=Math.round(val*.04),gain=Math.max(0,val-bp-fee);let rate=hold<2?.45:hold<5?.35:hold<10?.2:.15,tax;
 if(self&&hold>=6){tax=Math.round(Math.max(0,gain-4e6)*.1)}else tax=Math.round(gain*rate);
 return {fee,gain,rate,tax}
}
function sellNew(idx){
 hmEnsure();const isMain=idx==='main',h=isMain?S.house:S.props[+idx];if(!h)return B('找不到房子。');
 const m=isMain?S.mort:h.mort,bp=h.bp||h.value*.8,hold=S.age-(h.since!=null?h.since:S.age-8),t=sellTax(bp,h.value,hold,isMain||h.self);
 const net=h.value-t.fee-t.tax-(m?m.left:0);S.money+=net;
 if(isMain){S.house=null;S.mort=null}else S.props.splice(+idx,1);
 const msg=`你賣掉了${h.n}，成交價 ${money(h.value)}，仲介費 ${money(t.fee)}、房地合一稅約 ${money(t.tax)}，還清貸款後淨得 ${money(net)}。`;log(msg,net>0?'good':'bad');return N(msg)
}
sellHouse=function(){return sellNew('main')};
const _bh35=buyHouse;
buyHouse=function(i,mode){const r=_bh35(i,mode);if(S.house&&!S.house.bp){const h=HOUSES[i];S.house.bp=h.p;S.house.since=S.age;S.house.c=/台北/.test(h.n)||/雙北/.test(h.n)?'tpe':/新北/.test(h.n)?'ntp':/台中/.test(h.n)?'txg':/高雄|台南|南部/.test(h.n)?'khh':'rural';if(S.mort&&S.mort.rate==null){S.mort=mkMort(S.mort.left,20)}}return r};
/* 頁面 */
function houseBrief(){
 hmEnsure();let h='<div class="sec">房屋</div>';
 if(S.house)h+=`<div class="item"><b>${S.house.n}</b>　市值 ${money(S.house.value)}${S.mort?`<br>剩餘房貸 ${money(S.mort.left)}（每年約 ${money(S.mort.pay)}）`:''}</div>`;
 (S.props||[]).forEach(p=>{h+=`<div class="item"><b>${p.n}（出租）</b>　市值 ${money(p.value)}${p.mort?`・貸款 ${money(p.mort.left)}`:''}</div>`});
 return h+`<button class="btn" data-a="lf:hs">房屋與房市<small>${S.house?'行情、投資房、賣房、提前還款':'行情與買房（含新青安、貸款成數）'}</small></button>`;
}
function hsHTML(){
 hmEnsure();const y=calYear();let h='<h3>房屋與房市</h3>';
 h+=`<p class="sub">政策利率約 ${((S.ir==null?.02:S.ir)*100).toFixed(2)}%，房貸利率約 ${(mrate()*100).toFixed(2)}%。實質房價指數（出生時 = 1.00，已扣除物價與薪資成長）依景氣、利率與世界事件變動；租金報酬率、稅費與各縣市房價為遊戲估算，並非內政部實價登錄資料；房地合一稅依個人持有年限簡化（2 年內 45%、2–5 年 35%、5–10 年 20%、10 年以上 15%；自住滿 6 年可享免稅額優惠）。</p>`;
 h+='<table class="rt"><tr class="h"><td>城市</td><td>指數</td><td>去年</td></tr>'+Object.keys(HCITY).map(c=>`<tr><td>${HCITY[c]}</td><td>${hmi(c).toFixed(2)}</td><td>${S.hg&&S.hg[c]!=null?(S.hg[c]*100).toFixed(1)+'%':'—'}</td></tr>`).join('')+'</table>';
 if(S.house){const m=S.mort,t=sellTax(S.house.bp||S.house.value*.8,S.house.value,S.age-(S.house.since!=null?S.house.since:S.age-8),1);
  h+=`<div class="sec">自住：${S.house.n}</div><div class="item">市值 ${money(S.house.value)}${S.house.bp?`（買入 ${money(S.house.bp)}）`:''}${m?`<br>貸款餘額 ${money(m.left)}・利率 ${m.rate!=null?(m.rate*100).toFixed(2)+'%':'—'}・剩餘 ${m.yrs!=null?m.yrs:'—'} 年・每年約 ${money(m.pay)}`:'<br>無貸款'}<br>若現在賣出：稅費約 ${money(t.fee+t.tax)}</div>`;
  h+=`<button class="btn" data-a="lf:hs:sell:main">賣掉自住房<small>仲介費 4%＋房地合一稅</small></button>`;
  if(m){h+=`<button class="btn" data-a="lf:hs:prepay:main" ${S.money<1e6?'disabled':''}>提前還款 100 萬<small>降低利息</small></button>`;
   if(m.rate!=null&&m.rate>mrate()+.003)h+=`<button class="btn" data-a="lf:hs:refi" ${S.money<30000?'disabled':''}>轉貸降息<small>手續費約 NT$30,000，利率降到 ${(mrate()*100).toFixed(2)}%</small></button>`}
 }
 (S.props||[]).forEach((p,i)=>{const t=sellTax(p.bp,p.value,S.age-p.since,0);h+=`<div class="sec">投資房：${p.n}</div><div class="item">市值 ${money(p.value)}（買入 ${money(p.bp)}）・年租金約 ${money(p.value*p.y)}${p.vac>0?'（空租中）':''}${p.mort?`<br>貸款餘額 ${money(p.mort.left)}・利率 ${(p.mort.rate*100).toFixed(2)}%`:''}<br>若現在賣出：稅費約 ${money(t.fee+t.tax)}</div><button class="btn" data-a="lf:hs:sell:${i}">賣掉投資房</button>`});
 h+=`<div class="sec">${S.house?'購買投資用房':'購買自住房'}</div>`;
 if(!S.house&&calYear()>=2023&&S.age>=20&&S.age<=39)h+='<p class="sub">新青安：2023 年起，20–39 歲首購、房價約 1,250 萬以內，可申請低利、長年期並含寬限期（細節為遊戲簡化）。</p>';
 HL.forEach((x,i)=>{const pr=hPrice(x),ltv=x.lux||S.house?.5:.8,d=Math.round(pr*(1-ltv))+Math.round(pr*.015);
  if(!S.house){h+=`<div class="item"><b>${x.n}</b>　${money(pr)}（頭期約 ${money(d)}）</div><div class="seg"><button data-a="lf:hs:buy:${i}_c" ${S.money<pr*1.015?'disabled':''}>現金</button><button data-a="lf:hs:buy:${i}_l" ${S.money<d?'disabled':''}>貸款20年</button>${(y>=2023&&S.age<=39&&pr<=12.5e6)?`<button data-a="lf:hs:buy:${i}_y" ${S.money<d?'disabled':''}>新青安</button>`:''}</div>`}
  else{h+=`<div class="item"><b>${x.n}</b>　${money(pr)}（頭期約 ${money(d)}・租金報酬約 ${(x.y*100).toFixed(1)}%）</div><div class="seg"><button data-a="lf:hs:buy:${i}_i" ${S.money<d?'disabled':''}>貸款買入</button><button data-a="lf:hs:buy:${i}_ic" ${S.money<pr*1.015?'disabled':''}>現金買入</button></div>`}});
 return h+'<button class="btn" data-a="back">← 返回</button>';
}
const _l35=lifeHTML,_m35=moreHTML,_lf35=lfHandle;
moreHTML=function(){return _m35().replace('<button class="tile" data-a="lf:health">','<button class="tile" data-a="lf:hs"><b>屋</b>房屋與房市<small>行情・買賣・貸款・出租</small></button><button class="tile" data-a="lf:health">')};
lifeHTML=function(){if(view.lsub==='hs')return hsHTML();return _l35()};
lfHandle=function(x,y,z,u){
 if(x==='hs'){
  if(!y)return null;
  if(y==='buy'){const [i,m]=String(z).split('_');return buyNew(+i,m)}
  if(y==='sell')return sellNew(z);
  if(y==='prepay'){if(!S.mort)return B('沒有房貸。');const pa=Math.min(S.mort.left,Math.max(1e5,view.ppAmt||1e6));if(S.money<pa)return B('現金不足。');S.money-=pa;S.mort.left=Math.max(0,S.mort.left-pa);if(S.mort.left<=1){S.mort=null;return G('房貸全部還清了！')}if(S.mort.rate!=null)S.mort.pay=Math.round(ann(S.mort.left,S.mort.rate,S.mort.yrs));return G('提前還款 '+money(pa)+'，未來利息減少。')}
  if(y==='refi'){if(!S.mort||S.mort.rate==null)return B('目前無法轉貸。');if(S.money<30000)return B('現金不足。');S.money-=30000;S.mort.rate=mrate();S.mort.fixed=0;return G('你轉貸成功，利率降低。')}
  return null}
 return _lf35(x,y,z,u)};
/* 房屋事件 */
function hEv(id,min,max,w,iff,text,opts){E.push({id:'hm_'+id,min,max,w,if:()=>(S.house||(S.props&&S.props.length))&&(!iff||iff()),run:()=>({t:typeof text==='function'?text():text,c:opts.map(o=>ch(o[0],o[1]))})})}
hEv('quake',22,90,1.2,null,'地震後你的房子牆面出現裂縫，管委會請結構技師評估。',[
 ['請技師鑑定並全面補強',()=>{const t=S.house||S.props[0],l=Math.round(t.value*R(2,6)/100);S.money-=l;S.stress=cl(S.stress+4);return N(`補強與修繕花了 ${money(l)}，住得比較安心。`)}],
 ['做簡單修補就好',()=>{const t=S.house||S.props[0];t.value=Math.round(t.value*.97);S.money-=R(30,80)*1000;return B('你只做了表面修補，房子的市值被打了折扣。')}],
 ['申請地震險理賠',()=>{if(S.flags.ins||chance(.35)){const b=R(100,400)*1000;S.money+=b;return G(`保險理賠 ${money(b)}。`)}return N('你沒有投保地震險，只能自己負擔。')}]]);
hEv('tenant',24,75,2.5,()=>S.props&&S.props.length,'你的出租房租客反映熱水器壞了，而且已經欠租兩個月。',[
 ['協調修繕，也和租客談分期補繳',()=>{const p=S.props[0];S.money-=R(10,30)*1000;S.stress=cl(S.stress+3);return N('租客補繳了租金，你也完成了修繕。')}],
 ['依租約催告並解約換新租客',()=>{const p=S.props[0];p.vac=1;S.stress=cl(S.stress+5);S.money-=R(10,40)*1000;return N('你處理完糾紛，房子空了一年才重新出租。')}],
 ['不處理，等租約到期',()=>{S.stress=cl(S.stress+2);return B('租客一直拖欠，租金損失不少。')}]]);
hEv('dues',25,85,1.5,()=>!!S.house,'社區管理委員會決議外牆與電梯大修，每戶分攤一筆費用。',[
 ['同意並依比例分攤',()=>{const l=Math.round(S.house.value*R(1,3)/100);S.money-=l;S.house.value=Math.round(S.house.value*1.01);return N(`你分攤了 ${money(l)}，社區的品質提升。`)}],
 ['在會議上要求分期與公開報價',()=>{const l=Math.round(S.house.value*R(1,2)/100);S.money-=l;S.stress=cl(S.stress+2);return N(`報價透明後分期攤付，你負擔 ${money(l)}。`)}],
 ['拒繳，被管委會催收',()=>{S.stress=cl(S.stress+5);chg('happy',-3);return B('你與鄰居鬧得不愉快，之後還是得補繳。')}]]);
hEv('cool',25,75,1.5,()=>S.ir!=null&&S.ir>=.03,'房市降溫，央行與政府推出新一輪信用管制，貸款成數降低、利率上升，議價空間變大。',[
 ['趁機觀望，保留資金',()=>{S.stress=cl(S.stress-1);return N('你按兵不動，等待更好的進場時機。')}],
 ['把握機會議價買進',()=>{if(S.house)return N('你已有自住房，維持原狀。');return N('你到處看房，發現屋主願意降價，可到房屋頁面購買。')}],
 ['出清手上的投資房',()=>{if(!(S.props&&S.props.length))return N('你沒有投資房。');return N('你考慮出售投資房，可到房屋頁面操作。')}]]);
hEv('oldhouse',30,85,1,()=>S.house&&S.age-(S.house.since||0)>=15,'老房子的管線與牆壁出現老化問題，需要大規模整修。',[
 ['整修翻新',()=>{const l=Math.round(S.house.value*R(3,6)/100);S.money-=l;S.house.value=Math.round(S.house.value*1.04);return N(`整修花了 ${money(l)}，房屋市值略升。`)}],
 ['局部修理',()=>{S.money-=R(40,90)*1000;S.stress=cl(S.stress+2);return N('你只做局部維修。')}]]);
