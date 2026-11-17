/* ---- p65：能力總覽（所有能力值一眼看清楚，附說明與提升方式） ---- */
const STHL=[
 ['health','健康','低於 30 容易生重病；運動、看醫生、規律作息可提升','運動'],
 ['happy','快樂','影響人生分數；休閒、旅行、陪伴家人朋友可提升','休閒'],
 ['smarts','智力','影響成績與求職；讀書、學習才藝可提升','才藝'],
 ['looks','外貌','影響戀愛與部分職業；運動、保養可維持','運動'],
 ['stress','壓力','越低越好；過高會傷身與影響心情；冥想、瑜伽可降低','休閒'],
 ['karma','品德','做善事提高、犯罪降低；影響名聲與部分事件','休閒'],
 ['net','人脈','影響求職與引薦；聚會、社團、志工可提升','休閒']
];
function stBar(v,bad){const c=bad?(v>=70?'#c0553a':v>=40?'#e0a030':'#4a9a6a'):(v<30?'#c0553a':v<60?'#e0a030':'#4a9a6a');return `<div class="bar"><i style="width:${Math.max(0,Math.min(100,v))}%;background:${c}"></i></div>`}
function stRow(n,v,d,go,bad){return `<div class="item"><div style="display:flex;justify-content:space-between"><b>${n}</b><span>${Math.round(v)}</span></div>${stBar(v,bad)}<div class="sub">${d}</div>${go?`<button class="mini" data-a="ac:go:${go}">去「${go}」提升</button>`:''}</div>`}
function statHTML(){
 mFix();if(typeof tlInit==='function')tlInit();
 let h='<h3>能力總覽</h3><div class="sub">點「去…提升」可直接跳到對應活動分類。</div><div class="sec">基本能力</div>';
 h+=STHL.map(x=>stRow(x[1],S[x[0]]||0,x[2],x[3],x[0]==='stress')).join('');
 h+='<div class="sec">技能（影響求職、賺錢與生活）</div>';
 h+=SKN.map(([k,n])=>stRow(n,S.skl[k]||0,(typeof SKD!=='undefined'&&SKD[k])||'',k==='fit'?'運動':'才藝')).join('');
 h+='<div class="sec">個性（由你的選擇慢慢形塑）</div>';
 h+=PTN.map(([k,n])=>stRow(n,S.pt[k]||50,(typeof PTD!=='undefined'&&PTD[k])||'')).join('');
 if(S.tl){h+='<div class="sec">才藝與比賽實力</div>'+Object.keys(TLN).map(k=>stRow(TLN[k],S.tl[k],'練習後才有實力參加比賽','才藝')).join('')+stRow('跑力',S.runlv||0,'影響路跑成績，要持續訓練','運動')+stRow('名聲',S.cfame||0,'比賽成績累積，有機會被星探發掘','比賽')}
 h+='<div class="sec">學業與工作</div><div class="item">';
 h+=`學歷：${EDU[S.edu]}${S.school?`<br>就讀：${S.school}（成績 ${S.grade}）`:''}${S.job?`<br>工作：${esc(S.job.t)}，年薪 ${money(S.job.sal)}`:''}${S.ptj?`<br>兼職：${esc(ptJob(S.ptj.id).t)}，每週 ${S.ptj.h} 小時`:''}${S.ent?`<br>練習生：${esc(S.ent.co)}`:''}</div>`;
 h+=`<div class="sec">財務</div><div class="item">現金 ${money(S.money)}${S.sloan?`<br>就學貸款 ${money(S.sloan)}`:''}<br>淨資產 ${money(netWorth())}</div>`;
 return h;
}
const _lf65=lifeHTML;
lifeHTML=function(){return view.lsub==='stat'?statHTML():_lf65()};
(function(){try{const s=document.getElementById('stats');if(s){s.style.cursor='pointer';s.addEventListener('click',()=>{if(S&&typeof handle==='function')handle('lf:stat')})}}catch(e){}})();
const _qb65=qbUpdate;
qbUpdate=function(){
 _qb65();
 try{const q=document.getElementById('qbar');if(q&&S&&!S.dead&&!q.querySelector('[data-st]')){q.insertAdjacentHTML('afterbegin','<button data-st="1">能力</button>');const b=q.querySelector('[data-st]');b.onclick=e=>{e.stopPropagation();handle('lf:stat')}}}catch(e){}
};
