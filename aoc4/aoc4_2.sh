
data="./data.txt"; result=0; count=0; avalance=();

while read -r line; do; ((count+=1)); ((avalance[$count]+=1))
win_nr=(); card_nr=(); res=0; tmp=(`echo $(echo $line | grep -o -E '[0-9]{1,3}')`)
for i in {2..36}; do
if [ $i -lt 12 ]; then win_nr+=($tmp[$i])
else card_nr+=($tmp[$i]); fi; done
for nr in ${card_nr[@]}; do; for nr2 in ${win_nr[@]}; do
if [[ $nr == $nr2 ]]; then; ((res+=1)); fi;done; done
if [ $res -gt 0 ]; then
for i in {1..$res}; do; ((avalance[$((count+i))]+=1*$avalance[$count])); done; fi; done < $data
for nr in $avalance; do ((result+=nr)); done

echo $result

