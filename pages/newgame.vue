<template>
  <div id="new-game" class="d-flex flex-column justify-content-center align-items-center">
    <h1>
      <em>SCRIBLR</em>
    </h1>
    <h2>
      <u>Players</u>
    </h2>
    <div class="d-flex justify-content-between">
      <div class="players" v-for="(player,name) in players" :key="name">
        {{name}}
        <b-button @click="removePlayer(name)" size="sm" variant="danger">X</b-button>
      </div>
    </div>
    <b-form @submit.prevent="addPlayer(newPlayer);newPlayer=''">
      <b-input-group>
        <b-input type="text" v-model="newPlayer" />
        <b-button type="submit" variant="info">Add Player</b-button>
      </b-input-group>
    </b-form>
    <b-button to="/gameon" variant="success" size="lg">Start Game</b-button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      newPlayer: ""
    };
  },
  computed: {
    ...mapGetters(["players"])
  },
  methods: {
    ...mapMutations(["addPlayer", "removePlayer"]),
    add(e) {}
  }
};
</script>

<style scoped>
#new-game * {
  margin: 10px;
}
.players {
  font-size: 26px;
  text-transform: capitalize;
}
</style>
