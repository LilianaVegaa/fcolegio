// state
const state = {
  items: [],
}

// mutations
const mutations = {
  SET_ITEM_MATERIA (state, data) {
    let obj = {
      id: data.id,
      nombre: data.nombre,
      registrado: data.registrado,
      actualizado: data.actualizado,
    }
    const flag = state.items.some(item => item.id === obj.id)
    if (!flag) state.items.push(obj)
  },

  DELETE_ITEM_MATERIA (state, id) {
    state.items.splice(id, 1)
  },

  EMPTY_MATERIA (state) {
    state.items = []
  },
}

// actions
const actions = {
  setItemMateria({ commit }, data) {
    commit('SET_ITEM_MATERIA', data)
  },

  deleteItemMateria({ commit }, id) {
    commit('DELETE_ITEM_MATERIA', id)
  },

  emptyMateria({ commit }) {
    commit('EMPTY_MATERIA')
  },
}

// getters
const getters = {
  itemsMateria: state => {
    return state.items
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
