const jail=(n,why)=>{S.jail=n;S.record++;S.job=null;chg('happy',-15);S.karma=cl(S.karma-15);return B(`${why}，被判入獄 ${n} 年。`)};
const ACTS=[
{id:'gym',l:'🏃 運動健身',min:6,run:()=>{chg('health',R(3,8));chg('happy',2);return G('運動讓你精神變好。')}},
{id:'study',l:'📚 認真讀書',min:6,run:()=>{chg('smarts',R(2,6));chg('happy',-1);if(S.school)S.grade=cl(S.grade+R(2,6));return N('你花了很多時間讀書。')}},
{id:'doc',get l(){return S.age<12?'🩺 看醫生・打疫苗・健檢':'🩺 去看醫生'},min:0,get cost(){return S.age<18?0:3000},run:()=>{chg('health',R(5,15));return G('醫生幫你調理了身體。')}},
{id:'med',l:'🧘 冥想放鬆',min:10,run:()=>{chg('happy',R(3,8));return G('你的心情平靜下來。')}},
{id:'food',l:'🧋 逛夜市吃美食',min:3,get cost(){return S.age<18?0:600},run:()=>{chg('happy',R(2,6));chg('health',-1);return G('雞排配珍奶，心情大好。')}},
{id:'pt',l:'🛵 兼職打工',min:15,if:()=>!S.job&&!S.jail,run:()=>{const g=R(60000,120000);S.money+=g;chg('happy',-3);return N(`你打工賺了 ${money(g)}。`)}},
{id:'beauty',l:'💆 護膚醫美',min:18,cost:80000,run:()=>{const d=R(-3,10);chg('looks',d);return d>=0?G(`外貌提升了 ${d}。`):B('效果不如預期。')}},
{id:'trip',l:'✈️ 出國旅行',min:18,cost:60000,run:()=>{chg('happy',R(8,20));return G(`你去${pick(['日本','韓國','泰國','歐洲','美國'])}玩，超開心。`)}},
{id:'lotto',l:'🎫 買大樂透',min:18,cost:500,run:()=>{const r=Math.random();if(r<.0005){S.money+=20000000;chg('happy',30);return G('頭獎！你中了 NT$20,000,000！')}if(r<.05){S.money+=R(2000,50000);return G('你中了小獎。')}return N('沒中獎。')}},
{id:'bet',l:'🎰 賭一把',sub:'下注 NT$10,000',min:18,cost:10000,run:()=>{if(chance(.45)){S.money+=20000;chg('happy',5);return G('你贏了，拿回 NT$20,000。')}chg('happy',-4);return B('你輸光了。')}},
{id:'donate',l:'🎗️ 捐款做公益',min:18,cost:10000,run:()=>{S.karma=cl(S.karma+10);chg('happy',4);return G('做好事讓你心情很好。')}},
{id:'steal',l:'🕶️ 偷東西',min:12,run:()=>{if(chance(.55)){const g=R(2000,30000);S.money+=g;S.karma=cl(S.karma-5);return N(`你得手了 ${money(g)}。`)}
 if(S.age<18){chg('happy',-10);return B('你被抓到，被送去少年輔導。')}return chance(.5)?jail(1,'你偷竊被逮'):(S.money-=30000,chg('happy',-8),B('你被抓到，罰款 NT$30,000。'))}},
{id:'rob',l:'🔪 搶劫',min:16,run:()=>{if(chance(.4)){const g=R(50000,300000);S.money+=g;S.karma=cl(S.karma-12);return N(`你搶到了 ${money(g)}。`)}return jail(R(2,6),'你搶劫失敗')}},
{id:'fraud',l:'📞 詐騙集團',min:18,run:()=>{if(chance(.35)){const g=R(200000,1500000);S.money+=g;S.karma=cl(S.karma-20);return N(`你騙到了 ${money(g)}。`)}return jail(R(3,10),'你的詐騙集團被破獲')}}
];
function canAct(a){return S.age>=a.min&&(!a.max||S.age<=a.max)&&(!a.if||a.if())&&!S.jail}
function applyJob(i){
 const j=JOBS[i],key='job'+i;cnInit();const bl=jobBlock(j);if(bl)return B(bl);
 if(S.acts[key])return B('你今年已經應徵過這個職缺了。');
 S.acts[key]=1;
 const p=Math.min(.95,Math.max(.05,.35+(S.smarts-j.sm)/100+(j.lk?(S.looks-j.lk)/100:0)+S.prestige*.05+(S.edu>j.edu?.1:0)-(S.record?.2:0)+cnHire()+refBonus()+skillBonus(j)));
 if(chance(p)){S.job=hireJob(j);chg('happy',8);const m=`你錄取了「${j.t}」（${S.job.emp||'自由接案'}），年薪約 ${money(S.job.sal)}！`;log(m,'good');return G(m)}
 chg('happy',-3);const m=`你應徵「${j.t}」被拒絕了。`;log(m,'bad');return B(m)
}
function getP(k){if(k==='mom')return S.mom;if(k==='dad')return S.dad;if(k==='partner')return S.partner;return (k[0]==='k'?S.kids:S.friends)[+k.slice(1)]}
function label(k){const p=getP(k);if(k==='partner')return (p.married?'配偶 ':'伴侶 ')+p.n;if(k[0]==='k')return '子女 '+p.n;if(k[0]==='f')return (p.sib?'手足 ':(p.kind||'朋友')+' ')+p.n;return p.role+' '+p.n}
function interact(k,kind){
 const p=getP(k),key='p'+k;if(!p)return B('這個人已經不在了。');
 if(kind==='talk'||kind==='gift'||kind==='fight'||kind==='date'){
  if(S.acts[key])return B('今年你已經和對方互動過了。');
  S.acts[key]=1;
  if(kind==='gift'||kind==='date'){const c=kind==='gift'?2000:3000;if(S.money<c)return (delete S.acts[key],B('你的錢不夠。'));S.money-=c;p.rel=cl(p.rel+R(6,14));chg('happy',3);return G(kind==='gift'?'對方很喜歡你送的禮物。':'你們度過了愉快的約會。')}
  if(kind==='talk'){p.rel=cl(p.rel+R(3,8));chg('happy',2);return G('你們聊得很開心。')}
  p.rel=cl(p.rel-R(8,20));chg('happy',-3);return B('你們大吵了一架。');
 }
 if(kind==='propose'){
  if(p.married||S.age<20)return B('現在還不能求婚。');
  if(S.money<300000)return B('婚禮至少要 NT$300,000。');
  if(chance(p.rel/100)){S.money-=300000;p.married=true;chg('happy',15);const m=`${p.n}答應了，你們結婚了！`;log(m,'good');return G(m)}
  p.rel=cl(p.rel-20);chg('happy',-8);return B('對方拒絕了你的求婚。')
 }
 if(kind==='breakup'){const m=`你和${p.n}${p.married?'離婚':'分手'}了。`;if(p.married)S.money=Math.round(S.money/2);S.partner=null;chg('happy',-8);log(m,'bad');return B(m)}
 if(kind==='baby'){
  if(!p.married||S.age>50)return B('現在不適合生小孩。');
  if(S.acts.baby)return B('今年已經努力過了。');S.acts.baby=1;
  if(chance(.55)){const sx=pick(['男','女']),n=S.name[0]+given(sx,calYear());S.kids.push(newKid(sx,n));chg('happy',10);const m=`你們迎接了新生兒${n}！`;log(m,'good');return G(m)}
  return N('你們努力了，但還沒有好消息。')
 }
}
function buyHouse(i,mode){
 const h=HOUSES[i];if(S.house)return B('你已經有房子了。');
 if(mode==='cash'){if(S.money<h.p)return B('現金不夠。');S.money-=h.p}
 else{if(S.money<h.p*.2)return B('頭期款不夠。');S.money-=h.p*.2;S.mort={left:h.p*.8,pay:Math.round(h.p*.8/20*1.1)}}
 S.house={n:h.n,value:h.p};chg('happy',10);const m=`你買了${h.n}！`;log(m,'good');return G(m)
}
function sellHouse(){const v=S.house.value-(S.mort?S.mort.left:0);S.money+=v;const m=`你賣掉了${S.house.n}，淨得 ${money(v)}。`;S.house=null;S.mort=null;log(m);return N(m)}
function buyCar(i){const c=CARS[i];if(S.car)return B('你已經有車了。');if(S.money<c.p)return B('現金不夠。');S.money-=c.p;S.car={n:c.n,value:c.p};chg('happy',6);const m=`你買了${c.n}。`;log(m,'good');return G(m)}
function sellCar(){S.money+=S.car.value;const m=`你賣掉了${S.car.n}，得到 ${money(S.car.value)}。`;S.car=null;log(m);return N(m)}
