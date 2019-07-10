<template>
  <div class="my-3">
    <div class="d-flex justify-content-center align-items-center">
      <div class="d-flex flex-wrap justify-content-center">
        <h3 class="mr-4">Score: {{wordScore}}</h3>
        <h3 class="ml-4 mr-2">Word Multiplier:</h3>
      </div>
      <b-button :variant="wordMultiplier===1?'primary':'outline-primary'" @click="applyMult(1)">1x</b-button>
      <b-button
        class="m-2"
        :variant="wordMultiplier===2?'primary':'outline-primary'"
        @click="applyMult(2)"
      >2x</b-button>
      <b-button :variant="wordMultiplier===3?'primary':'outline-primary'" @click="applyMult(3)">3x</b-button>
    </div>
    <div class="d-flex justify-content-center align-items-end">
      <letter
        v-for="(letter,idx) in letters"
        :key="idx"
        :letter="letter.letter"
        @updateScore="score=>letter.score = score"
      />
    </div>
  </div>
</template>

<script>
import Letter from "./Letter";
export default {
  props: ["word"],
  components: {
    Letter
  },
  data() {
    return {
      wordMultiplier: 1,
      letters: []
    };
  },
  computed: {
    wordScore() {
      return (
        this.letters.reduce((acc, letter) => acc + letter.score, 0) *
        this.wordMultiplier
      );
    }
  },
  watch: {
    wordScore(val) {
      this.$emit("updateScore", val);
    }
  },
  methods: {
    applyMult(mult) {
      this.wordMultiplier = mult;
    }
  },
  mounted() {
    this.letters = this.word.split("").map(letter => ({ letter, score: 0 }));
  }
};
</script>

<style scoped>
</style>
