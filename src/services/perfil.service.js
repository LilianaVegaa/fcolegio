import ApiService from './api.service'

const PerfilService = {
  listPerfiles: async function() {
    try {
      const response = await ApiService.get('/perfiles/listing')
      return response
    } catch (error) {
      console.log(error)
    }
  },

  showPerfil: async function(url) {
    try {
      const response = await ApiService.get(url)
      return response
    } catch (error) {
      console.log(error)
    }
  },

  storePerfil: async function(data) {
    try {
      const response = await ApiService.post('/perfiles', data)
      return response
    } catch (error) {
      throw error
    }
  },

  updatePerfil: async function(id, data) {
    try {
      const response = await ApiService.put(`/perfiles/${id}`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  deletePerfil: async function(data) {
    try {
      const response = await ApiService.deleteParams('/perfiles', {data: {perfiles: data}})
      return response
    } catch (error) {
      console.log(error)
    }
  },
}

export default PerfilService
