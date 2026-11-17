/* ---- p73：人物檔案加深（出身城市依國籍、外貌習慣、價值觀、感情史、未來規劃、內心世界；了解度越高解鎖越多）---- */
const CITY={US:['紐約','洛杉磯','芝加哥','休士頓','西雅圖','舊金山','波士頓','奧斯汀','達拉斯','邁阿密'],JP:['東京','大阪','京都','福岡','札幌','名古屋','仙台','神戶'],KR:['首爾','釜山','大邱','仁川','光州','濟州'],CA:['多倫多','溫哥華','蒙特婁','卡加利','渥太華'],AU:['雪梨','墨爾本','布里斯本','伯斯','阿德萊德'],GB:['倫敦','曼徹斯特','愛丁堡','伯明罕','利物浦'],DE:['柏林','慕尼黑','漢堡','法蘭克福','科隆'],SG:['新加坡']};
function pOrigin(p){
 if(!p)return 'TW';
 if(p.res&&p.res!=='TW')return p.res;if(p.cn&&p.cn!=='TW')return p.cn;if(p.res==='TW'||p.cn==='TW')return 'TW';
 if(/^[A-Za-z]/.test(p.n||'')){if(!p.cn)p.cn=(S.cn&&S.cn!=='TW')?S.cn:pick(['US','CA','AU','GB','DE','JP','KR']);return p.cn}
 return S.cn||'TW';
}
const _pbF73=pbFix;
pbFix=function(p){
 const b=_pbF73(p);
 try{
  if(b&&p&&!b.hfix){
   const o=pOrigin(p);
   if(o!=='TW'&&CITY[o]&&(PBHM.includes(b.hm)||b.hm===(CNS[S.cn]&&CNS[S.cn].n)||!b.hm)){b.hm=pick(CITY[o])+'（'+(CNAME[o]||o)+'）'}
   b.hfix=1;
  }
 }catch(e){}
 return b;
};
const D73={
 sl:['早起鳥，六點就醒','夜貓子，半夜最有精神','作息規律，十一點準時睡','常常熬夜追劇'],
 fd:['無辣不歡','口味清淡','甜食控','什麼都吃、特別愛小吃','吃素或少肉','咖啡成癮','火鍋愛好者','麵食派'],
 sp:['很會存錢','想買就買、有點月光','只在重要的事上花錢','愛收集小東西','精打細算、愛比價'],
 sg:['每週固定運動','偶爾健走','幾乎不運動','假日才爬山或騎車','心情不好才去健身房'],
 vm:['金錢是安全感的來源','錢夠用就好，時間比較重要','願意為體驗花錢','相信穩定勝過冒險','想創業，願意承擔風險'],
 vf:['家人永遠是第一順位','希望保有自己的空間','想早點成家','不急著結婚，重視當下','很在意父母的看法'],
 vw:['事業是人生的重要部分','工作只是賺錢的手段','想做自己真正熱愛的事','追求穩定與準時下班','想往管理職發展'],
 st:['簡約素色','運動休閒','文青復古','整潔襯衫','街頭潮流','低調深色系','色彩繽紛'],
 ct:['「沒事啦，慢慢來。」','「真的假的？」','「我再想一下。」','「交給我吧。」','「好啊，都可以。」','「等等，讓我先喝口咖啡。」','「欸，你知道嗎…」'],
 lh:['曾經被突然失聯，花了很久才走出來','曾經太遷就對方，後來學會說不','初戀因為距離而結束','曾被朋友背叛，對信任很謹慎','沒有受過太大的傷，但也還在學習相愛','曾為了工作錯過一段感情'],
 fa:['家裡氣氛溫暖，常常一起吃飯','父母對他期望很高','家人話不多，但很關心彼此','從小和祖父母同住','父母忙碌，從小學會獨立','手足感情很好'],
 pj:['教師','公務員','小吃店老闆','工程師','護理師','農夫','業務','會計','司機','退休軍人','家庭主婦／主夫','經營小公司'],
 fk:['想要兩個孩子','想養一隻毛孩勝過生小孩','不確定要不要孩子','想要三個孩子熱熱鬧鬧','暫時沒有想過孩子'],
 fl:['想住在靠海的小城','想留在熟悉的城市','想搬到國外生活','想住在山邊有院子的房子','只要有重要的人在，哪裡都可以'],
 fr:['想退休後環島旅行','想開一間小店','想在鄉下種菜','想把時間留給家人','還沒想過，先把現在過好'],
 fe:['怕黑','怕孤單','怕失去重要的人','怕失敗','怕蟲','怕搭飛機','怕被誤會'],
 ff:['滷肉飯','拉麵','義大利麵','火鍋','燒肉','咖哩','小籠包','壽司'],
 fm:['愛情片','懸疑片','動畫電影','紀錄片','喜劇','科幻片'],
 mo:['做自己就好','今天比昨天好一點','愛是行動，不是承諾','慢慢來比較快','活在當下','善待自己'],
 sr:['聽音樂','跑步','睡覺','煮飯','跟朋友聊天','一個人散步'],
 bd:['瘦高','中等身材','健壯','嬌小','圓潤可愛','勻稱'],
 hl:['偶爾失眠','容易過敏','有輕微近視','腸胃比較敏感','身體很好、很少生病','常常肩頸痠痛'],
 mem:['小時候第一次看到海','國中時班上一起逃課去夜市','大學畢業典禮那天','第一次搭飛機出國','第一份薪水請家人吃飯','一個人搬家的那天'],
 cur:['最近在學一項新的技能','最近換了新的工作環境','最近特別忙，常常很晚才睡','最近迷上了新的興趣','最近在存錢準備旅行','最近身體有點小狀況，剛好轉','最近心情特別好','最近有點煩惱，但還沒說出口']
};
function dpFix(p){
 if(!p)return null;
 if(!p.dp){
  const m=p.sx==='男';
  const ht=m?R(164,187):R(152,174);p.dp={ht,bd:pick(ht>=175?['瘦高','健壯','勻稱','中等身材']:ht<160?['嬌小','圓潤可愛','勻稱']:['中等身材','勻稱','圓潤可愛','健壯']),st:pick(D73.st),ct:pick(D73.ct),sl:pick(D73.sl),fd:pick(D73.fd),sp:pick(D73.sp),sg:pick(D73.sg),vm:pick(D73.vm),vf:pick(D73.vf),vw:pick(D73.vw),
   fa:pick(D73.fa),pj:pick(D73.pj),pj2:pick(D73.pj),sib:R(0,3),ex:R(0,4),fl:R(15,25),lh:pick(D73.lh),fk:pick(D73.fk),fl2:pick(D73.fl),fr:pick(D73.fr),fe:pick(D73.fe),ff:pick(D73.ff),fm:pick(D73.fm),mo:pick(D73.mo),sr:pick(D73.sr),hl:pick(D73.hl),mem:pick(D73.mem)};
 }
 if(p.dp.cy!==(S.year||0)){p.dp.cy=S.year||0;p.dp.cur=pick(D73.cur)}
 return p.dp;
}
function deepHTML(p,lv,title){
 const d=dpFix(p);if(!d)return '';
 const him=p.sx==='男'?'他':'她',lock=n=>`<div class="sub">（再多了解${him}一些就會知道，目前 ${lv}／${n}）</div>`;
 const it=(t,n,body)=>`<div class="item"><b>${t}</b><div class="sub" style="line-height:1.7">${lv>=n?body:lock(n)}</div></div>`;
 let h=`<div class="sec">${title||'個人檔案'}</div>`;
 h+=it('外貌與習慣',0,`身高 ${d.ht} cm・${d.bd}・穿搭 ${d.st}<br>口頭禪 ${d.ct}<br>近況：${d.cur}`);
 h+=it('生活習慣',10,`作息：${d.sl}<br>飲食：${d.fd}，最愛${d.ff}<br>運動：${d.sg}<br>花錢：${d.sp}`);
 h+=it('價值觀',25,`金錢：${d.vm}<br>家庭：${d.vf}<br>工作：${d.vw}`);
 h+=it('家庭背景',40,`${d.fa}。父母從事${d.pj}與${d.pj2}，有 ${d.sib} 位兄弟姊妹。`);
 h+=it('感情史',55,`交往過 ${d.ex} 位對象，第一次心動在 ${d.fl} 歲。${d.lh}。`);
 h+=it('未來規劃',70,`${d.fk}；${d.fl2}；${d.fr}。`);
 h+=it('內心世界',85,`最怕：${d.fe}。紓壓方式：${d.sr}。座右銘「${d.mo}」。最難忘的回憶是${d.mem}。愛看${d.fm}。`);
 return h;
}
const _pbP73=pbProfile;
pbProfile=function(p){return _pbP73(p)+deepHTML(p,pbFix(p).kn,'深入了解')};
otProfHTML=function(t,k){
 otProf(t);if(k==='p')return '';
 const a=otAff(t,k);
 return `<div class="item"><b>${esc(t.n)} 的背景</b><div class="sub">職業：${t.pj}・興趣：${t.hb}・${a>=60?'祕密：'+t.sec:'好感 60 以上會告訴你心裡的祕密'}</div></div>`+deepHTML(t,a,'個人檔案');
};
const _sub73=subHTML;
subHTML=function(k){
 let h=_sub73(k);
 try{
  if((k==='mom'||k==='dad'||(k&&k[0]==='f'))&&getP(k)){
   const p=getP(k),pf=`<div class="sec">個人檔案</div><div class="item"><b>基本資料</b><div class="sub">${esc(p.n)}${p.age!=null?'・'+p.age+' 歲':''}${p.kind?'・'+p.kind:''}${p.role?'・'+p.role:''}${p.o?'・來自'+esc(p.o):''}</div></div>`+deepHTML(p,p.rel,'深入了解').replace('<div class="sec">深入了解</div>','');
   const m='<button class="btn" data-a="back">',j=h.lastIndexOf(m);h=j>=0?h.slice(0,j)+pf+h.slice(j):h+pf;
  }
 }catch(e){}
 return h;
};
