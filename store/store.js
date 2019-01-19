import Vue from "vue"
import Vuex from "vuex"
import axios from '@nuxtjs/axios'

Vue.use(Vuex)
//this.$axios.defaults.baseURL=process.env.apiUrl

const store = () => new Vuex.Store({
  state:{
    token:null,
    posts:[],

  },
  getters:{
    isLoggedIn(state) {
      return state.token !== null
    },
    getToken(state){
      return state.token
    }
  },
  mutations:{
    saveTokenToLocal(state, token) {
      state.token = token
    },
    logout(state) {
      state.token = null
    },
  },
  actions:{
    home(context, params) {
      return new Promise((resolve, reject) => {
        axios.post('/home',params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    doHttpLogin(context, params) {
      return new Promise((resolve, reject) => {
        this.$axios.post('/login',params).then(response => {
          if(response.data.status){
            const token = response.data.data
            localStorage.setItem('access_token', token)
            context.commit('saveTokenToLocal', token)
          }
          resolve(response)
        })
          .catch(error => {
            reject(error)
          })
      })
    },

    logout(context) {
      this.$axios.defaults.headers.common['Authorization'] = context.state.token

      if (context.getters.isLoggedIn) {
        return new Promise((resolve, reject) => {
          //console.log(this.$axios.defaults.headers)
          this.$axios.post('/logout')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('logout')
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('access_token')
              context.commit('logout')
              reject(error)
            })
        })
      }
    },

    getUserInfo(context) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.common['Authorization'] = context.state.token

        this.$axios.get('/user/info').then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    allCategory(context) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.common['Authorization'] = context.state.token

        this.$axios.get('/category/all').then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    listCategory(context, params) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.common['Authorization'] = context.state.token

        this.$axios.post('/category/list',params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    getCategory(context, params) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.common['Authorization'] = context.state.token

        this.$axios.get('/category/'+params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    updateCategory(context, params) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.common['Authorization'] = context.state.token

        this.$axios.put('/category/'+params.id,params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    addCategory(context, params) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.common['Authorization'] = context.state.token

        this.$axios.post('/category/add',params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    listPost(context, params) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.common['Authorization'] = context.state.token

        this.$axios.post('/post/list',params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    addPost(context, params) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.common['Authorization'] = context.state.token

        this.$axios.post('/post',params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    getPost(context, params) {
      return new Promise((resolve, reject) => {
        this.$axios.get('/post/detail/'+params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    updatePost(context, params) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.common['Authorization'] = context.state.token

        this.$axios.put('/post/'+params.id,params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    delPost(context, params) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.common['Authorization'] = context.state.token

        this.$axios.delete('/post/'+params.id,params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    getComments(context, params) {
      return new Promise((resolve, reject) => {
        this.$axios.get('/comment/public/'+params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addComment(context, params) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.common['Authorization'] = context.state.token

        this.$axios.post('/comment',params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    replyComment(context, params) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.common['Authorization'] = context.state.token

        this.$axios.post('/comment/reply',params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    thumbsUpComment(context, params) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.common['Authorization'] = context.state.token

        this.$axios.put('/comment/thumbsup/'+params.id,params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    delComment(context, params) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.common['Authorization'] = context.state.token

        this.$axios.delete('/comment/'+params.id,params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    uploadFile(context, params) {
      return new Promise((resolve, reject) => {
        this.$axios.defaults.headers.common['Authorization'] = context.state.token

        const headers={
          headers: { 'Content-Type': 'multipart/form-data' },
        }

        this.$axios.post('/upload/file',params,headers).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
})

export default store
