import colors from 'vuetify/es5/util/colors'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - creator',
    title: 'Timetable',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  serverMiddleware: ['~/middleware/api/logger'],

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "~/assets/main.scss",
    "~/assets/toast.scss"
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/Vuelidate',

  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/toast',
  ],

  toast: {
      position: 'top-right',
      register: [ // Register custom toasts
        {
          name: 'my-error',
          message: 'Oops...Something went wrong',
          options: {
            type: 'error'
          }
        },
        {
          name: 'success',
          message: 'Job Added',
          options: {
            type: 'success'
          }
        }
      ]
  },

  axios: {
    baseURL: 'http://192.168.1.100:45455', // Used as fallback if no runtime config is provided
    // baseURL: 'http://localhost:2811', // Used as fallback if no runtime config is provided
    proxy: true
  },

  proxy: {
    "/api": {
      target:
        "http://192.168.1.100:45455/api",
        // "http://localhost:2811",
      pathRewrite: { "^/api": "" }
    }
  },


  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
