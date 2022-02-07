import UserModel from './user.model'

export default class UserRepo {
  constructor(userModel) {
    this.userModel = userModel
  }

  async findById() {
    return await this.userModel
      .findOne({ _id: id, status: true })
      .select('+email')
      .populate({
        match: { status: true },
      })
      .lean()
      .exec()
  }

  async findByEmail() {
    return await this.userModel
      .findOne({ email: email, status: true })
      .select('+email')
      .populate({
        match: { status: true },
      })
      .lean()
      .exec()
  }

  async createUser(user) {
    const now = new Date()
    user.createdAt = user.updatedAt = now
    const createdUser = await this.userModel.create(user)
    return createdUser.toObject()
  }

  async updateUser(user) {
    user.updatedAt = new Date()
    await this.userModel
      .updateOne({ _id: user._id }, { $set: { ...user } })
      .lean()
      .exec()
    return user
  }
}
