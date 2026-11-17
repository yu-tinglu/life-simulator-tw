/* ---- p82：海外房產——任何國家只要開放外國人購屋都能買（規定與稅費為遊戲簡化）---- */
const FREG={
 JP:{fee:.07,ltv:.5,spr:.015,tx:.0145,y:.04,cg:.2},KR:{fee:.05,ltv:.4,spr:.045,tx:.003,y:.03,cg:.22},US:{fee:.03,ltv:.6,spr:.065,tx:.011,y:.05,cg:.2},
 CA:{ban:'加拿大禁止非公民、非永久居民購買住宅（至少到 2027 年）。取得永居或公民身分後可買。',ok:['pr','cit'],fee:.035,ltv:.75,spr:.045,tx:.009,y:.045,cg:.25},
 AU:{newOnly:1,note:'外國人只能買新建案（價格約 +10%），並要多付外國人印花稅與審查費。',fee:.12,ltv:.6,spr:.06,tx:.005,y:.04,cg:.23},
 GB:{fee:.09,ltv:.6,spr:.05,tx:.006,y:.05,cg:.24},DE:{fee:.10,ltv:.6,spr:.04,tx:.0035,y:.035,cg:.25},
 SG:{note:'外國人購買住宅要加徵 60% 額外印花稅（永居 5%、公民首間免）。只能買私人公寓。',condo:1,fee:.64,feePR:.09,feeC:.04,ltv:.55,spr:.035,tx:.004,y:.03,cg:0},
 IN:{ban:'印度規定外國籍人士不得購買住宅。取得公民身分後可買。',ok:['cit'],fee:.07,ltv:.6,spr:.09,tx:.002,y:.03,cg:.125},
 NZ:{ban:'紐西蘭禁止非居民外國人購買現有住宅。取得居留後可買。',ok:['pr','cit'],fee:.03,ltv:.7,spr:.065,tx:.004,y:.04,cg:.15},
 CH:{ban:'瑞士對外國人購屋有嚴格配額與許可。取得永居後可買。',ok:['pr','cit'],fee:.05,ltv:.6,spr:.02,tx:.002,y:.03,cg:.25},
 ID:{ban:'印尼外國人不得持有土地所有權（簡化為不開放）。取得公民身分後可買。',ok:['cit'],fee:.08,ltv:.4,spr:.09,tx:.003,y:.05,cg:.025},
 TH:{condo:1,note:'泰國外國人只能買公寓（外籍持分上限 49%）。',fee:.06,ltv:.4,spr:.06,tx:.002,y:.05,cg:.2},
 PH:{condo:1,note:'菲律賓外國人只能買公寓。',fee:.07,ltv:.4,spr:.08,tx:.01,y:.05,cg:.06},
 VN:{condo:1,note:'越南外國人只能買公寓，使用年限約 50 年。',fee:.05,ltv:.4,spr:.08,tx:.002,y:.05,cg:.02},
 MY:{fee:.06,ltv:.5,spr:.055,tx:.004,y:.04,cg:.3},CN:{note:'土地使用權 70 年。',fee:.05,ltv:.5,spr:.04,tx:.003,y:.025,cg:.2},
 AE:{fee:.05,ltv:.5,spr:.05,tx:0,y:.065,cg:0},MX:{fee:.07,ltv:.5,spr:.09,tx:.003,y:.06,cg:.25}
};
const FDEF={fee:.06,ltv:.5,spr:.06,tx:.006,y:.045,cg:.2};
const FRAT={JP:16,KR:14,US:6,CA:9,AU:10,GB:10,DE:9,SG:16,IN:12,CN:14,CH:11,NZ:9,TH:10,MY:8,PH:12,VN:15,ID:9,AE:6,MX:8};
const fxn=k=>(S.fx&&S.fx[k])||fxr(k);
const fReg=k=>Object.assign({},FDEF,FREG[k]||{});
function fAllowed(k){const r=fReg(k);if(!r.ban)return true;const ab=S.ab;return !!(S.cn===k&&ab&&r.ok.includes(ab.visa))}
function fTypes(k){
 const r=fReg(k),c=CITY[k]||[],r1=FRAT[k]||9,w=wTW(k),nm=CNS[k]?CNS[k].n:k,up=r.newOnly?1.1:1;
 const t=[[0,`${c[0]||nm+'首都圈'}公寓`,w*r1*up,'apt'],[1,`${c[1]||nm+'二線城市'}公寓`,w*r1*.65*up,'apt']];
 if(!r.condo)t.push([2,`${nm}郊區獨棟住宅`,w*r1*.8*up,'house']);
 return t.map(x=>({i:x[0],n:x[1],p:Math.round(x[2]/1e4)*1e4,kind:x[3]}));
}
function fCosts(k){
 const r=fReg(k),ab=S.ab;let fee=r.fee;
 if(k==='SG'){const v=S.cn==='SG'&&ab?ab.visa:'';fee=v==='cit'?r.feeC:v==='pr'?r.feePR:r.fee}
 return {fee,ltv:r.ltv,rate:r.spr,tx:r.tx,y:r.y,r};
}
function buyForeign(k,ti,mode){
 if(!fAllowed(k))return B('目前的身分不能在這個國家購買住宅。');
 const t=fTypes(k).find(x=>x.i===ti);if(!t)return B('找不到這個房型。');
 const c=fCosts(k),pr=t.p,fee=Math.round(pr*c.fee),cash=mode==='c',down=cash?pr:Math.round(pr*(1-c.ltv));
 if(S.money<down+fee)return B(`需要 ${money(down+fee)}（含頭期款與 ${(c.fee*100).toFixed(1)}% 的稅費與手續費）。`);
 S.money-=down+fee;hmEnsure();
 const yrs=20,rate=Math.max(.01,c.rate+(Math.random()-.5)*.006),o={n:t.n,c:'F_'+k,cn:k,value:pr,bp:pr,vl:pr/fxn(k),since:S.age,y:c.y,vac:0,tx:c.tx,self:0};
 if(!cash)o.mort=mkMort(pr-down,yrs,{rate,fixed:yrs});
 S.props.push(o);chg('happy',S.cn===k?8:5);
 const m=`你在${CNS[k].n}買下「${t.n}」，成交價 ${money(pr)}，稅費約 ${money(fee)}${cash?'（全額現金）':`，貸款 ${money(pr-down)}（利率約 ${(rate*100).toFixed(1)}%，${yrs} 年，以新台幣試算）`}。${S.cn===k?'你住在這裡，等於省下租金。':'未住時會出租。'}`;
 log(m,'good');return G(m);
}
const _hv82=hvYear;
hvYear=function(h){
 if(!h.cn)return _hv82(h);
 const g=Math.max(-.08,Math.min(.1,(wageGrow()-1)+nrm()*.025));
 h.vl=(h.vl||h.value/fxn(h.cn))*(1+g);return Math.round(h.vl*fxn(h.cn));
};
const _y82=yearly;
yearly=function(){
 _y82();
 try{(S.props||[]).forEach(p=>{if(p.cn)S.money+=Math.round(p.value*.011)-Math.round(p.value*(p.tx||0))})}catch(e){}
};
const _sn82=sellNew;
sellNew=function(idx){
 const p=idx!=='main'?S.props[+idx]:null;
 if(!p||!p.cn)return _sn82(idx);
 const r=fReg(p.cn),hold=S.age-p.since,fee=Math.round(p.value*.05),gain=Math.max(0,p.value-p.bp-fee);
 let rate=r.cg;if(p.cn==='DE'&&hold>=10)rate=0;const tax=Math.round(gain*rate),net=p.value-fee-tax-(p.mort?p.mort.left:0);
 S.money+=net;S.props.splice(+idx,1);
 const m=`你賣掉了${p.n}，成交價 ${money(p.value)}，仲介與費用 ${money(fee)}、資本利得稅約 ${money(tax)}，還清貸款後淨得 ${money(net)}。`;log(m,net>0?'good':'bad');return N(m);
};
/* 購屋介面：國家＋房型＋付款方式下拉 */
function hbOpts(){
 const cur=S.cn||'TW',seen=new Set(['TW']),L=[['TW','台灣']];
 const add=k=>{if(!CNS[k]||seen.has(k))return;seen.add(k);L.push([k,CNS[k].n+(fAllowed(k)?'':'（目前不能買）')])};
 if(cur!=='TW')add(cur);CNK.forEach(add);WK.slice().sort((a,b)=>(CNS[a]?CNS[a].n:a).localeCompare(CNS[b]?CNS[b].n:b,'zh-Hant')).forEach(add);
 return L;
}
function hbHTML(){
 hmEnsure();const st=frmState('hb'),cs=hbOpts(),k=cs.some(x=>x[0]===st.s)?st.s:(S.cn||'TW');st.s=k;
 const sel=(id,opts,val)=>`<select id="frm_hb_${id}">${opts.map(x=>`<option value="${x[0]}" ${String(x[0])===String(val)?'selected':''}>${x[1]}</option>`).join('')}</select>`;
 let types,pay,info='',dis=false;
 if(k==='TW'){
  types=HL.map((x,i)=>[i,`${x.n}・${money(hPrice(x))}`]);
  const y=calYear();pay=S.house?[['i','貸款買入（投資用）'],['ic','現金買入（投資用）']]:[['l','貸款 20 年'],['c','全額現金'],...((y>=2023&&S.age<=39)?[['y','新青安（20–39 歲首購）']]:[])];
 }else{
  const r=fReg(k),ts=fTypes(k),c=fCosts(k);types=ts.map(x=>[x.i,`${x.n}・${money(x.p)}`]);pay=[['l',`貸款 20 年（成數 ${Math.round(c.ltv*100)}%）`],['c','全額現金']];
  if(!fAllowed(k)){dis=true;info=r.ban}else info=`稅費與手續費約 ${(c.fee*100).toFixed(1)}%、貸款利率約 ${(c.rate*100).toFixed(1)}%、年持有稅約 ${(c.tx*100).toFixed(2)}%、租金報酬約 ${(c.y*100).toFixed(1)}%。${r.note||''}`;
 }
 const t=types.some(x=>String(x[0])===String(st.t))?st.t:types[0][0],m=pay.some(x=>x[0]===st.m)?st.m:pay[0][0];st.t=t;st.m=m;
 return `<div class="frm"><label>國家</label>${sel('s',cs,k)}<label>房型</label>${sel('t',types,t)}<label>付款方式</label>${sel('m',pay,m)}${info?`<div class="sub" style="line-height:1.6">${info}</div>`:''}<div class="acts"><button class="btn p" data-a="frmgo:hb:buy" ${dis?'disabled':''}>購買</button></div></div>`;
}
const _hs82=hsHTML;
hsHTML=function(){
 let h=_hs82();const re=/<div class="item"><b>[^<]*<\/b>　[^<]*<\/div><div class="seg"><button data-a="lf:hs:buy:[\s\S]*?<\/div>/g;
 let n=0;h=h.replace(re,()=>n++===0?'@@HB@@':'');
 if(n)h=h.replace('@@HB@@',hbHTML());
 (S.props||[]).forEach(p=>{if(p.cn)h=h.replace(`<div class="sec">投資房：${p.n}</div>`,`<div class="sec">${S.cn===p.cn?'海外自住':'海外投資房'}：${p.n}</div>`)});
 return h;
};
const _hd82=handle;
handle=function(a){
 if(typeof a==='string'&&S&&a==='frmgo:hb:buy'){
  const st=frmState('hb');let k=st.s,t=st.t,m=st.m;
  try{const g=i=>{const e=document.getElementById('frm_hb_'+i);return e&&e.value!==''?e.value:null};k=g('s')||k;t=g('t')||t;m=g('m')||m}catch(e){}
  if(k==='TW')return _hd82(`lf:hs:buy:${t}_${m}`);
  const r=buyForeign(k,+t,m);view.msg=r;render();try{showSheet(view.tab,view.sub)}catch(e){}return;
 }
 return _hd82(a);
};
