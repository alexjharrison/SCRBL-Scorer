import Vue from 'vue';

const hashMap = letters => {
  return letters.reduce((acc, letter) => {
    acc[letter] = acc[letter] ? acc[letter] + 1 : 1;
    return acc;
  }, {});
};
Vue.prototype.generateAllWords = str => {
  const letters = str.split('');
  const hash = hashMap(letters);
  let allWords = letters;
  letters.map(() => {
    allWords = [
      ...new Set(
        allWords
          .concat(
            allWords.flatMap(word => letters.flatMap(letter => word + letter))
          )
          .filter(word =>
            letters.reduce(
              (isOk, letter) =>
                (word.match(new RegExp(letter, 'g')) || []).length <=
                  hash[letter] && isOk,
              true
            )
          )
      )
    ];
  });
  return allWords;
};
