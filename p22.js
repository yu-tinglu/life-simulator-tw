/* ---- 開場畫面 v2：首頁 → 新人生（兩步）→ 存檔 ---- */
showStart=function(){
 const sv=[0,1,2].map(slotLoad);
 const B_=$('startBody'),st=$('start');
 let step=sv.some(x=>x)?'home':'new1',sx='男',ori='隨機',diff=1,nm='';
 const emptyIdx=sv.findIndex(x=>!x);let tgt=emptyIdx>=0?emptyIdx:CURSLOT;
 const last=(()=>{let b=-1;sv.forEach((s,i)=>{if(s&&(b<0||(s.age!=null&&i===CURSLOT)))b=i});return b})();
 const DIFF=[['休閒','生活費較低、壓力較小','約 −10% 生活費'],['寫實','依台灣統計的一般人生','預設'],['地獄','生活費高、身心負擔重','約 +12% 生活費']];
 const logo=`<svg class="logo" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" stroke-opacity=".15" stroke-width="2"/><path d="M14 78C30 40 52 96 70 58s24-26 36-8" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="14" cy="78" r="5" fill="currentColor"/><circle cx="106" cy="50" r="7" fill="none" stroke="currentColor" stroke-width="4"/></svg>`;
 const cont=i=>{CURSLOT=i;try{localStorage.setItem('lifesim_slot',CURSLOT)}catch(e){}S=sv[i];busy=false;queue=[];st.classList.remove('on');render()};
 const card=(i,big)=>{const s=sv[i];return s?`<button class="scard ${big?'big':''}" data-c="${i}"><span class="sc-av">${S0av(s)}</span><span class="sc-tx"><b>${esc(s.name)}</b><small>${s.age} 歲・第 ${s.gen||1} 代・現金 ${money(s.money)}</small></span><span class="sc-go">繼續</span></button>`:`<div class="scard empty"><span class="sc-tx"><small>存檔 ${i+1}・空</small></span></div>`};
 function S0av(s){return s.age<3?'👶':s.age<19?'🧑‍🎓':s.age<60?(s.sx==='女'?'👩':'👨'):(s.sx==='女'?'👵':'👴')}
 const draw=()=>{
  let h='';
  if(step==='home'){
   h=`<div class="hero">${logo}<h1>人生模擬器</h1><p>從出生到離世，每個選擇都會寫進你的一生。</p></div>
   ${last>=0?card(last,true):''}
   <button class="btn p" data-go="new1">開始新的人生</button>
   ${sv.filter(x=>x).length>1?`<button class="lnk" data-go="slots">所有存檔</button>`:''}`;
  }else if(step==='slots'){
   h=`<h2>所有存檔</h2>${[0,1,2].map(i=>card(i,false)).join('')}<button class="lnk" data-go="home">← 返回</button>`;
  }else if(step==='new1'){
   h=`${sv.some(x=>x)?'':`<div class="hero" style="margin-bottom:18px">${logo}<h1>人生模擬器</h1><p>從出生到離世，每個選擇都會寫進你的一生。</p></div>`}<div class="stp">1／2</div><h2>你是誰？</h2>
   <input type="text" id="nm" placeholder="姓名（留空則隨機）" maxlength="6" value="${esc(nm)}">
   <div class="two"><button class="pick ${sx==='男'?'on':''}" data-s="男">♂<b>男生</b></button><button class="pick ${sx==='女'?'on':''}" data-s="女">♀<b>女生</b></button></div>
   <button class="btn p" data-go="new2">下一步</button>${sv.some(x=>x)?`<button class="lnk" data-go="home">← 返回</button>`:''}`;
  }else{
   const full=emptyIdx<0;
   h=`<div class="stp">2／2</div><h2>選擇難度</h2>
   <div class="dlist">${DIFF.map((d,i)=>`<button class="dcard ${diff===i?'on':''}" data-d="${i}"><b>${d[0]}</b><small>${d[1]}</small></button>`).join('')}</div>
   <details class="adv"><summary>進階：戀愛傾向（預設隨機）</summary><div class="seg">${['隨機','異性戀','同性戀','雙性戀'].map(o=>`<button class="${ori===o?'on':''}" data-o="${o}">${o}</button>`).join('')}</div></details>
   ${full?`<div class="sub" style="margin-top:12px">存檔已滿，要覆蓋哪一格？</div><div class="seg">${[0,1,2].map(i=>`<button class="${tgt===i?'on':''}" data-n="${i}">存檔 ${i+1}</button>`).join('')}</div>`:''}
   <button class="btn p" id="go">出生！</button><button class="lnk" data-go="new1">← 上一步</button>`;
  }
  B_.innerHTML=h;st.classList.add('on');
  B_.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{const n=$('nm');if(n)nm=n.value;step=b.dataset.go;draw()});
  B_.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{nm=$('nm').value;sx=b.dataset.s;draw()});
  B_.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{ori=b.dataset.o;draw();const d=B_.querySelector('details');if(d)d.open=true});
  B_.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{diff=+b.dataset.d;draw()});
  B_.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{tgt=+b.dataset.n;draw();const d=B_.querySelector('details');if(d&&ori!=='隨機')d.open=true});
  B_.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>cont(+b.dataset.c));
  const go=$('go');if(go)go.onclick=()=>{CURSLOT=tgt;try{localStorage.setItem('lifesim_slot',CURSLOT)}catch(e){}newGame(nm.trim(),sx);S.ori=oriPick(ori);S.diff=diff;st.classList.remove('on');render();save();if(!lsGet('lifesim_tw_tut',0))tutorial()};
 };
 draw();
};
