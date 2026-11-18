// 海外物價：醫療與車價依各國物價水準
function ctryIdx(k,exp,lo,hi){try{const a=CNS[k].w,b=CNS.TW.w;if(!a||!b)return 1;return Math.max(lo,Math.min(hi,Math.pow(a/b,exp)))}catch(e){return 1}}
function medF(k){const t={TW:1,US:3.5,JP:.9,KR:.7,GB:1.3,DE:1.3,AU:1.8,CA:1.7,SG:1.5,CN:.6,HK:1.2};if(t[k]!=null)return t[k];return ctryIdx(k,.7,.3,3)}
function carF(k){const t={TW:1,US:.95,JP:.9,KR:.95,GB:1.1,DE:1.0,AU:1.2,CA:1.1,SG:3.5,CN:.8,HK:1.8};if(t[k]!=null)return t[k];return ctryIdx(k,.4,.6,1.5)}
medIdx=function(){return Math.pow(1.03,Math.max(0,(S.year||2026)-2026))*medF(S.cn||'TW')};
CARS.forEach(c=>{const b=c.p;Object.defineProperty(c,'p',{get(){return Math.round(b*(typeof S!=='undefined'&&S?carF(S.cn||'TW'):1)/1e4)*1e4},configurable:true})});
