/* ===== 公司引擎：複式分錄帳 ===== */
const MINW=29500;
const onCost=m=>Math.min(m,45800)*(.125*.7+.0021)+Math.min(m,313000)*.0517*.6*1.56+Math.min(m,150000)*.06;
const PBR=[[590000,.05,0],[1330000,.12,41300],[2660000,.2,147700],[4980000,.3,413700],[1e18,.4,911700]];
const PT=x=>{x=Math.max(0,x);for(const [u,r,d] of PBR)if(x<=u)return x*r-d;return 0};
const LEDG=['cash','ar','inv','fa','depo','dta','vat','tax','ap','loan','capital','apic','reserve','re'];
const PLA=['rev','cogs','staff','rd','mkt','rent','depx','fee','audit','gtax','spx','intx','inti','pen','taxx'];
const Lnew=()=>{const o={};LEDG.concat(PLA).forEach(k=>o[k]=0);return o};
const J=(L,...ls)=>{let s=0;for(const [a,v] of ls){L[a]+=v;s+=v}if(Math.abs(s)>.5)throw new Error('unbalanced '+s)};
const snap=L=>{const o={};LEDG.forEach(k=>o[k]=L[k]);return o};
const credit=I=>I.vat===5&&!I.gross;
const equity=L=>-(L.capital+L.apic+L.reserve+L.re);
const DIVP=[0,.25,.5,.75,1];
function vatMode(I,R){
 if(I.vat===0)return {m:'exempt',r:0};
 if(I.gross)return {m:'gross',r:I.vat/100};
 const th=['餐飲','零售','製造','農林漁牧'].includes(I.cat)?100000:50000;
 if(R/12<th)return {m:'exempt',r:0};
 if(R/12<200000)return {m:'gross',r:.01,small:1};
 return {m:'std',r:.05};
}
function buyFA(co,amt){
 const I=INDS[co.ind],L=co.L;
 if(credit(I)){J(L,['fa',amt],['vat',amt*.05],['cash',-amt*1.05]);co.faG+=amt}
 else{J(L,['fa',amt*1.05],['cash',-amt*1.05]);co.faG+=amt*1.05}
}
function finMust(co,R){const cap=-co.L.capital;return co.pub||cap>=3e7||R>=1e8}
function creditLimit(co){const L=co.L;return Math.max(0,.6*Math.max(0,equity(L))+.4*L.fa+(co.stage>=3?.2*Math.max(0,equity(L)):0)+ -L.loan*0 )-(-L.loan)}
function drawLoan(co,amt,why){amt=Math.round(amt);if(amt<=0)return;J(co.L,['cash',amt],['loan',-amt]);log(`【${co.name}】${why||'向銀行借款'} ${money(amt)}。`)}
function repayLoan(co,amt){amt=Math.min(Math.round(amt),-co.L.loan,Math.max(0,co.L.cash));if(amt<=0)return 0;J(co.L,['loan',amt],['cash',-amt]);return amt}
function foundCo(ii,form,cap,personal,loan,name){
 const I=INDS[ii];
 if(I.solo&&form!=='獨資')return '此行業依法不得以公司組織設立';
 if(form==='獨資'&&I.cap>0)return '此行業有法定最低資本額，須以公司組織設立';
 if(form!=='獨資'&&cap<I.cap)return '低於法定最低資本額 '+money(I.cap);
 if(form==='獨資')personal=cap;
 const reg=form==='獨資'?3000:Math.max(1000,Math.round(cap*.001));
 const need=I.fx*1.05+I.dep+reg+I.fx*.12;
 if(cap+loan<need)return '資金不足：至少需要 '+money(need);
 if(personal>S.money)return '個人現金不足';
 if(form!=='獨資'&&personal<cap*.2)return '創辦人出資須至少占資本額 20%';
 const L=Lnew();
 const co={name,ind:ii,form,age0:S.age,yrs:0,L,hist:[],nol:[],stage:0,stageYrs:0,faG:0,shares:cap/10,fs:personal/10,
  open:snap(L),sent:1,ue:null,divDecl:0,prevTax:0,lossStreak:0,rec:null,prevRev:0,listYrs:0,
  policy:{mk:1,rd:0,pay:1,comp:0,own:0,file:'blue',div:2,rescue:1,aud:0}};
 S.money-=personal;
 J(L,['cash',cap],['capital',-cap]);
 if(loan)J(L,['cash',loan],['loan',-loan]);
 J(L,['re',reg],['cash',-reg]);
 if(I.dep)J(L,['depo',I.dep],['cash',-I.dep]);
 buyFA(co,I.fx);
 S.co=co;S.job={t:name+' 負責人',sal:0,founder:1,lv:1,years:0,perf:50};
 log(`你創辦了「${name}」（${I.n}，${form}），資本額 ${money(cap)}。`,'good');
 return null;
}
function calcTax(co,income,elig,rdExp){
 const nl=co.nol.map(e=>({y:e.y,amt:e.amt}));let used=0;
 if(elig&&income>0){let need=income;for(const e of nl){const u=Math.min(e.amt,need);e.amt-=u;need-=u;used+=u;if(need<=0)break}}
 const taxable=Math.max(0,income-used);
 const tax=taxable<=120000?0:Math.min(taxable*.2,(taxable-120000)*.5);
 const cr=rdExp>0?Math.min(.15*rdExp,.3*tax):0;
 const basic=Math.max(0,taxable-600000)*.12;
 return {income,used,taxable,tax,cr,basic,pay:Math.max(tax-cr,basic),nl};
}
function personalDividend(co,D){
 const own=co.fs/co.shares,g=D*own;if(g<=0)return;
 const sal=INDS[co.ind]&&co.form!=='獨資'?[0,6e5,12e5,24e5][co.policy.own]:0;
 const nb=Math.max(0,sal-97000-131000-218000);
 const comb=PT(nb+g)-PT(nb)-Math.min(.085*g,80000),sep=.28*g;
 const tax=Math.min(comb,sep),mode=comb<=sep?'合併計稅':'分離課稅 28%';
 const nhi=g>=20000?Math.min(g,1e7)*.0211:0;
 const net=g-nhi-tax;S.money+=net;
 log(`【${co.name}】發放股利，你按持股 ${(own*100).toFixed(1)}% 分得 ${money(g)}，扣二代健保補充保費 ${money(nhi)}、股利所得稅 ${money(tax)}（${mode}），實拿 ${money(net)}。`,'good');
}
function coValue(co){
 if(!co)return 0;const eq=equity(co.L),r=co.rec,ni=r?r.NI:0,pub=co.stage>=2;
 const pe=INDS[co.ind].pe*(pub?1:.6);
 return Math.max(0,Math.max(eq*(pub?.8:1),ni>0?ni*pe*(pub?co.sent:1):0));
}
const stake=co=>co?coValue(co)*(co.fs/co.shares)*(co.stage>=2?1:.7):0;
function rescue(co){
 const L=co.L;if(L.cash>=0)return true;
 let need=-L.cash;
 const lim=creditLimit(co);
 if(lim>0){const a=Math.min(need,lim);drawLoan(co,a,'週轉不靈，向銀行緊急借款');need-=a}
 if(need>0&&co.policy.rescue&&S.money>0){
  const inj=Math.min(S.money,Math.ceil(need));S.money-=inj;
  J(L,['cash',inj],['capital',-inj]);co.shares+=inj/10;co.fs+=inj/10;need-=inj;
  log(`【${co.name}】資金缺口，你以個人資金增資 ${money(inj)}。`,'bad');
 }
 return L.cash>=-1;
}
function coBust(co){
 const g=-co.L.loan;
 log(`【${co.name}】資金斷鏈，宣告倒閉！你的持股歸零${g>0?`，並因個人連帶保證須清償銀行借款 ${money(g)}`:''}。`,'bad');
 S.money-=g;S.job=null;S.co=null;chg('happy',-25);S.coHist=(S.coHist||0)+1;
}
