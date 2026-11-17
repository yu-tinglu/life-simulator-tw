/* ===== p40：多存檔、人生時間軸、走勢圖、介面（去 emoji、搜尋） ===== */
const SLK='lifesim_tw_slots_v1';
function slRead(){try{return JSON.parse(localStorage.getItem(SLK)||'{}')||{}}catch(e){return {}}}
function slWrite(o){try{localStorage.setItem(SLK,JSON.stringify(o));return true}catch(e){return false}}
function svHTML(){
 const o=slRead();let h='<h3>時光回溯點</h3><div class="sub">在人生的某一刻手動留下回溯點（共 3 個），之後可以回到那一年重新選擇。與自動存檔欄位分開；讀取後會取代目前這局。</div>';
 for(let i=1;i<=3;i++){const s=o[i],d=s&&s.d;
  h+=`<div class="card"><b>欄位 ${i}</b>　${d?`${esc(d.name)}・${d.age} 歲・${(CNAME&&CNAME[d.cn])||d.cn||''}・${esc(s.t||'')}`:'（空）'}<div style="display:flex;gap:6px;margin-top:6px"><button class="btn" data-a="lf:sv:save:${i}">在此刻留下回溯點</button><button class="btn" data-a="lf:sv:load:${i}" ${d?'':'disabled'}>讀取</button><button class="btn" data-a="lf:sv:del:${i}" ${d?'':'disabled'}>刪除</button></div></div>`}
 return h+'<button class="btn" data-a="back">← 返回</button>';
}
function slSave(i){const o=slRead(),n=new Date();o[i]={t:`${n.getFullYear()}/${n.getMonth()+1}/${n.getDate()}`,d:JSON.parse(JSON.stringify(S))};return slWrite(o)?G(`已在此刻留下回溯點 ${i}。`):B('儲存空間不足，無法存檔。')}
function slLoad(i){const s=slRead()[i];if(!s||!s.d)return B('這個欄位是空的。');S=s.d;busy=false;queue=[];try{mFix()}catch(e){}save();return G(`已回到回溯點 ${i}：${S.name}，${S.age} 歲。`)}
function slDel(i){const o=slRead();delete o[i];slWrite(o);return G(`已刪除欄位 ${i}。`)}
/* 時間軸：挑出重大事件 */
const TLKEY=/結婚|離婚|出生|畢業|考上|錄取|創業|升職|升遷|失業|資遣|買了|賣了|房|移民|搬到|過世|去世|車禍|癌|中風|詐騙|中獎|破產|入獄|判刑|成就解鎖|退休|戰爭|疫情|海嘯|地震|金融/;
function tlHTML(){
 let h='<h3>人生時間軸</h3><div class="sub">依序列出你人生中的重大時刻（由事件紀錄自動篩選）。</div>',n=0;
 for(const L of S.log){const ls=L.lines.filter(x=>TLKEY.test(x.t||'')).slice(0,3);if(!ls.length)continue;n++;
  h+=`<div class="yr"><h4>${L.age} 歲</h4>${ls.map(l=>`<div class="ln ${l.c}">${esc(l.t)}</div>`).join('')}</div>`}
 if(!n)h+='<p class="sub">目前還沒有重大事件。</p>';
 return h+'<button class="btn" data-a="back">← 返回</button>';
}
/* 走勢圖 */
function spark(vals,labels,fmt){
 if(!vals.length)return '';const W=300,H=110,P=6,mx=Math.max(...vals),mn=Math.min(...vals),r=(mx-mn)||1;
 const pts=vals.map((v,i)=>`${(P+i*(W-2*P)/Math.max(1,vals.length-1)).toFixed(1)},${(H-P-(v-mn)/r*(H-2*P)).toFixed(1)}`).join(' ');
 return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;background:var(--card);border-radius:12px"><polyline fill="none" stroke="#c0553a" stroke-width="2" points="${pts}"/></svg><div class="sub">${labels[0]} ～ ${labels[labels.length-1]}　最低 ${fmt(mn)}　最高 ${fmt(mx)}　目前 ${fmt(vals[vals.length-1])}</div>`;
}
function chHTML(){
 let h='<h3>走勢圖</h3>';const y0=S.year||calYear();
 try{hmEnsure();const c=Object.keys(S.hmi);h+=`<div class="sec">房價指數（相對初始，各城市）</div>`+c.map(k=>`<div class="sub">${(typeof HL!=='undefined'&&HL.find&&(HL.find(x=>x.id===k)||{}).n)||k}：${S.hmi[k].toFixed(2)}</div>`).join('')}catch(e){}
 const ys=[];for(let y=Math.max(2011,y0-25);y<=Math.min(2026,y0);y++)ys.push(y);
 if(ys.length>1&&typeof BTCM!=='undefined'){let v=1;const a=ys.map(y=>v*=(BTCM[y]||1));h+=`<div class="sec">比特幣累積倍數（真實年度報酬，${ys[0]}年起算 1）</div>`+spark(a,ys,x=>x.toFixed(1)+'x')}
 if(S.wh&&S.wh.length)h+=`<div class="sec">近期世界事件</div>`+S.wh.map(e=>`<div class="ln">${e.y}　${esc(e.n)}</div>`).join('');
 if(S.netHist&&S.netHist.length>1)h+=`<div class="sec">你的淨資產（萬）</div>`+spark(S.netHist.map(p=>p[1]/1e4),S.netHist.map(p=>p[0]+'歲'),x=>Math.round(x)+'萬');
 return h+'<button class="btn" data-a="back">← 返回</button>';
}
const _y40=yearly;yearly=function(){_y40();try{(S.netHist=S.netHist||[]).push([S.age,Math.round(netWorth())]);if(S.netHist.length>110)S.netHist.shift()}catch(e){}};
const _lf40=lfHandle,_l40=lifeHTML,_m40=moreHTML;
lfHandle=function(x,y,z,u){if(x==='sv'){if(y==='save')return slSave(z);if(y==='load')return slLoad(z);if(y==='del')return slDel(z);return null}if(x==='tl'||x==='ch')return null;return _lf40(x,y,z,u)};
lifeHTML=function(){return view.lsub==='sv'?svHTML():view.lsub==='tl'?tlHTML():view.lsub==='ch'?chHTML():_l40()};
moreHTML=function(){return _m40().replace('<button class="tile" data-a="lf:health">','<button class="tile" data-a="lf:tl"><b>史</b>人生時間軸<small>重大時刻回顧</small></button><button class="tile" data-a="lf:ch"><b>線</b>走勢圖<small>房價・比特幣・世界事件・資產</small></button><button class="tile" data-a="lf:sv"><b>回</b>時光回溯點<small>手動留下人生的某一刻</small></button><button class="tile" data-a="lf:health">')};
/* 開始畫面：列出存檔欄位 */
const _ss40=showStart;showStart=function(){_ss40();try{const o=slRead(),ks=Object.keys(o).filter(i=>o[i]&&o[i].d);if(ks.length){const b=$('startBody');b.insertAdjacentHTML('beforeend',ks.map(i=>`<button class="btn" data-sl="${i}">回到回溯點 ${i}：${esc(o[i].d.name)}（${o[i].d.age} 歲）</button>`).join(''));b.querySelectorAll('[data-sl]').forEach(x=>x.onclick=()=>{S=o[x.dataset.sl].d;busy=false;queue=[];try{mFix()}catch(e){}$('start').classList.remove('on');render()})}}catch(e){}};
/* 介面：去除 emoji、搜尋功能磚 */
const _mh40=moreHTML;
moreHTML=function(){return '<input type="search" id="tq" placeholder="搜尋功能（例如：房、股、宗教）" style="width:100%;margin:6px 0;padding:10px;border-radius:12px;border:1px solid var(--line)" oninput="var q=this.value.trim();document.querySelectorAll(\'.tile\').forEach(function(t){t.style.display=!q||t.textContent.indexOf(q)>=0?\'\':\'none\'})">'+_mh40()};
/* 資料查證標示 */
const _pfH40=pfHTML;pfHTML=function(){return _pfH40()+'<p class="sub">資料標示：2000–2025 年台股（TAIEX 價格指數加約 3% 股利）與美股（S&P 500 含息總報酬）採實際年度報酬；比特幣、以太幣為實際年度漲跌。債券、日股、歐股、新興市場、黃金、REITs 為模型估計。</p>'};
const _hsH40=hsHTML;hsHTML=function(){return _hsH40()+'<p class="sub">資料標示：2021–2025 年房價漲跌採內政部住宅價格指數第四季年增率（全國 +8.6%、+8.5%、+6.8%、+10.9%、-3.6%；2025 年六都另有分別數值），其餘年份與各城市價差為模型估計。</p>'};
