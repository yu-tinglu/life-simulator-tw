// 選舉系統（台灣制度簡化版）
const PLV=[
 null,
 {n:'里長',age:23,cost:3e5,diff:42,sal:9e5,ty:'L',d:'社區層級，靠人脈與口碑。'},
 {n:'縣市議員',age:23,cost:3e6,diff:58,sal:25e5,ty:'L',d:'地方民意代表，需要政黨或地方組織。'},
 {n:'立法委員',age:26,cost:2e7,diff:74,sal:35e5,ty:'N',d:'全國性選舉，競爭激烈。'},
 {n:'縣市長',age:30,cost:5e7,diff:84,sal:3e6,ty:'L',d:'地方首長，需要聲望與資源。',req:2},
 {n:'總統',age:40,cost:3e8,diff:95,sal:8e6,ty:'N',d:'全國最高職位，聲望與歷練缺一不可。',req:3}
];
const PLN={JP:['町內會長','市町村議員','國會議員','都道府縣知事','內閣總理大臣'],US:['市議員','州議員','聯邦眾議員','州長','總統'],KR:['洞里代表','市道議員','國會議員','道知事','總統'],GB:['區議員','郡議員','下議院議員','市長','首相'],DE:['鄉鎮議員','邦議員','聯邦議員','邦總理','聯邦總理'],CA:['市議員','省議員','聯邦眾議員','省長','總理'],AU:['市議員','州議員','聯邦眾議員','州長','總理'],SG:['社區代表','市鎮會議員','國會議員','部長級','總理']};
function PL(lv){const c=PLV[lv];if(!c)return c;const cn=S&&S.cn||'TW',nm=PLN[cn];let f=1;try{if(cn!=='TW')f=Math.max(.2,Math.min(8,wTW(cn)/761000))}catch(e){}return Object.assign({},c,{n:nm?nm[lv-1]:c.n,cost:Math.round(c.cost*f),sal:Math.round(c.sal*f)})}
const PPT=[['rul','執政黨系',8],['opp','在野黨系',8],['thd','第三勢力',3],['ind','無黨籍',0]];
const PBUD=[['0','精簡競選',.5,0],['1','標準競選',1,6],['2','大選戰',2,11]];
function polInit(){if(!S.pol)S.pol={rep:0,office:null,hist:[],ly:{},party:'ind'};return S.pol}
function polRep(){const p=polInit();let nw=0;try{nw=Math.max(0,netWorth())}catch(e){}return Math.min(100,Math.round(p.rep+Math.min(25,Math.max(0,Math.log10(Math.max(1,nw/1e6))*7))+(S.job&&S.job.lv?Math.min(12,S.job.lv*2):0)+((S.flags&&S.flags.donor)?Math.min(10,S.flags.donor):0)))}
const ELC={TW:{L:[2026,4],N:[2028,4]},US:{L:[2026,2],N:[2028,4]},JP:{L:[2027,4],N:[2028,4]},KR:{L:[2026,4],N:[2028,4]},GB:{L:[2026,4],N:[2029,5]},DE:{L:[2026,5],N:[2029,4]},CA:{L:[2026,4],N:[2029,4]}};
const ELT={US:{2:2,3:2,5:4},GB:{5:5,4:4},JP:{2:4,3:4},DE:{5:4}};
function elCal(ty){const c=ELC[S&&S.cn]||ELC.TW;return c[ty==='L'?'L':'N']}
function elTerm(lv){const t=ELT[S&&S.cn];return t&&t[lv]||4}
function polOk(lv){
 const c=PL(lv),p=polInit(),y=calYear();
 if(S.ab&&!S.ab.nat)return '需具有該國公民身分才能參選（可在「政治與選舉」申請歸化）';
 if(S.age<c.age)return `需年滿 ${c.age} 歲`;
 if(S.jail)return '服刑中';
 {const cy=elCal(c.ty);if((y-cy[0])%cy[1]!==0){let n=y;while((n-cy[0])%cy[1]!==0&&n<y+10)n++;return (c.ty==='L'?'地方':'全國')+`選舉年才有（${n} 年）`}}
 if(p.ly[y])return '今年已參選過一次';
 if(lv>=4){let n=0;for(let i=p.hist.length-1;i>=0;i--){const h=p.hist[i];if(h.lv===lv&&h.won)n++;else break}if(n>=2)return '已連任一屆，依制度不得再連任'}
 if(c.req&&!(p.hist.some(h=>h.won&&h.lv>=c.req)||polRep()>=70))return `需當選過${PL(c.req).n}以上，或聲望達 70`;
 return '';
}
function polRun(lv,bud,party){
 const c=PL(lv),p=polInit(),y=calYear(),b=PBUD[+bud],cost=Math.round(c.cost*b[2]);
 const bad=polOk(lv);if(bad)return B(bad);
 if(S.money<cost)return B(`競選經費不足：需要 ${money(cost)}。`);
 p.ly[y]=1;p.party=party;
 if((party==='rul'||party==='opp')&&lv>=3){const pp=Math.min(.92,.3+polRep()/150+(p.office&&p.office.lv===lv?.2:0));if(Math.random()>pp){chg('happy',-3);log(`${y} 年，你在黨內初選敗給其他人，沒有取得提名。`,'bad');return B('黨內初選落敗，沒有取得提名，也沒有花到競選經費。可以改以其他身分參選明年的選舉。')}}
 S.money-=cost;
 const pt=PPT.find(x=>x[0]===party)||PPT[3];
 const wave=(typeof polWave==="function"?polWave():R(-8,8));let pb=pt[2]+(party==='rul'?wave:party==='opp'?-wave:party==='thd'?R(-3,5):0);
 if(party==='ind'&&lv>=3)pb-=10;
 const inc=p.office&&p.office.lv===lv?8:0;
 const sc=36+polRep()*.35+((S.smarts||50)-50)*.1+b[3]+pb+inc+R(-10,10)+(typeof polAdj==='function'?polAdj(lv):0);
 const won=sc>c.diff,share=Math.max(18,Math.min(72,Math.round(40+(sc-c.diff)*.7)));
 p.hist.push({y,lv,won,party,share});
 if(won){p.rep=Math.min(100,p.rep+10);if(!(p.office&&p.office.lv===lv))elReset();p.office={lv,y0:y,end:y+elTerm(lv)};chg('happy',12);S.stress=cl(S.stress+6);log(`${y} 年，你競選${c.n}並當選！得票率約 ${share}%。（花費 ${money(cost)}）`,'good');return G(`恭喜當選${c.n}！任期 4 年，每年薪津約 ${money(c.sal)}。`)}
 p.rep=Math.max(0,p.rep-2);chg('happy',-8);S.stress=cl(S.stress+5);log(`${y} 年，你競選${c.n}落選，得票率約 ${share}%。（花費 ${money(cost)}）`,'bad');
 return B(`很可惜，這次落選了。花費 ${money(cost)}。`);
}
function elYear(){
 if(!S||S.dead)return;const p=S.pol;if(!p||!p.office)return;const o=p.office,c=PL(o.lv),y=calYear();
 if(y>=o.end){log(`你的${c.n}任期屆滿。`,'');p.office=null;elReset();return}
 if(p.rep<25&&Math.random()<.3){log(`你被選民罷免，${c.n}職位提前結束。`,'bad');chg('happy',-10);p.office=null;elReset();return}
 S.money+=c.sal;p.rep=Math.min(100,p.rep+1);S.stress=cl(S.stress+3+o.lv);
 if(Math.random()<.1){if(Math.random()<.5){p.rep=Math.min(100,p.rep+5);log(`你推動的政策獲得好評。`,'good')}else{p.rep=Math.max(0,p.rep-7);chg('happy',-5);log(`有媒體報導你的爭議，聲望受損。`,'bad')}}
}
const _y91=yearly;
yearly=function(){_y91.apply(this,arguments);try{elYear()}catch(e){}};
function elHTML(){
 const p=polInit(),y=calYear(),rep=polRep();
 let h=`<h3>政治與選舉</h3><div class="sub">各國依自己的選舉年與任期簡化（例如美國地方每 2 年、英國首相任期 5 年），職位層級相同，職稱、薪津與經費依該國薪資水準換算，皆為概略值。</div>`;
 h+=`<div class="item">聲望：<b>${rep}</b>／100　目前職位：<b>${p.office?PL(p.office.lv).n+'（任期至 '+p.office.end+' 年）':'無'}</b><div class="sub">聲望來自財富、職位、慈善與從政經歷。</div></div>`;
 if(S.ab&&!S.ab.nat)return h+`<div class="item">你是移居者，需具有該國公民身分才能參選（可在「政治與選舉」申請歸化）。</div><button class="btn" data-a="pol:x">← 返回</button>`;
 const opts=[1,2,3,4,5].map(lv=>{const bad=polOk(lv);return [String(lv),`${PL(lv).n}${bad?'（'+bad+'）':'・民調勝率約 '+polEst(lv)+'%'}`]});
 if(p.office){const done=p.acted===y;h+='<div class="sec op">施政（每年一項）</div><div class="sub">施政會影響全國的薪資成長與房價，任期結束後效果會消失。目前：薪資成長 '+((elMod().w*100).toFixed(1))+'%、房價成長 '+((elMod().h*100).toFixed(1))+'%。</div><select id="pol_a">'+PACT.filter(x=>x[2]<=p.office.lv).map(x=>`<option value="${x[0]}">${x[1]}：${x[3]}</option>`).join('')+'</select><button class="btn p" data-a="pol:act" '+(done?'disabled':'')+'>'+(done?'今年已施政':'推動這項施政')+'</button>'}
 h+='<div class="sec op">登記參選</div>'+frmHTML('pol',{sl:'選舉職位',opts,amt:false,btns:[]})
  +`<div class="frm"><label for="pol_p">推薦政黨</label><select id="pol_p">${PPT.map(x=>`<option value="${x[0]}">${x[1]}${x[0]==='ind'?'（高層級較吃虧）':''}</option>`).join('')}</select>`
  +`<label for="pol_b">競選預算</label><select id="pol_b">${PBUD.map(x=>`<option value="${x[0]}">${x[1]}</option>`).join('')}</select><div class="sub">里長約 30 萬、議員 300 萬、立委 2,000 萬、縣市長 5,000 萬、總統 3 億（標準預算；精簡減半、大選戰加倍）。</div><button class="btn p" data-a="pol:go">登記參選</button></div>`;
 if(p.hist.length)h+='<div class="sec op">參選紀錄</div>'+p.hist.slice(-8).reverse().map(x=>`<div class="item">${x.y} 年・${PL(x.lv).n}・${(PPT.find(q=>q[0]===x.party)||PPT[3])[1]}・<b>${x.won?'當選':'落選'}</b>${x.share?'・得票率 '+x.share+'%':''}</div>`).join('');
 return h+`<button class="btn" data-a="pol:x">← 返回</button>`;
}
const _ac91=actHTML;
actHTML=function(){
 if(view.polOn)return elHTML();
 const h=_ac91();if(S.age<23)return h;
 const b=`<button class="btn" data-a="pol:o">政治與選舉<small>里長、議員、立委、縣市長、總統・${S.pol&&S.pol.office?'現任'+PL(S.pol.office.lv).n:'聲望 '+polRep()}</small></button>`;
 return h.includes('<div class="frm">')||true?h+b:h;
};
const _hd91=handle;
handle=function(a){
 if(typeof a==='string'&&S&&a.startsWith('pol:')){
  const rf=()=>{render();try{showSheet('act')}catch(e){}};
  if(a==='pol:o'){view.polOn=1;rf();return}
  if(a==='pol:x'){view.polOn=0;rf();return}
  if(a==='pol:act'){let k='soc';try{k=document.getElementById('pol_a').value}catch(e){}view.msg=elAct(k);rf();return}
  if(a==='pol:go'){
   let lv='1',pa='ind',bu='1';try{lv=document.getElementById('frm_pol_s').value;pa=document.getElementById('pol_p').value;bu=document.getElementById('pol_b').value}catch(e){}
   view.msg=polRun(+lv,bu,pa);rf();return;
  }
 }
 return _hd91(a);
};

function elReset(){const p=polInit();p.mod={w:0,h:0};p.acted=0}
function elMod(){const p=polInit();if(!p.mod)p.mod={w:0,h:0};return p.mod}
const PACT=[
 ['soc','推動社福與長照',2,'聲望 +4，民生改善；不影響物價'],
 ['eco','招商與產業政策',2,'薪資成長加快約 0.4%/年，聲望 +2，有 20% 機率成效不彰'],
 ['wage','調高基本工資（立委以上）',3,'薪資成長加快約 0.6%/年，聲望 +3，企業界不滿'],
 ['cool','房市降溫措施（立委以上）',3,'房價成長降低約 2%/年，聲望 +1（有房者不滿）'],
 ['subs','購屋補貼與增建社宅（立委以上）',3,'房價成長提高約 1.5%/年，聲望 +3'],
 ['aus','撙節預算、整頓財政（縣市長以上）',4,'薪資成長略降約 0.3%/年，聲望 -2，之後遇突發事件較穩'],
 ['rep','公開記者會與地方服務',1,'聲望 +3，花你自己 NT$10 萬'],
 ['bribe','收受政治獻金與回扣',1,'立刻拿到約 3 年薪津，但有 30% 被查辦，將失去職位並罰款']
];
function elAct(k){
 const p=polInit(),y=calYear(),o=p.office;if(!o)return B('目前沒有職位。');
 if(p.acted===y)return B('今年已經施政過了。');
 const a=PACT.find(x=>x[0]===k);if(!a)return null;if(o.lv<a[2])return B('目前職位無法推動這項政策。');
 const m=elMod(),cl_=x=>Math.max(-.02,Math.min(.02,x));
 p.acted=y;
 if(k==='soc'){p.rep=Math.min(100,p.rep+4);chg('happy',3);log('你推動社福與長照加碼，民眾反應不錯。','good');return G('社福政策上路，聲望上升。')}
 if(k==='rep'){if(S.money<1e5)return B('錢不夠。');S.money-=1e5;p.rep=Math.min(100,p.rep+3);log('你舉辦記者會並經營地方，聲望上升。','good');return G('聲望 +3。')}
 if(k==='eco'){if(Math.random()<.2){log('招商政策成效不彰，被在野陣營批評。','bad');p.rep=Math.max(0,p.rep-2);return B('這次成效不彰。')}m.w=cl_(m.w+.004);p.rep=Math.min(100,p.rep+2);log('招商與產業政策見效，薪資成長加快。','good');return G('經濟成長加快。')}
 if(k==='wage'){m.w=cl_(m.w+.006);p.rep=Math.min(100,p.rep+3);log('基本工資調高，勞工歡迎、企業界不滿。','');return G('薪資成長加快。')}
 if(k==='cool'){m.h=Math.max(-.04,m.h-.02);p.rep=Math.min(100,p.rep+1);log('政府推出房市降溫措施。','');return G('房價成長降低。')}
 if(k==='subs'){m.h=Math.min(.04,m.h+.015);p.rep=Math.min(100,p.rep+3);log('政府推出購屋補貼與社宅方案。','');return G('房價成長提高。')}
 if(k==='aus'){m.w=cl_(m.w-.003);p.rep=Math.max(0,p.rep-2);log('政府撙節預算，整頓財政。','');return N('財政較穩，但民怨增加。')}
 if(k==='bribe'){const g=PL(o.lv).sal*3;S.money+=g;if(Math.random()<.3){const f=g*3;S.money-=f;p.rep=Math.max(0,p.rep-30);chg('happy',-15);log(`你收受回扣遭檢調查辦，失去${PL(o.lv).n}職位並被罰款 ${money(f)}。`,'bad');p.office=null;elReset();return B('東窗事發，失去職位並被罰款。')}log('你收到一筆政治獻金，沒有被查到。','');return N(`拿到 ${money(g)}，風險仍在。`)}
 return null;
}
const _wg91=wageGrow;
wageGrow=function(){return _wg91()+((S.pol&&S.pol.mod)?S.pol.mod.w:0)};
const _hm91=hmYear;
hmYear=function(){
 _hm91();
 try{const m=S.pol&&S.pol.mod?S.pol.mod.h:0;if(m&&S.hmi&&(S.cn||'TW')==='TW')for(const c in S.hmi)S.hmi[c]=Math.max(.6,Math.min(1.7,S.hmi[c]*(1+m)))}catch(e){}
};
