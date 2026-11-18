/* ---- p113：新功能一次性提示（每年最多一則，解鎖時用一句話說明入口）---- */
const NFH=[
 ['cook',()=>S.age>=12,'新功能：「更多」裡的「料理與食譜」可以學菜、創作食譜、收徒弟，甚至開餐廳。'],
 ['wk',()=>S.art&&Object.keys(S.art).some(k=>S.art[k]>=20),'新功能：才藝程度 20 以上，可以到「更多」的「創作與作品」發表作品、參加比賽、累積知名度。'],
 ['slot',()=>S.age>=18,'小提醒：「設定」裡有 3 個手動存檔欄位，重要時刻前可以先備份。'],
 ['chap',()=>S.age>=20,'小提醒：「設定」裡的「人生章節」會把你的一生分成幾個篇章。'],
 ['pol',()=>S.age>=23&&S.money>=3e6,'小提醒：「活動」頁最下面可以參加選舉，累積聲望後能影響政策。'],
 ['pj',()=>(typeof netWorth==='function'&&netWorth()>=1e7),'小提醒：資產超過 1,000 萬後，「資產」頁會出現大型投資與事業。'],
 ['arch',()=>(S.gen||1)>=2,'小提醒：「設定」裡的「家族檔案」會畫出歷代的財富與壽命。']
];
const _y113=yearly;
yearly=function(){
 const r=_y113.apply(this,arguments);
 try{if(S&&!S.dead){if(!S.nf)S.nf={};
  for(const [k,t,msg] of NFH){if(!S.nf[k]&&t()){S.nf[k]=1;log(msg,'');break}}}}catch(e){}
 return r;
};
