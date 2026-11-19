/* ---- p128：傳承連續感（遺願、家風）、更多後果鏈、人生轉折 ---- */
/* === 1. 傳承：前代的目標與家風會傳給繼承人 === */
const _as128=applySuccession;
applySuccession=function(r,k){
 let o=null;
 try{g127();o={goal:S.goal,done:!!(S.flags&&S.flags.goalDone),name:S.name,title:(typeof endTitle==='function'?endTitle():''),lg:S.lg||[],karma:S.karma||50,wish:S.wish}}catch(e){}
 const res=_as128.apply(this,arguments);
 try{
  if(!o)return res;
  g127();
  const lg=o.lg.slice();lg.push({gen:(S.gen||2)-1,name:o.name,title:o.title,done:o.done});
  S.lg=lg;
  const nd=lg.filter(x=>x.done).length;
  if(nd>=1)S.net=cl((S.net||0)+5);
  if(nd>=2)S.happy=cl(S.happy+3);
  if(nd>=3)S.smarts=cl(S.smarts+2);
  if(!o.done&&o.goal&&GOALS.find(x=>x.id===o.goal))S.wish={goal:o.goal,from:o.name};
  if(o.karma>=70)S.flags.motto='厚道';else if(o.karma<=30)S.flags.motto='精明';
  if(nd||S.wish||S.flags.motto)log(`家族傳承：${o.name}留下了${S.wish?'一個沒完成的心願':'家風'}${nd?`，家族累計 ${nd} 代完成人生目標`:''}。`,'');
 }catch(e){}
 return res;
};
E.push({id:'wish128',min:16,max:30,w:40,if:()=>S.wish&&!S.wish.done,run:()=>{const w=S.wish,G=GOALS.find(x=>x.id===w.goal);return {t:`整理家裡舊物時，你找到${w.from}留下的筆記，上面寫著他沒能完成的目標：${G.n}（${G.d}）。`,c:[
 ch('把它當成自己的目標',()=>{S.goal=w.goal;S.gms={};w.done=1;chg('happy',3);return G2('你決定替他走完這一段。')}),
 ch('尊重他，但走自己的路',()=>{w.done=1;S.karma=cl((S.karma||50)+1);return N('你把筆記收好，留作紀念。')})]}}});
const G2=t=>G(t);
const _fh128=famHTML;
famHTML=function(){
 const lg=S.lg||[];
 return _fh128()+(lg.length?`<div class="sec op">歷代傳承</div>`+lg.map(x=>`<div class="item"><b>第 ${x.gen} 代 ${esc(x.name)}</b><div class="sub">${esc(x.title||'平凡人生')}${x.done?'・完成人生目標':''}</div></div>`).join('')+`<div class="sub">累計 ${lg.filter(x=>x.done).length} 代完成人生目標：1 代起人脈加成，2 代起心情加成，3 代起智力加成。</div>`:'')+(S.flags&&S.flags.motto?`<div class="sub">家風：${S.flags.motto}</div>`:'');
};
/* === 2. 更多後果鏈 === */
/* 目擊職場不當行為 */
E.push({id:'cq_whistle',min:25,max:55,w:3,if:()=>!!S.job&&S.job.years>=2&&!S.job.founder&&!cqHas('whistle'),run:()=>({t:'你發現主管在報帳上動手腳，數字不大，但不是誤會。',c:[
 ch('向公司內部通報',()=>{S.stress=cl(S.stress+6);cqAdd('whistle',R(4,9),{act:'report'});return N('你寫了一封很謹慎的信，之後幾週辦公室氣氛怪怪的。')}),
 ch('私下提醒主管',()=>{cqAdd('whistle',R(4,9),{act:'warn'});return N('主管臉色變了一下，說他會處理。')}),
 ch('裝作沒看到',()=>{cqAdd('whistle',R(4,9),{act:'silent'});S.karma=cl((S.karma||50)-2);return N('你告訴自己這不關你的事。')})]})});
E.push({id:'cqf_whistle',min:30,max:70,w:60,if:()=>!!cqDue('whistle'),run:()=>{const s=cqTake('whistle'),a=s.d.act;
 if(a==='report')return {t:'當年那件事後來被查實，主管離職。新來的高層說，公司需要像你這樣敢說話的人。',c:[ch('接受新的位置',()=>{if(S.job){S.job.lv=Math.min(5,(S.job.lv||1)+1);S.job.sal=Math.round(S.job.sal*1.12)}S.karma=cl((S.karma||50)+3);chg('happy',5);return G('你被提拔，也成了同事心中值得信任的人。')}),ch('婉拒，維持現狀',()=>{S.karma=cl((S.karma||50)+2);return N('你說自己當年只是做了該做的事。')})]};
 if(a==='warn')return {t:'你在行業聚會遇到當年的主管，他私下說謝謝你那次沒有把事情鬧大。',c:[ch('點頭，不多說',()=>{S.net=cl((S.net||0)+2);return N('你們心照不宣，他後來幫你介紹了一個機會。')}),ch('提醒他以後別再犯',()=>{S.karma=cl((S.karma||50)+2);return N('他苦笑說知道了。')})]};
 return {t:'當年那位主管的事爆發了，調查人員說可能找你問話，因為你當時是少數看過帳的人。',c:[ch('坦白當時所知',()=>{S.stress=cl(S.stress+5);S.karma=cl((S.karma||50)+1);return N('你配合調查，雖然被說「為什麼當時不說」，但沒有被追究。')}),ch('說自己不清楚',()=>{if(chance(.4)){S.stress=cl(S.stress+8);chg('happy',-5);return B('調查人員拿出你當時的郵件，場面很尷尬。')}return N('這件事不了了之，但你一直忘不掉。')})]}}});
/* 收留落難朋友 */
E.push({id:'cq_stay',min:22,max:55,w:3,if:()=>(S.friends||[]).length>=1&&!cqHas('stay'),run:()=>{const n=fn127();return {t:`朋友${n}被房東趕出來，問你能不能借住一陣子。`,c:[
 ch('讓他住下來',()=>{S.stress=cl(S.stress+3);S.karma=cl((S.karma||50)+3);cqAdd('stay',R(4,10),{n});return N(`${n}住了三個月才搬走，那段時間你們聊了很多。`)}),
 ch('幫他付幾天旅館',()=>{S.money-=Math.round(px(8000));cqAdd('stay',R(4,10),{n,half:1});return N('你覺得這樣彼此都有空間。')}),
 ch('抱歉，不方便',()=>N('你說家裡真的沒有地方。'))]}}});
E.push({id:'cqf_stay',min:27,max:80,w:60,if:()=>!!cqDue('stay'),run:()=>{const s=cqTake('stay'),n=s.d.n,r=Math.random();
 return {t:r<.6?`${n}現在過得不錯，他說永遠記得你當年伸出援手，邀你去他家作客。`:`${n}輾轉聯絡上你，說他想請你當他婚禮的見證人。`,c:[ch('欣然前往',()=>{chg('happy',s.d.half?4:7);S.net=cl((S.net||0)+(s.d.half?1:3));return G('那天你坐在最前排，他向所有人介紹你是「改變我人生的人」。')}),ch('心意到就好',()=>{chg('happy',2);return N('你寄了一份賀禮。')})]}}});
/* 網路上說了重話 */
E.push({id:'cq_post',min:16,max:45,w:3,if:()=>!cqHas('post'),run:()=>({t:'你在網路上看到一則爭議留言，氣得想寫一長串回覆，直接點名對方。',c:[
 ch('寫了，按下送出',()=>{chg('happy',2);cqAdd('post',R(3,10),{});return N('你覺得舒坦，沒想到截圖被留了下來。')}),
 ch('寫完沒送出',()=>{S.karma=cl((S.karma||50)+1);return N('你把草稿刪掉，去睡覺了。')}),
 ch('私訊給對方好好談',()=>{S.karma=cl((S.karma||50)+2);return N('對方沒回，但你心裡舒服多了。')})]})});
E.push({id:'cqf_post',min:20,max:70,w:60,if:()=>!!cqDue('post'),run:()=>{cqTake('post');return {t:'幾年前的舊留言被人翻出來，在網路上被重新討論，有人認出是你。',c:[
 ch('公開道歉說明',()=>{if(chance(.7)){S.karma=cl((S.karma||50)+2);S.stress=cl(S.stress+3);return N('大部分人接受了你的說明，風波很快過去。')}chg('happy',-4);try{fmAdd(-2)}catch(e){}return B('還是有人不接受，你的名聲受了影響。')}),
 ch('不回應，等風頭過去',()=>{if(chance(.5)){chg('happy',-3);S.stress=cl(S.stress+5);return B('討論越滾越大，你被迫關閉帳號。')}return N('沒多久就被新的話題蓋過。')})]}}});
/* === 3. 人生轉折 === */
E.push({id:'turn_q',min:24,max:30,w:6,if:()=>!S.flags.turnQ&&!S.jail,run:()=>({t:'你快三十歲了，開始認真想：現在的生活，是不是你想要的樣子？',c:[
 ch('大膽換跑道，從頭學起',()=>{S.flags.turnQ=1;S.stress=cl(S.stress+6);if(S.job){S.job.years=Math.max(0,S.job.years-2);S.job.sal=Math.round(S.job.sal*.85)}S.smarts=cl(S.smarts+3);S.flags.bold=1;return N('前半年很辛苦，但你開始有了新的方向。')}),
 ch('穩穩把現在的事做好',()=>{S.flags.turnQ=1;if(S.job)S.job.perf=(S.job.perf||50)+4;chg('happy',1);return N('你選擇深耕，這個決定讓你之後更踏實。')}),
 ch('先出國走走，想清楚再說',()=>{S.flags.turnQ=1;S.money-=Math.round(px(150000));chg('happy',6);S.stress=cl(S.stress-6);return G('回來之後，你對很多事想通了。')})]})});
E.push({id:'turn_m',min:39,max:48,w:6,if:()=>!S.flags.turnM&&!S.jail,run:()=>({t:'到了中年，你突然覺得有點空，事業、家庭、自己好像都沒顧好。',c:[
 ch('把重心放回家人',()=>{S.flags.turnM=1;S.flags.famFirst=1;if(S.partner)S.partner.rel=Math.min(100,S.partner.rel+10);chg('happy',5);if(S.job)S.job.perf=(S.job.perf||50)-3;return G('你提早下班、少了應酬，家裡的氣氛明顯變了。')}),
 ch('為自己圓一個夢',()=>{S.flags.turnM=1;S.money-=Math.round(px(300000));chg('happy',7);S.stress=cl(S.stress-4);S.flags.dream=1;return G('你終於去做了那件拖了二十年的事。')}),
 ch('再拚一次事業',()=>{S.flags.turnM=1;S.flags.push=1;S.stress=cl(S.stress+8);if(S.job){S.job.perf=(S.job.perf||50)+6;S.job.sal=Math.round(S.job.sal*1.08)}return N('身體有點吃不消，但成績單很亮眼。')}),
 ch('調整作息，照顧身體',()=>{S.flags.turnM=1;S.flags.fit=1;S.health=cl(S.health+6);S.stress=cl(S.stress-6);return G('你開始運動、少熬夜，整個人精神多了。')})]})});
E.push({id:'turn_r',min:60,max:70,w:6,if:()=>!S.flags.turnR&&!S.jail,run:()=>({t:'回頭看這一生，你最想先做的是什麼？',c:[
 ch('跟重要的人和解或道謝',()=>{S.flags.turnR=1;chg('happy',8);S.karma=cl((S.karma||50)+3);return G('有些話說出口，比想像中輕鬆。')}),
 ch('把經驗整理下來，留給後人',()=>{S.flags.turnR=1;S.flags.memoir=1;S.smarts=cl(S.smarts+2);chg('happy',4);try{fmAdd(1)}catch(e){}return G('你開始寫回憶錄，家人說想一直讀下去。')}),
 ch('去看看一直想去的地方',()=>{S.flags.turnR=1;S.money-=Math.round(px(200000));chg('happy',8);S.health=cl(S.health-1);return G('沿路拍的照片，成了你最珍貴的收藏。')}),
 ch('保持現在的日子就好',()=>{S.flags.turnR=1;chg('happy',2);return N('平凡也是一種圓滿。')})]})});
