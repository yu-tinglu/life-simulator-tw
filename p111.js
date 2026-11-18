/* ---- p111：餐廳、師徒、節慶料理、食材行情、飲食風格、食譜書與名氣（遊戲設定）---- */
const RTIER=[['0','小吃店',2000000,18000,150,400000],['1','餐廳',8000000,14000,450,1600000],['2','高級餐廳',30000000,5000,2200,3500000]];
function rstInit(){return S.rst||null}
function rstQ(){const r=ckInit(),m=(S.rst&&S.rst.menu||[]).map(id=>{const d=ckRecipe(id);return d?(ckM(id)*.7+(d.q||d.lv*16)*.3):0});return m.length?m.reduce((a,b)=>a+b,0)/m.length:0}
function ingIdx(){if(S.ingx==null)S.ingx=1;return S.ingx}
function ingTxt(){const x=ingIdx();return x>=1.12?'偏貴':x<=.92?'偏便宜':'正常'}
function rstOpen(t){
 const T=RTIER[+t];if(!T)return B('請選類型。');if(S.rst)return B('你已經有一間店了。');
 if(S.age<20)return B('年紀還太小。');if(ckInit().sk<(+t)*25)return B(`廚藝需達 ${(+t)*25} 以上。`);
 const c=Math.round(T[2]*ckF());if(S.money<c)return B(`開${T[1]}約需 ${money(c)}。`);
 S.money-=c;S.rst={n:`${S.name[0]}家${T[1]}`,t:+t,y0:calYear(),menu:[],staff:0,rep:40,inv:c,p:0};
 const m=`你開了「${S.rst.n}」，投入 ${money(c)}。先去設定菜單吧。`;log(m,'good');chg('happy',6);return G(m);
}
function rstMenu(id,add){
 const r=S.rst;if(!r)return B('你還沒有店。');const d=ckRecipe(id);if(!d||!ckInit().known[id])return B('先學會這道菜。');
 if(add){if(r.menu.includes(id))return B('已經在菜單上了。');if(r.menu.length>=6)return B('菜單最多 6 道。');if(ckM(id)<30)return B('熟練度 30% 以上才能上菜單。');r.menu.push(id);return G(`「${d.n}」上了菜單。`)}
 r.menu=r.menu.filter(x=>x!==id);return N(`「${d.n}」下架了。`);
}
function rstStaff(d){
 const r=S.rst;if(!r)return B('你還沒有店。');
 if(d>0){if(r.staff>=[2,4,5][r.t])return B('人手已滿（這個規模最多 '+[2,4,5][r.t]+' 人）。');r.staff++;return G('你多請了一位廚房夥伴。')}
 if(r.staff<=0)return B('已經沒有員工了。');r.staff--;return N('你資遣了一位員工。');
}
function rstReno(){
 const r=S.rst;if(!r)return B('你還沒有店。');const c=Math.round(RTIER[r.t][2]*.15*ckF());if(S.money<c)return B(`整修約需 ${money(c)}。`);
 S.money-=c;r.inv+=c;r.rep=Math.min(100,r.rep+8);return G(`店面整修完成，人氣上升（花費 ${money(c)}）。`);
}
function rstClose(){
 const r=S.rst;if(!r)return B('你還沒有店。');const v=Math.round(r.inv*.35);S.money+=v;const n=r.n;S.rst=null;chg('happy',-3);log(`你把「${n}」結束營業，設備與頂讓金回收 ${money(v)}。`,'');return N(`結束營業，回收 ${money(v)}。`);
}
function rstYear(){
 const r=S.rst;if(!r)return;const T=RTIER[r.t],f=ckF(),q=rstQ(),menuN=r.menu.length;
 if(!menuN){r.rep=Math.max(0,r.rep-6);r.p=-Math.round(T[5]*f*.5);S.money+=r.p;try{log(`「${r.n}」今年沒有像樣的菜單，生意冷清，虧損 ${money(-r.p)}。`,'bad')}catch(e){}return}
 const div=Math.min(1.1,.7+menuN*.1),fame=((S.rcp&&S.rcp.fame)||0)/200;
 const cov=T[3]*(.5+(r.rep+fame*30)/100)*(.6+q/150)*div*Math.min(1.6,.8+r.staff*.2)*(ckIsChef()||ckInit().sk>=50?1:.9)*(.9+Math.random()*.2);
 const rev=Math.round(cov*T[4]*f),cost=Math.round(rev*.55*ingIdx()+T[5]*f+r.staff*Math.max(T[5]*.25,350000)*f);
 r.p=rev-cost;S.money+=r.p;r.rep=Math.max(0,Math.min(100,r.rep+Math.round((q-50)/8+(Math.random()-.5)*6)));
 S.stress=cl(S.stress+3);
 try{const rc=ckInit();if(r.t===2&&r.rep>=70)rc.fame=Math.min(100,(rc.fame||0)+2);else if(r.t===1&&r.rep>=80)rc.fame=Math.min(100,(rc.fame||0)+1)}catch(e){}
 try{log(`「${r.n}」今年營收 ${money(rev)}，${r.p>=0?'獲利':'虧損'} ${money(Math.abs(r.p))}（人氣 ${r.rep}）。`,r.p>=0?'good':'bad')}catch(e){}
}
/* 師徒 */
function appInit(){const r=ckInit();if(!r.apps)r.apps=[];return r.apps}
function appTake(){
 const r=ckInit(),a=appInit();if(r.sk<45)return B('廚藝 45 以上才有資格收徒。');if(a.length>=3)return B('最多同時帶 3 位徒弟。');
 const sx=pick(['男','女']),n=fullName(sx);a.push({n,y:calYear(),sk:5,known:[],tr:R(30,90)});
 const m=`${n}拜入你門下，成為你的徒弟。`;log(m,'good');chg('happy',3);return G(m);
}
function appTeach(i,id){
 const r=ckInit(),a=appInit()[+i];if(!a)return B('請選徒弟。');if(!r.known[id])return B('你自己要先會。');if(ckLeft()<=0)return B('今年的次數用完了。');
 if(a.known.includes(id))return B('他已經會這道菜了。');ckUse();a.known.push(id);a.sk=Math.min(100,a.sk+8);r.sk=Math.min(100,r.sk+1);
 const d=ckRecipe(id);return G(`你把「${d.n}」教給${a.n}，他學得很認真。`);
}
function appYear(){
 const r=S.rcp;if(!r||!r.apps)return;
 r.apps.forEach(a=>{a.sk=Math.min(100,a.sk+R(3,7))});
 r.apps.slice().forEach(a=>{if(calYear()-a.y>=5&&!a.out){a.out=1;r.apps=r.apps.filter(x=>x!==a);
  const own=a.known.filter(id=>String(id).startsWith('o')),steal=own.length&&Math.random()<(1-a.tr/120)*.4;
  try{log(steal?`徒弟${a.n}出師了，聽說他的店裡賣起很像你的「${ckRecipe(own[0])?ckRecipe(own[0]).n:'招牌菜'}」。`:`徒弟${a.n}出師了，自己開了店，逢年過節還會回來看你。`,steal?'':'good')}catch(e){}
  if(!steal){chg('happy',4);r.fame=Math.min(100,(r.fame||0)+3)}else{r.fame=Math.max(0,(r.fame||0)-1)}}});
}
/* 食材行情與飲食風格 */
const DIET=[['0','均衡'],['1','重口味'],['2','清淡']];
function dietYear(){
 const r=S.rcp;if(!r)return;const d=r.diet||'0';
 if(d==='1'){chg('happy',1);chg('health',-1)}else if(d==='2'){chg('health',1)}
 if(ckIsChef()&&Math.random()<.3)chg('health',-1);
}
function ingYear(){
 let x=ingIdx();x=1+(x-1)*.6+(Math.random()-.5)*.14;
 if(S.gs&&S.gs.t<=1)x+=S.gs.k==='pandemic'?.08:S.gs.k==='hike'?.05:0;
 S.ingx=Math.max(.8,Math.min(1.4,x));
}
const _ck111=ckCost;
ckCost=function(d){return Math.round(_ck111.apply(this,arguments)*ingIdx())};
/* 食譜書 */
function bookMake(){
 const r=ckInit();if(r.sk<50)return B('廚藝 50 以上才能出書。');
 const n=Object.keys(r.known).length;if(n<8&&r.own.length<3)return B('至少要會 8 道菜，或有 3 道原創。');
 if((r.book||0)>=3)return B('你已經出過 3 本書了。');if(ckLeft()<=0)return B('今年的次數用完了。');
 ckUse();r.book=(r.book||0)+1;const q=ckSigs(5).reduce((s,x)=>s+x.m+(x.rec.q||0)*.3,0)/5,inc=Math.round(Math.max(1,q)*3000*ckF()*(1+(r.fame||0)/100));
 S.money+=inc;r.fame=Math.min(100,(r.fame||0)+6);chg('happy',6);const m=`你出版了第 ${r.book} 本食譜書，版稅與預付金約 ${money(inc)}，知名度上升。`;log(m,'good');return G(m);
}
/* UI：餐廳與進階 */
function cook2HTML(){
 const r=ckInit();let h='';
 h+=`<div class="sec op">進階</div><div class="item"><b>知名度 ${r.fame||0}</b>・食譜書 ${r.book||0} 本・食材行情：${ingTxt()}<div class="sub">知名度高，餐廳人氣與書的版稅都會加成。</div></div>`;
 h+=frmHTML('ckd',{sl:'飲食風格（每年影響健康與心情）',opts:DIET,amt:false,btns:[['d','設定']]});
 h+=`<button class="btn" data-a="frmgo:ckb:b">出版食譜書<small>需廚藝 50・今年練習次數 1</small></button>`;
 const a=appInit();
 h+=`<div class="sec op">徒弟（${a.length}／3）</div>`;
 if(a.length){const kn=Object.keys(r.known).map(id=>ckRecipe(id)).filter(Boolean);
  h+=a.map(x=>`<div class="item">${esc(x.n)}・技藝 ${x.sk}・會 ${x.known.length} 道<div class="sub">拜師第 ${calYear()-x.y} 年，約 5 年出師</div></div>`).join('');
  h+=`<div class="frm"><label for="ap_i">徒弟</label><select id="ap_i">${a.map((x,i)=>`<option value="${i}">${esc(x.n)}</option>`).join('')}</select><label for="ap_d">教哪道菜</label><select id="ap_d">${kn.map(d=>`<option value="${d.id}">${esc(d.n)}</option>`).join('')}</select><div class="acts"><button class="btn p" data-a="frmgo:cka:t">傳授</button></div></div>`}
 h+=`<button class="btn" data-a="frmgo:cka:n">收一位徒弟</button>`;
 h+='<div class="sec op">我的餐廳</div>';
 if(!S.rst)h+=`<div class="frm"><label for="rs_t">類型</label><select id="rs_t">${RTIER.map(t=>`<option value="${t[0]}">${t[1]}（約 ${money(Math.round(t[2]*ckF()))}，廚藝 ${(+t[0])*25}+）</option>`).join('')}</select><div class="acts"><button class="btn p" data-a="frmgo:rst:o">開店</button></div></div>`;
 else{const s=S.rst,T=RTIER[s.t],kn=Object.keys(r.known).map(id=>ckRecipe(id)).filter(Boolean);
  h+=`<div class="item"><b>${esc(s.n)}</b>（${T[1]}）・人氣 ${s.rep}・員工 ${s.staff}・去年${s.p>=0?'獲利':'虧損'} ${money(Math.abs(s.p))}<div class="sub">菜單（${s.menu.length}／6）：${s.menu.length?s.menu.map(id=>esc((ckRecipe(id)||{}).n||'')).join('、'):'尚未設定'}・菜單平均水準 ${Math.round(rstQ())}</div></div>`;
  h+=`<div class="frm"><label for="rs_d">菜色</label><select id="rs_d">${kn.map(d=>`<option value="${d.id}">${esc(d.n)}（${ckM(d.id)}%）</option>`).join('')}</select><div class="acts"><button class="btn p" data-a="frmgo:rst:a">加入菜單</button><button class="btn" data-a="frmgo:rst:r">移出菜單</button></div></div>`;
  h+=`<div class="seg" style="margin:6px 0"><button data-a="frmgo:rst:h">請人</button><button data-a="frmgo:rst:f">資遣</button><button data-a="frmgo:rst:n">整修</button><button data-a="frmgo:rst:c">結束營業</button></div>`}
 return h;
}
const _ch111=cookHTML;
cookHTML=function(){const h=_ch111();return h.replace('<button class="btn" data-a="back">← 返回</button>',cook2HTML()+'<button class="btn" data-a="back">← 返回</button>')};
const _hd111=handle;
handle=function(a){
 if(typeof a==='string'&&(a.startsWith('frmgo:rst:')||a.startsWith('frmgo:cka:')||a.startsWith('frmgo:ckb:')||a.startsWith('frmgo:ckd:'))){
  const p=a.split(':'),rf=()=>{view.lsub='cook';render();try{showSheet('life')}catch(e){}},v=i=>{try{return document.getElementById(i).value}catch(e){return ''}};
  let m=null;
  if(p[1]==='rst'){const x=p[2];m=x==='o'?rstOpen(v('rs_t')||'0'):x==='a'?rstMenu(v('rs_d'),1):x==='r'?rstMenu(v('rs_d'),0):x==='h'?rstStaff(1):x==='f'?rstStaff(-1):x==='n'?rstReno():x==='c'?rstClose():null}
  else if(p[1]==='cka')m=p[2]==='n'?appTake():appTeach(v('ap_i'),v('ap_d'));
  else if(p[1]==='ckb')m=bookMake();
  else if(p[1]==='ckd'){ckInit().diet=frmGet('ckd').s||'0';m=G('已設定飲食風格。')}
  if(m){view.msg=m;rf();return}
 }
 return _hd111(a);
};
const _y111=yearly;
yearly=function(){
 const r=_y111.apply(this,arguments);
 try{if(S&&!S.dead){ingYear();if(S.rcp){rstYear();appYear();dietYear()}}}catch(e){}
 return r;
};
/* 節慶料理 */
const CKFEST=[
 ['fest_cny','農曆新年的年夜飯','春節',['TW','CN','SG','KR'],['twn','chn'],'全家等著你掌廚的年夜飯'],
 ['fest_mid','中秋節的家庭聚餐','中秋',['TW','CN','SG'],['twn','chn'],'中秋節要烤肉、吃月餅，大家想吃你做的菜'],
 ['fest_xmas','聖誕節的晚餐','聖誕',['US','GB','DE','CA','AU','FR','IT','ES','MX'],['fra','ita','usa','gbr','deu','esp'],'聖誕節你想為家人準備一桌大餐'],
 ['fest_thx','感恩節的晚餐','感恩節',['US','CA'],['usa'],'感恩節到了，親友都要來你家吃飯'],
 ['fest_jp','日本新年的年菜','新年',['JP'],['jpn'],'新年到了，你想準備一份傳統的年菜'],
 ['fest_dwl','排燈節的家宴','排燈節',['IN'],['ind'],'排燈節家裡要擺滿甜點與料理'],
 ['fest_wed','朋友的婚禮喜宴','喜宴',['ALL'],[],'朋友結婚，拜託你幫忙準備一道招牌菜']
];
CKFEST.forEach(f=>E.push({id:f[0],min:18,max:85,w:3,if:()=>{try{return ckInit().sk>=15&&(f[3].includes('ALL')||f[3].includes(S.cn))}catch(e){return false}},run:()=>{
 const r=ckInit(),pool=Object.keys(r.known).map(id=>ckRecipe(id)).filter(d=>d&&(!f[4].length||f[4].includes(d.cu))),d=pool.length?pick(pool):null;
 return {t:`${f[5]}。${d?`你打算做拿手的「${d.n}」。`:'你還沒有合適的拿手菜。'}`,c:[
  ch('親手掌廚',()=>{const c=Math.round(8000*ckF()*ingIdx());if(S.money<c)return B('食材預算不夠。');S.money-=c;chg('happy',6);(S.kids||[]).forEach(k=>{if(k.age<25)k.rel=Math.min(100,(k.rel||50)+3)});if(S.partner)S.partner.rel=Math.min(100,(S.partner.rel||50)+3);
   if(d&&r.known[d.id]){r.known[d.id].m=Math.min(100,r.known[d.id].m+4);r.sk=Math.min(100,r.sk+1);return G(`大家吃得開心，「${d.n}」成了${f[2]}的主角。`)}return G('你照著網路食譜硬著頭皮做，大家笑著說下次要請你學兩道拿手菜。')}),
  ch('外帶現成的',()=>{S.money-=Math.round(4000*ckF());chg('happy',2);return N('省了力氣，氣氛也不錯。')})]}}}));
/* 師徒與前輩：被教導 */
E.push({id:'ck_senior',min:16,max:40,w:3,if:()=>{try{const r=ckInit();return r.sk>=5&&r.sk<45&&!r.senior}catch(e){return false}},run:()=>{const r=ckInit(),ds=Object.values(DISH).filter(d=>d.lv<=3&&!r.known[d.id]&&(ckHome(d.cu)||Math.random()<.3));const d=pick(ds.length?ds:Object.values(DISH));return {t:`一位在廚房打滾多年的前輩看你有心，願意把一道私房菜「${d.n}」傳給你。`,c:[
 ch('拜託他教',()=>{r.senior=1;r.known[d.id]={m:45,y:calYear()};r.sk=Math.min(100,r.sk+5);chg('happy',5);return G(`你學會了「${d.n}」的訣竅，也記住了那位前輩的叮嚀。`)}),
 ch('客氣謝絕',()=>N('你覺得自己還沒準備好。'))]}}});
E.push({id:'ck_teachkid',min:25,max:60,w:3,if:()=>{try{return ckInit().sk>=30&&S.kids&&S.kids.some(k=>k.age>=8&&k.age<=18)}catch(e){return false}},run:()=>{const k=pick(S.kids.filter(x=>x.age>=8&&x.age<=18)),r=ckInit(),s=ckSigs(1)[0];return {t:`${k.n}站在廚房門口，問你可不可以教他做菜。`,c:[
 ch('一起下廚',()=>{k.rel=Math.min(100,(k.rel||50)+6);k.ck=(k.ck||0)+15;chg('happy',4);return G(`${k.n}笨手笨腳，但笑得很開心${s?`，還想學「${s.rec.n}」`:''}。`)}),
 ch('等你長大再說',()=>{k.rel=Math.max(0,(k.rel||50)-2);return N('他有點失望地走開了。')})]}}});
E.push({id:'ck_tv',min:30,max:70,w:3,if:()=>{try{const r=ckInit();return (r.fame||0)>=25&&r.sk>=60}catch(e){return false}},run:()=>({t:'電視台的美食節目來邀請你上節目示範拿手菜。',c:[
 ch('接受邀請',()=>{const r=ckInit(),inc=Math.round(60000*ckF());S.money+=inc;r.fame=Math.min(100,r.fame+8);chg('happy',5);S.stress=cl(S.stress+3);return G(`節目播出後反應很好，你拿到酬勞 ${money(inc)}，知名度大增。`)}),
 ch('婉拒，專心經營生活',()=>N('你覺得安靜過日子比較自在。'))]})});
E.push({id:'ck_critic',min:25,max:75,w:3,if:()=>!!S.rst,run:()=>{const q=rstQ(),good=Math.random()<q/110;return {t:`一位美食評論家匿名到「${S.rst.n}」用餐，並寫了篇評論。`,c:[
 ch('等著看結果',()=>{if(good){S.rst.rep=Math.min(100,S.rst.rep+10);chg('happy',5);return G('評論稱讚你的菜單有誠意，客人變多了。')}S.rst.rep=Math.max(0,S.rst.rep-6);chg('happy',-3);return B('評論指出菜單不夠穩定，你決定回頭檢討。')})]}}});
E.push({id:'ck_ingspike',min:20,max:80,w:2,if:()=>ingIdx()>=1.15,run:()=>({t:'這陣子市場的食材價格漲了不少，採購單看得人心驚。',c:[
 ch('自己吸收，不調價',()=>{S.stress=cl(S.stress+3);return N('利潤被壓縮，但客人沒有流失。')}),
 ch(S.rst?'菜單調漲一些':'改買當季便宜的食材',()=>{if(S.rst){S.rst.rep=Math.max(0,S.rst.rep-3);S.money+=Math.round(RTIER[S.rst.t][4]*400*ckF())}return N('你調整了做法，撐過這一波。')})]})});
