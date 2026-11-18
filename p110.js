/* ---- p110：料理與食譜系統（菜系、派系、學習、原創、融合、擺攤、比賽；皆為遊戲設定，菜色名稱為通俗分類）---- */
UITILE['lf:cook']='cup';
const CUIS=[
 ['twn','台灣菜','TW',{台菜:'三杯雞2,滷肉飯1,紅燒獅子頭3,菜脯蛋1,蚵仔煎2,佛跳牆5,白斬雞2,炒米粉2',小吃:'鹽酥雞1,臭豆腐2,蚵仔麵線2,肉圓3,刈包2,擔仔麵2,珍珠奶茶1,鳳梨酥3',客家菜:'客家小炒2,薑絲大腸2,梅干扣肉3,客家湯圓2,擂茶2',原住民料理:'竹筒飯2,醃肉2,小米酒雞湯2,風乾魚2',眷村菜:'紅燒牛肉麵3,蔥油餅2,水餃2,炸醬麵2,韭菜盒子2'}],
 ['chn','中華料理','CN',{川菜:'麻婆豆腐2,宮保雞丁2,回鍋肉2,水煮魚3,擔擔麵2,夫妻肺片4',粵菜:'白切雞2,蝦餃3,燒鵝4,叉燒2,煲仔飯2,清蒸魚3',湘菜:'剁椒魚頭3,毛氏紅燒肉3,辣椒炒肉2',魯菜:'蔥燒海參5,糖醋鯉魚4,九轉大腸5',江浙菜:'東坡肉3,西湖醋魚4,小籠包4,清燉獅子頭3',閩菜:'荔枝肉3,魚丸湯2,福州魚丸2'}],
 ['jpn','日本料理','JP',{壽司:'握壽司4,散壽司3,軍艦卷3',拉麵:'醬油拉麵3,豚骨拉麵4,味噌拉麵3',炸物:'天婦羅4,炸豬排3,唐揚炸雞2',居酒屋:'燒鳥2,玉子燒2,關東煮2',懷石:'懷石前菜5,茶碗蒸3'}],
 ['kor','韓國料理','KR',{傳統:'泡菜3,石鍋拌飯2,辣炒年糕1,人蔘雞湯3',烤肉:'烤五花肉2,烤牛小排3',街頭:'韓式炸雞2,海苔飯捲2'}],
 ['tha','泰國料理','TH',{泰式:'青木瓜沙拉2,綠咖哩3,打拋豬2,冬蔭功3,泰式炒河粉2,芒果糯米飯2'}],
 ['vnm','越南料理','VN',{越式:'牛肉河粉3,越式法國麵包2,生春捲2'}],
 ['ind','印度料理','IN',{北印:'奶油雞3,烤餅(馕)2,印度香飯4',南印:'多薩薄餅3,桑巴燉豆湯3'}],
 ['ita','義大利料理','IT',{麵食:'培根蛋麵3,肉醬麵2,青醬寬麵2,千層麵3',披薩:'瑪格麗特披薩3,拿坡里披薩4',其他:'米蘭燉飯4,提拉米蘇3'}],
 ['fra','法國料理','FR',{經典:'紅酒燉牛肉4,油封鴨腿4,法式洋蔥湯3,馬賽魚湯4',甜點:'可麗餅2,可麗露4,馬卡龍5,法式千層酥4'}],
 ['usa','美式料理','US',{美式:'經典漢堡2,BBQ烤肋排3,炸雞2,蘋果派3'}],
 ['mex','墨西哥料理','MX',{墨式:'塔可2,墨西哥捲餅2,酪梨醬1,莫雷醬雞4'}],
 ['tur','土耳其與中東料理','TR',{中東:'烤肉串3,鷹嘴豆泥2,庫斯庫斯3'}],
 ['deu','德國料理','DE',{德式:'烤豬腳4,德式香腸2,椒鹽脆餅3'}],
 ['gbr','英國料理','GB',{英式:'炸魚薯條2,牛肉威靈頓5,英式早餐1,司康2'}],
 ['esp','西班牙料理','ES',{西式:'海鮮燉飯4,西班牙烘蛋2,塔帕斯小點2'}]
];
const DISH={};
CUIS.forEach(c=>{for(const sc in c[3])c[3][sc].split(',').forEach(s=>{const m=s.match(/^(.+?)(\d)$/);if(!m)return;const id=c[0]+'_'+m[1];DISH[id]={id,n:m[1],cu:c[0],cun:c[1],sc,lv:+m[2]}})});
const CUMAP={};CUIS.forEach(c=>CUMAP[c[0]]=c);
const DBASE=[60,100,160,260,420];
function ckInit(){if(!S.rcp)S.rcp={known:{},own:[],sk:0,tr:{},ex:{}};return S.rcp}
function ckF(){try{return S.cn&&S.cn!=='TW'&&CNS[S.cn]?wTW(S.cn)/761000:1}catch(e){return 1}}
function ckHome(cu){const c=CUMAP[cu];return !!c&&(c[2]==='TW'||c[2]===S.cn)}
function ckRecipe(id){const r=ckInit();if(DISH[id])return DISH[id];return r.own.find(x=>x.id===id)}
function ckM(id){const r=ckInit();return r.known[id]?r.known[id].m:0}
function ckSigs(n){const r=ckInit();return Object.keys(r.known).map(id=>({id,m:r.known[id].m,rec:ckRecipe(id)})).filter(x=>x.rec).sort((a,b)=>(b.m+(b.rec.q||0)*.2)-(a.m+(a.rec.q||0)*.2)).slice(0,n||3)}
function ckIsChef(){return !!(S.job&&/廚師|主廚|廚/.test(S.job.t||''))}
function ckLvName(m){return m>=80?'拿手':m>=50?'熟練':m>=20?'入門':'生疏'}
function ckCan(lv){const r=ckInit();return lv<=1+Math.floor(r.sk/18)}
function ckUse(){S.acts=S.acts||{};S.acts.ck=(S.acts.ck||0)+1}
function ckLeft(){return 3-((S.acts&&S.acts.ck)||0)}
function ckCost(d){const base=Math.round(DBASE[(d.lv||2)-1]*.5*ckF()*(ckHome(d.cu)?1:2)*20)/1;return Math.max(100,base)}
function ckLearn(id){
 const r=ckInit(),d=DISH[id];if(!d)return B('找不到這道菜。');
 if(S.age<10)return B('年紀還太小。');
 if(ckLeft()<=0)return B('今年的練習次數用完了。');
 if(!ckCan(d.lv))return B('廚藝還不夠，先學簡單一點的菜。');
 const c=ckCost(d);if(S.money<c)return B(`食材與學費需要約 ${money(c)}。`);
 S.money-=c;ckUse();
 const home=ckHome(d.cu),k=r.known[id]||(r.known[id]={m:0,y:calYear()});
 const g=Math.round((home?22:13)+r.sk/8+R(0,10)-d.lv*2+(ckIsChef()?6:0));
 const first=k.m===0;k.m=Math.min(100,k.m+Math.max(5,g));r.sk=Math.min(100,r.sk+(first?3:2));
 const m=`你${first?'學會了':'練習了'}「${d.n}」（${d.cun}・${d.sc}），熟練度 ${k.m}%（${ckLvName(k.m)}）。`;log(m,'good');chg('happy',2);return G(m);
}
function ckTrip(cu){
 const r=ckInit(),c=CUMAP[cu];if(!c)return B('請先選菜系。');
 if(ckHome(cu))return B('這是你生活圈的菜系，不需要遊學。');
 if(r.ex[cu])return B('你已經去這個菜系的產地學過了。');
 const cost=Math.round(1.1*(CNS[c[2]]?wTW(c[2]):761000)*ckF()/ckF());
 if(S.money<cost)return B(`遊學約需 ${money(cost)}（旅費、學費與生活費）。`);
 if(S.age<16)return B('年紀還太小。');
 S.money-=cost;r.ex[cu]=1;let n=0;
 Object.values(DISH).filter(d=>d.cu===cu&&d.lv<=2).forEach(d=>{const k=r.known[d.id]||(r.known[d.id]={m:0,y:calYear()});if(k.m<40){k.m=40;n++}});
 r.sk=Math.min(100,r.sk+6);chg('happy',8);const m=`你到${c[1]}的故鄉拜師學藝，帶回 ${n} 道基本菜的做法，視野也開闊了。`;log(m,'good');return G(m);
}
function ckStall(id){
 const r=ckInit(),d=ckRecipe(id);if(!d||!r.known[id])return B('先學會這道菜。');
 if(r.known[id].m<30)return B('熟練度要 30% 以上才敢上桌賣。');
 if(ckLeft()<=0)return B('今年的次數用完了。');
 ckUse();const lv=d.lv||Math.max(1,Math.min(5,Math.round((d.q||40)/22))),f=ckF(),qv=r.known[id].m/100,sv=Math.round((60+R(0,60))*(.6+qv));
 const rev=Math.round(DBASE[lv-1]*f*sv*(.7+qv*.5)),cost=Math.round(rev*.45),prof=rev-cost;
 S.money+=prof;r.known[id].m=Math.min(100,r.known[id].m+3);r.sk=Math.min(100,r.sk+1);
 const m=`你在市集擺攤賣「${d.n}」，賣出約 ${sv} 份，扣掉食材淨賺 ${money(prof)}。`;log(m,'good');chg('happy',2);return G(m);
}
const ING=['雞肉','豬肉','牛肉','海鮮','蔬菜','豆腐','麵條','米飯','蛋','菇類'],MTH=['炒','煮','烤','蒸','炸','滷','燉','涼拌'];
function ckCreate(cu,sc,ing,mth,nm){
 const r=ckInit();if(r.sk<20)return B('廚藝至少要 20 才能創作自己的食譜。');
 if(ckLeft()<=0)return B('今年的次數用完了。');
 const c=CUMAP[cu];if(!c)return B('請選菜系。');
 const kn=Object.keys(r.known).map(id=>DISH[id]).filter(d=>d&&d.cu===cu);
 const avg=kn.length?kn.reduce((s,d)=>s+ckM(d.id),0)/kn.length:0;
 const q=Math.max(10,Math.min(100,Math.round(r.sk*.5+avg*.25+(S.smarts||50)*.1+R(0,22)-(ckHome(cu)?0:8))));
 nm=String(nm||'').replace(/[<>&"']/g,'').trim().slice(0,12)||`${c[1].replace(/料理|菜/,'')}式${mth}${ing}`;
 if(r.own.length>=12)return B('你的食譜本已經滿了（最多 12 道原創）。');
 if(r.own.some(x=>x.n===nm))return B('已經有同名的食譜了。');
 const cost=Math.round(2000*ckF());if(S.money<cost)return B(`試作食材約需 ${money(cost)}。`);
 S.money-=cost;ckUse();const id='o'+Date.now().toString(36)+R(0,99);
 r.own.push({id,n:nm,cu,cun:c[1],sc,lv:Math.max(1,Math.min(5,Math.round(q/22))),q,y:calYear(),fus:0});
 r.known[id]={m:Math.round(q*.6),y:calYear()};r.sk=Math.min(100,r.sk+2);
 const m=`你反覆試作，創出了新食譜「${nm}」（完成度 ${q}）。`;log(m,q>=60?'good':'');chg('happy',4);return q>=60?G(m):N(m);
}
function ckFuse(a,b,nm){
 const r=ckInit();if(r.sk<35)return B('廚藝至少要 35 才能做融合料理。');
 const A=ckRecipe(a),Bd=ckRecipe(b);if(!A||!Bd||a===b)return B('請選兩道不同的菜。');
 if(A.cu===Bd.cu)return B('融合料理要選兩種不同菜系的菜。');
 if(ckM(a)<40||ckM(b)<40)return B('兩道菜的熟練度都要 40% 以上。');
 if(ckLeft()<=0)return B('今年的次數用完了。');
 if(r.own.length>=12)return B('你的食譜本已經滿了。');
 const cost=Math.round(3000*ckF());if(S.money<cost)return B(`試作食材約需 ${money(cost)}。`);
 nm=String(nm||'').replace(/[<>&"']/g,'').trim().slice(0,12)||`${A.cun.replace(/料理|菜/,'')}風${Bd.n}`;
 if(r.own.some(x=>x.n===nm))return B('已經有同名的食譜了。');
 S.money-=cost;ckUse();
 const q=Math.max(10,Math.min(100,Math.round(r.sk*.4+(ckM(a)+ckM(b))*.25+(S.smarts||50)*.1+R(0,28)))),id='o'+Date.now().toString(36)+R(0,99);
 r.own.push({id,n:nm,cu:A.cu,cun:`${A.cun}×${Bd.cun}`,sc:'融合',lv:Math.max(2,Math.min(5,Math.round(q/22)+1)),q,y:calYear(),fus:1});
 r.known[id]={m:Math.round(q*.6),y:calYear()};r.sk=Math.min(100,r.sk+3);
 const m=`你把${A.n}和${Bd.n}的精神混在一起，做出了「${nm}」（完成度 ${q}）。`;log(m,q>=60?'good':'');chg('happy',5);return q>=60?G(m):N(m);
}
/* UI */
function cookHTML(){
 const r=ckInit(),sel=frmGet('ckc').s||'twn',cs=CUIS.find(c=>c[0]===sel)||CUIS[0];
 const dl=Object.values(DISH).filter(d=>d.cu===cs[0]);
 const sg=ckSigs(3);
 let h=`<h3>料理與食譜</h3><div class="item"><b>廚藝 ${r.sk}／100</b>・已會 ${Object.keys(r.known).length} 道・原創 ${r.own.length} 道<div class="sub">今年還能練習 ${ckLeft()} 次${ckIsChef()?'・你的本業就是廚師，收入會隨招牌菜提高':''}${sg.length?'<br>招牌：'+sg.map(x=>esc(x.rec.n)+'（'+x.m+'%）').join('、'):''}</div></div>`;
 h+='<div class="sec op">學習食譜</div>'+frmHTML('ckc',{sl:'菜系',opts:CUIS.map(c=>[c[0],c[1]+(ckHome(c[0])?'':'（異國）')]),amt:false,btns:[]});
 h+=frmHTML('ckl',{sl:`${cs[1]}的食譜`,opts:dl.map(d=>[d.id,`${d.sc}・${d.n}（難度 ${d.lv}）${r.known[d.id]?'・'+r.known[d.id].m+'%':''}`]),amt:false,btns:[['l','學習／練習','p'],['s','擺攤賣']]});
 h+=`<div class="sub">${ckHome(cs[0])?'生活圈的菜系，學得快、食材便宜。':'異國菜系學得慢、食材貴；去產地遊學可一次學會基本菜。'}</div>`;
 if(!ckHome(cs[0]))h+=`<button class="btn" data-a="frmgo:ckt:${cs[0]}">到${esc(cs[1])}的故鄉遊學</button>`;
 const kn=Object.keys(r.known).map(id=>ckRecipe(id)).filter(Boolean);
 h+='<div class="sec op">原創食譜</div><div class="frm"><label for="ck_c">菜系與派系</label><select id="ck_c">'+CUIS.map(c=>Object.keys(c[3]).map(sc=>`<option value="${c[0]}|${sc}">${c[1]}・${sc}</option>`).join('')).join('')+`</select><label for="ck_i">主食材</label><select id="ck_i">${ING.map(x=>`<option>${x}</option>`).join('')}</select><label for="ck_m">做法</label><select id="ck_m">${MTH.map(x=>`<option>${x}</option>`).join('')}</select><label for="ck_n">菜名（可留空）</label><input id="ck_n" type="text" maxlength="12" placeholder="例如：阿嬤的滷味"><div class="acts"><button class="btn p" data-a="frmgo:ckn:go">創作</button></div></div>`;
 if(kn.length>=2)h+=`<div class="sec op">融合料理</div><div class="frm"><label for="ck_a">第一道菜</label><select id="ck_a">${kn.map(d=>`<option value="${d.id}">${esc(d.n)}（${esc(d.cun)}）</option>`).join('')}</select><label for="ck_b">第二道菜（需不同菜系）</label><select id="ck_b">${kn.map(d=>`<option value="${d.id}">${esc(d.n)}（${esc(d.cun)}）</option>`).join('')}</select><label for="ck_fn">菜名（可留空）</label><input id="ck_fn" type="text" maxlength="12"><div class="acts"><button class="btn p" data-a="frmgo:ckf:go">融合創作</button></div></div>`;
 if(r.own.length)h+='<div class="sec">我的原創食譜</div>'+r.own.map(d=>`<div class="item"><b>${esc(d.n)}</b>${d.fus?'（融合）':''}<div class="sub">${esc(d.cun)}・${esc(d.sc)}・完成度 ${d.q}・熟練 ${ckM(d.id)}%</div></div>`).join('');
 return h+`<button class="btn" data-a="back">← 返回</button>`;
}
const _lh110=lifeHTML;
lifeHTML=function(){if(view.lsub==='cook')return cookHTML();return _lh110()};
const _lf110=lfHandle;
lfHandle=function(x,y,z,u){if(x==='cook'){view.lsub='cook';return null}return _lf110(x,y,z,u)};
const _mh110=moreHTML;
moreHTML=function(){
 const h=_mh110(),t='<button class="tile" data-a="lf:cook"><b>料</b>料理與食譜<small>學菜・原創・融合・擺攤</small></button>',m=h.match(/<button class="tile"[^>]*data-a="lf:health"[^>]*>[\s\S]*?<\/button>/);
 return m?h.replace(m[0],m[0]+t):h+t;
};
const _hd110=handle;
handle=function(a){
 if(typeof a==='string'&&a.startsWith('frmgo:ck')){
  const p=a.split(':'),rf=()=>{view.lsub='cook';render();try{showSheet('life')}catch(e){}};
  let m=null;
  if(p[1]==='ckl'){const id=frmGet('ckl').s;m=p[2]==='s'?ckStall(id):ckLearn(id)}
  else if(p[1]==='ckt')m=ckTrip(p[2]);
  else if(p[1]==='ckn'){let [cu,sc]=(document.getElementById('ck_c').value||'twn|台菜').split('|');m=ckCreate(cu,sc,document.getElementById('ck_i').value,document.getElementById('ck_m').value,document.getElementById('ck_n').value)}
  else if(p[1]==='ckf')m=ckFuse(document.getElementById('ck_a').value,document.getElementById('ck_b').value,document.getElementById('ck_fn').value);
  if(m){view.msg=m;rf();return}
 }
 return _hd110(a);
};
/* 活動頁入口 */
const _ac110=actHTML;
actHTML=function(){const h=_ac110();if(view.polOn||view.pjOn||S.age<10)return h;return h+`<button class="btn" data-a="lf:cook">料理與食譜<small>${ckInit().sk?'廚藝 '+ckInit().sk+'・已會 '+Object.keys(ckInit().known).length+' 道':'學菜、創作、擺攤'}</small></button>`};
/* 每年：廚師收入、家常菜 */
const _y110=yearly;
yearly=function(){
 const r=_y110.apply(this,arguments);
 try{const c=S.rcp;if(c&&!S.dead){
  const sg=ckSigs(3);
  if(ckIsChef()&&sg.length){const avg=sg.reduce((s,x)=>s+x.m+(x.rec.q||0)*.2,0)/sg.length,b=Math.round(S.job.sal*.0012*avg);if(b>0){S.money+=b;c.sk=Math.min(100,c.sk+1)}}
  else if(Object.keys(c.known).length>=3&&S.age>=18&&Math.random()<.5){chg('happy',1);(S.kids||[]).forEach(k=>{if(k.age<20)k.rel=Math.min(100,(k.rel||50)+1)})}
 }}catch(e){}
 return r;
};
/* 事件 */
const ckEv=(id,min,max,w,cond,t,cs)=>E.push({id,min,max,w,if:()=>{try{return cond()}catch(e){return false}},run:cs});
ckEv('ck_contest',18,70,3,()=>ckInit().sk>=35,0,()=>{const r=ckInit(),s=ckSigs(1)[0];if(!s)return {t:'社區舉辦廚藝比賽，朋友鼓勵你報名。',c:[ch('下次再說',()=>N('你笑笑說下次吧。'))]};const q=(s.m*.6+(s.rec.q||s.rec.lv*18)*.3+r.sk*.3),win=Math.min(.6,Math.max(.08,q/200));return {t:`社區舉辦廚藝比賽，你想拿拿手的「${s.rec.n}」去參賽。`,c:[
 ch('報名參加',()=>{if(Math.random()<win){const p=Math.round(30000*ckF());S.money+=p;r.sk=Math.min(100,r.sk+3);chg('happy',8);return G(`你的「${s.rec.n}」打動了評審，拿到名次與獎金 ${money(p)}。`)}r.sk=Math.min(100,r.sk+1);chg('happy',-2);return N('沒有得名，但你偷學到別人的幾個技巧。')}),
 ch('當觀眾就好',()=>N('你在台下看得津津有味。'))]}});
ckEv('ck_star',30,68,3,()=>ckIsChef()&&ckInit().sk>=70,0,()=>{const s=ckSigs(1)[0],ok=Math.random()<.35+ckInit().sk/300;return {t:'國際美食評鑑的匿名評審來到你工作的餐廳用餐，你沒有收到任何通知。',c:[
 ch('照平常水準出菜',()=>{if(ok){S.money+=Math.round(S.job.sal*.2);chg('happy',10);S.job.perf=Math.min(100,(S.job.perf||50)+8);return G(`幾週後，餐廳拿到評鑑肯定，你的${s?'「'+s.rec.n+'」':'招牌菜'}成了話題。`)}return N('沒有消息，但廚房依舊每天忙碌。')}),
 ch('特別加碼準備新菜',()=>{S.stress=cl(S.stress+5);if(ok||Math.random()<.2){S.money+=Math.round(S.job.sal*.2);chg('happy',10);return G('新菜讓評審印象深刻，餐廳拿到評鑑肯定。')}return B('緊張讓你出了一點小差錯。')})]}});
ckEv('ck_idea',18,80,3,()=>ckInit().sk>=30&&ckInit().own.length<12,0,()=>({t:'你在市場看到沒見過的食材，腦中突然冒出一個新做法。',c:[
 ch('回家馬上試做',()=>{const cu=pick(CUIS),sc=pick(Object.keys(cu[3])),m=ckCreate(cu[0],sc,pick(ING),pick(MTH),'');return m}),
 ch('記在筆記本上，改天再說',()=>N('你把靈感寫下來，夾在食譜本裡。'))]}));
ckEv('ck_abroad',16,80,3,()=>S.ab&&S.cn!=='TW'&&S.ab.yrs>=1&&CUIS.some(c=>c[2]===S.cn&&Object.values(DISH).some(d=>d.cu===c[0]&&!ckInit().known[d.id])),0,()=>{const c=CUIS.find(c=>c[2]===S.cn),ds=Object.values(DISH).filter(d=>d.cu===c[0]&&d.lv<=3&&!ckInit().known[d.id]);if(!ds.length)return {t:'你和鄰居聊起家鄉菜。',c:[ch('聊得很開心',()=>N('你們互相交換了一些做菜心得。'))]};const d=pick(ds);return {t:`鄰居邀你到家裡吃飯，端出一道「${d.n}」，並說願意教你做法。`,c:[
 ch('認真跟著學',()=>{const r=ckInit();r.known[d.id]={m:35,y:calYear()};r.sk=Math.min(100,r.sk+3);chg('happy',5);return G(`你學會了「${d.n}」的基本做法。`)}),
 ch('只吃不學',()=>{chg('happy',2);return N('你吃得很滿足，下次再說。')})]}});
/* 家傳食譜：傳承給下一代 */
const _as110=applySuccession;
applySuccession=function(r,k){
 const old=S.rcp;_as110.apply(this,arguments);
 try{if(old&&(Object.keys(old.known).length||old.own.length)){
  const nw={known:{},own:[],sk:Math.floor((old.sk||0)*.4),tr:{},ex:{},fam:1};
  old.own.forEach(d=>{nw.own.push(Object.assign({},d,{fam:1}));nw.known[d.id]={m:Math.max(30,Math.round((old.known[d.id]?old.known[d.id].m:50)*.5)),y:calYear()}});
  Object.keys(old.known).forEach(id=>{if(DISH[id]&&old.known[id].m>=70&&!nw.known[id])nw.known[id]={m:Math.round(old.known[id].m*.4),y:calYear()}});
  S.rcp=nw;try{log('你從長輩那裡繼承了家傳的食譜本。','good')}catch(e){}
 }}catch(e){}
};
const _ep110=epitaph;
epitaph=function(){let t=_ep110.apply(this,arguments);try{const s=ckSigs(1)[0];if(s&&s.m>=60&&t)t=t.replace(/。$/,`，招牌菜是「${s.rec.n}」。`)}catch(e){}return t};
