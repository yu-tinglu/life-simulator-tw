// 選舉系統（台灣制度簡化版）
const PLV=[
 null,
 {n:'里長',age:23,cost:3e5,diff:42,sal:9e5,ty:'L',d:'社區層級，靠人脈與口碑。'},
 {n:'縣市議員',age:23,cost:3e6,diff:58,sal:25e5,ty:'L',d:'地方民意代表，需要政黨或地方組織。'},
 {n:'立法委員',age:26,cost:2e7,diff:74,sal:35e5,ty:'N',d:'全國性選舉，競爭激烈。'},
 {n:'縣市長',age:30,cost:5e7,diff:84,sal:3e6,ty:'L',d:'地方首長，需要聲望與資源。',req:2},
 {n:'總統',age:40,cost:3e8,diff:95,sal:8e6,ty:'N',d:'全國最高職位，聲望與歷練缺一不可。',req:3}
];
const PPT=[['rul','執政黨系',8],['opp','在野黨系',8],['thd','第三勢力',3],['ind','無黨籍',0]];
const PBUD=[['0','精簡競選',.5,0],['1','標準競選',1,6],['2','大選戰',2,11]];
function polInit(){if(!S.pol)S.pol={rep:0,office:null,hist:[],ly:{},party:'ind'};return S.pol}
function polRep(){const p=polInit();let nw=0;try{nw=Math.max(0,netWorth())}catch(e){}return Math.min(100,Math.round(p.rep+Math.min(25,Math.max(0,Math.log10(Math.max(1,nw/1e6))*7))+(S.job&&S.job.lv?Math.min(12,S.job.lv*2):0)+((S.flags&&S.flags.donor)?Math.min(10,S.flags.donor):0)))}
function polOk(lv){
 const c=PLV[lv],p=polInit(),y=calYear();
 if(S.cn!=='TW')return '目前只支援台灣的選舉制度';
 if(S.age<c.age)return `需年滿 ${c.age} 歲`;
 if(S.jail)return '服刑中';
 if((y-2026)%4!==0&&c.ty==='L')return `地方選舉年才有（${y+(4-((y-2026)%4+4)%4)%4} 年）`;
 if(c.ty==='N'&&(y-2028)%4!==0)return `全國選舉年才有（${y+((2028-y)%4+4)%4} 年）`;
 if(p.ly[y])return '今年已參選過一次';
 if(c.req&&!(p.hist.some(h=>h.won&&h.lv>=c.req)||polRep()>=70))return `需當選過${PLV[c.req].n}以上，或聲望達 70`;
 return '';
}
function polRun(lv,bud,party){
 const c=PLV[lv],p=polInit(),y=calYear(),b=PBUD[+bud],cost=Math.round(c.cost*b[2]);
 const bad=polOk(lv);if(bad)return B(bad);
 if(S.money<cost)return B(`競選經費不足：需要 ${money(cost)}。`);
 S.money-=cost;p.ly[y]=1;p.party=party;
 const pt=PPT.find(x=>x[0]===party)||PPT[3];
 const wave=R(-8,8);let pb=pt[2]+(party==='rul'?wave:party==='opp'?-wave:party==='thd'?R(-3,5):0);
 if(party==='ind'&&lv>=3)pb-=10;
 const inc=p.office&&p.office.lv===lv?8:0;
 const sc=36+polRep()*.35+((S.smarts||50)-50)*.1+b[3]+pb+inc+R(-10,10);
 const won=sc>c.diff;
 p.hist.push({y,lv,won,party});
 if(won){p.rep=Math.min(100,p.rep+10);p.office={lv,y0:y,end:y+4};chg('happy',12);S.stress=cl(S.stress+6);log(`${y} 年，你競選${c.n}並當選！（花費 ${money(cost)}）`,'good');return G(`恭喜當選${c.n}！任期 4 年，每年薪津約 ${money(c.sal)}。`)}
 p.rep=Math.max(0,p.rep-2);chg('happy',-8);S.stress=cl(S.stress+5);log(`${y} 年，你競選${c.n}落選。（花費 ${money(cost)}）`,'bad');
 return B(`很可惜，這次落選了。花費 ${money(cost)}。`);
}
function elYear(){
 if(!S||S.dead||S.cn==='ZZ')return;const p=S.pol;if(!p||!p.office)return;const o=p.office,c=PLV[o.lv],y=calYear();
 if(y>=o.end){log(`你的${c.n}任期屆滿。`,'');p.office=null;return}
 S.money+=c.sal;p.rep=Math.min(100,p.rep+1);S.stress=cl(S.stress+3+o.lv);
 if(Math.random()<.1){if(Math.random()<.5){p.rep=Math.min(100,p.rep+5);log(`你推動的政策獲得好評。`,'good')}else{p.rep=Math.max(0,p.rep-7);chg('happy',-5);log(`有媒體報導你的爭議，聲望受損。`,'bad')}}
}
const _y91=yearly;
yearly=function(){_y91.apply(this,arguments);try{elYear()}catch(e){}};
function elHTML(){
 const p=polInit(),y=calYear(),rep=polRep();
 let h=`<h3>政治與選舉</h3><div class="sub">依台灣制度簡化：地方選舉每 4 年（2026、2030…），全國選舉每 4 年（2028、2032…）。薪津與經費為約略值，不含各項補助與實際制度細節。</div>`;
 h+=`<div class="item">聲望：<b>${rep}</b>／100　目前職位：<b>${p.office?PLV[p.office.lv].n+'（任期至 '+p.office.end+' 年）':'無'}</b><div class="sub">聲望來自財富、職位、慈善與從政經歷。</div></div>`;
 if(S.cn!=='TW')return h+`<div class="item">目前只支援台灣的選舉。</div><button class="btn" data-a="pol:x">← 返回</button>`;
 const opts=[1,2,3,4,5].map(lv=>{const bad=polOk(lv);return [String(lv),`${PLV[lv].n}・${PLV[lv].d}${bad?'（'+bad+'）':'・可參選'}`]});
 h+='<div class="sec">登記參選</div>'+frmHTML('pol',{sl:'選舉職位',opts,amt:false,btns:[]})
  +`<label for="pol_p">推薦政黨</label><select id="pol_p">${PPT.map(x=>`<option value="${x[0]}">${x[1]}${x[0]==='ind'?'（高層級較吃虧）':''}</option>`).join('')}</select>`
  +`<label for="pol_b">競選預算</label><select id="pol_b">${PBUD.map(x=>`<option value="${x[0]}">${x[1]}</option>`).join('')}</select><div class="sub">里長約 30 萬、議員 300 萬、立委 2,000 萬、縣市長 5,000 萬、總統 3 億（標準預算；精簡減半、大選戰加倍）。</div><button class="btn p" data-a="pol:go">登記參選</button>`;
 if(p.hist.length)h+='<div class="sec">參選紀錄</div>'+p.hist.slice(-8).reverse().map(x=>`<div class="item">${x.y} 年・${PLV[x.lv].n}・${(PPT.find(q=>q[0]===x.party)||PPT[3])[1]}・<b>${x.won?'當選':'落選'}</b></div>`).join('');
 return h+`<button class="btn" data-a="pol:x">← 返回</button>`;
}
const _ac91=actHTML;
actHTML=function(){
 if(view.polOn)return elHTML();
 const h=_ac91();if(S.age<23||S.cn!=='TW'&&!(S.pol&&S.pol.office))return h;
 const b=`<button class="btn" data-a="pol:o">政治與選舉<small>里長、議員、立委、縣市長、總統・${S.pol&&S.pol.office?'現任'+PLV[S.pol.office.lv].n:'聲望 '+polRep()}</small></button>`;
 const i=h.indexOf('</div>');return i<0?h+b:h.slice(0,i+6)+b+h.slice(i+6);
};
const _hd91=handle;
handle=function(a){
 if(typeof a==='string'&&S&&a.startsWith('pol:')){
  const rf=()=>{render();try{showSheet('act')}catch(e){}};
  if(a==='pol:o'){view.polOn=1;rf();return}
  if(a==='pol:x'){view.polOn=0;rf();return}
  if(a==='pol:go'){
   let lv='1',pa='ind',bu='1';try{lv=document.getElementById('frm_pol_s').value;pa=document.getElementById('pol_p').value;bu=document.getElementById('pol_b').value}catch(e){}
   view.msg=polRun(+lv,bu,pa);rf();return;
  }
 }
 return _hd91(a);
};
