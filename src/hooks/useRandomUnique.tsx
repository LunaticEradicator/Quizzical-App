export default function useRandomUnique(range: number, count: number) {
  // create an array of 4 unique random Number[which does not includes duplicates]
  let num = new Set();
  while (num.size < count) {
    num.add(Math.floor(Math.random() * (range - 1 + 1)));
  }
  return [...num];
}
