
data="./data.txt"; result=0
while read -r line; do
win_nr=(); card_nr=(); res=0; tmp=(`echo $(echo $line | grep -o -E '[0-9]{1,3}')`)
for i in {2..36}; do
if [ $i -lt 12 ]; then win_nr+=($tmp[$i])
else card_nr+=($tmp[$i]); fi; done
for nr in ${card_nr[@]}; do; for nr2 in ${win_nr[@]}; do
if [[ $nr == $nr2 ]]; then; ((res+=1)); fi; done; done
if [ $res -gt 0 ]; then ((result+=((res=2**(res-1))))); fi; done < $data

echo $result
