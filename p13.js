/* ===== p13：人際關係、家世與環境、多元戀愛（乙女式互動）===== */
const FTR=['熱心','功利','幽默','內向','忠誠','愛比較'];
const BGSTY=['放任','嚴格','溺愛','虎媽','開明'];
const EDUN=['','國小','國中','高中職','大學','碩士','博士'];
const SCENV=[{k:'競爭激烈',d:'升學競爭激烈：成績進步快，但壓力大'},{k:'自由開放',d:'校風自由：比較開心，成績普通'},{k:'社團活躍',d:'社團活躍：容易交到朋友'},{k:'霸凌風氣',d:'風氣不佳：可能遇到霸凌'},{k:'資源豐富',d:'資源豐富：智力成長較快'}];
const JBOSS=['嚴厲主管','友善主管','功利主管','放手主管'],JCUL=['加班文化','彈性友善','內捲競爭','穩定保守'];
/* 同性婚姻：依 Pew／Our World in Data：台灣、美國、加拿大、澳洲、英國、德國已合法（年份見 SSMY）；日本、南韓、新加坡尚未合法 */
const canMarry=p=>{if(p.sx!==S.sx)return true;const y=SSMY[S.cn||'TW'];return y!=null&&calYear()>=y};
STATS.push(['stress','壓力⚠','#64748b']);

const ARCH=[
 {n:'溫柔學長姊型',em:'🌸',tone:'溫柔',gift:'甜點',place:'咖啡廳',dT:'強勢',dG:'3C小物',dP:'遊樂園',
  sc:['對方笑著幫你整理了桌上的文件：「你最近是不是都沒睡好？」','對方遞給你一杯熱飲：「天氣變冷了，要多穿一點喔。」'],
  g:['對方耳根微紅，輕聲說：「謝謝你…跟你在一起真的很安心。」','對方溫柔地笑了：「你總是知道我想聽什麼。」'],m:['對方點點頭：「嗯，我知道了。」'],
  b:['對方的笑容僵了一下：「…是這樣嗎？」氣氛有些尷尬。','對方沉默了幾秒，輕輕嘆了口氣。']},
 {n:'傲嬌型',em:'💢',tone:'幽默',gift:'手作禮物',place:'夜市小吃',dT:'溫柔',dG:'鮮花',dP:'美術館展覽',
  sc:['對方別過頭：「誰、誰在等你啊！只是剛好在這裡而已！」','對方把便當推過來：「多做的…才不是特地幫你準備的。」'],
  g:['對方悶聲說：「哼…這次就算你過關。」但嘴角明顯翹了起來。','對方小聲嘀咕：「笨蛋…可是，謝謝。」'],m:['對方哼了一聲：「隨便你啦。」'],
  b:['對方皺眉：「你這樣很煩耶！」轉身就走。','對方冷哼：「無聊，我要回去了。」']},
 {n:'霸道總裁型',em:'👔',tone:'強勢',gift:'3C小物',place:'山上看夜景',dT:'害羞',dG:'手作禮物',dP:'夜市小吃',
  sc:['對方把外套披到你肩上：「別逞強，今晚我送你回去。」','對方看了看錶：「我的時間很貴，但今晚留給你。」'],
  g:['對方挑眉：「不錯，你很有眼光，我喜歡。」','對方低笑：「你是第一個讓我想停下來的人。」'],m:['對方淡淡應了聲：「嗯。」'],
  b:['對方冷冷看你一眼：「別浪費我的時間。」','對方語氣淡淡的：「就這樣？」']},
 {n:'陽光運動型',em:'🏃',tone:'幽默',gift:'球鞋運動用品',place:'海邊兜風',dT:'害羞',dG:'書籍',dP:'美術館展覽',
  sc:['對方滿身是汗地衝過來：「欸！要不要一起去跑步？」','對方丟給你一瓶水：「來，今天也要元氣滿滿！」'],
  g:['對方大笑：「哈哈哈你超好笑！跟你在一起我都不用充電！」','對方豎起大拇指：「太棒了！我們是最佳拍檔！」'],m:['對方笑著點頭：「好啊！」'],
  b:['對方撓撓頭：「呃…我有點不太懂欸。」','對方的笑容淡了一些：「…喔，好。」']},
 {n:'文青才子型',em:'📚',tone:'認真',gift:'書籍',place:'美術館展覽',dT:'強勢',dG:'球鞋運動用品',dP:'遊樂園',
  sc:['對方合上書：「你有沒有想過，人為什麼會孤單？」','對方指著窗外的雨：「這種天氣，最適合說些真心話。」'],
  g:['對方眼睛亮了：「你是少數能聽懂我的人。」','對方輕聲說：「認識你，是今年最好的事。」'],m:['對方微微點頭，若有所思。'],
  b:['對方推了推眼鏡：「…我們好像不在同一個頻率上。」','對方淡淡一笑，卻明顯疏遠了些。']},
 {n:'神秘冷酷型',em:'🌙',tone:'害羞',gift:'鮮花',place:'山上看夜景',dT:'幽默',dG:'甜點',dP:'遊樂園',
  sc:['對方靠在牆邊：「…你怎麼還沒走。」','對方沉默地陪你走了一段路，什麼也沒說。'],
  g:['對方別開視線，低聲說：「…你是例外。」','對方難得地笑了一下：「別告訴別人。」'],m:['對方看了你一眼，沒說話。'],
  b:['對方眼神一冷：「…當我沒說。」','對方轉身離開，留下一句：「不用了。」']},
 {n:'青梅竹馬型',em:'🧸',tone:'溫柔',gift:'手作禮物',place:'夜市小吃',dT:'強勢',dG:'3C小物',dP:'山上看夜景',
  sc:['對方熟門熟路地搶走你的零食：「欸這個我小時候就吃過了。」','對方突然說：「你還記得我們小時候的約定嗎？」'],
  g:['對方笑得很燦爛：「還是你最懂我。」','對方輕輕靠過來：「有你在，我就覺得很安心。」'],m:['對方笑笑：「也是啦。」'],
  b:['對方愣了一下：「你…變得好陌生。」','對方低下頭：「我是不是不夠了解你？」']},
 {n:'毒舌天才型',em:'🧠',tone:'認真',gift:'3C小物',place:'美術館展覽',dT:'溫柔',dG:'甜點',dP:'夜市小吃',
  sc:['對方斜眼看你：「這題你都不會？真是令人擔憂。」','對方推來一份筆記：「拿去，別誤會，只是怕你拖累我。」'],
  g:['對方一頓，別開臉：「…你的腦袋還算有救。」耳朵卻紅了。','對方輕哼：「勉強及格，下次繼續。」'],m:['對方挑了挑眉：「哦？」'],
  b:['對方嘆氣：「我高估你了。」','對方挑眉：「這種反應，有點無聊。」']}];
const TONES=[{v:'溫柔',s:'「別擔心，我會一直陪著你。」'},{v:'幽默',s:'「不如來比賽，誰先笑場誰請客？」'},{v:'強勢',s:'「別想太多，今天就照我說的辦。」'},{v:'認真',s:'「我是認真的，我想更了解你。」'},{v:'害羞',s:'「呃…我、我其實有點緊張…」'}];
const GIFTS=[{v:'甜點',c:800,e:'🍰'},{v:'鮮花',c:1500,e:'💐'},{v:'書籍',c:600,e:'📖'},{v:'3C小物',c:6000,e:'🎧'},{v:'手作禮物',c:300,e:'🧶'},{v:'球鞋運動用品',c:3500,e:'👟'}];
const PLACES=[{v:'咖啡廳',c:1500,e:'☕'},{v:'海邊兜風',c:1200,e:'🌊'},{v:'夜市小吃',c:800,e:'🍢'},{v:'美術館展覽',c:1000,e:'🖼️'},{v:'遊樂園',c:3000,e:'🎡'},{v:'山上看夜景',c:1000,e:'🌃'}];
const stg=a=>a<25?'初識':a<45?'熟識':a<65?'曖昧':a<85?'心動':'熱戀';
const hbar=v=>`<div class="bar"><i style="width:${Math.max(0,Math.min(100,v))}%;background:#ec4899"></i></div>`;
const samp=(a,n)=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).slice(0,n).map(x=>x[1]);
const oriPick=o=>o&&o!=='隨機'?o:(()=>{const r=Math.random();return r<.88?'異性戀':r<.93?'同性戀':'雙性戀'})();

function bgInit(){const f=S.fam;S.bg={conn:f==='富裕'?R(45,75):f==='清寒'?R(5,20):R(20,45),par:f==='富裕'?R(3,6):f==='清寒'?R(1,3):R(2,5),sty:pick(BGSTY)}}
function mFix(){
 if(!S)return;
 if(S.stress==null)S.stress=20;if(S.net==null)S.net=0;if(!S.bg)bgInit();
 if(!S.crush)S.crush=[];if(!S.ex)S.ex=[];if(S.ap==null)S.ap=4;
 if(!S.ori)S.ori=(S.gen>1)?oriPick('隨機'):'異性戀';
 S.friends.forEach(fFix);if(S.partner)pFix(S.partner);
}
function fFix(f){if(f.tru==null)f.tru=R(40,70);if(!f.kind)f.kind='朋友';if(!f.tr)f.tr=pick(FTR);if(f.loan==null)f.loan=0}
function pFix(p){if(p.a==null)p.a=R(0,ARCH.length-1);if(!p.seen)p.seen={t:1,g:1,p:1,o:1};if(p.since==null)p.since=S.age}
function newFriend(kind){const sx=pick(['男','女']);return {n:fullName(sx),sx,rel:R(40,80),tru:R(35,70),kind:kind||(S.school?'同學':S.job&&!S.job.founder?'同事':'朋友'),tr:pick(FTR),loan:0}}
const refBonus=()=>(S.refer?.25:0)+(S.net>=60?.05:0)+(S.bg?S.bg.conn/1000:0);

/* ---- 包裝既有函式 ---- */
const _interact=interact;
const FACT={
 help:(k,p)=>{const key='q'+k+'help';if(S.acts[key])return B('今年已經借過了。');const amt=Math.max(30000,Math.round(sal()*.12));if(S.money<amt)return B('你的錢不夠。');
  S.acts[key]=1;S.money-=amt;p.loan=(p.loan||0)+amt;p.rel=cl(p.rel+R(6,12));p.tru=cl(p.tru+R(5,10));return G(`你借了 ${money(amt)} 給${p.n}，對方很感動。`)},
 ask:(k,p)=>{const key='q'+k+'ask';if(S.acts[key])return B('今年已經拜託過了。');if(p.rel<55||p.tru<55)return B('交情還不夠深，開不了口。');
  S.acts[key]=1;p.rel=cl(p.rel-R(3,8));const pr=p.tr==='熱心'?.7:p.tr==='功利'?(p.rel>75?.55:.25):p.tr==='內向'?.35:.5;
  if(chance(Math.min(.9,pr+(S.bg?S.bg.conn/400:0)))){S.refer=1;return G(`${p.n}答應幫你牽線，今年求職的錄取機率大增。`)}return B(`${p.n}說他也幫不上忙。`)},
 party:(k,p)=>{const key='q'+k+'party';if(S.acts[key])return B('今年已經聚過了。');if(S.money<px(2500))return B('你的錢不夠。');S.acts[key]=1;S.money-=px(2500);p.rel=cl(p.rel+R(3,7));chg('happy',3);S.stress=cl(S.stress-3);
  if(S.friends.length<14&&chance(.35)){const f=newFriend('朋友的朋友');S.friends.push(f);return G(`聚餐上認識了${f.n}，成為新朋友。`)}return G('大家聊得很開心。')},
 reconcile:(k,p)=>{const key='q'+k+'rec';if(S.acts[key])return B('今年已經試過了。');S.acts[key]=1;if(chance(.6)){p.rel=cl(p.rel+R(15,25));p.tru=cl(p.tru+8);return G('你們重新聊開了。')}p.rel=cl(p.rel-5);return B('對方還在氣頭上。')},
 cut:(k,p)=>{const i=+k.slice(1);const bad=p.tru<40||p.rel<35;S.friends.splice(i,1);if(bad){S.stress=cl(S.stress-4);return N(`你和${p.n}斷了聯絡，鬆了一口氣。`)}chg('happy',-4);return B(`你和${p.n}斷了聯絡，有些失落。`)}
};
interact=function(k,kind){
 const p=getP(k);
 if(p&&k[0]==='f'&&FACT[kind]){const r=FACT[kind](k,p);if(k[0]==='f'&&getP(k))getP(k).lastI=S.age;return r}
 if(p&&k==='partner'&&kind==='breakup'){S.ex.push({n:p.n,sx:p.sx,a:p.a,married:p.married,at:S.age});S.stress=cl(S.stress+8)}
 const r=_interact(k,kind);
 if(p&&k[0]==='f'){p.lastI=S.age;if((kind==='talk'||kind==='gift')&&r&&r[1]==='good')p.tru=cl((p.tru||50)+R(1,4))}
 return r;
};
const _enroll=enroll;
enroll=function(a,b,c,d){_enroll(a,b,c,d);const e=pick(SCENV);S.sc=e.k;log(`校風：${e.k}（${e.d}）`)};
const _yearly=yearly;
yearly=function(){_yearly();relYear()};

/* ---- 每年結算 ---- */
function relYear(){
 mFix();const a=S.age,b=S.bg;S.ap=4+(!S.partner&&S.looks>70?1:0);S.refer=0;
 S.stress=cl(S.stress-R(3,7)+(S.job&&!S.job.founder?3:0)+(S.mort?2:0)+(S.co?3:0)+Math.min(6,S.kids.filter(k=>k.age<7).length*3)-(S.happy>70?2:0));
 // 朋友：借款、疏遠
 for(let i=S.friends.length-1;i>=0;i--){const f=S.friends[i];fFix(f);
  if(f.loan>0){const pr=f.tr==='忠誠'?.85:f.tr==='功利'?.3:.55;
   if(chance(pr)){S.money+=f.loan;log(`${f.n}還了你 ${money(f.loan)}。`,'good');f.loan=0;f.tru=cl(f.tru+4)}
   else if(chance(.3)){log(`${f.n}一直沒還你 ${money(f.loan)}，你們的關係變僵了。`,'bad');f.rel=cl(f.rel-8);f.tru=cl(f.tru-8)}}
  if(f.lastI==null||f.lastI<a-1){f.rel=cl(f.rel-R(1,4));if(f.rel<10&&a>20){log(`你和${f.n}漸行漸遠，不再聯絡。`);S.friends.splice(i,1)}}}
 S.net=cl(Math.round(S.friends.reduce((s,f)=>s+f.rel/100*f.tru/100*16,0)+b.conn*.25+(S.job?4:0)));
 if(a>=15){if(S.net>=55)chg('happy',1);else if(S.net<18&&a>=18){chg('happy',-2);S.stress=cl(S.stress+2)}}
 // 家世
 if(a<=22){const s=b.sty;
  if(s==='嚴格'){S.stress=cl(S.stress+3);chg('happy',-1);if(S.school)S.grade=cl(S.grade+2)}
  else if(s==='虎媽'){S.stress=cl(S.stress+5);chg('happy',-2);if(S.school)S.grade=cl(S.grade+3);S.mom.rel=cl(S.mom.rel-1)}
  else if(s==='溺愛'){chg('happy',2);if(S.school)S.grade=cl(S.grade-1)}
  else if(s==='開明'){chg('happy',1);S.stress=cl(S.stress-1)}
  else if(S.school)S.grade=cl(S.grade-1)}
 if(S.school){if(b.par>=4)S.grade=cl(S.grade+2);else if(b.par<=1)S.grade=cl(S.grade-1)}
 // 校風
 if(S.school){if(!S.sc)S.sc=pick(SCENV).k;const c=S.sc;
  if(c==='競爭激烈'){S.grade=cl(S.grade+3);S.stress=cl(S.stress+4);chg('happy',-2)}
  else if(c==='自由開放'){chg('happy',2);S.grade=cl(S.grade-1)}
  else if(c==='社團活躍'){S.stress=cl(S.stress-1);if(S.friends.length<14&&chance(.3))S.friends.push(newFriend('社團同學'))}
  else if(c==='資源豐富'){if(chance(.4))chg('smarts',1)}
  else if(c==='霸凌風氣'){S.stress=cl(S.stress+2)}}
 else S.sc=null;
 // 職場
 if(S.job&&!S.job.founder){const j=S.job;if(!j.env)j.env={b:pick(JBOSS),c:pick(JCUL)};const e=j.env,pf=d=>{j.perf=cl((j.perf==null?50:j.perf)+d)};
  if(e.c==='加班文化'){S.stress=cl(S.stress+R(4,8));chg('health',-R(0,2));pf(R(1,4))}
  else if(e.c==='彈性友善'){S.stress=cl(S.stress-R(1,3));chg('happy',R(0,2))}
  else if(e.c==='內捲競爭'){S.stress=cl(S.stress+R(3,6));pf(R(2,5))}
  else S.stress=cl(S.stress-R(0,2));
  if(e.b==='嚴厲主管'){S.stress=cl(S.stress+R(1,3));pf(R(0,3))}else if(e.b==='友善主管'){chg('happy',R(0,2));S.stress=cl(S.stress-1)}else if(e.b==='功利主管')pf(j.perf>60?2:-2)}
 if(S.stress>=75){chg('health',-R(1,3));chg('happy',-R(2,4))}
 // 戀愛：心儀對象淡化、伴侶疏忽
 S.crush=S.crush.filter(c=>{if(a-c.met<=6&&c.ok&&c.aff<75&&chance(.7))c.aff=cl(c.aff+R(4,9));else if(c.last<a-1)c.aff=cl(c.aff-R(2,5));if(c.aff<=3||a-c.met>8){log(`你和${c.n}漸漸失去聯絡。`);return false}return true});
 if(!S.partner&&a>=18&&a<=45&&S.crush.length<2&&chance(.22)){const c=newCrush(S.school?'學校':S.job?'公司':'朋友聚會'),A=ARCH[c.a];S.crush.push(c);log(`你在${c.src}認識了${c.n}（${A.em}${A.n}），對方給你的印象不錯。`)}
 if(S.partner){const p=S.partner;pFix(p);
  if(p.lastI==null||p.lastI<a-1){p.rel=cl(p.rel-R(3,7));if(p.rel<35)log(`你很久沒關心${p.n}了，對方似乎很失落。`,'bad')}
  if(p.rel<15&&chance(.35)){log(`${p.n}提出了分手。`,'bad');interact('partner','breakup')}}
}

/* ---- 戀愛：新對象 ---- */
function newCrush(src){
 const opp=S.sx==='男'?'女':'男',o=S.ori;
 const sx=o==='異性戀'?opp:o==='同性戀'?S.sx:pick([opp,S.sx]);
 const ok=chance(o==='雙性戀'?.8:(sx===opp?.9:.7));
 return {id:Date.now()%1e6+R(0,9999),n:fullName(sx),sx,a:R(0,ARCH.length-1),aff:R(15,35),ok,seen:{t:0,g:0,p:0,o:0},met:S.age,last:S.age,src:src||''};
}
function mkPartner(c){S.flags.lovers=(S.flags.lovers||0)+1;S.partner={n:c.n,sx:c.sx,rel:Math.max(55,c.aff-5),married:false,off:R(-3,3),a:c.a,seen:{t:1,g:1,p:1,o:1},since:S.age,cohab:false,lastI:S.age,st:c.st||0,tru:c.tru==null?50:c.tru,jel:0};S.crush=S.crush.filter(x=>x!==c)}
function meetNew(){
 if(S.age<13)return B('年紀還太小。');if(S.ap<1)return B('今年的行動點用完了。');if(S.money<px(1500))return B('你的錢不夠。');
 if(S.crush.length>=5)return B('心儀對象已經滿了，先處理手邊的關係吧。');
 S.ap--;S.money-=px(1500);const c=newCrush(S.school?'學校活動':S.job?'同事介紹':'交友活動');S.crush.push(c);const A=ARCH[c.a];
 return G(`你在${c.src}認識了${c.n}（${A.em}${A.n}）。`)
}
function confess(c){
 if(S.partner)return B('你已經有伴侶了，要先處理好現有的關係。');
 if(S.age<16)return B('年紀還太小了。');if(c.aff<50)return B('你們還不夠熟（好感需 50 以上），現在告白成功率很低…');
 if(!c.ok){S.friends.push({n:c.n,rel:Math.max(40,c.aff-10),tru:60,kind:'朋友',tr:pick(FTR),loan:0});S.crush=S.crush.filter(x=>x!==c);chg('happy',-8);S.stress=cl(S.stress+6);return B(`${c.n}溫柔地拒絕了你：「對不起，我只把你當作很重要的朋友。」你們仍是朋友。`)}
 const p=c.aff>=90?1:Math.min(.95,Math.max(.1,(c.aff-40)/60+S.looks/400));
 if(chance(p)){mkPartner(c);chg('happy',R(10,16));S.stress=cl(S.stress-6);return G(`${c.n}紅著臉點頭：「嗯，我也喜歡你。」你們在一起了！`)}
 c.aff=cl(c.aff-12);chg('happy',-6);return B(`${c.n}沉默了一下：「讓我再想想…」告白沒有成功，但還有機會。`)
}

/* ---- 場景互動 ---- */
function tgtOf(k){return k==='p'?S.partner:S.crush.find(c=>c.id===k)}
function actStart(t,isP,kind){
 const A=ARCH[t.a];
 if(['talk','gift','date','look','chance','trip'].includes(kind)&&S.ap<1)return B('今年的行動點用完了，明年再努力！');
 const k=isP?'p':t.id;
 if(kind==='talk'){view.scene={k,type:'talk',text:isP?`你想和${t.n}好好聊聊。你要用什麼語氣？`:pick(A.sc),opts:samp(TONES,4).map(o=>({l:o.v,s:o.s,v:o.v}))};return null}
 if(kind==='gift'){view.scene={k,type:'gift',text:`你想送${t.n}什麼？`,opts:GIFTS.map(o=>({l:o.e+o.v,s:money(o.c),v:o.v,c:o.c}))};return null}
 if(kind==='date'){if(!isP&&t.aff<25)return B(`${t.n}婉拒了邀約：「我們還不太熟吧？」（好感需 25 以上）`);
  view.scene={k,type:'date',text:`要帶${t.n}去哪裡？`,opts:PLACES.map(o=>({l:o.e+o.v,s:money(o.c),v:o.v,c:o.c}))};return null}
 if(kind==='look'){S.ap--;const un=['t','g','p'].filter(x=>!t.seen[x]);const A2=ARCH[t.a];let m=`你默默觀察了${t.n}。`;
  if(un.length){const x=pick(un);t.seen[x]=1;m+=x==='t'?`對方似乎偏愛「${A2.tone}」的說話方式。`:x==='g'?`對方的目光常停在「${A2.gift}」上。`:`對方提過很想去「${A2.place}」。`}
  t.seen.o=1;m+=t.ok?'你隱約感覺對方對你並非無意。':'你有種預感，對方可能只把你當朋友。';return N(m)}
 if(kind==='chance'){S.ap--;const d=R(2,7);t.aff=cl(t.aff+d);t.last=S.age;return G(`你「剛好」出現在${t.n}常去的地方，聊了幾句（好感 +${d}）。`)}
 if(kind==='trip'){if(S.money<px(40000))return B('旅行至少要 '+money(px(40000))+'。');S.ap--;S.money-=px(40000);t.lastI=S.age;const d=R(8,14);t.rel=cl(t.rel+d);chg('happy',6);S.stress=cl(S.stress-8);return G(`你們一起去旅行，感情更深了（好感 +${d}）。`)}
 if(kind==='cohab'){if(t.cohab||t.married)return B('你們已經住在一起了。');t.cohab=true;t.lastI=S.age;t.rel=cl(t.rel+R(5,10));chg('happy',4);return G(`${t.n}搬進了你的住處，開始同居生活。`)}
 if(kind==='propose'){if(t.married)return B('你們已經結婚了。');if(!canMarry(t))return B(`${calYear()} 年的${CNS[S.cn||'TW'].n}尚未承認同性婚姻。可到「移民」頁移居到承認的國家，或維持同居。`);t.lastI=S.age;return _interact('partner','propose')}
 if(kind==='baby'){if(t.sx===S.sx)return B('同性伴侶可考慮人工生殖或領養。');return _interact('partner','baby')}
 if(kind==='art'){if(!t.married)return B('需要先結婚。');if(t.sx!==S.sx)return B('異性伴侶請使用「生小孩」。');
  if(S.acts.art)return B('今年已經嘗試過了。');const tw=(S.cn||'TW')==='TW',cost=tw?px(2000000):px(600000);
  if(S.money<cost)return B(`${tw?'台灣現行《人工生殖法》僅適用已婚異性夫妻，同性伴侶需赴海外人工生殖或代孕，費用高昂（遊戲估算約 '+money(px(2000000))+'）':'人工生殖約需 '+money(px(600000))+'（遊戲估算）'}。`);
  S.acts.art=1;S.money-=cost;
  if(chance(S.sx==='男'?.35:.45)){const sx=pick(['男','女']),n=S.name[0]+given(sx,calYear());S.kids.push(newKid(sx,n));chg('happy',12);birthSubsidy();return G(`你們迎接了新生兒${n}！`)}return N('這次沒有成功，但還有機會。')}
 if(kind==='adopt')return adopt(t);
 return null
}
function adopt(p){
 if(S.age<25||S.age>55)return B('領養者需 25～55 歲（遊戲簡化）。');
 if(p&&p.married&&p.sx===S.sx&&(S.cn||'TW')==='TW'&&calYear()<2023)return B('台灣 2023 年以前，已婚同性伴侶只能做繼親收養，不能共同收養無血緣兒童。');
 if(S.money<px(50000))return B('收出養程序與安置相關費用（遊戲估算約 '+money(px(50000))+'）不足。');if(S.acts.adopt)return B('今年已經領養過了。');S.acts.adopt=1;S.money-=px(50000);
 const sx=pick(['男','女']),n=S.name[0]+given(sx,calYear()),k=newKid(sx,n);k.age=R(0,3);k.rel=R(55,85);k.adopt=1;S.kids.push(k);chg('happy',10);return G(`歷經審查與評估，你領養了${n}（${k.age} 歲），成為家人。`)
}
function sceneApply(t,isP,type,o){
 const A=ARCH[t.a];let d=0,q='n';
 if(type==='talk'){if(o.v===A.tone){d=R(8,13);q='g'}else if(o.v===A.dT){d=-R(3,7);q='b'}else d=R(2,5);if(q!=='n')t.seen.t=1}
 else if(type==='gift'){if(o.v===A.gift){d=R(9,15);q='g'}else if(o.v===A.dG){d=-R(2,6);q='b'}else d=R(3,6);if(q!=='n')t.seen.g=1;chg('happy',2)}
 else{if(o.v===A.place){d=R(10,16);q='g'}else if(o.v===A.dP){d=-R(2,6);q='b'}else d=R(3,7);if(q!=='n')t.seen.p=1;chg('happy',R(1,3));S.stress=cl(S.stress-R(1,3))}
 if(d>0&&S.looks>75)d++;if(isP)d=Math.round(d*.6);
 let tx=pick(A[q==='n'?'m':q]);
 if(type==='date'&&q==='g'&&(isP?t.rel:t.aff)>=65&&chance(.4)){tx+=' 夕陽下，對方輕輕牽起了你的手。';d+=3}
 if(isP)t.rel=cl(t.rel+d);else t.aff=cl(t.aff+d);if(isP)t.lastI=S.age;else t.last=S.age;
 log(`和${t.n}${type==='talk'?'聊天':type==='gift'?'送禮':'約會'}，好感 ${d>=0?'+':''}${d}。`,q==='b'?'bad':q==='g'?'good':'');
 view.rmsg={q,t:`你選了「${o.l}」。\n${tx}（好感 ${d>=0?'+':''}${d}）`};
}
function romHandle(x,y,z){
 mFix();
 if(x==='go'){view.scene=null;view.rmsg=null;view.rsub=y==='p'&&S.partner?'Rp':'R';return null}
 if(x==='c'){view.scene=null;view.rmsg=null;view.rsub='Rc'+y;return null}
 if(x==='cancel'){view.scene=null;return null}
 if(x==='meet'){view.rsub='R';return meetNew()}
 if(x==='drop'){S.crush.splice(+y,1);view.rsub='R';view.scene=null;return N('你決定放下這段心意。')}
 if(x==='act'){const isP=y==='p',t=isP?S.partner:S.crush[+y];if(!t)return B('對象已不在了。');view.rsub=isP?'Rp':'Rc'+y;view.rmsg=null;view.scene=null;
  if(isP&&z==='break'){view.rsub='R';return interact('partner','breakup')}
    return actStart(t,isP,z)}
 if(x==='adopt'){view.rsub='R';return adopt(S.partner)}
 if(x==='pick'){const sc=view.scene;if(!sc)return null;const t=tgtOf(sc.k);if(!t){view.scene=null;return null}const o=sc.opts[+y];
  if(o.c&&S.money<o.c)return B('你的錢不夠。');if(S.ap<1){view.scene=null;return B('行動點不足。')}
  S.ap--;S.money-=o.c||0;sceneApply(t,sc.k==='p',sc.type,o);view.scene=null;return null}
 if(x==='cf'){const c=S.crush[+y];if(!c)return null;const r=confess(c);const i=S.crush.indexOf(c);view.rsub=i>=0?'Rc'+i:(S.partner?'Rp':'R');view.scene=null;return r}
 return null
}

/* ---- 畫面 ---- */
function romBubble(){const m=view.rmsg;view.rmsg=null;return m?`<div class="bub ${m.q==='b'?'bad':m.q==='g'?'good':''}">${esc(m.t).replace(/\n/g,'<br>')}</div>`:''}
function sceneHTML(t,k){
 const sc=view.scene;if(!sc||sc.k!==k)return '';
 return `<div class="bub">${esc(sc.text)}</div>`+sc.opts.map((o,i)=>`<button class="btn" data-a="rom:pick:${i}">${esc(o.l)}${o.s?`<small>${esc(o.s)}</small>`:''}</button>`).join('')+`<button class="btn" data-a="rom:cancel">取消</button>`;
}
function romHTML(k){
 mFix();
 if(k==='Rp'&&S.partner)return partnerPage();
 if(k&&k.startsWith('Rc')){const i=+k.slice(2);if(S.crush[i])return crushPage(i)}
 return romHome();
}
function romHome(){
 let h=`<h3>💘 戀愛</h3><div class="sub">性向：${S.ori}・今年剩餘行動點 <b>${S.ap}</b>（聊天、送禮、約會、旅行都會消耗）</div><div class="sec">伴侶</div>`;
 if(S.partner){const p=S.partner;pFix(p);const A=ARCH[p.a];h+=`<div class="item row"><div style="flex:1"><b>${A.em} ${esc(p.n)}</b>・${p.married?'配偶':p.cohab?'同居伴侶':'伴侶'}・${A.n}${hbar(p.rel)}</div><button class="mini" data-a="rom:go:p">互動</button></div>`}
 else h+='<p class="sub">目前單身。</p>';
 h+='<div class="sec">心儀對象</div>'+(S.crush.length?S.crush.map((c,i)=>{const A=ARCH[c.a];return `<div class="item row"><div style="flex:1"><b>${A.em} ${esc(c.n)}</b>・${c.sx==='男'?'♂':'♀'}・${stg(c.aff)}・${A.n}${hbar(c.aff)}</div><button class="mini" data-a="rom:c:${i}">攻略</button></div>`}).join(''):'<p class="sub">還沒有心儀的人。多出門、換環境、參加活動都能遇到新對象。</p>');
 h+=`<button class="btn" data-a="rom:meet">🔍 主動認識新對象<small>1 點行動・${money(px(1500))}</small></button>`;
 h+=`<button class="btn" data-a="rom:adopt">🍼 領養孩子<small>25～55 歲・約 ${money(px(50000))}（估算）・單身或已婚皆可</small></button>`;
 return h+`<button class="btn" data-a="open:rel">← 返回家庭</button>`;
}
function crushPage(i){
 const c=S.crush[i],A=ARCH[c.a],k=c.id;
 let h=`<h3>${A.em} ${esc(c.n)}</h3><div class="sub">${A.n}・${c.sx==='男'?'♂':'♀'}・${stg(c.aff)}・認識 ${S.age-c.met} 年・行動點 ${S.ap}</div>${hbar(c.aff)}`;
 h+=`<div class="sub">喜歡的語氣：${c.seen.t?A.tone:'？'}　禮物：${c.seen.g?A.gift:'？'}　約會：${c.seen.p?A.place:'？'}${c.seen.o?(c.ok?'　💗 似乎有戲':'　💔 可能只當朋友'):''}</div>`;
 h+=romBubble();
 if(view.scene&&view.scene.k===k)return h+sceneHTML(c,k);
 const b=(a,t,s,dis)=>`<button class="btn" data-a="rom:act:${i}:${a}" ${dis?'disabled':''}>${t}${s?`<small>${s}</small>`:''}</button>`;
 h+=b('talk','💬 聊天','選擇語氣・1 點')+b('gift','🎁 送禮','1 點')+b('date','📍 約會','好感 25 以上・1 點')+b('look','👀 觀察','得知喜好與心意・1 點')+b('chance','🍀 製造偶遇','好感小幅提升・1 點');
 h+=`<button class="btn p" data-a="rom:cf:${i}" ${c.aff<50||S.partner?'disabled':''}>💌 告白<small>${S.partner?'已有伴侶':'好感 50 以上才能告白'}</small></button>`;
 h+=`<button class="btn" data-a="rom:drop:${i}">🚪 放下這段心意</button><button class="btn" data-a="rom:go:h">← 返回</button>`;
 return h;
}
function partnerPage(){
 const p=S.partner;pFix(p);const A=ARCH[p.a];
 let h=`<h3>${A.em} ${esc(p.n)}</h3><div class="sub">${p.married?'配偶':p.cohab?'同居伴侶':'伴侶'}・${A.n}・在一起 ${S.age-p.since} 年・行動點 ${S.ap}</div>${hbar(p.rel)}`;
 if(p.sx===S.sx&&!canMarry(p))h+=`<div class="sub">⚠️ ${calYear()} 年的${CNS[S.cn||'TW'].n}尚未承認同性婚姻（可到「移民」頁移居承認的國家）。</div>`;
 h+=romBubble();
 if(view.scene&&view.scene.k==='p')return h+sceneHTML(p,'p');
 const b=(a,t,s,dis)=>`<button class="btn" data-a="rom:act:p:${a}" ${dis?'disabled':''}>${t}${s?`<small>${s}</small>`:''}</button>`;
 h+=b('talk','💬 深聊','選擇語氣・1 點')+b('date','📍 約會','1 點')+b('gift','🎁 送禮','1 點')+b('trip','✈️ 一起旅行',money(px(40000))+'・1 點');
 if(!p.married&&!p.cohab)h+=b('cohab','🏠 同居');
 if(!p.married)h+=b('propose','💍 求婚','婚禮 '+money(px(300000)));
 if(p.married&&p.sx!==S.sx)h+=b('baby','👶 生小孩');
 if(p.married&&p.sx===S.sx)h+=b('art','🧬 人工生殖／代孕',(S.cn||'TW')==='TW'?'台灣須赴海外・約 '+money(px(2000000))+'（估算）':'約 '+money(px(600000))+'（估算）');
 if(p.married)h+=b('adopt','🍼 領養','25～55 歲・約 '+money(px(50000))+'（估算）');
 h+=b('break',p.married?'💔 離婚':'💔 分手');
 return h+`<button class="btn" data-a="rom:go:h">← 返回</button>`;
}
function friendExtra(k){
 const p=getP(k);fFix(p);
 let h=`<div class="sub">${p.kind}・個性：${p.tr}・信任 ${p.tru}${p.loan?`・借款未還 ${money(p.loan)}`:''}</div>${pbar(p.tru)}`;
 const b=(a,t,s)=>`<button class="btn" data-a="do:${k}:${a}">${t}${s?`<small>${s}</small>`:''}</button>`;
 h+=b('talk','💬 聊天')+b('gift','🎁 送禮',money(px(2000)))+b('party','🍻 聚餐',money(px(2500))+'・可能認識新朋友')+b('help','🤝 借錢給他','約年薪的 12%')+b('ask','📨 請他引薦工作','需好感與信任 55 以上');
 if(p.rel<45)h+=b('reconcile','🕊️ 試著和好');
 h+=b('fight','😠 吵架')+b('cut','✂️ 斷絕往來');
 return h;
}
function relTop(){
 mFix();const b=S.bg;
 return `<div class="item"><b>🕸️ 人脈 ${S.net}</b>${pbar(S.net)}<div class="sub">家世：${S.fam}・人脈資源 ${b.conn}・父母學歷 ${EDUN[b.par]||'—'}・家教：${b.sty}${S.school&&S.sc?`<br>校風：${S.sc}`:''}${S.job&&S.job.env?`<br>職場：${S.job.env.c}、${S.job.env.b}`:''}</div></div>`;
}
function romRow(){
 mFix();let h='';
 if(S.partner){const p=S.partner;h+=`<div class="item row"><div style="flex:1"><b>${p.married?'配偶 ':'伴侶 '}${esc(p.n)}</b>${hbar(p.rel)}</div><button class="mini" data-a="rel:partner">互動</button></div>`}else h+='<p class="sub">目前單身。</p>';
 return h+`<button class="btn" data-a="rom:go:h">💘 戀愛攻略<small>${S.crush.length} 位心儀對象・性向 ${S.ori}</small></button>`;
}

/* ---- 事件 ---- */
const topCrush=()=>S.crush.slice().sort((a,b)=>b.aff-a.aff)[0];
E.push(
{id:'rmeet',min:15,max:65,w:5,if:()=>{mFix();return S.crush.length<5&&!S.jail},run:()=>{mFix();const c=newCrush(S.school?pick(['學校','社團']):S.job?pick(['公司','客戶端']):pick(['朋友聚會','交友軟體','咖啡店','運動場館'])),A=ARCH[c.a];
 return {t:`你在${c.src}認識了${c.n}（${A.em}${A.n}），對方很有魅力。`,c:[
  ch('主動搭話',()=>{S.crush.push(c);c.aff=cl(c.aff+R(8,15)+(S.looks>70?3:0));return G(`你和${c.n}聊得很投機，把對方列為心儀對象。`)}),
  ch('交換聯絡方式',()=>{S.crush.push(c);c.aff=cl(c.aff+R(3,8));return N(`你和${c.n}互相加了好友。`)}),
  ch('保持距離',()=>N('你什麼也沒做，錯過了一段緣分。'))]}}},
{id:'rjeal',min:18,max:65,w:2.5,if:()=>S.partner&&S.crush.some(c=>c.aff>=45),run:()=>{const c=topCrush(),p=S.partner;return {t:`${p.n}看到你和${c.n}聊天的紀錄，臉色不太好看。`,c:[
  ch('誠實解釋',()=>{if(chance(.7)){p.rel=cl(p.rel+3);return G('你解釋清楚了，對方選擇相信你。')}p.rel=cl(p.rel-10);return B('對方還是很介意。')}),
  ch('道歉並疏遠對方',()=>{p.rel=cl(p.rel+2);c.aff=cl(c.aff-20);return N(`你向${p.n}道歉，並和${c.n}保持距離。`)}),
  ch('嘴硬不認錯',()=>{p.rel=cl(p.rel-18);S.stress=cl(S.stress+5);return B('你們大吵一架。')})]}}},
{id:'rmis',min:18,max:75,w:2,if:()=>!!S.partner,run:()=>{const p=S.partner;return {t:`${p.n}${pick(['誤會你忘了紀念日','聽說你和前任還有聯絡','覺得你最近都在敷衍他'])}，氣呼呼地不理你。`,c:[
  ch('主動說清楚',()=>{if(chance(.75)){p.rel=cl(p.rel+8);return G('誤會解開了，感情反而更好。')}p.rel=cl(p.rel-6);return B('對方還需要時間。')}),
  ch('等對方冷靜',()=>{if(chance(.5)){p.rel=cl(p.rel+4);return N('過幾天對方自己氣消了。')}p.rel=cl(p.rel-4);return B('冷戰拖得有點久。')}),
  ch('跟著冷戰',()=>{p.rel=cl(p.rel-15);S.stress=cl(S.stress+4);return B('兩人都不低頭，感情降溫。')})]}}},
{id:'rconf',min:16,max:60,w:6,if:()=>!S.partner&&S.crush.some(c=>c.aff>=55&&c.ok),run:()=>{const c=S.crush.filter(x=>x.aff>=55&&x.ok)[0],A=ARCH[c.a];return {t:`${c.n}（${A.em}${A.n}）鼓起勇氣向你告白：「我喜歡你，可以和我交往嗎？」`,c:[
  ch('接受',()=>{mkPartner(c);chg('happy',R(10,15));return G(`你們在一起了！`)}),
  ch('婉拒',()=>{c.aff=cl(c.aff-30);chg('happy',-3);return N('你婉拒了對方，氣氛有些尷尬。')})]}}},
{id:'rrival',min:16,max:55,w:2,if:()=>!S.partner&&S.crush.some(c=>c.aff>=40),run:()=>{const c=topCrush();return {t:`你發現也有人在追${c.n}，對方看起來條件不錯。`,c:[
  ch('公平競爭',()=>{if(chance(.5)){c.aff=cl(c.aff+5);return G(`${c.n}還是比較在意你。`)}c.aff=cl(c.aff-15);chg('happy',-4);return B(`${c.n}似乎被對方吸引了。`)}),
  ch('砸錢送大禮（'+money(px(20000))+'）',()=>{if(S.money<px(20000))return B('你的錢不夠。');S.money-=px(20000);if(chance(.7)){c.aff=cl(c.aff+10);return G('大禮讓對方印象深刻。')}return N('對方收下了禮物，但沒有特別反應。')}),
  ch('退出競爭',()=>{S.crush=S.crush.filter(x=>x!==c);S.stress=cl(S.stress-3);return N('你選擇祝福對方。')})]}}},
{id:'rfest',min:16,max:70,w:2,if:()=>!!S.partner||S.crush.some(c=>c.aff>=55),run:()=>{const isP=!!S.partner,t=isP?S.partner:topCrush(),f=d=>{if(isP)t.rel=cl(t.rel+d);else t.aff=cl(t.aff+d)};return {t:`${pick(['情人節','七夕','聖誕節','紀念日'])}到了，你要為${t.n}準備什麼？`,c:[
  ch('精心安排（'+money(px(8000))+'）',()=>{if(S.money<px(8000))return B('你的錢不夠。');S.money-=px(8000);f(R(8,14));chg('happy',4);return G('對方感動極了。')}),
  ch('簡單的心意（'+money(px(1500))+'）',()=>{if(S.money<px(1500))return B('你的錢不夠。');S.money-=px(1500);f(R(2,6));return N('平淡但溫馨。')}),
  ch('沒特別準備',()=>{f(-R(3,8));return B('對方有點失望。')})]}}},
{id:'rpush',min:27,max:42,w:2.5,if:()=>!S.partner,run:()=>{mFix();const s=S.bg.sty,hard=s==='嚴格'||s==='虎媽';const c=[
  ch('去相親（'+money(px(3000))+'）',()=>{if(S.money<px(3000))return B('你的錢不夠。');if(S.crush.length>=5)return N('你心儀對象已經夠多了。');S.money-=px(3000);const c=newCrush('相親');c.aff=R(10,25);S.crush.push(c);return N(`你在相親場合認識了${c.n}。`)}),
  ch('直接拒絕',()=>{S.mom.rel=cl(S.mom.rel-(hard?10:4));S.dad.rel=cl(S.dad.rel-(hard?8:3));chg('happy',hard?-3:1);return N('你表明目前不想被安排。')}),
  ch('敷衍帶過',()=>{S.stress=cl(S.stress+(hard?4:2));return N('你笑著說再看看。')})];
 if(S.ori!=='異性戀'&&!S.flags.out)c.push(ch('藉機說明自己的性向',()=>comingOut()));
 return {t:`${hard?'爸媽':'親戚'}又在催你找對象了，${hard?'態度相當強硬':'語氣比較委婉'}。`,c}}},
{id:'rout',min:17,max:45,w:2,if:()=>S.ori!=='異性戀'&&!S.flags.out&&S.age>=18,run:()=>({t:'你想過要不要讓家人知道自己的性向。',c:[ch('勇敢說出來',()=>comingOut()),ch('先不說',()=>{S.stress=cl(S.stress+3);return N('你決定再等一等。')})]})},
{id:'rex',min:22,max:70,w:1.5,if:()=>S.ex&&S.ex.length&&!S.partner,run:()=>{const x=S.ex[R(0,S.ex.length-1)];return {t:`前任${x.n}突然傳訊息來，說想跟你聊聊。`,c:[
  ch('見面談談',()=>{if(chance(.4)){S.ex=S.ex.filter(e=>e!==x);S.partner={n:x.n,sx:x.sx,rel:55,married:false,off:R(-3,3),a:x.a,seen:{t:1,g:1,p:1,o:1},since:S.age,cohab:false,lastI:S.age};return G('你們決定重新開始。')}chg('happy',-3);return N('談完之後，你們都明白已回不去了。')}),
  ch('保持距離',()=>{S.ex=S.ex.filter(e=>e!==x);return N('你沒有回覆。')})]}}},
{id:'rnet',min:22,max:58,w:2,if:()=>S.net>=55&&!S.jail,run:()=>{const f=S.friends.slice().sort((a,b)=>b.rel-a.rel)[0];if(!f)return null;return {t:`${f.n}說他的公司正在找人，願意推薦你。`,c:[
  ch('接受推薦',()=>{if(S.job&&!S.job.founder){S.job.sal=Math.round(S.job.sal*1.15);S.job.env=null;chg('happy',5);return G('你換到新的職位，薪水提高了 15%。')}
   const j=JOBS.filter(q=>q.sm<=S.smarts+5&&q.edu<=S.edu&&!jobBlock(q));if(!j.length)return N('可惜沒有適合你的職缺。');const q=pick(j);S.job=hireJob(q);chg('happy',6);return G(`你透過人脈錄取了「${q.t}」！`)}),
  ch('婉拒',()=>N('你覺得現在的狀況不錯。'))]}}},
{id:'oboss',min:22,max:62,w:2.5,if:()=>S.job&&!S.job.founder&&S.job.env&&(S.job.env.b==='嚴厲主管'||S.job.env.c==='加班文化'),run:()=>({t:'主管要求你這個週末加班趕專案。',c:[
  ch('答應',()=>{S.job.perf=cl(S.job.perf+R(3,8));S.stress=cl(S.stress+R(4,8));chg('health',-R(0,2));return N('你犧牲週末，績效更好看。')}),
  ch('婉拒',()=>{S.job.perf=cl(S.job.perf-R(2,6));chg('happy',3);S.stress=cl(S.stress-3);return N('主管有點不高興，但你有了完整的週末。')})]})},
{id:'ocol',min:22,max:62,w:2.5,if:()=>S.job&&!S.job.founder,run:()=>({t:'同事邀你下班後一起吃飯聊聊。',c:[
  ch('參加（'+money(px(1500))+'）',()=>{if(S.money<px(1500))return B('你的錢不夠。');S.money-=px(1500);chg('happy',3);if(S.friends.length<14&&chance(.45)){const f=newFriend('同事');S.friends.push(f);return G(`你和${f.n}成了朋友。`)}return N('氣氛不錯。')}),
  ch('幫同事頂班',()=>{S.karma=cl(S.karma+3);S.job.perf=cl(S.job.perf-2);later(R(2,5),'favor','同事');return N('同事很感激你。')}),
  ch('婉拒',()=>N('你直接下班回家。'))]})},
{id:'oblame',min:22,max:62,w:1.5,if:()=>S.job&&!S.job.founder,run:()=>({t:'同事把專案失誤的責任推到你身上。',c:[
  ch('據理力爭',()=>{if(chance(.6)){S.job.perf=cl(S.job.perf+3);return G('你拿出證據，成功洗清。')}S.job.perf=cl(S.job.perf-4);S.stress=cl(S.stress+4);later(R(3,6),'foe',fullName(pick(['男','女'])));return B('場面鬧僵，主管各打五十大板。')}),
  ch('默默吞下',()=>{S.stress=cl(S.stress+6);S.job.perf=cl(S.job.perf-3);return B('你心裡很委屈。')}),
  ch('私下找主管說明',()=>{if(S.job.env&&S.job.env.b==='友善主管'||chance(.5)){return G('主管理解你的處境。')}S.stress=cl(S.stress+3);return N('主管只是說「下次注意」。')})]})},
{id:'sbully',min:7,max:18,w:3,if:()=>!!S.school&&S.sc==='霸凌風氣',run:()=>({t:'班上有人針對你，開始排擠與惡作劇。',c:[
  ch('勇敢反擊',()=>{if(chance(.5)){chg('happy',3);return G('對方被你的氣勢嚇到，收斂了。')}chg('health',-R(2,6));return B('衝突升高，你受了點傷。')}),
  ch('告訴老師',()=>{if(chance(.7)){chg('happy',2);S.stress=cl(S.stress-4);return G('老師介入處理，狀況好轉。')}S.stress=cl(S.stress+3);return N('老師只是口頭勸導。')}),
  ch('默默忍耐',()=>{chg('happy',-6);S.stress=cl(S.stress+8);later(R(6,18),'scar');return B('你心情很低落。')})]})},
{id:'sclub',min:12,max:22,w:3,if:()=>!!S.school&&S.sc==='社團活躍',run:()=>({t:'學校的社團博覽會熱鬧滾滾。',c:[
  ch('加入熱門社團',()=>{chg('happy',4);if(S.friends.length<14)S.friends.push(newFriend('社團同學'));chg('looks',1);return G('你認識了新朋友。')}),
  ch('專心念書',()=>{S.grade=cl(S.grade+3);return N('你把時間留給課業。')})]})},
{id:'scomp',min:12,max:22,w:3,if:()=>!!S.school&&S.sc==='競爭激烈',run:()=>({t:'班上同學都在拚段考，氣氛緊繃。',c:[
  ch('跟著拚命念',()=>{S.grade=cl(S.grade+8);S.stress=cl(S.stress+6);chg('happy',-3);return N('你的成績進步，但心力交瘁。')}),
  ch('適度放鬆',()=>{S.grade=cl(S.grade-4);S.stress=cl(S.stress-4);chg('happy',4);return N('你保持自己的步調。')})]})}
);
function comingOut(){
 S.flags.out=1;const s=S.bg.sty,pr={開明:.85,放任:.6,溺愛:.6,嚴格:.35,虎媽:.25}[s];
 if(chance(pr)){S.mom.rel=cl(S.mom.rel+8);S.dad.rel=cl(S.dad.rel+8);chg('happy',8);S.stress=cl(S.stress-8);return G('家人接納了你，你感到前所未有的輕鬆。')}
 if(chance(.4)){S.stress=cl(S.stress+4);return N('家人沉默了，需要時間消化。')}
 S.mom.rel=cl(S.mom.rel-25);S.dad.rel=cl(S.dad.rel-25);chg('happy',-10);S.stress=cl(S.stress+10);later(R(3,8),'soften');return B('家人情緒激動，關係一度降到冰點。')
}
