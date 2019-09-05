
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  server: {
    host: '0.0.0.0',
    port: 3003
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
 router: {
  middleware: [
    'clearValErrors',
    'auth',
  ]
 },
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  
  */
  plugins: [
    './plugins/mixins/validation',
    './plugins/mixins/user_pers',
    './plugins/mixins/posts',
    './plugins/axios', 
    './plugins/veeValidation',
    './plugins/moment',
    
  ],
  /*
  ** Nuxt.js modules //test
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    'nuxt-fontawesome',
    'nuxt-vue-material',
    'nuxt-material-design-icons',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://192.168.1.127:2000'
    //baseURL: 'http://3.16.136.89:2000', AWS VPS EC2
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'api/auth/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: {
            url: 'api/auth/logout',
            method: 'get'
          },
          user: {
            url: 'api/me',
            method: 'get',
            propertyName: 'data'
          }
        }
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
      callback: '/auth/login',
      home: '/'
    }
  },

  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
    ],
  },
  vueMaterial: {
    theme: 'default-light'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
