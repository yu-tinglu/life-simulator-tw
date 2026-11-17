/* ---- p51：頭像 v2：外貌基因、造型、數值、設定與世代遺傳 ---- */
const AVSK=['#f8e3d3','#efc9a6','#dcab7c','#bd8558','#8d5d3d','#5f3d29'],AVHC=['#1d1613','#4b3427','#7b5738','#b08a55','#d8b96b','#a8452b'],AVEC=['#241a14','#5a3b25','#7a7a3a','#3f7a55','#3f6fa6','#7d8a96'];
const AVECN=['深褐','褐','淺褐／榛','綠','藍','灰'],AVHCN=['黑','深棕','棕','淺棕','金','紅'],AVHSN=['短髮','旁分','長直髮','短捲髮','包頭','寸頭','馬尾','鮑伯頭','長捲髮','瀏海長髮','爆炸頭','雙邊削短'],AVFSN=['鵝蛋臉','圓臉','方臉','心形臉','長臉'];
const AVREG={EA:{sk:[.05,.35],hc:[90,8,2,0,0,0],ec:[90,9,1,0,0,0],ed:.5,nb:.35},SE:{sk:[.25,.55],hc:[92,6,2,0,0,0],ec:[90,10,0,0,0,0],ed:.6,nb:.3},SA:{sk:[.35,.75],hc:[88,10,2,0,0,0],ec:[72,22,4,1,1,0],ed:.9,nb:.6},CS:{sk:[.15,.45],hc:[60,25,10,3,1,1],ec:[58,28,8,3,2,1],ed:.7,nb:.55},ME:{sk:[.2,.55],hc:[72,20,6,2,0,0],ec:[55,33,8,2,1,1],ed:.95,nb:.7},EW:{sk:[0,.25],hc:[15,25,25,18,12,5],ec:[10,20,20,12,28,10],ed:.98,nb:.75},EE:{sk:[0,.25],hc:[14,26,26,17,12,5],ec:[8,18,20,14,28,12],ed:.98,nb:.75},LA:{sk:[.15,.65],hc:[55,30,10,3,1,1],ec:[55,35,6,2,1,1],ed:.9,nb:.55},AF:{sk:[.65,.98],hc:[97,3,0,0,0,0],ec:[93,7,0,0,0,0],ed:.95,nb:.4},OC:{sk:[0,.25],hc:[22,28,22,15,10,3],ec:[15,25,20,12,20,8],ed:.98,nb:.75},PI:{sk:[.35,.75],hc:[85,12,3,0,0,0],ec:[85,15,0,0,0,0],ed:.9,nb:.45}};
const AVH={EA:[172,160],SE:[165,154],SA:[166,153],CS:[172,160],ME:[171,159],EW:[178,165],EE:[177,165],LA:[169,157],AF:[168,157],OC:[178,165],PI:[170,160]};
const avC01=x=>Math.max(0,Math.min(1,x)),avRnd=()=>Math.random(),avRr=(a,b)=>a+(b-a)*avRnd(),avWp=w=>{let t=w.reduce((a,b)=>a+b,0),r=avRnd()*t;for(let i=0;i<w.length;i++){r-=w[i];if(r<=0)return i}return 0};
const AVSET='lifesim_tw_avs';
const avS=()=>Object.assign({bg:0,sh:0,pres:'auto',outfit:'auto',hdr:1,mut:1,rec:1,sz:1,show:0,expr:1},lsGet(AVSET,{}));
function nameToCode(n){for(const k in CNS)if(CNS[k].n===n)return k;return null}
function avFill(g,reg){const r=AVREG[reg]||AVREG.EA,d={ut:avRnd(),hd:avRr(.3,1),hl:Math.floor(avRnd()*3),fl:avRr(.9,1.1),jw:avRr(.75,1.05),chn:avRnd(),es:avRr(.85,1.15),esp:avRr(.9,1.1),ed:avRnd()<r.ed?1:0,br:avRnd(),ba2:avRnd(),nb:avRnd()<r.nb?avRr(.55,1):avRr(0,.5),nw:avRr(.8,1.2),lw:avRr(.85,1.15),er:avRr(.8,1.2),bm:avRnd(),mo:Math.floor(avRnd()*3.3),bmk:avRnd()<.06?1:0,ac:avRnd(),bd:avRnd(),fs:Math.floor(avRnd()*5),fw:avRr(.88,1.12),nz:avRr(.7,1.3),lp:avRr(.75,1.35),hw:avRnd(),hs:Math.floor(avRnd()*12),ey:Math.floor(avRnd()*3),ht:avRnd(),sk:avRr(r.sk[0],r.sk[1]),hc:avWp(r.hc),ec:avWp(r.ec),ba:avRnd()<.3?1:0,my:avRnd()<.35?1:0,fr:avRnd()<.12?1:0,dm:avRnd()<.15?1:0,gm:avRnd()<.12?1:0};
 for(const k in d)if(g[k]==null)g[k]=d[k];return g}
function genFor(code,ethSub){const reg=regOf(code),g=avFill({},reg);if(ethSub==='原住民')g.sk=avC01(g.sk+.12);return g}
function avMixC(a,b,sd){const w=avRr(.3,.7),m=(S&&S.av&&0)||1;return avC01(a*w+b*(1-w)+(avRnd()-.5)*sd*(avS().mut===0?.4:avS().mut===2?1.8:1))}
function avChild(a0,b0){
 const st=avS(),mut=st.mut===0?.3:st.mut===2?2.2:1,rec=st.rec===2?1.5:1;a0=avFill(a0,'EW');b0=avFill(b0,'EW');const a=a0,b=b0;
 const domH=(x,y)=>(x===0||y===0)?(avRnd()<.72/rec?0:(avRnd()<.5?x:y)):(avRnd()<.5?x:y),pk=(x,y)=>avRnd()<.5?x:y;
 const sc=(k,lo,hi,sd)=>lo+avMixC((a[k]-lo)/(hi-lo),(b[k]-lo)/(hi-lo),sd)*(hi-lo);
 const g={sk:avMixC(a.sk,b.sk,.12),ut:avMixC(a.ut,b.ut,.2),hc:domH(a.hc,b.hc),hs:pk(a.hs,b.hs),hw:avMixC(a.hw,b.hw,.2),hd:avMixC(a.hd,b.hd,.2),hl:pk(a.hl,b.hl),fs:pk(a.fs,b.fs),
  fw:sc('fw',.88,1.12,.2),fl:sc('fl',.9,1.1,.2),jw:sc('jw',.75,1.05,.2),chn:avMixC(a.chn,b.chn,.2),ey:pk(a.ey,b.ey),es:sc('es',.85,1.15,.2),esp:sc('esp',.9,1.1,.2),
  ed:(a.ed||b.ed)?(avRnd()<.75?1:0):0,ec:domH(a.ec,b.ec),br:avMixC(a.br,b.br,.2),ba2:avMixC(a.ba2,b.ba2,.2),nz:sc('nz',.7,1.3,.2),nb:avMixC(a.nb,b.nb,.2),nw:sc('nw',.8,1.2,.2),lp:sc('lp',.75,1.35,.2),lw:sc('lw',.85,1.15,.2),er:sc('er',.8,1.2,.2),
  ht:avMixC(a.ht,b.ht,.15),bm:avMixC(a.bm,b.bm,.2),mo:Math.max(0,Math.min(3,pk(a.mo,b.mo)+(avRnd()<.2?1:0))),bmk:(a.bmk||b.bmk)?(avRnd()<.3?1:0):(avRnd()<.03?1:0),ac:avMixC(a.ac,b.ac,.2),bd:avMixC(a.bd,b.bd,.2),
  ba:(a.ba||b.ba)?(avRnd()<.5?1:0):(avRnd()<.05?1:0),my:(a.my&&b.my)?(avRnd()<.8?1:0):(a.my||b.my)?(avRnd()<.45?1:0):(avRnd()<.12?1:0),fr:(a.fr||b.fr)?(avRnd()<.5?1:0):0,dm:(a.dm||b.dm)?(avRnd()<.5?1:0):0,gm:(a.gm||b.gm)?(avRnd()<.5?1:0):0};
 if(avRnd()<.03*mut)g.hs=Math.floor(avRnd()*12);if(avRnd()<.02*mut)g.hc=Math.floor(avRnd()*6);if(avRnd()<.015*mut)g.ec=Math.floor(avRnd()*6);if(avRnd()<.02*mut)g.fs=Math.floor(avRnd()*5);return g;
}
function avEnsure(){
 if(!S.av){const code=(S.eth&&S.eth.o&&nameToCode(S.eth.o))||S.cn||'TW';let g=genFor(code,S.eth&&S.eth.sub);
  if(S.eth&&S.eth.g&&/混/.test(S.eth.g)&&S.eth.o){const o=nameToCode(S.eth.o);if(o)g=avChild(genFor('TW'),genFor(o))}S.av={g,o:{}}}
 if(!S.av.o)S.av.o={};avFill(S.av.g,regOf((S.eth&&S.eth.o&&nameToCode(S.eth.o))||S.cn||'TW'));return S.av;
}
function avPartner(){if(!S.partner)return null;if(!S.partner.gn){const code=(S.partner.o&&nameToCode(S.partner.o))||S.cn||'TW';S.partner.gn=genFor(code);S.partner.lk=S.partner.lk||Math.round(avRr(25,85))}return avFill(S.partner.gn,'EW')}
/* ---- 數值：身高、體重、體態、皮膚 ---- */
function avHeight(a){const reg=regOf(S.cn||'TW'),b=AVH[reg]||AVH.EA,male=a.sx!=='女',base=male?b[0]:b[1],adult=base+(a.g.ht-.5)*24+(a.o.hAdd||0);const age=a.age;const f=age>=18?1:age>=14?.94+.06*(age-14)/4:age>=10?.82+.12*(age-10)/4:age>=5?.66+.16*(age-5)/5:age>=1?.5+.16*(age-1)/4:.3;return Math.round(adult*f*(age>=65?1-(age-65)*.0012:1)*10)/10}
function avBMI(a){const age=a.age;if(age<18)return Math.round((15.5+a.g.bm*3+(a.o.build||0)*2+age*.15)*10)/10;return Math.round((21+(a.g.bm-.5)*3+(a.o.build||0)*4+Math.min(3,Math.max(0,age-30)*.07)+(a.o.diet||0))*10)/10}
const avBMIc=b=>b<18.5?'偏瘦':b<24?'正常':b<27?'過重':b<30?'輕度肥胖':'肥胖';
function avCharm(a){const g=a.g,d=(x,m,s)=>Math.max(0,1-Math.abs(x-m)/s);
 const bal=(d(g.fw,1,.12)+d(g.nz,1,.3)+d(g.lp,1.05,.3)+d(g.esp,1,.1)+d(g.jw,.9,.15))/5*100;
 const skin=Math.max(0,Math.min(100,80-Math.max(0,a.age-30)*.6-(a.o.skin?0:6)+(a.o.skin||0)*4-(a.addict?10:0)-(a.age>=12&&a.age<=22&&g.ac>.6?10:0)));
 const body=Math.round(d(avBMI(a),21.5,6)*100),hair=Math.round(60+g.hd*30-(g.ba&&a.sx!=='女'?Math.max(0,a.age-35)*1.2:0)),aura=Math.round(Math.max(0,Math.min(100,(a.happy||50)*.6+(100-(a.stress||30))*.4)));
 return {bal:Math.round(bal),skin:Math.round(skin),body,hair:Math.max(0,Math.min(100,hair)),aura,all:Math.round(bal*.3+skin*.2+body*.2+hair*.1+aura*.2)}}
/* ---- 繪圖 ---- */
const avMix=(a,b,t)=>{const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),x=p(a),y=p(b);return '#'+x.map((v,i)=>Math.round(v*(1-t)+y[i]*t).toString(16).padStart(2,'0')).join('')};
function avSkinCol(s,ut){const i=s*5,a=Math.floor(i),b=Math.min(5,a+1);let c=avMix(AVSK[a],AVSK[b],i-a);return avMix(c,ut>.5?'#d9a066':'#c9a0a0',.08)}
function avOutfit(a){const st=avS(),o=a.o,male=a.sx!=='女';let m=st.outfit!=='auto'?st.outfit:(a.job?'formal':a.age<19&&a.age>=6?'uniform':'casual');if(a.age<6)m='casual';
 return {mode:m,col:o.shirt||(m==='formal'?'#33405a':m==='uniform'?'#f2f2f2':m==='sport'?'#2f8f6e':(male?'#4f7a9a':'#c0553a'))}}
function avHairBack(s,x){const{hs,rx,cy,ry,hcol}=x;
 if(x.bald&&x.balF>.7)return s;
 if(hs===2||hs===8||hs===9)s+=`<path d="M${50-rx-4} ${cy-6} Q${50-rx-9} ${cy+28} ${50-rx+1} ${cy+40} L${50+rx-1} ${cy+40} Q${50+rx+9} ${cy+28} ${50+rx+4} ${cy-6} Z" fill="${hcol}"/>`;
 if(hs===7)s+=`<path d="M${50-rx-4} ${cy-6} Q${50-rx-6} ${cy+16} ${50-rx+2} ${cy+20} L${50+rx-2} ${cy+20} Q${50+rx+6} ${cy+16} ${50+rx+4} ${cy-6} Z" fill="${hcol}"/>`;
 if(hs===4)s+=`<circle cx="50" cy="${cy-ry-4}" r="9" fill="${hcol}"/>`;
 if(hs===6)s+=`<path d="M${50+rx-2} ${cy-8} Q${50+rx+14} ${cy-4} ${50+rx+9} ${cy+22} Q${50+rx+4} ${cy+10} ${50+rx-2} ${cy-2}Z" fill="${hcol}"/>`;
 if(hs===10)s+=`<circle cx="50" cy="${cy-6}" r="${rx+11}" fill="${hcol}"/>`;
 if(hs===3||hs===8)s+=`<circle cx="${50-rx-3}" cy="${cy+4}" r="7" fill="${hcol}"/><circle cx="${50+rx+3}" cy="${cy+4}" r="7" fill="${hcol}"/>`;
 return s}
function avHairFront(s,x){const{hs,rx,cy,ry,hcol,g}=x,top=cy-ry;
 if(x.bald){const tuft=(1-x.balF)*8;s+=`<path d="M${50-rx+1} ${cy-4} Q${50-rx-2} ${cy-12} ${50-rx+5} ${cy-17}" stroke="${hcol}" stroke-width="${3+tuft/3}" fill="none" stroke-linecap="round"/><path d="M${50+rx-1} ${cy-4} Q${50+rx+2} ${cy-12} ${50+rx-5} ${cy-17}" stroke="${hcol}" stroke-width="${3+tuft/3}" fill="none" stroke-linecap="round"/>`;if(x.balF<.6)s+=`<path d="M${50-rx+4} ${top+8} Q50 ${top-2-tuft} ${50+rx-4} ${top+8} Q50 ${top+7} ${50-rx+4} ${top+8}Z" fill="${hcol}"/>`;return s}
 const bz=hs===5?3:hs===11?1:0,thin=g.hd<.4?.0:1;
 s+=`<path d="M${50-rx-1} ${cy-2} Q${50-rx-2} ${top-4+bz} 50 ${top-4+bz} Q${50+rx+2} ${top-4+bz} ${50+rx+1} ${cy-2} Q${50+rx-4} ${top+(g.hl===2?11:8)} 50 ${top+(g.hl===1?10:7)-bz} Q${50-rx+4} ${top+(g.hl===2?11:8)} ${50-rx-1} ${cy-2} Z" fill="${hcol}"/>`;
 if(hs===1)s+=`<path d="M${50-rx+2} ${top+8} Q${50-2} ${top-1} ${50+rx-2} ${top+12}" fill="${hcol}"/>`;
 if(hs===9||hs===7)s+=`<path d="M${50-rx} ${top+10} Q50 ${top+17} ${50+rx} ${top+10} L${50+rx} ${top+4} Q50 ${top-6} ${50-rx} ${top+4}Z" fill="${hcol}"/>`;
 if(hs===3||hs===8||hs===10||g.hw>.82)s+=`<circle cx="${50-rx+4}" cy="${top+4}" r="5" fill="${hcol}"/><circle cx="50" cy="${top-2}" r="5.5" fill="${hcol}"/><circle cx="${50+rx-4}" cy="${top+4}" r="5" fill="${hcol}"/>`;
 return s}
function avSVG(a,size){
 const g=a.g,o=a.o||{},age=a.age,st=avS(),pres=o.pres||st.pres,male=pres==='中性'?a.sx!=='女':pres==='男'||(pres==='auto'&&a.sx!=='女'),dead=a.dead;
 const sc=age<3?.8:age<7?.85:age<13?.91:age<19?.96:1,sk0=avSkinCol(o.tan?avC01(g.sk+o.tan):g.sk,g.ut),pale=(a.health<30)?.12:0,sk=pale?avMix(sk0,'#d9d2c8',pale):sk0,skd=avMix(sk,'#6b4430',.25);
 const grayT=avC01((age-(g.gm?30:46))/32),hcol=o.dye||avMix(AVHC[g.hc],'#d9d9d9',grayT);
 const fw=g.fw*(1+Math.max(0,(o.build||0))*.08+(o.fwAdd||0)),rx=21*fw*(age<3?1.12:1),ry=25*g.fl*(age<3?.95:1),jw=Math.max(.6,Math.min(1.15,g.jw+(o.jwAdd||0)));
 const cy=46+(age<3?4:0),sw=26+(o.build||0)*5+(male?3:0)+(g.ht-.5)*4+(g.bm-.5)*3,outf=avOutfit({job:a.job,age,sx:a.sx,o}),bald=male&&g.ba&&age>35&&!o.hair,balF=avC01((age-35)/35);
 const hs=o.hs!=null?o.hs:g.hs,X={hs,rx,cy,ry,hcol,g,bald,balF};
 let s=`<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" ${dead?'style="filter:grayscale(1);opacity:.75"':''}><circle cx="50" cy="50" r="49" fill="${['#efe3d6','#dbe8f1','#e5efd9','#f3dfe6','#e8e1f2','#f1ead0'][st.bg]||'#efe3d6'}"/><g transform="translate(50 100) scale(${sc}) translate(-50 -100)">`;
 s=avHairBack(s,X);
 /* 身體 */
 s+=`<path d="M${50-sw} 100 Q${50-sw} 78 ${50-8} 74 L${50+8} 74 Q${50+sw} 78 ${50+sw} 100 Z" fill="${outf.col}"/>`;
 if(outf.mode==='formal'){s+=`<path d="M${50-9} 74 L50 90 L${50+9} 74 Z" fill="#f4f4f4"/><path d="M50 78 l-2.4 5 l2.4 12 l2.4 -12 z" fill="#b2403a"/>`}
 else if(outf.mode==='uniform'){s+=`<path d="M${50-9} 74 L50 84 L${50+9} 74 Z" fill="#2b4a7c"/>`}
 else if(outf.mode==='sport'){s+=`<path d="M${50-sw+3} 90 L${50+sw-3} 90" stroke="#fff" stroke-width="2"/>`}
 s+=`<rect x="43" y="64" width="14" height="14" rx="5" fill="${skd}"/>`;
 if(o.tattoo)s+=`<path d="M52 70 q3 -3 5 0 q-2 4 -5 0 M56 72 l4 3" stroke="#2f4a6b" stroke-width="1.2" fill="none"/>`;
 /* 耳 + 臉（含臉型）*/
 const er=3.4*g.er,jx=rx*jw,ch=ry*(.9+g.chn*.18);
 s+=`<ellipse cx="${50-rx}" cy="${cy+2}" rx="${er}" ry="${er*1.4}" fill="${sk}"/><ellipse cx="${50+rx}" cy="${cy+2}" rx="${er}" ry="${er*1.4}" fill="${sk}"/>`;
 if(o.ear)s+=`<circle cx="${50-rx}" cy="${cy+8}" r="1.5" fill="#e6c34a"/><circle cx="${50+rx}" cy="${cy+8}" r="1.5" fill="#e6c34a"/>`;
 s+=`<path d="M${50-rx} ${cy} C${50-rx} ${cy-ry*1.1} ${50+rx} ${cy-ry*1.1} ${50+rx} ${cy} Q${50+rx} ${cy+ry*.7} ${50+jx*.8} ${cy+ry*.9} Q50 ${cy+ch*1.1} ${50-jx*.8} ${cy+ry*.9} Q${50-rx} ${cy+ry*.7} ${50-rx} ${cy} Z" fill="${sk}"/>`;
 s=avHairFront(s,X);
 /* 眼 */
 const ey=cy-1,es=(age<7?1.2:1)*g.es,er2=3*es*(g.ey===1?1.15:1),ec=o.lens!=null?o.lens:g.ec,ecol=AVEC[ec],sp=8.5*g.esp,fem=pres==='女'||(pres==='auto'&&a.sx==='女');
 [-1,1].forEach(d=>{const x=50+d*sp;
  s+=`<ellipse cx="${x}" cy="${ey}" rx="${er2*1.25}" ry="${g.ey===0?er2*.8:er2}" fill="#fff"/><circle cx="${x}" cy="${ey}" r="${er2*.78}" fill="${ecol}"/><circle cx="${x+.7}" cy="${ey-.7}" r="${er2*.25}" fill="#fff"/>`;
  const ed=o.ed!=null?o.ed:g.ed;
  if(ed||g.ey===2)s+=`<path d="M${x-er2*1.3} ${ey-er2*.5} Q${x} ${ey-er2*1.5} ${x+er2*1.3} ${ey-er2*.5}" stroke="${skd}" stroke-width="1.1" fill="none"/>`;
  else s+=`<path d="M${x-er2*1.3} ${ey-er2*.2} Q${x} ${ey-er2*1} ${x+er2*1.3} ${ey-er2*.2}" stroke="${skd}" stroke-width=".7" fill="none" opacity=".5"/>`;
  if(fem)s+=`<path d="M${x-er2*1.3} ${ey-.5} q${-1.4} -2 ${-2.2} -1.4 M${x+er2*1.3} ${ey-.5} q1.4 -2 2.2 -1.4" stroke="#2a1f1c" stroke-width=".9" fill="none"/>`;
  if(o.shadow)s+=`<path d="M${x-er2*1.4} ${ey-er2*.4} Q${x} ${ey-er2*2.3} ${x+er2*1.4} ${ey-er2*.4} Z" fill="${o.shadow}" opacity=".45"/>`;
  const bt=(.8+g.br*1)*(male?1.15:.85),ar=g.ba2*3;
  s+=`<path d="M${x-5} ${ey-6.2} Q${x+d*0} ${ey-8.2-ar*.4} ${x+5} ${ey-6.2-ar*.2}" stroke="${avMix(hcol,'#000000',.2)}" stroke-width="${bt}" fill="none" stroke-linecap="round"/>`;
  if((a.stress>65||a.health<35)&&age>12)s+=`<ellipse cx="${x}" cy="${ey+5.2}" rx="4.2" ry="1.6" fill="#7a5a8a" opacity=".28"/>`});
 /* 鼻口 */
 const EXH={happy:92,sad:12,cry:6,angry:18,sick:22,shock:50},nz=g.nz,hp=a.ex&&EXH[a.ex]!=null?EXH[a.ex]:(a.happy==null?50:a.happy),smi=Math.max(-3,Math.min(5,(hp-50)/10)),lw=6*g.lp*g.lw,nbw=g.nb;
 s+=`<path d="M${50-nbw} ${cy-2} L50 ${cy+1}" stroke="${skd}" stroke-width=".7" fill="none" opacity=".5"/><path d="M50 ${cy+1} q${-2*nz} 7 0 ${8*nz} q${3*nz*g.nw} 1 ${4*nz*g.nw} -1" stroke="${skd}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`;
 const lipc=o.lip||'#a24b4b';
 s+=`<path d="M${50-lw} ${cy+14} Q50 ${cy+14+smi*1.6} ${50+lw} ${cy+14}" stroke="${lipc}" stroke-width="${1.4+g.lp*.6+(o.lip?.6:0)}" fill="none" stroke-linecap="round"/>`;
 if(a.ex==='shock')s+=`<ellipse cx="50" cy="${cy+15}" rx="2.6" ry="3.4" fill="#7a2f2f"/>`;
 if(a.ex==='happy')s+=`<path d="M${50-lw*.7} ${cy+14} Q50 ${cy+20} ${50+lw*.7} ${cy+14} Z" fill="#fff" stroke="${lipc}" stroke-width=".8"/>`;
 if(a.ex==='angry')s+=`<path d="M${50-sp-5} ${ey-8.4} L${50-sp+5} ${ey-5.4} M${50+sp+5} ${ey-8.4} L${50+sp-5} ${ey-5.4}" stroke="#2a1f1c" stroke-width="1.6" stroke-linecap="round"/><path d="M${50+rx-7} ${cy-12} l3 2 m-3 -2 l3 -2 m-3 2 l-3 2" stroke="#d65f5f" stroke-width=".9" fill="none"/>`;
 if(a.ex==='cry'||a.ex==='sad')s+=`<path d="M${50-sp-5} ${ey-5.4} L${50-sp+5} ${ey-8.4} M${50+sp+5} ${ey-5.4} L${50+sp-5} ${ey-8.4}" stroke="#2a1f1c" stroke-width="1.2" stroke-linecap="round"/>`;
 if(a.ex==='cry')s+=`<path d="M${50-sp} ${ey+3} q-1.4 5 0 8 q1.4 -3 0 -8 M${50+sp} ${ey+3} q-1.4 5 0 8 q1.4 -3 0 -8" fill="#7ab8e6" opacity=".85"/>`;
 if(a.ex==='sick')s+=`<path d="M${50+rx-3} ${cy-14} q-2 4 0 5 q2 -1 0 -5" fill="#8fc7e8"/><ellipse cx="${50-rx+6}" cy="${cy+9}" rx="3.4" ry="2" fill="#9fc79a" opacity=".35"/><ellipse cx="${50+rx-6}" cy="${cy+9}" rx="3.4" ry="2" fill="#9fc79a" opacity=".35"/>`;
 if(hp>70||o.blush)s+=`<circle cx="${50-rx+6}" cy="${cy+9}" r="3.4" fill="${o.blush||'#e88'}" opacity="${o.blush?.4:.28}"/><circle cx="${50+rx-6}" cy="${cy+9}" r="3.4" fill="${o.blush||'#e88'}" opacity="${o.blush?.4:.28}"/>`;
 if(g.dm&&hp>45)s+=`<path d="M${50-lw-2} ${cy+13} q-1 2 0 3 M${50+lw+2} ${cy+13} q1 2 0 3" stroke="${skd}" stroke-width=".9" fill="none"/>`;
 if(g.fr)s+=[[-9,8],[-6,10],[-12,10],[9,8],[6,10],[12,10]].map(p=>`<circle cx="${50+p[0]}" cy="${cy+p[1]}" r=".7" fill="#a56a45"/>`).join('');
 const mo=o.mo!=null?o.mo:g.mo;if(mo>0)s+=[[11,12],[-14,6],[3,-12]].slice(0,mo).map(p=>`<circle cx="${50+p[0]}" cy="${cy+p[1]}" r=".9" fill="#4a2f22"/>`).join('');
 if(g.bmk&&!o.bmkOff)s+=`<ellipse cx="${50-rx+5}" cy="${cy-7}" rx="3" ry="2" fill="#a46a52" opacity=".5"/>`;
 if(age>=12&&age<=24&&g.ac>.55&&!o.acneOff)s+=[[-10,4],[8,2],[-6,12],[11,10],[2,-8]].map(p=>`<circle cx="${50+p[0]}" cy="${cy+p[1]}" r="1" fill="#d65f5f" opacity=".7"/>`).join('');
 /* 鬍型（男性）*/
 const bd=o.beard!=null?o.beard:0;
 if(male&&age>=15&&bd>0){const bc=avMix(hcol,'#000000',.1);
  if(bd===1)s+=`<path d="M${50-jx*.8} ${cy+8} Q50 ${cy+ch*1.12} ${50+jx*.8} ${cy+8} Q50 ${cy+ry*.8} ${50-jx*.8} ${cy+8}Z" fill="${bc}" opacity=".28"/>`;
  if(bd===2||bd===4)s+=`<path d="M${50-lw-3} ${cy+11} Q50 ${cy+9} ${50+lw+3} ${cy+11} Q50 ${cy+13} ${50-lw-3} ${cy+11}Z" fill="${bc}"/>`;
  if(bd===3)s+=`<path d="M${50-4} ${cy+17} Q50 ${cy+ch*1.05} ${50+4} ${cy+17} Q50 ${cy+19} ${50-4} ${cy+17}Z" fill="${bc}"/>`;
  if(bd===4)s+=`<path d="M${50-jx*.82} ${cy+4} Q${50-jx} ${cy+ry*.9} 50 ${cy+ch*1.12} Q${50+jx} ${cy+ry*.9} ${50+jx*.82} ${cy+4} Q50 ${cy+ry*.85} ${50-jx*.82} ${cy+4}Z" fill="${bc}"/>`}
 /* 皺紋 */
 const wr=Math.max(0,age-(o.plast?50+o.plast*6:38)-(o.skin||0)*4+(a.addict?8:0));
 if(wr>0){const op=Math.min(.7,wr/40);s+=`<g stroke="${skd}" stroke-width=".8" fill="none" opacity="${op}"><path d="M${50-9} ${cy-15} q9 -2 18 0"/>${wr>10?`<path d="M${50-8} ${cy-12} q8 -2 16 0"/>`:''}${wr>18?`<path d="M${50-rx+4} ${ey+1} l-3 1 M${50+rx-4} ${ey+1} l3 1"/><path d="M${50-9} ${cy+9} q-2 5 0 9 M${50+9} ${cy+9} q2 5 0 9"/>`:''}</g>`}
 if(o.scar)s+=`<path d="M${50-rx+8} ${cy-6} l7 12" stroke="#b9645f" stroke-width="1.1"/>`;
 /* 眼鏡、配件 */
 const gl=o.glasses!=null?o.glasses:(g.my&&age>=10),gt=o.gstyle||0;
 if(gl){const c=gt===3?'#111':'#2b2b2b',fill=gt===3?'#222':'none',op=gt===3?.85:1;
  if(gt===1)s+=`<rect x="${50-sp-6}" y="${ey-4.8}" width="12" height="9.6" rx="2" fill="${fill}" stroke="${c}" stroke-width="1.1"/><rect x="${50+sp-6}" y="${ey-4.8}" width="12" height="9.6" rx="2" fill="${fill}" stroke="${c}" stroke-width="1.1"/>`;
  else s+=`<circle cx="${50-sp}" cy="${ey}" r="6.2" fill="${fill}" fill-opacity="${op}" stroke="${c}" stroke-width="${gt===2?.6:1.1}"/><circle cx="${50+sp}" cy="${ey}" r="6.2" fill="${fill}" fill-opacity="${op}" stroke="${c}" stroke-width="${gt===2?.6:1.1}"/>`;
  s+=`<path d="M${50-sp+6.2} ${ey} h${2*sp-12.4} M${50-sp-6.2} ${ey} L${50-rx} ${ey-1} M${50+sp+6.2} ${ey} L${50+rx} ${ey-1}" stroke="${c}" stroke-width="1"/>`}
 if(o.hat===1)s+=`<path d="M${50-rx-1} ${cy-ry*.55} Q50 ${cy-ry*1.35} ${50+rx+1} ${cy-ry*.55} Z" fill="#3f6b8c"/><path d="M${50-rx-1} ${cy-ry*.55} h${2*rx+14}" stroke="#2c4d66" stroke-width="2.5" stroke-linecap="round"/>`;
 if(o.hat===2)s+=`<path d="M${50-rx-1} ${cy-ry*.5} Q50 ${cy-ry*1.5} ${50+rx+1} ${cy-ry*.5} Z" fill="#b3523d"/><circle cx="50" cy="${cy-ry*1.1}" r="3" fill="#e0a68f"/>`;
 if(o.hat===3)s+=`<ellipse cx="50" cy="${cy-ry*.55}" rx="${rx+10}" ry="3.5" fill="#d9b66a"/><path d="M${50-rx+2} ${cy-ry*.55} Q50 ${cy-ry*1.3} ${50+rx-2} ${cy-ry*.55}Z" fill="#e6c987"/>`;
 if(a.sp==='wedding'){s+=`<path d="M${50-rx-3} ${cy-ry*.2} Q50 ${cy-ry*1.6} ${50+rx+3} ${cy-ry*.2} L${50+rx+6} ${cy+ry*1.2} L${50-rx-6} ${cy+ry*1.2} Z" fill="#fff" opacity=".35"/><circle cx="${50-rx+2}" cy="${cy-ry*.75}" r="2.2" fill="#e88"/><circle cx="${50-rx+6}" cy="${cy-ry*.9}" r="1.8" fill="#f3c4c4"/>`;if(male)s+=`<path d="M44 76 l6 5 l6 -5 l-3 6 l-3 -1 l-3 1 z" fill="#222"/>`}
 if(a.sp==='grad'){s+=`<path d="M${50-rx-4} ${cy-ry*.75} L50 ${cy-ry*1.1} L${50+rx+4} ${cy-ry*.75} L50 ${cy-ry*.4} Z" fill="#222"/><path d="M${50+rx+1} ${cy-ry*.7} v10" stroke="#e0b43a" stroke-width="1.2"/><circle cx="${50+rx+1}" cy="${cy-ry*.7+10.5}" r="1.3" fill="#e0b43a"/>`}
 if(a.sp==='hospital'){s+=`<path d="M${50-sw} 100 Q${50-sw} 80 42 75 L58 75 Q${50+sw} 80 ${50+sw} 100 Z" fill="#cfe6ef" opacity=".9"/><rect x="${50+rx-9}" y="${cy-ry*.9}" width="9" height="5" rx="1" fill="#f3e3d0" stroke="#c9a98a" stroke-width=".5"/>`}
 return s+'</g></svg>';
}
function avCtx(){const r={};try{const L=S.log&&S.log[S.log.length-1];if(!L||L.age!==S.age)return r;const ls=L.lines||[],txt=ls.map(x=>x.t).join(' ');let good=0,bad=0;ls.forEach(x=>{if(x.c==='good')good++;else if(x.c==='bad')bad++});if(/婚禮|結婚|登記|求婚成功/.test(txt))r.sp='wedding';else if(/畢業/.test(txt))r.sp='grad';else if(/住院|手術|急診|確診|開刀/.test(txt))r.sp='hospital';if(/過世|離世|去世|死亡|喪禮|驟逝/.test(txt))r.ex='cry';else if(/離婚|分手|被裁|解僱|破產|車禍|詐騙/.test(txt))r.ex='sad';else if(/吵架|憤怒|生氣|爭執/.test(txt))r.ex='angry';else if(r.sp==='hospital'||S.health<25)r.ex='sick';else if(bad>good&&bad>=2)r.ex='sad';else if(good>bad&&good>=2)r.ex='happy'}catch(e){}if(!r.ex&&S.health<25)r.ex='sick';return r}
function avSelf(){avEnsure();const cx=avCtx();return {ex:(avS().expr===0?null:cx.ex),sp:(avS().expr===0?null:cx.sp),g:S.av.g,o:S.av.o,age:S.age,sx:S.sx,happy:S.happy,health:S.health,stress:S.stress,dead:S.dead,addict:S.addict,job:S.job&&!S.school}}
function kidGenome(k){if(!k.gn){const base=S.av?S.av.g:genFor(S.cn||'TW');k.gn=k.adopt?genFor(k.cn||S.cn||'TW'):avChild(base,avPartner()||genFor(S.cn||'TW'))}return avFill(k.gn,'EW')}
function likeWho(k){const g=kidGenome(k),a=S.av?avFill(S.av.g,'EW'):null,b=S.partner?avPartner():null,d=(x,y)=>x&&y?Math.abs(x.sk-y.sk)+Math.abs(x.fw-y.fw)*2+Math.abs(x.nz-y.nz)+Math.abs(x.lp-y.lp)+(x.hc===y.hc?0:.4)+(x.ec===y.ec?0:.3)+(x.hs===y.hs?0:.2)+(x.fs===y.fs?0:.2)+(x.ed===y.ed?0:.2):9;
 if(k.adopt)return '領養，與你沒有血緣';if(!b)return '';const da=d(g,a),db=d(g,b);return da+.15<db?'比較像你':db+.15<da?'比較像'+(S.partner.sx==='女'?'媽媽':'爸爸')+'（配偶）':'兩邊各像一些'}
const _nk51=newKid;newKid=function(sx,n){const k=_nk51(sx,n);try{avEnsure();const pl=S.partner?(avPartner(),S.partner.lk):R(30,80);k.gn=avChild(S.av.g,avPartner()||genFor(S.cn||'TW'));k.lk=cl(Math.round((S.looks+pl)/2+R(-18,18)))}catch(e){}return k};
const _as51=applySuccession;applySuccession=function(r,k){let snap=null;try{avEnsure();snap=Object.assign({},avSelf(),{dead:true,name:S.name,sx:S.sx});kidGenome(k)}catch(e){}_as51(r,k);try{S.av={g:k.gn||genFor(S.cn||'TW'),o:{}};if(S.hist&&S.hist.length&&snap)S.hist[S.hist.length-1].av=snap}catch(e){}};
const _r51=render;render=function(){_r51();try{if(!S)return;const e=$('hAv');if(e&&e.innerHTML!==undefined){const st=avS();e.innerHTML=st.hdr?avSVG(avSelf(),[40,48,56][st.sz]||48):'';if(!st.hdr&&e.textContent!==undefined)e.textContent=avatar()}}catch(x){}};
/* ---- 年度：BMI 與健康、皮膚 ---- */
const _y51=yearly;yearly=function(){_y51();try{avEnsure();const a=avSelf(),b=avBMI(a);if(S.age>=18){if(b>=30&&Math.random()<.4)chg('health',-1);else if(b<17&&Math.random()<.3)chg('health',-1)}if(S.av.o.tan)S.av.o.tan=Math.max(0,S.av.o.tan-.04);if(S.av.o.diet)S.av.o.diet=S.av.o.diet*.9;if(S.addict&&S.av.o.skin)S.av.o.skin=Math.max(0,S.av.o.skin-.3)}catch(e){}};
/* ---- 外貌與造型頁 ---- */
const AVDYE=[['黑色','#1d1613'],['深棕','#4b3427'],['棕色','#7b5738'],['栗金','#b08a55'],['金色','#d8b96b'],['紅色','#a8452b'],['藍色','#3d63b8'],['粉色','#e58fb0'],['銀灰','#c9ccd1'],['紫色','#7a4fa8'],['綠色','#3f9a6a'],['恢復自然',null]];
const AVLIP=[['自然',0],['豆沙','#b86a6a'],['正紅','#c4343b'],['粉嫩','#e58a9a'],['深莓','#7a2a4a']],AVSHD=[['無',0],['大地','#9c7a5a'],['粉橘','#e09a8a'],['紫','#8a6fb0']],AVBLUSH=[['無',0],['蜜桃','#ee9a8a'],['玫瑰','#d96c8a']];
const AVLENS=[['自然',null],['深褐',0],['褐',1],['榛',2],['綠',3],['藍',4],['灰',5]],AVBEARD=['乾淨','鬍渣','小鬍子','山羊鬍','絡腮鬍'],AVGST=['圓框','方框','無框','墨鏡'],AVHAT=['無','鴨舌帽','毛帽','遮陽帽'];
function avLimit(){return (S.acts&&S.acts.avn)||0}
function avHTML(){
 const a=avSelf(),o=a.o,st=avS(),lim=avLimit(),max=2,ok=S.age>=3&&!S.jail,dis=!ok||lim>=max,hgt=avHeight(a),bmi=avBMI(a),ch=avCharm(a),male=a.sx!=='女';
 let h=`<h3>外貌與造型</h3><div style="display:flex;justify-content:center">${avSVG(a,130)}</div>`;
 h+=`<div class="sub" style="text-align:center">身高 ${hgt} cm・BMI ${bmi}（${avBMIc(bmi)}）・外貌值 ${S.looks}</div>`;
 h+=`<div class="card"><b>魅力指數 ${ch.all}</b><div class="sub">五官均衡 ${ch.bal}・皮膚 ${ch.skin}・體態 ${ch.body}・髮況 ${ch.hair}・氣質 ${ch.aura}</div></div>`;
 h+=`<div class="sub">每年可以做 ${max} 次造型調整（今年已用 ${lim} 次）。</div>`;
 const seg=(t,arr,cur,key,off)=>`<div class="sec">${t}</div><div class="seg" style="flex-wrap:wrap">${arr.map((x,i)=>`<button class="${cur===i?'on':''}" data-a="lf:av:${key}:${i}" ${off?'disabled':''}>${Array.isArray(x)?x[0]:x}</button>`).join('')}</div>`;
 h+=seg('髮色',AVDYE,-1,'dye',dis)+seg('髮型',AVHSN,o.hs!=null?o.hs:a.g.hs,'hs',dis);
 if(male&&S.age>=15)h+=seg('鬍型',AVBEARD,o.beard||0,'beard',dis);
 h+=seg('口紅',AVLIP,-1,'lip',dis)+seg('眼影',AVSHD,-1,'shd',dis)+seg('腮紅',AVBLUSH,-1,'blu',dis);
 h+=seg('隱形眼鏡色片',AVLENS,-1,'lens',dis||S.age<16);
 h+=seg('眼鏡款式',AVGST,o.gstyle||0,'gst',!ok)+seg('帽子',AVHAT,o.hat||0,'hat',!ok)+`<div class="sec">配件</div><div class="seg"><button data-a="lf:av:ear" ${!ok?'disabled':''}>${o.ear?'拿下耳環':'戴耳環'}</button><button data-a="lf:av:glasses" ${!ok||S.age<8?'disabled':''}>${(o.glasses!=null?o.glasses:(a.g.my&&S.age>=10))?'改戴隱形眼鏡':'戴上眼鏡'}</button></div>`;
 const b=(act,t,sub,d2)=>`<button class="btn" data-a="lf:av:${act}" ${d2?'disabled':''}>${t}<small>${sub}</small></button>`;
 h+=`<div class="sec">身體與保養</div>`+b('gym','持續健身','BMI 降低、體態結實、健康變好',dis||S.age<12)+b('diet','控制飲食','BMI 緩慢下降',dis||S.age<14)+b('feast','大吃大喝','BMI 上升，心情變好',dis||S.age<14)+b('skin','皮膚保養','延緩皺紋，外貌小幅上升',dis||S.age<15)+b('acne','痘痘治療','青春期的痘痘會消退',dis||!(S.age>=12&&S.age<=30&&a.g.ac>.55))+b('tan','做日曬',`膚色變深，數年後逐漸退回`,dis||S.age<14)+b('braces','牙齒矯正','花費不低，外貌上升',dis||S.age<10||o.braces)+b('mole','點痣','去除臉上的痣',dis||(o.mo!=null?o.mo:a.g.mo)<=0);
 h+=`<div class="sec">進階項目</div>`+b('tattoo',o.tattoo?'洗掉刺青':'刺一個圖案','有成本與風險',dis||S.age<18)+b('lasik','近視雷射手術','一次花費，之後不必再戴眼鏡',!ok||S.age<20||!a.g.my||o.glasses===0)+b('ed','割雙眼皮','眼型改變，外貌上升',dis||S.age<18||(o.ed!=null?o.ed:a.g.ed)===1)+b('nose','隆鼻','鼻樑變挺，有風險',dis||S.age<18)+b('jaw','削臉型','臉型更俐落，有風險',dis||S.age<18)+b('plast','拉皮與除皺','皮膚更緊緻，延緩老化',dis||S.age<30)+b('hair','植髮','改善掉髮，花費高',dis||!(a.g.ba&&male&&S.age>35)||o.hair);
 h+=`<div class="sec">查看</div><button class="btn" data-a="lf:av:genes">${st.show?'隱藏':'顯示'}基因數值</button><button class="btn" data-a="lf:avs">頭像設定</button>`;
 if(st.show)h+=avGenesHTML(a);
 return h+'<button class="btn" data-a="back">← 返回</button>';
}
function avGenesHTML(a){const g=a.g,P=x=>Math.round(x*100)+'%';return `<div class="card"><b>基因數值</b><div class="sub">膚色 ${P(g.sk)}・髮色 ${AVHCN[g.hc]}・自然髮型 ${AVHSN[g.hs]}・髮量 ${P(g.hd)}・捲度 ${P(g.hw)}<br>臉型 ${AVFSN[g.fs]}・臉寬 ${g.fw.toFixed(2)}・下頜 ${g.jw.toFixed(2)}・下巴 ${P(g.chn)}<br>眼色 ${AVECN[g.ec]}・眼型 ${['杏仁','圓','內雙'][g.ey]}・雙眼皮 ${g.ed?'有':'無'}・眼距 ${g.esp.toFixed(2)}<br>鼻 ${g.nz.toFixed(2)}・鼻樑 ${P(g.nb)}・唇 ${g.lp.toFixed(2)}・耳 ${g.er.toFixed(2)}<br>身高基因 ${P(g.ht)}・體質 ${P(g.bm)}・痘痘 ${P(g.ac)}・鬍鬚 ${P(g.bd)}<br>近視 ${g.my?'帶有':'無'}・雀斑 ${g.fr?'有':'無'}・酒窩 ${g.dm?'有':'無'}・早白 ${g.gm?'帶有':'無'}・禿頭 ${g.ba?'帶有':'無'}</div></div>`}
function avDo(y,z){
 avEnsure();const o=S.av.o,fx=s=>arcFx(s),n=+z;S.acts=S.acts||{};const use=()=>{S.acts.avn=(S.acts.avn||0)+1};
 if(y==='genes'){const st=avS();st.show=st.show?0:1;lsSet(AVSET,st);return null}
 if(y==='dye'){const d=AVDYE[n];use();fx('mw-0.3');o.dye=d[1];chg('looks',d[1]?1:0);return G(`你換了新髮色（${d[0]}）。`)}
 if(y==='hs'){use();o.hs=n;o.hair=o.hair;fx('mw-0.2');chg('looks',1);return G(`你換了新髮型：${AVHSN[n]}。`)}
 if(y==='beard'){use();o.beard=n;return N(`你的鬍型換成了「${AVBEARD[n]}」。`)}
 if(y==='lip'){use();o.lip=AVLIP[n][1]||null;fx('mw-0.1');return N('你換了口紅色。')}
 if(y==='shd'){use();o.shadow=AVSHD[n][1]||null;fx('mw-0.1');return N('你化了新的眼妝。')}
 if(y==='blu'){use();o.blush=AVBLUSH[n][1]||null;fx('mw-0.1');return N('你調整了腮紅。')}
 if(y==='lens'){use();o.lens=AVLENS[n][1];fx('mw-0.4');return N('你換了色片。')}
 if(y==='gst'){o.gstyle=n;return N(`你換了${AVGST[n]}眼鏡。`)}
 if(y==='hat'){o.hat=n;return N(n?`你戴上了${AVHAT[n]}。`:'你拿下了帽子。')}
 if(y==='ear'){o.ear=o.ear?0:1;return N(o.ear?'你戴上了耳環。':'你拿下了耳環。')}
 if(y==='glasses'){const cur=o.glasses!=null?o.glasses:(S.av.g.my&&S.age>=10);o.glasses=!cur;return N(o.glasses?'你戴上了眼鏡。':'你換成了隱形眼鏡。')}
 if(y==='gym'){use();fx('mw-1.5');o.build=Math.max(-1,(o.build||0)-.35);chg('health',2);chg('looks',1);S.stress=cl(S.stress-2);return G('你固定上健身房，體態變得更結實。')}
 if(y==='diet'){use();fx('mw-0.3');o.diet=(o.diet||0)-.8;o.build=Math.max(-1,(o.build||0)-.12);chg('health',1);return G('你開始控制飲食，體重慢慢下降。')}
 if(y==='feast'){use();fx('mw-0.5');o.diet=(o.diet||0)+1;o.build=Math.min(1,(o.build||0)+.1);chg('happy',2);return N('你放縱地吃了一陣子，心情不錯，體重也悄悄上升。')}
 if(y==='skin'){use();fx('mw-1');o.skin=Math.min(4,(o.skin||0)+1);chg('looks',1);return G('你開始重視皮膚保養，氣色變好。')}
 if(y==='acne'){use();fx('mw-1');o.acneOff=1;chg('looks',1);return G('痘痘治療有效，皮膚慢慢變乾淨。')}
 if(y==='tan'){use();o.tan=Math.min(.3,(o.tan||0)+.12);chg('happy',1);return N('你去曬了太陽，膚色變深了一點。')}
 if(y==='braces'){use();fx('mw-8');o.braces=1;chg('looks',2);return G('你完成了牙齒矯正，笑起來更有自信。')}
 if(y==='mole'){use();fx('mw-0.5');o.mo=Math.max(0,(o.mo!=null?o.mo:S.av.g.mo)-1);return N('你點掉了一顆痣。')}
 if(y==='tattoo'){use();if(o.tattoo){o.tattoo=0;fx('mw-3');return N('你花錢洗掉了刺青，過程不太舒服。')}fx('mw-0.8');o.tattoo=1;S.flags.tattoo=1;chg('looks',Math.random()<.6?2:-1);return N('你在頸側刺了一個小圖案，有人覺得酷，也有人不太喜歡。')}
 if(y==='lasik'){if(S.money<arcFxCost(10))return B('錢不夠。');fx('mw-10');o.glasses=0;S.av.g.my=0;chg('looks',1);return G('雷射手術順利，你終於不用再戴眼鏡了。')}
 if(y==='ed'){use();fx('mw-4');if(Math.random()<.06){chg('looks',-2);return B('手術後兩眼不太對稱，需要時間恢復。')}o.ed=1;chg('looks',R(2,4));return G('你割了雙眼皮，眼神更有精神。')}
 if(y==='nose'){use();fx('mw-8');if(Math.random()<.1){chg('looks',-3);chg('health',-1);return B('手術結果不如預期，鼻形有點不自然。')}S.av.g.nb=Math.min(1,S.av.g.nb+.35);chg('looks',R(3,6));return G('你的鼻樑變挺，側臉更有立體感。')}
 if(y==='jaw'){use();fx('mw-12');if(Math.random()<.12){chg('looks',-4);chg('health',-2);return B('恢復期很辛苦，結果也不完全理想。')}o.jwAdd=-.15;o.fwAdd=-.05;chg('looks',R(3,7));return G('臉型變得更俐落。')}
 if(y==='plast'){use();fx('mw-12');o.plast=(o.plast||0)+1;if(Math.random()<.1){chg('looks',-4);chg('health',-2);return B('手術後恢復得不理想，外觀不如預期，需要時間調整。')}chg('looks',R(4,8));return G('手術順利，你看起來更年輕有精神。')}
 if(y==='hair'){use();fx('mw-10');o.hair=1;chg('looks',R(2,5));return G('植髮手術完成，髮線回來了。')}
 return N('')
}
function arcFxCost(p){return Math.round(CNS[S.cn||'TW'].w*p/100)}
/* ---- 頭像設定頁 ---- */
function avsHTML(){
 const st=avS(),sg=(t,key,arr,cur)=>`<div class="sec">${t}</div><div class="seg" style="flex-wrap:wrap">${arr.map(([v,l])=>`<button class="${String(cur)===String(v)?'on':''}" data-a="lf:avs:${key}:${v}">${l}</button>`).join('')}</div>`;
 return `<h3>頭像設定</h3><div style="display:flex;justify-content:center">${avSVG(avSelf(),96)}</div>`
  +sg('外觀呈現（影響眉形、眼睫、肩寬）','pres',[['auto','依性別'],['男','男性'],['女','女性'],['中性','中性']],st.pres)
  +sg('穿著風格','outfit',[['auto','自動'],['casual','休閒'],['formal','正式'],['sport','運動']],st.outfit)
  +sg('背景色','bg',[[0,'米'],[1,'藍'],[2,'綠'],[3,'粉'],[4,'紫'],[5,'黃']],st.bg)
  +sg('標頭頭像','hdr',[[1,'顯示'],[0,'隱藏']],st.hdr)+sg('表情與場合造型','expr',[[1,'開啟'],[0,'關閉']],st.expr)+sg('標頭頭像大小','sz',[[0,'小'],[1,'中'],[2,'大']],st.sz)
  +sg('遺傳：突變程度','mut',[[0,'低'],[1,'標準'],[2,'高']],st.mut)+sg('遺傳：隱性特徵（隔代遺傳）','rec',[[1,'標準'],[2,'容易出現']],st.rec)
  +sg('造型頁顯示基因數值','show',[[0,'隱藏'],[1,'顯示']],st.show)
  +'<div class="sub">遺傳設定只影響之後出生的孩子。</div><button class="btn" data-a="lf:av">← 返回外貌與造型</button>';
}
/* ---- 家族面孔 ---- */
function famFaces(){
 avEnsure();let h='<div class="sec">家族面孔</div><div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:6px">';
 const cap=(t,s)=>`<div style="text-align:center;font-size:11px;min-width:70px">${t}<br><span style="color:var(--mute)">${s}</span></div>`;
 (S.hist||[]).forEach(x=>{if(x.av)h+=`<div>${avSVG(x.av,64)}${cap(esc(x.name),'第'+x.gen+'代')}</div>`});
 h+=`<div>${avSVG(avSelf(),64)}${cap(esc(S.name),'你')}</div>`;
 if(S.partner){avPartner();h+=`<div>${avSVG({g:S.partner.gn,o:{},age:S.age+(S.partner.off||0),sx:S.partner.sx,happy:60,health:70,stress:30},64)}${cap(esc(S.partner.n),'配偶／伴侶')}</div>`}
 S.kids.forEach(k=>{h+=`<div>${avSVG({g:kidGenome(k),o:{},age:k.age,sx:k.sx,happy:60,health:k.hl,stress:20},64)}${cap(esc(k.n),likeWho(k)||k.age+' 歲')}</div>`});
 return h+'</div><div class="sub">子女的長相由父母基因混合而成，髮色、眼色、雙眼皮有顯性與隱性，也可能出現隔代遺傳與少見的變化。</div>';
}
const _tr51=treeHTML;treeHTML=function(){return _tr51().replace('<button class="btn" data-a="back">← 返回</button>',famFaces()+'<button class="btn" data-a="back">← 返回</button>')};
const _lf51=lfHandle,_l51=lifeHTML,_m51=moreHTML;
lfHandle=function(x,y,z,u){
 if(x==='av'){if(!y)return null;return avDo(y,z)}
 if(x==='avs'){if(!y)return null;const st=avS();st[y]=(y==='pres'||y==='outfit')?z:+z;lsSet(AVSET,st);return null}
 return _lf51(x,y,z,u)};
lifeHTML=function(){return view.lsub==='av'?avHTML():view.lsub==='avs'?avsHTML():_l51()};
moreHTML=function(){return _m51()};
const _sh51=sumHTML;sumHTML=function(){try{return _sh51().replace('<h3>人生總結卡</h3>','<h3>人生總結卡</h3><div style="display:flex;justify-content:center">'+avSVG(avSelf(),84)+'</div>')}catch(e){return _sh51()}};
