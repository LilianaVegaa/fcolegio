import ApiService from './api.service'

const TutorService = {
  showTutor: async function(url) {
    try {
      const response = await ApiService.get(url)
      return response
    } catch (error) {
      throw error
    }
  },

  storeTutor: async function(data) {
    try {
      const response = await ApiService.post('/tutores', data)
      return response
    } catch (error) {
      throw error
    }
  },

  updateTutor: async function(id, data) {
    try {
      const response = await ApiService.put(`/tutores/${id}`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  deleteTutor: async function(data) {
    try {
      const response = await ApiService.deleteParams('/tutores', {data: {tutores: data}})
      return response
    } catch (error) {
      throw error
    }
  },

  listTutores: async function() {
    try {
      const response = await ApiService.get('/tutores/listing')
      return response
    } catch (error) {
      throw error
    }
  },
}

export default TutorService
