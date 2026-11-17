/* ---- p67：銀行存款（活存／定存），利率隨年代與景氣變動；外幣存款見「移民與匯率」 ---- */
/* 台灣一年期定存牌告利率的大致水準（%，遊戲簡化，非逐月官方值） */
const BKR={2000:4.6,2001:3.2,2002:1.9,2003:1.5,2004:1.4,2005:1.8,2006:2.0,2007:2.5,2008:2.2,2009:.9,2010:1.0,2011:1.3,2012:1.4,2013:1.4,2014:1.4,2015:1.4,2016:1.1,2017:1.1,2018:1.1,2019:1.0,2020:.8,2021:.8,2022:1.2,2023:1.6,2024:1.7,2025:1.6,2026:1.6};
function bkFd(){
 const y=calYear();
 if(y<2000)return 5;
 if(y<=2026)return BKR[y];
 return Math.max(.2,Math.round((1.6+((S.cpi==null?.02:S.cpi)-.02)*60+(S.econ||0)*10)*20)/20);
}
const bkDm=()=>Math.round(bkFd()*.27*100)/100;
function bkInit(){if(!S.bk)S.bk={c:0,fd:[]};return S.bk}
function bkTotal(){const b=S.bk;return b?Math.round(b.c+b.fd.reduce((a,x)=>a+x.amt,0)):0}
function bkAll(){const b=S.bk;if(!b)return;const t=bkTotal();S.money+=t;b.c=0;b.fd=[]}
function bkAmt(){bkInit();const c=[100000,500000,1000000,5000000];let a=view.bka||100000;return a}
function bkDo(x,y,z){
 const b=bkInit(),a=bkAmt();
 if(x==='amt'){view.bka=+y;return null}
 if(x==='dep'){if(S.money<a)return B('現金不足。');S.money-=a;b.c+=a;return G(`存入活存 ${money(a)}。`)}
 if(x==='wd'){const v=Math.min(a,b.c);if(v<=0)return B('活存沒有餘額。');b.c-=v;S.money+=v;return N(`從活存提領 ${money(v)}。`)}
 if(x==='wda'){const v=b.c;if(v<=0)return B('活存沒有餘額。');b.c=0;S.money+=v;return N(`提領全部活存 ${money(v)}。`)}
 if(x==='fd'){const yrs=+y;if(S.money<a)return B('現金不足。');S.money-=a;const r=bkFd()+(yrs-1)*.05;b.fd.push({amt:a,yrs,left:yrs,r:Math.round(r*100)/100});return G(`開立 ${yrs} 年期定存 ${money(a)}，年利率 ${(Math.round(r*100)/100).toFixed(2)}%。`)}
 if(x==='fdx'){const f=b.fd[+y];if(!f)return null;const el=f.yrs-f.left,v=Math.round(f.amt*Math.pow(1+bkDm()/100,el));b.fd.splice(+y,1);S.money+=v;return N(`提前解約定存，只按活存利率計息，取回 ${money(v)}。`)}
 return null;
}
function bkHTML(){
 const b=bkInit(),a=bkAmt();
 let h=`<div class="sec">銀行存款</div><div class="item"><b>活期存款</b>　${money(b.c)}<div class="sub">活存年利率 ${bkDm().toFixed(2)}%・定存（1 年期）${bkFd().toFixed(2)}%（歷史為台灣一年期牌告的大致水準，未來依物價與景氣推估；未計利息所得稅）</div></div>`;
 h+=`<div class="sub">現金 ${money(S.money)}・本次金額</div><div class="seg">${[100000,500000,1000000,5000000].map(v=>`<button class="${v===a?'on':''}" data-a="bk:amt:${v}">${v>=1000000?v/1000000+' 百萬':v/10000+' 萬'}</button>`).join('')}</div>`;
 h+=`<button class="btn" data-a="bk:dep">存入活存<small>${money(a)}</small></button>`;
 h+=[1,2,3].map(y=>`<button class="btn" data-a="bk:fd:${y}">開立 ${y} 年期定存<small>${money(a)}・年利率約 ${(bkFd()+(y-1)*.05).toFixed(2)}%・到期連本帶利轉入活存</small></button>`).join('');
 h+=`<button class="btn" data-a="bk:wd">從活存提領<small>${money(Math.min(a,b.c))}</small></button><button class="btn" data-a="bk:wda" ${b.c>0?'':'disabled'}>提領全部活存</button>`;
 if(b.fd.length)h+='<div class="sec">定存單</div>'+b.fd.map((f,i)=>`<div class="item row"><div style="flex:1"><b>${money(f.amt)}</b>・${f.yrs} 年期・利率 ${f.r.toFixed(2)}%<div class="sub">還有 ${f.left} 年到期</div></div><button class="mini" data-a="bk:fdx:${i}">提前解約</button></div>`).join('');
 h+=`<button class="btn" data-a="open:cn">外幣存款與匯率<small>買進外幣存款，賺匯差與利差（匯率隨經濟變動）</small></button>`;
 return h;
}
const _ah67=astHTML;
astHTML=function(){const h=_ah67();if(S.age<18)return h;const i=h.indexOf('</h3>');return i<0?h+bkHTML():h.slice(0,i+5)+bkHTML()+h.slice(i+5)};
const _hd67=handle;
handle=function(a){
 if(typeof a==='string'&&S&&a.startsWith('bk:')){const p=a.split(':'),r=bkDo(p[1],p[2],p[3]);view.msg=r;view.tab='ast';render();showSheet('ast');return}
 return _hd67(a);
};
const _y67=yearly;
yearly=function(){
 _y67();
 try{
  const b=S.bk;if(!b||S.dead)return;
  if(b.c>0){const i=Math.round(b.c*bkDm()/100);if(i>0){b.c+=i;ldAdd('存款利息（入活存，不計入現金）',null,i);log(`活存利息 ${money(i)}（年利率 ${bkDm().toFixed(2)}%）。`)}}
  for(let k=b.fd.length-1;k>=0;k--){const f=b.fd[k];f.left--;if(f.left<=0){const v=Math.round(f.amt*Math.pow(1+f.r/100,f.yrs));b.fd.splice(k,1);b.c+=v;log(`${f.yrs} 年期定存到期，本利和 ${money(v)} 轉入活存（利息 ${money(v-f.amt)}）。`,'good')}}
  if(S.money<0&&b.c>0){const v=Math.min(-S.money,b.c);b.c-=v;S.money+=v;log(`現金不足，自動從活存補 ${money(v)}。`)}
 }catch(e){}
};
const _die67=die;
die=function(c){try{bkAll()}catch(e){}return _die67(c)};
