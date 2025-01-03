import * as types from '../mutation-types'

const state = {
  type: '',
  title: '',
  text: '',
  modal: false,
  show: false
}

const mutations = {
  RESPONSE_MSG (state, payload) {
    Object.assign(state, { ...payload, show: true })
  },
  CLEAR_MSG (state) {
    Object.assign(state, { type: '', text: '', title: '', modal: false, show: false })
  }
}

const actions = {
  responseMessage ({ commit, state }, payload) {
    commit(types.RESPONSE_MSG, payload)
    if (!state.modal) {
      setTimeout(() => { commit(types.CLEAR_MSG) }, 10000)
    }
  },
  clearMessage ({ commit }) {
    commit(types.CLEAR_MSG)
  }
}

const getters = {
  responseMessage: state => {
    return { ...state }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
