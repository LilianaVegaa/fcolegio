import ApiService from './api.service'

const EstudianteService = {
  showEstudiante: async function(url) {
    try {
      const response = await ApiService.get(url)
      return response
    } catch (error) {
      throw error
    }
  },

  storeEstudiante: async function(data) {
    try {
      const response = await ApiService.post('/estudiantes', data)
      return response
    } catch (error) {
      throw error
    }
  },

  updateEstudiante: async function(id, data) {
    try {
      const response = await ApiService.put(`/estudiantes/${id}`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  deleteEstudiante: async function(data) {
    try {
      const response = await ApiService.deleteParams('/estudiantes', {data: {estudiantes: data}})
      return response
    } catch (error) {
      throw error
    }
  },

  listEstudiantes: async function() {
    try {
      const response = await ApiService.get('/estudiantes/listing')
      return response
    } catch (error) {
      throw error
    }
  },
}

export default EstudianteService
