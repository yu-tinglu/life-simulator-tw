/* ---- p52：平衡性校準（依模擬結果調整）---- */
/* 健康上限隨年齡下降：避免勤勞的玩家長期維持滿血而活到 100 歲以上 */
const HCAPK=.55;
const _y52=yearly;yearly=function(){_y52();try{if(S&&S.age>35){const cap=Math.round(100-(S.age-35)*HCAPK);if(S.health>cap)S.health=cap}}catch(e){}};
/* 高齡死亡率微調：80 歲後略為提高，使健康玩家的壽命分布更接近現實（約 85 歲左右）*/
const _dc52=deathCheck;deathCheck=function(){const c=_dc52();if(c)return c;const a=S.age;if(a>=70){const p=Math.pow(a-55,2)*.00012*(a>=90?.7:a>=80?.4:.2);if(chance(p))return a>80?'壽終正寢':'突發疾病'}return null};
/* 生活費隨收入調整：低收入者會節衣縮食、與家人分攤，不會一路負債 */
const _lc52=livingCost;livingCost=function(){const b=_lc52();try{const j=S.job;let f=1;if(j&&!j.founder&&j.sal){f=Math.max(.6,Math.min(1,(j.sal*.85)/b))}else if(!j&&!S.co&&S.money<b*3){f=.65}return Math.round(b*f)}catch(e){return b}};
