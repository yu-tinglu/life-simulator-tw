/* ---- 疾病病程・篩檢・失能長照・家人死因（費用與成效為遊戲簡化估算，非醫療建議） ---- */
function medIdx(){return Math.pow(1.03,Math.max(0,(S.year||2026)-2026))*(S.cn&&S.cn!=='TW'?2.5:1)}
function famCause(a,f){return causePick(false,{a,f}).c}
function funeral(who){
 const c=Math.round(R(120,300)*1000*(S.fam==='富裕'?1.6:S.fam==='清寒'?.7:1)),g=Math.round(c*R(40,95)/100);
 S.money-=c-g;log(`${who}的喪禮花費約 ${money(c)}，收到奠儀 ${money(g)}。`,'bad');
}
/* 疾病定義：n 名稱、on 發病率(年)、hp 各期每年健康損失、mt 治療／未治療各期年死亡率、co 各期年自費（NT$）、cov 篩檢可偵測 */
const ILD={
 diab:{n:'糖尿病',cause:'糖尿病併發症',on:a=>a<30?0:.004+.0017*(a-30)/10,hp:[0,1,3],mt:[[.001,.01,.05],[.004,.03,.12]],co:[15000,40000,90000],pr:[.05,.25],ch:1,mx:3},
 htn:{n:'高血壓',cause:'高血壓性疾病',on:a=>a<35?0:.006+.002*(a-35)/10,hp:[0,1,2],mt:[[.001,.008,.04],[.003,.025,.1]],co:[8000,25000,60000],pr:[.04,.2],ch:1,mx:3},
 heart:{n:'冠心病／心臟病',cause:'急性心肌梗塞',on:a=>a<40?0:.003+.0016*(a-40)/10,hp:[0,1,3],mt:[[.004,.025,.09],[.02,.07,.2]],co:[30000,90000,250000],pr:[.06,.25],ch:1,mx:3},
 ckd:{n:'慢性腎臟病',cause:'慢性腎臟病（尿毒症）',on:a=>a<50?0:.003+.0015*(a-50)/10,hp:[0,1,3],mt:[[.002,.015,.07],[.01,.05,.18]],co:[10000,50000,160000],pr:[.05,.22],ch:1,mx:3},
 copd:{n:'慢性阻塞性肺病',cause:'慢性阻塞性肺病',on:a=>a<45?0:.002+.001*(a-45)/10,hp:[0,1,3],mt:[[.002,.02,.08],[.01,.06,.2]],co:[20000,60000,150000],pr:[.06,.25],ch:1,mx:3},
 liv:{n:'慢性肝病',cause:'肝硬化',on:a=>a<35?0:.002+.001*(a-35)/10,hp:[0,1,3],mt:[[.002,.02,.09],[.01,.06,.22]],co:[15000,60000,200000],pr:[.05,.22],ch:1,mx:3},
 dem:{n:'失智症',cause:'失智症',on:a=>a<65?0:.006+.004*(a-65)/5,hp:[0,1,2],mt:[[.01,.04,.12],[.02,.06,.16]],co:[30000,60000,100000],pr:[.12,.2],ch:1,mx:3},
 ca:{n:'癌症',cause:'癌症',on:a=>a<30?0:.0012+.0014*(a-30)/10,hp:[1,3,6,10],mt:[[.01,.04,.12,.32],[.05,.15,.35,.6]],co:[150000,300000,600000,900000],pr:[.12,.45],ch:0,mx:4}
};
function illAdj(k){
 const sm=S.flags.smoker,ad=S.addict,al=ad&&ad.k==='酒精';let m=1;
 if(S.health<45)m*=1.5;else if(S.health>80)m*=.7;
 if(k==='copd')m*=sm?4:.5;if(k==='liv'&&al)m*=1+ad.lv*.4;
 if(k==='heart'||k==='htn')m*=(S.stress>70?1.3:1)*(sm?1.4:1);
 if(k==='diab')m*=S.money<3e5?1.2:1;
 if(k==='ca'){m*=(sm?1.5:1)*(al?1.3:1)*(S.flags.caHx?2:1)}
 if(k==='dem')m*=S.edu>=5?.8:1;
 if(S.sx==='女'){m*={heart:.55,liv:.5,copd:.5,htn:.85,diab:.9,ckd:.9}[k]||1}
 return m;
}
const CAT_F=[['乳癌',16,1,0],['肺癌',20,1,1],['大腸癌',14,1,1],['肝癌',10,0,0],['胰臟癌',6,0,0],['卵巢癌',4,0,0],['子宮頸癌',3,1,0],['胃癌',4,0,0]];
const CAT_M=[['肺癌',20,1,1],['肝癌',16,0,0],['大腸癌',13,1,1],['口腔癌',10,1,1],['攝護腺癌',8,0,0],['胰臟癌',5,0,0],['食道癌',6,0,0],['胃癌',4,0,0]];
function newCancer(){const l=(S.sx==='女'?CAT_F:CAT_M).map(x=>[x,x[1]*((x[0]==='肺癌'||x[0]==='口腔癌'||x[0]==='食道癌')&&S.flags.smoker?2:1)*(x[0]==='攝護腺癌'&&S.age<55?.1:1)*(x[0]==='乳癌'&&S.age<35?.3:1)]);const x=wp(l);return {k:'ca',n:x[0],cause:x[0],cov:x[3]}}
const ONS={diab:.35,htn:.3,heart:.42,ckd:.45,copd:.42,liv:.3,dem:.75,ca:.8};
function illInit(){if(!S.ill)S.ill=[];if(S.dis==null)S.dis=0;if(!S.care)S.care=null;if(!S.pcare)S.pcare=null;if(S.scrAt==null)S.scrAt=-9}
function illRate(i,known){const d=ILD[i.k],st=Math.min(i.st,d.mx)-1;const tx=known&&i.tx>0;return d.mt[tx?0:1][st]*(tx?.6:.5)*(i.tx===2?.65:1)}
function illCost(i){const d=ILD[i.k];return Math.round(d.co[Math.min(i.st,d.mx)-1]*medIdx()*(i.tx===2?2.2:1))}
function illYear(){
 illInit();const a=S.age;
 /* 發病（先潛伏） */
 if(a>=30)for(const k in ILD){if(S.ill.some(x=>x.k===k))continue;if(k==='ca'&&S.ill.some(x=>x.k==='ca'&&!x.cured&&x.st>=1))continue;
  if(chance(ILD[k].on(a)*illAdj(k)*(ONS[k]||1))){const o=k==='ca'?newCancer():{k,n:ILD[k].n,cause:ILD[k].cause};o.st=1;o.hid=true;o.tx=0;o.yrs=0;o.at=a;S.ill.push(o)}}
 /* 病程 */
 for(const i of S.ill){const d=ILD[i.k];if(i.cured)continue;i.yrs++;
  const known=!i.hid;
  if(!known){const sym=i.st>=2&&chance(.45)||chance(.12+(S.health<40?.1:0));
   if(sym&&i.st>=1){i.hid=false;i.tx=0;i.dec=0;i.dxAt=a;log(`你身體不太對勁，就醫後確診${i.n}${d.ch?'':`（第 ${i.st} 期）`}。`,'bad');S.stress=cl(S.stress+10);chg('happy',-6);queue.push(DECEV)}}
  if(i.tx===0||i.hid){if(chance(d.pr[1]*.55*(i.st<d.mx?1:0)))i.st++}
  else if(chance(d.pr[0]*(i.tx===2?.7:1)*(i.st<d.mx?1:0)))i.st++;
  if(!i.hid){
   if(i.tx>0){i.ty=(i.ty||0)+1;const c=illCost(i);if(S.money<c&&S.money<c*.3){i.tx=0;log(`你付不起${i.n}的治療費，被迫中斷治療。`,'bad')}else{S.money-=c;if(c>200000)log(`${i.n}治療的自費、交通與看護開銷約 ${money(c)}。`,'bad')}}
   chg('health',-d.hp[Math.min(i.st,d.mx)-1]*(i.tx>0?.6:1));if(i.st>=2)S.stress=cl(S.stress+3);
   if(i.k==='ca'&&i.tx>0&&((i.st<=2&&i.ty>=3&&chance(.7))||(i.st===3&&i.ty>=5&&chance(.3)))){i.cured=true;S.flags.caHx=1;chg('happy',15);S.stress=cl(S.stress-20);log(`${i.n}經過治療追蹤，醫師說你已進入緩解期，要定期回診。`,'good')}
   else if(d.ch===1&&i.tx>0&&i.st===1&&chance(.04)&&i.yrs>3){}}
 }
 S.ill=S.ill.filter(x=>!x.cured||true);
}
function illDeath(){
 illInit();
 for(const i of S.ill){if(i.cured)continue;if(chance(illRate(i,!i.hid))){S.causeK='ill';return i.cause}}
 return null;
}
/* 失能與照護 */
function disYear(){
 illInit();const a=S.age;
 if(a>=60){let p=(a-60)*.002+(S.health<40?.03:0)+(S.health<20?.04:0);
  if(S.ill.some(x=>x.k==='dem'&&!x.cured))p+=.15;if(S.ill.some(x=>x.k==='ca'&&!x.cured&&x.st>=4))p+=.15;if(S.ill.some(x=>x.k==='ckd'&&x.st>=3))p+=.05;
  if(S.dis<3&&chance(p)){S.dis++;chg('happy',-8);log(['','你的行動開始需要別人幫忙（輕度失能）。','你的失能程度加重了（中度失能），日常生活需要照顧。','你幾乎臥床，需要全天候照顧（重度失能）。'][S.dis],'bad');if(!S.care||S.care.lv<S.dis)queue.push(CAREEV)}}
 if(S.dis>=1&&S.care){const c=S.care,cost=Math.round(c.cost*medIdx()*(.6+S.dis*.4));
  if(c.k==='fam'){chg('happy',-1)}else{S.money-=cost;if(cost>100000)log(`${c.n}今年費用約 ${money(cost)}。`,'bad')}
  if(c.k==='none'){chg('health',-R(1,3));chg('happy',-4)}else chg('health',c.q)}
 else if(S.dis>=1){chg('health',-R(1,3));chg('happy',-4)}
 /* 父母照護 */
 for(const p of [S.mom,S.dad]){if(!p||!p.alive)continue;const pa=p.off+a;
  if(pa>=75&&!p.need&&chance(.07+(pa-75)*.01)){p.need=1;log(`你的${p.role}${p.n}行動不便，需要人照顧。`,'bad');queue.push(pcareEv(p))}
  if(p.need&&p.pc){const c=p.pc;if(c.k==='self'){S.stress=cl(S.stress+6);S.ap=Math.max(0,S.ap-1);S.money-=0;chg('happy',-2)}else{const cost=Math.round(c.cost*medIdx());S.money-=cost;if(cost>100000)log(`${p.role}的${c.n}今年費用約 ${money(cost)}。`,'bad')}}
  else if(p.need&&!p.pc){p.rel=cl(p.rel-3)}
  if(p.need&&!p.pc&&chance(.12)&&p.alive&&pa>=75){/* 無人照顧加重風險 */}
 }
}
const CAREOPT=[['ltc','長照 2.0 居家服務／日照',40000,.5,'政府補助多數費用，需負擔部分（一般戶約 16%），但時數有限'],['for','聘請外籍看護',360000,1.8,'月薪加仲介、保險、膳宿約 NT$28,000～30,000／月，全天照顧'],['inst','入住護理之家／安養機構',600000,2.2,'約 NT$45,000～60,000／月，專業照護'],['fam','由家人照顧',0,1,'不用花錢，但家人要承擔照顧負擔']];
const CAREEV={id:'careev',run:()=>{
 const kin=S.partner||S.kids.some(k=>k.age>=22);const opts=CAREOPT.filter(o=>o[0]!=='fam'||kin);
 return {t:`你的失能程度已達${['','輕度','中度','重度'][S.dis]}，需要安排長期照顧。`,c:opts.map(o=>ch(`${o[1]}（約 ${money(Math.round(o[2]*medIdx()))}／年）`,()=>{S.care={k:o[0],n:o[1],cost:o[2],q:o[3],lv:S.dis};if(o[0]==='fam'){chg('happy',2);return N('家人輪流照顧你，你有些過意不去。')}return N(`你選擇了${o[1]}。${o[4]}。`)})).concat([ch('先硬撐，不安排',()=>{S.care={k:'none',n:'無人照顧',cost:0,q:0,lv:S.dis};return B('你沒有安排任何照顧，生活品質和健康一路下滑。')})])}}};
function pcareEv(p){return {id:'pcare',run:()=>{
 if(!p.alive)return null;
 const o=[['ltc','申請長照 2.0',40000,'政府補助多數費用'],['for','聘請外籍看護',360000,'全天照顧'],['inst','送進護理之家',600000,'專業照護']];
 return {t:`${p.role}${p.n}需要長期照顧，你要怎麼安排？`,c:[ch('自己和家人輪流照顧（壓力大、佔用時間）',()=>{p.pc={k:'self',n:'家人照顧',cost:0};p.rel=cl(p.rel+8);return N('你扛起照顧責任，疲累但問心無愧。')})].concat(o.map(x=>ch(`${x[1]}（約 ${money(Math.round(x[2]*medIdx()))}／年）`,()=>{p.pc={k:x[0],n:x[1],cost:x[2]};p.rel=cl(p.rel+5);return N(`你為${p.role}安排了${x[1]}。`)})))}}}}
/* 確診後的治療決定 */
const DECEV={id:'illdec',run:()=>{
 const i=(S.ill||[]).find(x=>!x.hid&&!x.cured&&!x.dec);if(!i)return null;i.dec=1;const d=ILD[i.k];
 const c=illCost(i),adv=Math.round(c*2.2);
 const l=[ch(`標準治療（健保為主，今年約 ${money(c)}）`,()=>{i.tx=1;return N(`你開始接受${i.n}的標準治療。`)})];
 if(d.mx===4)l.push(ch(`標準＋自費標靶／免疫治療（約 ${money(adv)}／年）`,()=>{i.tx=2;return N('你選擇了自費的新藥治療，希望爭取更好的結果。')}));
 l.push(ch('民俗偏方、保健品（便宜但沒有實證）',()=>{i.tx=0;S.money-=30000;return B('你花了錢買偏方，但病情並沒有好轉。')}));
 l.push(ch('先不治療，順其自然',()=>{i.tx=0;chg('happy',-3);return B('你決定先不處理。')}));
 return {t:`醫師診斷你罹患${i.n}${d.mx===4?`（第 ${i.st} 期）`:'（'+['初期控制','出現併發症','嚴重'][i.st-1]+'）'}。你打算怎麼做？`,c:l}}};
/* 篩檢 */
function scrFree(){const a=S.age,y=S.age-S.scrAt;return y>=(a>=65?1:3)&&a>=40}
function screen(kind){
 illInit();if(S.acts.scr)return B('今年已經檢查過了。');
 const a=S.age,f=S.sx==='女',idx=medIdx();let cost=0,txt='',det=0;
 if(kind==='basic'){const fr=a>=40&&(a>=65||a-S.scrAt>=3);cost=fr?0:Math.round(3500*idx);if(S.money<cost)return B('你的錢不夠。');S.money-=cost;if(fr)S.scrAt=a;
  for(const i of S.ill)if(i.hid&&!i.cured&&i.k!=='ca'&&chance(.85)){i.hid=false;i.tx=0;i.dec=0;det++;log(`健檢發現${i.n}。`,'bad');S.stress=cl(S.stress+6);queue.push(DECEV)}
  txt=fr?'做了免費成人預防保健':`自費健康檢查花了 ${money(cost)}`}
 else if(kind==='ca'){const el=(a>=50&&a<=74)||(f&&a>=45&&a<=69)||(a>=30&&f)||(a>=30&&(S.flags.smoker||(S.addict&&S.addict.k==='抽菸')));
  cost=el?0:Math.round(6000*idx);if(S.money<cost)return B('你的錢不夠。');S.money-=cost;
  for(const i of S.ill)if(i.hid&&!i.cured&&i.k==='ca'&&chance(i.cov?.75:.15)){i.hid=false;i.tx=0;i.dec=0;det++;log(`篩檢發現${i.n}（第 ${i.st} 期）。`,'bad');S.stress=cl(S.stress+10);queue.push(DECEV)}
  txt=el?'做了符合資格的免費癌症篩檢（大腸、乳房、子宮頸、口腔等）':`自費做了癌症篩檢 ${money(cost)}`}
 else{cost=Math.round(25000*idx);if(S.money<cost)return B('你的錢不夠。');S.money-=cost;
  for(const i of S.ill)if(i.hid&&!i.cured&&chance(.75)){i.hid=false;i.tx=0;i.dec=0;det++;log(`高階健檢發現${i.n}${i.k==='ca'?`（第 ${i.st} 期）`:''}。`,'bad');S.stress=cl(S.stress+8);queue.push(DECEV)}
  txt=`自費高階健檢（含胃鏡、腹部超音波、低劑量電腦斷層）花了 ${money(cost)}`}
 S.acts.scr=1;
 if(!det){S.stress=cl(S.stress-4);return G(`你${txt}，沒有發現異常。`)}
 return N(`你${txt}，發現了問題，早期發現讓治療更有機會。`);
}
/* 健康頁 */
function healthHTML(){
 illInit();let h='<h3>🩺 健康與醫療</h3>';
 const kn=S.ill.filter(x=>!x.hid&&!x.cured),cu=S.ill.filter(x=>x.cured);
 h+=`<div class="item"><b>健康 ${S.health}</b>${hbar?hbar(S.health):pbar(S.health)}<div class="sub">失能程度：${['自理','輕度失能','中度失能','重度失能'][S.dis||0]}${S.care?'・照顧安排：'+S.care.n:''}</div></div>`;
 if(!kn.length)h+='<p class="sub">目前沒有確診的疾病。潛伏的疾病要靠健檢或症狀才會發現。</p>';
 kn.forEach(i=>{const d=ILD[i.k];const ix=S.ill.indexOf(i);
  h+=`<div class="item"><b>${i.n}</b>　${d.mx===4?'第 '+i.st+' 期':['初期控制','出現併發症','嚴重'][i.st-1]}<div class="sub">治療：${['無','標準治療','自費新藥'][i.tx||0]}・預估年花費 ${money(illCost(i))}</div>
  <div class="seg" style="margin:6px 0"><button class="${!i.tx?'on':''}" data-a="lf:health:tx:${ix}:0">不治療</button><button class="${i.tx===1?'on':''}" data-a="lf:health:tx:${ix}:1">標準</button>${d.mx===4?`<button class="${i.tx===2?'on':''}" data-a="lf:health:tx:${ix}:2">自費新藥</button>`:''}</div></div>`});
 if(cu.length)h+=`<div class="sub">緩解中：${cu.map(x=>x.n).join('、')}（要定期回診）</div>`;
 const b=(k,t,sm)=>`<button class="btn" data-a="lf:health:scr:${k}" ${S.acts.scr?'disabled':''}>${t}<small>${sm}</small></button>`;
 h+='<div class="sec">檢查</div>'+b('basic','🩸 成人預防保健／健康檢查',S.age>=40?(S.age>=65||S.age-S.scrAt>=3?'符合資格，免費':'還沒到免費時間，自費約 NT$3,500'):'40 歲前自費約 NT$3,500')+b('ca','🔬 癌症篩檢','符合條件（如 50～74 歲大腸癌糞便潛血、45～69 歲女性乳房攝影、30 歲以上子宮頸抹片、有菸檳習慣者口腔黏膜）免費，其餘自費約 NT$6,000')+b('adv','🏥 高階健檢','自費約 NT$25,000・能偵測更多種疾病');
 h+='<p class="sub">疾病機率、費用、成效為遊戲簡化估算，並非醫療建議；現實中請依國健署與醫師建議檢查。</p>';
 return h+`<button class="btn" data-a="back">← 返回</button>`;
}
const _lfH18=lfHandle;
lfHandle=function(x,y,z,u){
 if(x==='health'){illInit();
  if(y==='scr')return screen(z);
  if(y==='tx'){const i=S.ill[+z];if(!i||i.hid)return null;i.tx=+u;i.dec=1;return N(`${i.n}的治療方式改為「${['不治療','標準治療','自費新藥'][+u]}」。`)}
  return null}
 return _lfH18(x,y,z,u)};
const _lifeHTML18=lifeHTML;
lifeHTML=function(){return view.lsub==='health'?healthHTML():_lifeHTML18()};
const _more18=moreHTML;
moreHTML=function(){return _more18().replace('<button class="tile" data-a="lf:set">',`<button class="tile" data-a="lf:health"><b>🩺</b>健康醫療<small>疾病・健檢・長照</small></button><button class="tile" data-a="lf:set">`)};
/* 年度掛鉤 */
const _yearly18=yearly;
yearly=function(){_yearly18();try{illYear();disYear()}catch(e){console.error&&0;throw e}};
/* 死亡檢查：疾病優先，其餘為基礎死亡率 */
const _dc18=deathCheck;
deathCheck=function(){
 illInit();
 const a=S.age;
 if(a>=112)return _dc18();
 const c=illDeath();if(c)return c;
 const o=S.dis>=2&&S.care&&S.care.k==='none'&&chance(.04);if(o){S.causeK='x';return pick(['肺炎','敗血症','跌倒意外'])}
 return _dc18();
};
/* ---- 生活開銷（家庭收支調查：消費約占可支配所得 76%）---- */
function lifeStyle(){
 if(!S.job||S.job.founder||S.age<22||S.age>=65||S.jail)return;
 const x=Math.round(.76*S.job.sal*.92-livingCost());
 if(x>0)S.money-=x;
}
const _yearly18b=yearly;
yearly=function(){_yearly18b();lifeStyle();histCalamity()};
/* ---- 在地事件 ---- */
function insHome(){return !!S.flags.insH}
function lossPay(loss,what){
 let pay=0;if(insHome()&&what==='quake')pay=Math.min(loss,1500000);else if(insHome()&&what==='fire')pay=Math.min(loss,loss);
 S.money-=loss-pay;return pay;
}
const HCAL={1999:['九二一大地震',3,.9],2016:['美濃大地震',2,.25],2018:['花蓮地震',2,.2],2024:['花蓮 0403 強震',2,.2]};
function histCalamity(){
 for(const e of COVS)if(e.if())queue.push(e);
 const c=HCAL[S.year];if(!c||S.age<3)return;
 if(c[0]==='九二一大地震'||chance(c[2]))queue.unshift({id:'hcal',run:()=>{
  const own=!!S.house,big=c[0]==='九二一大地震'&&S.age>=3;
  chg('happy',-5);S.stress=cl(S.stress+(big?15:6));
  if(own&&chance(big?.35:.1)){const l=Math.round((big?R(300,1500):R(30,200))*1000);const p=lossPay(l,'quake');return [`${S.year} 年${c[0]}：房屋受損，修繕花費 ${money(l)}${p?`，地震險理賠 ${money(p)}`:''}。`,'bad']}
  return [`${S.year} 年${c[0]}發生，全台震動，你和家人平安。`,'bad']}});
}
if(typeof E!=='undefined')E.push(
{id:'typh2',min:8,max:100,w:2,run:()=>{
 if(!(S.house||S.car))return [`颱風停班停課一天，你在家看電視、吃泡麵。`,''];
 return {t:'強烈颱風夾帶豪雨，你住的地方淹水了。',c:[
  ch('清理並修繕',()=>{const l=R(30,250)*1000;S.money-=l;S.stress=cl(S.stress+5);return B(`清理、修繕與汽機車泡水損失約 ${money(l)}。`)}),
  ch('全家先避難',()=>{S.stress=cl(S.stress+3);chg('happy',-2);return N('你們住到親友家，隔天水退才回去。')})]}}},
{id:'quake2',min:10,max:100,w:1,if:()=>!!S.house,run:()=>({t:'一場芮氏規模 6 以上的地震造成房屋牆壁龜裂。'+(insHome()?'你有投保住宅地震基本保險。':''),c:[
  ch('找工班修繕',()=>{const l=R(80,600)*1000;const p=lossPay(l,'quake');S.stress=cl(S.stress+4);return B(`修繕費 ${money(l)}${p?`，地震險理賠 ${money(p)}`:''}。`)}),
  ch('先觀察，不處理',()=>{if(chance(.3)){const l=R(200,800)*1000;S.money-=l;return B(`裂縫擴大，後來花了 ${money(l)} 處理。`)}return N('暫時沒有惡化。')})]})},
{id:'insh',min:25,max:90,w:2,if:()=>!!S.house&&!S.flags.insH,run:()=>({t:'銀行房貸文件提到住宅火險與地震基本保險（保費約 NT$1,500／年，地震全損最高約 150 萬）。',c:[
  ch('投保',()=>{S.flags.insH=1;S.money-=1500;return G('你投保了住宅火險＋地震基本保險。')}),ch('不用',()=>N('你覺得機率很低。'))]})},
{id:'bonus',min:22,max:64,w:3,if:()=>S.job&&!S.job.founder&&!S.school,run:()=>{const b=Math.round(S.job.sal/12*R(10,30)/10);S.money+=b;chg('happy',3);return [`公司發放年終獎金 ${money(b)}。`,'good']}},
{id:'inv',min:18,max:90,w:2,run:()=>{if(chance(.12)){const g=pick([200,1000,10000]);S.money+=g;return [`你的統一發票中了 ${money(g)}！`,'good']}chg('happy',1);return [`你整理了一疊統一發票，沒有中獎。`,'']}},
{id:'mazu',min:5,max:100,w:2,run:()=>{chg('happy',4);return [`春天媽祖遶境，你跟著人潮看了一晚熱鬧。`,'good']}},
{id:'scam',min:20,max:90,w:2,run:()=>({t:'你接到自稱檢警或電商客服的電話，說你的帳戶涉案，要你轉帳「保管」。',c:[
  ch('掛掉電話，打 165 反詐騙專線',()=>{S.karma=cl(S.karma+1);return G('你確認是詐騙，沒有損失。')}),
  ch('照指示操作',()=>{const l=Math.min(Math.max(0,S.money)*.5,R(100,800)*1000);S.money-=l;S.stress=cl(S.stress+10);chg('happy',-8);return B(`你被騙走 ${money(Math.round(l))}。`)})]})},
{id:'moto',min:16,max:75,w:2,if:()=>S.age>=18,run:()=>({t:'你騎機車時被轉彎車擦撞倒地。',c:[
  ch('報警、就醫、留下紀錄',()=>{const h=R(2,9),c=R(10,50)*1000,g=R(30,120)*1000;chg('health',-h);S.money+=g-c;return G(`你骨折住院，健康 −${h}。先自付醫療與看護費 ${money(c)}，依法向對方與強制險求償取得 ${money(g)}，實際多得 ${money(g-c)}。`)}),
  ch('私下和解',()=>{const c=R(5,30)*1000,g=R(0,15)*1000;chg('health',-R(1,5));S.money+=g-c;return B(`你和對方私下和解，對方賠 ${money(g)}，但你自付醫藥費 ${money(c)}，實際${g-c>=0?'多得':'少了'} ${money(Math.abs(g-c))}。`)})]})}
);
const COVS=[{id:'covid22',min:3,max:100,w:0,if:()=>S.year===2022&&!S.flags.cv22,run:()=>{S.flags.cv22=1;if(chance(.6)){chg('health',-R(0,4));S.stress=cl(S.stress+4);return [`2022 年本土疫情大流行，你確診居家隔離，休息幾天後康復。`,'bad']}return [`2022 年本土疫情大流行，你幸運沒有確診。`,'']}},
{id:'covid21',min:3,max:100,w:0,if:()=>S.year===2021&&!S.flags.cv21,run:()=>{S.flags.cv21=1;S.stress=cl(S.stress+6);chg('happy',-3);const j=S.job&&/餐|服務|零售|旅|店|導遊|空服/.test(S.job.t);if(j){const l=Math.round(S.job.sal*.15);S.money-=l;return [`2021 年 5 月三級警戒，你的工作受影響，這年少賺約 ${money(l)}。`,'bad']}return [`2021 年 5 月三級警戒，學校與公司改為遠距，生活大亂。`,'bad']}}];
