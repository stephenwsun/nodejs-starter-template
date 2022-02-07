import logger from '../core/logger'

export default class UserController {
  constructor(userService) {
    this.userService = userService
  }

  async getUserById(req, res) {
    if (!req.params.id) {
      logger.error('Missing query param id')
      res.status(400).send('Missing query param id')
    }

    const user = await this.userService.getUserById(req.params.id)
    res.send(user)
  }

  async getUserByEmail(req, res) {
    if (!req.params.email) {
      logger.error('Missing query param email')
      res.status(400).send('Missing query param email')
    }

    const user = await this.userService.getUserByEmail(req.params.email)
    res.send(user)
  }

  async createUser(req, res) {
    if (!req.body) {
      logger.error('Missing user in body')
      res.status(400).send('Missing user in body')
    }
    const user = await this.userService.createUser(req.body)
    res.send(user)
  }

  async updateUser(req, res) {
    if (!req.body) {
      logger.error('Missing user in body')
      res.status(500).send('Missing user in body')
    }
    const user = await this.userService.updateUser(req.body)
    res.send(user)
  }
}
