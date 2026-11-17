/* ---- p50：行動體驗（觸覺回饋、按壓回饋）---- */
(function(){try{
 const st=document.createElement('style');st.textContent='.btn,.tile,.tab{transition:transform .08s ease,background .15s ease}.btn:active,.tile:active,.tab:active{transform:scale(.97)}';document.head.appendChild(st);
 document.addEventListener('click',e=>{try{const t=e.target&&e.target.closest&&e.target.closest('.btn,.tile,.tab');if(!t||!navigator.vibrate)return;const p=lsGet(PREFK,{});if(p.rm)return;navigator.vibrate(8)}catch(x){}},true);
}catch(e){}})();
const _tst50=toast;toast=function(t){try{const p=lsGet(PREFK,{});if(navigator.vibrate&&!p.rm&&/成就|死亡|結束/.test(String(t)))navigator.vibrate([20,40,20])}catch(e){}return _tst50(t)};
