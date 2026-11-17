/* ---- 兵役（役期、體位比例為遊戲估算） ---- */
function armyCheck(a){
 if(S.sx!=='男'||a<19||a>30||S.school||S.flags.served)return;
 S.flags.served=1;
 const r=Math.random();
 if(r<.06){S.flags.mil='免役';log('徵兵檢查結果：體位免役（因健康或疾病因素）。');return}
 if(r<.18&&S.edu>=3){S.flags.mil='替代役';S.army=true;chg('health',R(0,3));chg('happy',-2);log('你申請並通過替代役，到社福單位服務約一年。');queue.push(ARMYEV);return}
 S.flags.mil='常備兵';S.army=true;chg('health',R(2,6));chg('happy',-4);log('你收到徵集令，到部隊服一年義務役。');queue.push(ARMYEV);
}
const ARMYEV={id:'army2',run:()=>{
 const t=S.flags.mil==='替代役';
 const v=pick(t?['sw','boss','fr']:['hard','bully','fr','leave']);
 if(v==='hard')return {t:'新訓中心操課嚴苛，天氣又熱。',c:[ch('咬牙撐過去',()=>{chg('health',R(1,4));S.stress=cl(S.stress+4);return G('你練出一身好體力，也學會了耐操。')}),ch('裝病請假',()=>{S.karma=cl(S.karma-3);return N('你躲過幾天操練，但被班長盯上。')})]};
 if(v==='bully')return {t:'連上有學長愛欺負新兵。',c:[ch('忍耐，不要惹事',()=>{S.stress=cl(S.stress+8);chg('happy',-4);return B('你忍了半年才熬過來。')}),ch('向 1985 或輔導長反映',()=>{S.stress=cl(S.stress+3);S.karma=cl(S.karma+3);return G('事情被處理了，你鬆了一口氣。')})]};
 if(v==='leave')return {t:'你想請假回家參加家人的重要場合。',c:[ch('依規定請假',()=>{chg('happy',3);return G('長官核准了，你回家和家人團聚。')}),ch('不請了',()=>N('你繼續留在營區。'))]};
 if(v==='sw')return {t:'你在社福機構協助照顧長者與身障者。',c:[ch('用心服務',()=>{S.karma=cl(S.karma+5);chg('happy',3);return G('你學到很多，也對照顧工作更有感觸。')}),ch('準時下班',()=>N('你平順度過役期。'))]};
 if(v==='boss')return {t:'單位主管給你很多額外雜事。',c:[ch('全部接下',()=>{S.stress=cl(S.stress+5);return N('你累了一點，但主管很滿意。')}),ch('婉轉拒絕',()=>N('主管有點不開心，但也沒有為難你。'))]};
 return {t:'在營區你和同梯結下了深厚的革命情感。',c:[ch('退伍後保持聯絡',()=>{S.net=cl(S.net+5);chg('happy',4);return G('你交到了幾個一輩子的朋友。')}),ch('各奔東西',()=>N('你們很快斷了聯絡。'))]}}};
/* ---- 住房事件 ---- */
if(typeof E!=='undefined')E.push(
{id:'hrent',min:20,max:80,w:2,if:()=>!S.house&&S.age>=20&&!S.army,run:()=>({t:'房東通知下個月起房租漲 10%。',c:[
 ch('接受漲價',()=>{const l=Math.round(livingCost()*.1);S.money-=l;S.stress=cl(S.stress+2);return B(`今年多付了約 ${money(l)} 的房租。`)}),
 ch('搬家另找',()=>{S.money-=R(15,40)*1000;S.stress=cl(S.stress+5);return N('搬家與押金、仲介費花了一筆錢，但租金回到原本水準。')})]})},
{id:'hevict',min:22,max:80,w:1,if:()=>!S.house&&S.age>=22,run:()=>({t:'房東說要賣房子，希望你在三個月內搬走。',c:[
 ch('趕緊找新房子',()=>{S.money-=R(20,50)*1000;S.stress=cl(S.stress+6);return B('倉促搬家，花了不少錢也很累。')}),
 ch('依租約主張權益',()=>{S.stress=cl(S.stress+3);S.money-=5000;return N('你依租約和房東協商，拿到一些搬遷補貼。')})]})},
{id:'hrate',min:25,max:80,w:2,if:()=>!!S.mort,run:()=>({t:'央行升息，銀行通知房貸利率調升。',c:[
 ch('照常繳款',()=>{const l=Math.round(S.mort.left*.004);S.money-=l;return B(`今年多繳利息約 ${money(l)}。`)}),
 ch('洽銀行轉貸',()=>{S.money-=15000;const l=Math.round(S.mort.left*.002);S.money-=l;return N(`轉貸手續費 ${money(15000)}，今年多繳利息約 ${money(l)}。`)})]})},
{id:'hleak',min:25,max:90,w:2,if:()=>!!S.house,run:()=>({t:'家裡牆壁滲水、管線老化，需要整修。',c:[
 ch('找工班全面整修',()=>{const l=Math.round(S.house.value*R(2,5)/100);S.money-=l;S.house.value=Math.round(S.house.value*1.02);S.stress=cl(S.stress+3);return N(`整修花了 ${money(l)}，屋況變好。`)}),
 ch('簡單補一補',()=>{const l=R(10,40)*1000;S.money-=l;return B(`暫時補好，花了 ${money(l)}。`)})]})},
{id:'hrenew',min:40,max:90,w:1,if:()=>!!S.house&&S.house.value>5e6,run:()=>({t:'你住的老公寓被劃入都市更新範圍，鄰居意見分歧。',c:[
 ch('同意參與都更',()=>{S.house.value=Math.round(S.house.value*R(120,150)/100);S.money-=R(100,300)*1000;S.stress=cl(S.stress+6);return N('都更期間你要搬出去、也要負擔分擔金，完成後房子變新、價值增加。')}),
 ch('不同意',()=>{S.stress=cl(S.stress+2);return N('你維持現狀，社區氣氛有點尷尬。')})]})}
);
/* ---- 人生年表：結局頁圖表與分享文字 ---- */
function lifeSVG(){
 const hs=S.hs||[];if(hs.length<3)return '';
 const W=320,H=90,P=4,mx=Math.max(100,...hs.map(x=>x.w)),mn=Math.min(0,...hs.map(x=>x.w)),n=hs.length;
 const X=i=>P+i*(W-2*P)/(n-1),Yw=v=>H-P-(v-mn)/(mx-mn||1)*(H-2*P),Yp=v=>H-P-v/100*(H-2*P);
 const pl=(f,k)=>hs.map((x,i)=>`${i?'L':'M'}${X(i).toFixed(1)},${f(x[k]).toFixed(1)}`).join('');
 return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="background:var(--card,#fff);border:1px solid var(--line,#ddd);border-radius:10px"><path d="${pl(Yw,'w')}" fill="none" stroke="#2f6f5f" stroke-width="2"/><path d="${pl(Yp,'h')}" fill="none" stroke="#d98324" stroke-width="1.5"/><path d="${pl(Yp,'hp')}" fill="none" stroke="#b5483c" stroke-width="1.5" stroke-dasharray="3 2"/></svg><div class="sub">綠＝淨資產　橘＝快樂　紅虛線＝健康（${hs[0].a}～${hs[n-1].a} 歲）</div>`;
}
function lifeText(){
 const keys=/結婚|出生|創業|畢業|確診|過世|移民|退休|離婚|成就解鎖|分手|入獄|服役|替代役|癌|中風/;
 const hl=[];for(const L of S.log)for(const x of L.lines){const t=typeof x==='string'?x:(x.t||x[0]||'');if(keys.test(t)&&!/^🏆/.test(t))hl.push(`${L.age} 歲：${t.replace(/<[^>]+>/g,'')}`)}
 const m=hl.length>10?hl.filter((_,i)=>i%Math.ceil(hl.length/10)===0).slice(0,10):hl;
 return stripEmoji(`【人生模擬器】${S.name}，享年 ${S.age} 歲，死因：${S.cause}\n結局：${endTitle()}　學歷：${EDU[S.edu]}　淨資產：${money(netWorth())}　子女：${S.kids.length} 人　第 ${S.gen||1} 代\n`+m.join('\n'));
}
const _endInfo19=endInfo;
endInfo=function(){return _endInfo19()+lifeSVG()+`<button class="btn" id="copyLife">📋 複製人生年表</button>`};
const _showEnd19=showEnd;
showEnd=function(){
 _showEnd19();
 const b=document.getElementById('copyLife');
 if(b)b.onclick=()=>{const t=lifeText();try{navigator.clipboard.writeText(t).then(()=>toast&&toast('已複製人生年表'),()=>fb(t))}catch(e){fb(t)}};
 function fb(t){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}a.remove();toast&&toast('已複製人生年表')}
};
