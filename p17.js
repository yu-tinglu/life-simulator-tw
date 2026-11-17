/* ---- 寫實壽命與多樣死因（內政部簡易生命表／衛福部十大死因為校準依據，遊戲內為簡化模型） ---- */
const CAUSEK='lifesim_tw_cause_v1';
const MQ={男:[1.9312e-3,.083,.0012,.0009],女:[8.4462e-4,.091,.0005,.0003]};
let MK=.38;
function baseQ(a,sx){
 const m=MQ[sx==='女'?'女':'男'];
 if(a===0)return .0035;if(a<15)return .00018;if(a<25)return m[3];if(a<40)return m[2];
 return Math.min(1,m[0]*Math.exp(m[1]*(a-40)));
}
function riskMult(){
 const h=S.health;let m=Math.exp((62-h)*.010);m=Math.max(.5,Math.min(3.2,m));
 if(S.flags&&S.flags.smoker&&S.age>=30)m*=1.45;
 const ad=S.addict;if(ad&&(ad.k==='酒精'||ad.k==='抽菸'))m*=1+ad.lv*.05;
 if((S.dep||0)>=70)m*=1.2;
 if((S.stress||0)>70)m*=1.15;
 if(S.diff===2)m*=1.08;else if(S.diff===0)m*=.95;
 return m;
}
function wp(l){let t=0;l.forEach(x=>t+=x[1]);let r=Math.random()*t;for(const x of l){r-=x[1];if(r<=0)return x[0]}return l[l.length-1][0]}
const CAUSES=[
 ['癌',[8,10,28,40,32,17]],['心',[4,5,10,12,13,13]],['肺炎',[3,1,2,4,7,13]],['腦',[1,2,5,7,7,7]],
 ['糖',[0,1,3,5,6,5]],['高',[0,0,1,2,3,5]],['事',[25,38,22,8,3,3]],['腎',[1,0,1,2,4,4]],
 ['慢呼',[0,0,0,1,3,4]],['自',[3,25,15,5,2,1]],['肝',[0,0,3,5,2,1]],['衰',[0,0,0,0,2,10]],
 ['敗',[2,1,1,2,3,4]],['先',[30,10,3,1,1,1]]
];
function causePick(forced,ov){
 const a=ov?ov.a:S.age,i=a<15?0:a<30?1:a<45?2:a<65?3:a<80?4:5,f=ov?ov.f:S.sx==='女',ad=ov?null:S.addict,sm=ov?0:S.flags&&S.flags.smoker;
 const jt=ov||!S.job?'':S.job.t,risky=/營造|工地|司機|外送|貨運|漁|礦|消防|警察|軍|保全/.test(jt);
 const SD=ov?{dep:0,money:0,stress:0,health:60}:S;
 const L=CAUSES.map(([k,w])=>{let x=w[i];
  if(k==='肝'&&!f)x*=2;if(k==='事'&&!f)x*=1.4;if(k==='自'&&!f)x*=1.8;if(k==='衰'&&f)x*=1.3;if(k==='高'&&f)x*=1.2;
  if(k==='事'&&risky)x*=2;
  if(k==='自'){x*=1+(SD.dep||0)/100+(SD.money<-2e6?1:0)+(ad&&ad.k==='賭博'?1:0)}
  if(k==='癌'&&(sm||(ad&&ad.k==='酒精')))x*=1.3;
  if(k==='肝'&&ad&&ad.k==='酒精')x*=1+ad.lv*.3;
  if(k==='慢呼'&&sm)x*=2.5;if(k==='心'&&(sm||SD.stress>70))x*=1.3;if(k==='腦'&&SD.stress>70)x*=1.25;
  if(k==='糖'&&SD.health<45)x*=1.3;
  if(k==='事'&&ad&&ad.k==='酒精')x*=1+ad.lv*.1;
  if(forced&&(k==='事'||k==='自'||k==='先'))x=0;
  if(SD.health>=75&&(k==='糖'||k==='腎'||k==='高'||k==='敗'||k==='肺炎'))x*=.6;
  return [k,x]});
 const k=wp(L);let c;
 switch(k){
 case'癌':{const l=f?[['肺癌',22],['乳癌',14],['大腸癌',14],['肝癌',12],['胰臟癌',7],['卵巢癌',4],['子宮頸癌',3],['胃癌',4]]:[['肺癌',20],['肝癌',17],['大腸癌',13],['口腔癌',10],['攝護腺癌',6],['胰臟癌',5],['食道癌',6],['胃癌',4]];
  c=wp(l.map(([n,w])=>[n,w*((n==='肺癌'||n==='口腔癌'||n==='食道癌')&&sm?2:1)*((n==='肝癌'||n==='口腔癌'||n==='食道癌')&&ad&&ad.k==='酒精'?2:1)*(n==='乳癌'&&a<30?.3:1)*(n==='攝護腺癌'&&a<55?.1:1)]));break}
 case'心':c=wp([['急性心肌梗塞',50],['心臟衰竭',30],['心律不整猝死',20]]);break;
 case'腦':c=wp([['腦中風',70],['腦出血',30]]);break;
 case'肺炎':c='肺炎';break;case'糖':c='糖尿病併發症';break;case'高':c='高血壓性疾病';break;
 case'腎':c='慢性腎臟病（尿毒症）';break;case'慢呼':c='慢性阻塞性肺病';break;
 case'事':c=a>=70?wp([['跌倒意外',45],['交通事故',40],['溺水',5],['火災',5],['中毒',5]]):a<15?wp([['交通事故',45],['溺水',25],['跌倒意外',10],['火災',10],['窒息',10]]):wp([['機車交通事故',48],['汽車交通事故',10],['溺水',9],['墜落意外',9],['工安意外',risky?25:6],['火災',4],['登山意外',4],['中毒',3]]);break;
 case'自':c='自殺';break;case'肝':c=wp([['肝硬化',55],['慢性肝炎',45]]);break;
 case'衰':c=wp([['失智症',60],['老衰',40]]);break;case'敗':c='敗血症';break;
 default:c=wp([['先天性疾病',60],['嬰兒猝死症',20],['罕見疾病',20]]);
 }
 return {c,k};
}
deathCheck=function(){
 const a=S.age;
 if(a>=112){const r={c:'老衰',k:'衰'};S.causeK=r.k;return r.c}
 if(S.health<=0&&chance(.3)){const r=causePick(true);S.causeK=r.k;return r.c}
 if(chance(Math.min(1,baseQ(a,S.sx)*riskMult()*MK*(S.sx==="女"?.9:1)))){const r=causePick(false);S.causeK=r.k;return r.c}
 return null;
};
const _die17=die;
die=function(c){
 try{const g=lsGet(CAUSEK,{});g[c]=(g[c]||0)+1;lsSet(CAUSEK,g)}catch(e){}
 _die17(c);
};
const _endInfo17=endInfo;
endInfo=function(){
 let h=_endInfo17();
 if(S.cause==='自殺')h+='<p class="sub">這是遊戲裡的人生故事。若你或身邊的人正感到痛苦，可撥 1925（安心專線，24 小時）或 1995（生命線）。</p>';
 return h+`<p class="sub">死因：${esc(S.cause||'')}　（台灣 2025 年平均餘命約 81 歲，男女有落差）</p>`;
};
const _achHTML17=achHTML;
achHTML=function(){
 const g=lsGet(CAUSEK,{}),ks=Object.keys(g);
 let h=_achHTML17();
 const sec=`<div class="sec">已見過的死因（${ks.length}）</div>`+(ks.length?ks.map(k=>`<div class="item">${esc(k)}　×${g[k]}</div>`).join(''):'<p class="sub">還沒有紀錄。</p>');
 const i=h.lastIndexOf('<button class="btn" data-a="back">');
 return i>=0?h.slice(0,i)+sec+h.slice(i):h+sec;
};
