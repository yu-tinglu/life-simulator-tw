// 優化：孫子女遺產、歸化、海外投資稅、選舉深化、活動下拉、玩法導覽
/* 1. 遺產留給孫子女 */
const _ec94=estateCalc;
estateCalc=function(dry){
 const r=_ec94(dry);
 try{
  const pc=(S.gpct||0)/100;if(!pc)return r;
  let tot=0;const gl=[];
  for(const k of S.kids){const n=k.rm&&k.rm.gk?k.rm.gk.length:0;if(!n||!r.parts[k.id])continue;const a=Math.round(r.parts[k.id]*pc);r.parts[k.id]-=a;tot+=a;k.rm.gk.forEach(g=>gl.push({g,a:Math.round(a/n)}))}
  if(tot){r.gk=gl;r.gkTot=tot;if(!dry)gl.forEach(x=>{x.g.m=(x.g.m||0)+x.a})}
 }catch(e){}
 return r;
};
const _el94=estateLines;
estateLines=function(r){let h=_el94(r);if(r&&r.gkTot)h+=`<div class="item">遺贈孫子女：${money(r.gkTot)}（已從子女應得份額中扣除；隔代繼承加徵等細節未模擬）</div>`;return h};
const _lg94=legacyHTML;
legacyHTML=function(){
 const h=_lg94();if(!S.kids.some(k=>k.rm&&k.rm.gk&&k.rm.gk.length))return h;
 return h+`<div class="sec">孫子女的遺贈</div>`+frmHTML('gw',{sl:`從每位子女的遺產份額中，撥給其子女的比例（現為 ${S.gpct||0}%）`,opts:[['0','不撥（0%）'],['10','10%'],['20','20%'],['30','30%']],amt:false,btns:[['go','設定','p']]});
};
/* 歸化 + 選舉深化 + 海外投資稅 + 活動下拉 + 導覽，處理 */
const _hd94=handle;
handle=function(a){
 if(typeof a==='string'&&S){
  const rf=()=>{render();try{showSheet(view.tab,view.sub)}catch(e){}};
  if(a==='frmgo:gw:go'){const g=frmGet('gw');S.gpct=+g.s||0;view.msg=G(S.gpct?`已設定：每位子女份額的 ${S.gpct}% 撥給其子女。`:'已取消撥給孫子女。');rf();return}
  if(a==='frmgo:ac:go'){const g=frmGet('ac');if(g.s){return _hd94('act:'+g.s)}return}
  if(a==='pol:nat'){
   const need=natNeed();if(need)view.msg=B(need);
   else{if(S.money<15e4)view.msg=B('申請歸化需要約 NT$150,000 規費與文件費。');else{S.money-=15e4;S.ab.nat=1;log(`你取得了${CNS[S.cn].n}國籍。`,'good');chg('happy',8);view.msg=G('歸化成功！現在可以參選了。')}}
   view.polOn=1;render();try{showSheet('act')}catch(e){}return;
  }
  if(a==='pol:go'){try{view.polX={i:document.getElementById('pol_i').value,h:document.getElementById('pol_h').value}}catch(e){view.polX=null}}
 }
 return _hd94(a);
};
function natNeed(){
 if(!S.ab)return '你本來就是這個國家的公民。';
 if(S.ab.nat)return '已經取得國籍。';
 if(S.ab.visa!=='pr')return '需先取得永久居留。';
 const need=Math.max(5,(CNS[S.cn]&&CNS[S.cn].pr)||5);
 if((S.ab.yrs||0)<need)return `需居留滿 ${need} 年（目前 ${S.ab.yrs||0} 年）。`;
 return '';
}
const HOT=['經濟與就業','社會福利','治安與交通','教育與育兒','環境與能源','住宅與物價'];
function polAdj(lv){
 const p=polInit(),y=calYear();let adj=0;const x=view.polX;
 if(!p.hot||p.hot.y!==y)p.hot={y,i:Math.floor(Math.random()*HOT.length)};
 if(x){
  if(+x.i===p.hot.i){adj+=5;}
  const c=PL(lv);
  if(x.h==='2'&&S.money>=c.cost*.3){S.money-=Math.round(c.cost*.3);adj+=5}
  else if(x.h==='1'&&S.money>=c.cost*.1){S.money-=Math.round(c.cost*.1);adj+=2}
 }
 if(lv>=3){const d=Math.round(((S.smarts||50)-50)/10+R(-3,3));adj+=d;log(`選前辯論會：你的表現${d>=2?'亮眼':d<=-2?'失常':'普通'}。`,d>=2?'good':d<=-2?'bad':'');}
 return adj;
}
const _eh94=elHTML;
elHTML=function(){
 let h=_eh94();const p=polInit(),y=calYear();
 if(!p.hot||p.hot.y!==y)p.hot={y,i:Math.floor(Math.random()*HOT.length)};
 if(S.ab&&!S.ab.nat){
  const n=natNeed();h=h.replace('<button class="btn" data-a="pol:x">','<div class="sec">歸化</div><div class="sub">取得永久居留並居住滿年限後，可以申請歸化，費用約 NT$150,000。'+(n?'目前：'+esc(n):'你已符合條件。')+'</div><button class="btn" data-a="pol:nat" '+(n?'disabled':'')+'>申請歸化</button><button class="btn" data-a="pol:x">');
 }
 const add=`<div class="sub">今年選民最關心：<b>${HOT[p.hot.i]}</b>（政見對上議題加分；高層級選舉會有辯論）</div><label for="pol_i">主打政見</label><select id="pol_i">${HOT.map((t,i)=>`<option value="${i}">${t}</option>`).join('')}</select><label for="pol_h">助選團隊</label><select id="pol_h"><option value="0">不聘請（志工）</option><option value="1">一般助選員（經費約 10%）</option><option value="2">專業競選團隊（經費約 30%）</option></select>`;
 return h.replace('<button class="btn p" data-a="pol:go">',add+'<button class="btn p" data-a="pol:go">');
};
E.push({id:'el_disaster',min:23,max:100,w:6,if:()=>S.pol&&S.pol.office,run:()=>{const p=S.pol;return {t:`轄區發生${pick(['颱風','地震','豪雨淹水'])}，災情嚴重，各界看著你怎麼處理。`,c:[
 ch('親赴現場指揮救災',()=>{p.rep=Math.min(100,p.rep+6);S.stress=cl(S.stress+6);return G('救災有效率，民眾肯定你。')}),
 ch('派員處理，自己在辦公室協調',()=>{p.rep=Math.min(100,p.rep+1);return N('處理得中規中矩。')}),
 ch('照原訂行程出國考察',()=>{p.rep=Math.max(0,p.rep-9);chg('happy',-4);return B('被媒體痛批失職。')})]}}});
E.push({id:'el_scandal',min:23,max:100,w:5,if:()=>S.pol&&S.pol.office,run:()=>{const p=S.pol;return {t:'你的親信被爆出涉及弊案，媒體每天追問。',c:[
 ch('立刻切割並配合調查',()=>{p.rep=Math.max(0,p.rep-2);S.stress=cl(S.stress+4);return N('風波很快平息，聲望只小幅受損。')}),
 ch('公開護航',()=>{if(Math.random()<.5){p.rep=Math.max(0,p.rep-12);return B('事證浮現，你被指包庇，聲望大跌。')}return N('風波暫時過去，但你捏了把冷汗。')})]}}});
E.push({id:'el_crisis',min:23,max:100,w:5,if:()=>S.pol&&S.pol.office&&S.pol.office.lv>=3,run:()=>{const p=S.pol,m=elMod();return {t:'國際局勢與景氣轉差，企業與勞工都要求政府出手。',c:[
 ch('擴大紓困與補貼',()=>{m.w=Math.max(-.02,Math.min(.02,m.w+.003));p.rep=Math.min(100,p.rep+3);return G('景氣穩住了，但預算吃緊。')}),
 ch('維持預算，靠市場調整',()=>{p.rep=Math.max(0,p.rep-3);return N('受到批評冷漠，但財政穩健。')})]}}});
E.push({id:'el_price',min:23,max:100,w:4,if:()=>S.pol&&S.pol.office&&S.pol.office.lv>=2,run:()=>{const p=S.pol;return {t:'民生物價上漲，民眾要求政府出面。',c:[
 ch('凍漲公共服務費用',()=>{p.rep=Math.min(100,p.rep+4);return G('民眾叫好，但政府財政壓力增加。')}),
 ch('呼籲業者自律',()=>{p.rep=Math.max(0,p.rep-1);return N('效果有限。')})]}}});
/* 3. 海外居住時的投資所得稅（簡化） */
const _y94=yearly;
yearly=function(){
 _y94.apply(this,arguments);
 try{
  if(S&&!S.dead&&S.cn&&S.cn!=='TW'&&typeof pfSum==='function'){
   const base=pfSum(),rate=((CNS[S.cn]&&CNS[S.cn].tax)||.2)*.7;
   if(base>0){const t=Math.round(base*.025*rate);if(t>=1000){S.money-=t;log(`${CNS[S.cn].n}的投資股息所得稅 ${money(t)}（以投資組合約 2.5% 股息率估算）。`,'')}}
  }
 }catch(e){}
};
/* 5. 活動改下拉 */
const _ac94=actHTML;
actHTML=function(){
 const h=_ac94();if(view.polOn)return h;
 const re=/<button class="btn" data-a="act:([^"]+)"\s*(disabled)?\s*>([\s\S]*?)<small>([\s\S]*?)<\/small><\/button>/g,all=[];let m;
 while((m=re.exec(h)))all.push({id:m[1],dis:!!m[2],l:m[3],s:m[4]});
 if(all.length<6)return h;
 const ok=all.filter(x=>!x.dis),no=all.filter(x=>x.dis);
 const first=h.search(/<button class="btn" data-a="act:/);
 let dn=false,out=h.replace(re,()=>{if(dn)return '';dn=true;return '@@AC@@'});
 const strip=t=>String(t).replace(/<[^>]*>/g,'');
 const blk=(ok.length?frmHTML('ac',{sl:'選擇活動',opts:ok.map(x=>[x.id,strip(x.l)+'・'+strip(x.s)]),amt:false,btns:[['go','執行','p']]}):'<div class="sub">目前沒有可做的活動。</div>')+(no.length?`<div class="sub">今年已做或條件不足：${no.map(x=>esc(strip(x.l))).join('、')}</div>`:'');
 return out.replace('@@AC@@',blk);
};
/* 7. 玩法導覽 */
const GUIDE=['按「下一年」讓時間前進；每年會出現事件，選擇會影響人生。','「資產」頁：存款、投資、房產、大型投資與事業，所有金額都能直接輸入。','「活動」頁：每年可做的活動、政治與選舉；用下拉選單選擇後按執行。','「家庭」頁：伴侶、孩子與孫子女；可贈與、資助、規劃遺囑與信託。','「今年建議」會依你的狀況提示該做什麼，不必全部照做。','設定裡可以下載存檔、換手機時匯入，也能看版權、資料來源與法規。','這是模擬遊戲：數字是簡化模型，不構成任何專業建議。'];
const _lh94=lifeHTML;
lifeHTML=function(){if(view.lsub==='guide')return `<h3>玩法導覽</h3><div class="item">${GUIDE.map(x=>`<div class="sub" style="margin:6px 0">${esc(x)}</div>`).join('')}</div><button class="btn" data-a="lf:set:legalx">← 返回設定</button>`;return _lh94()};
const _sh94=setHTML;
setHTML=function(){return _sh94()+`<button class="btn" data-a="lf:set:guide">玩法導覽</button>`};
const _lf94=lfHandle;
lfHandle=function(x,y,z,u){if(x==='set'&&y==='guide'){view.lsub='guide';return null}return _lf94(x,y,z,u)};
const _ng94=newGame;
newGame=function(){const r=_ng94.apply(this,arguments);try{if(!localStorage.getItem('lifesim_tour')){localStorage.setItem('lifesim_tour','1');log('提示：設定裡有「玩法導覽」，簡單說明各頁面怎麼用。','')}}catch(e){}return r};
