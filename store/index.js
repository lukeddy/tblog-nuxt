import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const index = () => new Vuex.Store({
  state:{
    token:null,
    authUser:null,
  },
  getters:{
    isLoggedIn(state) {
      return state.token !== null
    },
    getToken(state){
      return state.token
    }
  },
  mutations: {
    setToken(state, token) {
      console.log('set token',token)
      state.token = token
    },
    setUser(state, user) {
      state.authUser = user
    }
  },

  actions: {
    async logout({ commit }) {
     // await axios.post('/api/logout')
      commit('setToken', null)
    }
  }

})

export default index
