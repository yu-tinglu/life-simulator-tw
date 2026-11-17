/* ---- p54：事件卡片顯示表情頭像 ---- */
const _ak54=ask;ask=function(text,labels,cb){_ak54(text,labels,cb);try{if(!S||S.dead||avS().expr===0||avS().hdr===0)return;const a=avSelf(),t=String(text),c=avCtx();
 if(/過世|離世|去世|喪禮/.test(t))a.ex='cry';else if(/分手|離婚|被裁|解僱|破產|車禍|詐騙|欠債|催繳/.test(t))a.ex='sad';else if(/吵架|生氣|憤怒|爭執/.test(t))a.ex='angry';else if(/確診|住院|手術|急診|生病/.test(t)){a.ex='sick';a.sp='hospital'}else if(/婚禮|求婚|結婚/.test(t)){a.ex='happy';a.sp='wedding'}else if(/畢業典禮|畢業/.test(t)){a.ex='happy';a.sp='grad'}else if(/驚|意外|突然|竟然/.test(t))a.ex='shock';else if(/恭喜|中獎|錄取|升遷|加薪|成功/.test(t))a.ex='happy';
 const b=$('modalBody');if(b&&!/data-i="0"[^>]*>\s*重新投胎/.test(b.innerHTML))b.innerHTML=`<div style="display:flex;justify-content:center;margin-bottom:4px">${avSVG(a,56)}</div>`+b.innerHTML}catch(e){}};
