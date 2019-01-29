export const state = () => ({
  token:null,
  authUser:null,
  popStatus:false
})

export const getters = {
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

export const mutations = {
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

export const actions = {
  async logout({ commit }) {
    commit('setToken', null)
    commit('setUser',null)
  },
  async showLoginAlert({commit},status){
    commit("setPopStatus",status)
  }
}

