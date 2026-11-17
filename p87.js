// 子女自己的戀愛、結婚、生子
function kdName(sx){try{return fullName(sx)}catch(e){return given(sx,calYear())}}
function kdGk(k,sp){
 const sx=pick(['男','女']),cjk=/[一-鿿]/.test(k.n),sur=cjk?((k.sx==='男'?k.n:sp.n)[0]):'';
 return {n:sur+given(sx,calYear()),sx,age:0};
}
const _ky87=kidYear;
kidYear=function(k){
 _ky87(k);
 if(!k||k.age<18||(k.age>=18&&k.done===0&&k.age<20))return;
 if(!k.rm)k.rm={st:'single',sp:null,gk:[],y:0};
 const r=k.rm;r.gk.forEach(g=>g.age++);
 if(r.st==='single'){
  const p=(k.age>=22&&k.age<=40)?(.13+(k.lk>70?.04:0)+(k.pers==='外向'||k.pers==='活潑'?.03:0)):0;
  if(chance(p)){r.st='dating';r.y=0;r.sp={n:kdName(k.sx==='男'?'女':'男'),sx:k.sx==='男'?'女':'男'};log(`${k.n}交了男女朋友${r.sp.n}，開心地向你分享。`,'good')}
 }else if(r.st==='dating'){
  r.y++;
  if(k.age>=24&&chance(.3+r.y*.08)){r.st='married';r.y=0;chg('happy',6);log(`${k.n}和${r.sp.n}結婚了！你參加了婚禮。`,'good')}
  else if(chance(.12)){log(`${k.n}和${r.sp.n}分手了。`,'bad');r.st='single';r.sp=null;r.y=0}
 }else if(r.st==='married'){
  r.y++;
  const lim=k.sx==='女'?40:44;
  if(r.gk.length<3&&k.age<=lim&&r.y>=1&&chance(r.gk.length===0?.28:.16)){
   const g=kdGk(k,r.sp);r.gk.push(g);chg('happy',8);log(`${k.n}生了孩子，你有了孫${g.sx==='男'?'子':'女'}${g.n}！`,'good');
  }else if(chance(.02)){log(`${k.n}和${r.sp.n}感情出現問題，離婚了。`,'bad');r.st='single';r.sp=null;r.y=0}
 }
};
const _kh87=kidHTML;
kidHTML=function(i){
 let h=_kh87(i);const k=S.kids[i];if(!k||!k.rm)return h;
 const r=k.rm,t=r.st==='married'?`已婚，配偶 ${esc(r.sp.n)}`:r.st==='dating'?`交往中：${esc(r.sp.n)}`:(k.age>=22?'單身':'');
 const g=r.gk.length?`<br>孫子女：${r.gk.map(x=>esc(x.n)+'（'+x.age+' 歲）').join('、')}`:'';
 if(!t&&!g)return h;
 const box=`<div class="item">感情：<b>${t}</b>${g}</div>`;
 return h.includes('<div class="sec">教養決策</div>')?h.replace('<div class="sec">教養決策</div>',box+'<div class="sec">教養決策</div>'):h.replace(/(<button class="btn" data-a="back">)/,box+'$1');
};
