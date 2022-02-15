import logger from '../core/logger'
import userRepo from './user.repo'

class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo
  }

  async getUserById(id) {
    const user = await this.userRepo.findById(id)
    logger.debug('User by id: ', user)
    return user
  }

  async getUserByEmail(email) {
    const user = await this.userRepo.findByEmail(email)
    logger.debug('User by email: ', user)
    return user
  }

  async createUser(user) {
    const createdUser = await this.userRepo.createUser(user)
    logger.debug('Created user: ', createdUser)
    return createdUser
  }

  async updateUser(user) {
    const updatedUser = await this.userRepo.updateUser(user)
    logger.debug('Updated user: ', updatedUser)
    return updatedUser
  }
}

const userService = new UserService(userRepo)
export default userService
