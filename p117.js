/* ---- p117：認識新朋友 ≠ 曖昧：朋友與心儀對象分開 ---- */
function meetFriend(){
 if(S.age<13)return B('年紀還太小。');if(S.ap<1)return B('今年的行動點用完了。');if(S.money<px(500))return B('你的錢不夠。');
 if(S.friends.length>=14)return B('朋友已經很多了，先好好經營現有的友情吧。');
 S.ap--;S.money-=px(500);const f=newFriend(),w=S.school?'學校活動':S.job?'公司聚會':'聚會';S.friends.push(f);
 return G(`你在${w}認識了${f.n}，聊得很投緣，成為朋友。`)
}
const _oh117=onHTML;
onHTML=function(){
 return _oh117().replace(/<button class="btn" data-a="mt:new">[\s\S]*?<\/button>/,`<button class="btn" data-a="mt:new">認識新朋友<small>學校、公司、聚會・1 點行動點・約 ${money(px(500))}</small></button>`)
};
const _rh117=relHTML;
relHTML=function(){
 const h=_rh117();if(S.age<14||S.dead)return h;
 const b=`<button class="btn" data-a="mt:crush">認識心儀對象<small>想發展戀情的對象・1 點行動點・約 ${money(px(1500))}</small></button>`;
 return h.replace(/(<button[^>]*data-a="rom:go:h"[^>]*>[\s\S]*?<\/button>)/,'$1'+b)
};
const _hd117=handle;
handle=function(a){
 if((a==='mt:new'||a==='mt:crush')&&S){const r=a==='mt:new'?meetFriend():meetNew();view.msg=r;view.tab='rel';view.rsub=null;render();showSheet('rel');return}
 return _hd117.apply(this,arguments)
};
