# Werewolf-Calculator

- 人狼ゲームの有り得そうなパターン計算機

### とりあえず実装したいもの
市民,市民,市民,占い師,霊媒師,狩人,人狼,人狼,狂人ルールで、

- [ ]CO(COした人は、COした職種、人狼、狂人のいずれかとする)
- [ ]狩人の守り(狩人の守りが発動した時、狩人が生きていることが確定)
- [ ]占い・霊媒結果(占い・霊媒の結果で白確・黒確するという結果を反映)

の3つの状況が起こりうる組み合わせを計算するものを簡単に作りたい。

### 備考
- 実験的にCleanFluxで実装している(正直この規模ならFluxでいい)
   - []余力があれば設計をCleanFluxにしたのでテストも書いてみる