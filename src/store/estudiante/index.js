// state
const state = {
  items: [],
}

// mutations
const mutations = {
  SET_ITEM_ESTUDIANTE (state, data) {
    let obj = {
      id: data.id,
      nombres: data.nombres,
      apellidos: data.apellidos,
      teléfono: data.telefono,
      ci: data.ci,
    }
    const flag = state.items.some(item => item.id === obj.id)
    console.log(obj.id)
    if (!flag) state.items.push(obj)
  },

  DELETE_ITEM_ESTUDIANTE (state, id) {
    state.items.splice(id, 1)
  },

  EMPTY_ESTUDIANTE (state) {
    state.items = []
  },
}

// actions
const actions = {
  setItemEstudiante({ commit }, data) {
    commit('SET_ITEM_ESTUDIANTE', data)
  },

  deleteItemEstudiante({ commit }, id) {
    commit('DELETE_ITEM_ESTUDIANTE', id)
  },

  emptyEstudiante({ commit }) {
    commit('EMPTY_ESTUDIANTE')
  },
}

// getters
const getters = {
  itemsEstudiante: state => {
    return state.items
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
