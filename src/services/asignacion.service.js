import ApiService from './api.service'

const AsignacionService = {
  showAsignacion: async function(url) {
    try {
      const response = await ApiService.get(url)
      return response
    } catch (error) {
      throw error
    }
  },

  storeAsignacion: async function(data) {
    try {
      const response = await ApiService.post('/asignaciones', data)
      return response
    } catch (error) {
      throw error
    }
  },

  updateAsignacion: async function(id, data) {
    try {
      const response = await ApiService.put(`/asignaciones/${id}`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  deleteAsignacion: async function(data) {
    try {
      const response = await ApiService.deleteParams('/asignaciones', {data: {asignaciones: data}})
      return response
    } catch (error) {
      throw error
    }
  },
}

export default AsignacionService
