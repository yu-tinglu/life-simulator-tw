/* ---- p105：全球危機、聯合政府夥伴、政策路線、海外購屋動態、無障礙、新手清單（皆為遊戲設定值）---- */
/* 1. 全球危機：同時影響各國股市、房市、利率與就業 */
const GSK={
 crisis:{n:'全球金融危機',s:[-.30,.08,.16],b:[.03,.02,0],h:[-.07,-.03,.01],ly:.08,ir:0},
 pandemic:{n:'全球疫情',s:[-.20,.12,.10],b:[.02,0,0],h:[-.02,.02,.02],ly:.06,ir:0},
 hike:{n:'全球升息潮',s:[-.12,-.05,.08],b:[-.08,-.02,.03],h:[-.06,-.05,-.01],ly:.03,ir:.012},
 bubble:{n:'科技泡沫破裂',s:[-.25,-.12,.10],b:[.02,.01,0],h:[-.02,-.02,0],ly:.04,ir:0}
};
function gsStep(y){
 if(y<=2026)return;
 if(S.gsy===y)return;S.gsy=y;
 if(S.gs){S.gs.t++;if(S.gs.t>2){S.gs=null;S.irShock=0}}
 if(!S.gs&&Math.random()<.035){const k=pick(Object.keys(GSK));S.gs={k,t:0,y0:y};S.irShock=GSK[k].ir;try{log(`${y} 年：${GSK[k].n}來襲，各國股市、房市與就業都受到衝擊。`,'bad')}catch(e){}
  if(S.job&&!S.job.founder&&Math.random()<GSK[k].ly){log('公司因景氣裁員，你失去了工作。','bad');S.job=null;chg('happy',-8)}}
 if(S.gs&&S.gs.t===1&&S.job==null&&false){}
 if(!S.fpol)S.fpol={};
 if(Math.random()<.05){const ks=Object.keys(FREG);const k=pick(ks);if(!S.fpol[k]){S.fpol[k]={fee:.08,until:y+6};try{log(`${CNS[k]?CNS[k].n:k}對外國人加徵購屋稅 8%，為期 6 年。`,'')}catch(e){}}}
 for(const k in S.fpol)if(S.fpol[k].until<=y)delete S.fpol[k];
}
function gsV(a){const g=S&&S.gs;if(!g||g.t>2)return 0;const c=GSK[g.k];return c?c[a][g.t]:0}
const _mr105=mktRet;
mktRet=function(y,cr,g,fxu){
 const r=_mr105.apply(this,arguments);
 try{if(y>2026){gsStep(y);const s=gsV('s'),b=gsV('b');if(s||b)for(const k of ['tw','us','jp','eu','em','reit'])if(r[k]!=null)r[k]+=s*(k==='reit'?.7:k==='em'?1.15:1);if(b&&r.bond!=null)r.bond+=b}}catch(e){}
 return r;
};
const _hm105=hmYear;
hmYear=function(){
 try{gsStep(calYear());const a=gsV('h');if(a){const sh=S.hshock||{};S.hshock=Object.assign({},sh,{all:(sh.all||0)+a})}}catch(e){}
 return _hm105.apply(this,arguments);
};
const _hv105=hvYear;
hvYear=function(h){
 const v=_hv105.apply(this,arguments);
 try{if(h.cn){const a=gsV('h');if(a){h.vl=(h.vl||v/fxn(h.cn))*(1+a);return Math.round(v*(1+a))}}}catch(e){}
 return v;
};
/* 4. 海外購屋動態：房貸利率跟著利率走、對外國人加稅、加拿大禁令到期 */
const _fc105=fCosts;
fCosts=function(k){
 const c=_fc105.apply(this,arguments);
 try{const p=S.fpol&&S.fpol[k];if(p)c.fee+=p.fee;c.rate=Math.max(.01,c.rate+((S.ir==null?.02:S.ir)-.02)*.8+(S.irShock||0))}catch(e){}
 return c;
};
const _fa105=fAllowed;
fAllowed=function(k){if(k==='CA'&&calYear()>2027)return true;return _fa105.apply(this,arguments)};
/* 2.3. 政策路線與聯合政府夥伴 */
const LEAN=[['0','中間路線'],['1','偏右（減稅、精簡福利）'],['-1','偏左（加稅、擴大福利）']];
function leanOf(){try{const o=S.pol&&S.pol.office;return o&&o.lv>=4&&o.lean?+o.lean:0}catch(e){return 0}}
const _eh105=elHTML;
elHTML=function(){
 let h=_eh105();
 return h.replace('<label for="pol_b">',`<label for="pol_l">政策路線（當選後影響稅負與福利）</label><select id="pol_l">${LEAN.map(x=>`<option value="${x[0]}">${x[1]}</option>`).join('')}</select><label for="pol_b">`);
};
const _hd105=handle;
handle=function(a){
 if(a==='pol:go'){try{view.polLean=document.getElementById('pol_l').value}catch(e){view.polLean='0'}}
 return _hd105(a);
};
const PARTNERS=[['穩健夥伴（較保守）',.85,.06],['理念相近的小黨',.7,.10],['多黨大聯盟',.6,.14]];
polRun=(function(prev){return function(lv,bud,party){
 const r=prev.apply(this,arguments);
 try{const p=polInit(),o=p.office;
  if(o&&o.y0===calYear()&&o.lv===lv){o.lean=view.polLean||'0';
   if(lv===5&&PARL.includes(S.cn)&&o.coal){const cf=o.coal;o.coal=0;
    ask('國會沒有單一政黨過半，要與誰組成聯合政府？',PARTNERS.map(x=>x[0]),i=>{const q=PARTNERS[i]||PARTNERS[0];o.coal=1;o.cq=q[1];o.cr=q[2];log(`你與${q[0]}組成聯合政府（施政效果 ${Math.round(q[1]*100)}%，每年破局風險 ${Math.round(q[2]*100)}%）。`,'')})}}
 }catch(e){}
 return r;
}})(polRun);
/* 聯合政府效果與風險依夥伴調整（覆蓋 p104 的固定值）*/
elAct=(function(prev){return function(k){
 const p=polInit(),o=p.office,m0=Object.assign({},elMod()),r=prev.apply(this,arguments);
 try{if(o&&o.coal&&o.cq&&o.cq!==.7){const m=elMod(),f=o.cq/.7;m.w=m0.w+(m.w-m0.w)*f;m.h=m0.h+(m.h-m0.h)*f}}catch(e){}
 return r;
}})(elAct);
const _y105=yearly;
yearly=function(){
 const r=_y105.apply(this,arguments);
 try{const l=leanOf();
  if(l&&S.job&&S.job.sal&&S.cn){S.money+=Math.round(S.job.sal*.012*l)}
  const p=S.pol;if(p&&p.office&&p.office.coal&&p.office.cr&&Math.random()<p.office.cr){log('聯合政府破局，你的內閣提前下台。','bad');chg('happy',-8);p.office=null;elReset()}
 }catch(e){}
 return r;
};
const _cx105=cxOf;
cxOf=function(k){
 const c=_cx105.apply(this,arguments),l=leanOf();
 if(!l||k!==S.cn)return c;
 const f=1-.15*l;return Object.assign({},c,{ue:c.ue*f,cb:c.cb*f,pn:c.pn*f});
};
/* 8. 新手清單（放在玩法導覽最上面）*/
function starterList(){
 const L=[['按「年齡 +1」讓時間前進',S.age>=1],['看一次年度事件並做出選擇',S.age>=2],['上學讀書（出生後的前幾年自動進行）',S.age>=7],['18 歲後找一份工作',!!S.job],['在「資產」頁存錢或買第一項投資',(S.money||0)>0&&S.age>=20],['試試「活動」頁的任一項活動',S.age>=15]];
 return '<div class="sec op">新手清單</div>'+L.map(x=>`<div class="sub" style="margin:4px 0">${x[1]?'已完成':'未完成'}・${esc(x[0])}</div>`).join('');
}
const _lh105=lifeHTML;
lifeHTML=function(){const h=_lh105();if(view.lsub==='guide')return h.replace('<div class="item">',starterList()+'<div class="item">');return h};
