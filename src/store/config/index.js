  // state se creo para el plan de cuentas pero se puede usar para manejar estados de otras configuraciones
  const state = {
    oldPlans: [],
  }
  
  // mutations
  const mutations = {
    SET_OLD_PLANS(state, data) {
      state.oldPlans = data
    },
  }
  
  // actions
  const actions = {
    setOldPlans({ commit }, data) {
      commit('SET_OLD_PLANS', data)
    },
  }
  
  // getters
  const getters = {
    oldPlans: state => {
      return state.oldPlans.map(i => Object.freeze(i))
    }
  }
  
  export default {
    state,
    mutations,
    actions,
    getters
  }