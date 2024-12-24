// state
const state = {
  items: [],
}

// mutations
const mutations = {
  SET_ITEM_ASIGNACION (state, data) {
    let obj = {
      gestion: data.gestion,
      fecha: data.fecha,
      'total cursos': data.total_cursos_asignados,
    }
    const flag = state.items.some(item => item.id === obj.id)
    if (!flag) state.items.push(obj)
  },

  DELETE_ITEM_ASIGNACION (state, id) {
    state.items.splice(id, 1)
  },

  EMPTY_ASIGNACION (state) {
    state.items = []
  },
}

// actions
const actions = {
  setItemAsignacion({ commit }, data) {
    commit('SET_ITEM_ASIGNACION', data)
  },

  deleteItemAsignacion({ commit }, id) {
    commit('DELETE_ITEM_ASIGNACION', id)
  },

  emptyAsignacion({ commit }) {
    commit('EMPTY_ASIGNACION')
  },
}

// getters
const getters = {
  itemsAsignacion: state => {
    return state.items
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
