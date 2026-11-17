/* ===== 創業 UI ===== */
const k1=n=>{const v=Math.round(n/1000);return v<0?'('+(-v).toLocaleString('en-US')+')':v.toLocaleString('en-US')};
const FILEN={gen:'普通申報書（自行申報）',blue:'藍色申報書',cpa:'會計師查核簽證申報',sum:'擴大書面審核'};
const VATN=I=>I.vat===0?'免徵營業稅（不得扣抵進項稅額）':I.gross?`特種稅額 ${I.vat}%（總額型，進項稅額不得扣抵）`:'一般營業稅 5%（銷項扣進項）'+(I.ex?`；外銷約 ${Math.round(I.ex*100)}% 適用零稅率`:'');
const needOf=(I,form)=>I.fx*1.05+I.dep+(form==='獨資'?3000:Math.max(1000,I.cap*.001))+I.fx*.12;
let FW={ind:0,form:'有限公司',capI:0,perI:0,loanI:0};
function foundHTML(sub){
 if(sub==='found:list'){
  let h='<h3>🏭 創業：選擇產業</h3><div class="sub">共 '+INDS.length+' 種產業，各有不同的主管機關、法規與稅制。</div>';
  let cat='';
  INDS.forEach((I,i)=>{if(I.cat!==cat){cat=I.cat;h+=`<div class="sec">${cat}</div>`}
   h+=`<button class="btn" data-a="found:pick:${i}">${I.n}<small>${I.cap?'法定最低資本額 '+money(I.cap)+'・':''}初期投入約 ${money(needOf(I,'有限公司'))}・${I.vat===0?'免營業稅':I.gross?'營業稅 '+I.vat+'%':'營業稅 5%'}</small></button>`});
  return h+'<button class="btn" data-a="back">← 返回</button>';
 }
 const I=INDS[FW.ind],form=FW.form,reg=form==='獨資'?3000:0;
 const need=needOf(I,form),base=Math.max(I.cap,Math.ceil(need/1e5)*1e5),caps=[base,Math.round(base*1.5/1e5)*1e5,Math.round(base*2.5/1e5)*1e5];
 const cap=caps[FW.capI],pers=form==='獨資'?cap:cap*[1,.7,.5,.3][FW.perI],loan=cap*[0,.3,.5][FW.loanI];
 const forms=['獨資','有限公司','股份有限公司'];
 const seg=(arr,cur,key,dis)=>`<div class="seg" style="margin:4px 0">${arr.map((t,i)=>`<button class="${i===cur?'on':''}" ${dis&&dis(i)?'disabled':''} data-a="found:set:${key}:${i}">${t}</button>`).join('')}</div>`;
 let h=`<h3>${I.n}</h3><p><b>主管機關／法規：</b>${I.law}</p><p><b>設立條件：</b>${I.req}</p>
 <p><b>營業稅：</b>${VATN(I)}${I.sp?`<br><b>特別稅捐：</b>${I.sp[0]}`:''}<br><b>營所稅：</b>20%（課稅所得額 12 萬元以下免稅），虧損可依所得稅法第 39 條扣抵前 10 年</p>
 <p class="sub">許可／保證金 ${money(I.dep)}・年度規費與合規成本約 ${money(I.fee)}・設備投資約 ${money(I.fx)}</p>
 <div class="sec">組織型態</div>`+seg(forms,forms.indexOf(form),'form',i=>(I.solo&&i!==0)||(i===0&&I.cap>0))
 +`<div class="sec">資本額（本金）</div>`+seg(caps.map(c=>money(c)),FW.capI,'cap');
 if(form!=='獨資')h+=`<div class="sec">創辦人出資占比</div>`+seg(['100%','70%','50%','30%'],FW.perI,'per')+`<div class="sec">銀行貸款</div>`+seg(['不貸款',money(cap*.3),money(cap*.5)],FW.loanI,'loan');
 else h+=`<div class="sec">銀行貸款</div>`+seg(['不貸款',money(cap*.3),money(cap*.5)],FW.loanI,'loan');
 h+=`<p>你需出資 <b>${money(pers)}</b>（你有 ${money(S.money)}）；${form!=='獨資'&&pers<cap?'其餘 '+money(cap-pers)+' 由天使投資人以面額認購，股權稀釋。':''}</p>
 <input type="text" id="coName" value="${esc(FW.name||'')}" placeholder="公司／店名（留空自動命名）" maxlength="14">
 <button class="btn p" data-a="found:go">登記成立</button><button class="btn" data-a="found:list">← 重選產業</button>`;
 return h;
}
function foundHandle(x,y,z){
 if(x==='list'){view.fsub='found:list';return null}
 if(x==='pick'){FW={name:'',ind:+y,form:'有限公司',capI:0,perI:0,loanI:0};const I=INDS[+y];if(I.solo)FW.form='獨資';view.fsub='found:det';return null}
 if(x==='set'){const k=y,v=+z;const ne=document.getElementById('coName');if(ne)FW.name=ne.value;if(k==='form')FW.form=['獨資','有限公司','股份有限公司'][v];else if(k==='cap')FW.capI=v;else if(k==='per')FW.perI=v;else FW.loanI=v;view.fsub='found:det';return null}
 if(x==='go'){
  const I=INDS[FW.ind],form=FW.form;
  const need=needOf(I,form),base=Math.max(I.cap,Math.ceil(need/1e5)*1e5),caps=[base,Math.round(base*1.5/1e5)*1e5,Math.round(base*2.5/1e5)*1e5];
  const cap=caps[FW.capI],pers=cap*[1,.7,.5,.3][FW.perI],loan=cap*[0,.3,.5][FW.loanI];
  const nm=(document.getElementById('coName')&&document.getElementById('coName').value||'').trim()||(S.name[0]+I.n.replace(/[／（(].*$/,'')+(form==='獨資'?'':'有限公司'));
  const err=foundCo(FW.ind,form,cap,pers,loan,nm);
  if(err){view.fsub='found:det';return B(err)}
  view.fsub=null;return G(`「${nm}」成立了！`);
 }
}
/* ---- 公司主畫面 ---- */
const pb=r=>`<div class="bar"><i style="width:${Math.max(0,Math.min(100,r))}%;background:#c0553a"></i></div>`;
function coHTML(sub){
 const co=S.co,I=INDS[co.ind],L=co.L,r=co.rec;
 const back='<button class="btn" data-a="co:menu:main">← 公司主頁</button>';
 const seg=(label,key,arr,cur,note)=>`<div class="sec">${label}</div><div class="seg" style="flex-wrap:wrap;margin:4px 0">${arr.map((t,i)=>`<button class="${i===cur?'on':''}" style="min-width:22%" data-a="co:set:${key}:${i}">${t}</button>`).join('')}</div>${note?`<div class="sub">${note}</div>`:''}`;
 if(sub==='co:pol'){const P=co.policy,corp=co.form!=='獨資';
  return `<h3>⚙️ 經營決策</h3><div class="sub">設定會沿用到每年度，隨時可調整。</div>`
  +seg('行銷預算（占營收）','mk',['1%','3%','6%','10%'],P.mk,'愈高成長愈快，但有邊際遞減。')
  +seg('研發投入（占營收）','rd',['0%','2%','5%','10%'],P.rd,'可提升成長；依產業創新條例，研發支出 15% 可抵減當年度營所稅（上限為應納稅額 30%）。')
  +seg('員工薪資水準','pay',['偏低','市場行情','偏高'],P.pay,'偏高降低裁罰風險並略增成長；薪資不得低於基本工資 NT$29,500／月。')
  +seg('行銷通路','ch',['線上廣告','實體門市','經銷代理','口碑經營'],P.ch||0,'線上：成長快、行銷費 +1%；門市：成長中等、租金 +2%；經銷：成長中等但毛利 −3 點；口碑：便宜但慢。')
  +seg('定價策略','pr',['低價滲透','市場價','高端定價'],P.pr==null?1:P.pr,'低價：銷量 +6%、毛利 −4 點；高端：銷量 −5%、毛利 +4 點。')
  +seg('用人方式','hr',['外包／兼職','正職員工','導入自動化'],P.hr==null?1:P.hr,'外包省 12% 人事但品質風險高；自動化省 18% 人事，另增 1% 營收的系統費用。')
  +seg('擴張策略','ex',['守成','新增據點','海外設點'],P.ex||0,'新據點：成長 +2.5 點、營運成本 +1.5%；海外：成長 +4.5 點、成本 +3%，有 10% 機率遇到匯率／法規衝擊。（遊戲估算）')
  +seg('租稅規劃','tp',['不規劃','盈餘轉增資','加薪加成減除'],P.tp||0,'盈餘轉增資：免加徵 5% 未分配盈餘稅，但盈餘轉為股本不能再分紅；加薪加成減除（簡化）：薪資成長部分的 30% 可額外減除。')
  +seg('法令遵循投入','comp',['基本','加強'],P.comp,`加強約增加 50% 的年度合規成本，降低「${I.risk}」被裁罰的機率。`)
  +(corp?seg('你的業主薪資（公司費用）','own',['不支薪','60 萬／年','120 萬／年','240 萬／年'],P.own,'薪資可列公司費用，但需負擔勞健保；股利則先課 20% 營所稅。'):'<p class="sub">獨資事業主不得支薪，所得併入你的綜合所得稅。</p>')
  +seg('營所稅結算申報方式','file',['普通申報','藍色申報書','會計師簽證','擴大書審'],['gen','blue','cpa','sum'].indexOf(P.file),'前 10 年虧損扣抵（所得稅法§39）：虧損年度與扣除年度都須使用藍色申報書或會計師簽證，並如期申報及繳稅。藍色申報書的交際費列支上限較高。擴大書審僅限收入 3,000 萬以下且純益率達 6% 以上。公開發行公司與銀行、保險、證券業須會計師簽證。').replace(/data-a="co:set:file:(\d)"/g,(m,i)=>`data-a="co:set:file:${i}"`)
  +(corp?seg('盈餘分配（股利）','div',['不分配','25%','50%','75%','全數'],P.div,'分配前須先彌補虧損並提列 10% 法定盈餘公積；當年度盈餘未於次年度結束前分配，須就未分配盈餘加徵 5% 營所稅。')
   +seg('自願委託會計師查核財報（財簽）','aud',['否','是'],P.aud,'實收資本額 3,000 萬以上、營收 1 億以上或勞保員工 100 人以上，依公司法§20 必須簽證；其餘為自願。'):'')
  +seg('資金缺口時','rescue',['宣告倒閉','自動以個人資金增資'],P.rescue,'系統一律先向銀行借款，不足才動用此選項。')
  +back;}
 if(sub==='co:capex'){
  const cap=(co.faG*I.turn+I.base);
  return `<h3>🏗️ 擴廠投資</h3><p>目前設備約 ${money(co.faG)}，年產能約 ${money(cap)}，去年營收 ${money(co.prevRev)}（產能利用率 ${cap?Math.round(co.prevRev/cap*100):0}%）。</p><p class="sub">營收受產能上限限制；購置設備含 5% 營業稅，一般課稅公司可扣抵進項稅額。</p>`
  +[.1,.25,.5,1].map(f=>{const a=Math.max(1e6,Math.round(co.faG*f/1e5)*1e5);return `<button class="btn" data-a="co:capex:${a}" ${L.cash<a*1.05?'disabled':''}>投資 ${money(a)}<small>增加產能約 ${money(a*I.turn)}</small></button>`}).join('')+back;}
 if(sub==='co:fin'){
  const lm=creditLimit(co),eq=equity(L),pr=co.stage>=2?.95:.8,price=Math.max(10,coValue(co)/co.shares*pr);
  let h=`<h3>💰 融資與增資</h3><p>現金 ${money(L.cash)}・借款 ${money(-L.loan)}・股東權益 ${money(eq)}<br>可再借額度約 ${money(lm)}（年利率約 3.5%，你須負連帶保證責任）</p>`;
  h+=[1e6,5e6,2e7].map(a=>`<button class="btn" data-a="co:loan:${a}" ${lm<a?'disabled':''}>借款 ${money(a)}</button>`).join('')
   +[.5,1].map(f=>`<button class="btn" data-a="co:repay:${f}" ${L.loan>=0||L.cash<=0?'disabled':''}>還款 ${f===1?'全部':'一半'}</button>`).join('');
  if(co.form!=='獨資'){
   h+=`<div class="sec">現金增資</div><p class="sub">引進投資人按市價認購新股（每股約 ${money(price)}），資本公積入帳，你的持股被稀釋；創辦人自行增資則按面額 10 元。</p>`;
   h+=[.1,.2,.3].map(f=>{const a=Math.max(1e6,Math.round(coValue(co)*f/1e5)*1e5);return `<button class="btn" data-a="co:ext:${a}">引進投資人 ${money(a)}<small>釋出約 ${(a/price/ (co.shares+a/price)*100).toFixed(1)}% 股權</small></button>`}).join('');
   h+=[5e5,2e6,1e7].map(a=>`<button class="btn" data-a="co:self:${a}" ${S.money<a?'disabled':''}>創辦人增資 ${money(a)}</button>`).join('');
  }
  return h+back;}
 if(sub==='co:ipo')return ipoHTML()+back;
 if(sub==='co:law')return lawHTML()+back;
 if(sub==='co:exit'){
  const v=coValue(co)*(co.stage>=2?1.15:.85),own=co.fs/co.shares;
  const liq=Math.max(0,L.cash+.5*L.fa+.7*L.ar+.5*L.inv+L.depo+L.vat+L.tax+L.ap+L.loan);
  return `<h3>🚪 退場</h3><p>出售公司：估值約 ${money(v)}，你持有 ${(own*100).toFixed(1)}%，可得約 ${money(v*own)}（出售股權的證券交易所得目前停徵所得稅）。</p><button class="btn" data-a="co:sell">出售公司</button>
  <p>結束營業（清算）：資產折價變現、清償債務後，剩餘財產按持股比例分配，預估你可分得約 ${money(liq*own)}。</p><button class="btn" data-a="co:liq">解散清算</button>${back}`;}
 // 主頁
 const eq=equity(L),own=co.fs/co.shares,V=coValue(co);
 const st=['私人公司','公開發行（輔導中）','興櫃','上櫃','上市'][co.stage];
 const nol=co.nol.reduce((s,e)=>s+e.amt,0);
 let h=`<h3>🏢 ${esc(co.name)}</h3><p>${I.n}・${co.form}・第 ${co.yrs} 年・${st}</p>
 <div class="item">現金 <b>${money(L.cash)}</b>｜股東權益 ${money(eq)}｜借款 ${money(-L.loan)}</div>
 <div class="item">${r?`去年營收 ${money(r.R)}｜稅後淨利 <span class="${r.NI<0?'neg':''}">${money(r.NI)}</span>｜EPS ${r.eps.toFixed(2)}`:'尚未完成第一個會計年度（按「年齡 +1」結算）'}</div>
 <div class="item">你的持股 ${(own*100).toFixed(1)}%（約值 ${money(stake(co))}）｜可扣抵虧損餘額 ${money(nol)}</div>
 <p class="sub">申報方式：${FILEN[co.policy.file]}${co.form==='獨資'?'（獨資所得併入個人綜所稅，不適用公司虧損扣抵）':''}</p>`;
 if(r)h+=`<button class="btn" data-a="co:rep">📊 查看 ${r.yr} 年度三大財報與稅務</button>`;
 h+=`<button class="btn" data-a="co:menu:pol">⚙️ 經營決策（行銷／研發／薪資／申報／股利）</button>
 <button class="btn" data-a="co:menu:capex">🏗️ 擴廠投資</button>
 <button class="btn" data-a="co:menu:fin">💰 融資與增資</button>`;
 if(co.form!=='獨資')h+=`<button class="btn" data-a="co:menu:ipo">📈 公開發行與 IPO</button>`;
 h+=`<button class="btn" data-a="co:menu:law">📜 產業法規與稅務重點</button><button class="btn" data-a="co:menu:exit">🚪 出售或結束公司</button>`;
 return h;
}
function lawHTML(){
 const co=S.co,I=INDS[co.ind];
 return `<h3>📜 ${I.n}</h3><p><b>主管機關／法規：</b>${I.law}</p><p><b>設立條件：</b>${I.req}</p><p><b>營業稅：</b>${VATN(I)}</p>
 <div class="sec">共通稅務與公司法重點</div>
 <p>營所稅 20%；全年課稅所得額 12 萬元以下免稅，超過者稅額不得超過超過部分的一半。<br>
 營利事業基本稅額：基本所得額超過 60 萬元的部分按 12% 計算，與一般稅額比較取高者。<br>
 虧損扣抵（所得稅法§39）：公司組織、帳簿完備，虧損與扣除年度均使用藍色申報書或經會計師簽證並如期申報，可扣除經核定的前 10 年虧損。<br>
 未分配盈餘：當年度盈餘未於次年度結束前分配，加徵 5%（可先減除彌補虧損、法定盈餘公積與已分配股利）。<br>
 財簽（公司法§20）：實收資本額 3,000 萬以上，或未達但營收淨額 1 億以上、或勞保員工 100 人以上，財報須經會計師查核簽證。<br>
 勞工：基本工資 NT$29,500／月；雇主負擔勞保（12.5% 費率的 70%）、健保（5.17% 的 60%，含平均眷屬）、勞退 6%。<br>
 股東股利：個人可選分離課稅 28% 或併入綜所稅享 8.5% 抵減（上限 8 萬元）；單次給付 2 萬元以上扣 2.11% 二代健保補充保費。</p>`;
}
function ipoCheck(co,step){
 const L=co.L,h=co.hist,cap=-L.capital,last=h[h.length-1],prev=h[h.length-2];
 const ratio=r=>r?r.PBTc/Math.max(1,-r.close.capital):-1;
 const noDef=L.re<=0;
 const c=[];const add=(ok,t)=>c.push({ok,t});
 if(step==='pub'){add(co.form==='股份有限公司','組織型態為股份有限公司（現為 '+co.form+'）');add(S.money>=0||L.cash>=3e6,'公司現金足以支付輔導費 NT$3,000,000');add(co.stage===0,'尚未公開發行');}
 if(step==='emg'){add(co.stage===1,'已公開發行');add(co.stageYrs>=1,'公開發行輔導滿 1 年（遊戲簡化）');add(L.cash>=2e6,'現金足以支付興櫃登錄費用 NT$2,000,000');}
 if(step==='otc'){
  add(co.stage===2,'目前為興櫃（掛牌滿 1 年再申請，遊戲簡化）');add(co.stageYrs>=2,'公開發行滿 2 年');
  add(cap>=5e7,'實收資本額 5,000 萬元以上（現為 '+money(cap)+'）');add(co.yrs>=2,'設立登記滿 2 個完整會計年度');
  const a=ratio(last),b=ratio(prev);
  add(a>=.04||(b>=.03&&a>=.03)||((a+b)/2>=.03&&a>b&&b>-1),'稅前淨利占股本：最近一年 ≥4%，或最近兩年均 ≥3%（現為 '+(a*100).toFixed(1)+'%）');
  add(last&&last.PBTc>=4e6,'最近一年稅前淨利 ≥ 400 萬元');add(noDef,'決算無累積虧損');}
 if(step==='lst'){
  add(co.stage>=2&&co.stage<4,'已為興櫃或上櫃');add(co.stageYrs>=2,'公開發行滿 2 年');
  add(cap>=6e8,'實收資本額 6 億元以上（現為 '+money(cap)+'）');add(co.yrs>=3,'設立登記滿 3 年');
  const a=ratio(last),b=ratio(prev);let f5=h.length>=5&&h.slice(-5).every(r=>ratio(r)>=.03);
  add((a>=.06&&b>=.06)||((a+b)/2>=.06&&a>b)||f5,'稅前淨利占股本：近兩年均 ≥6%（或兩年平均 ≥6% 且較佳，或近五年均 ≥3%）；現為 '+(a*100).toFixed(1)+'%');
  add(noDef,'最近年度決算無累積虧損');}
 return c;
}
function ipoHTML(){
 const co=S.co,L=co.L;let h='<h3>📈 公開發行與 IPO</h3>';
 const st=['私人公司','公開發行（輔導中）','興櫃','上櫃','上市'][co.stage];
 h+=`<p>目前階段：<b>${st}</b>${co.stage>=1?`（已滿 ${co.stageYrs} 年）`:''}。公開發行後財簽須由兩位會計師簽證（費用加倍），並須會計師稅務簽證。</p>`;
 const blk=(step,title,desc,cost)=>{const c=ipoCheck(co,step),ok=c.every(x=>x.ok);return `<div class="item"><b>${title}</b><div class="sub">${desc}</div>${c.map(x=>`<div style="font-size:13px">${x.ok?'✅':'⬜'} ${x.t}</div>`).join('')}<button class="btn" data-a="co:ipo:${step}" ${ok?'':'disabled'}>${cost}</button></div>`};
 if(co.stage===0)h+=blk('pub','① 辦理公開發行','向金管會申報公開發行，並由推薦證券商輔導。','申請（輔導費用 NT$3,000,000）');
 if(co.stage===1)h+=blk('emg','② 登錄興櫃','興櫃無規模與獲利門檻，由推薦證券商報價交易。','登錄興櫃（NT$2,000,000）');
 if(co.stage===2||co.stage===3){}
 if(co.stage===2)h+=blk('otc','③ 申請上櫃（IPO）','櫃買中心審查，釋出約 15% 股權向公眾募資，承銷與專業費用約 6% 加 800 萬元。','上櫃掛牌');
 if(co.stage>=2&&co.stage<4)h+=blk('lst','④ 申請上市（IPO）','證交所審查，釋出約 15% 股權向公眾募資，承銷與專業費用約 6% 加 2,000 萬元。','上市掛牌');
 if(co.stage>=2){
  const price=coValue(co)/co.shares;
  h+=`<div class="sec">出售持股</div><p class="sub">股價約 ${money(price)}／股，證交稅 0.3%；證券交易所得目前停徵所得稅。${co.stage>=3&&co.listYrs<1?'掛牌首年為鎖定期，不得出售。':''}</p>`;
  h+=[.1,.3,1].map(f=>`<button class="btn" data-a="co:sellsh:${f}" ${co.stage>=3&&co.listYrs<1?'disabled':''}>出售持股的 ${Math.round(f*100)}%（約 ${money(co.fs*f*price*.997)}）</button>`).join('');
 }
 return h;
}
function coHandle(x,y,z){
 const co=S.co;if(!co&&x!=='menu')return null;
 view.csub=null;
 if(x==='menu'){view.csub=y==='main'?null:'co:'+y;return null}
 const I=INDS[co.ind],L=co.L;
 if(x==='rep'){showReport(co.rec,()=>{});view.csub=null;return null}
 if(x==='set'){const P=co.policy;
  if(y==='file')P.file=['gen','blue','cpa','sum'][+z];else P[y]=+z;
  view.csub='co:pol';return null}
 if(x==='capex'){const a=+y;if(L.cash<a*1.05)return B('公司現金不足。');buyFA(co,a);view.csub='co:capex';const m=`【${co.name}】擴廠投資 ${money(a)}。`;log(m);return G(m)}
 if(x==='loan'){const a=+y;if(a>creditLimit(co))return B('超過額度。');drawLoan(co,a);view.csub='co:fin';return G('借款成功。')}
 if(x==='repay'){const a=repayLoan(co,-L.loan*(+y));view.csub='co:fin';return a?G('已還款 '+money(a)):B('無法還款。')}
 if(x==='ext'||x==='self'){
  const a=+y;view.csub='co:fin';
  if(x==='self'){if(S.money<a)return B('個人現金不足。');S.money-=a;J(L,['cash',a],['capital',-a]);co.shares+=a/10;co.fs+=a/10;const m=`你對公司增資 ${money(a)}。`;log(m);return G(m)}
  const price=Math.max(10,coValue(co)/co.shares*(co.stage>=2?.95:.8)),ns=a/price;
  J(L,['cash',a],['capital',-ns*10],['apic',-(a-ns*10)]);co.shares+=ns;
  const m=`投資人以每股 ${money(price)} 認購新股，公司募得 ${money(a)}，你的持股降為 ${(co.fs/co.shares*100).toFixed(1)}%。`;log(m,'good');return G(m)}
 if(x==='ipo'){
  view.csub='co:ipo';const c=ipoCheck(co,y);if(!c.every(q=>q.ok))return B('條件尚未達成。');
  if(y==='pub'){J(L,['fee',3e6],['cash',-3e6]);co.stage=1;co.stageYrs=0;const m='公司辦理公開發行，進入輔導期。';log(m,'good');return G(m)}
  if(y==='emg'){J(L,['fee',2e6],['cash',-2e6]);co.stage=2;co.stageYrs=0;const m='公司登錄興櫃！';log(m,'good');return G(m)}
  const price=Math.max(10.5,coValue(co)/co.shares*.9),ns=co.shares*.15/.85,amt=ns*price,cost=amt*.06+(y==='otc'?8e6:2e7);
  J(L,['cash',amt],['capital',-ns*10],['apic',-(amt-ns*10)]);J(L,['apic',cost],['cash',-cost]);co.shares+=ns;
  co.stage=y==='otc'?3:4;co.listYrs=0;
  const m=`公司${y==='otc'?'上櫃':'上市'}掛牌！承銷價每股 ${money(price)}，募資 ${money(amt)}（扣除費用 ${money(cost)}），你的持股降為 ${(co.fs/co.shares*100).toFixed(1)}%，持股價值約 ${money(stake(co))}。`;
  log(m,'good');chg('happy',15);return G(m)}
 if(x==='sellsh'){
  view.csub='co:ipo';const sh=co.fs*(+y),price=coValue(co)/co.shares,get=sh*price*.997;
  co.fs-=sh;S.money+=get;const m=`你出售部分持股，扣除證交稅後得到 ${money(get)}。`;log(m,'good');return G(m)}
 if(x==='sell'||x==='liq'){
  const own=co.fs/co.shares;let get;
  if(x==='sell')get=coValue(co)*(co.stage>=2?1.15:.85)*own;
  else{const liq=Math.max(0,L.cash+.5*L.fa+.7*L.ar+.5*L.inv+L.depo+L.vat+L.tax+L.ap+L.loan);get=liq*own;
   if(L.cash+.5*L.fa+.7*L.ar+.5*L.inv+L.depo+L.vat+L.tax+L.ap+L.loan<0)get+=(L.cash+.5*L.fa+.7*L.ar+.5*L.inv+L.depo+L.vat+L.tax+L.ap+L.loan)*Math.min(1,0)}
  S.money+=get;const m=`你${x==='sell'?'出售':'清算'}了「${co.name}」，取得 ${money(get)}。`;log(m,'good');
  S.co=null;S.job=null;S.coHist=(S.coHist||0)+1;view.csub=null;return N(m)}
}
/* ---- 年度財報 ---- */
let repTab=0;
function reportRows(rec,t){
 const pl=rec.pl,c=rec.cf,b=rec.close,T=rec.T,rows=[];
 const R=(l,v,cls)=>rows.push(`<tr class="${cls||''}"><td>${l}</td><td>${v===null?'':k1(v)}</td></tr>`);
 const H=l=>rows.push(`<tr class="h"><td colspan="2">${l}</td></tr>`);
 if(t===0){
  const opx=pl.staff+pl.rd+pl.mkt+pl.rent+pl.depx+pl.fee+pl.audit+pl.gtax+pl.spx,gp=-pl.rev-pl.cogs,oi=gp-opx;
  R('營業收入淨額',-pl.rev,'b');R('營業成本',-pl.cogs);R('營業毛利',gp,'b');H('營業費用');
  R('薪資及勞健保費用',-pl.staff);R('研究發展費用',-pl.rd);R('行銷費用',-pl.mkt);R('租金及其他營運費用',-pl.rent);R('折舊費用',-pl.depx);R('規費及合規費用',-pl.fee);R('查核簽證及稅務代理費',-pl.audit);R('特種營業稅及其他稅捐',-(pl.gtax+pl.spx));
  R('營業利益（損失）',oi,'b');H('營業外收支');R('利息收入',-pl.inti);R('利息費用',-pl.intx);R('罰款及滯納金支出',-pl.pen);
  R('稅前淨利（損）',rec.PBTc,'b');R('所得稅費用（利益）',-pl.taxx);R('本期淨利（損）',rec.NI,'b');
  rows.push(`<tr><td>每股盈餘（元）</td><td>${rec.eps.toFixed(2)}</td></tr>`);
 }else if(t===1){
  const rv=(b.vat>0?b.vat:0)+(b.tax>0?b.tax:0),ca=b.cash+b.ar+b.inv+rv,ta=ca+b.fa+b.dta+b.depo;
  const pv=b.vat<0?-b.vat:0,pt=b.tax<0?-b.tax:0,tl=-b.ap+pv+pt-b.loan,eq=-(b.capital+b.apic+b.reserve+b.re);
  H('資產');R('現金及約當現金',b.cash);R('應收帳款',b.ar);R('存貨',b.inv);R('應收退稅款（營業稅留抵、所得稅退稅）',rv);R('流動資產合計',ca,'b');
  R('固定資產淨額',b.fa);R('遞延所得稅資產（虧損扣抵）',b.dta);R('存出保證金',b.depo);R('資產總計',ta,'b');
  H('負債');R('應付帳款',-b.ap);R('應付營業稅',pv);R('應付所得稅',pt);R('長期借款',-b.loan);R('負債合計',tl,'b');
  H(rec.form==='獨資'?'業主權益':'權益');R(rec.form==='獨資'?'業主資本':'股本',-b.capital);R('資本公積',-b.apic);R('法定盈餘公積',-b.reserve);R('未分配盈餘（累積虧損）',-b.re);R('權益合計',eq,'b');
  R('負債及權益總計',tl+eq,'b');rows.push(`<tr><td>平衡檢查</td><td>${Math.abs(ta-tl-eq)<2?'✅ 資產＝負債＋權益':'❌ 不平衡'}</td></tr>`);
 }else if(t===2){
  H('營業活動');R('本期淨利（損）',c.NI);R('折舊費用',c.dep);R('應收帳款（增加）減少',c.adj.ar);R('存貨（增加）減少',c.adj.inv);R('遞延所得稅資產（增加）減少',c.adj.dta);R('應付帳款增加（減少）',c.adj.ap);R('應付（留抵）營業稅增減',c.adj.vat);R('應付（應退）所得稅增減',c.adj.tax);R('營業活動之淨現金流入（出）',c.CFO,'b');
  H('投資活動');R('取得固定資產',-c.capex);R('存出保證金（增加）',-c.depo);R('投資活動之淨現金流入（出）',c.CFI,'b');
  H('籌資活動');R('借款增加（減少）',c.loanChg);R('現金增資（含溢價，扣發行成本）／出資',c.eqIn);R(rec.form==='獨資'?'業主提取':'發放現金股利',-c.divOut);R('籌資活動之淨現金流入（出）',c.CFF,'b');
  R('本期現金增加（減少）',c.net,'b');R('期初現金',c.begin);R('期末現金',c.end,'b');
  rows.push(`<tr><td>對帳</td><td>${Math.abs(c.net-(c.end-c.begin))<2?'✅ 與資產負債表現金一致':'❌ 不一致'}</td></tr>`);
 }else{
  const f=T.file;
  H('財簽與稅簽');
  rows.push(`<tr><td colspan="2" style="line-height:1.5">財務報表查核（財簽）：${T.must?'<b>依公司法§20 必須</b>經會計師查核簽證':T.wantAud?'自願委託會計師查核':'未委託（非必須）'}${rec.stage>=1?'（公開發行：兩位會計師雙簽）':''}，費用 ${money(T.finFee||0)}。${T.wantAud?'會計師出具<b>無保留意見</b>查核報告。':''}<br>營所稅申報方式：<b>${FILEN[f]||f}</b>${T.mustTax?'（依規定須會計師稅務簽證）':''}，簽證／代理費用 ${money(T.taxFee||0)}。</td></tr>`);
  if(rec.form==='獨資'){H('獨資營利所得');R('稅前淨利',T.PBT);R('加：罰款及滯納金',T.pen);R('加：交際費超限',T.exc);R('全年所得額',T.income,'b');R('減：免稅額及標準扣除額',Math.min(228000,Math.max(0,T.income)));R('課稅所得淨額',T.taxable,'b');R('個人綜合所得稅',T.ptax,'b');
   rows.push('<tr><td colspan="2" class="sub">獨資事業不課營所稅，所得併入負責人綜合所得稅，也不適用公司組織的前 10 年虧損扣抵。</td></tr>');
  }else{
   H('營利事業所得稅結算申報');
   R('會計稅前淨利',T.PBT);R('加：罰款及滯納金（不得認列）',T.pen);R('加：交際費超限',T.exc);R('全年所得額（純益額）',T.income,'b');
   R('減：前 10 年虧損扣抵',T.used||0);R('課稅所得額',T.taxable,'b');
   R('一般稅額（20%，12 萬以下免稅）',T.tax);R('減：研發投資抵減（15%，上限應納稅額 30%）',T.cr||0);
   R('基本稅額（基本所得額超過 60 萬 × 12%）',T.basic);R('應納稅額（取高者）',T.pay,'b');R('減：暫繳稅額',T.prov);
   R('應補（退）稅額',T.pay-T.prov,'b');R('未分配盈餘加徵 5%（上年度盈餘）',T.ueTax||0);
   if(T.audit)R('國稅局查核補稅＋罰鍰',T.audit.add+T.audit.fine);
   if(T.late)rows.push('<tr><td colspan="2" class="neg">現金不足未如期繳稅：加徵滯納金，並喪失本年度盈虧互抵資格。</td></tr>');
   if(T.lostLoss)rows.push('<tr><td colspan="2" class="neg">本年度虧損因未使用藍色申報書／簽證或未如期申報，不得保留扣抵。</td></tr>');
   H('虧損扣抵餘額（所得稅法§39）');
   const co=S.co;const list=(co&&co.hist[co.hist.length-1]===rec?co.nol:[]);
   if(!list.length)rows.push('<tr><td colspan="2" class="sub">目前沒有可扣抵的虧損。</td></tr>');
   list.forEach(e=>R(`第 ${e.y} 年度虧損（可用至第 ${e.y+10} 年度）`,e.amt));
   R('遞延所得稅資產（餘額 × 20%）',T.dtaEnd||0);
   H('營業稅');
   rows.push(`<tr><td colspan="2" style="line-height:1.5">課稅方式：${rec.vr.m==='std'?'一般稅額，5%（銷項 − 進項，每兩個月申報）':rec.vr.m==='gross'?`總額型 ${(rec.vr.r*100).toFixed(rec.vr.small?0:0)}%${rec.vr.small?'（小規模營業人查定課徵）':'（進項不可扣抵）'}`:'免稅（進項稅額不得扣抵）'}</td></tr>`);
   if(rec.vr.m==='std'){R('銷項稅額',rec.outV);R('進項稅額',rec.inV);R('本年度應納（溢付）營業稅',rec.outV-rec.inV,'b')}
   else if(rec.gtax)R('特種／小規模營業稅',rec.gtax);
  }
 }
 return rows.join('');
}
function showReport(rec,cb){
 const names=['損益表','資產負債表','現金流量表','財稅簽與稅務'];
 const draw=()=>{
  const co=S.co;
  $('modalBody').innerHTML=`<h3>${esc(rec.name)} ${rec.yr} 年度財報</h3><div class="sub">${rec.ind}・${rec.form}・新臺幣千元（每股盈餘除外）</div>
  <div class="row" style="margin:6px 0;font-size:13px"><span>營收 ${k1(rec.R)}</span><span class="${rec.NI<0?'neg':''}">淨利 ${k1(rec.NI)}</span><span>現金 ${k1(rec.close.cash)}</span></div>
  <div class="seg" style="margin:6px 0;flex-wrap:wrap">${names.map((n,i)=>`<button class="${i===repTab?'on':''}" style="font-size:13px;padding:8px 4px" data-t="${i}">${n}</button>`).join('')}</div>
  <table class="rt">${reportRows(rec,repTab)}</table>
  ${rec.divDecl||co&&co.divDecl?`<p class="sub">董事會擬議於下年度發放現金股利約 ${money(co?co.divDecl:0)}。</p>`:''}
  <button class="btn p" id="repOk">${cb?'關閉並繼續':'關閉'}</button>`;
  $('modal').classList.add('on');
  $('modalBody').querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{repTab=+b.dataset.t;draw()});
  $('repOk').onclick=()=>{$('modal').classList.remove('on');$('modalBody').onclick=null;if(cb)cb()};
 };
 repTab=0;draw();
}
