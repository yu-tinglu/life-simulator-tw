// 更多 > 系統：版權與資料來源入口
UITILE['lf:legal']='clip';
const _mh98=moreHTML;
moreHTML=function(){
 const h=_mh98();
 const t='<button class="tile" data-a="lf:legal"><b>版</b>版權與資料來源<small>版權聲明・資料來源・法規</small></button>';
 const m=h.match(/<button class="tile"[^>]*data-a="lf:help"[^>]*>[\s\S]*?<\/button>/);
 return m?h.replace(m[0],m[0]+t):h+t;
};
