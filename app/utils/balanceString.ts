export default (stringToBalance, items) => {
  const words = stringToBalance.split(' ');
  if (words.length <= items) return stringToBalance; // Si es una sola palabra, no dividir

  let bestSplit = 1;
  let minDiff = Infinity;

  for (let i = 1; i < words.length; i++) {
    const part1 = words.slice(0, i).join(' ');
    const part2 = words.slice(i).join(' ');

    const diff = Math.abs(part1.length - part2.length);
    if (diff < minDiff) {
      minDiff = diff;
      bestSplit = i;
    }
  }

  return words.slice(0, bestSplit).join(' ') + '<br>' + words.slice(bestSplit).join(' ');
}