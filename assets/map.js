const words = require('./sowpods.json');
const letters = require('./letters.json');
const wordsHash = words.reduce((acc, word) => {
  acc[word] = word.split('').reduce((acc, letter) => acc + letters[letter], 0);
  return acc;
}, {});
require('fs').writeFileSync(
  './dictionary2.json',
  JSON.stringify(wordsHash),
  'UTF8'
);
