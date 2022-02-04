import logger from '../core/logger'
import UserService from './users.service'

export default class UserController {
  async getUserById(req, res) {
    if (!req.params.id) {
      logger.error('Missing query param id')
      res.status(400).send('Missing query param id')
    }

    return await UserService.getUserById()
  }

  async getUserByEmail(req, res) {
    if (!req.params.email) {
      logger.error('Missing query param email')
      res.status(400).send('Missing query param email')
    }

    return await UserService.getUserByEmail()
  }

  async createUser(req, res) {
    if (!req.params.email) {
      logger.error('Missing user in body')
      res.status(400).send('Missing user in body')
    }

    return await UserService.createUser()
  }

  async updateUser(req, res) {
    if (!req.body) {
      logger.error('Missing user in body')
      res.status(500).send('Missing user in body')
    }
    return await UserService.updateUser()
  }
}
