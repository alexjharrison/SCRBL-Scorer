import Vue from 'vue';

export const state = () => ({
  letters: require('@/assets/letters.json'),
  words: require('@/assets/dictionary.json'),
  players: {
    alex: [],
    ally: []
  }
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
    word.split('').reduce((acc, letter) => acc + getters.letterValue(letter), 0)
};

export const mutations = {
  addPlayer: (state, name) => Vue.set(state.players, name, { words: [] }),
  removePlayer: ({ players }, name) => Vue.delete(players, name),
  populateDictionary: (state, words) => (state.words = words),
  addWords: (state, { name, words }) => state.players[name].push(...words)
};
