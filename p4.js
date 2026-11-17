function newGame(name,sx){
 const sur=name?name[0]:pick(SUR),fam=pick(['清寒','小康','小康','小康','富裕']);
 S={name:name||sur+given(sx),sx,age:0,health:R(55,100),happy:R(50,90),smarts:R(15,95),looks:R(15,95),
  money:0,edu:0,school:null,schoolEnd:0,tuition:0,grade:60,prestige:0,job:null,jail:0,record:0,fam,karma:50,
  mom:{role:'母親',n:sur+given('女'),rel:R(60,95),alive:true,off:R(24,36)},
  dad:{role:'父親',n:sur+given('男'),rel:R(60,95),alive:true,off:R(26,38)},
  co:null,coHist:0,econ:0,cn:null,partner:null,kids:[],friends:[],house:null,car:null,mort:null,acts:{},flags:{},seen:{},log:[{age:0,lines:[]}],dead:false,army:false};
 log(`你出生在台灣，父親${S.dad.n}、母親${S.mom.n}，家境${fam}。`);
 cnInit();S.byear=R(1975,2026);busy=false;queue=[];
}
function enroll(sch,yrs,tui,pre){S.school=sch;S.schoolEnd=S.age+yrs;S.tuition=tui;S.grade=60;S.prestige=pre||0}
function graduate(){
 const m={'小學':1,'國中':2,'高中':3,'高職':3,'大學':4,'碩士':5,'博士':6};
 const sch=S.school;S.edu=Math.max(S.edu,m[sch]);S.school=null;S.tuition=0;
 log(`你從${sch}畢業了。`,'good');
 if(sch==='小學')enroll('國中',3,0);
 else if(sch==='國中'){if((S.grade+S.smarts)/2>45)enroll('高中',3,0);else enroll('高職',3,0)}
 else if(sch==='高中'||sch==='高職')queue.push(E_UNI);
 else if(sch==='大學')queue.push(E_GRAD);
}
const E_UNI={run:()=>{const ch0=[
 ch('拚學測，上大學',()=>{const sc=S.grade*.5+S.smarts*.5+R(-15,15);
  if(sc>=70){enroll('大學',4,30000,2);chg('happy',8);return G('你考上了公立名校！')}
  if(sc>=45){enroll('大學',4,60000,1);return N('你考上了一所不錯的大學。')}
  enroll('大學',4,110000,0);return N('你上了一所私立科大，學費不便宜。')}),
 ch('直接去工作',()=>N('你決定先踏入社會。'))];
 return {t:'高中畢業了，接下來要做什麼？',c:ch0}}};
const E_GRAD={run:()=>({t:'大學畢業了，要繼續念研究所嗎？',c:[
 ch('念碩士（2 年）',()=>{enroll('碩士',2,60000,S.prestige);return N('你決定繼續深造。')}),
 ch('進入職場',()=>N('你準備找工作。'))]})};
const E_PHD={run:()=>({t:'碩士畢業了，要繼續念博士嗎？',c:[
 ch('念博士（4 年）',()=>{enroll('博士',4,30000,S.prestige);return N('你踏上學術之路。')}),
 ch('進入職場',()=>N('你準備找工作。'))]})};
function yearly(){
 const a=S.age;
 {const g=Math.max(-.08,Math.min(.12,.035+((S.gdp==null?.035:S.gdp)-.035)*.35+(Math.random()+Math.random()+Math.random()-1.5)*.03));S.gdp=g;S.econ=Math.max(-.07,Math.min(.07,(g-.035)*.8));const mev=macroYear();S.hev=mev;cnYearStart();
 if(a>=18)log(`${S.year} 年${mev?'（'+mev+'）':''}：經濟成長率 ${(S.gdp*100).toFixed(1)}%、CPI ${(S.cpi*100).toFixed(1)}%（居住 ${(S.cpic.h*100).toFixed(1)}%、食品 ${(S.cpic.f*100).toFixed(1)}%、醫療 ${(S.cpic.m*100).toFixed(1)}%）。`,S.gdp<0?'bad':'');}
 if(a<=30)chg('health',R(1,4));else if(a<=40)chg('health',R(0,2));else if(a<=60)chg('health',-R(0,1));else if(a<=75)chg('health',-R(0,2));else chg('health',-R(1,3));
 chg('happy',R(-5,5)+(S.happy>75?-3:S.happy<30?3:0));
 if(a>=28)chg('looks',-R(0,a>50?2:1));
 if(a>60)chg('smarts',-R(0,2));
 if(S.flags.smoker)chg('health',-R(0,2));
 if(a>=6&&a<18){const pm={清寒:2000,小康:8000,富裕:30000}[S.fam];S.money+=pm;log(`${a===6?'爸媽開始固定給你零用錢（遊戲設定：依家境每年 清寒 NT$2,000／小康 NT$8,000／富裕 NT$30,000，非官方統計）。':'零用錢'}今年收到 ${money(pm)}。`)}
 if(a===6)enroll('小學',6,0);
 if(S.school){
  S.grade=cl(S.grade+R(-3,3)+(S.smarts-50)/12);chg('smarts',R(0,2));
  S.money-=S.tuition;
  if(a>=S.schoolEnd){const was=S.school;graduate();if(was==='碩士')queue.push(E_PHD)}
 }
 S.army=false;
 armyCheck(a);
 let jailed=false;
 if(S.jail>0){S.jail--;jailed=true;S.job=null;chg('happy',-8);chg('health',-3);log('你在獄中度過了一年。','bad')}
 if(a===65){S.flags.retired=1;S.pension=(S.job&&!S.job.founder&&S.job.years>=10)?360000:150000;if(S.job&&!S.job.founder){log(`你退休了，每年領退休金 ${money(S.pension)}。`);S.job=null}else log(`你滿 65 歲，開始領老年年金 ${money(S.pension)}（公司仍由你持有）。`)}
 if(!jailed&&!S.army){
  if(S.job&&S.job.founder){S.job.years++}
  else if(S.job){const j=S.job;S.money+=j.var?varIncome(j):j.sal;j.years++;
   j.perf=cl(j.perf+R(-15,15)+(S.smarts-50)/10);
   if(j.perf>65&&chance(.25)){j.lv++;chg('happy',5);log(`你升遷了！現在的職稱是 Lv.${j.lv} ${j.t}，年薪 ${money(j.sal)}。`,'good')}
   else if((j.perf<30&&chance(.3))||chance(.015+layoffAdj())){log(`你被${j.t}的公司解僱了。`,'bad');chg('happy',-8);S.job=null}}
  if(!S.job&&S.flags.retired||S.job&&S.job.founder&&S.flags.retired)S.money+=S.pension;
 }
 if(S.co&&!jailed)coRun();
 if(a>=18&&!jailed){
  const sup=a<23&&(S.mom.alive||S.dad.alive)&&!S.job&&S.cn==='TW';
  S.money-=S.army||sup?0:livingCost();
 }
 S.kids.forEach(kidYear);
 if(S.mort)mortYear();
 if(S.house)S.house.value=hvYear(S.house);
 if(S.car){S.money-=40000;S.car.value=Math.round(S.car.value*.9)}
 if(S.money<0&&a>=18){S.money=Math.round(S.money*1.04);chg('happy',-4);if(chance(.3))log('你負債累累，壓力很大。','bad')}
 for(const p of [S.mom,S.dad]){if(!p.alive)continue;const pa=p.off+a;p.rel=cl(p.rel-R(0,2));
  if(pa>60&&chance((pa-60)*.007+(pa>85?.1:0))){p.alive=false;chg('happy',-R(10,25));log(`你的${p.role}${p.n}過世了，享年 ${pa} 歲（${famCause(pa,p.role==='母親')}）。`,'bad');funeral(p.role);parentEstate(p)}}
 if(S.partner){const p=S.partner;p.rel=cl(p.rel-R(0,4));
  if(a>70&&chance(.04*(a-70)/5)){log(`你的${p.married?'配偶':'伴侶'}${p.n}過世了（${famCause(a,p.sx==='女')}）。`,'bad');funeral(p.n);chg('happy',-20);S.partner=null;S.flags.widow=1}
  else if(p.rel<25&&chance(.45)){log(p.married?`你和${p.n}離婚了，分走一半財產。`:`你和${p.n}分手了。`,'bad');if(p.married)S.money=Math.round(S.money/2);chg('happy',-12);S.partner=null}}
 S.friends=S.friends.filter(f=>{f.rel=cl(f.rel-R(0,5));if(f.rel<8){log(`你和${f.n}漸漸失聯了。`);return false}return true});
 cnYearEnd();
}
function randEvents(){
 const pool=E.filter(e=>S.age>=e.min&&S.age<=e.max&&(!e.if||e.if())&&!(S.seen[e.id]>=S.age-3));
 const out=[],n=chance(.85)?(chance(.3)?2:1):0;
 for(let i=0;i<n&&pool.length;i++){
  let r=Math.random()*pool.reduce((s,e)=>s+e.w,0),k=0;
  for(;k<pool.length-1;k++){r-=pool[k].w;if(r<=0)break}
  const e=pool.splice(k,1)[0];S.seen[e.id]=S.age;out.push(e);
 }
 return out;
}
function ageUp(){
 if(!S||S.dead||busy)return;
 busy=true;queue=[];
 S.age++;S.acts={};S.log.push({age:S.age,lines:[]});
 yearly();
 queue=queue.concat(randEvents());
 next();
}
function next(){
 if(!queue.length)return endYear();
 const e=queue.shift();if(e.if&&!e.if())return next();const r=e.run();
 if(!r)return next();
 if(Array.isArray(r)){log(r[0],r[1]);return next()}
 if(r.custom){render();return r.custom(()=>{render();next()})}
 render();
 ask(r.t,r.c.map(c=>c.l),i=>{
  log(r.t);const res=r.c[i].f();if(res)log(res[0],res[1]);next();
 });
}
function deathCheck(){
 const a=S.age,h=S.health;let p;
 if(h<=0)return '健康惡化';
 if(a>=108)return '壽終正寢';
 if(a<40)p=.0006+(100-h)*.00003;else if(a<60)p=.003+(100-h)*.0001;else p=Math.pow(a-55,2)*.00012+(100-h)*.0002;
 if(chance(p))return a<40?pick(['意外事故','突發疾病']):h<35?'疾病':a>70?'壽終正寢':'突發疾病';
 return null;
}
function endYear(){
 const c=deathCheck();
 if(c)return die(c);
 busy=false;save();render();
}
function die(cause){
 S.dead=true;S.cause=cause;busy=false;
 log(`你因${cause}去世了，享年 ${S.age} 歲。`,'bad');
 try{localStorage.removeItem(slotKey(CURSLOT))}catch(e){}
 render();startSuccession();
}
function score(){
 return Math.max(0,Math.round(S.age*2+S.happy/2+Math.max(0,netWorth())/200000+S.kids.length*5+S.edu*3-S.record*10+(S.karma-50)/5));
}
function save(){try{localStorage.setItem(SAVEKEY,JSON.stringify(S))}catch(e){}}
function loadSave(){try{const t=localStorage.getItem(SAVEKEY);if(!t)return null;const o=JSON.parse(t);return o&&o.age!=null&&!o.dead?o:null}catch(e){return null}}
