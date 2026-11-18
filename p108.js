/* ---- p108：海外時金額輸入欄改用當地貨幣（與畫面顯示一致）---- */
function frmLoc(){try{return !MNY_TW&&S&&S.cn&&S.cn!=='TW'&&CNS[S.cn]&&fxr(S.cn)>0?fxr(S.cn):0}catch(e){return 0}}
const _fh108=frmHTML;
frmHTML=function(id,o){
 const f=frmLoc();view.frmLoc=view.frmLoc||{};
 if(!f||o.al||o.amt===false){view.frmLoc[id]=0;return _fh108.apply(this,arguments)}
 view.frmLoc[id]=f;
 const st=frmState(id),o2=Object.assign({},o,{al:`金額（${CNS[S.cn].sym}）`});
 if(st.a==null&&o.def!=null&&!isNaN(+o.def))o2.def=String(Math.max(1,Math.round(+o.def/f)));
 return _fh108.call(this,id,o2);
};
const _fg108=frmGet;
frmGet=function(id){
 const g=_fg108.apply(this,arguments);
 try{const f=view.frmLoc&&view.frmLoc[id];if(f&&g.a>0)g.a=Math.round(g.a*f)}catch(e){}
 return g;
};
/* 資料來源頁：補上各項新增模型的依據與限制 */
try{LGL.src.push(['遊戲模型設定（非官方資料）',[
 '各國選舉年與任期：依各國憲政制度概略設定（美國眾議員與州議員 2 年、總統 4 年；英國下議院 5 年；德國聯邦議會 4 年等），日期與制度細節已簡化',
 '各國福利：失業給付、兒童津貼、老年年金為依 OECD 與各國社福制度概略設定的比例，不是精算結果',
 '海外房價：依當地平均年薪乘以房價所得比，參考各國官方與研究機構公布的首都圈行情，並非實際成交價',
 '全球危機（金融危機、疫情、升息潮、科技泡沫）：未來事件為機率模型，頻率與幅度是遊戲設定，不是預測',
 '單一國家股市 ETF：2026 年以前依區域指數的真實資料混合推估，並非各國實際指數；2026 年之後為模型模擬',
 '聯合政府、政策路線、法案審議、各項施政效果：皆為遊戲機制設定，不代表任何真實政黨或政策的實際成效'
]])}catch(e){}
