import ApiService from './api.service'

const AsistenciaService = {
  storeAsistencia: async function(data) {
    try {
      const response = await ApiService.post('/asistencias', data)
      return response
    } catch (error) {
      throw error
    }
  },

  updateAsistencia: async function(id, data) {
    try {
      const response = await ApiService.put(`/asistencias/${id}`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  deleteAsistencia: async function(data) {
    try {
      const response = await ApiService.deleteParams('/asistencias', {data: {asistencias: data}})
      return response
    } catch (error) {
      throw error
    }
  },

  getAsistenciasByCurso: async function(data) {
    try {
      const response = await ApiService.post('/asistencias/curso/materia', data)
      return response
    } catch (error) {
      throw error
    }
  },

  getAsistenciasDetalle: async function(data) {
    try {
      const response = await ApiService.post('/asistencias/detalle', data)
      return response
    } catch (error) {
      throw error
    }
  },
}

export default AsistenciaService
