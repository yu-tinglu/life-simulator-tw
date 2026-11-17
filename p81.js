/* ---- p81：情敵故事線（出現→交鋒→結局），只發生在心儀對象身上 ---- */
function rvList(stage){return S.crush.map((c,i)=>({t:c,k:String(i)})).filter(x=>x.t.aff>=(stage===0?40:25)&&(stage===0?!x.t.rv:x.t.rv&&x.t.rv.s===stage&&S.age-x.t.rv.y>=1)&&!otDist(x.t,x.k))}
E.push({id:'otrv_a',min:16,max:60,w:2,if:()=>rvList(0).length>0&&!S.jail,run:()=>{
 const g=pick(rvList(0)),t=g.t,nm=t.n,rn=fullName(t.sx==='男'?'女':'男'),rv={n:rn,s:1,y:S.age,sc:0};
 return {t:`你發現${rn}也在接近${nm}，兩人聊得很開心。（情敵）`,c:[
  ch('大方打招呼，照常相處',()=>{t.rv=rv;rv.sc+=1;otAdd(t,g.k,3);return N(`你沒有亂了陣腳，${nm}覺得你很穩重。（好感 +3）`)}),
  ch('主動拉近和對方的距離',()=>{t.rv=rv;rv.sc+=2;otAdd(t,g.k,5);return G(`你多找了${nm}幾次，${nm}看起來很開心。（好感 +5）`)}),
  ch('假裝不在意',()=>{t.rv=rv;rv.sc-=2;otAdd(t,g.k,-4);return B(`你的冷淡讓${nm}有點不解。（好感 -4）`)})]}}});
E.push({id:'otrv_b',min:16,max:65,w:3,if:()=>rvList(1).length>0&&!S.jail,run:()=>{
 const g=pick(rvList(1)),t=g.t,nm=t.n,rv=t.rv;
 return {t:`${rv.n}約你私下聊聊：「我是認真的，希望公平競爭。」（情敵交鋒）`,c:[
  ch('說：「那就各憑本事，但別傷到${nm}。」'.replace('${nm}',nm),()=>{rv.s=2;rv.y=S.age;rv.sc+=2;otAdd(t,g.k,4);return G(`你的態度很坦蕩，傳到${nm}耳中，印象加分。（好感 +4）`)}),
  ch('用心準備，約'+nm+'做對方喜歡的事（NT$3,000）',()=>{if(S.money<3000)return B('你的錢不夠。');S.money-=3000;rv.s=2;rv.y=S.age;rv.sc+=3;otAdd(t,g.k,8);return G(`你把心思放在${nm}身上，而不是對手。（好感 +8）`)}),
  ch('在背後說對方壞話',()=>{rv.s=2;rv.y=S.age;rv.sc-=4;otAdd(t,g.k,-9);chg('happy',-3);return B(`${nm}聽到後皺起眉頭：「這不像你。」（好感 -9）`)})]}}});
E.push({id:'otrv_c',min:16,max:70,w:4,if:()=>rvList(2).length>0&&!S.jail,run:()=>{
 const g=pick(rvList(2)),t=g.t,nm=t.n,rv=t.rv,sc=rv.sc+(t.aff-50)/12;
 rv.s=3;
 if(sc>=3||t.aff>=70){otAdd(t,g.k,10);chg('happy',8);log(`${nm}在你與${rv.n}之間，選擇了你。`,'good');return {t:`${nm}告訴你：「我想清楚了，我在意的人是你。」${rv.n}後來也祝福了你們。`,c:[ch('握住對方的手',()=>G('你們的距離更近了。（好感 +10）'))]}}
 if(sc<=-1&&t.aff<45){const idx=S.crush.indexOf(t);log(`${nm}最後和${rv.n}走在了一起。`,'bad');return {t:`${nm}說：「對不起，我選擇了${rv.n}。」你們的緣分到此為止。`,c:[ch('祝福對方，轉身離開',()=>{const i=S.crush.indexOf(t);if(i>=0)S.crush.splice(i,1);chg('happy',-8);return B('這段暗戀結束了，你需要一些時間走出來。')}),ch('說出心裡的話',()=>{const i=S.crush.indexOf(t);if(i>=0)S.crush.splice(i,1);chg('happy',-5);return N('你把心意說了出來，雖然沒有結果，但心裡舒坦了一些。')})]}}
 return {t:`${rv.n}主動退出了：「我看得出來，${nm}心裡還在猶豫。」局勢回到你和${nm}之間。`,c:[ch('把握機會好好相處',()=>{otAdd(t,g.k,4);return G('你們的關係悄悄拉近了。（好感 +4）')})]}}});
