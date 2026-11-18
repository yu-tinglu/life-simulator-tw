// 民調、專案事件、專案接班、頁面提示、成就
function polEst(lv){
 try{const c=PL(lv),p=polInit(),inc=p.office&&p.office.lv===lv?8:0;const est=36+polRep()*.35+((S.smarts||50)-50)*.1+6+7+inc;return Math.max(1,Math.min(99,Math.round(100/(1+Math.exp(-(est-c.diff)/6)))))}catch(e){return 0}
}
/* 專案事件 */
const pjHeld=()=>PJK.filter(k=>S.pj&&S.pj[k]&&S.pj[k].val>=5e7&&['space','ev','ai','fus','media','vc'].includes(k));
E.push({id:'pj_ipo',min:25,max:100,w:4,if:()=>pjHeld().length>0,run:()=>{const k=pick(pjHeld()),p=S.pj[k],c=PJ[k];return {t:`${c.n}的經營團隊提議公開上市，市場評價看起來不錯。`,c:[
 ch('支持上市',()=>{if(Math.random()<.75){const g=Math.round(p.val*.3);p.val+=g;log(`${c.n}上市，估值增加 ${money(g)}。`,'good');return G('上市順利，帳面價值上升。')}const l=Math.round(p.val*.15);p.val-=l;return B(`上市後股價走弱，估值減少 ${money(l)}。`)}),
 ch('反對，維持私有',()=>N('團隊雖然失望，但尊重你的決定。'))]}}});
E.push({id:'pj_ma',min:25,max:100,w:3,if:()=>pjHeld().length>0,run:()=>{const k=pick(pjHeld()),p=S.pj[k],c=PJ[k];return {t:`有大型企業想併購${c.n}，開價約為目前估值的 1.4 倍（現金）。`,c:[
 ch('接受併購，全數套現',()=>{const v=Math.round(p.val*1.4);S.money+=v;log(`${c.n}被併購，你拿到 ${money(v)}。`,'good');delete S.pj[k];if(S.pjHeir)delete S.pjHeir[k];return G(`拿到 ${money(v)} 現金。`)}),
 ch('拒絕，繼續持有',()=>{chg('happy',1);return N('你相信它還有成長空間。')})]}}});
E.push({id:'pj_board',min:25,max:100,w:3,if:()=>pjHeld().length>0,run:()=>{const k=pick(pjHeld()),p=S.pj[k],c=PJ[k];return {t:`${c.n}的董事會想增資，你若不跟進，持股會被稀釋。`,c:[
 ch('跟進增資（約估值的 10%）',()=>{const a=Math.round(p.val*.1);if(S.money<a)return B('你的現金不夠。');S.money-=a;p.val+=a;p.inv+=a;return G(`你投入 ${money(a)}，保住持股比例。`)}),
 ch('不跟進，接受稀釋',()=>{const l=Math.round(p.val*.08);p.val-=l;return N(`持股被稀釋，估值減少 ${money(l)}。`)})]}}});
/* 專案接班 */
const _ph95=pjHTML;
pjHTML=function(){
 let h=_ph95();const held=PJK.filter(k=>S.pj&&S.pj[k]&&S.pj[k].val>0);
 if(!held.length||!S.kids.length)return h;
 const hr=S.pjHeir||{},opts=[['none','取消指定']];
 held.forEach(k=>S.kids.forEach(x=>opts.push([k+'|'+x.id,`${PJ[k].n} → ${x.n}`])));
 const cur=held.filter(k=>hr[k]).map(k=>{const x=S.kids.find(q=>String(q.id)===String(hr[k]));return x?`${PJ[k].n}：${x.n}`:''}).filter(Boolean).join('、');
 const blk=`<div class="sec op">專案接班人</div><div class="sub">指定後，你去世時該專案以 9 折價值轉給家族（未指定為 7 折變現）。${cur?'目前：'+esc(cur):''}</div>`+frmHTML('ph',{sl:'指定專案與接班人',opts,amt:false,btns:[['go','設定','p']]});
 return h.replace(/(<button class="btn" data-a="pj:x">)/,blk+'$1');
};
const _hd95=handle;
handle=function(a){
 if(a==='frmgo:ph:go'&&S){
  const g=frmGet('ph');S.pjHeir=S.pjHeir||{};
  if(g.s==='none')S.pjHeir={};else{const [k,id]=String(g.s).split('|');S.pjHeir[k]=id}
  view.msg=G('已更新專案接班設定。');render();try{showSheet('ast')}catch(e){}return;
 }
 return _hd95(a);
};
/* 頁面第一次進入的小提示 */
const TIPS={act:'活動頁：用下拉選擇活動後按「執行」；「政治與選舉」在下方。',ast:'資產頁：存款、投資、房產與「大型投資與事業」都在這裡，金額可直接輸入。',rel:'家庭頁：點孩子可贈與、規劃教育；孫子女也能贈與。',job:'職業頁：找工作、創業；創業後可選擇資金與股權玩法。',life:'人生頁：設定裡有玩法導覽、存檔下載與版權資料。',cn:'移民頁：可在不同國家居住、買房、換匯。'};
const _ss95=showSheet;
showSheet=function(tab,sub){
 const r=_ss95(tab,sub);
 try{
  const seen=JSON.parse(localStorage.getItem('lifesim_tips')||'{}');
  if(TIPS[tab]&&!seen[tab]&&!sub&&!view.lsub){
   const b=document.getElementById('sheetBody');
   if(b&&b.insertAdjacentHTML){const h3=b.querySelector&&b.querySelector('h3');(h3||b).insertAdjacentHTML(h3?'afterend':'afterbegin',`<div class="item" id="tip95" style="display:flex;gap:8px;align-items:center"><div class="sub" style="flex:1">${TIPS[tab]}</div><button class="mini" id="tipx95">知道了</button></div>`);
    const x=document.getElementById('tipx95');if(x)x.onclick=()=>{try{seen[tab]=1;localStorage.setItem('lifesim_tips',JSON.stringify(seen))}catch(e){}const t=document.getElementById('tip95');if(t)t.remove()}}
  }
 }catch(e){}
 return r;
};
/* 成就 */
ACH.push(
 ['el_win','當選公職',()=>!!(S.pol&&S.pol.hist.some(h=>h.won))],
 ['el_mayor','當選縣市長或更高職位',()=>!!(S.pol&&S.pol.hist.some(h=>h.won&&h.lv>=4))],
 ['el_pres','當選最高首長（總統／總理）',()=>!!(S.pol&&S.pol.hist.some(h=>h.won&&h.lv>=5))],
 ['el_nat','歸化取得外國國籍',()=>!!(S.ab&&S.ab.nat)],
 ['pj_1','投入第一個大型專案',()=>!!(S.pj&&Object.keys(S.pj).length)],
 ['pj_big','專案合計價值超過 10 億',()=>pjTotal()>=1e9],
 ['pj_fnd','成立慈善基金會',()=>!!(S.pj&&S.pj.fnd)],
 ['gk_1','抱孫',()=>S.kids.some(k=>k.rm&&k.rm.gk&&k.rm.gk.length>0)],
 ['gk_3','三代同堂：孫子女達 3 位',()=>S.kids.reduce((a,k)=>a+(k.rm&&k.rm.gk?k.rm.gk.length:0),0)>=3]
);
