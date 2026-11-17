/* ---- p39：子女科系與才藝（依各國特色）---- */
const KCATW={'學術':['med','sci','law','eng','hum','soc'],'藝術':['art','hum','art'],'運動':['med','edu','soc','art'],'商業':['biz','law','soc','biz'],'社交':['soc','hum','biz','edu'],'技術':['eng','agr','sci','eng']};
const KMJINC={med:1.5,eng:1.25,law:1.2,biz:1.1,sci:1.05,soc:.98,hum:.92,edu:.95,art:.9,agr:.95};
function pickKidMajor(k){
 const cats=KCATW[k.tal]||['soc','biz'],cat=pick(cats),sc=(k.grd||60)*.5+(k.sm||50)*.4+(k.pre||0)*2;
 let l=MJ.filter(m=>m[2]===cat&&m[3]<=sc/3.2);if(!l.length)l=MJ.filter(m=>m[2]===cat).sort((a,b)=>a[3]-b[3]).slice(0,2);
 return pick(l)[0];
}
const _ss39=startSchool;
startSchool=function(k,stage,o){_ss39(k,stage,o);if((stage==='un'||stage==='gr')&&!k.mj&&o.edu>=4)k.mj=pickKidMajor(k)};
const _kc39=kidCareer;
kidCareer=function(k){
 _kc39(k);
 if(k.mj&&MJX[k.mj]&&(k.edu||0)>=4){
  const m=MJX[k.mj],mult=KMJINC[m[2]]||1;k.inc=Math.round(k.inc*mult);
  const js=JOBS.filter(j=>m[4].test(j.t)&&j.edu<=k.edu&&j.edu>=3);
  if(js.length){const j=pick(js);k.occ=j.t+(k.cn&&k.cn!=='TW'&&CNS[k.cn]?`（${CNS[k.cn].n}）`:'')}
 }
};
/* 子女才藝：依居住國特色顯示 */
const _kh39=kidHTML;
kidHTML=function(i){let h=_kh39(i);const k=S.kids[i];if(!k)return h;
 const extra=[];
 if(k.mj&&MJX[k.mj])extra.push(`<div class="item">科系：<b>${MJX[k.mj][1]}</b>（${MJC[MJX[k.mj][2]]}）<br><small class="sub">${MJCD[MJX[k.mj][2]]}</small></div>`);
 if(k.train){if(!k.artId){const l=artsFor(S.cn||'TW').concat(ARTS.filter(a=>a.cost<=12000));k.artId=pick(l).id}const a=ARTALL[k.artId];if(a)extra.push(`<div class="item">才藝培養：<b>${a.n}</b>（${ARTCAT[a.c]}）<br><small class="sub">${a.d}</small></div>`)}
 if(!extra.length)return h;const j=h.indexOf('<div class="sec">教養決策</div>');return j>=0?h.slice(0,j)+extra.join('')+h.slice(j):h+extra.join('')};
const _ky39=kidYear;
kidYear=function(k){_ky39(k);if(k.train&&k.age>=5&&k.age<=20){if(!k.artId){const l=artsFor(S.cn||'TW').concat(ARTS.filter(a=>a.cost<=12000));k.artId=pick(l).id}if(chance(.18)&&k.ts>=55){const b=R(1,3);k.ts=Math.min(100,k.ts+b);if(chance(.35)){const a=ARTALL[k.artId];log(`${k.n}參加「${a?a.n:'才藝'}」比賽，表現不錯。`,'good')}}}};
