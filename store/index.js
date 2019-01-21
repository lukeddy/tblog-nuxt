import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token:null,
  authUser:null,
  popStatus:false
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
  },
  getPopStatus(state){
    return state.popStatus
  }
}

const mutations = {
  setToken(state, token) {
    console.log('set token',token)
    state.token = token
  },
  setUser(state, user) {
    state.authUser = user
  },
  setPopStatus(state, popStatus) {
    state.popStatus = popStatus
  }
}

const actions = {
  async logout({ commit }) {
    commit('setToken', null)
    commit('setUser',null)
  },
  async showLoginAlert({commit},status){
    commit("setPopStatus",status)
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
