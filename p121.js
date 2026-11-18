/* ---- p121：名聲整併與實質差異、出道星探 ---- */
/* 名聲＝比賽名聲與作品／料理／運動知名度取較高者，只顯示一個數字 */
fmGet=function(){return Math.round(Math.max(ckInit().fame||0,S.cfame||0))};
const fmTier=()=>{const f=fmGet();return f>=70?3:f>=40?2:f>=15?1:0};
const _cr121=cpRecHTML;
cpRecHTML=function(){
 let h=_cr121();
 try{
  const t=fmTier(),tl=S.tl?Math.max(S.tl.sing||0,S.tl.dance||0,S.tl.music||0,S.tl.paint||0):0;
  const perks=['無名：沒有特別的待遇。','小有名氣：會收到粉絲來信，演藝與創作相關工作的面試略有加分。','知名：有品牌找你代言，也會被狗仔注意；創作與運動收入隨名聲提高。','名人：受邀演講、出書、擔任公益大使，同時任何言行都會被放大檢視。'];
  const deb=S.ent?`你已是${S.ent.co}的練習生。`:S.job&&/演員|歌手|模特/.test(S.job.t)?'你已經出道了。':`你目前才藝最高 ${Math.round(tl)}、外貌 ${S.looks}。`;
  const box=`<div class="item"><b>名聲 ${fmGet()}（${fmLabel()}）</b>${pbar(fmGet())}<div class="sub">${perks[t]}${t<3?'<br>下一級：'+perks[t+1]:''}</div></div><div class="item"><b>出道機會</b><div class="sub">${deb}<br>兩種管道：一是在全國歌唱大賽、電視選秀、街舞、才藝、樂團等比賽取得前四名，星探才會找上你（名次越高機率越高，30 歲後減半）；二是外貌或才藝夠突出，平常也有機會被星探看中。</div></div>`;
  h=h.replace(/<div class="item"><b>名聲<\/b>[\s\S]*?<\/div>/,box)
 }catch(e){}
 return h};
const fmOK=n=>()=>fmGet()>=n&&S.age>=14;
E.push({id:'fm_fan',min:14,max:80,w:3,if:fmOK(15),run:()=>({t:'你收到一封陌生人寄來的信，說你的作品或表現曾經鼓勵過他。',c:[
 ch('認真回信',()=>{chg('happy',4);fmAdd(1);return G('對方很開心，你也覺得這一切很有意義。')}),
 ch('默默收藏',()=>{chg('happy',2);return N('你把信收進抽屜裡。')})]})});
E.push({id:'fm_endorse',min:16,max:70,w:3,if:fmOK(40),run:()=>{const m=Math.round(fmGet()*3000*ckF());return {t:`有品牌想找你代言，酬勞約 ${money(m)}，要你配合拍攝與宣傳活動。`,c:[
 ch('接下代言',()=>{S.money+=m;S.stress=cl(S.stress+2);if(chance(.25)){fmAdd(-4);return B('產品後來被爆出爭議，你也被網友酸了一陣子。')}fmAdd(2);return G('拍攝順利，你的名氣更上一層。')}),
 ch('只接自己真心喜歡的',()=>{S.money+=Math.round(m*.4);fmAdd(1);return N('你挑了一個理念相近的品牌，酬勞比較少，但心裡踏實。')}),
 ch('婉拒',()=>N('你不想讓名字出現在太多地方。'))]}}});
E.push({id:'fm_paparazzi',min:18,max:70,w:2.5,if:fmOK(40),run:()=>({t:'你發現有人在你住的地方附近長期蹲點拍照。',c:[
 ch('公開表達立場',()=>{if(chance(.55)){fmAdd(2);return G('社會輿論站在你這邊，那些人收斂了。')}fmAdd(-3);S.stress=cl(S.stress+4);return B('反而被放大解讀，話題炒了好幾天。')}),
 ch('搬家、加強隱私',()=>{S.money-=Math.round(S.money>2e6?2e5:5e4);S.stress=cl(S.stress-3);return N('花了一筆錢，換來比較平靜的生活。')}),
 ch('裝作沒看見',()=>{S.stress=cl(S.stress+4);chg('happy',-2);return B('被拍到不太好看的樣子，被網友拿來嘲笑。')})]})});
E.push({id:'fm_invite',min:25,max:80,w:3,if:fmOK(70),run:()=>{const m=Math.round(300000*ckF());return {t:'有單位邀請你出書、演講，或擔任公益大使。',c:[
 ch('出書與巡迴演講',()=>{S.money+=m;fmAdd(2);S.stress=cl(S.stress+3);return G(`書賣得不錯，演講場場爆滿，收入約 ${money(m)}。`)}),
 ch('擔任公益大使',()=>{fmAdd(1);chg('happy',5);S.karma=cl((S.karma||50)+4);return G('你把名氣用在你在意的事情上。')}),
 ch('保持低調，謝絕邀約',()=>{chg('happy',2);return N('你想把生活留給自己。')})]}}});
E.push({id:'ent_scout',min:14,max:30,w:2.5,if:()=>{try{tlInit()}catch(e){}return !S.ent&&!(S.job&&/演員|歌手|模特/.test(S.job.t))&&(S.looks>=68||(S.tl&&Math.max(S.tl.sing||0,S.tl.dance||0,S.tl.music||0)>=55))},run:()=>{
 const jn=S.looks>=((S.tl&&Math.max(S.tl.sing||0,S.tl.dance||0,S.tl.music||0))||0)?'模特兒':'演員／歌手',co=pick(['星途娛樂','潮音唱片','雙子星經紀','藍海娛樂','橘子音樂','群星經紀']);
 return {t:`你在街上被${co}的星探攔下來，他說你很有特色，想邀你去公司聊聊。${S.age<18?'（未滿 18 歲，需要家長同意。）':''}`,c:[
  ch('跟他去聊聊',()=>cpSign(jn,co)),
  ch('收下名片，回家考慮',()=>N('你把名片收進口袋，沒有下文。')),
  ch('婉拒',()=>N('你覺得這不是你想走的路。'))]}}});
