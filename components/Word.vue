<template>
  <div class="word">
    <h6>word</h6>
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
      wordScore: 0
    };
  }
};
</script>

<style>
</style>
