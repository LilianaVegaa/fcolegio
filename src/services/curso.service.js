import ApiService from './api.service'

const CursoService = {
  showCurso: async function(url) {
    try {
      const response = await ApiService.get(url)
      return response
    } catch (error) {
      throw error
    }
  },

  storeCurso: async function(data) {
    try {
      const response = await ApiService.post('/cursos', data)
      return response
    } catch (error) {
      throw error
    }
  },

  updateCurso: async function(id, data) {
    try {
      const response = await ApiService.put(`/cursos/${id}`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  deleteCurso: async function(data) {
    try {
      const response = await ApiService.deleteParams('/cursos', {data: {cursos: data}})
      return response
    } catch (error) {
      throw error
    }
  },

  listCursos: async function() {
    try {
      const response = await ApiService.get('/cursos/listing')
      return response
    } catch (error) {
      throw error
    }
  },
}

export default CursoService
