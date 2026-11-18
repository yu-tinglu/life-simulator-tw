// 孫子女贈與、子女婚育相關事件
const _kh93=kidHTML;
kidHTML=function(i){
 let h=_kh93(i);const k=S.kids[i];if(!k||!k.rm||!k.rm.gk.length)return h;
 k.rm.gk.forEach(g=>{if(!g.id){g.id='g'+Date.now()%1e7+Math.floor(Math.random()*1e3);g.rel=g.rel||70;g.m=g.m||0}});
 const opts=k.rm.gk.map(g=>[g.id,`${g.n}（${g.age} 歲）`]);
 const blk=`<div class="sec">贈與孫子女（隔代贈與，同樣依贈與稅規定）</div>`+frmHTML('gg'+i,{sl:'受贈人',opts,def:'500000',chips:[200000,500000,1000000,5000000],al:'贈與現金（新台幣）',btns:[['go','贈與','p']]});
 return h.replace(/(<button class="btn" data-a="back">← 返回<\/button>)$/,blk+'$1');
};
const _hd93=handle;
handle=function(a){
 if(typeof a==='string'&&S&&a.startsWith('frmgo:gg')){
  const id=a.split(':')[1],i=+id.slice(2),g=frmGet(id),k=S.kids[i];
  const rf=()=>{render();try{showSheet(view.tab,view.sub)}catch(e){}};
  if(!k||!k.rm)return;
  const gk=k.rm.gk.find(x=>String(x.id)===String(g.s));
  if(!gk||!(g.a>0)){view.msg=B('請選擇受贈人並輸入金額。');rf();return}
  view.msg=giftTo(gk,g.a);try{delete frmState(id).a}catch(e){}rf();return;
 }
 return _hd93(a);
};
const kdMar=()=>S.kids.filter(k=>k.rm&&k.rm.st==='married');
E.push({id:'kd_home',min:45,max:85,w:3,if:()=>kdMar().some(k=>k.age>=26&&k.age<=40&&!k.hh),run:()=>{const k=pick(kdMar().filter(x=>x.age>=26&&x.age<=40&&!x.hh));return {t:`${k.n}和${k.rm.sp.n}想買第一間房子，開口問你能不能幫忙出一點頭期款。`,c:[
 ch('資助 300 萬',()=>{if(S.money<3e6)return B('你的現金不夠。');S.money-=3e6;k.hh=1;k.m=(k.m||0)+3e6;k.rel=cl(k.rel+10);chg('happy',3);return G(`${k.n}很感動，房子順利買下來了。`)}),
  ch('資助 100 萬',()=>{if(S.money<1e6)return B('你的現金不夠。');S.money-=1e6;k.hh=1;k.m=(k.m||0)+1e6;k.rel=cl(k.rel+5);return G(`${k.n}說會自己努力把剩下的湊齊。`)}),
  ch('鼓勵他們自己存錢',()=>{k.rel=cl(k.rel-2);return N('他們說明白，但看得出有點失望。')})]}}});
E.push({id:'kd_gk',min:55,max:95,w:4,if:()=>S.kids.some(k=>k.rm&&k.rm.gk.length),run:()=>{const k=pick(S.kids.filter(x=>x.rm&&x.rm.gk.length)),g=pick(k.rm.gk);return {t:`${k.n}希望你暑假幫忙照顧孫${g.sx==='男'?'子':'女'}${g.n}一陣子。`,c:[
 ch('欣然答應',()=>{g.rel=cl((g.rel||70)+8);k.rel=cl(k.rel+4);S.stress=cl(S.stress+4);chg('happy',5);return G(`${g.n}黏著你，家裡熱鬧起來。`)}),
 ch('偶爾幫忙，帶去玩一天',()=>{g.rel=cl((g.rel||70)+3);chg('happy',2);return G('大家都玩得很開心。')}),
 ch('身體吃不消，婉拒',()=>{k.rel=cl(k.rel-2);return N('他們找了保母，心裡有點失落。')})]}}});
E.push({id:'kd_gsch',min:60,max:95,w:3,if:()=>S.kids.some(k=>k.rm&&k.rm.gk.some(g=>g.age>=6&&g.age<=22)),run:()=>{const k=pick(S.kids.filter(x=>x.rm&&x.rm.gk.some(g=>g.age>=6&&g.age<=22))),g=pick(k.rm.gk.filter(x=>x.age>=6&&x.age<=22));return {t:`孫${g.sx==='男'?'子':'女'}${g.n}想學才藝，學費要 NT$${(60000).toLocaleString()}。`,c:[
 ch('幫他出學費',()=>{if(S.money<6e4)return B('錢不夠。');S.money-=6e4;g.rel=cl((g.rel||70)+6);chg('happy',3);return G(`${g.n}開心地跑來抱你。`)}),
 ch('讓爸媽決定',()=>N('你把決定留給父母。'))]}}});
