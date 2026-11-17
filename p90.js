// 富豪專案：大型投資與事業（太空、電動車、AI、媒體、基金會等）
const PJ={
 space:{n:'太空運輸與衛星',min:2e8,mu:.02,sd:.22,jp:[.05,2.5,5],cr:[.09,.35],up:0,hp:1,d:'火箭、衛星網路。長期燒錢，偶爾發射失敗，成功時價值大幅跳升。'},
 ev:{n:'電動車與電池',min:1e8,mu:.04,sd:.18,jp:[.04,2,3.5],cr:[.06,.3],up:0,hp:1,d:'量產、電池與充電網。中高風險，景氣與競爭影響大。'},
 ai:{n:'人工智慧研究院',min:1e8,mu:.05,sd:.28,jp:[.06,2,6],cr:[.08,.4],up:0,hp:1,d:'訓練模型、算力與人才。報酬波動極大。'},
 fus:{n:'核融合與新能源',min:2e8,mu:0,sd:.28,jp:[.03,5,10],cr:[.1,.4],up:0,hp:1,d:'技術尚未成熟，多數年份沒有進展，成功則回報極高。'},
 media:{n:'媒體與社群平台',min:5e7,mu:-.02,sd:.14,jp:[.02,1.8,2.5],cr:[.05,.25],up:0,hp:2,st:1,d:'買下平台或媒體，影響力大，但常虧損且爭議多。'},
 vc:{n:'創投基金',min:3e7,mu:.07,sd:.17,jp:[.04,1.8,3],cr:[.04,.2],up:.005,hp:0,d:'分散投資新創，每年管理費約 0.5%。'},
 art:{n:'藝術與收藏',min:1e7,mu:.04,sd:.07,jp:[.02,1.4,1.8],cr:[.02,.12],up:.006,hp:1,d:'畫作、古董與名錶，保管保險約每年 0.6%。'},
 team:{n:'職業球隊',min:2e8,mu:.05,sd:.06,jp:[.02,1.3,1.6],cr:[.02,.1],up:.01,hp:2,d:'球隊估值穩定上升，維運每年約 1%，球迷與成績讓人開心。'},
 isle:{n:'私人島嶼與度假村',min:3e7,mu:.02,sd:.05,jp:[0,1,1],cr:[.02,.1],up:.02,hp:2,d:'維護費高（約 2%），但生活品質與心情加分。'},
 fnd:{n:'慈善基金會',min:1e7,mu:0,sd:0,jp:[0,1,1],cr:[0,0],up:0,hp:2,give:.05,d:'每年捐出基金約 5%，不求回報，心情與名聲提升。'}
};
const PJK=Object.keys(PJ);
function pjGet(){if(!S.pj)S.pj={};return S.pj}
function pjTotal(){return S.pj?Object.values(S.pj).reduce((a,x)=>a+x.val,0):0}
const _ca90=cnAssets;
cnAssets=function(){return _ca90()+pjTotal()};
function pjYear(){
 if(!S||S.dead||!S.pj)return;
 for(const k of PJK){const p=S.pj[k];if(!p||p.val<=0)continue;const c=PJ[k];
  let r=c.mu+(Math.random()+Math.random()+Math.random()-1.5)*2*c.sd/1.2;
  let note='';
  if(c.jp[0]&&Math.random()<c.jp[0]){const m=c.jp[1]+Math.random()*(c.jp[2]-c.jp[1]);r=m-1;note=`${c.n}傳出重大突破，估值大幅上升。`}
  else if(c.cr[0]&&Math.random()<c.cr[0]){r=-c.cr[1];note=`${c.n}遇到重大挫折，估值下修。`}
  const g=c.give?-c.give:r-c.up;
  const ov=Math.round(p.val*g);p.val=Math.max(0,p.val+ov);
  if(c.hp&&p.val>0)chg('happy',c.hp);if(c.st)S.stress=cl(S.stress+3);
  if(note)log(note+`（${ov>=0?'+':''}${money(ov)}）`,ov>=0?'good':'bad');
  if(c.give&&p.val>0&&S.money>-1e9)S.flags=S.flags||{},S.flags.donor=(S.flags.donor||0)+1;
 }
}
const _y90=yearly;
yearly=function(){_y90.apply(this,arguments);try{pjYear()}catch(e){}};
const _ec90=estateCalc;
estateCalc=function(dry){
 const v=Math.round(pjTotal()*.7);
 if(!v)return _ec90(dry);
 S.money+=v;
 if(dry){try{return _ec90(dry)}finally{S.money-=v}}
 S.pj={};return _ec90(dry);
};
function pjHTML(){
 const P=pjGet();let h=`<h3>大型投資與事業</h3><div class="sub">現金 ${money(S.money)}・專案合計 ${money(pjTotal())}（已計入淨資產）。專案估值每年波動，賣出時約打 85 折；去世時以 7 折變現後繼承。</div>`;
 const held=PJK.filter(k=>P[k]&&P[k].val>0);
 if(held.length)h+='<div class="sec">持有中</div>'+held.map(k=>`<div class="item row"><div style="flex:1"><b>${PJ[k].n}</b>・${money(P[k].val)}<div class="sub">累計投入 ${money(P[k].inv)}・${P[k].val>=P[k].inv?'帳面獲利 '+money(P[k].val-P[k].inv):'帳面虧損 '+money(P[k].inv-P[k].val)}</div></div><button class="mini" data-a="pj:sell:${k}">賣出</button></div>`).join('');
 h+='<div class="sec">新增或加碼</div><div class="sub">'+PJK.map(k=>`<b>${PJ[k].n}</b>（${money(PJ[k].min)} 起）：${PJ[k].d}`).join('<br>')+'</div>';
 h+=frmHTML('pj',{sl:'項目',opts:PJK.map(k=>[k,`${PJ[k].n}・最低 ${money(PJ[k].min)}`]),def:'100000000',al:'投入金額（新台幣，可輸入 5億、2億）',chips:[1e7,5e7,1e8,5e8,1e9],btns:[['go','投入','p']]});
 return h+`<button class="btn" data-a="pj:x">← 返回</button>`;
}
const _ah90=astHTML;
astHTML=function(){
 if(view.pjOn)return pjHTML();
 const h=_ah90();if(S.age<18||(typeof netWorth==='function'&&netWorth()<1e7&&!pjTotal()))return h;
 const b=`<button class="btn" data-a="pj:o">大型投資與事業<small>太空、電動車、AI、媒體、球隊、基金會等・資產 1,000 萬以上開放</small></button>`;
 const i=h.indexOf('</h3>');return i<0?h+b:h.slice(0,i+5)+b+h.slice(i+5);
};
const _hd90=handle;
handle=function(a){
 if(typeof a==='string'&&S&&(a.startsWith('pj:')||a==='frmgo:pj:go')){
  const rf=()=>{render();try{showSheet('ast')}catch(e){}};
  if(a==='pj:o'){view.pjOn=1;rf();return}
  if(a==='pj:x'){view.pjOn=0;rf();return}
  if(a.startsWith('pj:sell:')){const k=a.split(':')[2],p=S.pj&&S.pj[k];if(p&&p.val>0){const v=Math.round(p.val*.85);S.money+=v;log(`你賣出${PJ[k].n}，實拿 ${money(v)}。`,v>=p.inv?'good':'bad');delete S.pj[k]}rf();return}
  if(a==='frmgo:pj:go'){
   const g=frmGet('pj'),c=PJ[g.s];
   const bad=m=>{view.msg=B(m);rf()};
   if(!c)return;
   if(!(g.a>0))return bad('請輸入金額，例如 1億 或 100000000。');
   const P=pjGet(),has=P[g.s]&&P[g.s].val>0;
   if(!has&&g.a<c.min)return bad(`${c.n}最低投入 ${money(c.min)}。`);
   if(g.a>S.money)return bad(`現金不足：要投入 ${money(g.a)}，目前現金 ${money(S.money)}。`);
   S.money-=g.a;P[g.s]=P[g.s]||{val:0,inv:0};P[g.s].val+=g.a;P[g.s].inv+=g.a;
   log(`你投入 ${money(g.a)} 到${c.n}。`,'good');view.msg=G(`已投入 ${money(g.a)}。`);try{delete frmState('pj').a}catch(e){}rf();return;
  }
 }
 return _hd90(a);
};
