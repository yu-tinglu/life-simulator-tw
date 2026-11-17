const vm=require('vm'),fs=require('fs');
const stub=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:stub,set:()=>true,apply:()=>stub});
const ctx={document:{getElementById:()=>new Proxy({value:''},{get:(t,k)=>k in t?t[k]:stub,set:()=>true}),querySelectorAll:()=>stub},localStorage:{setItem(){},getItem(){return null},removeItem(){}},console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,isFinite,Intl,setTimeout:()=>0};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('game.js','utf8')+`;globalThis.T=function(N){
 ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};startSuccession=()=>{};showReport=(r,cb)=>{cb&&cb()};
 let errs={},st={n:0,pst:0,hs:0,partner:0,married:0,crush:0,fr:0,out:0,same:0,kids:0,adopt:0,net:0,stress:0};
 for(let r=0;r<N;r++){try{
  newGame('',Math.random()<.5?'男':'女');S.ori=oriPick('隨機');S.diff=R(0,2);busy=false;queue=[];
  for(let y=0;y<70&&!S.dead;y++){
   S.health=Math.max(S.health,60);ageUp();
   if(S.dead)break;
   S.money=Math.max(S.money,5e6);
   if(S.age>=13){
    const acts=[];
    for(let i=0;i<6;i++){
     const c=pick(['rom:meet','rom:go:h','rom:go:p']);handle(c);
     if(S.crush.length){const i=R(0,S.crush.length-1);handle('rom:c:'+i);
      const k=pick(['talk','gift','date','look','chance']);handle('rom:act:'+i+':'+k);
      if(view.scene)handle('rom:pick:'+R(0,view.scene.opts.length-1));
      if(S.crush[i]&&S.crush[i].aff>=50)handle('rom:cf:'+i);}
     if(S.partner){const k=pick(['talk','gift','date','trip','cohab','propose','baby','art','adopt']);handle('rom:act:p:'+k);if(view.scene)handle('rom:pick:'+R(0,view.scene.opts.length-1));
      if(chance(.03))handle('rom:act:p:break');}
     if(S.friends.length){const f=R(0,S.friends.length-1),k=pick(['help','ask','party','reconcile','talk','gift']);handle('rel:f'+f);handle('do:f'+f+':'+k);if(chance(.05)&&S.friends[f])handle('do:f'+f+':cut');}
     handle('open:rel');handle('rel:partner');relHTML();
     if(S.partner){subHTML('partner')}
     if(S.crush.length)romHTML('Rc0');
     if(S.friends.length)subHTML('f0');
     romHTML('R');handle('lf:mind');handle('lf:mind:'+pick(['med','couns','trip','rehab']));handle('lf:ach');handle('lf:tree');handle('lf:pol');handle('lf:rev');handle('lf:set');handle('lf:set:th:'+pick(['auto','light','dark']));handle('lf:help');handle('open:more');moreHTML();achHTML();handle('back');
    }
   }
  }
  st.n++;st.pst+=S.partner?(S.partner.st||0):0;st.hs+=(S.hs||[]).length;st.crush+=S.crush.length;st.fr+=S.friends.length;st.partner+=S.partner?1:0;st.married+=S.partner&&S.partner.married?1:0;st.out+=S.flags.out?1:0;st.same+=S.partner&&S.partner.sx===S.sx?1:0;st.kids+=S.kids.length;st.adopt+=S.kids.filter(k=>k.adopt).length;st.net+=S.net;st.stress+=S.stress;
  if(S.stress!==S.stress||S.net!==S.net||S.happy!==S.happy)throw new Error('NaN');
 }catch(x){errs[x.message+' '+(x.stack||'').split('\\n').slice(1,3).join('|')]=1}}
 for(const k in st)if(k!=='n')st[k]=+(st[k]/Math.max(1,st.n)).toFixed(2);
 return {errs:Object.keys(errs),st};
}`,ctx);
console.log(JSON.stringify(ctx.T(40),null,1));
vm.runInContext(`globalThis.T2=function(N){
 ask=(t,l,cb)=>cb(Math.random()*l.length|0);showEnd=()=>{};startSuccession=()=>{};showReport=(r,cb)=>{cb&&cb()};
 let errs={},n=0,pt=0,ma=0;
 for(let r=0;r<N;r++){try{
  newGame('','男');S.age=30;S.edu=4;S.money=3e7;busy=false;queue=[];S.health=100;
  handle('found:list');handle('found:pick:'+(Math.random()*40|0));handle('found:go');
  if(!S.co)continue;n++;
  for(let y=0;y<20&&!S.dead&&S.co;y++){S.health=100;J(S.co.L,['cash',5e7],['capital',-5e7]);
   coHTML('co:team');handle('co:menu:team');handle('co:tm:add:'+pick(['技術長','業務長','財務長']));handle('co:tm:talent');handle('co:tm:ma:0');handle('co:tm:buy:0');
   ageUp();if(S.co&&S.co.pt&&S.co.pt.length)pt++;
   const L=S.co&&S.co.L;if(L){const sum=Object.values(L).reduce((a,b)=>a+(+b||0),0);if(Math.abs(sum)>1)throw new Error('ledger unbalanced '+sum)}}
 }catch(x){errs[x.message+' '+(x.stack||'').split('\\n').slice(1,3).join('|')]=1}}
 return {errs:Object.keys(errs),n,pt};
}`,ctx);
console.log(JSON.stringify(ctx.T2(30)));
