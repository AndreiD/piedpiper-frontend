export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "Upstacker Finder",
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#000" },
  /*
   ** Global CSS
   */
  css: ["~/assets/main.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/axios",
    "~/plugins/filters",
    { src: "~/plugins/google-maps", ssr: true }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/eslint-module",
    "@nuxtjs/toast",
    "@nuxtjs/auth",
    "@nuxtjs/vuetify",
    ["@nuxtjs/pwa", { icon: false }]
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "/login", method: "post", propertyName: "token" },
          logout: { url: "/logout", method: "get" },
          user: { url: "/user/me", method: "get", propertyName: "email" }
        },
        tokenRequired: true,
        tokenType: "Token"
      },
      redirect: {
        login: "/login",
        logout: "/login",
        callback: "/login",
        home: "/"
      }
    }
  },
  router: {
    middleware: ["auth"]
  },
  toast: {
    position: "top-right",
    duration: 3000
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: "https://api.to.wtf",
    retries: 3
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    optionsPath: "./vuetify.options.js"
  },
  /*
   ** Build configuration
   */
  pwa: {
    manifest: {
      name: "findlaywer.bg",
      lang: "bg"
    }
  },
  build: {
    transpile: [/^vue2-google-maps($|\/)/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
