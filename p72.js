/* ---- p72：固定金額（活動、禮物、約會、旅行、婚禮、領養…）隨物價（薪資指數）縮放 ---- */
const PXW=[600,800,1000,1200,1500,2000,2500,3000,4000,5000,6000,8000,12000,20000,24000,40000,50000,300000,600000,2000000];
function PXF(){try{return Math.max(.4,typeof WI==='function'?WI():1)}catch(e){return 1}}
function px(n){const f=PXF();let v=Math.round(n*f/10)*10;if(f!==1&&PXW.includes(v))v+=10;return v}
function pxCost(o,k){
 const d=Object.getOwnPropertyDescriptor(o,k);if(!d)return;
 if(d.get){const g=d.get;Object.defineProperty(o,k,{get(){const v=g.call(this);return v?px(v):v},enumerable:true,configurable:true})}
 else if(typeof d.value==='number'&&d.value>0){const b=d.value;Object.defineProperty(o,k,{get(){return px(b)},enumerable:true,configurable:true})}
}
ACTS.forEach(o=>pxCost(o,'cost'));GIFTS.forEach(o=>pxCost(o,'c'));PLACES.forEach(o=>pxCost(o,'c'));OTA.forEach(o=>pxCost(o,'cost'));
/* 活動頁文字：費用／學費／票價／報名 */
function pxText(t){return typeof t!=='string'?t:t.replace(/((?:費用|學費|票價|報名|入場)[^N\d]{0,6})NT\$([\d,]+)/g,(m,a,n)=>{const v=parseInt(n.replace(/,/g,''),10);return PXW.includes(v)?a+money(px(v)):m})}
const _ah72=actHTML;actHTML=function(){return pxText(_ah72())};
/* ---- 失業給付、社會救助、父母接濟（保底，不讓無收入者無限負債）---- */
const _y72=yearly;
yearly=function(){
 const hadJob=!!(S&&S.job&&!S.job.founder),sal0=hadJob?S.job.sal:0;
 _y72();
 try{
  if(!S||S.dead||S.age<18)return;
  if(sal0>0)S.lastSal=sal0;
  const tw=(S.cn||'TW')==='TW',work=S.age>=22&&S.age<65&&!S.school&&!S.army&&!S.jail&&!S.flags.retired&&!(S.job&&S.job.founder);
  if(hadJob&&S.job)S.ueN=0;
  if(tw&&work&&!S.job&&!S.ptj){
   if(S.lastSal>0&&(S.ueN||0)<1){S.ueN=1;const b=Math.round(S.lastSal*.6*.5);ldset('失業給付');S.money+=b;ldset(null);log(`你失業了，領到失業給付約 ${money(b)}（約投保薪資 60%、最長 6 個月；遊戲簡化為一次發放）。`,'good')}
   const lv=livingCost();
   if(S.money<-lv){const a=Math.round(lv*.6);ldset('社會救助');S.money+=a;ldset(null);log(`你的經濟陷入困境，申請到社會救助／急難紓困 ${money(a)}。`,'good')}
   const par=[S.mom,S.dad].filter(x=>x&&x.alive&&x.rel>=40);
   if(S.money<-lv*2&&par.length&&S.age<45){const a=Math.round(lv*.5);ldset('父母接濟',par[0].n);S.money+=a;ldset(null);par[0].rel=cl(par[0].rel-3);log(`${par[0].role}看你過得辛苦，塞給你 ${money(a)}。`,'good')}
  }
 }catch(e){}
};
/* ---- 事件冷卻與權重：同主題一年最多一個、乙女事件拉開間隔、依個性微調權重 ---- */
function evTheme(id){return /^ote_/.test(id)?'ote':/^(pmed|psup|sibloan|care|careev|pcare)$/.test(id)?'fam':/^x(net|vid|visit|conf|fade)$/.test(id)?'net':id.replace(/\d+$/,'')}
randEvents=function(){
 const ext=(S.pt&&S.pt.ext!=null)?S.pt.ext:50;
 const pool=E.filter(e=>{
  if(!(S.age>=e.min&&S.age<=e.max&&(!e.if||e.if())))return false;
  const cd=/^ote_/.test(e.id)?6:3;if(S.seen[e.id]>=S.age-cd)return false;
  if(/^ote_/.test(e.id)&&S.lastOte!=null&&S.age-S.lastOte<2)return false;
  return true;
 });
 const out=[],th={},n=chance(.85)?(chance(.3)?2:1):0;
 for(let i=0;i<n&&pool.length;i++){
  const wt=e=>e.w*(/^ote_/.test(e.id)?(.7+ext/100):1);
  let r=Math.random()*pool.reduce((s,e)=>s+wt(e),0),k=0;
  for(;k<pool.length-1;k++){r-=wt(pool[k]);if(r<=0)break}
  const e=pool.splice(k,1)[0],t=evTheme(e.id);
  if(th[t]){i--;continue}
  th[t]=1;S.seen[e.id]=S.age;if(/^ote_/.test(e.id))S.lastOte=S.age;out.push(e);
 }
 return out;
};
/* ---- 存檔備份提醒：每 5 歲檢查，超過 3 天沒備份就提醒；同時顯示最近備份時間 ---- */
const BKK='lifesim_lastbk';
function bkNudge(){
 try{
  const last=+(localStorage.getItem(BKK)||0),now=Date.now();
  if(!S||S.dead||S.age<10||S.age%5!==0)return;
  if(now-last<3*864e5)return;
  if(typeof busy!=='undefined'&&busy){setTimeout(bkNudge,2500);return}
  const md=document.getElementById('modal');if(md&&md.classList.contains('on')){setTimeout(bkNudge,2500);return}
  localStorage.setItem(BKK,String(now-2*864e5));/* 先延後，避免連續跳出 */
  ask('已經好幾天沒有備份存檔了。瀏覽器的存檔只存在這個裝置，建議現在複製存檔文字，貼到備忘錄保存。',['現在複製備份','之後再說'],c=>{
   if(c===0){try{navigator.clipboard.writeText(expAll()).then(()=>{localStorage.setItem(BKK,String(Date.now()));log('已複製存檔文字，請貼到安全的地方保存。','good');render()}).catch(()=>{log('瀏覽器不允許自動複製，請到「更多→設定」手動複製存檔。','bad');render()})}catch(e){}}
  });
 }catch(e){}
}
const _au72=ageUp;
ageUp=function(){const r=_au72.apply(this,arguments);try{setTimeout(bkNudge,900)}catch(e){}return r};
const _lh72=lfHandle;
lfHandle=function(x,y,z,u){const r=_lh72(x,y,z,u);try{if(x==='set'&&y==='copy')localStorage.setItem(BKK,String(Date.now()))}catch(e){}return r};
