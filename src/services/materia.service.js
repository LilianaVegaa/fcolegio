import ApiService from './api.service'

const MateriaService = {
  showMateria: async function(url) {
    try {
      const response = await ApiService.get(url)
      return response
    } catch (error) {
      throw error
    }
  },

  storeMateria: async function(data) {
    try {
      const response = await ApiService.post('/materias', data)
      return response
    } catch (error) {
      throw error
    }
  },

  updateMateria: async function(id, data) {
    try {
      const response = await ApiService.put(`/materias/${id}`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  deleteMateria: async function(data) {
    try {
      const response = await ApiService.deleteParams('/materias', {data: {materias: data}})
      return response
    } catch (error) {
      throw error
    }
  },

  listMaterias: async function() {
    try {
      const response = await ApiService.get('/materias/listing')
      return response
    } catch (error) {
      throw error
    }
  },
}

export default MateriaService
