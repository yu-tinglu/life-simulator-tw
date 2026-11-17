'use strict';
const $=id=>document.getElementById(id);
const R=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[Math.floor(Math.random()*a.length)];
const chance=p=>Math.random()<p;
const cl=v=>Math.max(0,Math.min(100,Math.round(v)));
let MNY_TW=false;
function money(n){
 let sym='NT$',v=n;
 try{if(!MNY_TW&&S&&S.cn&&S.cn!=='TW'&&CNS[S.cn]){const f=fxr(S.cn);if(f>0){v=n/f;sym=CNS[S.cn].sym}}}catch(e){}
 return (v<0?'-':'')+sym+Math.abs(Math.round(v)).toLocaleString('en-US');
}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const SUR='陳林黃張李王吳劉蔡楊許鄭謝郭洪曾邱廖賴徐'.split('');
const MG=['家豪','志明','建宏','俊傑','承翰','冠宇','柏翰','宗翰','信宏','彥廷','宇軒','哲瑋','品睿','子謙','奕辰'];
const FG=['怡君','雅婷','淑芬','佳穎','欣怡','詩涵','宜庭','雅雯','心怡','婉如','紫晴','語彤','品妍','姿穎','怡萱'];
function given(g,by){return pick(g==='男'?MG:FG)}
function fullName(g,by){return pick(SUR)+given(g,by)}
const EDU=['無學歷','小學','國中','高中職','大學','碩士','博士'];
const STATS=[['health','健康','#e11d48'],['happy','快樂','#d97706'],['smarts','智力','#2563eb'],['looks','外貌','#9333ea']];

const HOUSES=[{n:'小套房（南部）',p:6000000},{n:'電梯大樓（高雄／台南）',p:9000000},{n:'小套房（雙北）',p:12000000},{n:'電梯大樓（台中）',p:12000000},{n:'電梯大樓（新北）',p:15000000},{n:'電梯大樓（台北）',p:25000000},{n:'豪宅（新北／台中）',p:30000000},{n:'豪宅（台北）',p:60000000}]; // 房價為遊戲估算（非內政部實價登錄）
const CARS=[{n:'國產二手車',p:300000},{n:'新房車',p:900000},{n:'跑車',p:3500000}];
const SAVEKEY='lifesim_tw_save_v1';
let S=null,queue=[],busy=false;
const log=(t,c)=>S.log[S.log.length-1].lines.push({t:typeof logV==='function'?logV(t):t,c:c||''});
const chg=(k,d)=>{S[k]=cl(S[k]+d)};
const ch=(l,f)=>({l,f}),G=t=>[t,'good'],B=t=>[t,'bad'],N=t=>[t,''];
const netWorth=()=>S.money-(S.sloan||0)+(typeof bkTotal==='function'?bkTotal():0)+(S.house?S.house.value:0)-(S.mort?S.mort.left:0)+(S.car?S.car.value:0)+(S.props?S.props.reduce((a,p)=>a+p.value-(p.mort?p.mort.left:0),0):0)+(typeof stake==="function"?stake(S.co):0)+(typeof cnAssets==="function"?cnAssets():0);
