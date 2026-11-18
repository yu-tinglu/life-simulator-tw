let view={tab:null,sub:null,msg:null,fsub:null,csub:null};
function render(){
 if(S&&typeof mFix==='function')mFix();
 if(!S)return;
 $('hName').textContent=S.name;
 $('hAge').textContent=S.age+' 歲・'+calYear()+'年'+(S.dead?'（已逝世）':'');
 const w=S.jail?'服刑中':S.army?'服役中':S.school?`${S.school}在學`:S.job?`${S.job.t}`:S.flags.retired?'退休':'無業';
 $('hSub').innerHTML=`${S.gen>1?'第'+S.gen+'代 ・ ':''}${S.cn&&S.cn!=='TW'?CNS[S.cn].f+' ':''}${esc(w)} ・ <span class="${S.money<0?'neg':''}">${money(S.money)}</span>`;
 $('stats').innerHTML=STATS.map(([k,n,c])=>`<div class="st"><div class="lb"><span>${n}</span><span>${S[k]}</span></div><div class="bar"><i style="width:${S[k]}%;background:${c}"></i></div></div>`).join('');
 $('feed').innerHTML=S.log.filter(y=>y.lines.length).map(y=>`<div class="yr"><h4>${y.age} 歲</h4>${y.lines.map(l=>`<div class="ln ${l.c}">${esc(l.t)}</div>`).join('')}</div>`).join('');
 $('feed').scrollTop=1e9;
 $('ageBtn').disabled=!!S.dead;
}
function ask(text,labels,cb){
 $('modalBody').innerHTML=`<p>${esc(text)}</p>`+labels.map((l,i)=>`<button class="btn" data-i="${i}">${esc(l)}</button>`).join('');
 $('modal').classList.add('on');
 $('modalBody').onclick=e=>{const b=e.target.closest('[data-i]');if(!b)return;$('modal').classList.remove('on');$('modalBody').onclick=null;cb(+b.dataset.i)};
}
function showEnd(){
 const j=S.job?S.job.t:'—';
 $('modalBody').innerHTML=`<h3>🕊️ 你的一生結束了</h3><p>${esc(S.name)}，享年 ${S.age} 歲，死因：${S.cause}。</p>
 <p>最高學歷：${EDU[S.edu]}<br>最後職業：${esc(j)}<br>淨資產：${money(netWorth())}<br>子女：${S.kids.length} 人<br>前科：${S.record} 次<br>家族世代：第 ${S.gen||1} 代${(S.hist||[]).map(x=>`<br>　第${x.gen}代 ${esc(x.name)}（${x.age}歲，遺產 ${money(x.net)}，稅 ${money(x.tax)}）`).join('')}</p>
 ${endInfo()}<p><b>人生分數：${score()}</b></p><button class="btn p" id="again">重新投胎</button>`;
 $('modal').classList.add('on');
 $('again').onclick=()=>{$('modal').classList.remove('on');showStart()};
}
function showStart(){
 const sv=loadSave();let sx='男';
 $('startBody').innerHTML=`<h3>🎲 人生模擬器</h3><p>從出生到死亡，每一個選擇都會影響你的一生。</p>
 <input type="text" id="nm" placeholder="姓名（留空則隨機）" maxlength="6">
 <div class="seg"><button class="on" data-s="男">男</button><button data-s="女">女</button></div>
 <div class="sub" style="margin-top:10px">戀愛傾向</div><div class="seg" id="oseg"><button class="on" data-o="異性戀">異性戀</button><button data-o="同性戀">同性戀</button><button data-o="雙性戀">雙性戀</button><button data-o="隨機">隨機</button></div>
 <button class="btn p" id="go" style="margin-top:12px">出生！</button>${sv?`<button class="btn" id="cont">繼續上一局（${esc(sv.name)}，${sv.age} 歲）</button>`:''}`;
 $('start').classList.add('on');
 $('startBody').querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{sx=b.dataset.s;$('startBody').querySelectorAll('[data-s]').forEach(x=>x.classList.toggle('on',x===b))});
 let ori='異性戀';$('startBody').querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{ori=b.dataset.o;$('startBody').querySelectorAll('[data-o]').forEach(x=>x.classList.toggle('on',x===b))});
 $('go').onclick=()=>{newGame($('nm').value.trim(),sx);S.ori=oriPick(ori);$('start').classList.remove('on');render();save()};
 if(sv)$('cont').onclick=()=>{S=sv;busy=false;queue=[];$('start').classList.remove('on');render()};
}
function pbar(r){return `<div class="bar"><i style="width:${r}%;background:#c0553a"></i></div>`}
function showSheet(tab,sub){
 if(!S)return;view.tab=tab;view.sub=sub||null;
 let h='';const m=view.msg;view.msg=null;
 if(m)h+=`<div class="msg ${m[1]==='bad'?'bad':''}">${esc(m[0])}</div>`;
 if(tab==='cn')h+=cnHTML(view.cnsub);else if(tab==='cn')h+=cnHTML(view.cnsub);else if(tab==='lg')h+=legacyHTML();else if(tab==='eco')h+=ecoHTML();else if(tab==='life')h+=lifeHTML();else if(tab==='more')h+=moreHTML();else if(tab==='act')h+=actHTML();else if(tab==='job')h+=jobHTML();else if(tab==='rel')h+=sub?subHTML(sub):relHTML();else h+=astHTML();
 const TT={job:'職業與學業',rel:'家庭',act:'活動',ast:'資產',cn:'移民與匯率',lg:'傳承',eco:'經濟',more:'更多',life:'人生'},hasSub=!!(view.sub||view.cnsub||view.fsub||view.csub||tab==='life');
 $('sheetBody').innerHTML=`<div class="sh"><button class="bk ${hasSub?'on':''}" data-a="back">←</button><b>${(tab==='life'&&typeof LSUBT!=='undefined'&&LSUBT[view.lsub])||TT[tab]||''}</b><button data-a="close">✕</button></div>`+h+`<button class="btn" data-a="close">關閉</button>`;
 const pk=tab+'|'+(view.sub||view.lsub||view.csub||view.cnsub||view.fsub||'');if(view._pk!==pk||view._fresh){view._pk=pk;view._fresh=0;try{$('sheetBody').scrollTop=0;$('sheet').scrollTop=0}catch(e){}}
 $('sheet').classList.add('on');
}
function actHTML(){
 return `<h3>🎯 活動</h3><div class="sub">每項活動每年限一次</div>`+ACTS.filter(a=>S.age>=a.min&&(!a.max||S.age<=a.max)&&(!a.if||a.if())).map(a=>{
  const used=S.acts[a.id],poor=a.cost&&S.money<a.cost;
  return `<button class="btn" data-a="act:${a.id}" ${S.jail||used||poor||S.dead?'disabled':''}>${a.l}<small>${a.sub||(a.cost?'費用 '+money(a.cost):'免費')}${used?'（今年已做）':''}</small></button>`}).join('');
}
function jobHTML(){
 if(view.fsub)return foundHTML(view.fsub);
 if(S.co)return coHTML(view.csub||null);
 let h='<h3>💼 職業與學業</h3>'+cnJobNote();
 if(S.school)h+=`<p>就讀：${S.school}${S.major?`・${S.major.tier||''}${S.major.n}${S.major.gid?'（雙主修'+MJX[S.major.gid][1]+'）':''}`:''}（預計 ${S.schoolEnd} 歲畢業）<br>成績：${S.grade}</p>`+(S.age>=16&&S.age>=15?`<button class="btn" data-a="dropout">輟學<small>放棄目前的學業</small></button>`:'');
 else h+=`<p>學歷：${EDU[S.edu]}${S.major?`（${S.major.tier||''}${S.major.n}${S.major.gid?'・'+MJX[S.major.gid][1]+'碩士':''}${S.lic&&S.lic[S.major.cat]?'・已通過國考':''}）`:''}</p>`;
 if(S.job)h+=`<div class="item"><b>${esc(S.job.t)}</b> Lv.${S.job.lv}<br>年薪 ${money(S.job.sal)} ・ 年資 ${S.job.years} 年<br>績效 ${S.job.perf}${pbar(S.job.perf)}</div><button class="btn" data-a="quit">辭職</button>`;
 if(!S.job&&S.age>=18&&!S.school&&!S.jail&&!S.flags.retired){
  if(S.age>=20&&S.cn==='TW')h+=`<button class="btn p" data-a="found:list">🏭 創業<small>${INDS.length} 種產業，三大財報、財稅簽、虧損扣抵、IPO</small></button>`;
  let ce=-1;const jf=view.jf||'ok',cnt=JOBS.filter(j=>S.edu>=j.edu&&!jobBlock(j)).length;h+=`<div class="sec">徵才資訊</div><div class="seg"><button class="${jf==='ok'?'on':''}" data-a="jf:ok">可應徵 ${cnt}</button><button class="${jf==='all'?'on':''}" data-a="jf:all">全部 ${JOBS.length}</button></div>`+JOBS.map((j,i)=>{if(jf==='ok'&&!(S.edu>=j.edu&&!jobBlock(j)))return '';
   const ok=S.edu>=j.edu&&!jobBlock(j),done=S.acts['job'+i];
   const hd=j.edu!==ce?(ce=j.edu,`<div class="sec">${EDU[j.edu]}</div>`):'';
   return hd+`<button class="btn" data-a="job:${i}" ${!ok||done?'disabled':''}>${j.t}<small>${salRange(j)} ・ 需${EDU[j.edu]}${j.sm?' ・ 智力 '+j.sm+'+':''}${j.lk?' ・ 外貌 '+j.lk+'+':''}${j.src?' ・勞動部統計':''}${jobBlock(j)?' ・'+jobBlock(j):''}${done?'（已應徵）':''}</small></button>`}).join('');
 }else if(!S.job)h+='<p class="sub">目前無法求職。</p>';
 return h;
}
function relHTML(){
 let h='<h3>👪 人際關係</h3>';
 const row=k=>{const p=getP(k);return `<div class="item row"><div style="flex:1"><b>${esc(label(k))}</b>${pbar(p.rel)}</div><button class="mini" data-a="rel:${k}">互動</button></div>`};
 h+=relTop();h+='<div class="sec">家人</div>';
 if(S.mom.alive)h+=row('mom');if(S.dad.alive)h+=row('dad');
 if(!S.mom.alive&&!S.dad.alive)h+='<p class="sub">父母都已過世。</p>';
 h+='<div class="sec">伴侶・戀愛</div>'+romRow();
 if(S.kids.length)h+='<div class="sec">子女（點「教育」看天賦、升學與贈與）</div>'+S.kids.map((k,i)=>{kidFix(k);return `<div class="item row"><div style="flex:1"><b>子女 ${esc(k.n)}</b>・${k.age} 歲・${k.tal}・${k.pers}${k.sch?'・'+esc(k.sn):''}${pbar(k.rel)}</div><button class="mini" data-a="rel:k${i}">互動</button><button class="mini" data-a="kid:page:${i}">教育</button></div>`}).join('');
 h+='<div class="sec">朋友</div>'+(S.friends.length?S.friends.map((f,i)=>row('f'+i)).join(''):'<p class="sub">還沒有朋友。</p>');
 return h;
}
function subHTML(k){
 if(k[0]==='E')return kidHTML(+k.slice(1));
 if(k[0]==='R')return romHTML(k);
 if(k==='partner')return romHTML('Rp');
 const p=getP(k);if(!p)return relHTML();
 let h=`<h3>${esc(label(k))}</h3><div class="sub">關係 ${p.rel}</div>${pbar(p.rel)}`;
 const b=(a,t,s)=>`<button class="btn" data-a="do:${k}:${a}">${t}${s?`<small>${s}</small>`:''}</button>`;
 if(k==='partner'){h+=b('date','💕 約會','NT$3,000');if(!p.married)h+=b('propose','💍 求婚','婚禮 NT$300,000');if(p.married)h+=b('baby','👶 生小孩');}
 else if(k[0]==='f')return h.replace(/<div class="sub">關係[^<]*<\/div>/,'')+friendExtra(k)+`<button class="btn" data-a="back">← 返回</button>`;
 else h+=b('talk','💬 聊天');
 h+=b('gift','🎁 送禮','NT$2,000')+b('fight','😠 吵架');
 if(k==='partner')h+=b('breakup',p.married?'離婚':'分手');
 return h+`<button class="btn" data-a="back">← 返回</button>`;
}
const STATNOTE=`<div class="sec">📊 數字依據（金額一律為 2026 年幣值）</div><p class="sub" style="line-height:1.6">
薪資：主計總處 2025 年全體受僱員工月經常性薪資平均 47,884 元、中位數 38,406 元；各行業全年總薪資（電子零組件 133.3 萬、金融保險 132.1 萬、不動產 67.1 萬等）；職業年薪採勞動部 114 年職類別薪資調查（機師 393.1 萬、精算師 366.2 萬、醫師 249.7 萬、律師 158.0 萬；大職類：基層 43.1、服務銷售 49.7、技藝 54.0、事務 56.4、技術員 78.9、專業 106.2、主管 131.7 萬）。實質薪資成長依 2025 年 +1.4%。<br>
生活費：主計總處 2025 家庭收支調查（每戶消費 92.0 萬、可支配所得 121.0 萬、儲蓄率 24.0%、居住 24.1%、食品 15.4%、醫療 14.1%）；單人戶與每增 1 人的消費差距由 112 年家庭規模別資料依消費成長推算（單人 45.4 萬、每名子女 27 萬）。<br>
景氣與物價：經濟成長以主計總處長期均值約 3.5% 為中心隨機波動；2026 年 CPI 預測 2.07%、10 月 +2.33%。基本工資 29,500 元。<br>
非主計總處口徑：房價與車價（內政部實價登錄、車商牌價）、利率（中央銀行）、平均壽命（內政部）、各產業毛利率與人均營收為遊戲估算。</p>`;
function astHTML(){
 let h=`<h3>🏠 資產</h3><p>淨資產：${money(netWorth())}</p>`;
 h+=houseBrief();
 if(S.car)h+=`<div class="item"><b>${S.car.n}</b>　市值 ${money(S.car.value)}<br>每年保養 NT$40,000</div><button class="btn" data-a="sellC">賣掉車子</button>`;
 else if(S.age>=18)h+='<div class="sec">買車</div>'+CARS.map((c,i)=>`<button class="btn" data-a="buyC:${i}" ${S.money<c.p?'disabled':''}>${c.n}　${money(c.p)}</button>`).join('');
 return h+pfHTML()+STATNOTE;
}
function handle(a){
 if(!S)return;const [t,x,y,z,u]=a.split(':');let r=null,sub=view.sub;
 if(t==='close'){$('sheet').classList.remove('on');view.fsub=null;view.csub=null;view.cnsub=null;return}
 if(t==='back'&&view.tab==='life'){view.lsub=null;showSheet('more');return}
 if(t==='back'){sub=null;view.fsub=null;view.csub=null;view.cnsub=null}
 else if(t==='cn')r=cnHandle(x,y,z);
 else if(t==='lg')r=lgHandle(x,y,z,u);
 else if(t==='pf')r=pfHandle(x,y,z);
 else if(t==='kid'){view.tab='rel';if(x==='page')sub='E'+y;else{r=kidHandle(x,y,z);sub='E'+y}}
 else if(t==='jf'){view.jf=x;r=null}
 else if(t==='open'){view.cnsub=null;view.fsub=null;view.csub=null;showSheet(x);return}
 else if(t==='found')r=foundHandle(x,y,z);
 else if(t==='co')r=coHandle(x,y,z);
 else if(t==='rel')sub=x;
 else if(S.dead)return;
 else if(t==='lv'){view._fresh=0;r=lvHandle(x,y,z)}
 else if(t==='rom'){view._fresh=1;view.tab='rel';r=romHandle(x,y,z);sub=view.rsub||null}
 else if(t==='lf'){view.tab='life';view.lsub=x;r=lfHandle(x,y,z,u)}
 else if(t==='act'){const o=ACTS.find(q=>q.id===x);if(o&&canAct(o)&&!S.acts[x]&&(!o.cost||S.money>=o.cost)){S.acts[x]=1;if(o.cost)S.money-=o.cost;r=o.run();log(r[0],r[1])}}
 else if(t==='job')r=applyJob(+x);
 else if(t==='quit'&&S.job&&!S.job.founder){log(`你辭去了${S.job.t}。`);r=N('你辭職了。');S.job=null}
 else if(t==='dropout'){log(`你從${S.school}輟學了。`,'bad');S.school=null;S.tuition=0;chg('happy',-3);r=B('你輟學了。')}
 else if(t==='do'){r=interact(x,y)}
 else if(t==='buyH')r=buyHouse(+x,y);else if(t==='sellH')r=sellHouse();
 else if(t==='buyC')r=buyCar(+x);else if(t==='sellC')r=sellCar();
 view.msg=r;render();
 showSheet(view.tab,t==='do'&&!getP(x)?null:sub);
}
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>showSheet(b.dataset.t));
$('ageBtn').onclick=ageUp;
$('sheetBody').onclick=e=>{const b=e.target.closest('[data-a]');if(b&&!b.disabled)handle(b.dataset.a)};
$('sheet').onclick=e=>{if(e.target.id==='sheet')$('sheet').classList.remove('on')};
showStart();
function moreHTML(){
 const T=[['rom','💘','戀愛與人脈','乙女式攻略・告白・多元性向'],['lfmind','🧠','身心健康','壓力・憂鬱・成癮'],['lfach','🏆','成就與結局','人生目標・收集結局'],['lftree','🌳','家族史','世代・配偶・子女'],['lfpol','📰','社會與政策','基本工資・補助・同婚'],['act','🎯','活動','讀書、運動、旅行'],['cn','🌏','移民與匯率','簽證・外匯'],['lg','📜','傳承','遺囑・信託・遺產稅'],['rel','🏫','家庭與子女','天賦・升學・贈與'],['ast','🏠','資產與投資','房車・股票・黃金'],['eco','📊','經濟儀表板','景氣・物價・歷史'],['job','💼','職業','求職・創業']];
 return '<h3>☰ 更多功能</h3><div class="grid">'+T.map(([k,i,n,d])=>`<button class="tile" data-a="${k==='rom'?'rom:go:h':k.startsWith('lf')?'lf:'+k.slice(2):'open:'+k}"><b>${i}</b>${n}<small>${d}</small></button>`).join('')+'</div>';
}
