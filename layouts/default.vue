<template>
  <div>
    <b-modal
      title="Dictionary Downloading"
      v-model="modalVisible"
      :no-close-on-esc="true"
      class="modal"
      :no-close-on-backdrop="true"
    >
      <span slot="modal-footer"></span>
      <span slot="modal-header">
        <h1>🕮 Downloading Dictionary 🎉</h1>
      </span>
      <p>Please Wait...</p>
      <b-progress :value="dlPercent" :max="100" show-progress animated></b-progress>
    </b-modal>
    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalVisible: true
    };
  },
  async mounted() {
    await this.$store.dispatch("downloadDictionary", window.location.host);
    this.modalVisible = false;
    console.log("done");
  },
  computed: {
    dlPercent() {
      return this.$store.state.downloadPercent;
    }
  }
};
</script>


<style>
.modal {
  color: black;
}
body {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  background: #0f2027; /* fallback for old browsers */
  color: white;
  background: -webkit-linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
