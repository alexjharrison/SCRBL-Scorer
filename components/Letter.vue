<template>
  <div>
    <div class="text-center">{{multText}}</div>
    <b-button @click="changeMult" class="mx-1" :variant="variant">{{letter}}</b-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["letter"],
  data() {
    return {
      letterMult: null
    };
  },
  methods: {
    changeMult() {
      this.letterMult = this.letterMult === 3 ? 0 : this.letterMult + 1;
    }
  },
  computed: {
    ...mapGetters(["letterValue"]),
    variant() {
      const mult = this.letterMult;
      return mult === 0
        ? ""
        : mult === 1
        ? "outline-dark"
        : mult === 2
        ? "info"
        : "success";
    },
    multText() {
      const mult = this.letterMult;
      return mult === 0 ? "0" : mult === 2 ? "2x" : mult === 3 ? "3x" : "";
    },
    letterScore() {
      return this.letterValue(this.letter) * this.letterMult;
    }
  },
  watch: {
    letterScore(val) {
      this.$emit("updateScore", val);
    }
  },
  mounted() {
    this.letterMult = 1;
  }
};
</script>

<style>
</style>
