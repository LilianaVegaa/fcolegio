// state
const state = {
  items: [],
}

// mutations
const mutations = {
  SET_ITEM_EVALUACION (state, data) {
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

  DELETE_ITEM_EVALUACION (state, id) {
    state.items.splice(id, 1)
  },

  EMPTY_EVALUACION (state) {
    state.items = []
  },
}

// actions
const actions = {
  setItemEvaluacion({ commit }, data) {
    commit('SET_ITEM_EVALUACION', data)
  },

  deleteItemEvaluacion({ commit }, id) {
    console.log('si', id)
    commit('DELETE_ITEM_EVALUACION', id)
  },

  emptyEvaluacion({ commit }) {
    commit('EMPTY_EVALUACION')
  },
}

// getters
const getters = {
  itemsEvaluacion: state => {
    return state.items
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
