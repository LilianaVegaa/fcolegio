// state
const state = {
  items: [],
}

// mutations
const mutations = {
  SET_ITEM_CURSO (state, data) {
    let obj = {
      id: data.id,
      nombre: data.nombre,
      registrado: data.registrado,
      actualizado: data.actualizado,
    }
    const flag = state.items.some(item => item.id === obj.id)
    if (!flag) state.items.push(obj)
  },

  DELETE_ITEM_CURSO (state, id) {
    state.items.splice(id, 1)
  },

  EMPTY_CURSO (state) {
    state.items = []
  },
}

// actions
const actions = {
  setItemCurso({ commit }, data) {
    commit('SET_ITEM_CURSO', data)
  },

  deleteItemCurso({ commit }, id) {
    commit('DELETE_ITEM_CURSO', id)
  },

  emptyCurso({ commit }) {
    commit('EMPTY_CURSO')
  },
}

// getters
const getters = {
  itemsCurso: state => {
    return state.items
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
