<template>
  <div>
    <div v-if="definition.length>0">
      <h1>Definition of {{definedWord}}:</h1>
      <div v-for="(def,idx) in definition" :key="idx">
        <h4>
          {{def.partOfSpeech}}:
          <span class="font-weight-normal">{{def.definition}}</span>
        </h4>
      </div>
    </div>
    <h6 class="text-center">Click word to define</h6>
    <div class="d-flex text-center flex-wrap justify-content-center">
      <div v-for="(words,score) in allWords" id="modal" :key="score" class="box">
        <h1>{{score}}</h1>
        <ul>
          <li
            @click="define(subWord)"
            :class="'word '+  (word===subWord ? 'orange':'')"
            v-for="subWord in words"
            :key="subWord"
          >{{subWord}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["word"],
  data() {
    return {
      definition: [],
      definedWord: ""
    };
  },
  computed: {
    ...mapGetters(["isValidWord", "wordScore"]),
    allWords() {
      return this.generateAllWords(this.word)
        .filter(this.isValidWord)
        .reduce((blob, word) => {
          const score = this.wordScore(word);
          blob[score] = blob[score] ? [...blob[score], word] : [word];
          return blob;
        }, {});
    }
  },
  methods: {
    async define(word2) {
      this.definedWord = word2;
      let def = await this.$axios.$get(
        "https://scriblr.netlify.com/.netlify/functions/getTranslation?word=" +
          word2
      );
      if (!def.results) {
        this.definition = [
          {
            partOfSpeech: "This dictionary's never heard of " + word2,
            definition: ""
          }
        ];
        return;
      }
      def = def.results;
      this.definition.splice(0, this.definition.length, ...def);
    }
  }
};
</script>

<style scoped>
#modal {
  color: black;
}
.box {
  border: 1px solid black;
  padding: 10px;
}
li {
  font-size: 30px;
}
.word {
  cursor: pointer;
}
.orange {
  color: orangered;
}
</style>
