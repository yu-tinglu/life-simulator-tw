/* ---- p109：故事性——人生章節、反覆出現的人物、因果事件、人生主題與遺憾、墓誌銘、家族遺物（皆為遊戲設定）---- */
/* 1. 人生章節 */
function chapKey(){
 if(S.age<18)return '成長';
 if(S.school)return '求學';
 if(S.ab&&S.ab.visa&&S.cn!=='TW')return '異鄉';
 if(S.pol&&S.pol.office&&S.pol.office.lv>=2)return '從政';
 if(S.co||(S.job&&S.job.founder))return '創業';
 if(S.flags&&(S.flags.retired||S.flags.fpen)||S.age>=65)return '晚年';
 if(S.kids&&S.kids.length&&S.age<65)return '成家';
 return '打拚';
}
function chapSum(c,nw){
 const d=nw-c.nw0,w=Math.abs(d)<1e5?'變化不大':d>0?`資產增加約 ${money(d)}`:`資產減少約 ${money(-d)}`;
 const t={成長:'在家人身邊長大，慢慢知道自己是什麼樣的人。',求學:'把大部分時間花在學習與探索上。',異鄉:'在異鄉生活，學著適應另一種節奏。',從政:'投身公共事務，承擔了更多人的期待。',創業:'自己當老闆，成敗都由自己扛。',晚年:'腳步慢下來，開始回頭看走過的路。',成家:'生活圍繞著家人轉。',打拚:'為生活與理想努力工作。'}[c.k]||'';
 return `${t}${w}。`;
}
function chapUpdate(){
 if(!S.chap)S.chap=[];
 let cur=S.chap[S.chap.length-1],nk=chapKey(),nw=0;try{nw=netWorth()}catch(e){}
 if(!cur){S.chap.push({k:nk,from:S.age,nw0:nw});return}
 if(cur.k===nk)return;
 const dur=S.age-cur.from;
 if(dur<3&&nk!=='晚年'&&nk!=='異鄉'&&cur.k!=='成長')return;
 cur.to=S.age;cur.sum=chapSum(cur,nw);
 S.chap.push({k:nk,from:S.age,nw0:nw});
 try{log(`新的篇章：${nk}。`,'')}catch(e){}
}
function chapList(){
 const L=(S.chap||[]).slice();
 return L.map((c,i)=>{const last=i===L.length-1;return {k:c.k,a:c.from,b:last?S.age:c.to,s:last&&!c.sum?chapSum(c,(()=>{try{return netWorth()}catch(e){return c.nw0}})()):c.sum}});
}
const _y109=yearly;
yearly=function(){const r=_y109.apply(this,arguments);try{if(S&&!S.dead)chapUpdate()}catch(e){}return r};
function chapHTML(){
 const L=chapList();
 return `<h3>人生章節</h3>`+(L.length?L.map((c,i)=>`<div class="item"><b>第 ${i+1} 章・${c.k}</b>（${c.a}–${c.b} 歲）<div class="sub">${esc(c.s||'')}</div></div>`).join(''):'<div class="sub">還沒有紀錄。</div>')+`<button class="btn" data-a="lf:set:legalx">← 返回設定</button>`;
}
const _sh109=setHTML;
setHTML=function(){return _sh109().replace('<button class="btn" data-a="lf:set:arch">','<button class="btn" data-a="lf:set:chap">人生章節</button><button class="btn" data-a="lf:set:arch">')};
const _lh109=lifeHTML;
lifeHTML=function(){if(view.lsub==='chap')return chapHTML();return _lh109()};
const _lf109=lfHandle;
lfHandle=function(x,y,z,u){if(x==='set'&&y==='chap'){view.lsub='chap';return null}return _lf109(x,y,z,u)};
/* 2. 反覆出現的人物：導師、對手、舊識近況 */
function npcInit(){if(!S.npc)S.npc={};return S.npc}
E.push({id:'npc_mentor',min:19,max:40,w:3,if:()=>!npcInit().mentor&&(S.job||S.school),run:()=>{const sx=pick(['男','女']),n=fullName(sx);return {t:`${S.school?'學校':'職場'}裡有位前輩${n}注意到你，願意花時間帶你。`,c:[
 ch('虛心請教，認真學習',()=>{npcInit().mentor={n,y:calYear(),rel:70};chg('smarts',2);chg('happy',3);return G(`${n}成了你的導師，你學到許多書本以外的事。`)}),
 ch('客氣道謝，自己摸索',()=>N('你婉謝了好意，繼續自己的路。'))]}}});
E.push({id:'npc_rival',min:20,max:42,w:3,if:()=>!npcInit().rival&&S.job&&!S.job.founder,run:()=>{const sx=pick(['男','女']),n=fullName(sx);return {t:`同期進來的${n}處處和你較勁，連一個小專案都要比。`,c:[
 ch('把它當成進步的動力',()=>{npcInit().rival={n,y:calYear()};S.job.perf=Math.min(100,(S.job.perf||50)+4);S.stress=cl(S.stress+3);return N(`你和${n}暗自較勁，彼此都進步了。`)}),
 ch('不計較，各做各的',()=>{npcInit().rival={n,y:calYear()};return N(`你不和${n}比較，但也沒有成為朋友。`)})]}}});
E.push({id:'npc_mentor_old',min:48,max:85,w:3,if:()=>npcInit().mentor&&!npcInit().mentor.done&&S.age-(npcInit().mentor.y?calYear()-npcInit().mentor.y:0)>0&&calYear()-npcInit().mentor.y>=15,run:()=>{const m=npcInit().mentor;return {t:`多年前帶你的導師${m.n}年事已高，聽說身體不太好，想見你一面。`,c:[
 ch('專程去探望，道謝',()=>{m.done=1;chg('happy',6);S.stress=cl(S.stress-3);return G(`你向${m.n}說出多年沒說的感謝，兩人都紅了眼眶。`)}),
 ch('寄一份禮物，打電話問候',()=>{m.done=1;S.money-=2e4;chg('happy',2);return N(`你寄去禮物，電話裡聊了很久。`)}),
 ch('太忙了，下次再說',()=>{m.done=1;chg('happy',-4);return B(`你一直沒抽出時間。後來你才知道，那是最後的機會。`)})]}}});
E.push({id:'npc_rival_re',min:40,max:80,w:3,if:()=>npcInit().rival&&!npcInit().rival.done&&calYear()-npcInit().rival.y>=15,run:()=>{const r=npcInit().rival,up=chance(.5);return {t:up?`你在一場場合遇到老對手${r.n}，對方現在事業比你還成功，主動走過來打招呼。`:`你聽說老對手${r.n}這幾年過得不太順，在街上偶然碰到。`,c:[
 ch(up?'真心恭喜，聊起當年':'請他吃頓飯，聊聊近況',()=>{r.done=1;chg('happy',4);S.friends.length<14&&S.friends.push({n:r.n,sx:'男',rel:55,tru:50,kind:'老對手',tr:pick(FTR),loan:0});return G(`你們笑著談起當年的較勁，成了不打不相識的朋友。`)}),
 ch('點頭示意就離開',()=>{r.done=1;return N(`你們互相點了頭，各自走開。`)})]}}});
E.push({id:'npc_friend_news',min:30,max:85,w:5,if:()=>S.friends&&S.friends.some(f=>f.rel>=50&&!f.sib),run:()=>{const f=pick(S.friends.filter(x=>x.rel>=50&&!x.sib)),st=pick(['結婚了','生了孩子','升了職','搬到國外','生了一場病','開了自己的小店']);return {t:`多年的朋友${f.n}傳來消息：他最近${st}。`,c:[
 ch('打電話過去關心',()=>{f.rel=cl(f.rel+6);f.tru=cl(f.tru+3);chg('happy',3);return G(`你們聊了很久，像回到從前。`)}),
 ch('傳訊息祝福',()=>{f.rel=cl(f.rel+2);return N('你傳了訊息，他很快回覆了。')}),
 ch('忙，沒回',()=>{f.rel=cl(f.rel-5);return B('你想著晚點回，後來就忘了。')})]}}});
/* 3. 因果事件：呼應過去的選擇 */
E.push({id:'cause_karma_hi',min:50,max:90,w:3,if:()=>S.karma>=70,run:()=>({t:'一位陌生人在路上認出你，說多年前你幫過他的忙，他一直記得。',c:[
 ch('笑著說只是舉手之勞',()=>{chg('happy',5);return G('你回家的路上，心裡暖暖的。')}),
 ch('邀他喝杯咖啡聊聊',()=>{chg('happy',6);S.friends.length<14&&S.friends.push(newFriend('舊識'));return G('你們聊得很投緣，後來常聯絡。')})]})});
E.push({id:'cause_karma_lo',min:45,max:85,w:3,if:()=>S.karma<=30,run:()=>({t:'多年前被你傷害過的人找上門，說他一直沒有放下。',c:[
 ch('誠心道歉',()=>{S.karma=Math.min(100,S.karma+8);chg('happy',-2);S.stress=cl(S.stress-4);return N('對方沉默很久，最後說：「我只是想聽到這句話。」')}),
 ch('否認或迴避',()=>{S.stress=cl(S.stress+6);chg('happy',-5);return B('對方失望地離開，你心裡反而更不踏實。')})]})});
E.push({id:'cause_kid_cold',min:40,max:85,w:4,if:()=>S.kids&&S.kids.some(k=>k.age>=22&&k.rel<40),run:()=>{const k=pick(S.kids.filter(x=>x.age>=22&&x.rel<40));return {t:`${k.n}平常不太跟你聯絡，這次難得開口：「小時候你總是不在。」`,c:[
 ch('認真道歉，聽他說完',()=>{k.rel=Math.min(100,k.rel+15);chg('happy',2);return G(`${k.n}紅著眼眶，這是你們第一次好好談心。`)}),
 ch('解釋當年有苦衷',()=>{k.rel=Math.min(100,k.rel+4);return N('你說了很多，對方只是點頭。')}),
 ch('不想談這個',()=>{k.rel=Math.max(0,k.rel-6);chg('happy',-3);return B('談話不歡而散。')})]}}});
E.push({id:'cause_friend_loan',min:35,max:85,w:3,if:()=>S.friends&&S.friends.some(f=>f.loan>0&&f.rel<=45),run:()=>{const f=pick(S.friends.filter(x=>x.loan>0&&x.rel<=45));return {t:`${f.n}在聚會上碰到你，尷尬地說起以前借的 ${money(f.loan)}。`,c:[
 ch('算了，不用還了',()=>{f.loan=0;f.rel=cl(f.rel+15);S.karma=Math.min(100,S.karma+4);return G(`${f.n}鬆了一口氣，說會記得這份情。`)}),
 ch('還是希望你慢慢還',()=>N('對方點頭，說會想辦法。'))]}}});
/* 4. 人生主題與遺憾 */
function lifeTheme(){
 const sc={事業:0,家庭:0,漂泊:0,助人:0};
 try{sc.事業=Math.min(40,Math.max(0,netWorth())/5e6)+(S.job?S.job.lv||0:0)+(S.coHist||0)*4+(S.co?6:0);
  sc.家庭=(S.kids?S.kids.length:0)*6+(S.partner&&S.partner.married?10:0)+(S.hist?S.hist.length:0)*3;
  sc.漂泊=(S.ab?S.ab.yrs||0:0)+(S.cn!=='TW'?8:0);
  sc.助人=Math.max(0,(S.karma||50)-50)/3+((S.flags&&S.flags.donor)||0)*2}catch(e){}
 return Object.entries(sc).sort((a,b)=>b[1]-a[1])[0];
}
function regrets(){
 const r=[];
 try{if(!S.partner&&!(S.kids||[]).length&&S.age>=55)r.push('沒有組成自己的家庭');
  if(S.edu<=2)r.push('沒有機會多讀一點書');
  if(!(S.coHist||0)&&!S.co&&(S.stress||0)>50)r.push('一直沒有試試自己創業');
  if((S.kids||[]).some(k=>k.rel<40))r.push('和孩子之間留著遺憾');
  if(S.friends&&S.friends.filter(f=>f.rel>=60).length===0)r.push('身邊少了能談心的朋友');
  if(S.record>0)r.push('年輕時走過的彎路')}catch(e){}
 return r.slice(0,2);
}
E.push({id:'life_review',min:62,max:88,w:5,if:()=>!S.reviewed,run:()=>{S.reviewed=1;const th=lifeTheme(),rg=regrets();S.theme=th[0];return {t:`回頭看這一生，你最看重的是「${th[0]}」。${rg.length?'如果還有一件事能重來，你想起：'+rg.join('、')+'。':'你覺得，大致沒有太多遺憾。'}`,c:[
 ch('接受，繼續好好過',()=>{chg('happy',3);S.stress=cl(S.stress-4);return G('你安靜地想了一陣，心裡踏實了。')}),
 ch('趁現在試著彌補一件',()=>{chg('happy',5);S.stress=cl(S.stress+2);return G('你踏出了第一步，哪怕只是一通電話。')})]}}});
/* 5. 墓誌銘：引用一生中的關鍵人物與事件 */
function epitaph(){
 try{
  const th=lifeTheme()[0],sp=S.partner&&S.partner.married?S.partner.n:null,m=S.npc&&S.npc.mentor?S.npc.mentor.n:null,L=chapList().map(c=>c.k).filter((v,i,a)=>a.indexOf(v)===i);
  const nm=S.name;let t=`${nm}的一生，大致圍繞著「${th}」。`;
  if(L.length>=3)t+=`走過${L.slice(0,4).join('、')}，`;
  if(sp)t+=`身邊有${sp}相伴，`;
  if(m)t+=`也記得導師${m}的指點，`;
  const rg=regrets();t+=rg.length?`留下的遺憾是${rg[0]}。`:`沒有太多遺憾。`;
  return t.replace(/，$/,'。');
 }catch(e){return ''}
}
const _ls109=lifeStory;
lifeStory=function(){const t=_ls109.apply(this,arguments),e=epitaph();let ch='';try{ch=chapList().map(c=>`・${c.k}（${c.a}–${c.b} 歲）`).join('\n')}catch(x){}return (e?e+'\n\n':'')+(ch?'人生章節：\n'+ch+'\n\n':'')+t};
const _se109=showEnd;
showEnd=function(){
 _se109.apply(this,arguments);
 try{const e=epitaph(),mb=document.getElementById('modalBody');if(e&&mb){const h=mb.querySelector('h3');if(h)h.insertAdjacentHTML('afterend',`<div class="item" style="line-height:1.7">${esc(e)}</div>`)}}catch(x){}
};
/* 6. 家族遺物：後代整理先人留下的東西 */
E.push({id:'fam_legacy',min:25,max:60,w:4,if:()=>S.hist&&S.hist.length>0&&!S.famDone,run:()=>{S.famDone=1;const h=S.hist[S.hist.length-1],it=pick(['一本泛黃的日記','一封沒寄出的信','一張老照片','一本寫滿筆記的食譜','一只舊懷錶']),jb=h.job?`，他生前是${h.job}`:'';return {t:`整理${h.name}（第 ${h.gen} 代）的遺物時，你發現${it}${jb}。`,c:[
 ch('仔細讀完，好好收起來',()=>{chg('happy',4);S.stress=cl(S.stress-3);return G(`你讀著${h.name}留下的字句，覺得和他靠近了一點。`)}),
 ch('拿給家人一起看',()=>{(S.kids||[]).forEach(k=>{k.rel=Math.min(100,(k.rel||50)+3)});chg('happy',3);return G('全家人圍著聊起從前的故事。')}),
 ch('先放回箱子裡',()=>N('你把它收好，想著以後再說。'))]}}});
