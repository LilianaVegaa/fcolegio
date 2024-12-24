// state
const state = {
  items: [],
}

// mutations
const mutations = {
  SET_ITEM_GESTION (state, data) {
    let obj = {
      id: data.id,
      año: data.año,
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
    }
    const flag = state.items.some(item => item.id === obj.id)
    if (!flag) state.items.push(obj)
  },

  DELETE_ITEM_GESTION (state, id) {
    state.items.splice(id, 1)
  },

  EMPTY_GESTION (state) {
    state.items = []
  },
}

// actions
const actions = {
  setItemGestion({ commit }, data) {
    commit('SET_ITEM_GESTION', data)
  },

  deleteItemGestion({ commit }, id) {
    commit('DELETE_ITEM_GESTION', id)
  },

  emptyGestion({ commit }) {
    commit('EMPTY_GESTION')
  },
}

// getters
const getters = {
  itemsGestion: state => {
    return state.items
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
