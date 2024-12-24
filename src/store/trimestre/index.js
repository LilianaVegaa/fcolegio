// state
const state = {
  items: [],
}

// mutations
const mutations = {
  SET_ITEM_TRIMESTRE (state, data) {
    let obj = {
      id: data.id,
      nombre: data.nombre,
      gestion: data.gestion,
    }
    const flag = state.items.some(item => item.id === obj.id)
    if (!flag) state.items.push(obj)
  },

  DELETE_ITEM_TRIMESTRE (state, id) {
    state.items.splice(id, 1)
  },

  EMPTY_TRIMESTRE (state) {
    state.items = []
  },
}

// actions
const actions = {
  setItemTrimetre({ commit }, data) {
    commit('SET_ITEM_TRIMESTRE', data)
  },

  deleteItemTrimetre({ commit }, id) {
    commit('DELETE_ITEM_TRIMESTRE', id)
  },

  emptyTrimetre({ commit }) {
    commit('EMPTY_TRIMESTRE')
  },
}

// getters
const getters = {
  itemsTrimetre: state => {
    return state.items
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
