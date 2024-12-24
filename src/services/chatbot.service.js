import ApiService from './api.service'

const ChatbotService = {
  getChat: async function(url, data) {
    try {
      const response = await ApiService.post(url, data)
      return response
    } catch (error) {
      throw error
    }
  },
}

export default ChatbotService
