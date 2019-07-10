<template>
  <div id="game-on" class="m-4">
    <h1 class="text-center">
      <em>SCRIBLR</em>
    </h1>
    <b-form @submit.prevent="checkWord">
      <b-input-group class="col offset-sm-2 col-sm-8 my-4">
        <b-input :state="isValid" v-model="newWord" />
        <b-input-group-append>
          <b-button type="submit" :disabled="!isValid" variant="primary">Check it</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>
    <word
      v-for="(word,idx) in words"
      :key="idx"
      :word="word.word"
      @updateScore="newScore => word.score = newScore"
    />
    <div class="d-flex justify-content-center">
      <h3 class="m-2" v-for="(player,name) in players" :key="name">{{`${name}: 0 points`}}</h3>
    </div>
    <div class="text-center">
      <b-button variant="outline-dark">Clear</b-button>
      <b-button
        v-for="(player,name) in players"
        :key="name"
        variant="outline-info"
        class="mx-2"
      >Save for {{name.toUpperCase()}}</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Word from "@/components/Word";
export default {
  components: {
    Word
  },
  data() {
    return {
      newWord: "",
      isValid: null,
      words: []
    };
  },
  computed: {
    ...mapGetters(["players", "isValidWord"])
  },
  watch: {
    newWord(val) {
      this.isValid = this.isValidWord(val);
      if (!val) this.isValid = null;
    }
  },
  methods: {
    // ...mapMutations(),
    checkWord() {
      this.words.push({ word: this.newWord, score: null });
    }
  }
};
</script>

<style>
</style>
