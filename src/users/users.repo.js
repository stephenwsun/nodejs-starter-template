import UserModel from './users.model'

export default class UserRepo {
  async findById() {
    return await UserModel.findOne({ _id: id, status: true })
      .select('+email')
      .populate({
        match: { status: true },
      })
      .lean()
      .exec()
  }

  async findByEmail() {
    UserModel.findOne({ email: email, status: true })
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
    const createdUser = await UserModel.create(user)
    return createdUser.toObject()
  }

  async updateUser(user) {
    user.updatedAt = new Date()
    await UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
      .lean()
      .exec()
    return user
  }
}
