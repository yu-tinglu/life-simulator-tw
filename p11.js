// ===== 子女：天賦／個性／能力、升學選擇（p11）=====
// 學費為教育部公告級距的約略值（公立大學約 5.5 萬/年）；私立雙語、國際學校等為遊戲估算。
const TALS=['學術','藝術','運動','商業','技術','社交'];
const PERS=['勤奮','貪玩','內向','外向','冒險','謹慎','揮霍','節儉'];
const PERD={勤奮:'成績與才藝進步較快',貪玩:'成績較易下滑',內向:'不易受挫，社交弱',外向:'人緣好，易分心',冒險:'偏好出國與創業',謹慎:'穩定，較不冒險',揮霍:'拿到錢容易花光（信託可防）',節儉:'會存錢，孝親費較高'};
let KUID=1;
function newKid(sx,n){
 const base=S.partner?(S.smarts+50)/2:S.smarts;
 const t1=pick(TALS);
 return {id:Date.now()%1e6*10+(KUID++),n,sx,age:0,rel:R(70,95),sm:cl(base+R(-25,25)),lk:cl(R(15,95)),gr:R(20,90),hl:R(60,100),
  tal:t1,ts:R(20,60),pers:pick(PERS),grd:60,edu:0,sch:null,sn:'',se:0,tu:0,pre:0,sq:0,tutor:false,train:false,m:0,occ:'',inc:0,cn:S.cn||'TW',bz:0,gen:S.gen||1,nx:'es',pend:null,done:0};
}
function kidFix(k){
 if(k.id!=null)return k;
 Object.assign(k,{id:Date.now()%1e6*10+(KUID++),sm:cl(S.smarts+R(-25,25)),lk:R(15,95),gr:R(20,90),hl:R(60,100),tal:pick(TALS),ts:R(20,60),pers:pick(PERS),grd:60,edu:0,sch:null,sn:'',se:0,tu:0,pre:0,sq:0,tutor:false,train:false,m:0,occ:'',inc:0,cn:S.cn||'TW',bz:0,done:k.age>=6?1:0,nx:k.age<6?'es':null,pend:null,edu:k.age>=18?3:Math.max(0,Math.min(2,k.age>=12?2:k.age>=6?1:0))});
 if(k.done&&k.age>=18)kidCareer(k);
 return k;
}
// ---- 學校表：[名稱, 學費/年, 品質q, 錄取門檻, 契合天賦, 學歷級別, 年數, 聲望, 類型] ----
const SCH={
 es:{t:'小學',edu:1,yrs:6,list:[
  ['公立小學',5000,3,0,[],1,6,0,'pub'],
  ['公立體育／藝術才能班',30000,4,45,['運動','藝術'],1,6,0,'pub'],
  ['私立雙語小學',280000,5,0,['學術','社交'],1,6,0,'pri'],
  ['國際學校',600000,6,0,['學術','商業','社交'],1,6,1,'pri'],
  ['實驗教育（自主學習）',60000,0,0,['藝術','技術'],1,6,0,'exp']]},
 jh:{t:'國中',edu:2,yrs:3,list:[
  ['學區公立國中',5000,3,0,[],2,3,0,'pub'],
  ['明星公立國中（跨區）',8000,6,62,['學術'],2,3,1,'pub'],
  ['私立國中',220000,5,35,['學術','商業'],2,3,0,'pri'],
  ['體育／音樂／美術班',30000,4,50,['運動','藝術'],2,3,0,'pub'],
  ['國際學校',700000,6,0,['學術','商業','社交'],2,3,1,'pri']]},
 hs:{t:'高中職',edu:3,yrs:3,list:[
  ['明星公立高中',25000,8,80,['學術'],3,3,2,'pub','高中'],
  ['公立高中',25000,6,58,['學術'],3,3,1,'pub','高中'],
  ['私立高中',120000,5,38,['學術','商業'],3,3,0,'pri','高中'],
  ['高職（技職體系）',30000,5,30,['技術','商業'],3,3,0,'pub','高職'],
  ['藝術／體育高中',40000,5,48,['藝術','運動'],3,3,1,'pub','高中'],
  ['國際學校',800000,6,0,['學術','商業','社交'],3,3,1,'pri','高中'],
  ['不升學，直接工作',0,0,0,[],2,0,0,'work']]},
 un:{t:'大學',edu:4,yrs:4,list:[
  ['頂尖公立大學',55000,9,84,['學術'],4,4,3,'pub'],
  ['一般公立大學',55000,7,64,['學術','技術'],4,4,2,'pub'],
  ['私立大學',120000,5,38,['商業','社交','學術'],4,4,1,'pri'],
  ['科技大學',90000,5,30,['技術','商業'],4,4,1,'pri'],
  ['藝術／體育大學',70000,6,50,['藝術','運動'],4,4,2,'pub'],
  ['出國留學',0,0,0,[],4,4,0,'abroad'],
  ['不升學，直接工作',0,0,0,[],3,0,0,'work']]},
 gr:{t:'碩士',edu:5,yrs:2,list:[
  ['國內頂尖碩士班',60000,8,78,['學術','技術'],5,2,3,'pub'],
  ['國內碩士班',60000,6,55,['學術','技術','商業'],5,2,2,'pub'],
  ['出國碩士',0,0,0,[],5,2,0,'abroad'],
  ['進入家族事業歷練',0,0,0,[],4,0,0,'biz'],
  ['直接工作',0,0,0,[],4,0,0,'work']]},
 ph:{t:'博士',edu:6,yrs:4,list:[
  ['國內博士班（研究獎學金）',30000,8,70,['學術'],6,4,3,'pub'],
  ['直接工作',0,0,0,[],5,0,0,'work']]}
};
const STG_AGE={es:6,jh:12,hs:15,un:18,gr:22,ph:24};
const STG_NEXT={es:'jh',jh:'hs',hs:'un',un:'gr',gr:'ph'};
function scoreOf(k,s,noise){
 const fit=s[4].includes(k.tal);
 return k.grd*.45+k.sm*.25+k.gr*.1+(fit?k.ts*.1:k.ts*.04)+(k.tutor?4:0)+k.pre*1.5+(noise?R(-8,8):0);
}
function admitP(k,s){const e=scoreOf(k,s,0);return Math.max(0,Math.min(1,(8-(s[3]-e))/16))}
function abroadCost(code,sch){return Math.round(CNS[code].tu*fxr(code)*(sch==='gr'?1:1)+.6*wTW(code))}
function fitStar(k,s){return s[4].includes(k.tal)?'★':''}
function kidEvent(k,stage){
 return {run:()=>{
  if(!S.kids.includes(k)||k.pend!==stage)return null;
  const st=SCH[stage],ls=st.list;
  return {t:`${k.n}（${k.age} 歲，${k.tal}天賦・${k.pers}・智力${k.sm}／毅力${k.gr}／成績${Math.round(k.grd)}）要升${st.t}了，選哪裡？`,
   c:ls.map(s=>{
    const lab=s[8]==='work'?s[0]:s[8]==='abroad'?'出國留學（再選國家）':s[8]==='biz'?s[0]:`${s[0]}${fitStar(k,s)}｜每年${s[1]?money(s[1]):'幾乎免費'}｜錄取率約${Math.round(admitP(k,s)*100)}%`;
    return ch(lab,()=>chooseSchool(k,stage,s))})};
 }};
}
function abroadEvent(k,stage){
 return {run:()=>({t:`${k.n}想去哪個國家念${SCH[stage].t}？（學費＋生活費，匯率浮動）`,c:CNK.map(code=>{
  const c=CNS[code],cost=abroadCost(code,stage);
  const need=stage==='gr'?65:code==='US'||code==='GB'?72:62;
  const p=Math.max(0,Math.min(1,(8-(need-scoreOf(k,[0,0,0,0,[k.tal]],0)))/16));
  return ch(`${c.f}${c.n}｜每年約${money(cost)}｜錄取率約${Math.round(p*100)}%`,()=>{
   const sc=scoreOf(k,[0,0,0,0,[k.tal]],1);
   const ok=sc>=need;
   if(!ok){k.sch=null;queue.unshift(kidEvent(k,stage));return B(`${k.n}沒有申請上${c.n}的學校，請重新選擇。`)}
   const pre=code==='US'||code==='GB'||code==='SG'||code==='JP'?3:2;
   startSchool(k,stage,{n:`${c.n}大學`,tu:cost,q:7,edu:SCH[stage].edu,yrs:SCH[stage].yrs,pre,voc:'',abroad:code});
   return G(`${k.n}前往${c.n}留學，每年約 ${money(cost)}。`)})})}) };
}
function startSchool(k,stage,o){
 k.pend=null;k.sch=stage;k.stage=stage;k.sn=o.n;k.tu=o.tu;k.sq=o.q;k.se=k.age+o.yrs;k.pre=Math.max(k.pre,o.pre);k.voc=o.voc||'';k.stEdu=o.edu;
 k.cnS=o.abroad||'TW';k.grd=Math.max(50,Math.round(k.grd));
}
function chooseSchool(k,stage,s){
 const type=s[8];
 if(type==='work'){k.sch=null;k.edu=Math.max(k.edu,s[5]);k.done=1;kidCareer(k);return N(`${k.n}選擇直接投入職場（${EDU[k.edu]}）。`)}
 if(type==='biz'){k.sch=null;k.edu=Math.max(k.edu,s[5]);k.done=1;k.bz=1;kidCareer(k);return G(`${k.n}進入家族事業歷練，將來接班更順利。`)}
 if(type==='abroad'){queue.unshift(abroadEvent(k,stage));return N('選擇留學。')}
 const sc=scoreOf(k,s,1);
 let pick_=s;
 if(sc<s[3]){
  const fb=SCH[stage].list.find(x=>x[8]!=='work'&&x[8]!=='abroad'&&x[8]!=='biz'&&x[3]<=scoreOf(k,x,0)-6)||SCH[stage].list[0];
  pick_=fb;
  startSchool(k,stage,{n:fb[0],tu:fb[1],q:fb[2],edu:fb[5],yrs:fb[6],pre:fb[7],voc:fb[9]});
  chg('happy',-2);
  return B(`${k.n}沒有考上「${s[0]}」，改讀「${fb[0]}」。`);
 }
 startSchool(k,stage,{n:s[0],tu:s[1],q:s[2],edu:s[5],yrs:s[6],pre:s[7],voc:s[9]});
 if(s[8]==='exp')k.grd=Math.round(k.grd*(k.gr>60?1.05:.9));
 chg('happy',3);
 return G(`${k.n}進入「${s[0]}」。`);
}
// ---- 就業 ----
const BASEW={1:450000,2:450000,3:520000,4:660000,5:920000,6:1250000};
const OCC={學術:{4:'研究助理',5:'研究員',6:'教授'},藝術:{4:'設計師',5:'藝術工作者',6:'藝術家'},運動:{3:'教練',4:'運動教練',5:'運動科學家',6:'運動科學家'},商業:{3:'業務',4:'經理',5:'經營顧問',6:'高階主管'},技術:{3:'技師',4:'工程師',5:'資深工程師',6:'首席工程師'},社交:{3:'店長',4:'公關',5:'專案經理',6:'主持人'}};
function kidCareer(k){
 const e=Math.max(1,k.edu),base=BASEW[e]||450000;
 let m=.65+(k.sm*.35+k.gr*.2+k.ts*.25+k.pre*6+k.lk*(k.tal==='社交'?.15:.05))/100;
 m*=Math.exp(nrm()*.22);
 if(chance(.04)&&['藝術','運動','商業'].includes(k.tal))m*=2.5;
 let cn='TW';
 if(k.cnS&&k.cnS!=='TW'&&(k.pers==='冒險'||chance(.4)))cn=k.cnS;
 k.cn=cn;
 let inc=base*m;
 if(cn!=='TW'){const c=CNS[cn];inc=inc*(wTW(cn)/761000)*(1-c.tax)/(1-.09)}
 k.inc=Math.round(inc);
 const o=OCC[k.tal];k.occ=(e<=2?'基層職員':e===3&&!o[3]?'行政助理':(o[e]||o[4]||'職員'))+(cn!=='TW'?`（${CNS[cn].n}）`:'');
 k.cnS=cn;
}
function kidGrad(k){
 const st=SCH[k.sch];k.edu=Math.max(k.edu,k.stEdu);const was=k.sn;k.sch=null;k.tu=0;
 log(`${k.n}從「${was}」畢業了（${EDU[k.edu]}）。`,'good');chg('happy',4);
 const nx=STG_NEXT[k.stage];
 if(nx&&(nx!=='ph'||k.tal==='學術'&&k.sm>=75)){k.nx=nx;if(k.age>=STG_AGE[nx]){k.pend=nx;k.nx=null;queue.push(kidEvent(k,nx))}}
 else{k.done=1;kidCareer(k);log(`${k.n}成為${k.occ}，年收入約 ${money(k.inc)}。`)}
}
function kidYear(k){
 kidFix(k);k.age++;
 if(k.age<18)S.money-=kidCost();
 if(k.sch)S.money-=k.tu;
 if(k.tutor&&k.sch&&k.age<22)S.money-=120000;
 if(k.train&&k.age<22)S.money-=60000;
 k.rel=cl(k.rel-R(0,3)+(S.happy>60&&k.age<18?1:0));
 k.gr=cl(k.gr+R(-1,1)+(k.pers==='勤奮'?.5:0));
 k.ts=cl(k.ts+R(0,3)+(k.train?R(3,6):0)+(k.pers==='勤奮'?1:0));
 k.sm=cl(k.sm+(k.age<18?R(0,1):0));
 if(k.sch){
  const s=SCH[k.stage],fit=s&&s.list.some(x=>x[0]===k.sn&&x[4].includes(k.tal));
  const tgt=k.sm*.55+k.gr*.25+k.sq*2.5+(k.tutor?5:0)+(fit?3:0)+20-(k.pers==='貪玩'?6:0)+(k.pers==='勤奮'?4:0);
  k.grd=cl(k.grd+(tgt-k.grd)*.4+R(-4,4));
  if(k.age>=k.se)kidGrad(k);
 }
 if(!k.sch&&k.nx&&k.age>=STG_AGE[k.nx]){k.pend=k.nx;k.nx=null;queue.push(kidEvent(k,k.pend))}
 // 成年子女
 if(k.done&&k.inc){
  k.m+=Math.round(k.inc*.25);
  if(k.pers==='揮霍'&&k.m>0)k.m=Math.round(k.m*.8);
  if(S.age>=55&&k.rel>40){const g=Math.round(k.inc*(k.pers==='節儉'?.12:.07)*k.rel/100);S.money+=g;k.gv=(k.gv||0)+g}
 }
}
// ---- 介面：子女頁 ----
function kidHTML(i){
 const k=S.kids[i];if(!k)return relHTML();kidFix(k);
 let h=`<h3>👶 ${esc(k.n)}（${k.age} 歲・${k.sx}）</h3>`;
 h+=`<div class="item">天賦：<b>${k.tal}</b>（才藝 ${k.ts}）　個性：<b>${k.pers}</b><br><small class="sub">${PERD[k.pers]}</small><br>智力 ${k.sm} ・ 毅力 ${k.gr} ・ 外貌 ${k.lk} ・ 健康 ${k.hl}<br>學歷：${EDU[k.edu]}${k.sch?`<br>就讀：${esc(k.sn)}（${SCH[k.stage].t}，${k.se} 歲畢業，成績 ${Math.round(k.grd)}，學費每年 ${money(k.tu)}）`:''}${k.occ?`<br>職業：${esc(k.occ)} ・ 年收入 ${money(k.inc)}`:''}${k.m?`<br>個人資產：${money(k.m)}`:''}${k.bz?'<br>已歷練家族事業':''}</div>`;
 h+=`<div class="sec">教養決策</div>`;
 if(k.sch||k.age<18)h+=`<button class="btn" data-a="kid:tut:${i}">📚 補習班：${k.tutor?'已開啟（每年 NT$120,000）':'未開啟'}<small>成績進步較快，錄取率提高</small></button>`;
 if(k.age<22)h+=`<button class="btn" data-a="kid:trn:${i}">🎨 培養「${k.tal}」才藝：${k.train?'已開啟（每年 NT$60,000）':'未開啟'}<small>才藝成長加快，契合的學校更容易錄取</small></button>`;
 h+=`<button class="btn" data-a="kid:heir:${i}">🏛 指定為家業接班人${S.will&&S.will.succ===k.id?'（已指定）':''}<small>寫入遺囑，繼承家業與房產</small></button>`;
 if(k.age>=0)h+=`<div class="sec">贈與（依${CNS[S.cn].n}規定課贈與稅）</div>`+[1e6,5e6,2e7].map(a=>`<button class="btn" data-a="kid:gift:${i}:${a}" ${S.money<a?'disabled':''}>贈與 ${money(a)}<small>預估贈與稅 ${money(giftTaxEst(a,k))}</small></button>`).join('');
 return h+`<button class="btn" data-a="back">← 返回</button>`;
}
function kidHandle(x,y,z){
 const k=S.kids[+y];if(!k)return B('找不到子女。');
 if(x==='tut'){k.tutor=!k.tutor;return N(k.tutor?'已開啟補習。':'已停止補習。')}
 if(x==='trn'){k.train=!k.train;return N(k.train?'已開始培養才藝。':'已停止才藝培養。')}
 if(x==='heir'){S.will=S.will||{mode:'succ',sh:80,wt:0};S.will.succ=k.id;if(S.will.mode==='equal')S.will.mode='succ';return G(`已指定 ${k.n} 為接班人。`)}
 if(x==='gift')return giftTo(k,+z);
 return null;
}
