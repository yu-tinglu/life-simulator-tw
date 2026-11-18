/* ---- 圖示系統：以內建 SVG 線條圖示取代所有表情符號 ---- */
const IC={
briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
family:'<circle cx="8" cy="7" r="2.6"/><circle cx="16" cy="7" r="2.6"/><circle cx="12" cy="14" r="2"/><path d="M3 20c0-3 2.2-5 5-5M21 20c0-3-2.2-5-5-5M9 21c0-1.8 1.3-3 3-3s3 1.2 3 3"/>',
friends:'<circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M2.5 20c0-3.5 2.5-6 5.5-6s5.5 2.5 5.5 6M14.5 14.3c.7-.2 1.4-.3 2-.3 2.7 0 4.5 2.2 4.5 5"/>',
target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
house:'<path d="M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6"/>',
menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',
heartbreak:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/><path d="M12 6.5l-2 4 3 2-2 4.5"/>',
ring:'<circle cx="12" cy="15" r="5.5"/><path d="M9 7l3-4 3 4-3 3z"/>',
trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 21h8M10 17h4"/>',
medal:'<circle cx="12" cy="15" r="5"/><path d="M8.5 3l3.5 6 3.5-6M10 15l1.5 1.5L14.5 13"/>',
book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5zM4 19a2 2 0 0 0 2 2h13"/>',
clip:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>',
brain:'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 4 3 3 0 0 0 5 1.5V4.5A3 3 0 0 0 9 4zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 4 3 3 0 0 1-5 1.5V4.5A3 3 0 0 1 15 4z"/>',
chartup:'<path d="M3 20h18M5 16l4-5 4 3 6-8M15 6h4v4"/>',
chartbar:'<path d="M4 20h16"/><rect x="5" y="11" width="3" height="9"/><rect x="10.5" y="5" width="3" height="15"/><rect x="16" y="14" width="3" height="6"/>',
tree:'<path d="M12 21v-5M12 3l6 8h-3l4 6H5l4-6H6z"/>',
sprout:'<path d="M12 21V11M12 11C12 7 9 5 5 5c0 4 3 6 7 6M12 14c0-3 2-5 6-5 0 3-2 5-6 5"/>',
leaf:'<path d="M5 19c0-9 5-14 15-15 0 10-5 15-15 15zM5 19l9-9"/>',
globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
swap:'<path d="M7 7h13l-3-3M17 17H4l3 3"/>',
chat:'<path d="M4 5h16v11H9l-5 4V5z"/>',
phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
gift:'<rect x="4" y="9" width="16" height="4"/><path d="M5 13v8h14v-8M12 9v12M12 9c-3 0-4-5-1-5 2 0 1 5 1 5zM12 9c3 0 4-5 1-5-2 0-1 5-1 5z"/>',
cake:'<path d="M4 20h16M5 20v-7h14v7M12 13V9M12 9c-1-1-1-3 0-4 1 1 1 3 0 4M5 16c2 1.5 4-1.5 7 0s5 1.5 7 0"/>',
baby:'<circle cx="12" cy="11" r="7"/><path d="M9.5 10.5h.01M14.5 10.5h.01M10 14c1 .9 3 .9 4 0M12 4c1-1.5 3-1 3 .5"/>',
dove:'<path d="M3 15c4 0 7-2 9-6 1-1.8 3.5-2.5 5.5-1.5L21 6l-1.2 4.2C19.8 15.5 15 20 9 20c-2 0-4-1-5-2M16 8.5h.01"/>',
gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
coin:'<circle cx="12" cy="12" r="9"/><path d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.5 0-2.5.7-2.5 1.8s1 1.5 2.5 1.9 2.5.8 2.5 2-1 1.8-2.5 1.8c-1.2 0-2.1-.5-2.6-1.3M12 6v2M12 16v2"/>',
bank:'<path d="M3 10l9-6 9 6zM5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18"/>',
door:'<path d="M5 21V4h10v17M3 21h18M12 12.5h.01"/>',
stetho:'<path d="M6 3v6a4 4 0 0 0 8 0V3M6 3H5M14 3h1M10 13v2a4 4 0 0 0 8 0v-1"/><circle cx="18" cy="12" r="2"/>',
hospital:'<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M12 8v8M8 12h8"/>',
pill:'<rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M9.2 14.8l5.6-5.6"/>',
drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
flask:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8"/>',
news:'<rect x="4" y="4" width="14" height="16" rx="2"/><path d="M18 8h2v10a2 2 0 0 1-2 2M8 8h6M8 12h6M8 16h4"/>',
lotus:'<circle cx="12" cy="5" r="2"/><path d="M12 8v5M5 11l7 3 7-3M6 20l6-6 6 6"/>',
run:'<circle cx="15" cy="4.5" r="2"/><path d="M6 21l4-6 3 1 2-6-4-2-3 3M15 10l4 2M13 16l3 5"/>',
moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
male:'<circle cx="10" cy="14" r="5"/><path d="M14 10l6-6M15 4h5v5"/>',
female:'<circle cx="12" cy="9" r="5"/><path d="M12 14v8M9 18h6"/>',
pin:'<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
warn:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',
plane:'<path d="M21 3L3 11l7 3 3 7 8-18zM10 14L21 3"/>',
angry:'<circle cx="12" cy="12" r="9"/><path d="M7.5 8.5L11 10M16.5 8.5L13 10M9 11.5h.01M15 11.5h.01M8.5 16.5c1-1.3 2.3-2 3.5-2s2.5.7 3.5 2"/>',
net:'<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 7l8 0M7 8l4 8M17 8l-4 8"/>',
smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14c1 1.5 2.3 2 4 2s3-.5 4-2M9 9.5h.01M15 9.5h.01"/>',
meh:'<circle cx="12" cy="12" r="9"/><path d="M8.5 15.5h7M9 9.5h.01M15 9.5h.01"/>',
mask:'<circle cx="12" cy="12" r="9"/><path d="M7 12.5h10v3a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3zM9 9.5h.01M15 9.5h.01"/>',
question:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7M12 17h.01"/>',
cap:'<path d="M2 9l10-5 10 5-10 5zM6 11.5v4.5c3 2.5 9 2.5 12 0v-4.5M22 9v6"/>',
school:'<path d="M3 9l9-5 9 5H3zM5 9v11M19 9v11M3 20h18M9 13h6M9 16h6"/>',
dice:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01M12 12h.01"/>',
factory:'<path d="M3 21V10l6 4v-4l6 4V6h4v15H3zM7 18h2M12 18h2M17 18h2"/>',
building:'<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M11 21v-3h2v3"/>',
rainbow:'<path d="M3 18a9 9 0 0 1 18 0M7 18a5 5 0 0 1 10 0M11 18a1 1 0 0 1 2 0"/>',
sparkle:'<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',
star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
flower:'<circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/>',
tie:'<path d="M9 3h6l-1.5 4 2 12-3.5 2-3.5-2 2-12z"/>',
cup:'<path d="M5 8h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 10h2a2.5 2.5 0 0 1 0 5h-2M8 3v2M12 3v2"/>',
mug:'<path d="M6 7h9v12H6zM15 10h3v6h-3M8 4c.5 1 1.5 1 2 0s1.5-1 2 0"/>',
bowl:'<path d="M3 12h18a9 9 0 0 1-18 0zM8 8c0-1.2 1-1.2 1-2.5M12 8c0-1.2 1-1.2 1-2.5M16 8c0-1.2 1-1.2 1-2.5"/>',
wave:'<path d="M2 8c2-2 4-2 6 0s4 2 6 0 4-2 8 0M2 13c2-2 4-2 6 0s4 2 6 0 4-2 8 0M2 18c2-2 4-2 6 0s4 2 6 0 4-2 8 0"/>',
image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M3 17l5-5 4 4 3-3 6 6"/>',
palette:'<path d="M12 3a9 9 0 0 0 0 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a4 4 0 0 0 4-4c0-5-4-10-9-10zM8 11h.01M12 8h.01M16 11h.01"/>',
ferris:'<circle cx="12" cy="10" r="7"/><path d="M12 3v14M5 10h14M7 5l10 10M17 5L7 15M8 21l4-4 4 4"/>',
ticket:'<path d="M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4z"/><path d="M14 7v10" stroke-dasharray="2 2"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/>',
eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
dna:'<path d="M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9M9 6.5h6M9 17.5h6"/>',
scissors:'<circle cx="6" cy="7" r="2.5"/><circle cx="6" cy="17" r="2.5"/><path d="M8 8.5L20 18M8 15.5L20 6"/>',
checkc:'<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
crossc:'<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
check:'<path d="M5 12.5l4.5 4.5L19 7"/>',
x:'<path d="M6 6l12 12M18 6L6 18"/>',
wind:'<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8"/>',
person:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.5 3.5-7 8-7s8 2.5 8 7"/>',
kid:'<circle cx="12" cy="9" r="3.2"/><path d="M6 21c0-3.6 2.7-6 6-6s6 2.4 6 6"/>',
ptie:'<circle cx="12" cy="7" r="3.6"/><path d="M5 21c0-4 3-6.5 7-6.5s7 2.500 7 6.500M12 14.500l-1.5 2 1.500 3.500 1.500-3.500z"/>',
elder:'<circle cx="11" cy="7" r="3.6"/><path d="M4 21c0-4 3-6.500 7-6.500 2 0 3.500.5 4.800 1.500M18 13v8M16 13h2"/>',
chain:'<path d="M10 14a4 4 0 0 0 5.700 0l3-3a4 4 0 0 0-5.700-5.700l-1 1M14 10a4 4 0 0 0-5.700 0l-3 3a4 4 0 0 0 5.700 5.700l1-1"/>',
helmet:'<path d="M4 14a8 8 0 0 1 16 0v2H4zM4 19h16M12 6v4"/>',
inbox:'<path d="M4 13l3-8h10l3 8v6H4zM4 13h5l1 2h4l1-2h5"/>',
rocket:'<path d="M12 3c4 2 6 6 5 11l-3 3h-4l-3-3c-1-5 1-9 5-11zM9 17l-3 4M15 17l3 4M12 9h.01"/>',
scale:'<path d="M12 4v16M7 20h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
hourglass:'<path d="M6 3h12M6 21h12M7 3c0 6 5 6 5 9s-5 3-5 9M17 3c0 6-5 6-5 9s5 3 5 9"/>',
moped:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M9 17h6M15 17l3-8h-3M6 14l3-6h5"/>',
shades:'<path d="M3 10h18M5 10c0 4 2 6 4 6s3-2 3-4M12 12c0 2 1 4 3 4s4-2 4-6"/>',
nosmoke:'<circle cx="12" cy="12" r="9"/><path d="M5.600 5.600l12.800 12.800M7 14h6M16 14h1"/>',
refresh:'<path d="M20 11a8 8 0 0 0-14-4L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4l2-2M20 20v-5h-5"/>',
yarn:'<circle cx="12" cy="12" r="8"/><path d="M5 9c5 3 9 3 14 0M4.500 13c5 3 10 3 15 0"/>',
headphones:'<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.500"/><rect x="17" y="14" width="4" height="6" rx="1.500"/>',
play:'<path d="M7 4l13 8-13 8z"/>',
square:'<rect x="4" y="4" width="16" height="16" rx="3"/>',
dot:'<circle cx="12" cy="12" r="3"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.500 1.500M17.500 17.500L19 19M5 19l1.500-1.500M17.500 6.500L19 5"/>',
down:'<path d="M12 4v14M6 12l6 6 6-6"/>'
};
const EMO={
'💼':'briefcase','🏢':'building','🏭':'factory','🏗':'building','👔':'tie','👪':'family','👨‍👩‍👧':'family','👨‍👩‍👧‍👦':'family','🎯':'target','🏠':'house','🏡':'house','☰':'menu',
'❤':'heart','💗':'heart','💕':'heart','💞':'heart','💘':'heart','💌':'mail','💔':'heartbreak','💍':'ring','🏆':'trophy','🥇':'medal','🎗':'medal',
'📚':'book','📖':'book','📜':'clip','📋':'clip','🧠':'brain','📈':'chartup','📊':'chartbar','🌳':'tree','🌲':'tree','🌱':'sprout','🌿':'leaf','🍃':'leaf','🍀':'sprout',
'🌏':'globe','🌍':'globe','💱':'swap','💬':'chat','🗣':'chat','📞':'phone','📨':'mail','🎁':'gift','🎂':'cake','🍰':'cake','👶':'baby','🍼':'baby','🧸':'baby',
'🤝':'friends','🕊':'dove','⚙':'gear','💰':'coin','🏦':'bank','🏛':'bank','🚪':'door','🩺':'stetho','🏥':'hospital','🩸':'drop','💊':'pill','🔬':'flask','📰':'news',
'🧘':'lotus','💆':'lotus','🏃':'run','👟':'run','🚶':'run','🌙':'moon','🌃':'moon','♂':'male','♀':'female','📍':'pin','⚠':'warn','✈':'plane','😠':'angry','💢':'angry',
'🕸':'net','🙂':'smile','😮‍💨':'meh','😷':'mask','❓':'question','🏫':'school','🎓':'cap','🎲':'dice','🎰':'dice','🌈':'rainbow','🏳‍🌈':'rainbow','✨':'sparkle','🌟':'sparkle','⭐':'star',
'🌸':'flower','💐':'flower','☕':'cup','🧋':'cup','🍯':'bowl','🍢':'bowl','🍻':'mug','🌊':'wave','🏖':'wave','🖼':'image','🎨':'palette','🎡':'ferris','🎫':'ticket',
'🔍':'search','👀':'eye','🧬':'dna','✂':'scissors','✅':'checkc','✔':'check','❌':'crossc','🌀':'wind','👧':'kid','👦':'kid','🧑‍🎓':'cap','👩':'person','👨':'person','👩‍💼':'ptie','👨‍💼':'ptie','👵':'elder','👴':'elder',
'⛓':'chain','🪖':'helmet','📥':'inbox','🚀':'rocket','⚖':'scale','🔒':'lock','⏳':'hourglass','🛵':'moped','🕶':'shades','🚭':'nosmoke','🔄':'refresh','🧶':'yarn','🎧':'headphones','▶':'play','⬜':'square','🔪':'warn'
};
const EMO_RE=/(\p{Regional_Indicator}{2}|(?:(?![©®™])\p{Extended_Pictographic}|☰)(?:️|\u{1F3FB}-\u{1F3FF})?(?:‍\p{Extended_Pictographic}️?)*)/gu;
function icoKey(e){const k=e.replace(/️/g,'');return EMO[k]||EMO[k.replace(/‍.*$/,'')]||null}
function mkIcon(id){const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('class','ic ic-'+id);s.setAttribute('viewBox','0 0 24 24');s.setAttribute('aria-hidden','true');s.innerHTML=IC[id]||IC.dot;return s}
function stripEmoji(t){return String(t).replace(EMO_RE,'').replace(/\s{2,}/g,' ').trim()}
function iconize(root){
 if(!root||!root.nodeType)return;
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),list=[];let n;
 while((n=w.nextNode())){const p=n.parentNode&&n.parentNode.nodeName;if(p==='SCRIPT'||p==='STYLE'||p==='TEXTAREA'||p==='TITLE')continue;if(EMO_RE.test(n.nodeValue)){list.push(n)}EMO_RE.lastIndex=0}
 for(const t of list){
  const parts=t.nodeValue.split(EMO_RE),fr=document.createDocumentFragment();
  parts.forEach((s,i)=>{
   if(i%2===0){if(s)fr.appendChild(document.createTextNode(s));return}
   if(/^\p{Regional_Indicator}/u.test(s)){const sp=document.createElement('span');sp.className='flag';sp.textContent=[...s].map(c=>String.fromCharCode(c.codePointAt(0)-0x1F1E6+65)).join('');fr.appendChild(sp);return}
   const k=icoKey(s);if(k)fr.appendChild(mkIcon(k));
  });
  t.parentNode.replaceChild(fr,t);
 }
}
(function(){
 if(typeof document==='undefined'||!document.body||!document.body.appendChild||typeof MutationObserver==='undefined')return;
 let pend=false;const q=new Set();
 const run=()=>{pend=false;const a=[...q];q.clear();a.forEach(iconize)};
 const mo=new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData'){q.add(m.target.parentNode)}else m.addedNodes.forEach(n=>{if(n.nodeType===1||n.nodeType===3)q.add(n.nodeType===3?n.parentNode:n)})}if(!pend){pend=true;Promise.resolve().then(run)}});
 mo.observe(document.body,{childList:true,subtree:true,characterData:true});
 iconize(document.body);
})();
