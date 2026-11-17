/* ---- 個性・技能・選擇影響顯示（數值為遊戲簡化設計） ---- */
const PTN=[['ext','外向'],['agr','親和'],['con','盡責'],['opn','開放'],['sta','情緒穩定']];
const SKN=[['comm','溝通表達'],['lead','領導管理'],['tech','專業技術'],['fin','理財'],['cre','創意'],['fit','體能']];
const PTD={ext:'人脈成長更快、容易交朋友',agr:'關係比較不容易惡化、較少衝突',con:'績效與成績自然進步、做事有始有終',opn:'旅行與新事物帶來更多快樂、較願意創新',sta:'壓力與憂鬱比較容易消退'};
const SKD={comm:'業務、行銷、教職、服務類求職加分',lead:'管理職與創業求職加分',tech:'工程、資訊、研發、技術類求職加分',fin:'降低生活開銷（最多約 10%）、金融會計求職加分',cre:'設計、藝術、企劃類求職加分',fit:'每年自然減少健康衰退、運動軍警類求職加分'};
let LASTPT=null;
const _mFix25=mFix;
mFix=function(){
 _mFix25();
 if(!S)return;
 if(!S.pt){const b=S.bg?S.bg.sty:'開明',r=()=>R(25,75);S.pt={ext:r(),agr:r(),con:r(),opn:r(),sta:r()};
  if(b==='嚴格'||b==='虎媽')S.pt.con=cl(S.pt.con+8);if(b==='溺愛')S.pt.sta=cl(S.pt.sta-5);if(b==='放任')S.pt.opn=cl(S.pt.opn+8);
  if(LASTPT&&(S.gen||1)>1)for(const k in S.pt)S.pt[k]=Math.round(LASTPT[k]*.4+S.pt[k]*.6)}
 if(!S.skl)S.skl={comm:R(3,15),lead:R(0,8),tech:R(3,15),fin:R(0,8),cre:R(3,15),fit:R(5,18)};
};
const _die25=die;
die=function(c){if(S&&S.pt)LASTPT=Object.assign({},S.pt);_die25(c)};
function bump(g,k,d){const o=g==='p'?S.pt:S.skl;o[k]=Math.max(0,Math.min(100,(o[k]||0)+d))}
/* 選擇文字關鍵字 → 個性／技能 */
const LFX=[
 [/努力|認真|讀書|補習|加班|準時|堅持|存錢|儲蓄|規劃|準備|訓練|衝刺/,[['p','con',1]]],
 [/耍廢|擺爛|翹|逃避|不準備|放棄|拖|賭/,[['p','con',-1]]],
 [/社團|派對|聚會|認識|聊|邀|參加|分享|演講|告白|主動|撒嬌/,[['p','ext',1],['s','comm',1]]],
 [/獨自|躲|宅|不參加/,[['p','ext',-1]]],
 [/幫|捐|道歉|和解|原諒|陪|照顧|分擔|借你|體諒|孝|送禮|志工/,[['p','agr',1]]],
 [/吵|報復|拒絕|不理|冷戰|罵|威脅|舉報|硬著頭皮|打人/,[['p','agr',-1]]],
 [/旅行|嘗試|創業|探索|轉職|出國|實驗|藝術|創作|遊學/,[['p','opn',1]]],
 [/冥想|放鬆|諮商|休息|冷靜|忍耐|看醫生|運動/,[['p','sta',1]]],
 [/衝動|崩潰|大吵|酗酒|熬夜|報復/,[['p','sta',-1]]],
 [/帶領|領導|主管|負責|扛起|決定|籌組|管理|創業|組隊/,[['s','lead',1]]],
 [/投資|存錢|儲蓄|保險|理財|比價|省錢|省著/,[['s','fin',1]]],
 [/借錢|貸款|衝動消費|賭/,[['s','fin',-1]]],
 [/程式|技術|證照|研究|修繕|學習/,[['s','tech',1]]],
 [/創作|設計|畫|發明|點子|表演|寫作/,[['s','cre',1]]],
 [/運動|健身|跑步|游泳|登山|球/,[['s','fit',1]]]
];
function labelFx(l){
 if(!S||!S.pt)return;const add={};
 for(const [re,fx] of LFX)if(re.test(l))for(const [g,k,d] of fx){const key=g+k;add[key]=Math.max(-2,Math.min(2,(add[key]||0)+d));}
 for(const key in add)bump(key[0],key.slice(1),add[key]);
}
/* 行動（活動）→ 個性／技能 */
const ACTFX={gym:[['s','fit',2],['p','con',1]],study:[['s','tech',1],['p','con',1]],med:[['p','sta',2]],trip:[['p','opn',2]],donate:[['p','agr',2]],
 beauty:[['s','cre',0]],lotto:[['s','fin',-1]],bet:[['s','fin',-2],['p','con',-1]],steal:[['p','agr',-2],['p','con',-1],['p','sta',-1]],rob:[['p','agr',-3],['p','sta',-2]],fraud:[['p','agr',-3],['p','con',-2]],
 club:[['p','ext',2],['s','comm',2]],cram:[['p','con',2],['s','tech',1]],story:[['p','opn',1]],reading:[['p','opn',1],['s','cre',1]],talent:[['s','cre',2],['p','con',1]],draw:[['s','cre',2]],playmate:[['p','ext',1],['p','agr',1]],
 cuddle:[['p','sta',1]],crawl:[['s','fit',1]],babble:[['s','comm',1]],pt:[['p','con',1],['s','comm',1]],food:[]};
/* 數值差異 */
const FXS=[['health','健康'],['happy','快樂'],['smarts','智力'],['looks','外貌'],['stress','壓力'],['karma','品德'],['net','人脈']];
function relSum(){const a=[];if(S.mom&&S.mom.alive)a.push(S.mom.rel);if(S.dad&&S.dad.alive)a.push(S.dad.rel);if(S.partner)a.push(S.partner.rel);S.friends.forEach(f=>a.push(f.rel));S.kids.forEach(k=>a.push(k.rel));return a.length?a.reduce((x,y)=>x+y,0)/a.length:0}
function fxSnap(){mFix();const o={m:S.money,r:relSum(),pt:Object.assign({},S.pt),sk:Object.assign({},S.skl)};FXS.forEach(([k])=>o[k]=S[k]||0);return o}
function fxDiff(a){
 const b=fxSnap(),L=[],sg=d=>d>0?'+'+d:'−'+Math.abs(d);
 const dm=b.m-a.m;if(Math.abs(dm)>=100)L.push(`現金 ${dm>0?'+':'−'}${money(Math.abs(Math.round(dm)))}`);
 FXS.forEach(([k,n])=>{const d=Math.round(b[k]-a[k]);if(d)L.push(`${n} ${sg(d)}`)});
 const dr=Math.round(b.r-a.r);if(dr)L.push(`人際關係 ${sg(dr)}`);
 PTN.forEach(([k,n])=>{const d=b.pt[k]-a.pt[k];if(d)L.push(`${n} ${sg(d)}`)});
 SKN.forEach(([k,n])=>{const d=b.sk[k]-a.sk[k];if(d)L.push(`${n} ${sg(d)}`)});
 return L.join('　');
}
/* 事件選擇：顯示影響 */
next=function(){
 if(!queue.length)return endYear();
 const e=queue.shift();if(e.if&&!e.if())return next();const r=e.run();
 if(!r)return next();
 if(Array.isArray(r)){log(r[0],r[1]);return next()}
 if(r.custom){render();return r.custom(()=>{render();next()})}
 render();
 ask(r.t,r.c.map(c=>c.l),i=>{
  log(r.t);const sn=fxSnap();labelFx(r.c[i].l);const res=r.c[i].f();if(res)log(res[0],res[1]);
  const fx=fxDiff(sn);if(fx)log('影響：'+fx,'fx');next();
 });
};
/* 分頁行動：顯示影響 */
const _handle25=handle;
handle=function(a){
 if(!S)return _handle25(a);
 const t=a.split(':')[0];
 if(['close','back','open','lf','rel','jf','found','cn','pf'].includes(t)&&!(t==='lf'&&a.startsWith('lf:skill:')))return _handle25(a);
 view._snap=fxSnap();
 const k=a.split(':');if(t==='act'&&ACTFX[k[1]]){const ok=ACTS.find(q=>q.id===k[1]);if(ok&&canAct(ok)&&!S.acts[k[1]]&&(!ok.cost||S.money>=ok.cost))for(const [g,n,d] of ACTFX[k[1]])bump(g,n,d)}
 try{_handle25(a)}finally{view._snap=null}
};
const _showSheet25=showSheet;
showSheet=function(tab,sub){
 if(view.msg&&view._snap){const fx=fxDiff(view._snap);view._snap=null;if(fx)view.msg=[view.msg[0]+'　【'+fx+'】',view.msg[1]]}
 _showSheet25(tab,sub);
};
/* 效果：每年自然變化 */
const _yearly25=yearly;
yearly=function(){
 mFix();_yearly25();
 const P=S.pt,K=S.skl,a=S.age;
 /* 個性影響 */
 if(S.job&&!S.job.founder)S.job.perf=cl(S.job.perf+Math.round((P.con-50)/25+(K.comm+K.lead-40)/60));
 if(S.school)S.grade=cl(S.grade+Math.round((P.con-50)/20));
 S.net=cl((S.net||0)+Math.round((P.ext-50)/40));
 if(P.agr>60){[S.mom,S.dad].forEach(p=>{if(p&&p.alive)p.rel=cl(p.rel+1)});S.friends.forEach(f=>{if(chance(.3))f.rel=cl(f.rel+1)})}
 if(P.agr<35)S.friends.forEach(f=>{if(chance(.3))f.rel=cl(f.rel-1)});
 S.stress=cl(S.stress-Math.round((P.sta-50)/12));S.dep=cl((S.dep||0)-Math.round((P.sta-50)/25));
 if(P.opn>65&&chance(.25))chg('smarts',1);
 if(K.fit>50&&chance((K.fit-40)/100))chg('health',1);
 /* 工作累積技能、成長與生疏 */
 if(S.job&&!S.job.founder){const t=S.job.t,sk=/工程|程式|軟體|研發|技術|資訊|工廠|維修/.test(t)?'tech':/業務|行銷|客服|企劃|老師|教師|服務|店/.test(t)?'comm':/主管|經理|總監|管理/.test(t)?'lead':/會計|金融|分析|銀行|財/.test(t)?'fin':/設計|藝術|編劇|攝影/.test(t)?'cre':/運動|消防|警察|軍/.test(t)?'fit':null;if(sk)bump('s',sk,R(1,3));bump('s','comm',chance(.4)?1:0)}
 if(S.money>1e6&&chance(.3))bump('s','fin',1);if(S.kids.length&&chance(.2))bump('s','lead',1);if(S.job&&S.job.founder)bump('s','lead',R(1,3));
 for(const [k] of SKN)if(K[k]>35&&chance(.25))K[k]--;
 /* 成熟 */
 if(a>=25&&a<=60){if(chance(.25))bump('p','con',1);if(chance(.3))bump('p','sta',1)}
 if(a>=60&&chance(.3))bump('p','opn',-1);
};
const _lc25=livingCost;
livingCost=function(){mFix();return Math.round(_lc25()*(1-Math.max(0,Math.min(100,S.skl.fin))*.1/100))};
function skillBonus(j){
 if(!S||!S.skl)return 0;const K=S.skl,t=j.t;
 const m=/工程|程式|軟體|研發|技術|資訊|維修/.test(t)?K.tech:/業務|行銷|客服|企劃|教師|老師|服務|店員/.test(t)?K.comm:/主管|經理|總監|管理/.test(t)?(K.lead+K.comm)/2:/會計|金融|分析|銀行/.test(t)?K.fin:/設計|藝術|編劇|攝影/.test(t)?K.cre:/運動|消防|警察|軍/.test(t)?K.fit:(K.comm+K.tech)/2;
 return (m-30)/350;
}
/* 能力頁 */
const COURSES=[['comm','簡報表達課',12000],['lead','管理領導課',30000],['tech','專業證照課',20000],['fin','理財課程',8000],['cre','設計繪畫課',10000],['fit','教練健身課',24000]];
function bar5(v,c){return `<div class="bar"><i style="width:${v}%;background:${c}"></i></div>`}
function skillHTML(){
 mFix();let h='<h3>🧬 個性與技能</h3><div class="sec">個性（會隨經歷慢慢改變）</div>';
 h+=PTN.map(([k,n])=>`<div class="item"><b>${n} ${S.pt[k]}</b>${bar5(S.pt[k],'#c0553a')}<div class="sub">${PTD[k]}</div></div>`).join('');
 h+='<div class="sec">技能（工作會累積，不用會生疏）</div>';
 h+=SKN.map(([k,n])=>`<div class="item"><b>${n} ${S.skl[k]}</b>${bar5(S.skl[k],'#4b7bec')}<div class="sub">${SKD[k]}</div></div>`).join('');
 h+='<div class="sec">進修</div><div class="sub">每項課程每年一次。未成年由爸媽出錢。</div>';
 h+=COURSES.map(([k,n,c])=>{const used=S.acts['tr_'+k],kid=S.age<18,cost=kid?0:c,dis=S.age<12||used||S.money<cost||S.jail;return `<button class="btn" data-a="lf:skill:${k}" ${dis?'disabled':''}>${n}<small>${S.age<12?'12 歲以上才能報名':(kid?'爸媽出錢':'費用 '+money(c))}${used?'（今年已上）':''}</small></button>`}).join('');
 h+='<p class="sub">每次選擇的結果下方，會標出它影響了哪些數值。</p>';
 return h+'<button class="btn" data-a="back">← 返回</button>';
}
const _lfH25=lfHandle;
lfHandle=function(x,y,z,u){
 if(x==='skill'){mFix();const c=COURSES.find(q=>q[0]===y);if(!c)return null;const key='tr_'+y;if(S.acts[key])return B('今年已經上過了。');const cost=S.age<18?0:c[2];if(S.age<12)return B('年紀還太小。');if(S.money<cost)return B('你的錢不夠。');
  S.acts[key]=1;S.money-=cost;const d=R(3,8);bump('s',y,d);if(y==='fit')chg('health',2);if(y==='tech')chg('smarts',1);S.stress=cl(S.stress+2);return G(`你上了「${c[1]}」，${SKN.find(q=>q[0]===y)[1]}大有進步。`)}
 return _lfH25(x,y,z,u)};
const _life25=lifeHTML;
lifeHTML=function(){return view.lsub==='skill'?skillHTML():_life25()};
const _more25=moreHTML;
moreHTML=function(){return _more25().replace('<button class="tile" data-a="lf:health">',`<button class="tile" data-a="lf:skill"><b>🧬</b>個性與技能<small>能力・進修</small></button><button class="tile" data-a="lf:health">`)};
const _endInfo25=endInfo;
endInfo=function(){mFix();const top=SKN.slice().sort((a,b)=>S.skl[b[0]]-S.skl[a[0]])[0],pt=PTN.slice().sort((a,b)=>S.pt[b[0]]-S.pt[a[0]])[0];
 return _endInfo25()+`<p class="sub">個性最突出：${pt[1]} ${S.pt[pt[0]]}　最強技能：${top[1]} ${S.skl[top[0]]}</p>`};
