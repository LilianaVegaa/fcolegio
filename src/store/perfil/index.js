// state
const state = {
  items: [],
}

// mutations
const mutations = {
  SET_ITEM_PERFIL (state, data) {
    let obj = {
      id: data.id,
      descripción: data.description,
      registrado: data.created,
      actualizado: data.updated,
    }
    const flag = state.items.some(item => item.id === obj.id)
    if (!flag) state.items.push(obj)
  },

  DELETE_ITEM_PERFIL (state, id) {
    state.items.splice(id, 1)
  },

  EMPTY_PERFIL (state) {
    state.items = []
  },
}

// actions
const actions = {
  setItemPerfil({ commit }, data) {
    commit('SET_ITEM_PERFIL', data)
  },

  deleteItemPerfil({ commit }, id) {
    commit('DELETE_ITEM_PERFIL', id)
  },

  emptyPerfil({ commit }) {
    commit('EMPTY_PERFIL')
  },
}

// getters
const getters = {
  itemsPerfil: state => {
    return state.items
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
