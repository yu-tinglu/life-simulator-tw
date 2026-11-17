/* ---- 介面 v2：生命階段主題、頭像、時間軸 ---- */
const STIC={health:'❤️',happy:'🙂',smarts:'🧠',looks:'✨',stress:'🌀'},STCL={health:'#e5586e',happy:'#f0a93b',smarts:'#4b7bec',looks:'#a46be0',stress:'#6c7a91'};
function stageOf(a){return a<6?0:a<19?1:a<40?2:a<65?3:4}
function avatar(){
 const a=S.age,f=S.sx==='女';
 if(S.dead)return '🕊️';if(a<3)return '👶';if(a<13)return f?'👧':'👦';if(a<19)return '🧑‍🎓';
 if(a<35)return f?'👩':'👨';if(a<60)return f?'👩‍💼':'👨‍💼';return f?'👵':'👴';
}
render=function(){
 if(S&&typeof mFix==='function')mFix();
 if(!S)return;
 $('hName').textContent=S.name;
 $('hAn').innerHTML=`${S.age}<small>歲</small>`;
 $('hAge').textContent=calYear()+' 年'+(S.dead?'・已逝世':'');
 $('hAv').textContent=avatar();
 const hd=$('hd');if(hd&&hd.className!==undefined)hd.className='stage-'+stageOf(S.age);
 const w=S.jail?'⛓️ 服刑中':S.army?'🪖 服役中':S.school?`📚 ${S.school}在學`:S.job?`💼 ${S.job.t}`:S.flags.retired?'🌿 退休':'無業';
 $('hSub').innerHTML=`${S.gen>1?`<span class="chip">第 ${S.gen} 代</span>`:''}${S.cn&&S.cn!=='TW'?`<span class="chip">${CNS[S.cn].f}</span>`:''}<span class="chip">${esc(w)}</span><span class="chip ${S.money<0?'neg':''}">${money(S.money)}</span>`;
 $('stats').innerHTML=STATS.map(([k,n])=>{const v=S[k],warn=k==='stress'?v>=70:v<=25;return `<div class="st ${warn?'warn':''}"><div class="lb"><span>${STIC[k]||''} ${n.replace('⚠','')}</span><em>${v}</em></div><div class="bar"><i style="width:${Math.max(0,Math.min(100,v))}%;background:${STCL[k]||'var(--acc)'}"></i></div></div>`}).join('');
 const cy=calYear();
 $('feed').innerHTML=S.log.filter(y=>y.lines.length).map(y=>`<div class="yr"><h4>${y.age} 歲<small>${cy-(S.age-y.age)} 年</small></h4>${y.lines.map(l=>`<div class="ln ${l.c}">${esc(l.t)}</div>`).join('')}</div>`).join('');
 $('feed').scrollTop=1e9;
 $('ageBtn').disabled=!!S.dead;
};
