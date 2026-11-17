/* ---- p64：出國留學入口（畢業時可選）與獎學金留學 ---- */
function wUniSch(k){
 wEnsure();
 if(S.edu!==3||S.school||S.age<17)return B('需高中（職）畢業且目前沒有在學。');
 if(S.cn!=='TW'&&!(S.ab&&S.cn===k))return B('你目前住在國外，請先回台灣或直接在當地就讀。');
 if(!WD[k])return B('這個國家目前無法申請。');
 if(S.acts['wsch'+k])return B('今年已經申請過這個國家的獎學金了。');
 if(S.grade<65||S.smarts<60)return B('申請獎學金需要成績 65、智力 60 以上，目前條件不足。');
 S.acts['wsch'+k]=1;
 const fee=Math.min(S.money,5000);S.money-=fee;
 const e=WD[k].e||3,lang=S.lang&&S.lang[k]!=null?S.lang[k]:langInit(k),islang=['en','sg'].includes(CNS[k].lgn);
 const sc=S.grade*.5+S.smarts*.5,p=clmp(.08+(sc-65)/110+(islang||lang>=50?.08:-.1)-(e-3)*.05,.03,.6);
 if(!chance(p)){chg('happy',-4);return B(`你申請${WD[k].n}的獎學金留學沒有成功（機率約 ${Math.round(p*100)}%），支付申請費 ${money(fee)}。`)}
 const full=sc>=85&&chance(.5),yrs=(['GB','AU','NZ','IE'].includes(k)||WD[k].reg==='EW')?3:4,t=tuitTW(k);
 const ownT=full?0:Math.round(t*.5);
 const mv=30000,pay=Math.min(S.money,mv);S.money-=pay;if(pay<mv)S.sloan=(S.sloan||0)+(mv-pay);
 S.cn=k;S.ab={cn:k,visa:'study',left:0,yrs:0,wk:0,nojob:0,nu:0,minor:0,fam:famShare(),sch:full?1:0};
 S.lang[k]=cl((S.lang[k]!=null?S.lang[k]:langInit(k))+(islang?10:20));S.trav[k]=(S.trav[k]||0)+1;
 enroll('大學',yrs,ownT,e>=5?3:e>=4?2:e>=3?1:0);chg('happy',10);
 if(!S.major){S.exam=exScore();queue.push(catEvent({exam:'當地入學考試',abroad:`${WD[k].n}大學`}))}
 const m=full?`你拿到${WD[k].n}的全額獎學金（學費全免，每年另有生活津貼），前往就讀大學（${yrs} 年）。`:`你拿到${WD[k].n}的半額獎學金，學費每年約 ${money(ownT)}（可搭配學貸、打工），前往就讀大學（${yrs} 年）。`;
 log(m,'good');return G(m);
}
function wHSsch(k){
 wEnsure();
 if(S.age<14||S.age>17)return B('限 14–17 歲的國中與高中階段。');if(!['國中','高中','高職'].includes(S.school))return B('需正在就讀國中或高中。');if(S.ab)return B('你已經在國外。');
 if(!WD[k])return B('這個國家目前無法申請。');if(S.acts['whs'+k])return B('今年已經申請過了。');
 if(S.grade<80||S.smarts<70)return B('申請高中階段的留學獎學金需要成績 80、智力 70 以上。');
 S.acts['whs'+k]=1;
 const lang=S.lang&&S.lang[k]!=null?S.lang[k]:langInit(k),islang=['en','sg'].includes(CNS[k].lgn);
 const p=clmp(.1+(S.grade-80)/120+(S.smarts-70)/200+(islang||lang>=50?.06:-.08),.03,.45);
 if(!chance(p)){chg('happy',-3);return B(`${WD[k].n}的高中留學獎學金沒有申請上（機率約 ${Math.round(p*100)}%）。`)}
 S.cn=k;S.ab={cn:k,visa:'study',left:0,yrs:0,wk:0,nojob:0,nu:0,minor:1,fam:0,sch:1};S.tuition=0;
 S.lang[k]=cl((S.lang[k]!=null?S.lang[k]:langInit(k))+20);[S.mom,S.dad].forEach(x=>{if(x&&x.alive)x.rel=cl(x.rel-3)});S.trav[k]=(S.trav[k]||0)+1;
 chg('happy',R(2,8));const m=`你拿到${WD[k].n}的全額獎學金，前往就讀${S.school}（學費與寄宿由獎學金支應）。`;log(m,'good');return G(m);
}
const _lh64=lfHandle;
lfHandle=function(x,y,z,u){if(x==='wd'&&y==='sch')return wUniSch(z);if(x==='wd'&&y==='hss')return wHSsch(z);return _lh64(x,y,z,u)};
const _wc64=wdCtry;
wdCtry=function(k){
 const h=_wc64(k),btn=(a,t,s,dis)=>`<button class="btn" data-a="${a}" ${dis?'disabled':''}>${t}<small>${s}${dis?'・'+dis:''}</small></button>`;
 const b1=btn(`lf:wd:hss:${k}`,'高中留學獎學金申請','成績 80、智力 70 以上才有機會，全額補助',S.age<14||S.age>17?'限 14–17 歲就學中':S.ab?'你已在國外':'');
 const b2=btn(`lf:wd:sch:${k}`,'大學獎學金申請（家境不限）','成績 65、智力 60 以上；全額或半額，機率依成績與語言',S.edu!==3||S.school||S.age<17?'需高中畢業且未在學':'');
 const mk=`<button class="btn" data-a="cn:mv:${k}:study"`;
 return h.includes(mk)?h.replace(mk,b1+b2+mk):h;
};
const _y64=yearly;
yearly=function(){
 _y64();
 try{if(S.ab&&S.ab.sch&&S.ab.visa==='study'&&S.cn!=='TW'&&!S.dead){const g=Math.round((S.ab.minor?.35:.6)*wTW(S.cn));S.money+=g;log(`獎學金生活津貼 ${money(g)}。`,'good')}}catch(e){}
};
/* 高中畢業時可選擇出國留學 */
const _eu64=E_UNI.run;
E_UNI.run=function(){
 const r=_eu64();
 if((S.cn||'TW')!=='TW'||!r||!r.c||(S.ab&&S.ab.visa))return r;
 const ctr=['US','GB','JP','AU','CA','DE','SG','KR','NL','FR'].filter(k=>WD[k]);
 if(!ctr.length)return r;
 const pickMode=k=>({run:()=>({t:`你想怎麼前往${WD[k].n}念大學？（家境：${S.fam}；成績 ${S.grade}、智力 ${S.smarts}）`,c:[
   ch(`自費／由家人支持${S.fam==='清寒'?'（家境清寒，通常負擔不起）':''}`,()=>{const x=wUni(k);if(x[1]==='bad'&&!S.school)queue.unshift(E_UNI);return x}),
   ch('申請獎學金（成績好才有機會）',()=>{const x=wUniSch(k);if(x[1]==='bad'&&!S.school)queue.unshift(E_UNI);return x}),
   ch('先不出國了',()=>{queue.unshift(E_UNI);return N('你回頭想想其他選項。')})]})});
 const pickC={run:()=>({t:'你想去哪個國家念大學？',c:ctr.map(k=>ch(WD[k].n,()=>{queue.unshift(pickMode(k));return N(`你開始研究去${WD[k].n}念大學。`)})).concat([ch('先不出國了',()=>{queue.unshift(E_UNI);return N('你回頭想想其他選項。')})])})};
 const c=r.c.slice();c.splice(Math.max(1,c.length-1),0,ch('出國念大學（自費或獎學金）',()=>{queue.unshift(pickC);return N('你開始研究出國留學。')}));
 return Object.assign({},r,{c});
};
