/* ---- p45：種子代碼（朋友同一人生）與可及性 ---- */
const NATIVE_RND=Math.random.bind(Math);
function seedHash(s){let h=1779033703^s.length;for(let i=0;i<s.length;i++){h=Math.imul(h^s.charCodeAt(i),3432918353);h=h<<13|h>>>19}return (h^h>>>16)>>>0}
function mkRnd(seed){let a=seedHash(seed);return function(){a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function seedCode(){const c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let s='';for(let i=0;i<6;i++)s+=c[Math.floor(NATIVE_RND()*c.length)];return s}
const _ng45=newGame;
newGame=function(n,sx){const code=((window.__seed||'')+'').trim().toUpperCase().slice(0,12)||seedCode();window.__seed='';Math.random=mkRnd(code);_ng45(n,sx);S.seed=code};
const _ss45=showStart;showStart=function(){_ss45();try{const go=$('go');if(!go||!go.insertAdjacentHTML)return;go.insertAdjacentHTML('beforebegin','<input type="text" id="seedIn" placeholder="種子代碼（選填，與朋友輸入相同代碼會有相同的開局）" maxlength="12" style="width:100%;margin-top:8px;padding:10px;border-radius:12px;border:1px solid var(--line)">');
 const si=document.getElementById('seedIn');if(si)si.oninput=()=>{window.__seed=si.value}}catch(e){}};
/* 總結卡與年表加上種子代碼 */
const _sd45=sumData;sumData=function(){const d=_sd45();d.seed=S.seed||'';return d};
const _sh45=sumHTML;sumHTML=function(){return _sh45().replace('<div class="sub">','<div class="sub">種子代碼 '+esc(S.seed||'—')+'　',1)};
const _lt45=lifeText;lifeText=function(){return _lt45()+(S.seed?`\n種子代碼：${S.seed}（輸入相同代碼可從相同開局挑戰）`:'')};
const _sc45=sumCanvas;sumCanvas=function(){const c=_sc45();try{const g=c.getContext('2d');g.fillStyle='#8a7a6e';g.font='22px sans-serif';g.fillText('種子代碼 '+(S.seed||'—'),40,c.height-40)}catch(e){}return c};
/* 可及性 */
(function(){try{const st=document.createElement('style');st.textContent='.rm *{animation:none!important;transition:none!important;scroll-behavior:auto!important}@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}.hc{--line:#000;--mute:#222}.hc .btn,.hc .tile,.hc .card{border:2px solid #000!important}.hc .sub,.hc small{color:#222!important}html.dark.hc{--line:#fff;--mute:#ddd}html.dark.hc .btn,html.dark.hc .tile,html.dark.hc .card{border-color:#fff!important}html.dark.hc .sub,html.dark.hc small{color:#ddd!important}';document.head.appendChild(st)}catch(e){}})();
applyPref=function(){
 const p=lsGet(PREFK,{th:'auto',fs:1});
 try{const dk=p.th==='dark'||(p.th==='auto'&&typeof matchMedia==='function'&&matchMedia('(prefers-color-scheme:dark)').matches),de=document.documentElement;
  de.classList.toggle('dark',!!dk);de.classList.toggle('rm',!!p.rm);de.classList.toggle('hc',!!p.hc);document.body.style.zoom=[.92,1,1.12,1.3][p.fs==null?1:p.fs]}catch(e){}
};
applyPref();
const _set45=setHTML;
setHTML=function(){const p=lsGet(PREFK,{th:'auto',fs:1}),sg=(k,arr,cur)=>`<div class="seg" style="margin:6px 0">${arr.map(([v,t])=>`<button class="${cur===v?'on':''}" data-a="lf:set:${k}:${v}">${t}</button>`).join('')}</div>`;
 const h=_set45().replace(/<button class="[^"]*" data-a="lf:set:fs:2">大<\/button>/,m=>m+`<button class="${String(p.fs)==='3'?'on':''}" data-a="lf:set:fs:3">特大</button>`);
 return h.replace('<div class="sec">存檔匯出／匯入</div>',`<div class="sec">減少動畫</div>${sg('rm',[['0','關'],['1','開']],p.rm?'1':'0')}<div class="sec">高對比</div>${sg('hc',[['0','關'],['1','開']],p.hc?'1':'0')}<div class="sec">存檔匯出／匯入</div>`)};
const _lf45=lfHandle;lfHandle=function(x,y,z,u){if(x==='set'&&(y==='rm'||y==='hc')){const p=lsGet(PREFK,{th:'auto',fs:1});p[y]=z==='1';lsSet(PREFK,p);applyPref();return null}return _lf45(x,y,z,u)};
/* 2026 年起為模型模擬：標示與波動度設定 */
const _mr45=mktRet;
mktRet=function(y,cr,g,fxu){const r=_mr45(y,cr,g,fxu),p=lsGet(PREFK,{}),v=p.vol==null?1:+p.vol;if(y>2026&&v!==1){for(const k of ['bond','tw','us','jp','eu','em','reit','gold'])if(r[k]!=null)r[k]=(r[k]-.05)*v+.05}return r};
const _pf45=pfHTML;pfHTML=function(){return _pf45()+'<p class="sub">2026 年之後的報酬為模型模擬，不是預測；可在設定調整市場波動度。</p>'};
const _set46=setHTML;setHTML=function(){const p=lsGet(PREFK,{}),cur=String(p.vol==null?1:p.vol);return _set46().replace('<div class="sec">存檔匯出／匯入</div>',`<div class="sec">未來市場波動度（2026 年起為模型模擬，非預測）</div><div class="seg" style="margin:6px 0">${[['0.5','平穩'],['1','標準'],['1.6','劇烈']].map(([v,t])=>`<button class="${cur===v?'on':''}" data-a="lf:set:vol:${v}">${t}</button>`).join('')}</div><div class="sec">存檔匯出／匯入</div>`)};
const _lf46=lfHandle;lfHandle=function(x,y,z,u){if(x==='set'&&y==='vol'){const p=lsGet(PREFK,{th:'auto',fs:1});p.vol=+z;lsSet(PREFK,p);return null}return _lf46(x,y,z,u)};
