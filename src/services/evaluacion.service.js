import ApiService from './api.service'

const EvaluacionService = {
  storeEvaluacion: async function(data) {
    try {
      const response = await ApiService.post('/evaluaciones', data)
      return response
    } catch (error) {
      throw error
    }
  },

  updateEvaluacion: async function(id, data) {
    try {
      const response = await ApiService.put(`/evaluaciones/${id}`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  deleteEvaluacion: async function(data) {
    try {
      const response = await ApiService.deleteParams('/evaluaciones', {data: {evaluaciones: data}})
      return response
    } catch (error) {
      throw error
    }
  },

  getEvaluacionesByCurso: async function(data) {
    try {
      const response = await ApiService.post('/evaluaciones/curso/materia', data)
      return response
    } catch (error) {
      throw error
    }
  },

  getEvaluacionesDetalle: async function(data) {
    try {
      const response = await ApiService.post('/evaluaciones/detalle', data)
      return response
    } catch (error) {
      throw error
    }
  },
}

export default EvaluacionService
