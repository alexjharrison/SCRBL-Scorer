const pkg = require("./package");

module.exports = {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  server: {
    port: process.env.PORT || 2999
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/generateAllWords.js"],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    "bootstrap-vue/nuxt",
    "@nuxtjs/dotenv",
    "@nuxtjs/proxy",
    "@nuxtjs/axios"
  ],

  /*
   ** Axios config
   */
  axios: {
    baseURL:
      process.env.NODE_ENV === "production"
        ? "https://scriblr.netlify.com/.netlify/functions/getTranslation"
        : "http://localhost:" + (process.env.PORT || 2999) + "/getTranslation"
  },

  /*
   ** Proxy config
   */
  proxy: {
    "/getTranslation": "http://localhost:9000/getTranslation"
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    analyze: true,
    extend(config, ctx) {}
  }
};
