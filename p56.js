/* ---- p56：戀愛與婚姻深度：伴侶家庭背景、價值觀、長期劇情 ---- */
const PXV=[['m','金錢與安全感'],['f','家庭與孩子'],['c','事業與成就'],['r','自由與生活品質']];
const PXB=[['rich','家境優渥',.2],['mid','小康家庭',.55],['poor','家境吃緊，需要幫忙家計',.25]];
const pxName=k=>(PXV.find(x=>x[0]===k)||[0,'—'])[1];
function pxFix(p){if(!p||p.vl)return;const r=Math.random();p.fb=r<.2?'rich':r<.75?'mid':'poor';p.vl=pick(['m','f','c','r']);p.vl2=pick(PXV.map(x=>x[0]).filter(k=>k!==p.vl))}
function pxMine(){mFix();const t=S.pt||{},sc={m:(t.sta||50)*.5+(t.con||50)*.5,f:(t.agr||50),c:(t.con||50)+(S.job&&S.job.lv?S.job.lv*3:0),r:(t.opn||50)};let b='m',v=-1;for(const k in sc)if(sc[k]>v){v=sc[k];b=k}return b}
const pxW=()=>CNS[S.cn||'TW'].w;
function pxDo(r,h,s,mw){const p=S.partner;if(!p)return;p.rel=cl(p.rel+r);if(h)chg('happy',h);if(s)S.stress=cl(S.stress+s);if(mw)S.money+=Math.round(pxW()*mw/100)}
const pxOK=()=>{const p=S.partner;if(!p)return false;pxFix(p);return p.married||p.cohab};
const pxCool=e=>S.rc&&S.rc.mx!=null&&S.age-S.rc.mx<2?false:true;
function pxEv(id,min,max,w,iff,t,opts){const e={id:'mx_'+id,min,max,w,cat:'mx',if:()=>{try{return pxCool()&&pxOK()&&iff()}catch(x){return false}},run:()=>({t:typeof t==='function'?t():t,c:opts.map(o=>ch(o[0],()=>{const r=o[1]();return r}))})};E.push(e)}
const ptn=()=>S.partner?S.partner.n:'';
pxEv('val',24,65,3,()=>S.partner.vl!==pxMine(),()=>`你和${ptn()}聊到未來，發現你們最在意的事不太一樣：你重視「${pxName(pxMine())}」，${ptn()}更重視「${pxName(S.partner.vl)}」。`,[
 ['各退一步，訂出共同的目標',()=>{pxDo(5,2,-2);return G('你們列出共同目標，彼此都有調整。')}],
 ['堅持自己的優先順序',()=>{pxDo(-6,-2,5);return B('談話不歡而散，兩人冷戰了一陣子。')}],
 ['尊重差異，各自安排一部分',()=>{pxDo(2,0,0);return N('你們同意在不同事上各自做主。')}]]);
pxEv('rich',26,60,2.5,()=>S.partner.fb==='rich'&&S.partner.married,()=>`${ptn()}的父母表示願意資助你們一筆頭期款，但希望你們住在附近。`,[
 ['接受資助，搬到附近',()=>{pxDo(3,2,3,120);S.flags.nearIn=1;return G('你們收下資助，生活壓力減輕，但家人的意見也變多了。')}],
 ['婉拒，靠自己存錢',()=>{pxDo(1,0,2);return N('你們決定靠自己，雖然辛苦但覺得自在。')}],
 ['只接受部分幫助，保持距離',()=>{pxDo(2,1,0,50);return N('你們找到折衷的辦法。')}]]);
pxEv('poor',24,60,2.5,()=>S.partner.fb==='poor'&&(S.partner.married||S.partner.cohab),()=>`${ptn()}的家人手頭吃緊，希望你們每月補貼一些生活費。`,[
 ['固定每月補貼',()=>{pxDo(5,0,3,-8);return G('你們固定支援，家人很感激，你們的預算變緊了。')}],
 ['只在急用時幫忙',()=>{pxDo(1,0,1,-2);return N('你們設定了急用才幫忙的原則。')}],
 ['委婉拒絕，建議對方找社福資源',()=>{pxDo(-5,-1,3);return B(ptn()+'有些失望，你們之間出現一點隔閡。')}]]);
pxEv('kid',28,50,3,()=>S.kids.some(k=>k.age>=5&&k.age<=15),()=>`你和${ptn()}對孩子的教育方式有分歧：一個想報名補習和才藝，另一個希望孩子多玩、少安排。`,[
 ['聽專業意見，找出平衡',()=>{pxDo(4,1,1,-1.5);return G('你們讓孩子選擇一兩項有興趣的課程，大家都能接受。')}],
 ['堅持你的做法',()=>{pxDo(-5,0,4,-3);return B('你們為此吵了好幾次，孩子也感受到氣氛不好。')}],
 ['讓另一半決定',()=>{pxDo(2,-1,1);return N('你選擇配合，心裡有點悶。')}]]);
pxEv('move',27,52,2,()=>S.job&&S.partner.job,()=>`${ptn()}收到一個很好的工作機會，但需要搬到另一個城市，薪資約多 30%。`,[
 ['支持並一起搬家',()=>{pxDo(5,0,5,25);S.stress=cl(S.stress+3);return G('你們一起搬家，剛開始不習慣，但收入與關係都有進展。')}],
 ['對方先去，維持遠距離',()=>{if(chance(.6)){pxDo(2,-1,5,18);return N('遠距離很辛苦，但你們撐了過來。')}pxDo(-14,-3,7,18);return B('距離拉開了感情，你們吵架越來越多。')}],
 ['請對方婉拒',()=>{pxDo(-8,-2,3);return B(ptn()+'雖然答應，但提起這件事時仍有些失落。')}]]);
pxEv('inlaw',40,66,3,()=>S.partner.married&&S.partner.a!=null,()=>`${ptn()}的父母年紀大了，需要有人照顧，你們得討論怎麼分工。`,[
 ['請長照服務與看護，費用平分',()=>{pxDo(3,0,2,-14);return G('你們請了專業人員，雙方家人都有人照顧。')}],
 ['輪流照顧，自己投入時間',()=>{pxDo(5,-2,9);return N('你們很疲累，但彼此更了解對方的辛苦。')}],
 ['請兄弟姊妹分攤，不全由你們負責',()=>{if(chance(.5)){pxDo(2,0,3);return N('家人開了會，大致談出分工。')}pxDo(-6,-1,6);return B('手足互相推托，你們吵了很久。')}]]);
pxEv('money',26,60,2.5,()=>S.partner.vl==='m'||S.partner.vl==='r',()=>`你們發現家裡存款成長得比預期慢，${ptn()}提議重新規劃預算。`,[
 ['一起檢討，設定月預算與儲蓄目標',()=>{pxDo(4,0,-1,6);return G('你們每月核對帳目，漸漸有了默契。')}],
 ['各管各的錢，分攤家用',()=>{pxDo(0,0,0);return N('你們分開管理，減少了爭吵，也少了一點親密感。')}],
 ['不想多談，維持現狀',()=>{pxDo(-4,0,3);return B('問題沒有解決，之後又被提起。')}]]);
pxEv('anniv',30,90,2,()=>S.age-S.partner.since>=10&&!S.partner.an10&&S.partner.married,()=>`今年是你們在一起滿 ${S.age-S.partner.since} 年。`,[
 ['安排旅行，重溫初識的地方',()=>{S.partner.an10=1;pxDo(8,5,-3,-2);return G('你們回到當年約會的地方，聊了很多往事。')}],
 ['在家吃一頓好料，寫卡片',()=>{S.partner.an10=1;pxDo(5,3,-2,-.3);return G('簡單的紀念日，也讓你們感動。')}],
 ['太忙，隨口說聲紀念日快樂',()=>{S.partner.an10=1;pxDo(-3,-1,1);return B(ptn()+'沒說什麼，但看起來有些失望。')}]]);
pxEv('nest',46,66,3,()=>S.kids.length>0&&S.kids.every(k=>k.age>=21)&&!S.partner.nest,()=>`孩子都長大了，家裡突然變得很安靜，你和${ptn()}面對面的時間變多了。`,[
 ['重新培養共同的興趣',()=>{S.partner.nest=1;pxDo(7,4,-3);return G('你們一起學舞、爬山，找回剛交往時的感覺。')}],
 ['各自投入工作或朋友圈',()=>{S.partner.nest=1;pxDo(-2,0,0);return N('你們互相獨立，有些疏離。')}],
 ['討論要不要一起環島或移居',()=>{S.partner.nest=1;pxDo(5,3,0,-3);return G('你們開始規劃退休後的生活。')}]]);
pxEv('ret',60,72,3,()=>S.partner.married&&!S.partner.ret,()=>`你們開始談退休後的日子：要旅行、種菜，還是各自過？`,[
 ['一起旅行，認識更多地方',()=>{S.partner.ret=1;pxDo(6,5,-4,-4);return G('你們每年出發幾次，彼此依靠。')}],
 ['在家附近過規律的生活',()=>{S.partner.ret=1;pxDo(4,2,-3);return G('你們每天散步、做菜、聊天。')}],
 ['各自有各自的圈子，偶爾相聚',()=>{S.partner.ret=1;pxDo(0,0,0);return N('你們各有自由，感情平淡但穩定。')}]]);
pxEv('sick',52,86,3,()=>S.partner.married,()=>`${ptn()}確診了需要長期治療的疾病，你需要陪伴與安排照護。`,[
 ['親自陪伴照顧，調整工作',()=>{pxDo(10,-3,8,-8);S.health=cl(S.health-3);return G('你們一起面對，感情更深，你也很累。')}],
 ['請看護，下班後陪伴',()=>{pxDo(5,-1,4,-12);return N('你盡力安排，生活仍然辛苦。')}],
 ['有些害怕，常常逃避',()=>{pxDo(-15,-4,6);return B(ptn()+'覺得孤單，你也自責。')}]]);
pxEv('secret',26,58,2,()=>S.partner.vl==='c'||S.partner.vl==='m',()=>`你發現${ptn()}偷偷買了一筆不小的投資，沒有事先商量。`,[
 ['平靜詢問，設立共同決策規則',()=>{pxDo(3,0,1);return G('你們約好超過一定金額要一起討論。')}],
 ['生氣質問',()=>{pxDo(-9,-3,5);S.partner.jel=(S.partner.jel||0)+1;return B('你們大吵一架，信任受損。')}],
 ['先觀察，看結果再談',()=>{if(chance(.5)){pxDo(2,1,0,10);return G('投資小賺一筆，你們笑著談了談。')}pxDo(-3,-1,2,-8);return B('投資虧損，你們都有些尷尬。')}]]);
const _pp56=partnerPage;partnerPage=function(){let h=_pp56();try{const p=S.partner;if(!p||(S.view&&0))return h;pxFix(p);const fb=PXB.find(x=>x[0]===p.fb)[1],x=`<div class="sub">家庭背景：${fb}・最重視：${pxName(p.vl)}、其次：${pxName(p.vl2)}${p.vl===pxMine()?'（與你相近）':'（與你不同）'}</div>`;return h.replace(/(<div class="sub">[^<]*在一起[^<]*<\/div>)/,'$1'+x)}catch(e){return h}};
