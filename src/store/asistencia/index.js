// state
const state = {
  items: [],
}

// mutations
const mutations = {
  SET_ITEM_ASISTENCIA (state, data) {
    let obj = {
      id: data.id,
      curso: data.curso,
      gestion: data.gestion,
      profesor: data.profesor,
    }
    const flag = state.items.some(item => item.id === obj.id)
    console.log(data)
    if (!flag) state.items.push(obj)
  },

  DELETE_ITEM_ASISTENCIA (state, id) {
    state.items.splice(id, 1)
  },

  EMPTY_ASISTENCIA (state) {
    state.items = []
  },
}

// actions
const actions = {
  setItemAsistencia({ commit }, data) {
    commit('SET_ITEM_ASISTENCIA', data)
  },

  deleteItemAsistencia({ commit }, id) {
    console.log('si', id)
    commit('DELETE_ITEM_ASISTENCIA', id)
  },

  emptyAsistencia({ commit }) {
    commit('EMPTY_ASISTENCIA')
  },
}

// getters
const getters = {
  itemsAsistencia: state => {
    return state.items
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
