#!/bin/bash
# 一鍵檢查：重名、建置、語法、迴歸測試。用法：bash check.sh [quick]
cd "$(dirname "$0")"
node dup.js || { echo "重名檢查失敗"; exit 1; }
bash build.sh | tail -1
T="t28 t29 t35 t43 t48 t49 sim5 sim7 sim10"; [ "$1" != quick ] && T="$T t54 t56 t58 sim8 sim13 sim15 sim18 au"
fail=0
for t in $T; do [ -f $t.js ] || continue; out=$(timeout 400 node $t.js 2>&1); if echo "$out" | grep -qE '"errs":(\[[^]]|\{[^}])|TypeError|ReferenceError|SyntaxError'; then echo "FAIL $t"; echo "$out" | tail -c 300; fail=1; else echo "ok $t"; fi; done
exit $fail
