// state
const state = {
  items: [],
}

// mutations
const mutations = {
  SET_ITEM_ADMINISTRATIVO (state, data) {
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

  DELETE_ITEM_ADMINISTRATIVO (state, id) {
    state.items.splice(id, 1)
  },

  EMPTY_ADMINISTRATIVO (state) {
    state.items = []
  },
}

// actions
const actions = {
  setItemAdministrativo({ commit }, data) {
    commit('SET_ITEM_ADMINISTRATIVO', data)
  },

  deleteItemAdministrativo({ commit }, id) {
    commit('DELETE_ITEM_ADMINISTRATIVO', id)
  },

  emptyAdministrativo({ commit }) {
    commit('EMPTY_ADMINISTRATIVO')
  },
}

// getters
const getters = {
  itemsAdministrativo: state => {
    return state.items
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
