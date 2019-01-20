const pkg = require('./package')

const isDevMode=process.env.NODE_ENV === 'development'

module.exports = {
  mode: 'universal',

  server: {
    port: 3003, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  router: {
    base: isDevMode ? '/' : '/nuxt/',
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: 'https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css' }
    ],
    script:[
      {src:'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js'},
      {src:'https://cdn.bootcss.com/twitter-bootstrap/3.3.7/js/bootstrap.min.js'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#f00',height:'6px' },

  /*
  ** Global CSS
  */
  css: [

  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vee-validate' },
    { src: '~/plugins/mavon-editor' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL:isDevMode ? 'http://localhost:8080/tblog/api':'http://118.24.127.237:8080/tblog/api'
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
  },
  env: {
    appName:pkg.name,
    serverEnv:process.env.NODE_ENV,
    serverBaseUrl:isDevMode ? 'http://localhost:8080/tblog':'http://118.24.127.237:8080/tblog',
    serverApiUrl:isDevMode ? 'http://localhost:8080/tblog/api':'http://118.24.127.237:8080/tblog/api'
  }
}
