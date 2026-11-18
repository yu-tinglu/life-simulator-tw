/* ---- p107：單一國家股市歷史推估、更多政策取捨、更多記得過去的事件（遊戲設定值）---- */
/* 單一國家股市：2026 年以前依區域指數的真實資料推估（非各國實際指數）*/
const SMIX={kr:{em:.6,jp:.4},gb:{eu:.9,us:.1},in:{em:1.15},au:{eu:.5,em:.5},sg:{em:.6,eu:.4}};
const _mr107=mktRet;
mktRet=function(y,cr,g,fxu){
 const r=_mr107.apply(this,arguments);
 try{if(y<=2026)for(const k in SMIX){let v=0;for(const q in SMIX[k])v+=(r[q]||0)*SMIX[k][q];r[k]=Math.max(-.7,v)}}catch(e){}
 return r;
};
/* 更多政策：移民、教育、環境 */
PACT.push(['imm','放寬技術移民（縣市長以上）',4,'薪資成長略降約 0.2%/年、房價成長 +0.5%/年；企業界歡迎，聲望 +1，約 3 成機率引發反彈'],
 ['edu','擴大教育補助（立委以上）',3,'薪資成長加快約 0.3%/年，聲望 +2'],
 ['env','碳費與綠能轉型（立委以上）',3,'薪資成長略降約 0.1%/年，聲望 +2；年輕選民支持，傳統產業不滿']);
const _ea107=elAct;
elAct=function(k){
 if(k!=='imm'&&k!=='edu'&&k!=='env')return _ea107.apply(this,arguments);
 const p=polInit(),y=calYear(),o=p.office;if(!o)return B('目前沒有職位。');
 if(p.acted===y)return B('今年已經施政過了。');
 const a=PACT.find(x=>x[0]===k);if(o.lv<a[2])return B('目前職位無法推動這項政策。');
 const m=elMod(),cl_=x=>Math.max(-.02,Math.min(.02,x));p.acted=y;
 if(k==='imm'){m.w=cl_(m.w-.002);m.h=Math.min(.04,m.h+.005);p.rep=Math.min(100,p.rep+1);
  if(Math.random()<.3){p.rep=Math.max(0,p.rep-4);log('放寬技術移民引發反彈，你的聲望受到影響。','bad');return B('政策上路，但遭到反彈。')}
  log('政府放寬技術移民，企業界歡迎。','');return G('技術移民放寬。')}
 if(k==='edu'){m.w=cl_(m.w+.003);p.rep=Math.min(100,p.rep+2);log('政府擴大教育補助。','good');return G('教育補助擴大。')}
 m.w=cl_(m.w-.001);p.rep=Math.min(100,p.rep+2);log('政府推動碳費與綠能轉型。','');return G('綠能轉型啟動。');
};
/* 更多記得過去的事件 */
E.push({id:'mem_exbump',min:28,max:70,w:2.5,if:()=>S.ex&&S.ex.length>0&&S.partner,run:()=>({t:'你在街上碰到前任，對方笑著打招呼，身旁的伴侶有點好奇。',c:[
 ch('大方介紹，聊幾句',()=>{chg('happy',2);return G('場面意外地自在，你覺得自己放下了。')}),
 ch('點頭示意就走',()=>N('你笑著點頭，繼續往前走。'))]})});
E.push({id:'mem_abroadback',min:30,max:80,w:2.5,if:()=>S.ab&&S.ab.yrs>=5&&S.cn!=='TW',run:()=>({t:'在海外住了幾年，台灣的老朋友傳來訊息：同學會要辦了，大家都在問你要不要回來。',c:[
 ch('安排時間飛回去參加',()=>{if(S.money<5e4)return B('旅費不夠，這次只能視訊祝福。');S.money-=5e4;chg('happy',5);return G('見到老朋友，聊了整晚。')}),
 ch('視訊參加',()=>{chg('happy',1);return N('隔著螢幕也聊得很開心。')})]})});
E.push({id:'mem_poor',min:30,max:80,w:2.5,if:()=>(S.coHist||0)>=1&&netWorth()>5e7,run:()=>({t:'以前一起奮鬥的老同事來訪，說他們都記得你當年的樣子。你現在的生活，和那時候已經很不一樣。',c:[
 ch('請大家吃一頓好的（花 5 萬）',()=>{S.money-=5e4;chg('happy',4);return G('大家聊起當年的糗事，笑得很開心。')}),
 ch('簡單喝杯咖啡聊聊',()=>{chg('happy',2);return N('你們聊到咖啡都涼了。')})]})});
