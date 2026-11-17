/* ---- p70：台灣綜合所得稅（114 年度公告值：免稅額 9.7 萬、標準扣除額 13.1 萬／26.2 萬、薪資特別扣除額 21.8 萬、基本生活費 21.3 萬；級距採 113 年度公告值）---- */
const TXB=[[590000,.05,0],[1330000,.12,41300],[2660000,.20,147700],[4980000,.30,413700],[Infinity,.40,911700]];
function twIncTax(net){if(net<=0)return 0;for(const [u,r,d] of TXB)if(net<=u)return Math.round(net*r-d);return 0}
function txIncome(){
 const L=S.ld&&S.ld.cur;if(!L)return 0;let t=0;
 for(const k in L.r){const p=k.split('|');if(p[0]==='i'&&p[2]==='你'&&['薪資','兼職收入','練習生通告'].includes(p[1]))t+=L.r[k]}
 return t;
}
function txCalc(own){
 const p=S.partner,mar=!!(p&&p.married),pinc=(mar&&p.inc&&(S.age+(p.off||0))<65&&!p.jl)?p.inc:0;
 const kids=S.kids.filter(k=>k.age<20).length,pars=[S.mom,S.dad].filter(x=>x&&x.alive&&(S.age+(x.off||28))>=70).length;
 const exemp=97000*(1+(mar?1:0)+kids)+145500*pars,std=mar?262000:131000,ws=Math.min(own,218000)+Math.min(pinc,218000);
 const gross=own+pinc,base=gross-exemp-std-ws;
 const persons=1+(mar?1:0)+kids+pars,bl=213000*persons,extra=Math.max(0,bl-(exemp+std+ws));
 const net=Math.max(0,base-extra),tax=twIncTax(net),tax1=(own>0&&pinc>0)?Math.round(tax*own/gross):tax;
 return {gross,net,tax,mine:tax1,pinc,mar};
}
const _y70=yearly;
yearly=function(){
 _y70();
 try{
  if(S.dead||(S.cn||'TW')!=='TW'||S.age<18)return;
  const own=txIncome();if(own<=0)return;
  const c=txCalc(own);if(c.mine<=0)return;
  ldset('綜合所得稅');S.money-=c.mine;ldset(null);
  log(`綜合所得稅：${c.mar?'夫妻合併申報，':''}所得 ${money(c.gross)}，課稅所得 ${money(c.net)}，稅額 ${money(c.tax)}${c.mar&&c.pinc?`（你的部分 ${money(c.mine)}）`:''}，有效稅率 ${(c.tax/c.gross*100).toFixed(1)}%。`);
 }catch(e){}
};
/* ---- 海外現金匯兌損益＋文字內金額換算成當地貨幣 ---- */
LDX.add('匯兌損益');
const _y70b=yearly;
yearly=function(){
 const k=S.cn||'TW';
 _y70b();
 try{
  if(S.dead)return;const k2=S.cn||'TW';
  if(k2==='TW'){S.fxc=null;return}
  const f=fxr(k2);
  if(S.fxc&&S.fxc.k===k2&&S.fxc.v>0&&S.money>0){
   const d=Math.round(S.money*(f/S.fxc.v-1));
   if(Math.abs(d)>=1000){ldset('匯兌損益');S.money+=d;ldset(null);log(`你的手頭現金是${CNS[k2].n}幣，兌新台幣${d>0?'升值':'貶值'}，換算台幣價值${d>0?'增加':'減少'} ${money(Math.abs(d))}（匯兌${d>0?'利得':'損失'}，未實現）。`,d>0?'good':'bad')}
  }
  S.fxc={k:k2,v:f};
 }catch(e){}
};
function locText(t){
 try{
  if(typeof t!=='string'||MNY_TW||!S||!S.cn||S.cn==='TW'||!CNS[S.cn]||t.indexOf('NT$')<0)return t;
  return t.replace(/NT\$(-?[\d,]+(?:\.\d+)?)(萬|億)?/g,(m,n,u)=>{let v=parseFloat(n.replace(/,/g,''));if(isNaN(v))return m;if(u==='萬')v*=1e4;else if(u==='億')v*=1e8;return money(v)});
 }catch(e){return t}
}
const _lv70=logV;logV=function(t){return locText(_lv70(t))};
const _ask70=ask;ask=function(text,labels,cb){return _ask70(locText(text),Array.isArray(labels)?labels.map(locText):labels,cb)};
/* ---- 系統串接：兼職資歷／名氣／社團幹部影響求職；兼職升組長 ---- */
const _pr70=ptRate;ptRate=function(o){return _pr70(o)+(o&&o.lead?Math.round(ptBase()*.12):0)};
const _sb70=skillBonus;
skillBonus=function(j){
 let b=_sb70(j);
 try{
  const t=j.t||'';
  if(S.ptjy)b+=Math.min(.06,S.ptjy*.015);
  if(S.cfame>0&&/演員|歌手|模特|主播|藝人|網紅|設計|企劃|行銷|業務/.test(t))b+=Math.min(.1,S.cfame/1000);
  if(S.clubLead&&/主管|經理|企劃|行銷|業務|教師|老師|管理/.test(t))b+=.04;
 }catch(e){}
 return b;
};
const _pp70=ptPay;
ptPay=function(){
 const o0=S.ptj;
 _pp70();
 try{
  const o=S.ptj;
  if(o0)S.ptjy=Math.min(8,(S.ptjy||0)+(o0.h>=10?1:.5));
  if(o&&o===o0&&o.yrs>=2&&!o.lead&&o.h>=10&&chance(.3)){o.lead=true;mFix();S.skl.lead=Math.min(100,(S.skl.lead||0)+3);log(`兼職「${ptJob(o.id).t}」：店長升你當組長，時薪加成約 12%，領導力提升。`,'good')}
 }catch(e){}
};
E[E.length]={id:'clubld',min:15,max:22,w:4,if:()=>!!S.school&&!S.clubLead&&(S.friends.length>=3),run:()=>({t:'社團改選幹部，學長姐推薦你出來擔任社長／幹部。',c:[
 ch('接下幹部',()=>{S.clubLead=1;mFix();S.skl.lead=Math.min(100,(S.skl.lead||0)+4);S.skl.comm=Math.min(100,(S.skl.comm||0)+2);S.stress=cl(S.stress+4);S.grade=cl(S.grade-2);chg('happy',3);return G('你當上社團幹部，學到帶人與溝通，履歷也更好看（求職加分），但時間被切走一些。')}),
 ch('婉拒',()=>N('你把時間留給自己。'))]})};
/* ---- 股利：從持股價值配出現金（總報酬不變），台灣居民併計或分離課稅＋二代健保補充保費 ---- */
const DVY={bond:.025,tw:.033,us:.014,jp:.02,eu:.033,gold:0,btc:0};
const _pfy70=pfYear;
pfYear=function(){
 _pfy70();
 try{
  if(!S.pf||S.age<18)return;let d=0;
  for(const k in S.pf){const y=DVY[k]!=null?DVY[k]:.02,v=S.pf[k]||0;if(v>0&&y>0){const x=Math.round(v*y);S.pf[k]=v-x;d+=x}}
  if(d>0){ldset('股利與利息收入');S.money+=d;ldset(null);S.divY=(S.divY||0)+d;log(`今年投資組合配發股利與利息 ${money(d)}，已入現金（持股價值同額減少，總報酬不變）。`,'good')}
 }catch(e){}
};
const _y70c=yearly;
yearly=function(){
 _y70c();
 try{
  const d=S.divY||0;S.divY=0;
  if(!d||S.dead||(S.cn||'TW')!=='TW')return;
  const own=txIncome(),b=txCalc(own).mine,a=txCalc(own+d).mine;
  const merge=Math.max(0,a-b-Math.min(Math.round(d*.085),80000)),sep=Math.round(d*.28),inc=Math.min(merge,sep),nhi=d>=20000?Math.round(d*.0211):0;
  if(inc+nhi<=0)return;
  ldset('股利所得稅與補充保費');S.money-=inc+nhi;ldset(null);
  log(`股利申報：${merge<=sep?'併入綜合所得（可抵減 8.5%）':'分離課稅 28%'}，所得稅 ${money(inc)}${nhi?`，二代健保補充保費 ${money(nhi)}`:''}。`);
 }catch(e){}
};
/* ---- 字級比例：頁標 17／區塊標 13／項目標題 15／內文 14／註解 12，並簡化裝飾 ---- */
(function(){try{
 const st=document.createElement('style');
 st.textContent=`
.pane h3,.sh b{font-size:17px;margin:2px 0 8px}
.sec{font-size:13px;letter-spacing:.5px;text-transform:none;margin:16px 0 6px;color:var(--mute);font-weight:700}
.item{padding:10px 12px;margin:6px 0;box-shadow:none}
.item b{font-size:15px;font-weight:700}
.item .sub,.sub{font-size:12.5px;line-height:1.5}
.pane p{font-size:14px;line-height:1.55}
.btn{font-size:15px;min-height:56px;margin:6px 0;box-shadow:none}
.btn small{font-size:12px}
.tile{font-size:13.5px;min-height:92px}
.tile small{font-size:11px}
.yr h4{font-size:16px}.yr h4 small{font-size:12px}
.ln{font-size:14.5px}
.mini{font-size:13px;min-height:40px;padding:8px 12px}
.msg{font-size:13.5px}
table.rt{font-size:12.5px}
.sec::after{display:none}.sec.cz{border-bottom:1px solid var(--line);padding-bottom:5px}.sec.cz::after{display:block;flex:none;height:auto;background:none;margin-left:auto;color:var(--acc)}
`;
 document.head.appendChild(st);
}catch(e){}})();
/* ---- 家庭財務事件（父母醫療／孝親費／手足借錢）與伴侶事業曲線 ---- */
function fpar(){return [S.mom,S.dad].filter(x=>x&&x.alive&&S.age+(x.off||28)>=58)}
E[E.length]={id:'pmed',min:28,max:80,w:5,if:()=>fpar().length>0&&S.age>=25,run:()=>{const p=pick(fpar()),c=Math.round(R(15,60)*1e4/1e4)*10000;return {t:`${p.role}${p.n}生病住院，自費項目與看護費用約 ${money(c)}。`,c:[
 ch('全額負擔',()=>{ldset('父母醫療費',p.n);S.money-=c;ldset(null);p.rel=cl(p.rel+8);chg('happy',-1);return G(`你付了 ${money(c)} 醫藥費，${p.role}很安心。`)}),
 ch('跟手足分攤一半',()=>{ldset('父母醫療費',p.n);S.money-=Math.round(c/2);ldset(null);p.rel=cl(p.rel+3);return N(`你分攤 ${money(Math.round(c/2))}。`)}),
 ch('只用健保，不另外花錢',()=>{p.rel=cl(p.rel-10);chg('happy',-4);return B(`${p.role}只好硬撐，你心裡過意不去。`)})]}}};
E[E.length]={id:'psup',min:35,max:70,w:5,if:()=>fpar().some(p=>S.age+(p.off||28)>=65)&&!S.psup,run:()=>{const p=pick(fpar().filter(p=>S.age+(p.off||28)>=65));return {t:`${p.role}${p.n}退休後生活不寬裕，你要固定給孝親費嗎？`,c:[
 ch('每月 1 萬',()=>{S.psup={n:p.n,a:120000};p.rel=cl(p.rel+10);return G('你每月固定孝親費 1 萬，一年 12 萬。')}),
 ch('每月 3 千',()=>{S.psup={n:p.n,a:36000};p.rel=cl(p.rel+4);return N('你每月固定孝親費 3 千，一年 3.6 萬。')}),
 ch('目前沒辦法',()=>{p.rel=cl(p.rel-4);return N('你說等經濟寬裕再說。')})]}}};
E[E.length]={id:'sibloan',min:22,max:60,w:4,if:()=>S.friends.some(f=>f.sib)&&S.money>300000,run:()=>{const f=pick(S.friends.filter(x=>x.sib)),a=R(10,40)*10000;return {t:`${f.n}手頭緊，開口跟你借 ${money(a)}。`,c:[
 ch('借他',()=>{ldset('借給手足',f.n);S.money-=a;ldset(null);f.rel=cl(f.rel+6);(S.sbl=S.sbl||[]).push({n:f.n,a,t:R(1,4),ok:chance(.55)});return N(`你借了 ${money(a)}，對方說會還。`)}),
 ch('婉拒',()=>{f.rel=cl(f.rel-8);return N('你說自己也有開銷，對方有些失望。')})]}}};
const _y70d=yearly;
yearly=function(){
 _y70d();
 try{
  if(S.dead)return;
  if(S.psup){const p=[S.mom,S.dad].find(x=>x&&x.n===S.psup.n);if(!p||!p.alive)S.psup=null;else if(S.money>0||true){ldset('孝親費',S.psup.n);S.money-=S.psup.a;ldset(null)}}
  if(S.sbl){S.sbl=S.sbl.filter(l=>{if(--l.t>0)return true;if(l.ok){ldset('手足還款',l.n);S.money+=l.a;ldset(null);log(`${l.n}把借的 ${money(l.a)} 還給你了。`,'good')}else log(`${l.n}借的 ${money(l.a)} 一直沒還，你也不好意思追。`,'bad');return false})}
  const p=S.partner;
  if(p&&(p.married||p.cohab)&&S.age>=22){
   const pa=S.age+(p.off||0);
   if(pa<58&&!p.jl){p.inc=Math.round(p.inc*1.02/1e4)*1e4;const r=Math.random();
    if(r<.10){const g=1+R(8,22)/100;p.inc=Math.min(4e6,Math.round(p.inc*g/1e4)*1e4);log(`${p.n}升職加薪，年收入約提高到 ${money(p.inc)}。`,'good')}
    else if(r<.14){const g=1+R(15,40)/100;p.inc=Math.min(4e6,Math.round(p.inc*g/1e4)*1e4);log(`${p.n}跳槽成功，年收入約 ${money(p.inc)}。`,'good')}
    else if(r<.17){p.jl=R(1,2);log(`${p.n}被公司裁員，這陣子沒有收入。`,'bad')}
    else if(r<.19&&pa>=30){if(chance(.5)){p.inc=Math.min(5e6,Math.round(p.inc*1.5/1e4)*1e4);log(`${p.n}創業有成，年收入約 ${money(p.inc)}。`,'good')}else{p.inc=Math.max(2e5,Math.round(p.inc*.7/1e4)*1e4);log(`${p.n}創業失利，回頭找工作，收入少了一些。`,'bad')}}
   }
  }
 }catch(e){}
};
/* ---- 新手導覽（首次自動出現一次，更多→系統→新手導覽可重看）---- */
const TOUR=[
 ['點中間的圓形按鈕「過一年」，人生就往前走一歲；每年會出現需要你做選擇的事件。','下一步'],
 ['上方有健康、快樂、智力、外貌四項能力，點它可看「能力總覽」，一次看到所有能力與技能。','下一步'],
 ['下方分頁：活動（運動、打工、比賽、才藝）、關係、工作、資產、更多。每年的行動點數有限，挑重要的做。','下一步'],
 ['資產頁可存活存、定存、買股票與房子；「年度收支」會列出每一筆收入、支出與每位家人的部分。','下一步'],
 ['遊戲會自動存檔（右上顯示存檔時間）。準備好了就開始吧。','開始玩']
];
function tourStep(i){
 if(i>=TOUR.length){try{localStorage.setItem('lifesim_tour_v2','1')}catch(e){}return}
 ask(`新手導覽 ${i+1}／${TOUR.length}\n${TOUR[i][0]}`,[TOUR[i][1],'略過導覽'],c=>{if(c===0)tourStep(i+1);else{try{localStorage.setItem('lifesim_tour_v2','1')}catch(e){}}});
}
const _lh70=lfHandle;
lfHandle=function(x,y,z,u){if(x==='tour'){tourStep(0);return null}return _lh70(x,y,z,u)};
const _au70=ageUp;
ageUp=function(){
 const r=_au70.apply(this,arguments);
 try{if(S&&S.age<=2&&!S.dead&&typeof localStorage!=='undefined'&&!localStorage.getItem('lifesim_tour_v2')){localStorage.setItem('lifesim_tour_v2','0');setTimeout(()=>tourStep(0),400)}}catch(e){}
 return r;
};
/* ---- 年度收支長條圖（近 12 期收入／支出）---- */
const _lhh70=ledHTML;
ledHTML=function(){
 let h=_lhh70();
 try{
  ldCur();const all=S.ld.hist.concat([S.ld.cur]).slice(-12),v=all.map(c=>{const t=ldSum(c);return {a:c.age,i:t.i,e:t.e}});
  const mx=Math.max(1,...v.map(x=>Math.max(x.i,x.e))),W=330,H=110,bw=Math.floor(W/v.length),g=Math.max(1,Math.floor(bw*.12)),hw=Math.floor((bw-g)/2);
  let s=`<svg viewBox="0 0 ${W} ${H+16}" width="100%" role="img" aria-label="近年收入與支出長條圖">`;
  v.forEach((x,k)=>{const X=k*bw,hi=Math.round(x.i/mx*H),he=Math.round(x.e/mx*H);
   s+=`<rect x="${X}" y="${H-hi}" width="${hw}" height="${hi}" fill="#2f855a" rx="2"/><rect x="${X+hw}" y="${H-he}" width="${hw}" height="${he}" fill="#c0553a" rx="2"/><text x="${X+hw}" y="${H+12}" font-size="9" text-anchor="middle" fill="#8a7f72">${x.a}</text>`});
  s+='</svg>';
  const box=`<div class="item"><b>近 ${v.length} 年收支</b><div class="sub"><span style="color:#2f855a">■</span> 收入　<span style="color:#c0553a">■</span> 支出　（最高 ${money(mx)}）</div>${s}</div>`;
  const k=h.indexOf('<div class="sec">收入</div>');if(k>=0)h=h.slice(0,k)+box+h.slice(k);
 }catch(e){}
 return h;
};
const LSUBT={art:'藝術',av:'頭像',ch:'人生記錄',dx:'圖鑑',eth:'倫理與價值',health:'健康',hs:'房市',led:'年度收支',rg:'宗教',set:'設定',si:'社會保險',skill:'個性與技能',stat:'能力總覽',sv:'存檔',tl:'人生時間軸',wd:'世界',ach:'成就與結局',tree:'家族史',rev:'年度回顧',pol:'政策與補助'};
/* ---- 網路交友：關係頁可主動認識網友、互動、見面、告白 ---- */
const ONST=['文字聊天','視訊往來','已見過面'];
function onSeek(goal){
 if(S.on)return B('你目前已有固定往來的網友，先結束或發展這段關係。');
 if(S.age<14)return B('年紀還小，先把時間放在學校與家人身上。');
 if(S.ap<1)return B('今年行動點數用完了。');
 S.ap--;const opp=S.sx==='男'?'女':'男';
 const sx=goal==='love'?(S.ori==='異性戀'?opp:S.ori==='同性戀'?S.sx:pick([opp,S.sx])):(chance(.5)?'男':'女');
 const cn=pick(XC.filter(k=>k!==(S.cn||'TW'))),key=XNK[cn],n=key?nameOf(key,sx):fullName(sx),plat=pick(PLAT);
 if(goal==='love'&&S.age<18)return B('未成年不適合在網路上找對象，先交朋友就好。');
 S.on={n,sx,cn,rel:R(35,55),st:0,a:R(0,ARCH.length-1),since:S.age,plat,goal};
 S.net=cl((S.net||0)+2);
 return G(`你在${plat}認識了來自${CNAME[cn]}的${n}，開始固定聊天。`);
}
function onDo(k){
 if(k==='love')return onSeek('love');if(k==='friend')return onSeek('friend');
 const o=S.on;if(!o)return N('目前沒有網友。');
 if(k==='end'){S.on=null;S.flags.xnetDone=1;return N(`你和${o.n}的往來告一段落。`)}
 const need=k==='chat'||k==='vid'||k==='gift'||k==='meet'||k==='conf';
 if(need&&S.ap<1&&k!=='conf')return B('今年行動點數用完了。');
 o.since=S.age;
 if(k==='chat'){S.ap--;o.rel=cl(o.rel+R(2,6));S.stress=cl(S.stress-1);return G(`你和${o.n}聊了一整晚，感情更近了。`)}
 if(k==='vid'){if(o.rel<45)return B('彼此還不夠熟，對方想再聊聊。');S.ap--;o.st=Math.max(o.st,1);o.rel=cl(o.rel+R(4,9));chg('happy',2);return G(`你和${o.n}視訊聊天，更有親切感。`)}
 if(k==='gift'){const c=R(8,25)*100;if(S.money<c)return B('你的錢不夠。');S.ap--;ldset('網友禮物',o.n);S.money-=c;ldset(null);o.rel=cl(o.rel+R(5,10));return G(`你寄了小禮物給${o.n}（${money(c)}），對方很感動。`)}
 if(k==='meet'){if(o.st<1||o.rel<60)return B('還需要多視訊、增進感情，才適合見面。');if(S.age<18)return B('未成年不適合單獨見網友。');const c=flightCost(o.cn);if(S.money<c)return B(`機票與住宿約 ${money(c)}，你的錢不夠。`);S.ap--;S.money-=c;o.st=2;o.rel=cl(o.rel+R(-6,12));chg('happy',5);return G(`你飛到${CNAME[o.cn]}見到${o.n}，花了 ${money(c)}。`)}
 if(k==='conf'){if(!romOK())return B('目前不適合發展成戀愛關係。');if(o.st<2||o.rel<75)return B('感情還不夠穩，先多互動、見面。');const e=E.find(x=>x.id==='xconf');return e.run().c[0].f()}
 return N('');
}
function onHTML(){
 if(S.age<14||S.dead)return '';
 let h='<div class="sec">網路交友</div>';
 const o=S.on;
 if(!o)return h+`<div class="item"><div class="sub">認識來自世界各地的網友，聊天、視訊、見面，感情夠深還能發展成遠距離戀愛。每次 1 點行動點數。</div><button class="btn" data-a="on:friend">認識新網友（交朋友）</button>${S.age>=18?'<button class="btn" data-a="on:love">認識新網友（希望發展感情）</button>':''}</div>`;
 const dis=S.jail?'disabled':'';
 h+=`<div class="item"><b>${esc(o.n)}</b>・${esc(CNAME[o.cn])}・${ONST[Math.min(2,o.st)]}<div class="sub">認識於${esc(o.plat)}・好感 ${o.rel}${romOK()?'・你們可以發展感情':''}</div><div class="bar"><i style="width:${o.rel}%"></i></div></div>`;
 h+=`<button class="btn" data-a="on:chat" ${dis}>傳訊息聊天<small>好感 +，1 點行動點數</small></button><button class="btn" data-a="on:vid" ${dis}>視訊通話<small>好感 45 以上才適合</small></button><button class="btn" data-a="on:gift" ${dis}>寄小禮物<small>約 NT$800～2,500</small></button><button class="btn" data-a="on:meet" ${dis}>去見面<small>先視訊、好感 60 以上；費用含機票</small></button>`;
 if(romOK())h+=`<button class="btn" data-a="on:conf" ${dis}>告白<small>見過面且好感 75 以上</small></button>`;
 h+=`<button class="btn" data-a="on:end">結束往來</button>`;
 return h;
}
const _rh70=relHTML;relHTML=function(){return _rh70()+onHTML()};
const _hd70=handle;
handle=function(a){
 if(typeof a==='string'&&S&&a.startsWith('on:')){const r=onDo(a.slice(3));view.msg=r;view.tab='rel';render();showSheet('rel');return}
 return _hd70(a);
};
const _as70=applySuccession;
applySuccession=function(r,k){_as70(r,k);try{mFix();log(`第 ${S.gen||1} 代 ${S.name}（${S.sx}）的性向是「${S.ori}」，之後認識的對象會依此產生。`)}catch(e){}};
