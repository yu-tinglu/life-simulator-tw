const IW28=()=>Math.max(1,typeof WI==='function'?WI():1);
/* ---- 社會保險：勞保／健保／勞退／國保，及各國扣繳與提領（p28）----
   台灣：2026 年勞保費率 12.5%（含就保，員工 20%）、健保 5.17%（員工 30%）、勞退雇主提繳 6%、國保月投保金額 21,103 元費率 10.5%（自付 60%）。
   海外：以 2026 年法定費率估算；金額與退休給付為遊戲簡化。 */
const PAY={
 US:{items:[['社會安全稅（Social Security）',6.2,6.2],['聯邦醫療保險稅（Medicare）',1.45,1.45]],tx:'已含在實領薪資的稅負內'},
 JP:{items:[['厚生年金',9.15,9.15],['健康保險',5,5],['雇用保險',.55,.9],['介護保險（40 歲起）',.9,.9,40]],tx:'已含在實領薪資的稅負內'},
 KR:{items:[['國民年金（2026 年 9.5%）',4.75,4.75],['國民健康保險',3.595,3.595],['長期療養保險',.472,.472],['雇用保險',.9,1.15]],tx:'已含在實領薪資的稅負內'},
 DE:{items:[['法定養老保險',9.3,9.3],['法定健康保險（含平均附加費率）',8.75,8.75],['長照保險',1.8,1.8],['失業保險',1.3,1.3]],tx:'已含在實領薪資的稅負內'},
 GB:{items:[['國民保險 NI（8%，高所得部分 2%）',8,15]],tx:'NI 已含在稅負內',wp:1},
 CA:{items:[['加拿大年金（CPP）',5.95,5.95],['就業保險（EI）',1.64,2.3]],tx:'已含在實領薪資的稅負內'},
 AU:{items:[['醫療保險稅（Medicare levy）',2,0],['退休金 Super（雇主提撥）',0,12]],tx:'醫療稅已含在稅負內；Super 由雇主另外提撥',su:1},
 SG:{items:[['中央公積金 CPF（55 歲以下）',20,17]],tx:'CPF 員工部分另外從薪水扣',cpf:1}
};
function siInit(){if(!S.si)S.si={lab:0,lw:[],lt:0,np:0,ltPaid:0,ltMode:'',pset:0,bal:{oa:0,sa:0,ma:0,b:0},yrs:{}};return S.si}
const cpfRate=a=>a<=55?[20,17]:a<=60?[18,16]:a<=65?[12.5,12.5]:a<=70?[7.5,9]:[5,7.5];
const cpfAlloc=a=>a<=35?[23,6,8]:a<=45?[21,7,9]:a<=50?[19,8,10]:a<=55?[15,11.5,10.5]:[12,3.5,10.5];
/* 目前狀態下的年度扣繳試算（不修改狀態） */
function siCalc(){
 siInit();const k=S.cn||'TW',a=S.age,L=[];let ded=0,acc=0,ins=0,np=false,lab=false;
 const job=S.job,works=job&&!S.army&&!S.jail&&!S.flags.retired&&!S.school;
 if(k==='TW'){
  if(works){
   const m=job.founder?Math.round(45800*IW28()):job.sal/12;ins=Math.min(Math.round(45800*IW28()),Math.max(29500,m));lab=true;
   const e1=Math.round(ins*.125*.2*12),r1=Math.round(ins*.125*.7*12);
   const hb=Math.min(Math.round(313000*IW28()),Math.max(29500,m)),dep=Math.min(3,S.kids.filter(x=>x.age<20).length);
   const e2=Math.round(hb*.0517*.3*(1+dep)*12),r2=Math.round(hb*.0517*.6*1.56*12);
   const r3=Math.round(Math.min(150000,Math.max(29500,m))*.06*12);
   L.push(['勞工保險（費率 12.5%，含就保）',e1,r1,'投保薪資 '+money(ins)+'／月（上限 45,800）']);
   L.push(['全民健保（費率 5.17%）',e2,r2,'你付 30%'+(dep?`，含 ${dep} 位眷屬`:'')]);
   L.push(['勞工退休金（雇主提繳 6%）',0,r3,'進入你的個人專戶']);
   ded=e1+e2;acc=r3;
  }else if(a>=25&&a<65&&!S.school&&!S.army&&!S.jail&&!S.flags.retired){
   const e1=Math.round(Math.round(21103*IW28())*.105*.6*12),e2=Math.round(29500*.0517*.6*12);np=true;
   L.push(['國民年金（月投保金額 21,103，費率 10.5%）',e1,0,'你付 60%，政府補助 40%']);
   L.push(['全民健保（第六類）',e2,0,'無雇主，自付 60%']);ded=e1+e2;
  }
  return {k,L,ded,acc,ins,np,lab,ee:L.reduce((s,x)=>s+x[1],0),er:L.reduce((s,x)=>s+x[2],0)};
 }
 const p=PAY[k],c=CNS[k];if(!p)return {k,L,ded:0,acc:0};
 if(works&&!job.founder||works&&job.founder){
  const g=Math.max(0,(job.founder?wTW(k)*.9:job.sal)/fxr(k)/(1-c.tax));
  p.items.forEach(it=>{if(it[3]&&a<it[3])return;L.push([it[0],Math.round(g*it[1]/100*fxr(k)),Math.round(g*it[2]/100*fxr(k)),p.tx])});
  if(p.cpf){const [ee,er]=cpfRate(a),cap=Math.min(g,96000),e=Math.round(cap*ee/100),r=Math.round(cap*er/100);L.length=0;
   L.push([`中央公積金 CPF（${a<=55?'55 歲以下':'依年齡'}，員工 ${ee}%／雇主 ${er}%）`,Math.round(e*fxr(k)),Math.round(r*fxr(k)),'薪資上限每月 8,000 新幣；員工部分另外從薪水扣']);ded=Math.round(e*fxr(k));acc=Math.round((e+r)*fxr(k))}
  if(p.su){const r=Math.round(g*.12*fxr(k));acc=r}
  if(p.wp){const qe=Math.max(0,Math.min(g,50270)-6240),e=Math.round(qe*.04*fxr(k)),r=Math.round(qe*.04*fxr(k));
   L.push(['職場退休金自動加入（員工 5%，扣除稅務減免約 4%；雇主 3%；稅務補貼 1%）',e,Math.round(qe*.03*fxr(k)),'進入你的退休帳戶']);ded=e;acc=Math.round(qe*.08*fxr(k))}
 }
 return {k,L,ded,acc,ee:L.reduce((s,x)=>s+x[1],0),er:L.reduce((s,x)=>s+x[2],0)};
}
/* 台灣年金試算 */
function twPension(){
 const s=siInit(),lw=s.lw.slice(-5),avg=lw.length?lw.reduce((x,y)=>x+y,0)/lw.length/12:0;
 let labAnn=0,lump=0;
 if(s.lab>=15)labAnn=Math.round(Math.max(avg*s.lab*.0155,avg*s.lab*.00775+3000)*12);
 else if(s.lab>0)lump=Math.round(avg*s.lab);
 let npAnn=0;
 if(s.np>0)npAnn=Math.round((labAnn>0?Math.round(21103*IW28())*s.np*.013:Math.max(Math.round(21103*IW28())*s.np*.013,Math.round(21103*IW28())*s.np*.0065+4049))*12);
 return {labAnn,lump,npAnn,ann:labAnn+npAnn};
}
/* 海外退休金試算（供 p27 使用） */
function pensionEst(k,w,base,f,c){
 const s=siInit();let amt;
 if(k==='SG'){const pool=s.bal.sa+s.bal.oa*.5,lump=S.house?0:Math.round(s.bal.oa*.5);amt=Math.round(pool*.07);if(lump){S.money+=lump;log(`你提領了部分 CPF 普通帳戶餘額 ${money(lump)}。`)}}
 else if(k==='AU'){const b=s.bal.b/fxr('AU'),ap=Math.max(0,30000-.078*Math.max(0,b-314000));amt=Math.round((s.bal.b/20)+ap*fxr('AU'))}
 else if(k==='GB'){amt=Math.round(Math.min(1,w/35)*11970*fxr('GB')+s.bal.b/20)}
 else amt=Math.round(c.rr*Math.max(base,wTW(k)*.5)*f);
 const t=twPension();if(t.ann||t.lump){amt+=t.ann;if(t.lump)S.money+=t.lump}
 return amt;
}
/* 每年扣繳、累積與提領 */
const _y28=yearly;
yearly=function(){
 const had=S.flags.retired;_y28();
 const s=siInit(),k=S.cn||'TW',a=S.age,c=siCalc();
 if(S.dead)return;
 ldset('勞健保等扣款');S.money-=c.ded;ldset(null);s.cur={k,L:c.L,ded:c.ded};
 if(k==='TW'){
  s.lt=s.lt*1.03+(c.acc||0);
  if(c.lab){s.lab++;s.lw.push(c.ins*12);if(s.lw.length>8)s.lw.shift()}
  if(c.np)s.np++;
 }else{
  const p=PAY[k];
  if(p&&c.acc){
   if(p.cpf){const al=cpfAlloc(a),t=al[0]+al[1]+al[2];s.bal.oa=s.bal.oa*1.025+c.acc*al[0]/t;s.bal.sa=s.bal.sa*1.04+c.acc*al[1]/t;s.bal.ma=s.bal.ma*1.04+c.acc*al[2]/t}
   else s.bal.b=s.bal.b*(p.su?1.05:1.04)+c.acc;
  }else if(p&&p.cpf){s.bal.oa*=1.025;s.bal.sa*=1.04;s.bal.ma*=1.04}else if(p&&(p.su||p.wp))s.bal.b*=p.su?1.05:1.04;
 }
 /* 台灣勞退 60 歲起領取（出國也照領） */
 if(a>=60&&s.lt>0){
  if(!s.ltMode){s.ltMode=s.lab>=15?'ann':'lump';if(s.ltMode==='lump'){S.money+=Math.round(s.lt);log(`勞退個人專戶一次領取 ${money(s.lt)}（提繳年資未滿 15 年）。`,'good');s.ltPaid+=s.lt;s.lt=0}else log(`你開始按月領取勞退個人專戶（累積 ${money(s.lt)}，遊戲以年領估算）。`,'good')}
  if(s.ltMode==='ann'&&s.lt>0){const pay=Math.round(s.lt/Math.max(5,85-a));S.money+=pay;s.lt-=pay;s.ltPaid+=pay}
 }
 /* 台灣：退休時以勞保＋國保公式取代簡化年金 */
 if(k==='TW'&&S.flags.retired&&!had&&!s.pset){
  s.pset=1;S.money-=S.pension||0;const t=twPension();S.pension=t.ann;S.money+=t.ann;
  if(t.lump){S.money+=t.lump;log(`勞保年資 ${s.lab} 年未滿 15 年，改領老年一次金 ${money(t.lump)}。`,'good')}
  log(`依勞保（年資 ${s.lab} 年）與國民年金（年資 ${s.np} 年）公式，你每年可領老年年金約 ${money(t.ann)}。`,'good');
 }
};
const _logV28=logV;
logV=function(t){t=_logV28(t);if((S.cn||'TW')!=='TW')return t;
 if(/^你退休了，每年領退休金/.test(t))return '你退休了。';
 if(/^你滿 65 歲，開始領老年年金/.test(t))return '你滿 65 歲，進入退休階段（公司仍由你持有）。';
 return t};
/* 社會保險頁面 */
const _life28=lifeHTML,_more28=moreHTML;
moreHTML=function(){return _more28().replace('<button class="tile" data-a="lf:health">','<button class="tile" data-a="lf:si"><b>💰</b>社會保險<small>勞保・勞退・各國制度</small></button><button class="tile" data-a="lf:health">')};
const _lfH28=lfHandle;
lfHandle=function(x,y,z,u){if(x==='si')return null;return _lfH28(x,y,z,u)};
lifeHTML=function(){return view.lsub==='si'?siHTML():_life28()};
function siHTML(){
 const s=siInit(),k=S.cn||'TW',c=siCalc(),row=([n,e,r,t])=>`<div class="item"><b>${esc(n)}</b><div class="sub">你負擔 ${k==='TW'?money(e):fmtL(k,e/fxr(k))}／年${r?`；雇主負擔 ${k==='TW'?money(r):fmtL(k,r/fxr(k))}`:''}${t?'<br>'+esc(t):''}</div></div>`;
 let h=`<h3>💰 社會保險・${CNS[k].n}</h3>`;
 if(S.age<15)return h+'<div class="sub">長大開始工作後，才會有社會保險的扣繳與年資。</div><button class="btn" data-a="back">← 返回</button>';
 h+=c.L.length?`<div class="sec">今年的扣繳</div>`+c.L.map(row).join(''):'<div class="sub">目前沒有工作，也沒有需要自繳的項目（未成年、在學、服役或已退休）。</div>';
 if(k==='TW'){
  const t=twPension();
  h+=`<div class="sec">累積</div><div class="item"><b>勞保年資 ${s.lab} 年</b><div class="sub">滿 15 年可領月退（年金），不足則領一次金。老年年金公式：平均月投保薪資×年資×1.55%。</div></div>
  <div class="item"><b>勞退個人專戶 ${money(s.lt)}</b><div class="sub">雇主每月提繳 6%，年報酬以 3% 估算。滿 60 歲可領。</div></div>
  <div class="item"><b>國民年金年資 ${s.np} 年</b><div class="sub">沒有勞保的期間（25–64 歲）要自繳國保；老年年金按月投保金額×年資×1.3%，或 0.65% 加基本保障。</div></div>
  <div class="sec">65 歲預估</div><div class="item"><b>每年約 ${money(t.ann)}</b><div class="sub">勞保 ${money(t.labAnn)}＋國保 ${money(t.npAnn)}${t.lump?`；另可領一次金 ${money(t.lump)}`:''}</div></div>`;
 }else{
  const p=PAY[k],b=s.bal;
  if(p&&p.cpf)h+=`<div class="sec">CPF 帳戶</div><div class="item"><b>普通帳戶 ${money(b.oa)}</b><div class="sub">可用於房貸，年利率 2.5%</div></div><div class="item"><b>特別帳戶 ${money(b.sa)}</b><div class="sub">退休用，年利率 4%</div></div><div class="item"><b>Medisave ${money(b.ma)}</b><div class="sub">醫療用，年利率 4%</div></div>`;
  else if(p&&(p.su||p.wp))h+=`<div class="sec">退休帳戶</div><div class="item"><b>${p.su?'Super 退休金':'職場退休金'} ${money(b.b)}</b><div class="sub">${p.su?'雇主提撥 12%（2025 年 7 月起），年報酬以 5% 估算':'自動加入制度，年報酬以 4% 估算'}</div></div>`;
  h+=`<div class="sub" style="margin-top:8px">${p?esc(p.tx):''}。退休金依各國公式估算：${k==='SG'?'CPF LIFE 以帳戶餘額年領約 7%':k==='AU'?'Super 提領＋資產調查後的 Age Pension':k==='GB'?'國家年金＋職場退休金':'OECD 2025 平均薪資的替代率'}。</div>`;
  const tp=twPension();if(tp.ann||tp.lump||s.lt)h+=`<div class="sec">你在台灣累積的</div><div class="item"><b>勞保年資 ${s.lab} 年、勞退專戶 ${money(s.lt)}、國保年資 ${s.np} 年</b><div class="sub">勞退 60 歲起照領；退休時台灣的勞保／國保年金會一併計入。</div></div>`;
 }
 h+=`<p class="sub">資料：台灣 2026 年勞健保與國保費率（勞動部、健保署、衛福部）；德國、韓國、新加坡 2026 年法定費率；其他國家為近年水準。遊戲簡化：未計失業給付、遺屬給付與上限調整。</p>`;
 return h+'<button class="btn" data-a="back">← 返回</button>';
}
