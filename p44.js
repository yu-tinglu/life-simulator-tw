/* ---- p44：介面分類、常用功能、新手教學、總結卡改為長按儲存 ---- */
const MCAT=[['人生記錄',['lf:ach','lf:tree','lf:rev','lf:tl','lf:ch','lf:dx']],['生活與家庭',['lf:stat','open:act','open:rel','lf:pol','lf:art','lf:health','lf:eth','lf:rg','lf:skill']],['財務與職涯',['lf:led','open:job','open:ast','open:eco','lf:hs','lf:si']],['世界',['lf:wd']],['系統',['lf:sv','lf:set','lf:help']]];
const FQK='lifesim_tw_freq_v1';
const _hd44=handle;handle=function(a){try{if(typeof a==='string'&&/^(lf:[a-z]+|open:[a-z]+)$/.test(a)){const f=lsGet(FQK,{});f[a]=(f[a]||0)+1;lsSet(FQK,f)}}catch(e){}return _hd44(a)};
const _mh44=moreHTML;
moreHTML=function(){
 const src=_mh44(),sm=src.match(/<input type="search"[^>]*>/),search=sm?sm[0]:'';
 const tiles=src.match(/<button class="tile"[^>]*>[\s\S]*?<\/button>/g)||[];
 const by={};tiles.forEach(t=>{const m=t.match(/data-a="([^"]+)"/);if(m)by[m[1]]=t});
 const used={};const f=lsGet(FQK,{});
 const top=Object.keys(f).filter(k=>by[k]).sort((a,b)=>f[b]-f[a]).slice(0,3);
 let h=search;
 if(top.length)h+=`<div class="sec">常用</div><div class="grid">${top.map(k=>by[k]).join('')}</div>`;
 MCAT.forEach(([n,ks])=>{const v=ks.filter(k=>by[k]);v.forEach(k=>used[k]=1);if(v.length)h+=`<div class="sec">${n}</div><div class="grid">${v.map(k=>by[k]).join('')}</div>`});
 const rest=Object.keys(by).filter(k=>!used[k]);if(rest.length)h+=`<div class="sec">其他</div><div class="grid">${rest.map(k=>by[k]).join('')}</div>`;
 return h;
};
/* 總結卡：顯示圖片供長按儲存（檢視器不允許直接下載）*/
const _sb44=sumBind;sumBind=function(){_sb44();const dl=document.getElementById('sumDl');if(dl){dl.textContent='產生圖片';dl.onclick=()=>{try{const u=sumCanvas().toDataURL('image/png');let o=document.getElementById('sumImg');if(!o){o=document.createElement('div');o.id='sumImg';o.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:120;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:12px';document.body.appendChild(o)}o.innerHTML=`<img src="${u}" style="max-width:100%;max-height:78%;border-radius:12px"><div style="color:#fff;font-size:14px">長按圖片即可儲存或分享</div><button class="btn" id="sumImgX">關閉</button>`;o.style.display='flex';document.getElementById('sumImgX').onclick=()=>{o.style.display='none'}}catch(e){toast('無法產生圖片')}}}};
