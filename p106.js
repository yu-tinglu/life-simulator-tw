/* ---- p106：跨國遺產、單一國家股市、危機的各國差異與紓困、法案審議、記得過去的事件（皆為遊戲設定值）---- */
/* 2. 跨國遺產：子女定居在其他國家時，匯款、換匯與申報會多一筆成本 */
const XBR=.04;
const _ec106=estateCalc;
estateCalc=function(dry){
 const r=_ec106.apply(this,arguments);
 try{let tot=0;(r.kids||[]).forEach(x=>{if(x.cn&&x.cn!=='TW'&&x.cn!==r.k&&r.parts[x.id]>0){const c=Math.round(r.parts[x.id]*XBR);r.parts[x.id]-=c;tot+=c}});
  r.xb=tot;if(tot)r.N=Math.max(0,r.N-tot)}catch(e){}
 return r;
};
const _el106=estateLines;
estateLines=function(r){
 let h=_el106.apply(this,arguments);
 try{if(r.xb)h=h.replace('<tr class="b">',`<tr><td>跨國匯款與申報（海外子女）</td><td>-${money(r.xb)}</td></tr><tr class="b">`)}catch(e){}
 return h;
};
/* 3. 單一國家股市 */
const SMK={kr:['南韓股市 ETF（含匯率風險）','KR',.05,.20],gb:['英股 ETF（含匯率風險）','GB',.045,.15],in:['印度股市 ETF（含匯率風險）','IN',.09,.22],au:['澳股 ETF（含匯率風險）','AU',.05,.16],sg:['新加坡股市 ETF（含匯率風險）','SG',.045,.13]};
for(const k in SMK){if(!PFK.includes(k))PFK.push(k);PFN[k]=[SMK[k][0],0,0]}
const _mr106=mktRet;
mktRet=function(y,cr,g,fxu){
 const r=_mr106.apply(this,arguments);
 try{for(const k in SMK){const [,cn,mu,sd]=SMK[k],fx=(S.fx&&S.fxp&&S.fx[cn]&&S.fxp[cn])?S.fx[cn]/S.fxp[cn]-1:0;
  const bs=(r.us||0)*.4+(r.em||0)*.15;
  r[k]=Math.max(-.7,mu+nrm()*sd-cr*.25+fx+bs*.5)}
  if(y>2026&&S.gs){const s=gsV('s');if(s)for(const k in SMK)r[k]+=s*.9}}catch(e){}
 return r;
};
/* 4. 危機的各國差異、紓困與失業給付延長 */
const REC={US:.9,JP:1.25,DE:1.1,SG:.85,KR:1.0,GB:1.1,CA:.95,AU:.9,TW:1,CN:1.1};
const _hv106=hvYear;
hvYear=function(h){
 const v=_hv106.apply(this,arguments);
 try{if(h.cn&&S.gs){const a=gsV('h')*((REC[h.cn]||1)-1);if(a){h.vl=(h.vl||v/fxn(h.cn))*(1+a);return Math.round(v*(1+a))}}}catch(e){}
 return v;
};
const _y106=yearly;
yearly=function(){
 const r=_y106.apply(this,arguments);
 try{const g=S.gs;
  if(g&&g.t===1&&g.k!=='bubble'&&S.gsb!==g.y0){S.gsb=g.y0;const amt=Math.round(.03*wTW(S.cn||'TW'));if(amt>0&&S.age>=18){S.money+=amt;log(`政府推出紓困與振興措施，你領到約 ${money(amt)}。`,'good')}}
  if(g&&g.t===1&&S.job&&!S.job.founder&&Math.random()<GSK[g.k].ly*.4){log('景氣持續低迷，公司再度裁員，你被資遣。','bad');S.job=null;chg('happy',-6)}
 }catch(e){}
 return r;
};
const _cx106=cxOf;
cxOf=function(k){
 const c=_cx106.apply(this,arguments);
 if(S&&S.gs&&k===S.cn&&c.uy>0)return Object.assign({},c,{uy:c.uy+1});
 return c;
};
/* 5. 法案審議：中央層級的施政要過議會 */
const _ea106=elAct;
elAct=function(k){
 const p=polInit(),o=p.office;
 if(!o||o.lv<3)return _ea106.apply(this,arguments);
 const m0=Object.assign({},elMod()),rep0=p.rep,pass=Math.max(.3,Math.min(.9,.35+polRep()/200+(o.coal?-.08:0)+(o.lv===5?.05:0)));
 const r=_ea106.apply(this,arguments);
 try{if(Math.random()>pass&&p.acted===calYear()){const m=elMod();m.w=m0.w;m.h=m0.h;p.rep=Math.max(0,rep0-2);return B(`法案在議會審議時被擋下（通過機率約 ${Math.round(pass*100)}%），沒有生效。`)}}catch(e){}
 return r;
};
/* 6. 記得過去的事件 */
E.push({id:'mem_coalumni',min:30,max:70,w:3,if:()=>(S.coHist||0)>=1&&!S.co,run:()=>({t:'以前創業時的夥伴來找你，說有個新點子，想請你再一起拚一次。',c:[
 ch('出資 100 萬，當天使投資人',()=>{const l=Math.min(1e6,Math.max(0,S.money));S.money-=l;if(Math.random()<.3){const g=l*3;S.money+=g;return G(`那個點子後來小有成績，你拿回 ${money(g)}。`)}return N('那個點子沒有成功，但你不後悔。')}),
 ch('祝福他們，自己不參與',()=>{chg('happy',1);return N('你送上祝福，繼續自己的生活。')})]})});
E.push({id:'mem_record',min:25,max:65,w:3,if:()=>S.record>0&&!S.jail,run:()=>({t:'應徵新工作時，對方查到你過去的紀錄，面試官有些猶豫。',c:[
 ch('坦白說明並分享改變',()=>{if(Math.random()<.55){chg('happy',3);return G('面試官被你的誠意說服，給了你機會。')}chg('happy',-3);return B('對方還是婉拒了，你決定再接再厲。')}),
 ch('轉向不看紀錄的工作',()=>{chg('happy',-1);return N('你換了方向，雖然薪水少一點。')})]})});
E.push({id:'mem_polvet',min:30,max:90,w:3,if:()=>S.pol&&S.pol.hist&&S.pol.hist.some(h=>h.won),run:()=>({t:'你在街上被老選民認出來，對方握著你的手說起當年的政見。',c:[
 ch('停下來聊聊',()=>{S.pol.rep=Math.min(100,S.pol.rep+2);chg('happy',4);return G('聊完你覺得那些年的辛苦都值得。')}),
 ch('微笑點頭，繼續趕路',()=>N('你笑著揮揮手，趕著去下一件事。'))]})});
