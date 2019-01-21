import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token:null,
  authUser:null,
}

const getters = {
  isLoggedIn(state) {
    return state.token !== null
  },
  getToken(state){
    return state.token
  },
  getUser(state){
    return state.authUser
  }
}

const mutations = {
  setToken(state, token) {
    console.log('set token',token)
    state.token = token
  },
  setUser(state, user) {
    state.authUser = user
  }
}

const actions = {
  async logout({ commit }) {
    commit('setToken', null)
  }
}

const index = () => {
  return new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  })
}

export default index
