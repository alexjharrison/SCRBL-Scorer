import Vue from 'vue';

export const state = () => ({
  letters: require('@/assets/letters.json'),
  words: require('@/assets/sowpods.json'),
  players: {
    alex: [],
    ally: []
  }
});

export const getters = {
  isValidWord: state => word => state.words.includes(word),
  players: state => state.players,
  letterValue: state => letter => state.letters[letter],
  highestScore: state => state.players,
  longestWord: state => state.players
};

export const mutations = {
  addPlayer: (state, name) => Vue.set(state.players, name, { words: [] }),
  removePlayer: ({ players }, name) => Vue.delete(players, name),
  populateDictionary: (state, words) => (state.words = words),
  addWord: (state, word) => state.players[name].push(word)
};
