<template>
  <div id="game-on" class="m-4">
    <h1 class="text-center">
      <em>SCRIBLR</em>
    </h1>
    <b-form @submit.prevent="checkWord">
      <b-input-group class="col offset-sm-2 col-sm-8 my-4">
        <b-input :state="isValid" v-model="newWord" />
        <b-input-group-append>
          <b-button type="submit" variant="primary">{{submitBtnText}}</b-button>
        </b-input-group-append>
      </b-input-group>
      <b-input-group>
        <b-input-group-append>
          <b-button variant="warning">Define</b-button>
          <b-button @click="allValidWordsModalVisible = true" variant="info">All Valid Words</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>
    <div class="d-flex justify-content-center">
      <h3
        class="m-2"
        v-for="(player,name) in players"
        :key="name"
      >{{`${name}: ${playerScore(name)} points`}}</h3>
    </div>
    <word
      v-for="(word,idx) in words"
      :key="idx"
      :word="word.word"
      @updateScore="newScore => word.score = newScore"
    />
    <div v-if="words.length>0" class="text-center">
      <h3>Total: {{playTotal}}</h3>
      <b-button @click="words = []" variant="outline-light">Clear</b-button>
      <b-button
        v-for="(player,name) in players"
        :key="name"
        variant="outline-info"
        class="mx-2"
        @click="saveWords(name)"
      >Save for {{name.toUpperCase()}}</b-button>
    </div>
    <b-modal ok-only size="xl" id="modal" title="Visible Words" v-model="allValidWordsModalVisible">
      <all-valid-words-modal :word="newWord" />
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Word from "@/components/Word";
import AllValidWordsModal from "@/components/AllValidWordsModal";
export default {
  components: {
    Word,
    AllValidWordsModal
  },
  data() {
    return {
      newWord: "",
      isValid: null,
      words: [],
      allValidWordsModalVisible: false
    };
  },
  computed: {
    ...mapGetters([
      "players",
      "isValidWord",
      "playerScore",
      "wordScore",
      "validateCombos"
    ]),
    playTotal() {
      return this.words.reduce((acc, { score }) => acc + score, 0);
    },
    submitBtnText() {
      return !this.newWord
        ? "Enter Word"
        : this.isValid
        ? this.wordScore(this.newWord) + " Points"
        : "Not a Word";
    },
    definition() {
      // return "Definition: " + this.definitionOf(this.newWord);
      return "Definition: ";
    },
    validWordsTableData() {
      const words = this.allValidWords.map(word => ({
        word,
        score: this.wordScore(word)
      }));
      console.log(words);
    }
  },
  watch: {
    newWord(val) {
      this.isValid = this.isValidWord(val);
      if (!val) this.isValid = null;
    }
  },
  methods: {
    ...mapMutations(["addWords"]),
    checkWord() {
      if (this.newWord === "") return;
      this.words.push({ word: this.newWord, score: null });
      this.newWord = "";
    },
    saveWords(name) {
      this.addWords({ name, words: this.words });
      this.words = [];
    },
    updateValidWords() {
      console.log(allWords);
      // this.allValidWords = this.validateCombos(this.newWord);
      // console.log(this.allValidWords);
    }
  }
};
</script>

<style>
#modal {
  color: black;
}
</style>
