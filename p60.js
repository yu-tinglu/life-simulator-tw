/* ---- p60：更多活動（運動／才藝／休閒）、路跑、各種比賽與出道機會 ---- */
const TLN={sing:'歌唱',dance:'舞蹈',music:'樂器',paint:'繪畫',debate:'口才',code:'程式'};
function tlInit(){
 mFix();
 if(!S.tl){S.tl={};const ks=Object.keys(TLN);ks.forEach(k=>S.tl[k]=R(0,10));S.tl[pick(ks)]+=R(8,16)}
 if(S.cfame==null)S.cfame=0;if(!S.cpr)S.cpr=[];if(!S.rpb)S.rpb={};if(S.runlv==null)S.runlv=0;
}
function tlUp(k,d){tlInit();S.tl[k]=Math.min(100,S.tl[k]+d)}
const cpErf=x=>{const s=x<0?-1:1;x=Math.abs(x);const t=1/(1+.3275911*x);return s*(1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-x*x))};
const cpPhi=z=>.5*(1+cpErf(z/Math.SQRT2));
function cpFmt(s){s=Math.round(s);const h=Math.floor(s/3600),m=Math.floor(s%3600/60),c=s%60;return (h?h+':'+('0'+m).slice(-2):m)+':'+('0'+c).slice(-2)}

/* ---- 一般活動 ---- */
const NEWACTS=[
 {id:'runtrain',l:'跑步訓練',cat:'運動',min:8,sub:'提高路跑成績（免費）',run:()=>{tlInit();const d=R(4,8);S.runlv=Math.min(100,S.runlv+d);mFix();S.skl.fit=Math.min(100,S.skl.fit+R(1,3));chg('health',R(1,4));chg('happy',2);return G(`你規律慢跑訓練，跑力提升到 ${S.runlv}。`)}},
 {id:'swim',l:'游泳',cat:'運動',min:6,cost:1500,sub:'費用 NT$1,500（泳池入場）',run:()=>{mFix();S.skl.fit=Math.min(100,S.skl.fit+R(1,3));chg('health',R(2,5));chg('happy',2);return G('在水裡游了整個夏天，體力變好。')}},
 {id:'hike',l:'登山健行',cat:'運動',min:8,run:()=>{mFix();S.skl.fit=Math.min(100,S.skl.fit+R(1,2));chg('health',R(2,4));chg('happy',R(3,6));S.stress=cl(S.stress-R(2,5));return G(`你去爬了${pick(['合歡山','陽明山','玉山主峰','抹茶山','七星山','雪山'])}，景色讓人忘了煩惱。`)}},
 {id:'bike',l:'單車環島',cat:'運動',min:14,cost:12000,sub:'費用 NT$12,000（住宿與裝備，遊戲設定）',run:()=>{mFix();S.skl.fit=Math.min(100,S.skl.fit+R(2,4));chg('health',R(2,5));chg('happy',R(8,15));S.net=cl((S.net||0)+R(0,2));return G('你花了十天騎單車環島，累但很難忘。')}},
 {id:'yoga',l:'瑜伽課',cat:'運動',min:15,cost:6000,sub:'費用 NT$6,000（課程，遊戲設定）',run:()=>{chg('health',R(1,3));S.stress=cl(S.stress-R(4,9));chg('happy',3);return G('身心都放鬆了不少。')}},
 {id:'ball',l:'約朋友打球',cat:'運動',min:8,run:()=>{mFix();S.skl.fit=Math.min(100,S.skl.fit+R(1,2));chg('health',R(1,3));S.net=cl((S.net||0)+R(1,2));chg('happy',R(2,5));return G('和朋友打球流了一身汗，也更熟了。')}},
 {id:'lsing',l:'練唱歌',cat:'才藝',min:8,get cost(){return S.age<18?0:6000},sub:'歌唱等級提升（成年後學費 NT$6,000）',run:()=>{tlUp('sing',R(6,12));chg('happy',2);return G('你上課練習發聲與歌曲，歌喉進步了。')}},
 {id:'ldance',l:'練舞蹈',cat:'才藝',min:8,get cost(){return S.age<18?0:6000},sub:'舞蹈等級提升（成年後學費 NT$6,000）',run:()=>{tlUp('dance',R(6,12));mFix();S.skl.fit=Math.min(100,S.skl.fit+1);chg('happy',2);return G('你認真練舞，身體協調多了。')}},
 {id:'lmusic',l:'學樂器',cat:'才藝',min:6,get cost(){return S.age<18?0:6000},sub:'樂器等級提升（成年後學費 NT$6,000）',run:()=>{tlUp('music',R(6,12));chg('smarts',1);return G(`你學了${pick(['鋼琴','吉他','小提琴','烏克麗麗','爵士鼓'])}。`)}},
 {id:'lpaint',l:'畫畫與設計',cat:'才藝',min:6,run:()=>{tlUp('paint',R(6,12));mFix();S.skl.cre=Math.min(100,S.skl.cre+1);chg('happy',2);return G('你每週畫畫，筆觸越來越穩。')}},
 {id:'ldebate',l:'口才訓練（辯論／演講社）',cat:'才藝',min:10,run:()=>{tlUp('debate',R(6,12));mFix();S.skl.comm=Math.min(100,S.skl.comm+2);return G('你練習組織論點、上台表達。')}},
 {id:'lcode',l:'自學程式',cat:'才藝',min:10,run:()=>{tlUp('code',R(6,12));mFix();S.skl.tech=Math.min(100,S.skl.tech+2);chg('smarts',1);return G('你寫了幾個小專案。')}},
 {id:'volun',l:'志工服務',cat:'休閒',min:12,run:()=>{S.karma=cl(S.karma+R(4,8));chg('happy',R(2,5));S.net=cl((S.net||0)+R(1,2));return G(`你去${pick(['育幼院','動物收容所','社區長照據點','淨灘活動'])}當志工，很有成就感。`)}},
 {id:'concert',l:'看演唱會',cat:'休閒',min:12,cost:4000,sub:'費用 NT$4,000（票價，遊戲設定）',run:()=>{chg('happy',R(6,12));return G('現場的氣氛讓你起雞皮疙瘩。')}},
 /* 路跑 */
 ...[['5K',5,8,500],['10K',10,12,800],['半程馬拉松',21.0975,16,1200],['全程馬拉松',42.195,18,1800]].map(([n,km,min,cost])=>({id:'race'+Math.round(km),l:'路跑：'+n,cat:'比賽',min,cost,sub:`報名費 NT$${cost.toLocaleString('en-US')}（遊戲設定）・成績依跑力、體能與年齡模擬`,run:()=>rnRun(n,km)}))
];
const RNREF={5:390,10:380,21:395,42:420};
function rnRun(n,km){
 tlInit();mFix();
 const f=S.skl.fit*.5+S.runlv*.5;let pace=540-3.3*f;
 const a=S.age;pace*=a<20?1+(20-a)*.015:a>35?1+(a-35)*.006+(a>60?(a-60)*.01:0):1;
 if(S.health<60)pace*=1+(60-S.health)*.002;
 pace*={5:1,10:1.04,21:1.10,42:1.22}[Math.round(km)];
 if(km>40&&S.runlv<30)pace*=1.12;
 pace*=Math.exp(.05*nrm());
 if(km>40&&S.runlv<20&&chance(.3)){chg('health',-R(5,12));chg('happy',-4);const m=`${n}跑到一半抽筋倒下，沒有完賽（準備不足）。`;S.cpr.push({y:calYear(),a:S.age,n:'路跑 '+n,r:'未完賽',p:0});return B(m)}
 const t=pace*km,key=Math.round(km),pb=S.rpb[key],pct=Math.max(.1,100*(1-cpPhi((Math.log(RNREF[key])-Math.log(pace))/.22)));
 let m=`你完成 ${n}，成績 ${cpFmt(t)}（配速每公里 ${cpFmt(pace)}），約全場前 ${pct.toFixed(pct<10?1:0)}%。`;
 let tone='good',prize=0;
 if(pb==null||t<pb){if(pb!=null)m+=`破了個人最佳（原 ${cpFmt(pb)}）！`;S.rpb[key]=t}
 if(pct<=2){prize=km>40?R(10000,30000):R(2000,8000);S.money+=prize;m+=`拿到組別名次，獎金 ${money(prize)}。`;S.cfame=Math.min(100,S.cfame+2)}
 chg('health',km>40?-R(0,3):R(0,2));chg('happy',km>40?R(6,12):R(2,6));mFix();S.skl.fit=Math.min(100,S.skl.fit+(km>20?2:1));
 S.cpr.push({y:calYear(),a:S.age,n:'路跑 '+n,r:cpFmt(t)+'・前'+pct.toFixed(0)+'%',p:prize});
 return [m,tone];
}

/* ---- 比賽 ---- */
const CPS=[
 /* id,名稱,最小,最大,階段,獎金[冠,亞,季],報名成本,需求函式,類型,出道職業 */
 ['sch_sing','校內歌唱比賽',8,22,['初賽','決賽'],[3000,2000,1000],0,()=>S.tl.sing*.55+S.skl.cre*.15+S.skl.comm*.1+S.looks*.2,'sing'],
 ['nat_sing','全國歌唱大賽',14,35,['縣市初賽','區域複賽','全國決賽'],[100000,50000,20000],1500,()=>S.tl.sing*.65+S.skl.cre*.1+S.skl.comm*.1+S.looks*.15-6,'sing','演員／歌手'],
 ['idol','電視選秀節目（唱跳）',15,30,['海選','淘汰賽','晉級賽','總決賽'],[1000000,300000,100000],0,()=>(S.tl.sing*.3+S.tl.dance*.3)+S.skl.cre*.1+S.skl.comm*.1+S.looks*.2-8,'idol','演員／歌手'],
 ['sch_dance','校內舞蹈比賽',8,22,['初賽','決賽'],[3000,2000,1000],0,()=>S.tl.dance*.55+S.skl.fit*.2+S.looks*.15+S.skl.cre*.1,'dance'],
 ['street','街舞大賽',13,35,['海選','複賽','決賽'],[80000,40000,15000],1500,()=>S.tl.dance*.6+S.skl.fit*.25+S.skl.cre*.15-5,'dance','演員／歌手'],
 ['talent','才藝大賽',10,40,['初賽','決賽'],[30000,15000,8000],800,()=>Math.max(S.tl.sing,S.tl.dance,S.tl.music,S.tl.paint)*.65+S.skl.comm*.15+S.looks*.15,'talent','演員／歌手'],
 ['band','校園樂團大賽',12,30,['初賽','決賽'],[50000,25000,10000],1000,()=>S.tl.music*.55+S.tl.sing*.2+S.skl.cre*.15+S.skl.comm*.1,'music','演員／歌手'],
 ['model','模特兒選拔賽',16,30,['海選','決選'],[100000,50000,20000],0,()=>S.looks*.6+S.skl.comm*.15+S.skl.fit*.15+S.skl.cre*.1-10,'model','模特兒'],
 ['speech','演講比賽',9,40,['班級','校內','縣市','全國'],[10000,6000,3000],0,()=>S.tl.debate*.5+S.skl.comm*.3+S.smarts*.2,'brain'],
 ['sci','科學展覽',10,19,['校內','縣市','全國'],[20000,10000,5000],0,()=>S.smarts*.5+S.skl.tech*.3+S.tl.code*.2,'brain'],
 ['write','作文與寫作比賽',8,40,['校內','全國'],[8000,5000,2000],0,()=>S.smarts*.4+S.skl.cre*.4+S.tl.debate*.2,'brain'],
 ['art','美術比賽',7,40,['校內','縣市','全國'],[15000,8000,4000],0,()=>S.tl.paint*.65+S.skl.cre*.25+S.smarts*.1,'brain'],
 ['chess','圍棋與棋藝賽',8,60,['初賽','複賽','決賽'],[15000,8000,4000],0,()=>S.smarts*.6+S.skl.tech*.2+S.skl.cre*.2,'brain'],
 ['esport','電競大賽',12,35,['海選','小組賽','淘汰賽','決賽'],[300000,100000,40000],0,()=>S.smarts*.35+S.skl.tech*.2+S.tl.code*.1+S.skl.fit*.1+S.skl.comm*.1+8,'brain'],
 ['hack','黑客松／創業競賽',16,45,['書面審查','複賽','決賽'],[200000,80000,30000],0,()=>S.skl.tech*.35+S.tl.code*.25+S.smarts*.2+S.skl.lead*.2,'brain'],
 ['cook','廚藝大賽',14,60,['初賽','決賽'],[50000,20000,10000],1000,()=>S.skl.cre*.35+S.skl.tech*.15+S.smarts*.2+S.skl.fit*.1+20,'brain'],
 ['track','田徑錦標賽',8,40,['初賽','複賽','決賽'],[20000,10000,5000],0,()=>S.skl.fit*.5+S.runlv*.25+S.health*.25-4,'sport'],
 ['swimc','游泳錦標賽',8,40,['預賽','決賽'],[20000,10000,5000],500,()=>S.skl.fit*.55+S.health*.25+S.runlv*.1,'sport'],
 ['pageant','選拔賽（先生／小姐）',18,30,['初賽','複賽','決賽'],[300000,100000,50000],0,()=>S.looks*.55+S.skl.comm*.25+S.smarts*.1+S.skl.cre*.1-10,'model','模特兒']
];
function cpLevel(def){const [id,n,mn,mx,st,pz,cost,need,tp,dj]=def;return {id,n,mn,mx,st,pz,cost,need,tp,dj}}
const CPD=CPS.map(cpLevel);
function cpRun(d){
 tlInit();
 const need=Math.max(0,Math.min(100,d.need()));
 const base=[.75,.5,.38,.3];
 let k=0,out=null;
 for(;k<d.st.length;k++){
  const last=k===d.st.length-1;
  if(!last){
   const p=Math.max(.04,Math.min(.95,(base[Math.min(k,3)]||.35)+(need-50)/90));
   if(!chance(p)){out=`止步${d.st[k]}`;break}
   log(`你通過了「${d.n}」的${d.st[k]}。`,'good');
  }
 }
 let place=null;
 if(!out){
  const p1=Math.max(.02,Math.min(.6,.14+(need-55)/150));
  place=chance(p1)?0:chance(.3)?1:chance(.35)?2:3;
  out=['冠軍','亞軍','季軍','入圍決賽（未得名次）'][place];
 }
 let prize=place!=null&&place<3?d.pz[place]:0;
 S.money+=prize;
 const fameD=place===0?(d.cost>=800||d.pz[0]>=50000?8:3):place!=null&&place<3?(d.pz[0]>=50000?4:1):place===3?1:0;
 S.cfame=Math.min(100,S.cfame+fameD);
 chg('happy',place===0?12:place!=null&&place<3?8:place===3?3:-2);
 if(place===0)S.karma=cl(S.karma+1);
 S.cpr.push({y:calYear(),a:S.age,n:d.n,r:out,p:prize});if(S.cpr.length>80)S.cpr.shift();
 if(d.dj&&place!=null&&place<4)cpDebut(d,place);
 const m=`你參加「${d.n}」，結果：${out}${prize?`，獎金 ${money(prize)}`:''}。`;
 return place!=null&&place<3?G(m):place===3?N(m):B(m);
}
function cpDebut(d,place){
 if(S.ent||(S.job&&/演員|模特/.test(S.job.t)))return;
 const p=[.7,.5,.35,.1][place]*(d.tp==='idol'?1.2:1)*(S.age>30?.5:1);
 if(!chance(Math.min(.95,p)))return;
 const jn=d.dj,co=pick(['星途娛樂','潮音唱片','雙子星經紀','藍海娛樂','橘子音樂','群星經紀']);
 queue.push({run:()=>({t:`${co}的星探在${d.n}後找上你，想簽下你${jn==='模特兒'?'當模特兒':'出道當藝人'}。${S.age<18?'（未滿 18 歲，需要家長同意，爸媽表示尊重你的決定。）':''}`,c:[
  ch('簽約出道',()=>cpSign(jn,co)),
  ch('婉拒，專心做自己的事',()=>{chg('happy',1);return N('你客氣地婉拒了邀約。')})]})});
}
function cpSign(jn,co){
 const idx=JOBS.findIndex(j=>j.t===jn);if(idx<0)return N('合約最後沒談成。');
 if(S.school||S.age<18){
  S.ent={co,jn,y:calYear()};chg('happy',6);log(`你與${co}簽下練習生合約，在學期間有少量通告收入，畢業後正式出道。`,'good');
  return G('你成為練習生，夢想踏出第一步。');
 }
 return cpDebutNow(jn,co);
}
function cpDebutNow(jn,co){
 const idx=JOBS.findIndex(j=>j.t===jn);if(idx<0)return N('出道計畫取消了。');
 if(S.job&&!S.job.founder)log(`你辭去了${S.job.t}，專心走演藝路線。`);
 const o=hireJob(JOBS[idx]);o.emp=co;o.fame=(o.fame||0)+Math.min(.8,(S.cfame||0)/120);
 S.job=o;S.ent=null;chg('happy',10);
 return G(`你正式出道，成為${co}旗下的${jn}，年薪約 ${money(o.sal)}（收入浮動大）。`);
}
const _y60=yearly;
yearly=function(){
 _y60();
 try{
  if(S.tl){Object.keys(S.tl).forEach(k=>{if(S.tl[k]>12&&chance(.5))S.tl[k]--});S.runlv=Math.max(0,(S.runlv||0)-4);if(S.cfame>0&&chance(.5))S.cfame--}
  if(S.ent&&!S.dead){
   if(S.school){const g=R(20000,100000);S.money+=g;log(`練習生通告與活動收入 ${money(g)}。`,'good');chg('health',-R(0,2))}
   else if(S.age>=18&&!S.jail){const r=cpDebutNow(S.ent.jn,S.ent.co);log(r[0],r[1])}
  }
 }catch(e){}
};
/* 加入活動清單、技能對應 */
CPD.forEach(d=>NEWACTS.push({id:'cp_'+d.id,l:d.n,cat:'比賽',min:d.mn,max:d.mx,cost:d.cost||0,sub:`${d.st.length} 階段・冠軍獎金 ${money(d.pz[0])}${d.cost?'・報名 '+money(d.cost):''}（獎金為遊戲設定）${d.dj?'・有機會被星探發掘':''}`,run:()=>cpRun(d)}));
ACTS.push(...NEWACTS);
Object.assign(ACTFX,{runtrain:[['s','fit',1],['p','con',2]],swim:[['s','fit',1]],hike:[['p','opn',1],['p','sta',1]],bike:[['p','opn',1],['p','con',1]],yoga:[['p','sta',2]],ball:[['p','ext',1]],lsing:[['p','con',1]],ldance:[['p','ext',1]],lmusic:[['s','cre',1]],lpaint:[['s','cre',1]],ldebate:[['s','comm',1]],lcode:[['s','tech',1]],volun:[['p','agr',2]],concert:[['p','ext',1]]});
/* 比賽紀錄頁 */
function cpRecHTML(){
 tlInit();
 const wins=S.cpr.filter(r=>r.r==='冠軍').length,tot=S.cpr.reduce((s,r)=>s+(r.p||0),0);
 let h=`<div class="item"><b>名聲</b> ${S.cfame}${pbar(S.cfame)}<small>冠軍 ${wins} 次・累積獎金 ${money(tot)}${S.ent?'・練習生（'+esc(S.ent.co)+'）':''}</small></div>`;
 h+='<div class="sec">才藝等級（練習後才有實力參賽）</div><div class="item">'+Object.keys(TLN).map(k=>`${TLN[k]} ${S.tl[k]}`).join(' ・ ')+`<br>跑力 ${S.runlv}</div>`;
 const pbs=Object.keys(S.rpb);
 if(pbs.length)h+='<div class="sec">路跑個人最佳</div><div class="item">'+pbs.map(k=>({5:'5K',10:'10K',21:'半馬',42:'全馬'}[k])+' '+cpFmt(S.rpb[k])).join(' ・ ')+'</div>';
 h+='<div class="sec">歷年成績</div>';
 h+=S.cpr.length?S.cpr.slice(-25).reverse().map(r=>`<div class="item"><b>${esc(r.n)}</b><br>${r.a} 歲・${esc(r.r)}${r.p?'・獎金 '+money(r.p):''}</div>`).join(''):'<p class="sub">還沒參加過比賽。</p>';
 return h;
}
