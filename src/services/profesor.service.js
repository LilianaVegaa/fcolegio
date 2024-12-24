import ApiService from './api.service'

const ProfesorService = {
  showProfesor: async function(url) {
    try {
      const response = await ApiService.get(url)
      return response
    } catch (error) {
      throw error
    }
  },

  storeProfesor: async function(data) {
    try {
      const response = await ApiService.post('/profesores', data)
      return response
    } catch (error) {
      throw error
    }
  },

  updateProfesor: async function(id, data) {
    try {
      const response = await ApiService.put(`/profesores/${id}`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  deleteProfesor: async function(data) {
    try {
      const response = await ApiService.deleteParams('/profesores', {data: {profesores: data}})
      return response
    } catch (error) {
      throw error
    }
  },

  listProfesores: async function() {
    try {
      const response = await ApiService.get('/profesores/listing')
      return response
    } catch (error) {
      throw error
    }
  },
}

export default ProfesorService
