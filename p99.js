// 年度紀錄：今年展開、舊年份收合、依類別分組
const LGC=[
 ['世界與經濟',/世界新聞|央行|經濟成長|CPI|景氣|戰爭|疫情|政策|基本工資|普發|匯率|利率|通膨|房價指數|股市|油價|選舉結果|遊戲隨機事件|全球風險|加密貨幣新聞|新聞|三級警/],
 ['生活與社會',/颱風|廟|拜拜|普渡|桐花|祭|節|詐騙|簡訊|檢警|電話|代幣|購物|貓|發票|小吃|旅行|出國|搬家|鄰居|宗教|農曆|籤|親人|來電/],
 ['財務',/收入|支出|現金|淨資產|股利|薪|稅|貸款|投資|存款|利息|租金|房|買了|賣了|保險|基金|專案|年度收支|補貼|繳|費用|NT\$/],
 ['家庭與感情',/伴侶|結婚|孩子|孫|家人|父母|爸|媽|朋友|戀愛|約會|離婚|兄弟|姊妹|告白|分手|婚禮|親戚|寵物|阿公|阿嬤|長輩|家族|同學|校風/],
 ['健康',/健康|生病|醫|病|手術|壓力|憂鬱|受傷|住院|運動|睡眠|癌|復健|感冒|發燒|喉嚨|失能|提不起勁|擦撞|倒地|吃藥|長照|換季|倒下/],
 ['事業與學業',/公司|工作|職|升|學校|考|畢業|創業|股東|董事|客戶|老闆|同事|上班|成績|大學|選舉|參選|任期|施政/]
];
function lgCat(t){for(const [n,re] of LGC)if(re.test(t))return n;return '其他'}
(function(){
 try{const st=document.createElement('style');st.textContent='.yr>h4.yh{cursor:pointer;display:flex;align-items:center;gap:6px}.yr>h4.yh::after{content:"展開";margin-left:auto;font-size:12px;font-weight:400;color:var(--acc)}.yr>h4.yh.op::after{content:"收合"}.cgh{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--acc);margin:8px 0 2px;cursor:pointer;letter-spacing:1px}.cgh::after{content:"";flex:1;height:1px;background:var(--line)}.cgh b{font-weight:600}';document.head.appendChild(st)}catch(e){}
})();
const _r99=render;
render=function(){
 _r99();
 try{
  if(!S)return;const f=$('feed');if(!f||!f.querySelectorAll)return;
  const els=[...f.querySelectorAll('.yr')];if(!els.length)return;
  view.fo=view.fo||{};
  els.forEach((el,i)=>{
   if(el.dataset&&el.dataset.p99)return;el.dataset.p99='1';
   const h4=el.querySelector('h4');if(!h4)return;
   const age=parseInt(h4.textContent)||i,last=i===els.length-1;
   const kids=[...el.children].filter(c=>c!==h4),body=document.createElement('div');
   const lines=kids.filter(c=>c.classList&&c.classList.contains('ln')),others=kids.filter(c=>!(c.classList&&c.classList.contains('ln')));
   others.forEach(c=>body.appendChild(c));
   const only=!!(lsGet(PREFK,{}).hl);
   const hl=lines.filter(l=>TLKEY.test(l.textContent||'')).slice(0,3);
   if(hl.length){
    const hk='h'+age,hh=document.createElement('div'),hb=document.createElement('div');
    hh.className='cgh';hh.innerHTML=`<b>重點</b>（${hl.length}）`;
    hl.forEach(l=>{const c=l.cloneNode(true);hb.appendChild(c)});
    const ho2=()=>view.fo[hk]==null?true:view.fo[hk];
    const ap2=()=>{hb.style.display=ho2()?'':'none'};
    hh.onclick=()=>{view.fo[hk]=!ho2();ap2()};ap2();body.appendChild(hh);body.appendChild(hb);
   }
   if(only&&!hl.length){
    const fb=document.createElement('div');
    const pick=lines.filter(l=>!/^(影響：|你的錢不夠|（)/.test(l.textContent||'')).slice(0,2);
    if(pick.length)pick.forEach(l=>fb.appendChild(l.cloneNode(true)));
    else{fb.className='ln';fb.style.opacity='.6';fb.textContent='這一年沒有特別事件，數值變化來自成長與日常起伏。'}
    body.appendChild(fb);
   }
   const groups={};
   let pc='其他';lines.forEach(l=>{const t=l.textContent||'';let c=/^(影響：|你的錢不夠|（)/.test(t)?pc:lgCat(t);pc=c;(groups[c]=groups[c]||[]).push(l)});
   const order=['家庭與感情','事業與學業','健康','生活與社會','財務','世界與經濟','其他'];
   order.forEach(name=>{
    const arr=groups[name];if(!arr||!arr.length)return;
    const gk='g'+age+name,ho=document.createElement('div'),gb=document.createElement('div');
    ho.className='cgh';ho.innerHTML=`<b>${name}</b>（${arr.length}）`;
    arr.forEach(l=>gb.appendChild(l));
    const def=last&&name===order.find(n=>groups[n]&&groups[n].length&&n!=='世界與經濟'&&n!=='財務');
    const isOpen=()=>view.fo[gk]==null?def:view.fo[gk];
    const ap=()=>{gb.style.display=isOpen()?'':'none';ho.style.opacity=isOpen()?'1':'.75'};
    ho.onclick=()=>{view.fo[gk]=!isOpen();ap()};ap();
    if(only){ho.style.display='none';gb.style.display='none';ho.onclick=null}
    body.appendChild(ho);body.appendChild(gb);
   });
   el.appendChild(body);
   const yk='y'+age,isY=()=>view.fo[yk]==null?last:view.fo[yk];
   h4.classList.add('yh');
   const n=lines.length;if(!last&&n)h4.insertAdjacentHTML('beforeend',`<small>${n} 則</small>`);
   const apY=()=>{body.style.display=isY()?'':'none';h4.classList.toggle('op',isY())};
   h4.onclick=()=>{view.fo[yk]=!isY();apY()};apY();
  });
 }catch(e){}
};
