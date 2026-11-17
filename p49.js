/* ---- p49：結果碼與朋友結果並排比較 ---- */
const LASTK='lifesim_tw_last_v1';
function resCode(){const d=sumData();const o={s:S.seed||'',n:d.name,a:d.age,w:Math.round(netWorth()/1e4),t:d.title,e:d.edu,k:d.kids,c:d.ctr.length,p:ptTitle(),m:d.chal};try{return btoa(unescape(encodeURIComponent(JSON.stringify(o))))}catch(e){return ''}}
function resParse(t){try{return JSON.parse(decodeURIComponent(escape(atob((t||'').trim()))))}catch(e){return null}}
const _die49=die;die=function(c){_die49(c);try{S.cause=S.cause||c;lsSet(LASTK,{code:resCode()})}catch(e){}};
const _sh49=sumHTML;sumHTML=function(){const c=resCode();return _sh49().replace('<div style="display:flex;gap:6px;margin-top:8px">',`<div class="sub" style="word-break:break-all">結果碼（貼給朋友比較）：<span id="resCode">${c}</span></div><div style="display:flex;gap:6px;margin-top:8px">`)};
function cmpRow(l,a,b){return `<tr><td>${l}</td><td>${esc(String(a))}</td><td>${esc(String(b))}</td></tr>`}
function cmpHTML(){
 const me=resParse((lsGet(LASTK,{})||{}).code);let h='<div class="sec">與朋友比較結果</div><div class="sub">用相同種子代碼開局，人生結束後把「結果碼」貼給對方，就能並排比較。</div>';
 h+='<textarea id="cmpBox" rows="2" style="width:100%;border:1px solid var(--line);border-radius:10px;padding:8px;font-size:13px" placeholder="貼上朋友的結果碼"></textarea><button class="btn" data-a="lf:dx:cmp">比較</button>';
 const f=resParse(view.cmpCode);
 if(view.cmpCode&&!f)h+='<div class="sub">結果碼格式不正確。</div>';
 if(f){if(!me)h+='<div class="sub">你還沒有完成任何一局，只顯示朋友的結果。</div>';const m=me||{};
  h+=`<table style="width:100%;font-size:13px;border-collapse:collapse"><tr><td></td><td><b>你</b></td><td><b>朋友</b></td></tr>${cmpRow('姓名',m.n||'—',f.n)}${cmpRow('種子',m.s||'—',f.s)}${cmpRow('享年',m.a!=null?m.a:'—',f.a)}${cmpRow('淨資產（萬）',m.w!=null?m.w:'—',f.w)}${cmpRow('結局',m.t||'—',f.t)}${cmpRow('學歷',m.e||'—',f.e)}${cmpRow('子女',m.k!=null?m.k:'—',f.k)}${cmpRow('足跡（國）',m.c!=null?m.c:'—',f.c)}${cmpRow('個性',m.p||'—',f.p)}${cmpRow('模式',m.m||'—',f.m)}</table>`;
  if(me&&me.s&&me.s===f.s)h+='<div class="sub">你們用的是同一個種子，開局相同，差別都來自後來的選擇。</div>'}
 return h;
}
const _dx49=dxHTML;dxHTML=function(){return _dx49().replace('<button class="btn" data-a="back">← 返回</button>',cmpHTML()+'<button class="btn" data-a="back">← 返回</button>')};
const _lf49=lfHandle;lfHandle=function(x,y,z,u){if(x==='dx'&&y==='cmp'){let t='';try{t=document.getElementById('cmpBox').value}catch(e){}view.cmpCode=t;return null}return _lf49(x,y,z,u)};
