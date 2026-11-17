/* ---- p57：手機操作：年度變化摘要、重點數字標粗、左右滑動換分頁 ---- */
const YSK=[['happy','快樂'],['health','健康'],['smarts','智力'],['looks','外貌'],['stress','壓力']];
const _au57=ageUp;ageUp=function(){try{if(S&&!S.dead&&!busy){S.ys0={m:S.money,nw:(typeof netWorth==='function'?netWorth():S.money)};YSK.forEach(([k])=>S.ys0[k]=S[k]||0)}}catch(e){}_au57()};
const _ey57=endYear;endYear=function(){try{const L=S.log&&S.log[S.log.length-1],o=S.ys0;if(L&&o&&!L.d){const d={m:S.money-o.m,nw:(typeof netWorth==='function'?netWorth():S.money)-o.nw};YSK.forEach(([k])=>d[k]=(S[k]||0)-o[k]);L.d=d}}catch(e){}_ey57()};
const ysFmt=v=>{const a=Math.abs(Math.round(v));return a>=1e8?(a/1e8).toFixed(1)+' 億':a>=1e4?Math.round(a/1e4)+' 萬':String(a)};
function ysChips(d){if(!d)return '';let h='<div class="ys">';const c=(l,v,fmt,inv)=>{const r=Math.round(v);if(!r)return;const good=inv?r<0:r>0;h+=`<span class="${good?'g':'b'}">${l} ${r>0?'+':'−'}${fmt?ysFmt(v):Math.abs(r)}</span>`};
 c('現金',d.m,1);c('淨資產',d.nw,1);YSK.forEach(([k,n])=>c(n,d[k],0,k==='stress'));return h+'</div>'}
const BOLDRE=/(NT\$\s?[\d,.]+(?:\s?[萬億])?|[\d,.]+\s?(?:萬|億)(?:元)?|[+-−]?\d+(?:\.\d+)?%|\d+\s?歲)/g;
const _r57=render;render=function(){_r57();try{if(!S)return;const f=$('feed');if(!f||!f.querySelectorAll)return;const logs=S.log.filter(y=>y.lines.length),els=f.querySelectorAll('.yr');if(!els||!els.length||els.length!==logs.length)return;
 for(let i=Math.max(0,logs.length-4);i<logs.length;i++){const el=els[i],y=logs[i];if(!el||el.dataset&&el.dataset.p57)continue;
  el.querySelectorAll('.ln').forEach(n=>{n.innerHTML=n.innerHTML.replace(BOLDRE,'<b>$1</b>')});
  const h4=el.querySelector('h4');if(h4&&y.d)h4.insertAdjacentHTML('afterend',ysChips(y.d));if(el.dataset)el.dataset.p57=1}}catch(e){}};
/* 左右滑動換分頁 */
(function(){try{const TB=['job','rel','act','ast','more'];let x0=null,y0=null,t0=0,ok=false;const sh=document.getElementById('sheet');if(!sh||!sh.addEventListener)return;
 sh.addEventListener('touchstart',e=>{const t=e.touches&&e.touches[0];if(!t){x0=null;return}x0=t.clientX;y0=t.clientY;t0=Date.now();const tg=e.target;ok=!(tg&&tg.closest&&tg.closest('input,textarea,select,canvas,.scrollx,[data-noswipe]'))},{passive:true});
 sh.addEventListener('touchend',e=>{if(x0==null||!ok)return;const t=e.changedTouches&&e.changedTouches[0];if(!t)return;const dx=t.clientX-x0,dy=t.clientY-y0;x0=null;if(Math.abs(dx)<90||Math.abs(dy)>45||Date.now()-t0>600)return;if(!S||typeof view==='undefined'||view.sub)return;const i=TB.indexOf(view.tab);if(i<0)return;const n=i+(dx<0?1:-1);if(n<0||n>=TB.length)return;showSheet(TB[n]);try{const p=lsGet(PREFK,{});if(navigator.vibrate&&!p.rm)navigator.vibrate(8)}catch(_){}},{passive:true})}catch(e){}})();
(function(){try{const s=document.createElement('style');s.textContent='.ys{display:flex;flex-wrap:wrap;gap:6px;margin:2px 0 6px}.ys span{font-size:12px;padding:2px 8px;border-radius:10px;background:rgba(0,0,0,.05)}.ys .g{color:var(--good)}.ys .b{color:var(--bad)}.ln b{font-weight:700}';document.head&&document.head.appendChild(s)}catch(e){}})();
