// state
const state = {
  items: [],
}

// mutations
const mutations = {
  SET_ITEM_PROFESOR (state, data) {
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

  DELETE_ITEM_PROFESOR (state, id) {
    state.items.splice(id, 1)
  },

  EMPTY_PROFESOR (state) {
    state.items = []
  },
}

// actions
const actions = {
  setItemProfesor({ commit }, data) {
    commit('SET_ITEM_PROFESOR', data)
  },

  deleteItemProfesor({ commit }, id) {
    commit('DELETE_ITEM_PROFESOR', id)
  },

  emptyProfesor({ commit }) {
    commit('EMPTY_PROFESOR')
  },
}

// getters
const getters = {
  itemsProfesor: state => {
    return state.items
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
