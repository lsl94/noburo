// 這個轉換規則需要您和張三都知道
function generateSecretPath(name, salt) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i); // 獲取字符的 Unicode 值
  }
  const finalValue = sum * salt;
  return finalValue.toString(16); // 轉換為16進制字串作為路徑名
}

const friendName = "張三"; // 假設朋友的名字
const secretSalt = 12345; // 約定的鹽值，只有您和朋友知道

const secretDirName = generateSecretPath(friendName, secretSalt);
// 假設計算結果是 "a7c8d9e"
console.log(secretDirName); // "a7c8d9e"
