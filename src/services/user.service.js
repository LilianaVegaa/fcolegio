import ApiService from './api.service'
import { TokenService } from './storage.service'


class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

const UserService = {
  listUsers: async function() {
    try {
      const response = await ApiService.get('/users/listing')
      return response
    } catch (error) {
      console.log(error)
    }
  },

  listSeller: async function() {
    try {
      const response = await ApiService.get('/users/seller/listing')
      return response
    } catch (error) {
      console.log(error)
    }
  },

  showUser: async function(url) {
    try {
      const response = await ApiService.get(url)
      return response
    } catch (error) {
      console.log(error)
    }
  },

  storeUser: async function(data) {
    try {
      const response = await ApiService.post('/users', data)
      return response
    } catch (error) {
      throw error
    }
  },

  updateUser: async function(id, data) {
    try {
      const response = await ApiService.put(`users/${id}`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  deleteUser: async function(data) {
    try {
      const response = await ApiService.deleteParams('/users', {data: {users: data}})
      return response
    } catch (error) {
      console.log(error)
    }
  },

  changePassword: async function(id, data) {
    try {
      const response = await ApiService.put(`users/${id}/password`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  changeState: async function(id) {
    try {
      const response = await ApiService.put(`users/state/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  login: async function(data) {
    try {
      const response = await ApiService.post('/login', data)
          
      TokenService.saveToken(response.data.access_token)
      TokenService.saveRefreshToken(response.data.refresh_token)

      return response
    } catch (error) {
      throw error
    }
  },

  refreshToken: async function() {
    const refreshToken = TokenService.getRefreshToken()

    const data = { refresh_token: refreshToken }

    try {
      const response = await ApiService.post('/login', data)

      TokenService.saveToken(response.data.access_token)
      TokenService.saveRefreshToken(response.data.refresh_token)

      return response.data.access_token
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.detail)
    }
  },

  logout: async function() {
    try {
      const response = await ApiService.post('/logout')

      TokenService.removeToken()
      TokenService.removeRefreshToken()
      ApiService.removeHeader()

      return response
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.detail)
    }
  }
}

export default UserService

export { UserService, AuthenticationError }