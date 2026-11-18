// 簡單模式條件解鎖、事件重複衰減、累進稅、分享圖片
const _ah102=astHTML;
astHTML=function(){
 let h=_ah102();
 try{
  const p=lsGet(PREFK,{});if(p.simple===false||!S||S.age>=16||view.pjOn)return h;
  const box=document.createElement('div');box.innerHTML=h;
  const hide=/房屋|買車|投資組合|數字依據|大型投資/;
  [...box.children].forEach(ch=>{if(ch.classList&&ch.classList.contains('sec')&&hide.test(ch.textContent||'')){let n=ch.nextElementSibling;while(n&&!(n.classList&&n.classList.contains('sec'))){const d=n;n=n.nextElementSibling;d.remove()}ch.remove()}
   else if(ch.tagName==='BUTTON'&&/大型投資/.test(ch.textContent||''))ch.remove()});
  return box.innerHTML;
 }catch(e){return h}
};
const _mh102=moreHTML;
moreHTML=function(){
 let h=_mh102();
 try{
  const p=lsGet(PREFK,{});if(p.simple===false||!S||S.age>=13)return h;
  const box=document.createElement('div');box.innerHTML=h;
  box.querySelectorAll('.tile').forEach(t=>{if(/戀愛與人脈/.test(t.textContent||''))t.remove()});
  return box.innerHTML;
 }catch(e){return h}
};
/* 事件重複衰減（節慶與疾病除外） */
const EVKEEP=/^(cny|sick|valen|qixi|xmas|moon|anniv|argue|ot_|xot)/;
E.forEach(e=>{
 if(e.__d)return;e.__d=1;
 const f=e.if,r=e.run;
 e.if=function(){
  const ok=f?f.apply(this,arguments):true;if(!ok)return false;
  try{const n=(S.evc&&S.evc[e.id])||0;if(n>=2&&!EVKEEP.test(e.id)){const pr=n>=4?.8:.5;if(Math.random()<pr)return false}}catch(x){}
  return true;
 };
 e.run=function(){try{S.evc=S.evc||{};S.evc[e.id]=(S.evc[e.id]||0)+1}catch(x){}return r.apply(this,arguments)};
});
/* 累進稅：薪資越高稅率越高（以該國平均年薪為基準） */
const _js102=jobSal;
jobSal=function(j){
 try{
  cnInit();if(S.cn==='TW')return _js102(j);
  const c=CNS[S.cn],rel=j.sal/761000*langF(S.cn),t=Math.min(.55,c.tax*Math.max(.6,Math.min(1.5,.6+.4*rel)));
  return Math.round(j.sal*(wTW(S.cn)/761000)*langF(S.cn)*(1-t)/(1-.09));
 }catch(e){return _js102(j)}
};
/* 人生故事 → 分享圖片 */
const _ss102=showStory;
showStory=function(){
 _ss102();
 try{
  const mb=document.getElementById('modalBody'),b=document.getElementById('stBack');if(!mb||!b)return;
  b.insertAdjacentHTML('beforebegin','<button class="btn" id="stImg">產生分享圖片（長按儲存）</button>');
  document.getElementById('stImg').onclick=()=>{
   try{
    const t=lifeStory(),W=720,pad=44,c=document.createElement('canvas'),g0=c.getContext('2d');
    g0.font='28px sans-serif';
    const lines=[];t.split('\n').forEach(par=>{let cur='';for(const ch of par){if(g0.measureText(cur+ch).width>W-pad*2){lines.push(cur);cur=ch}else cur+=ch}lines.push(cur)});
    const H=Math.max(640,200+lines.length*40+90);c.width=W;c.height=H;const g=c.getContext('2d');
    g.fillStyle='#f6efe6';g.fillRect(0,0,W,H);g.fillStyle='#c0553a';g.fillRect(0,0,W,14);
    g.fillStyle='#3a2a22';g.font='bold 44px sans-serif';g.fillText('人生故事',pad,96);
    g.font='28px sans-serif';g.fillStyle='#4a3a30';lines.forEach((l,i)=>g.fillText(l,pad,160+i*40));
    g.fillStyle='#8a7a6c';g.font='22px sans-serif';g.fillText('© 2026 yu-tinglu　人生模擬器',pad,H-34);
    const u=c.toDataURL('image/png');let o=document.getElementById('sumImg');
    if(!o){o=document.createElement('div');o.id='sumImg';o.style.cssText='position:fixed;inset:0;z-index:99;background:rgba(0,0,0,.85);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px;gap:10px';document.body.appendChild(o)}
    o.innerHTML=`<img src="${u}" style="max-width:100%;max-height:78vh;border-radius:10px"><div style="color:#fff;font-size:13px">長按圖片即可儲存</div><button class="btn" id="sumImgX">關閉</button>`;
    o.style.display='flex';document.getElementById('sumImgX').onclick=()=>{o.style.display='none'};
   }catch(e){}
  };
 }catch(e){}
};
