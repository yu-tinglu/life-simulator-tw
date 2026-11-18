/* ---- p103：錯誤保護、存檔版本與多存檔、公司收購、家族檔案、離線安裝 ---- */
const SV=2,ERRK='lifesim_err',SLOTN=3;
function slotKeyX(i){return 'lifesim_slot_'+i}
/* 錯誤保護：發生未預期錯誤時，先存檔並記錄 */
let _errShown=0;
function errLog(m){try{const a=JSON.parse(localStorage.getItem(ERRK)||'[]');a.push({t:new Date().toISOString().slice(0,16).replace('T',' '),m:String(m).slice(0,200),y:(typeof S!=='undefined'&&S&&S.age!=null)?S.age+'歲':''});localStorage.setItem(ERRK,JSON.stringify(a.slice(-10)))}catch(e){}}
try{
 window.addEventListener('error',e=>{errLog(e&&e.message||'error');try{if(S&&S.age!=null&&!S.dead)save()}catch(x){}if(!_errShown){_errShown=1;try{toast('發生小問題，已自動存檔；可在設定查看紀錄')}catch(x){}}});
 window.addEventListener('unhandledrejection',e=>{errLog('promise: '+(e&&e.reason&&e.reason.message||e.reason||''))});
}catch(e){}
/* 存檔版本 */
const _sv103=save;
save=function(){try{if(S&&typeof S==='object')S.sv=SV}catch(e){}return _sv103.apply(this,arguments)};
function migrate(o){
 if(!o||o.sv>=SV)return o;
 if(!o.flags)o.flags={};if(!o.evc)o.evc={};if(!o.gifts)o.gifts=[];if(!o.hist)o.hist=[];if(!o.kids)o.kids=[];if(!o.friends)o.friends=[];
 o.sv=SV;return o;
}
const _ls103=loadSave;
loadSave=function(){const o=_ls103.apply(this,arguments);try{return migrate(o)}catch(e){return o}};
/* 多存檔（手動快照）*/
function slotMetaX(i){try{const t=localStorage.getItem(slotKeyX(i));if(!t)return null;const o=JSON.parse(t);return o&&o.age!=null?o:null}catch(e){return null}}
function slotSaveX(i){try{localStorage.setItem(slotKeyX(i),JSON.stringify(Object.assign({},S,{sv:SV})));return true}catch(e){return false}}
function slotLoadX(i){try{const t=localStorage.getItem(slotKeyX(i));if(!t)return false;localStorage.setItem(SAVEKEY,t);setTimeout(()=>location.reload(),50);return true}catch(e){return false}}
function slotHTMLX(){
 let h='<div class="sec">存檔欄位（手動備份 3 個）</div>';
 for(let i=1;i<=SLOTN;i++){const m=slotMetaX(i);
  h+=`<div class="item"><b>欄位 ${i}</b><div class="sub">${m?esc(m.name||'')+'・'+m.age+' 歲・第 '+(m.gen||1)+' 代・現金 '+money(m.money||0):'（空）'}</div><div class="seg" style="margin:6px 0"><button data-a="lf:set:slot:s:${i}">存入目前</button>${m?`<button data-a="lf:set:slot:l:${i}">讀取</button>`:''}</div></div>`}
 return h;
}
function errHTML(){
 let a=[];try{a=JSON.parse(localStorage.getItem(ERRK)||'[]')}catch(e){}
 if(!a.length)return '<div class="sec">錯誤紀錄</div><div class="sub">目前沒有紀錄。</div>';
 return `<div class="sec">錯誤紀錄（${a.length}）</div><div class="sub">${a.slice(-5).map(x=>esc(x.t+' '+x.y+' '+x.m)).join('<br>')}</div><div class="seg" style="margin:6px 0"><button data-a="lf:set:errcopy">複製</button><button data-a="lf:set:errclr">清除</button></div>`;
}
const _sh103=setHTML;
setHTML=function(){
 return _sh103().replace('<div class="sec">存檔匯出／匯入</div>',slotHTMLX()+'<button class="btn" data-a="lf:set:arch">家族檔案（歷代財富與壽命）</button>'+errHTML()+'<div class="sec">存檔匯出／匯入</div>');
};
/* 家族檔案：歷代財富／壽命圖 */
function archHTML(){
 const hs=(S.hist||[]).map(x=>({g:x.gen,n:x.name,a:x.age,w:x.net||0}));
 let nw=0;try{nw=netWorth()}catch(e){}
 hs.push({g:S.gen||1,n:S.name,a:S.age,w:nw,cur:1});
 if(hs.length<2)return `<h3>家族檔案</h3><div class="sub">第一代尚在世。傳承到下一代後，這裡會畫出歷代財富與壽命。</div><button class="btn" data-a="lf:set:legalx">← 返回設定</button>`;
 const W=330,H=130,mx=Math.max(1,...hs.map(x=>Math.abs(x.w))),bw=Math.min(36,(W-20)/hs.length-8);
 const bars=hs.map((x,i)=>{const bh=Math.round(Math.abs(x.w)/mx*(H-40)),px=14+i*((W-20)/hs.length),y=x.w>=0?H-22-bh:H-22;
  return `<rect x="${px}" y="${y}" width="${bw}" height="${Math.max(1,bh)}" rx="3" fill="${x.cur?'var(--acc)':'var(--line,#c9b8a6)'}"/><text x="${px+bw/2}" y="${H-8}" font-size="10" text-anchor="middle" fill="currentColor">${x.g}代</text>`}).join('');
 const best=hs.reduce((a,b)=>b.w>a.w?b:a),long=hs.reduce((a,b)=>b.a>a.a?b:a);
 return `<h3>家族檔案</h3><div class="sec op">各代淨資產</div><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto">${bars}</svg><div class="item"><b>最富有</b>：第 ${best.g} 代 ${esc(best.n)}（${money(best.w)}）<br><b>最長壽</b>：第 ${long.g} 代 ${esc(long.n)}（${long.a} 歲）</div>${hs.map(x=>`<div class="sub">第 ${x.g} 代 ${esc(x.n)}・${x.a} 歲・${money(x.w)}${x.cur?'（目前）':''}</div>`).join('')}<button class="btn" data-a="lf:set:legalx">← 返回設定</button>`;
}
const _lh103=lifeHTML;
lifeHTML=function(){if(view.lsub==='arch')return archHTML();return _lh103()};
const _lf103=lfHandle;
lfHandle=function(x,y,z,u){
 if(x==='set'&&y==='arch'){view.lsub='arch';return null}
 if(x==='set'&&y==='slot'){const i=+u;if(z==='s')toast(slotSaveX(i)?'已存入欄位 '+i:'儲存失敗（空間不足）');else if(z==='l'){if(slotLoadX(i))toast('讀取中…')}return null}
 if(x==='set'&&y==='errcopy'){try{navigator.clipboard.writeText(localStorage.getItem(ERRK)||'[]');toast('已複製')}catch(e){toast('無法複製')}return null}
 if(x==='set'&&y==='errclr'){try{localStorage.removeItem(ERRK)}catch(e){}return null}
 return _lf103(x,y,z,u);
};
/* 公司收購事件 */
E.push({id:'co_buyout',min:28,max:75,w:3,if:()=>S.co&&S.co.stage>=1&&coValue(S.co)>2e7,run:()=>{const co=S.co,own=co.fs/co.shares,get=Math.round(coValue(co)*1.3*own);return {t:`有大型集團想收購「${co.name}」，以估值約 1.3 倍開價，你可得約 ${money(get)}（現金，已含你的持股比例）。`,c:[
 ch('接受收購',()=>{S.money+=get;S.co=null;S.job=null;S.coHist=(S.coHist||0)+1;view.csub=null;chg('happy',6);return G(`你賣掉了「${co.name}」，入袋 ${money(get)}。`)}),
 ch('婉拒',()=>{chg('happy',2);return N('你婉拒了收購，繼續經營。')})]}}});
/* 離線安裝（需 https 並有 manifest.json／sw.js；不可用時安靜略過）*/
try{
 if(typeof document!=='undefined'&&document.head&&!document.querySelector('link[rel=manifest]')){const l=document.createElement('link');l.rel='manifest';l.href='manifest.json';document.head.appendChild(l)}
 if(typeof navigator!=='undefined'&&navigator.serviceWorker&&location.protocol==='https:')navigator.serviceWorker.register('sw.js').catch(()=>{});
}catch(e){}
