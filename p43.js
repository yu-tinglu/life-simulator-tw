/* ---- p43：死亡總結卡（可下載圖片／分享）---- */
function sumData(){
 const nh=S.netHist||[],peak=nh.length?nh.reduce((a,b)=>b[1]>a[1]?b:a):null;
 const ctr=[...new Set([S.cn||'TW',...Object.keys(S.trav||{})])].filter(k=>CNS[k]).map(k=>CNS[k].n);
 const mom=[];for(const L of S.log)for(const x of L.lines){if(TLKEY.test(x.t||'')&&!/成就解鎖/.test(x.t))mom.push(`${L.age} 歲 ${(x.t||'').replace(/<[^>]+>/g,'')}`)}
 const pick=mom.length>6?mom.filter((_,i)=>i%Math.ceil(mom.length/6)===0).slice(0,6):mom;
 const fam=[...(S.hist||[]).map(x=>`第${x.gen}代 ${x.name}（${x.age} 歲）`),`第${S.gen||1}代 ${S.name}（${S.age} 歲）`];
 return {title:stripEmoji(endTitle()),name:S.name,age:S.age,cause:S.cause||'',edu:EDU[S.edu],job:S.job?S.job.t:'無',net:money(netWorth()),peak:peak?`${money(peak[1])}（${peak[0]} 歲）`:'—',kids:S.kids.length,ctr,pick,fam,chal:chalName()};
}
function sumHTML(){
 const d=sumData();
 return `<div class="card" style="margin-top:8px"><h3>人生總結卡</h3><div class="sub">${esc(d.chal)}・${esc(d.title)}</div>
 <p><b>${esc(d.name)}</b>　享年 ${d.age} 歲<br>最高學歷：${esc(d.edu)}　最後職業：${esc(d.job)}<br>淨資產：${d.net}　資產高峰：${d.peak}<br>子女：${d.kids} 人　足跡：${d.ctr.length} 個國家（${d.ctr.slice(0,6).map(esc).join('、')}${d.ctr.length>6?'…':''}）</p>
 <div class="sub"><b>重大時刻</b></div>${d.pick.map(x=>`<div class="ln">${esc(x)}</div>`).join('')||'<div class="ln">平靜的一生</div>'}
 <div class="sub"><b>家族</b>　${d.fam.map(esc).join(' → ')}</div>
 <div style="display:flex;gap:6px;margin-top:8px"><button class="btn" id="sumDl">下載圖片</button><button class="btn" id="sumSh">分享</button></div></div>`;
}
function sumCanvas(){
 const d=sumData(),W=720,H=980,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
 g.fillStyle='#f6efe6';g.fillRect(0,0,W,H);g.fillStyle='#c0553a';g.fillRect(0,0,W,14);
 g.fillStyle='#3a2a22';g.font='bold 44px sans-serif';g.fillText('人生模擬器',40,90);
 g.font='28px sans-serif';g.fillStyle='#c0553a';g.fillText(`${d.chal}・${d.title}`,40,140);
 g.fillStyle='#3a2a22';g.font='bold 36px sans-serif';g.fillText(`${d.name}　享年 ${d.age} 歲`,40,210);
 g.font='26px sans-serif';let y=262;
 const L=[`學歷：${d.edu}　職業：${d.job}`,`淨資產：${d.net}`,`資產高峰：${d.peak}`,`子女：${d.kids} 人　足跡：${d.ctr.length} 國`,`死因：${d.cause}`];
 L.forEach(t=>{g.fillText(t,40,y);y+=44});
 y+=14;g.font='bold 28px sans-serif';g.fillStyle='#c0553a';g.fillText('重大時刻',40,y);y+=44;g.font='24px sans-serif';g.fillStyle='#3a2a22';
 d.pick.forEach(t=>{const s=t.length>26?t.slice(0,25)+'…':t;g.fillText(s,40,y);y+=40});
 y+=20;g.font='bold 28px sans-serif';g.fillStyle='#c0553a';g.fillText('家族',40,y);y+=42;g.font='24px sans-serif';g.fillStyle='#3a2a22';
 d.fam.slice(-5).forEach(t=>{g.fillText(t,40,y);y+=38});
 return c;
}
function sumBind(){
 const dl=document.getElementById('sumDl'),sh=document.getElementById('sumSh');
 if(dl)dl.onclick=()=>{try{const c=sumCanvas(),a=document.createElement('a');a.href=c.toDataURL('image/png');a.download='人生總結.png';document.body.appendChild(a);a.click();a.remove()}catch(e){toast('無法產生圖片')}};
 if(sh)sh.onclick=()=>{try{const t=lifeText();if(navigator.share)navigator.share({title:'人生模擬器',text:t});else{navigator.clipboard.writeText(t);toast('已複製人生年表')}}catch(e){}};
}
const _endInfo43=endInfo;endInfo=function(){return _endInfo43()+sumHTML()};
const _showEnd43=showEnd;showEnd=function(){_showEnd43();try{sumBind()}catch(e){}};
