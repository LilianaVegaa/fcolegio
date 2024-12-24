import ApiService from './api.service'

const ConfigService = {
  getCurrentConfig: async function(url) {
    try {
      const response = await ApiService.get(url)
      return response
    } catch (error) {
      throw error
    }
  },

  getStepConfig: async function(url) {
    try {
      const response = await ApiService.get(url)
      return response
    } catch (error) {
      throw error
    }
  },

  updateConfig: async function(id, data) {
    try {
      const response = await ApiService.put(`/configs/${id}`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  checkConfig: async function() {
    try {
      const response = await ApiService.get('/configs/check')
      return response
    } catch (error) {
      throw error
    }
  }
}

export default ConfigService