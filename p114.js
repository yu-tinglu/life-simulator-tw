/* ---- p114：餐廳深化（選址、競爭、分店、傳承）、競技生涯（運動與棋藝）、公司與房產事件鏈（遊戲設定）---- */
/* 1. 餐廳深化 */
const RLOC=[['0','夜市',1.1,.85,.9],['1','商圈',1,1,1],['2','鄉下',.75,.5,.92],['3','觀光區',1.15,1.4,1.1]];
function rstLoc(){const s=S.rst;return RLOC[(s&&s.loc!=null?s.loc:1)]||RLOC[1]}
const _ry114=rstYear;
rstYear=function(){
 const s=S.rst;if(!s){return _ry114.apply(this,arguments)}
 s.comp=s.comp||0;s.br=s.br||0;
 _ry114.apply(this,arguments);
 try{
  if(s.br>0){const bp=Math.round(s.p*.5*s.br);S.money+=bp;s.p+=bp;s.rep=Math.max(0,s.rep-(s.staff>=s.br+1?0:s.br));S.stress=cl(S.stress+2*s.br);try{log(`${s.br} 間分店合計${bp>=0?'多賺':'多虧'} ${money(Math.abs(bp))}。`,bp>=0?'good':'bad')}catch(e){}}
  if(Math.random()<.18&&s.comp<3){s.comp++;log('附近開了一家新餐廳，開始分走一些客人。','')}
  else if(s.comp>0&&Math.random()<.2){s.comp--;log('附近一家競爭對手收攤了。','')}
 }catch(e){}
};
function rstMove(l){
 const s=S.rst;if(!s)return B('你還沒有店。');const L=RLOC[+l];if(!L)return B('請選位置。');if((s.loc==null?1:s.loc)===+l)return B('已經在這個位置了。');
 const c=Math.round(s.inv*.15);if(S.money<c)return B(`搬遷約需 ${money(c)}。`);
 S.money-=c;s.inv+=c;s.loc=+l;s.rep=Math.max(0,s.rep-12);return G(`你把店搬到${L[1]}，花費 ${money(c)}，人氣掉了一些，要重新累積。`);
}
function rstBranch(){
 const s=S.rst;if(!s)return B('你還沒有店。');if((s.br||0)>=3)return B('最多 3 間分店。');
 if(s.rep<55)return B('人氣要 55 以上才有條件開分店。');if(s.p<=0)return B('去年沒有獲利，先把本店經營好。');
 const c=Math.round(RTIER[s.t][2]*.6*ckF());if(S.money<c)return B(`開分店約需 ${money(c)}。`);
 S.money-=c;s.inv+=c;s.br=(s.br||0)+1;return G(`第 ${s.br} 間分店開張，花費 ${money(c)}。`);
}
const _rc114=cookHTML;
cookHTML=function(){
 let h=_rc114();
 if(S.rst){const s=S.rst,L=rstLoc();
  const blk=`<div class="item"><b>經營狀況</b><div class="sub">位置：${L[1]}・競爭對手 ${s.comp||0} 家・分店 ${s.br||0} 間</div></div><div class="frm"><label for="rs_l">搬遷到</label><select id="rs_l">${RLOC.map(x=>`<option value="${x[0]}" ${+x[0]===(s.loc==null?1:s.loc)?'selected':''}>${x[1]}</option>`).join('')}</select><div class="acts"><button class="btn" data-a="frmgo:rsx:m">搬遷</button><button class="btn" data-a="frmgo:rsx:b">開分店</button></div></div>`;
  h=h.replace('<button class="btn" data-a="back">← 返回</button>',blk+'<button class="btn" data-a="back">← 返回</button>');
 }
 return h;
};
const _hd114=handle;
handle=function(a){
 if(typeof a==='string'&&a.startsWith('frmgo:rsx:')){
  const x=a.split(':')[2],v=i=>{try{return document.getElementById(i).value}catch(e){return ''}};
  view.msg=x==='m'?rstMove(v('rs_l')):rstBranch();view.lsub='cook';render();try{showSheet('life')}catch(e){}return;
 }
 return _hd114(a);
};
E.push({id:'rst_comp',min:22,max:75,w:3,if:()=>S.rst&&(S.rst.comp||0)>=1,run:()=>({t:'隔壁新開的餐廳打出開幕特價，你店裡的客人明顯變少了。',c:[
 ch('推出限定新菜，不打價格戰',()=>{S.rst.rep=Math.min(100,S.rst.rep+4);S.stress=cl(S.stress+3);return N('熟客記得你的味道，慢慢回來了。')}),
 ch('跟著降價',()=>{S.money-=Math.round(RTIER[S.rst.t][4]*600*ckF());return B('客人是回來了，但利潤薄了一圈。')}),
 ch('先觀察，不理會',()=>{S.rst.rep=Math.max(0,S.rst.rep-3);return N('你決定靜觀其變。')})]})});
E.push({id:'rst_season',min:22,max:75,w:2,if:()=>S.rst&&S.rst.loc===3,run:()=>({t:'觀光旺季到了，店門口排起了隊，廚房忙得人仰馬翻。',c:[
 ch('加開人手，把握旺季',()=>{const c=Math.round(100000*ckF());S.money-=c;const g=Math.round(RTIER[S.rst.t][4]*1200*ckF());S.money+=g;S.stress=cl(S.stress+4);return G(`旺季的收入多了約 ${money(g-c)}，大家都累壞了。`)}),
 ch('維持原本節奏',()=>{S.stress=cl(S.stress+1);return N('你不想把團隊操壞，照常營業。')})]})});
const _as114=applySuccession;
applySuccession=function(r,k){
 const old=S.rst;_as114.apply(this,arguments);
 try{if(old){S.rst=Object.assign({},old,{fam:1,rep:Math.round(old.rep*.8),staff:Math.min(old.staff,2),br:Math.floor((old.br||0)/2),comp:old.comp||0,p:0});log(`你繼承了家裡的「${old.n}」，老客人還記得上一代的味道。`,'good')}}catch(e){}
};
/* 2. 競技生涯 */
const SPR={mar:['入門','初段','二段','三段','國手','職業'],ball:['校隊','縣市隊','全國賽','國家隊','職業聯賽','職業聯賽'],swim:['校隊','縣市隊','全國賽','國家隊','職業','職業'],chess:['級位','初段','二段','三段','職業初段','職業高段']};
function spKind(id){const a=ARTALL[id];if(!a)return null;if(id==='chess')return 'chess';if(id==='ball')return 'ball';if(id==='swim')return 'swim';return a.c==='mar'?'mar':null}
function spInit(){if(!S.sp)S.sp={};return S.sp}
function spOf(id){const s=spInit();return s[id]||(s[id]={rk:0,pts:0,pro:0,coach:0})}
function spName(id){const k=spKind(id),s=spOf(id);return (SPR[k]||SPR.mar)[Math.min(s.rk,5)]}
function spWin(id){
 const s=spOf(id),need=[2,2,2,3,3,99][Math.min(s.rk,5)];s.pts++;
 if(s.pts>=need&&s.rk<5){s.rk++;s.pts=0;const m=`你在${ARTALL[id].n}晉升為「${spName(id)}」。`;try{log(m,'good')}catch(e){}chg('happy',6);fmAdd(2)}
}
const _wc114=wkContest;
wkContest=function(id){
 const res=_wc114.apply(this,arguments);
 try{if(spKind(id)&&Array.isArray(res)){if(res[1]==='good')spWin(id)}}catch(e){}
 return res;
};
const _wh114=wkHTML;
wkHTML=function(){
 let h=_wh114();
 try{const ks=Object.keys(S.sp||{}).filter(k=>S.art&&S.art[k]>0&&ARTALL[k]);
  if(ks.length){const blk='<div class="sec">競技生涯</div>'+ks.map(k=>`<div class="item"><b>${esc(ARTALL[k].n)}：${esc(spName(k))}</b><div class="sub">累積勝場 ${spOf(k).pts}${spOf(k).pro?'・職業選手':''}${spOf(k).coach?'・開班授課中':''}</div></div>`).join('');
   h=h.replace('<button class="btn" data-a="back">← 返回</button>',blk+'<button class="btn" data-a="back">← 返回</button>')}}catch(e){}
 return h;
};
const spA=()=>Object.keys(S.art||{}).filter(k=>spKind(k)&&S.art[k]>=20);
E.push({id:'sp_pro',min:18,max:34,w:4,if:()=>spA().some(k=>spOf(k).rk>=4&&!spOf(k).pro),run:()=>{const k=spA().find(x=>spOf(x).rk>=4&&!spOf(x).pro);return {t:`你的${ARTALL[k].n}已經打進${spName(k)}的水準，職業隊伸出了橄欖枝。`,c:[
 ch('簽約，成為職業選手',()=>{spOf(k).pro=1;fmAdd(5);chg('happy',8);S.stress=cl(S.stress+5);return G('你簽下了職業合約，生活從此圍著訓練與比賽轉。')}),
 ch('繼續當業餘，兼顧本業',()=>N('你覺得安穩的生活更重要。'))]}}});
E.push({id:'sp_retire',min:36,max:48,w:5,if:()=>spA().some(k=>spOf(k).pro&&!spOf(k).retired),run:()=>{const k=spA().find(x=>spOf(x).pro&&!spOf(x).retired);return {t:`職業${ARTALL[k].n}的體能開始跟不上，你想著該不該退役了。`,c:[
 ch('風光退役，轉任教練',()=>{const s=spOf(k);s.pro=0;s.retired=1;s.coach=1;chg('happy',3);return G('你辦了退役儀式，轉任教練，把經驗傳給年輕人。')}),
 ch('再拚一季',()=>{chg('health',-4);S.stress=cl(S.stress+4);return N('身體發出警訊，但你還想再試一次。')})]}}});
E.push({id:'sp_coach',min:28,max:70,w:3,if:()=>spA().some(k=>spOf(k).rk>=2&&!spOf(k).coach&&!spOf(k).pro),run:()=>{const k=spA().find(x=>spOf(x).rk>=2&&!spOf(x).coach&&!spOf(x).pro);return {t:`社區有人希望你開班教${ARTALL[k].n}，說你的${spName(k)}實力值得傳授。`,c:[
 ch('開班授課',()=>{spOf(k).coach=1;chg('happy',4);return G('第一堂課，教室裡坐滿了期待的眼神。')}),
 ch('目前沒有餘裕',()=>N('你說等時間更充裕再說。'))]}}});
E.push({id:'sp_student',min:30,max:80,w:3,if:()=>spA().some(k=>spOf(k).coach),run:()=>{const k=spA().find(x=>spOf(x).coach);const sx=pick(['男','女']),n=fullName(sx),p=sx==='女'?'她':'他';return {t:`你教過的學生${n}在${ARTALL[k].n}比賽中拿到名次，上台時特別提到你。`,c:[
 ch('到現場為他加油',()=>{fmAdd(2);chg('happy',6);return G(`你在台下紅了眼眶，${p}把獎牌舉向你的方向。`)}),
 ch('傳訊息祝賀',()=>{chg('happy',3);return N('你傳了訊息，對方很快回覆道謝。')})]}}});
const _y114=yearly;
yearly=function(){
 const r=_y114.apply(this,arguments);
 try{if(S&&!S.dead&&S.sp){for(const k in S.sp){const s=S.sp[k];
  if(s.pro&&S.age<=45){S.money+=Math.round(250000*Math.max(1,s.rk-3)*ckF()*(1+fmGet()/100));if(Math.random()<.12){chg('health',-3);try{log(`訓練中受了傷，休養了好一陣子。`,'bad')}catch(e){}}}
  if(s.coach)S.money+=Math.round((S.art&&S.art[k]||30)*1800*ckF())}}}catch(e){}
 return r;
};
const _as114b=applySuccession;
applySuccession=function(r,k){const old=S.sp;_as114b.apply(this,arguments);try{if(old){S.sp={};for(const id in old){S.sp[id]={rk:Math.max(0,old[id].rk-2),pts:0,pro:0,coach:0}}}}catch(e){}};
/* 3. 公司與房產事件鏈 */
const cEvx=(id,min,max,w,cond,run)=>E.push({id,min,max,w,if:()=>{try{return cond()}catch(e){return false}},run});
cEvx('co_partner',26,65,3,()=>S.co&&!S.cofl,()=>{S.cofl=1;const sx=pick(['男','女']),n=fullName(sx);return {t:`創業初期一起打拚的夥伴${n}說，自己有了新的人生規劃，想談談離開的事。`,c:[
 ch('尊重他，好聚好散',()=>{chg('happy',-2);S.karma=Math.min(100,S.karma+3);return N(`你們喝了一杯，說好以後還是朋友。`)}),
 ch('挽留，承諾更多分紅',()=>{S.money-=Math.round(300000*ckF());S.stress=cl(S.stress+2);return N(`${n}答應再留一年，你多付出了一些代價。`)}),
 ch('談得不愉快，不歡而散',()=>{S.karma=Math.max(0,S.karma-4);chg('happy',-5);return B('這段關係結束得不太漂亮。')})]}});
cEvx('co_loyal',30,75,3,()=>S.co&&S.coHist>=0,()=>{const sx=pick(['男','女']),n=fullName(sx),p=sx==='女'?'她':'他';return {t:`在公司待了十幾年的老員工${n}來找你，說家裡需要用錢，想談談薪資。`,c:[
 ch('幫他加薪',()=>{S.money-=Math.round(120000*ckF());chg('happy',3);S.karma=Math.min(100,S.karma+2);return G(`${p}很感動，說會繼續陪公司走下去。`)}),
 ch('說明公司的狀況',()=>N(`${p}理解你的難處，但臉上有些失落。`)),
 ch('請他自己想辦法',()=>{S.karma=Math.max(0,S.karma-3);return B(`${p}沒再多說，不久後遞了辭呈。`)})]}});
cEvx('co_anniv',30,80,2,()=>S.co&&S.coHist>=0&&(S.age>=40),()=>({t:'公司成立滿十週年了，員工想辦個小小的慶祝。',c:[
 ch('辦一場感恩聚餐',()=>{S.money-=Math.round(200000*ckF());chg('happy',6);fmAdd(1);return G('大家吃得開心，回顧這十年，心裡都有些感動。')}),
 ch('發紅包代替',()=>{S.money-=Math.round(80000*ckF());chg('happy',3);return N('大家收下紅包，笑得很開心。')}),
 ch('今年先不辦',()=>N('你說等公司更穩定再說。')) ]}));
cEvx('hs_memory',40,90,3,()=>S.house&&S.age-(S.house.since||0)>=20&&!S.hsmem,()=>{S.hsmem=1;return {t:'你在這間房子住了二十年，牆上的刻痕、窗邊的角落，每一處都有故事。',c:[
 ch('花點錢整修，繼續住下去',()=>{S.money-=Math.round(400000*ckF());chg('happy',5);return G('整修完的家煥然一新，卻保留了原本的味道。')}),
 ch('拍些照片留作紀念',()=>{chg('happy',3);return N('你把照片收進相簿，想著以後會有人翻開來看。')}),
 ch('不去想，日子照過',()=>N('你泡了壺茶，坐在熟悉的位置。'))]}});
cEvx('hs_tenant_old',30,85,3,()=>S.props&&S.props.length&&S.age>=40,()=>({t:'長期租你房子的房客說，這幾年住得很安心，想問能不能續約並維持原本的租金。',c:[
 ch('答應續約，租金不變',()=>{S.karma=Math.min(100,S.karma+3);chg('happy',3);return G('房客很開心，說會把房子照顧得很好。')}),
 ch('調漲一點，但說明原因',()=>{S.money+=Math.round(60000*ckF());return N('房客理解，簽了新約。')})]}));
