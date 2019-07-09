<template>
  <div id="game-on" class="m-4">
    <h1 class="text-center">Game On</h1>
    <b-form @submit.prevent="checkWord">
      <b-input-group class="col offset-sm-2 col-sm-8 my-4">
        <b-input v-model="newWord" />
        <b-input-group-append>
          <b-button type="submit" variant="primary">Check it</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>
    <h3 v-for="(player,name) in players" :key="name">{{`${name}: 0 points`}}</h3>
    <h4 v-if="newWord" class="text-center">Is {{newWord}} a valid word: {{isValidWord(newWord)}}</h4>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      newWord: ""
    };
  },
  computed: {
    ...mapGetters(["players", "isValidWord"])
  },
  methods: {
    // ...mapMutations(),
    checkWord() {
      if (!this.isValidWord()) {
        // display not valid
        this.newWord = "";
        return;
      }
      //do more
    }
  }
};
</script>

<style>
</style>
