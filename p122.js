/* ---- p122：食譜圖鑑：每道菜都有自繪插圖（依菜色類型與菜名程序化繪製，非真實照片） ---- */
const DTYPE=[
 [/珍珠奶茶|擂茶/,'drink'],[/佛跳牆|關東煮|煲仔飯|石鍋拌飯|竹筒飯/,'pot'],
 [/生春捲|春捲/,'spring'],[/壽司|軍艦/,'sushi'],[/飯捲/,'roll'],
 [/拉麵|牛肉河粉|擔仔麵|蚵仔麵線|冬蔭功|牛肉麵|魚丸湯|福州魚丸|洋蔥湯|馬賽魚湯|人蔘雞湯|雞湯|桑巴/,'soupbowl'],
 [/麵|米粉|河粉|炒河粉|千層麵|寬麵/,'noodle'],
 [/咖哩|奶油雞|莫雷醬|紅酒燉|紅燒|獅子頭|東坡|毛氏|扣肉|燉牛肉|庫斯庫斯/,'stew'],
 [/餃|小籠|蝦餃|湯圓|刈包|韭菜盒|肉圓|包/,'dumpling'],
 [/披薩|瑪格麗特|拿坡里/,'pizza'],[/塔可|捲餅|可麗餅|越式法國麵包|蔥油餅|烤餅|薄餅|多薩/,'wrap'],
 [/漢堡/,'burger'],[/炸魚薯條/,'fishchips'],[/炸|鹽酥雞|天婦羅|唐揚|臭豆腐/,'fried'],
 [/串|燒鳥/,'skewer'],[/香腸|大腸|醃肉|叉燒|燒鵝|烤五花|烤牛小排|肋排|豬腳|鴨腿|威靈頓|白斬|白切|三杯|宮保|回鍋|夫妻|辣椒炒|荔枝肉|客家小炒|薑絲|打拋|莫雷|早餐/,'meat'],
 [/魚|蝦|海鮮|海參|蚵/,'fish'],
 [/提拉米蘇|蛋糕|派|鳳梨酥|可露|千層酥|司康|馬卡龍|糯米|糕/,'dessert'],
 [/沙拉|泡菜|酪梨|鷹嘴豆|菜脯|玉子燒|烘蛋|茶碗蒸|前菜|塔帕斯|椒鹽脆餅|風乾/,'plate'],
 [/飯/,'rice'],[/湯|羹|鍋/,'soupbowl'],[/豆腐/,'stew']
];
const DHUE={twn:18,chn:8,jpn:350,kor:5,tha:38,vnm:95,ind:28,ita:100,fra:270,usa:15,mex:50,tur:30,deu:30,gbr:210,esp:40};
function dishType(n){for(const [re,t] of DTYPE)if(re.test(n))return t;return 'plate'}
function dHash(s){let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h}
function dishSVG(name,cu,size){
 const t=dishType(name),h=dHash(name),r=k=>((h>>>(k*3))%100)/100,hue=((DHUE[cu]||20)+(h%24)-12+360)%360;
 const c1=`hsl(${hue} 55% 52%)`,c2=`hsl(${(hue+30)%360} 60% 62%)`,c3=`hsl(${14+(h%22)} 52% ${28+(h>>>5)%10}%)`,sauce=`hsl(${(hue+10)%360} 65% 42%)`,gold=`hsl(${34+r(1)*10} 70% ${52+r(2)*8}%)`,green=`hsl(${105+r(3)*30} 40% ${42+r(4)*12}%)`;
 const plate='<ellipse cx="32" cy="38" rx="27" ry="14" fill="#fff" stroke="#e7dcc8" stroke-width="1.5"/><ellipse cx="32" cy="38" rx="20" ry="9.5" fill="#fbf6ea"/>';
 const bowl=(f)=>`<path d="M7 30h50a25 25 0 0 1-50 0z" fill="${f||'#fff'}" stroke="#d9cdb6" stroke-width="1.5"/><ellipse cx="32" cy="30" rx="25" ry="5" fill="#f7f0e0" stroke="#d9cdb6" stroke-width="1"/>`;
 let g='';
 const dots=(n,col,y0,sp)=>Array.from({length:n},(_,i)=>`<circle cx="${18+((i*13+h%7*3)%28)}" cy="${y0+((i*7+h%5)%sp)}" r="${1.6+r(i)*1.8}" fill="${col}"/>`).join('');
 if(t==='noodle'||t==='soupbowl'){
  const soup=t==='soupbowl';
  g=bowl()+`<ellipse cx="32" cy="30" rx="22" ry="3.8" fill="${soup?sauce:gold}" opacity="${soup?.9:1}"/>`
   +[0,1,2,3].map(i=>`<path d="M${14+i*9} 29q4-7 8 0t8 0" fill="none" stroke="${soup?gold:sauce}" stroke-width="2" stroke-linecap="round"/>`).join('')
   +dots(4,green,26,3)+`<circle cx="${22+r(5)*20}" cy="27" r="3.4" fill="#fff6d6" stroke="${gold}" stroke-width="1.2"/>`;
  g+=soup?'<path d="M24 14q-3 4 0 8M32 11q-3 4 0 8M40 14q-3 4 0 8" fill="none" stroke="#c9bda5" stroke-width="1.4" stroke-linecap="round"/>':'';
 }else if(t==='rice'){g=bowl()+`<ellipse cx="32" cy="27" rx="20" ry="10" fill="#fffdf6" stroke="#eee3cc"/>`+dots(5,sauce,22,6)+`<rect x="22" y="21" width="20" height="5" rx="2.5" fill="${c1}" opacity=".9"/>`}
 else if(t==='stew'){g=bowl()+`<ellipse cx="32" cy="30" rx="22" ry="4" fill="${sauce}"/>`+[0,1,2,3].map(i=>`<rect x="${17+i*8+r(i)*3}" y="${22+(i%2)*2}" width="9" height="8" rx="3" fill="${c3}"/>`).join('')+dots(3,green,26,3)}
 else if(t==='dumpling'){g=plate+[0,1,2,3,4].map(i=>`<path d="M${14+i*8} ${40-(i%2)*6}q5-12 10 0z" fill="#fff6e6" stroke="#e5d3b0" stroke-width="1.2"/>`).join('')+`<path d="M20 30q4-4 8 0" stroke="${c1}" fill="none" stroke-width="1.4"/>`}
 else if(t==='pizza'){g=`<circle cx="32" cy="34" r="25" fill="${gold}" stroke="#c98f3a" stroke-width="2"/><circle cx="32" cy="34" r="21" fill="#f0c36a"/>`+dots(6,'#c0392b',22,18)+dots(4,green,26,14)+'<path d="M32 13v42M10 34h44" stroke="#c98f3a" stroke-width="1" opacity=".6"/>'}
 else if(t==='wrap'){g=`<path d="M6 40q26-34 52 0z" fill="${gold}" stroke="#c98f3a" stroke-width="1.6"/><path d="M12 38q20-22 40 0" fill="none" stroke="${green}" stroke-width="4" stroke-linecap="round"/>`+dots(5,sauce,30,6)}
 else if(t==='burger'){g=`<path d="M10 28q22-26 44 0z" fill="${gold}"/><rect x="9" y="29" width="46" height="5" rx="2.5" fill="${green}"/><rect x="9" y="34" width="46" height="7" rx="3.5" fill="#6d3b24"/><rect x="9" y="41" width="46" height="4" rx="2" fill="#f0c36a"/><path d="M10 45h44q-4 8-22 8T10 45z" fill="${gold}"/>`}
 else if(t==='fried'||t==='fishchips'){g=plate+[0,1,2,3,4].map(i=>`<rect x="${15+i*7+(i%2)*2}" y="${30+(i%2)*5}" width="11" height="9" rx="4" fill="${gold}" stroke="#b9772a" stroke-width="1" transform="rotate(${(i-2)*10} ${20+i*7} 35)"/>`).join('')+(t==='fishchips'?`<path d="M14 24h4M20 22h4M26 25h4" stroke="#f3c64a" stroke-width="2.4" stroke-linecap="round"/>`:'')}
 else if(t==='skewer'){g=plate+[0,1].map(i=>`<path d="M8 ${34+i*8}L56 ${28+i*8}" stroke="#a0713a" stroke-width="1.6"/>`+[0,1,2,3].map(k=>`<rect x="${16+k*9}" y="${31+i*8-k*.6}" width="8" height="6.5" rx="3" fill="${k%2?c3:sauce}"/>`).join('')).join('')}
 else if(t==='meat'){g=plate+`<path d="M15 36q4-12 20-9t14 10q-4 8-20 7T15 36z" fill="${c3}" stroke="#4a2415" stroke-width="1.2"/><path d="M22 34q8-4 18 0" fill="none" stroke="${gold}" stroke-width="1.6" opacity=".8"/>`+dots(4,green,31,8)}
 else if(t==='fish'){g=plate+`<path d="M12 38q14-16 30-3l8-6v18l-8-6q-16 12-30-3z" fill="${c2}" stroke="${c3}" stroke-width="1.3"/><circle cx="20" cy="36" r="1.4" fill="#333"/><path d="M26 33q3 5 0 9M31 32q3 6 0 11" stroke="${c3}" fill="none" stroke-width="1"/>`+dots(3,green,28,4)}
 else if(t==='dessert'){g=plate+`<path d="M18 40l6-16h16l6 16z" fill="#fff0d9" stroke="#e3cba3" stroke-width="1.3"/><rect x="18" y="33" width="28" height="3" fill="${c3}"/><path d="M18 27h28" stroke="${c1}" stroke-width="3"/><circle cx="32" cy="22" r="3" fill="${sauce}"/>`}
 else if(t==='sushi'){g=plate+[0,1,2].map(i=>`<rect x="${14+i*12}" y="${33+(i%2)*3}" width="11" height="8" rx="3" fill="#fffdf2" stroke="#e9dfc7"/><rect x="${13+i*12}" y="${29+(i%2)*3}" width="13" height="6" rx="3" fill="${i%2?'#f08a5d':sauce}"/>`).join('')}
 else if(t==='roll'){g=plate+[0,1,2,3].map(i=>`<circle cx="${17+i*10}" cy="${36+(i%2)*2}" r="5.2" fill="#2e3b2b"/><circle cx="${17+i*10}" cy="${36+(i%2)*2}" r="3.4" fill="#fffdf2"/><circle cx="${17+i*10}" cy="${36+(i%2)*2}" r="1.5" fill="${i%2?sauce:green}"/>`).join('')}
 else if(t==='spring'){g=plate+[0,1,2].map(i=>`<rect x="${14+i*13}" y="${32+(i%2)*3}" width="16" height="8" rx="4" fill="#fff9ec" stroke="#e5d7bb"/><path d="M${18+i*13} ${34+(i%2)*3}h8" stroke="${i%2?sauce:green}" stroke-width="2"/>`).join('')}
 else if(t==='drink'){g=`<path d="M19 12h26l-3 40a4 4 0 0 1-4 3H26a4 4 0 0 1-4-3z" fill="#f7efe0" stroke="#cdbb97" stroke-width="1.5"/><path d="M21 24h22l-2 28H23z" fill="${c3}" opacity=".85"/>${dots(7,'#2b1a12',44,8)}<path d="M38 4l-4 18" stroke="${sauce}" stroke-width="3" stroke-linecap="round"/>`}
 else if(t==='pot'){g=`<path d="M8 28h48l-4 22a6 6 0 0 1-6 5H18a6 6 0 0 1-6-5z" fill="#6b4a3a"/><ellipse cx="32" cy="28" rx="24" ry="5" fill="${sauce}"/><rect x="4" y="26" width="8" height="4" rx="2" fill="#6b4a3a"/><rect x="52" y="26" width="8" height="4" rx="2" fill="#6b4a3a"/>`+dots(6,gold,26,3)+'<path d="M22 16q-3 4 0 8M32 12q-3 4 0 8M42 16q-3 4 0 8" fill="none" stroke="#c9bda5" stroke-width="1.4" stroke-linecap="round"/>'}
 else{g=plate+`<ellipse cx="32" cy="36" rx="14" ry="6" fill="${c2}"/>`+dots(7,green,31,8)+dots(3,sauce,32,6)}
 return `<svg viewBox="0 0 64 64" width="${size||52}" height="${size||52}" class="dsv" aria-hidden="true">${g}</svg>`;
}
/* 圖鑑：選到的菜顯示大圖，並以卡片牆顯示該菜系所有菜色，點卡片就會選取 */
const _ch122=cookHTML;
cookHTML=function(){
 let h=_ch122();
 try{
  const r=ckInit(),sel=frmGet('ckc').s||'twn',cs=CUIS.find(c=>c[0]===sel)||CUIS[0];
  const dl=Object.values(DISH).filter(d=>d.cu===cs[0]),cur=frmGet('ckl').s,cd=DISH[cur]&&DISH[cur].cu===cs[0]?DISH[cur]:dl[0];
  const big=`<div class="item" style="display:flex;gap:12px;align-items:center">${dishSVG(cd.n,cd.cu,76)}<div><b>${esc(cd.n)}</b><div class="sub">${esc(cd.cun)}・${esc(cd.sc)}・難度 ${cd.lv}${r.known[cd.id]?'・熟練 '+r.known[cd.id].m+'%':'・還沒學過'}</div></div></div>`;
  const gal=`<div class="sec op">${esc(cs[1])}圖鑑（${dl.length} 道）</div><div class="dgal">${dl.map(d=>`<button class="dcd${r.known[d.id]?' kn':''}${d.id===cd.id?' on':''}" data-a="ckpick:${d.id}">${dishSVG(d.n,d.cu,48)}<span>${esc(d.n)}</span><small>${r.known[d.id]?r.known[d.id].m+'%':'未學'}</small></button>`).join('')}</div>`;
  h=h.replace('<div class="sec op">學習食譜</div>','<div class="sec op">學習食譜</div>'+big);
  h=h.replace(/(<div class="sub">(?:生活圈的菜系|異國菜系)[^<]*<\/div>)/,'$1'+gal);
  r.own.forEach(d=>{const o='<div class="item"><b>'+esc(d.n)+'</b>';h=h.replace(o,'<div class="item" style="overflow:hidden"><span style="float:left;margin-right:10px">'+dishSVG(d.n,d.cu||'twn',44)+'</span><b>'+esc(d.n)+'</b>')});
 }catch(e){}
 return h};
const _hd122=handle;
handle=function(a){
 if(typeof a==='string'&&a.startsWith('ckpick:')&&S){frmState('ckl').s=a.slice(7);view.lsub='cook';render();try{showSheet('life')}catch(e){}return}
 return _hd122.apply(this,arguments)};
(function(){try{const st=document.createElement('style');st.id='dg122';st.textContent=`.dgal{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:6px 0 10px}.dcd{display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px;border:1px solid var(--line);border-radius:14px;background:var(--card);font-size:13px;color:var(--ink);min-height:96px}.dcd span{font-weight:600;font-size:13px;text-align:center;line-height:1.25}.dcd small{font-size:11.5px;color:var(--mute)}.dcd.kn{border-color:var(--acc)}.dcd.on{background:color-mix(in srgb,var(--acc) 12%,var(--card));border-color:var(--acc)}.dsv{flex:none}`;document.head.appendChild(st)}catch(e){}})();
