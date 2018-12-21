module.exports = function solve1(ids) {
  let [countExactlyTwo, countExactlyThree] = [0, 0];

  ids.forEach(id => {
    const letterCounts = {};
    id.split('').forEach(char => {
      letterCounts[char] = letterCounts[char] ? letterCounts[char] + 1 : 1;
    });
    if (Object.values(letterCounts).includes(2)) countExactlyTwo++;
    if (Object.values(letterCounts).includes(3)) countExactlyThree++;
  });

  return countExactlyTwo * countExactlyThree;
}