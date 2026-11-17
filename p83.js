/* ---- p83：信託改為下拉＋自填金額 ---- */
const _lg83=legacyHTML;
legacyHTML=function(){
 let h=_lg83();
 if(S.tr||!/data-a="lg:tr:/.test(h))return h;
 h=h.replace(/<button class="btn" data-a="lg:tr:(live|gift):[^"]*"[^>]*>[\s\S]*?<\/button>/g,'');
 const opts=[['live','生前信託（可撤銷，仍計入遺產，免繼承程序費）'],...S.kids.map(x=>['gift:'+x.id,`為 ${x.n} 設立他益信託（30 歲交付，視同贈與課稅）`])];
const F=frmHTML('tr',{sl:'信託種類',opts,def:'5000000',chips:[2000000,5000000,10000000,50000000],al:'放入金額（另付設立費 NT$150,000）',btns:[['go','設立信託','p']]});
 return /<button class="btn" data-a="back">/.test(h)?h.replace(/(<button class="btn" data-a="back">)/,F+'$1'):h+F;
};
const _hd83=handle;
handle=function(a){
 if(typeof a==='string'&&S&&a==='frmgo:tr:go'){
  const g=frmGet('tr');if(!(g.a>0)){view.msg=B('請輸入金額，例如 500000 或 50萬。');render();try{showSheet(view.tab,view.sub)}catch(e){}return}
  const p=String(g.s).split(':');return _hd83(`lg:tr:${p[0]}:${g.a}`+(p[1]?':'+p[1]:''));
 }
 return _hd83(a);
};
