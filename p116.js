/* ---- p116：「更多」頁嚴格分類：每個功能只出現在一個固定類別 ---- */
const MCATX=[
 ['人物與成長',['lf:stat','lf:skill','lf:av','lf:art','lf:mind','lf:health']],
 ['家庭與感情',['lf:tree','lf:cg']],
 ['學業與事業',['lf:edu','lf:cook','lf:wk']],
 ['財務資訊',['lf:si','lf:ch','open:eco']],
 ['社會與世界',['lf:pol','lf:eth','lf:rg','lf:wd']],
 ['紀錄與傳承',['lf:tl','lf:rev','lf:ach','lf:dx','lf:sv','open:lg']],
 ['系統與說明',['lf:tour','lf:set','lf:help','lf:legal']]
];
const _mh116=moreHTML;
moreHTML=function(){
 const h=_mh116(),tiles={};
 (h.match(/<button class="tile"[^>]*>[\s\S]*?<\/button>/g)||[]).forEach(t=>{const m=t.match(/data-a="([^"]+)"/);if(m&&!tiles[m[1]])tiles[m[1]]=t});
 const used={},inp='<input type="search" id="tq" placeholder="搜尋功能或人生紀錄（例如：房、股、結婚）" style="width:100%;margin:6px 0;padding:10px;border-radius:12px;border:1px solid var(--line)" oninput="moreSearch(this.value)">';
 view.mco=view.mco||{};
 const cats=MCATX.map(([n,ks])=>[n,ks.filter(k=>tiles[k]&&!used[k]&&(used[k]=1))]);
 const TABOWN=['open:rel','open:act','open:ast','open:job','lf:led','lf:hs','open:cn','rom:go:h'];
 const rest=Object.keys(tiles).filter(k=>!used[k]&&TABOWN.indexOf(k)<0);if(rest.length)cats.push(['其他',rest]);
 return inp+'<div class="sub" style="margin:2px 0 8px">職業、關係、活動、資產在下方分頁；這裡放其他功能。</div>'+cats.filter(c=>c[1].length).map(([n,ks],i)=>{
  const open=!!view.mco[i];
  return `<button class="msec" data-a="mc:${i}"><span>${n}（${ks.length}）</span><span>${open?'收合':'展開'}</span></button><div class="grid" data-cl="${open?0:1}" style="${open?'':'display:none'}">${ks.map(k=>tiles[k]).join('')}</div>`}).join('');
};
const _ah116=actHTML;
actHTML=function(){return _ah116().replace(/<button[^>]*data-a="lf:cook"[^>]*>[\s\S]*?<\/button>/g,'')};
const _ms116=moreSearch;
moreSearch=function(v){
 const q=String(v||'').trim();
 document.querySelectorAll('.grid[data-cl]').forEach(g=>{g.style.display=q?'':(g.dataset.cl==='1'?'none':'')});
 return _ms116(v);
};
