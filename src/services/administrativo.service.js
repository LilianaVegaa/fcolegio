import ApiService from './api.service'

const AdministrativoService = {
  showAdministrativo: async function(url) {
    try {
      const response = await ApiService.get(url)
      return response
    } catch (error) {
      throw error
    }
  },

  storeAdministrativo: async function(data) {
    try {
      const response = await ApiService.post('/administrativos', data)
      return response
    } catch (error) {
      throw error
    }
  },

  updateAdministrativo: async function(id, data) {
    try {
      const response = await ApiService.put(`/administrativos/${id}`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  deleteAdministrativo: async function(data) {
    try {
      const response = await ApiService.deleteParams('/administrativos', {data: {administrativos: data}})
      return response
    } catch (error) {
      throw error
    }
  },
}

export default AdministrativoService
