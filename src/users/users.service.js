import logger from '../core/logger'
import UserRepo from './users.repo'

export default class UserService {
  async getUserById() {
    const user = await UserRepo.findById()
    logger.debug('User by id: ' + user)
    return user
  }

  async getUserByEmail() {
    const user = await UserRepo.findByEmail()
    logger.debug('User by email: ' + user)
    return user
  }

  async createUser() {
    const createdUser = await UserRepo.createUser()
    logger.debug('Created user: ' + createdUser)
    return createdUser
  }

  async updateUser() {
    const updatedUser = await UserRepo.updateUser()
    logger.debug('Updated user: ' + updatedUser)
    return updatedUser
  }
}
