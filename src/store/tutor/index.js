// state
const state = {
  items: [],
}

// mutations
const mutations = {
  SET_ITEM_TUTOR (state, data) {
    let obj = {
      id: data.id,
      nombres: data.nombres,
      apellidos: data.apellidos,
      teléfono: data.telefono,
      ci: data.ci,
    }
    const flag = state.items.some(item => item.id === obj.id)
    if (!flag) state.items.push(obj)
  },

  DELETE_ITEM_TUTOR (state, id) {
    state.items.splice(id, 1)
  },

  EMPTY_TUTOR (state) {
    state.items = []
  },
}

// actions
const actions = {
  setItemTutor({ commit }, data) {
    commit('SET_ITEM_TUTOR', data)
  },

  deleteItemTutor({ commit }, id) {
    commit('DELETE_ITEM_TUTOR', id)
  },

  emptyTutor({ commit }) {
    commit('EMPTY_TUTOR')
  },
}

// getters
const getters = {
  itemsTutor: state => {
    return state.items
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
