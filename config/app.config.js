/**
 * @file App环境配置文件
 * @module app.config
 * @author luke
 */

const { isProdMode } = require('../environment')

module.exports = {
  meta:{
    title: 'tblog-nuxt',
    keywords: 'tblog-nuxt,vue,nuxt',
    description: '追求自我...',
    author: 'luke',
  },
  app:{
    appName:'tblog-nuxt',
  },
  server:{
    serverBaseUrl: isProdMode ? 'http://118.24.127.237:8080/tblog' : 'http://localhost:8080/tblog',
    apiBaseUrl: isProdMode ? 'http://118.24.127.237:8080/tblog/api' : 'http://localhost:8080/tblog/api'
  },
}
