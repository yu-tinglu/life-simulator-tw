/* ---- p53：事件品質：類別冷卻 + 依過去選擇與個性出現的事件 ---- */
const CATCD={cn:2,wd:2,art:2,rg:2,pt:2,hx:2,arcs:1};
function evCat(id){const m=id.match(/^([A-Za-z]+)_/);if(!m)return null;const p=m[1];if(/^[A-Z]{2}$/.test(p))return 'cn';if(p==='wd'||p==='wev')return 'wd';if(p==='art')return 'art';if(p==='rg'||p==='rgn')return 'rg';if(p==='pt')return 'pt';if(p==='hx')return 'hx';return null}
(function(){E.forEach(e=>{const c=evCat(e.id);if(!c)return;const o=e.if;e.cat=c;e.if=function(){if(S&&S.rc&&S.rc[c]!=null&&S.age-S.rc[c]<CATCD[c])return false;return o?o.apply(this,arguments):true}})})();
const _re53=randEvents;randEvents=function(){const out=_re53();try{S.rc=S.rc||{};out.forEach(e=>{if(e.cat)S.rc[e.cat]=S.age})}catch(x){}return out};
/* 依過去選擇出現的事件 */
function hxEv(id,min,max,w,iff,t,opts){
 const f=E.length;E.push({id:'hx_'+id,min,max,w,if:()=>{try{return iff()}catch(e){return false}},run:()=>({t:typeof t==='function'?t():t,c:opts.map(o=>{const p=o.split('|');return ch(p[0],()=>{arcFx(p[1]);const tone={g:G,b:B,n:N}[p[2][0]]||N;return tone(p[2].slice(2))})})})});
 const e=E[f];e.cat='hx';const o=e.if;e.if=function(){if(S&&S.rc&&S.rc.hx!=null&&S.age-S.rc.hx<2)return false;return o()}
}
hxEv('scam',22,80,3,()=>(S.flags.scamAw||0)>=1,'一位朋友興奮地向你推薦「穩賺不賠」的投資，說你一定要跟上。',['拿出你學到的經驗，勸朋友先查證|st+1 nt+1|g:你的提醒讓朋友冷靜下來，後來真的查出是騙局。','聽聽就好，不投入|st-1|n:你選擇不參與。','抱著試試看的心態投入少量|mw-2|b:果然血本無歸，你又上了一課。']);
hxEv('law',30,80,2.5,()=>S.arcDone&&S.arcDone.law>0,'一位朋友遇到法律糾紛，聽說你打過官司，來向你請教。',['分享經驗並介紹律師|nt+2 h+2|g:朋友很感謝你。','只給簡單建議|nt+1|n:你盡了一點心意。','不想再提起那段回憶|st+2|n:你婉拒了。']);
hxEv('ill',35,85,2.5,()=>S.arcDone&&S.arcDone.ill>0,'病友團體邀請你分享抗病經驗，現場有許多剛確診的人。',['上台分享你的故事|h+4 nt+2 st+2|g:不少人因此得到力量，你也被療癒。','在台下陪伴與聆聽|h+2 nt+1|g:你默默支持了大家。','婉拒，想把那段過去放下|st-1|n:你想往前走。']);
hxEv('abr',25,70,2.5,()=>S.arcDone&&S.arcDone.abr>0,'當年交換時認識的外國朋友傳來訊息，說要到你的城市旅行。',['熱情接待，帶他逛當地|h+5 mw-1 nt+2|g:你們聊了整晚，友誼更深了。','見面吃頓飯就好|h+2 mw-0.3|g:你們很開心重逢。','剛好很忙，改日再約|st+1|n:你覺得有點可惜。']);
hxEv('st',30,75,2.5,()=>S.arcDone&&S.arcDone.st>0,'以前創業時的夥伴聯絡你，說有個新機會，問你想不想再試一次。',['重新評估風險，簽約加入|mw-30 st+4|n:你決定再拚一次，結果如何要等幾年才知道。','提供建議，但不加入|nt+1 st-1|n:你當起了顧問。','婉拒，專心現在的工作|st-2|n:你覺得現在的生活剛剛好。']);
hxEv('tat',20,60,2.5,()=>S.flags.tattoo&&S.job,'面試或見客戶時，對方注意到你的刺青，表情有點微妙。',['大方解釋，展現專業|pf+1|g:對方被你的態度說服。','用衣物遮住，之後注意場合|st+1|n:你調整了穿著。','覺得對方太保守，不特別理會|st+2 pf-1|n:這次談話氣氛有點尷尬。']);
hxEv('debt',22,70,4,()=>S.money<0,'你收到債務催繳通知，對方語氣不太客氣。',['主動協商分期還款|st+3|n:你和對方談出一個可行的方案。','先償還一部分，其餘慢慢來|mw-5 st+2|n:壓力稍微減輕。','不理會通知|st+8 h-3|b:事情越拖越大。']);
hxEv('rich',30,80,3,()=>S.money>3e7,'遠房親戚輾轉聯絡你，希望你「借」一筆錢周轉。',['婉拒，但提供其他協助|nt-1|n:對方有點失望，但也理解。','借一小筆，當作紀念|mw-8 h+2|n:你不期待對方會還。','借一大筆，請對方簽借據|mw-30 st+3|b:對方簽了，但後來一再延後。']);
hxEv('looks',18,45,3,()=>S.looks>=88,'街頭有人遞名片給你，說想邀請你擔任平面模特兒或拍攝廣告。',['接受試鏡|mw+5 h+4 nt+2|g:你拍了幾支作品，收入不錯，也認識了新朋友。','禮貌婉拒|h+1|n:你覺得不是自己要的路。','了解合約後再決定|st+1|n:你保持謹慎。']);
hxEv('travel',22,80,2.5,()=>Object.keys(S.trav||{}).length>=6,'朋友看到你的旅行照片，建議你開一個旅遊頻道或部落格。',['試著經營，分享旅行|nt+3 h+3 mw-1|g:你的粉絲慢慢增加，還拿到小額合作。','只在朋友圈分享|h+2|n:你保持單純的樂趣。','覺得麻煩，不想經營|st-1|n:你專心享受旅行。']);
hxEv('widow',55,95,3,()=>S.flags.widow,'配偶離世後，你仍會在整理物品時看到熟悉的東西，鄰居與朋友邀你參加社區活動。',['接受邀請，慢慢走出來|h+4 st-4 nt+2|g:新的朋友陪你度過低潮。','在家中靜靜回憶|h+1 st+1|n:你需要一點時間。','與子女同住|fam+2 h+3|g:家人的陪伴讓你安心。']);
hxEv('quitjob',25,60,2.5,()=>S.flags.quit,'你想起當年離職的決定，剛好遇到以前的同事。',['聊聊彼此近況，互相鼓勵|nt+2 h+2|g:你們聊得很愉快。','簡短寒暄，沒有多聊|st-1|n:彼此點頭致意。','覺得有點感慨|st+1|n:你想了很久。']);
hxEv('fit',30,70,2.5,()=>S.av&&S.av.o&&S.av.o.build<=-.6,'你長期健身的成果被朋友注意到，有人邀你一起參加路跑或健美比賽。',['報名參加|h+5 hl+1 mw-1|g:你完賽後很有成就感。','當啦啦隊支持朋友|h+3|g:你們互相打氣。','不參加，繼續自己的節奏|st-1|n:你維持了習慣。']);
