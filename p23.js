/* ---- 依年齡開放的行動：嬰幼兒不能投資、戀愛、吵架…；各階段有專屬活動 ---- */
const AGE_NOTE=(t)=>`<p class="sub" style="margin:10px 0">${t}</p>`;
/* 各人生階段的專屬活動 */
ACTS.push(
{id:'cuddle',l:'🧸 窩在爸媽懷裡撒嬌',min:0,max:5,run:()=>{chg('happy',R(3,6));[S.mom,S.dad].forEach(p=>{if(p&&p.alive)p.rel=cl(p.rel+R(2,5))});return G('被爸媽抱著，你覺得好安心。')}},
{id:'babble',l:'🗣️ 咿呀學語',min:0,max:2,run:()=>{chg('smarts',R(1,3));chg('happy',2);return G('你發出了好多可愛的聲音，爸媽笑得合不攏嘴。')}},
{id:'crawl',l:'🏃 爬行學步',min:0,max:2,run:()=>{chg('health',R(1,3));chg('happy',2);return N('你努力爬、努力站，跌倒了又爬起來。')}},
{id:'story',l:'📖 聽故事、看繪本',min:2,max:7,run:()=>{chg('smarts',R(2,4));chg('happy',2);return G('你聽了好多故事，想像力變豐富了。')}},
{id:'playmate',l:'🧸 和小朋友玩',min:3,max:10,run:()=>{chg('happy',R(3,6));S.net=cl((S.net||0)+1);return G('你和同伴玩得滿頭大汗。')}},
{id:'draw',l:'🎨 塗鴉畫畫',min:3,max:12,run:()=>{chg('smarts',R(1,3));chg('looks',R(0,1));chg('happy',R(2,4));return G('你畫了一幅作品，被貼在冰箱上。')}},
{id:'talent',l:'🎨 才藝班（爸媽出錢）',min:5,max:17,run:()=>{chg('smarts',R(1,4));S.stress=cl((S.stress||0)+R(2,5));chg('happy',-1);return N(pick(['你學了鋼琴','你去上美術班','你學了游泳','你上了圍棋課'])+'，爸媽很期待。')}},
{id:'reading',l:'📖 看課外書',min:6,max:17,run:()=>{chg('smarts',R(1,3));chg('happy',1);return G('你看完了一本很有趣的書。')}},
{id:'club',l:'🎧 參加社團活動',min:12,max:18,run:()=>{chg('happy',R(3,6));S.net=cl((S.net||0)+R(1,3));S.stress=cl((S.stress||0)+1);return G('社團讓你認識了新朋友。')}},
{id:'cram',l:'📚 補習衝刺',min:12,max:18,if:()=>!!S.school,run:()=>{S.grade=cl(S.grade+R(4,9));chg('smarts',R(1,3));S.stress=cl((S.stress||0)+R(4,8));chg('happy',-2);return N('你天天補習到深夜，成績進步了，但很累。')}}
);
/* 一次性撒嬌處理由活動本身完成。以下為各分頁的年齡限制 */
const _ast23=astHTML;
astHTML=function(){
 if(S.age<18){return `<h3>🏠 資產</h3><div class="item"><b>零用錢・壓歲錢</b><div class="sub">${money(S.money)}</div></div>`+AGE_NOTE('未成年還不能自己投資或買車。滿 18 歲可以開戶、買車，滿 20 歲可以買房。')}
 return _ast23();
};
const _cn23=cnHTML;
cnHTML=function(sub){
 if(S.age<18)return `<h3>移民與匯率</h3>`+AGE_NOTE('未成年不能自己做外匯交易或申請移民，等長大再說吧。');
 return _cn23(sub);
};
const _romRow23=romRow;
romRow=function(){
 if(S.age<12)return AGE_NOTE('年紀還小，先好好玩耍和學習吧。');
 return _romRow23();
};
const _romH23=romHandle;
romHandle=function(x,y,z){
 if(S.age<12)return B('你還太小了，現在先不用想這些。');
 return _romH23(x,y,z);
};
const _sub23=subHTML;
subHTML=function(k){
 let h=_sub23(k);
 if(k==='mom'||k==='dad'){
  const a=S.age,btn=(act,t,s)=>`<button class="btn" data-a="do:${k}:${act}">${t}${s?`<small>${s}</small>`:''}</button>`;
  const rm=act=>{h=h.replace(new RegExp(`<button class="btn" data-a="do:${k}:${act}"[\\s\\S]*?</button>`),'')};
  if(a<3)rm('talk');if(a<6){rm('gift');rm('fight')}
  if(a<=5&&!S.acts['p'+k]&&!h.includes(':cuddle"'))h=h.replace(/(<button class="btn" data-a="back">)/,btn('cuddle','🧸 撒嬌、要抱抱','今年一次')+'$1');
  if(a<3)h=h.replace(/(<button class="btn" data-a="back">)/,AGE_NOTE('你還是寶寶，只會笑、哭和撒嬌。')+'$1');
 }
 return h;
};
const _int23=interact;
interact=function(k,kind){
 if(kind==='cuddle'){const p=getP(k),key='p'+k;if(!p)return B('這個人已經不在了。');if(S.acts[key])return B('今年已經撒過嬌了。');S.acts[key]=1;p.rel=cl(p.rel+R(5,12));chg('happy',3);return G('你賴在懷裡不肯下來，對方笑著抱緊你。')}
 if(S.age<6&&(kind==='gift'||kind==='fight'))return B('你還太小了。');
 return _int23(k,kind);
};
const _mind23=mindHTML;
mindHTML=function(){
 let h=_mind23();
 const rm=k=>{h=h.replace(new RegExp(`<button class="btn" data-a="lf:mind:${k}"[\\s\\S]*?</button>`),'')};
 if(S.age<10)rm('med');if(S.age<18)rm('trip');
 return h;
};
const _more23=moreHTML;
moreHTML=function(){
 let h=_more23();
 const rm=a=>{h=h.replace(new RegExp(`<button class="tile" data-a="${a}"[\\s\\S]*?</button>`),'')};
 if(S.age<12)rm('rom:go:h');if(S.age<18){rm('open:cn');rm('open:lg')}if(S.age<6)rm('lf:mind');
 return h;
};
