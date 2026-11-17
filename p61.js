/* ---- p61：所有人物都有頭像；大學以上學費來源（獎學金／學貸／父母／自付） ---- */
function npcInfo(key){
 mFix();let p=null,sx='',age=0;
 if(key==='mom'&&S.mom){p=S.mom;sx='女';age=S.age+(p.off||28)}
 else if(key==='dad'&&S.dad){p=S.dad;sx='男';age=S.age+(p.off||30)}
 else if(key==='partner'&&S.partner){p=S.partner;sx=p.sx;age=S.age+(p.off||0)}
 else if(key[0]==='f'&&S.friends[+key.slice(1)]){p=S.friends[+key.slice(1)];sx=p.sx||'男';if(p.off==null)p.off=R(-3,3);age=S.age+p.off}
 else if(key[0]==='c'&&S.crush[+key.slice(1)]){p=S.crush[+key.slice(1)];sx=p.sx;if(p.off==null)p.off=R(-3,3);age=S.age+p.off}
 else if(key[0]==='k'&&S.kids[+key.slice(1)]){p=S.kids[+key.slice(1)];return {k:p}}
 return p?{p,sx,age:Math.max(1,age)}:null;
}
function npcAv(key,size){
 try{
  const o=npcInfo(key);if(!o)return '';
  if(o.k)return avSVG({g:kidGenome(o.k),o:{},age:o.k.age,sx:o.k.sx,happy:60,health:o.k.hl,stress:20},size);
  const p=o.p;avEnsure();
  if(key==='partner')avPartner();
  else if(!p.gn){const code=(p.o&&nameToCode(p.o))||S.cn||'TW',g=genFor(code);p.gn=(key==='mom'||key==='dad')?avChild(S.av.g,g,0):g}
  const dead=false;
  return avSVG({g:avFill(p.gn,'EW'),o:{},age:o.age,sx:o.sx,happy:p.rel!=null?Math.max(30,Math.min(85,p.rel)):60,health:70,stress:30,dead},size);
 }catch(e){return ''}
}
function npcKey(act){
 let m;
 if((m=act.match(/^rel:(mom|dad|partner)$/)))return m[1];
 if((m=act.match(/^rel:(f\d+|k\d+)$/)))return m[1];
 if(act==='rom:go:p')return 'partner';
 if((m=act.match(/^rom:c:(\d+)$/)))return 'c'+m[1];
 if((m=act.match(/^kid:page:(\d+)$/)))return 'k'+m[1];
 return null;
}
function npcRows(h){
 return h.replace(/<div class="item row">((?:(?!<div class="item row">)[\s\S])*?)<button class="mini" data-a="([^"]+)">/g,(m,mid,act)=>{
  if(mid.startsWith('<span class="npc">'))return m;const k=npcKey(act);if(!k)return m;const v=npcAv(k,44);
  return v?`<div class="item row"><span class="npc">${v}</span>${mid}<button class="mini" data-a="${act}">`:m;
 });
}
function npcHead(h,k,size){const v=npcAv(k,size||84);return v?h.replace('<h3>',`<div class="npcbig">${v}</div><h3>`):h}
const _rh61=relHTML;relHTML=function(){return npcRows(_rh61())};
const _rm61=romHome;romHome=function(){return npcRows(_rm61())};
const _rr61=romRow;romRow=function(){return npcRows(_rr61())};
const _sb61=subHTML;
subHTML=function(k){
 const h=_sb61(k);
 if(k==='mom'||k==='dad')return npcHead(h,k);
 if(k&&k[0]==='f'&&/^f\d+$/.test(k))return npcHead(h,k);
 return h;
};
const _ro61=romHTML;
romHTML=function(k){
 const h=_ro61(k);
 if(k==='Rp')return npcHead(h,'partner');
 if(k&&/^Rc\d+$/.test(k))return npcHead(h,'c'+k.slice(2));
 return h;
};
const _kh61=kidHTML;
kidHTML=function(i){const h=_kh61(i);return /class="npcbig"/.test(h)?h:npcHead(h,'k'+i)};
(function(){try{const st=document.createElement('style');st.textContent='.npc{flex:none;margin-right:10px;display:flex;align-items:center}.npcbig{display:flex;justify-content:center;margin:4px 0 2px}';document.head.appendChild(st)}catch(e){}})();

/* ---- 學費來源 ---- */
const TFU=['大學','碩士','博士'];
function tfParents(){return [S.mom,S.dad].filter(p=>p&&p.alive)}
function tfShare(){
 const ps=tfParents();if(!ps.length)return 0;
 const rel=ps.reduce((a,p)=>a+p.rel,0)/ps.length;
 if(rel<30)return 0;
 const cap={清寒:.2,小康:.75,富裕:1}[S.fam]||.5;
 return Math.max(0,Math.min(1,cap*(.55+rel/200+(Math.random()-.5)*.2)));
}
function tfEvent(tu){
 const lo=money(60000);
 const c=[];
 const ps=tfParents();
 c.push(ch(`請父母支付學費${ps.length?`（家境${S.fam}・親子關係約 ${Math.round(ps.reduce((a,p)=>a+p.rel,0)/ps.length)}）`:'（父母已不在）'}`,()=>{
  const sh=tfShare(),amt=Math.round(tu*sh);
  if(!ps.length)return N('父母已經過世，你只能自己想辦法。');
  if(amt<=0)return B('爸媽這次沒辦法或不願意出學費，你只能自己付。');
  S.money+=amt;ps.forEach(p=>p.rel=cl(p.rel+1));
  const m=amt>=tu?`爸媽幫你付了全部學費 ${money(amt)}。`:`爸媽負擔了學費的一部分 ${money(amt)}，其餘你自己付。`;
  return G(m)}));
 c.push(ch(`申請獎學金（看成績與智力）`,()=>{
  const sc=S.grade*.6+S.smarts*.4+(S.fam==='清寒'?5:0);
  if(sc>=82&&chance(.5)){S.money+=tu;chg('happy',6);return G(`你拿到全額獎學金，抵掉學費 ${money(tu)}。`)}
  if(sc>=68&&chance(.55)){const a=Math.round(tu*.5);S.money+=a;chg('happy',3);return G(`你拿到半額獎學金 ${money(a)}。`)}
  if(sc>=55&&chance(.5)){const a=Math.min(tu,20000);S.money+=a;return G(`你拿到小額獎學金 ${money(a)}。`)}
  chg('happy',-2);return B('這次獎學金沒有申請上，學費要自己付。')}));
 if(S.fam!=='富裕'){
  c.push(ch('就學貸款：只借學費',()=>{S.sloan=(S.sloan||0)+tu;S.sgr=0;S.money+=tu;return N(`你申請就學貸款 ${money(tu)}，畢業一年後開始還。`)}));
  c.push(ch(`就學貸款：學費加生活費（共多借 ${lo}）`,()=>{const a=tu+60000;S.sloan=(S.sloan||0)+a;S.sgr=0;S.money+=a;return N(`你申請學貸 ${money(a)}（學費加生活費），畢業一年後開始還。`)}));
 }
 c.push(ch('自己付（動用存款或打工收入）',()=>N('你決定自己負擔學費。')));
 return {t:`新學年的學費 ${money(tu)} 已經繳了。這筆錢你想怎麼處理？${S.fam!=='富裕'?'（學貸利率約 1.3%，為遊戲估算值；家境富裕者不符資格）':''}`,c};
}
const _y61=yearly;
yearly=function(){
 const tu=(TFU.includes(S.school)&&S.tuition>0&&S.age>=18)?S.tuition:0;
 _y61();
 if(tu&&!S.dead)queue.push({run:()=>tfEvent(tu)});
 if(S.sloan>0&&!S.dead&&!TFU.includes(S.school)){
  S.sgr=(S.sgr||0)+1;
  if(S.sgr>1){
   S.sloan=Math.round(S.sloan*1.013);
   const pay=Math.min(S.sloan,Math.max(60000,Math.round(S.sloan/8)));
   ldset('學貸還款');S.money-=pay;ldset(null);S.sloan-=pay;
   log(S.sloan>0?`償還就學貸款 ${money(pay)}，剩餘 ${money(S.sloan)}。`:`你還清了就學貸款（最後一期 ${money(pay)}）。`,S.sloan>0?'':'good');
   if(S.sloan<=0)S.sloan=0;
  }
 }
};
const _ah61=astHTML;
astHTML=function(){const h=_ah61();return S.sloan>0?h+`<div class="item"><b>就學貸款</b><div class="sub">未還餘額 ${money(S.sloan)}（已計入淨資產）</div></div>`:h};
