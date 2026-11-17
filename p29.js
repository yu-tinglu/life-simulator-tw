/* ---- 薪資寫實化（p29）----
   表中年薪視為「該職類有經驗者的典型年薪」。新人起薪較低，隨年資成長；個人、公司規模、學歷、技能都會影響。
   校準：勞動部 112 年初任人員月薪平均 3.5 萬（大學 3.3 萬、研究所 4.9 萬）；主計總處 112 年全年總薪資中位數 52.5 萬，
   未滿 30 歲 45.0 萬、40–49 歲 59.4 萬、研究所 105 萬；2024 年女性時薪為男性 84.2%。幅度為遊戲簡化。 */
const EXPC={0:[1,1,1],1:[.92,1,1.08],2:[.9,1,1.1],3:[.82,1,1.18],4:[.72,1,1.3],5:[.6,1,1.45],6:[.6,1,1.4]};
function fExp(edu,y){const c=EXPC[edu]||EXPC[3];if(y<=0)return c[0];if(y<10)return c[0]+(1-c[0])*(1-Math.exp(-y/4))/(1-Math.exp(-2.5));if(y<25)return 1+(c[2]-1)*(y-10)/15;return c[2]}
function effExp(t){const s=S.exp||0,b=(S.expBy&&S.expBy[t])||0;return b+(s-b)*.35}
const WI=()=>{const y=calYear();return y<=2026?Math.pow(1.025,y-2026):(S.wf||1)};
const clampN=(v,a,b)=>Math.max(a,Math.min(b,v));
function eduB(j){return 1+.05*clampN(S.edu-j.edu,0,3)}
const gB=()=>S.sx==='女'?.94:1;
function hireJob(j){
 if(!S.expBy)S.expBy={};if(S.exp==null)S.exp=0;
 const ref=jobSal(j),wi=WI(),sg=[.35,.10,.10,.12,.16,.20,.20][j.edu]||.15;
 let m=Math.exp(sg*nrm())*eduB(j)*gB(),emp='';
 if(!j.var&&j.edu>0){const r=Math.random();const e=r<.3?['小型公司',.92]:r<.75?['中型公司',1]:['大型企業',1.12];emp=e[0];m*=e[1]}
 const o={t:j.t,var:j.var,lv:1,years:0,perf:50,cn:S.cn,ref,m,emp,e:j.edu,fame:j.var?(j.edu===0?-.5+.8*nrm():-.2+.4*nrm()):0};
 o.sal=Math.round(ref*wi*(j.var?m*Math.exp(o.fame):m*fExp(j.edu,effExp(j.t))));o.s0=o.sal;
 return o;
}
function varIncome(j){return Math.max(0,j.sal*Math.exp((j.e===0?.55:.35)*nrm()))}
function salRange(j){
 const base=jobSal(j)*WI(),g=gB()*eduB(j);
 if(j.var)return `收入浮動大，中位約 ${money(base)}`;
 const a=base*fExp(j.edu,effExp(j.t))*g,b=base*fExp(j.edu,25)*g;
 return `新人約 ${money(a)}，資深可達 ${money(b)}`;
}
const _y29=yearly;
yearly=function(){
 const j0=S.job,lv0=j0?j0.lv:0,had=j0&&!j0.founder&&!S.army&&!S.jail&&!S.school;
 _y29();
 if(calYear()>2026)S.wf=(S.wf||1)*wageGrow();
 if(had&&S.job===j0&&!j0.ref){if(!j0.var)j0.sal=Math.round(j0.sal*wageGrow());return}
 if(!(had&&S.job===j0&&j0.ref))return;
 if(!S.expBy)S.expBy={};S.exp=(S.exp||0)+1;S.expBy[j0.t]=(S.expBy[j0.t]||0)+1;
 if(j0.s0&&j0.sal!==j0.s0&&j0.s0>0)j0.m=clampN(j0.m*j0.sal/j0.s0,.5,3);
 if(j0.lv>lv0)j0.m*=1.10;
 j0.m=clampN(j0.m*(1+(j0.perf-50)/1500),.5,3);
 if(j0.var){j0.fame=clampN(j0.fame+.25*nrm()+(j0.perf>55?.04:0),-3,2.5);j0.sal=Math.round(j0.ref*WI()*j0.m*Math.exp(j0.fame))}
 else j0.sal=Math.round(j0.ref*WI()*j0.m*fExp(j0.e,effExp(j0.t)));
 j0.s0=j0.sal;
};
