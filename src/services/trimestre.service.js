import ApiService from './api.service'

const TrimestreService = {
  showTrimestre: async function(url) {
    try {
      const response = await ApiService.get(url)
      return response
    } catch (error) {
      throw error
    }
  },

  storeTrimestre: async function(data) {
    try {
      const response = await ApiService.post('/trimestres', data)
      return response
    } catch (error) {
      throw error
    }
  },

  updateTrimestre: async function(id, data) {
    try {
      const response = await ApiService.put(`/trimestres/${id}`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  deleteTrimestre: async function(data) {
    try {
      const response = await ApiService.deleteParams('/trimestres', {data: {trimestres: data}})
      return response
    } catch (error) {
      throw error
    }
  },
}

export default TrimestreService
