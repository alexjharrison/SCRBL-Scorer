import Vue from 'vue';

export const state = () => ({
  letters: require('@/assets/letters.json'),
  words: null,
  players: {
    alex: [],
    ally: []
  },
  downloadPercent: 0
});

export const getters = {
  isValidWord: state => word => !!state.words[word],
  players: state => state.players,
  letterValue: state => letter => state.letters[letter],
  highestScore: state => state.players,
  longestWord: state => state.players,
  playerScore: state => name =>
    state.players[name].reduce((acc, { score }) => acc + score, 0),
  wordScore: (state, getters) => word =>
    state.words[word] ||
    word
      .split('')
      .reduce((acc, letter) => acc + getters.letterValue(letter), 0),
  validateCombos: state => word =>
    this.generateAllWords(word).filter(word => state.words[word])
};

export const mutations = {
  addPlayer: (state, name) => Vue.set(state.players, name, { words: [] }),
  removePlayer: ({ players }, name) => Vue.delete(players, name),
  populateDictionary: (state, words) => (state.words = words),
  setDlPercent: (state, dlPercent) => (state.downloadPercent = dlPercent),
  addWords: (state, { name, words }) => state.players[name].push(...words)
};

export const actions = {
  downloadDictionary: async ({ commit }) => {
    let holdOn = false;
    let response = await fetch('/dictionary.json');
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length');
    let receivedLength = 0;
    let chunks = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks.push(value);
      receivedLength += value.length;
      console.log(value);
      if (!holdOn) {
        console.log('hi');
        commit(
          'setDlPercent',
          Math.floor((receivedLength / contentLength) * 100)
        );
        setTimeout(() => {
          holdOn = false;
        }, 1);
        holdOn = true;
      }
    }
    let chunksAll = new Uint8Array(receivedLength);
    let position = 0;
    for (let chunk of chunks) {
      chunksAll.set(chunk, position);
      position += chunk.length;
    }
    let result = new TextDecoder('utf-8').decode(chunksAll);
    console.log('parse-start');
    commit('populateDictionary', JSON.parse(result));
    console.log('parse-end');
    return true;
  }
};
