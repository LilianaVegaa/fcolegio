import ApiService from './api.service'

const GestionService = {
  showGestion: async function(url) {
    try {
      const response = await ApiService.get(url)
      return response
    } catch (error) {
      throw error
    }
  },

  storeGestion: async function(data) {
    try {
      const response = await ApiService.post('/gestiones', data)
      return response
    } catch (error) {
      throw error
    }
  },

  updateGestion: async function(id, data) {
    try {
      const response = await ApiService.put(`/gestiones/${id}`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  deleteGestion: async function(data) {
    try {
      const response = await ApiService.deleteParams('/gestiones', {data: {gestiones: data}})
      return response
    } catch (error) {
      throw error
    }
  },

  listGestiones: async function() {
    try {
      const response = await ApiService.get('/gestiones/listing')
      return response
    } catch (error) {
      throw error
    }
  },

  listingGeneral: async function() {
    try {
      const response = await ApiService.get('/gestiones/general/listing')
      return response
    } catch (error) {
      throw error
    }
  }
}

export default GestionService
