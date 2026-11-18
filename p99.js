// 年度紀錄：今年展開、舊年份收合、依類別分組
const LGC=[
 ['世界與經濟',/世界新聞|央行|經濟成長|CPI|景氣|戰爭|疫情|政策|基本工資|普發|匯率|利率|通膨|房價指數|股市|油價|選舉結果|遊戲隨機事件/],
 ['財務',/收入|支出|現金|淨資產|股利|薪|稅|貸款|投資|存款|利息|租金|房|買了|賣了|保險|基金|專案|年度收支|補貼|繳|費用|NT\$/],
 ['家庭與感情',/伴侶|結婚|孩子|孫|家人|父母|爸|媽|朋友|戀愛|約會|離婚|兄弟|姊妹|告白|分手|婚禮|親戚|寵物/],
 ['健康',/健康|生病|醫|病|手術|壓力|憂鬱|受傷|住院|運動|睡眠|癌|復健/],
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
   const groups={};
   lines.forEach(l=>{const c=lgCat(l.textContent||'');(groups[c]=groups[c]||[]).push(l)});
   const order=['家庭與感情','事業與學業','健康','財務','世界與經濟','其他'];
   order.forEach(name=>{
    const arr=groups[name];if(!arr||!arr.length)return;
    const gk='g'+age+name,ho=document.createElement('div'),gb=document.createElement('div');
    ho.className='cgh';ho.innerHTML=`<b>${name}</b>（${arr.length}）`;
    arr.forEach(l=>gb.appendChild(l));
    const def=name!=='世界與經濟'&&name!=='財務'&&last;
    const isOpen=()=>view.fo[gk]==null?def:view.fo[gk];
    const ap=()=>{gb.style.display=isOpen()?'':'none';ho.style.opacity=isOpen()?'1':'.75'};
    ho.onclick=()=>{view.fo[gk]=!isOpen();ap()};ap();
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
