/* ---- p133：事件互相呼應（宿敵、舊友、受助者、導師與你的職涯）---- */
const xf=()=>{S.flags=S.flags||{};return S.flags};
E.push({id:'x_rival_biz',min:30,max:65,w:25,if:()=>{const r=S.npc&&S.npc.rival;return !!r&&r.s>=2&&!!S.job&&S.job.years>=3&&!xf().xRival},run:()=>{const r=S.npc.rival;xf().xRival=1;return {t:`業界消息傳來：老對手${r.n}也在你這行出人頭地，這次你們要爭同一個機會。`,c:[
 ch('正面公平競爭',()=>{S.stress=cl(S.stress+4);if(chance(.5+(S.job.perf||50)/400)){S.job.perf=Math.min(100,(S.job.perf||50)+4);S.money+=Math.round(S.job.sal*.15);chg('happy',5);return G(`你拿下機會，${r.n}大方地過來說恭喜。`)}chg('happy',-3);return B(`${r.n}略勝一籌，你心裡不甘，但也服氣。`)}),
 ch('主動提議攜手合作',()=>{if(r.t!=='敵'||chance(.4)){S.job.perf=Math.min(100,(S.job.perf||50)+3);S.money+=Math.round(S.job.sal*.2);S.net=cl((S.net||0)+2);return G(`兩人合作，成果比各自為戰更好。（${r.n}）`)}return N(`${r.n}婉拒了，說還是各憑本事。`)}),
 ch('退一步讓給他',()=>{S.karma=cl((S.karma||50)+2);chg('happy',1);r.t='友';return N(`你選擇禮讓，${r.n}對你多了一份敬意。`)})]}}});
E.push({id:'x_loan_biz',min:30,max:70,w:25,if:()=>xf().loanOK&&!xf().xLoan&&!!S.job&&S.job.years>=3,run:()=>{xf().xLoan=1;return {t:'當年你借過錢的老朋友，現在在業界有了人脈，說有個案子想介紹給你。',c:[
 ch('感謝並接下',()=>{if(chance(.7)){S.money+=Math.round(S.job.sal*.25);S.job.perf=Math.min(100,(S.job.perf||50)+3);chg('happy',5);return G('案子順利完成，你的名聲在圈內傳開。')}S.stress=cl(S.stress+3);return N('案子有些波折，但也學到了經驗。')}),
 ch('婉拒，不想佔便宜',()=>{S.karma=cl((S.karma||50)+2);return N('你說交情歸交情，他笑說你還是一樣老實。')})]}}});
E.push({id:'x_mentee_job',min:35,max:75,w:25,if:()=>xf().menteeOK&&!xf().xMentee&&!!S.job&&S.job.years>=3,run:()=>{xf().xMentee=1;return {t:'當年你資助的那位學生，現在剛好進了和你相關的領域，主動來向你請教。',c:[
 ch('傾囊相授',()=>{S.karma=cl((S.karma||50)+3);S.net=cl((S.net||0)+3);chg('happy',6);try{fmAdd(1)}catch(e){}return G('他後來成為你的得力夥伴，也在公開場合提起你當年的幫助。')}),
 ch('給點建議就好',()=>{chg('happy',2);return N('你們保持聯絡，偶爾互相問候。')})]}}});
E.push({id:'x_stay_friend',min:28,max:70,w:25,if:()=>xf().stayOK&&!xf().xStay&&!!S.job&&S.job.years>=2,run:()=>{xf().xStay=1;return {t:'當年你收留過的朋友，現在剛好在你公司附近上班，常約你吃午餐。',c:[
 ch('定期聚一聚',()=>{chg('happy',4);S.stress=cl(S.stress-3);return G('有他在，你覺得工作上的壓力輕了一些。')}),
 ch('偶爾見面就好',()=>{chg('happy',1);return N('你們維持著淡淡卻長久的交情。')})]}}});
E.push({id:'x_arc_mentor',min:30,max:65,w:25,if:()=>{const m=S.npc&&S.npc.mentor;return !!m&&m.s===0&&!!S.arc131&&Object.values(S.arc131).some(a=>a.st>=1)&&!xf().xMent},run:()=>{xf().xMent=1;const m=S.npc.mentor;return {t:`你在職涯上做出重要選擇後，導師${m.n}特地來看你，說想聽聽你的想法。`,c:[
 ch('虛心請他指點',()=>{m.s=Math.max(m.s,1);S.job.perf=Math.min(100,(S.job.perf||50)+3);chg('happy',3);return G('他的一句話點醒了你，你重新調整了方向。')}),
 ch('說自己已經有想法',()=>{chg('happy',1);return N('他笑著點頭，說你長大了。')})]}}});
/* 選項執行時若工作已不在，就當作事情不了了之，避免出錯 */
['jd_a','jd_ms','arc1','arc2','arc3','x_rival_biz','x_loan_biz','x_mentee_job','x_arc_mentor','x_stay_friend','np_r2','np_m0','np_m1','np_m2','whistle'].forEach(id=>{
 const ev=E.find(e=>e.id===id||e.id==='cq_'+id);if(!ev)return;const r0=ev.run;
 ev.run=function(){const r=r0.apply(this,arguments);if(r&&r.c)r.c=r.c.map(c=>{const f=c.f;c.f=function(){if(!S.job)return N('時過境遷，這件事不了了之。');return f.apply(this,arguments)};return c});return r};
});
const cqw=E.find(e=>e.id==='cqf_whistle');if(cqw){const r0=cqw.run;cqw.run=function(){const r=r0.apply(this,arguments);if(r&&r.c)r.c=r.c.map(c=>{const f=c.f;c.f=function(){if(!S.job)return N('時過境遷，這件事不了了之。');return f.apply(this,arguments)};return c});return r}}
