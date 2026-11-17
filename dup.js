// 檢查：各檔頂層 const/let/class 是否重名（會造成載入錯誤）；function 重複宣告（以包裝重新指派者除外）
const fs=require('fs');const order=fs.readFileSync('build.sh','utf8').match(/p[0-9a-z]+\.(js|html)/g).filter(f=>f.endsWith('.js'));
const seen={},dup=[],fn={};
for(const f of [...new Set(order)]){if(!fs.existsSync(f))continue;const s=fs.readFileSync(f,'utf8');
 for(const m of s.matchAll(/^(?:const|let)\s+([A-Za-z_$][\w$]*)/gm)){const n=m[1];if(seen[n])dup.push(`${n}: ${seen[n]} / ${f}`);else seen[n]=f}
 for(const m of s.matchAll(/^function\s+([A-Za-z_$][\w$]*)/gm)){(fn[m[1]]=fn[m[1]]||[]).push(f)}}
const fdup=Object.entries(fn).filter(([k,v])=>v.length>1).map(([k,v])=>k+': '+v.join(','));
console.log(JSON.stringify({files:order.length,constDup:dup,fnRedeclared:fdup}));process.exit(dup.length?1:0);
