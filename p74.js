/* ---- p74：創業股權玩法（股權結構表、創投輪次與對賭、員工認股權、股票質押借款、公司買回庫藏股）---- */
function eqFix(co){if(!co.eq)co.eq={vc:0,esop:0,pl:0,neg:0,rounds:[]};return co.eq}
const eqPrice=co=>Math.max(10,coValue(co)/co.shares);
function eqHTML(){
 const co=S.co,e=eqFix(co),L=co.L,sh=co.shares,own=co.fs/sh,pr=eqPrice(co),stk=stake(co);
 const oth=Math.max(0,sh-co.fs-e.vc-e.esop),pc=x=>(x/sh*100).toFixed(1)+'%';
 const back='<button class="btn" data-a="co:menu:main">← 公司主頁</button>';
 let h=`<h3>股權與資本運作</h3><table class="rt"><tr class="h"><td colspan="2">股權結構表（共 ${Math.round(sh).toLocaleString()} 股・每股約 ${money(pr)}）</td></tr>
 <tr><td>創辦人（你）</td><td>${pc(co.fs)}・約 ${money(stk)}</td></tr>
 ${e.vc?`<tr><td>創投與天使投資人</td><td>${pc(e.vc)}</td></tr>`:''}
 ${e.esop?`<tr><td>員工認股權池</td><td>${pc(e.esop)}</td></tr>`:''}
 ${oth>1?`<tr><td>合夥人／其他股東／公眾</td><td>${pc(oth)}</td></tr>`:''}
 <tr class="b"><td>控制權</td><td>${own>=.5?'過半，掌握董事會':own>=.33?'三分之一以上，重大議案有否決權':'偏低，易受投資人影響'}</td></tr></table>`;
 if(e.pl)h+=`<div class="item"><b>質押借款中</b><div class="sub">${money(e.pl)}・年利率 4%・持股價值低於借款 1.4 倍會被追繳</div></div>`;
 h+=`<div class="sec">創投輪次</div><p class="sub">創投按較高估值入股並帶來資源（市場信心上升），但會要求對賭：入股後連續兩年虧損，你要無償轉讓 3% 股份。非公開發行階段才能募資，累計創投持股上限 45%。</p>`;
 const can=co.stage<=1&&co.form!=='獨資'&&e.vc/sh<.4;
 h+=[['種子輪',.08],['A 輪',.15],['B 輪',.2]].map(([n,f])=>{const v=coValue(co)*1.35,a=Math.round(v*f/(1-f)/1e5)*1e5;return `<button class="btn" data-a="co:eq:vc:${f}" ${can?'':'disabled'}>${n}：釋出 ${f*100}%<small>估值約 ${money(v)}，募得約 ${money(a)}</small></button>`}).join('');
 h+=`<div class="sec">員工認股權</div><p class="sub">預留新股給員工，不收現金，但稀釋所有股東；員工更有向心力，每年市場信心小幅提升。上限 15%。</p>`;
 h+=[.05,.1].map(f=>`<button class="btn" data-a="co:eq:esop:${f}" ${e.esop/sh+f>.151?'disabled':''}>增設認股權池 ${f*100}%</button>`).join('');
 h+=`<div class="sec">股票質押借款</div><p class="sub">以持股向銀行借現金，額度為持股價值的 40%，不必賣股、不稀釋，但股價下跌會被追繳（強制賣股還款）。上市櫃前持股流動性差，只能借 25%。</p>`;
 const lim=Math.max(0,stk*(co.stage>=3?.4:.25)-e.pl);
 h+=[.5,1].map(f=>`<button class="btn" data-a="co:eq:pl:${f}" ${lim<1e6?'disabled':''}>借 ${money(Math.round(lim*f/1e5)*1e5)}</button>`).join('')
  +`<button class="btn" data-a="co:eq:rp:1" ${e.pl>0&&S.money>0?'':'disabled'}>還款（最多 ${money(Math.min(e.pl,Math.max(0,S.money)))}）</button>`;
 h+=`<div class="sec">公司買回股份</div><p class="sub">公司用現金向外部股東買回股份並註銷（溢價 5%），你的持股比例上升、控制權回來。</p>`;
 const outside=sh-co.fs-e.esop;
 h+=[.03,.1].map(f=>{const ns=sh*f,amt=ns*pr*1.05;return `<button class="btn" data-a="co:eq:bb:${f}" ${outside>=ns&&L.cash>=amt*1.1?'':'disabled'}>買回 ${f*100}%（約 ${money(amt)}）</button>`}).join('');
 return h+back;
}
const _coH74=coHTML;
coHTML=function(sub){
 if(sub==='co:eq')return eqHTML();
 let h=_coH74(sub);
 if(S.co&&S.co.form!=='獨資'&&(!sub||sub==='co:main')&&!h.includes('co:menu:eq'))h=h.replace('<button class="btn" data-a="co:menu:fin">','<button class="btn" data-a="co:menu:eq">股權與資本運作</button><button class="btn" data-a="co:menu:fin">');
 return h;
};
const _coHd74=coHandle;
coHandle=function(x,y,z){
 if(x!=='eq')return _coHd74(x,y,z);
 const co=S.co;if(!co)return null;const e=eqFix(co),L=co.L,f=+z;view.csub='co:eq';
 if(y==='vc'){
  if(co.stage>1||e.vc/co.shares>=.4)return B('目前無法募資。');
  const price=eqPrice(co)*1.35,ns=co.shares*f/(1-f),a=ns*price;
  J(L,['cash',a],['capital',-ns*10],['apic',-(a-ns*10)]);co.shares+=ns;e.vc+=ns;e.rounds.push({f,a:Math.round(a),y:S.age});e.neg=0;
  co.sent=Math.min(1.5,co.sent+.08);
  const m=`創投以每股 ${money(price)} 入股，公司募得 ${money(a)}，你的持股降為 ${(co.fs/co.shares*100).toFixed(1)}%。`;log(m,'good');return G(m)}
 if(y==='esop'){
  if(e.esop/co.shares+f>.151)return B('超過上限。');
  const ns=co.shares*f/(1-f);co.shares+=ns;e.esop+=ns;J(L,['capital',-ns*10],['apic',ns*10]);
  const m=`增設員工認股權池 ${f*100}%，你的持股降為 ${(co.fs/co.shares*100).toFixed(1)}%。`;log(m);return G(m)}
 if(y==='pl'){
  const lim=Math.max(0,stake(co)*(co.stage>=3?.4:.25)-e.pl),a=Math.round(lim*f/1e5)*1e5;
  if(a<1e6)return B('額度不足。');e.pl+=a;S.money+=a;const m=`以持股質押借得 ${money(a)}。`;log(m);return G(m)}
 if(y==='rp'){const a=Math.min(e.pl,Math.max(0,S.money));if(a<=0)return B('沒有可還款的現金。');e.pl-=a;S.money-=a;const m=`償還質押借款 ${money(a)}。`;log(m);return G(m)}
 if(y==='bb'){
  const pr=eqPrice(co)*1.05,ns=co.shares*f,amt=ns*pr;
  if(L.cash<amt*1.1||co.shares-co.fs-e.esop<ns)return B('現金不足或外部持股不夠。');
  J(L,['cash',-amt],['capital',ns*10],['apic',amt-ns*10]);co.shares-=ns;const fromVc=Math.min(e.vc,ns);e.vc-=fromVc;
  const m=`公司買回並註銷 ${f*100}% 股份，花費 ${money(amt)}，你的持股升至 ${(co.fs/co.shares*100).toFixed(1)}%。`;log(m,'good');return G(m)}
 return null;
};
const _coY74=coYear;
coYear=function(){
 const r=_coY74.apply(this,arguments);
 try{const co=S.co;if(co&&co.eq){const e=co.eq;
  if(e.esop>0)co.sent=Math.min(1.5,co.sent+.03);
  if(e.vc>0&&co.rec){
   if(co.rec.NI<0)e.neg++;else e.neg=0;
   if(e.neg>=2){const t=co.shares*.03;co.fs=Math.max(0,co.fs-t);e.vc+=t;e.neg=0;log(`【${co.name}】連續虧損觸發對賭條款，你無償轉讓 3% 股份給創投。`,'bad')}
  }
  if(e.pl>0){const it=Math.round(e.pl*.04);S.money-=it;
   const stk=stake(co);
   if(stk<e.pl*1.4){const need=Math.min(e.pl,co.fs*.9),px=stk/co.fs*1,sold=Math.min(co.fs*.9,e.pl/Math.max(1e-9,px)*1.0);
    const get=sold*px;co.fs-=sold;const pay=Math.min(e.pl,get);e.pl-=pay;S.money+=get-pay;
    log(`持股價值下跌，銀行追繳質押借款，被迫賣出約 ${(sold/co.shares*100).toFixed(1)}% 股份還款 ${money(pay)}。`,'bad')}
  }
 }}catch(err){}
 return r;
};
