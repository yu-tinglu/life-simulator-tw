/* ---- p115：研究／學術職涯事件（科學家、研究員、教授）---- */
const isSci=()=>S.job&&!S.job.founder&&/科學家|研究員|教授|博士後/.test(S.job.t||'');
const scI=()=>{S.sci=S.sci||{pap:0,gr:0,rep:0};return S.sci};
const scAdd=(k,n)=>{const s=scI();s[k]=Math.max(0,(s[k]||0)+n)};
E.push({id:'sc_paper',min:25,max:70,w:5,if:()=>isSci(),run:()=>({t:'你的論文投稿了半年，審稿結果終於回來。',c:[
 ch('照意見大改後重投',()=>{if(chance(.6)){scAdd('pap',1);scAdd('rep',3);chg('happy',4);return G('論文被接受了，署名排在第一。')}chg('happy',-2);S.stress=cl(S.stress+3);return N('又被要求補實驗，這一輪還沒結束。')}),
 ch('換一個期刊投',()=>{scAdd('rep',1);S.stress=cl(S.stress+2);return N('重新排版格式，又是一輪漫長的等待。')}),
 ch('把數據整理成新題目',()=>{S.smarts=cl(S.smarts+1);return N('你決定先放下這篇，開始下一個題目。')})]})});
E.push({id:'sc_grant',min:28,max:68,w:4,if:()=>isSci()&&S.job.years>=2,run:()=>({t:'研究經費快用完了，有一個計畫案可以申請。',c:[
 ch('熬夜寫計畫書',()=>{S.stress=cl(S.stress+5);if(chance(.35+scI().rep/200)){scAdd('gr',1);S.money+=Math.round(S.job.sal*.3);return G('計畫通過了，實驗室多了一筆經費，也多了一點獎金。')}return B('審查結果是未通過，委員的評語很短。')}),
 ch('找企業合作',()=>{S.money+=Math.round(S.job.sal*.15);S.stress=cl(S.stress+2);return N('企業出了一筆錢，但要你配合他們的時程。')}),
 ch('縮小規模，自己撐',()=>{chg('happy',-2);return N('你把實驗縮小，勉強撐過這一年。')})]})});
E.push({id:'sc_student',min:30,max:70,w:3,if:()=>isSci()&&S.job.years>=4,run:()=>({t:'有個學生說想跟著你做研究，但他的成績不算頂尖。',c:[
 ch('收下他',()=>{scAdd('rep',2);chg('happy',3);if(chance(.3))return G('他後來成了實驗室最努力的人。');return N('帶他花了你不少時間。')}),
 ch('婉拒，推薦別的老師',()=>N('你覺得自己的時間有限。')),
 ch('先給他一個小題目試試',()=>{chg('happy',1);return N('你想看看他實際做出來的樣子。')})]})});
E.push({id:'sc_scandal',min:30,max:70,w:2,if:()=>isSci()&&scI().pap>=2,run:()=>({t:'有人在網路上指出，你一篇舊論文的圖表看起來有問題。',c:[
 ch('主動公開原始數據',()=>{if(chance(.8)){scAdd('rep',3);S.stress=cl(S.stress+4);return G('數據沒問題，這件事反而讓人更信任你。')}scAdd('rep',-5);return B('發現是學生整理時出了錯，你公開更正了論文。')}),
 ch('先沉默等風頭過去',()=>{if(chance(.5)){S.stress=cl(S.stress+6);scAdd('rep',-6);return B('質疑越滾越大，最後被期刊要求說明。')}return N('討論幾天後就沒人提了。')}),
 ch('請學校調查小組處理',()=>{S.stress=cl(S.stress+3);return N('調查花了幾個月，結論是沒有不當行為。')})]})});
E.push({id:'sc_award',min:40,max:80,w:2,if:()=>isSci()&&scI().pap>=4&&scI().rep>=15,run:()=>{const big=chance(.04);const m=big?5e7:Math.round(S.job.sal*.6);return {t:big?'你收到一封來自國外的通知：你被選為重要科學獎項的得主。':'學會頒給你傑出研究獎，要你上台發表感言。',c:[
 ch('欣然領獎',()=>{S.money+=m;scAdd('rep',big?20:5);chg('happy',big?15:6);return G(big?'你的名字出現在各國新聞上。':'台下有你以前的學生，你講到一半有點哽咽。')})]}}});
E.push({id:'sc_retire',min:62,max:80,w:3,if:()=>S.job&&/教授|研究員|科學家/.test(S.job.t||'')&&scI().pap>=3,run:()=>({t:'你快退休了，學校問你要不要留下名譽教授的名義。',c:[
 ch('接受，偶爾回去演講',()=>{chg('happy',3);scAdd('rep',1);return G('你偶爾回校，學弟妹還記得你的論文。')}),
 ch('退得乾乾淨淨',()=>{S.stress=cl(S.stress-4);return N('你把研究室鑰匙交回去，覺得輕鬆。')})]})});
