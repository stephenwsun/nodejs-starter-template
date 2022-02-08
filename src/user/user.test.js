import mongoose from 'mongoose'
import UserController from './user.controller'
import UserService from './user.service'
import UserRepo from './user.repo'
import UserModel from './user.model'
import './../database'

const userRepo = new UserRepo(UserModel)
const userService = new UserService(userRepo)
const userController = new UserController(userService)

const TEST_DB_NAME = 'test'

describe('insert', () => {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${TEST_DB_NAME}`
    await mongoose.connect(url, { useNewUrlParser: true })
  })

  afterEach(async () => {
    await UserModel.deleteMany()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('should insert a doc into collection', async () => {
    const mockUser = {
      firstName: 'Stephen',
      lastName: 'Sun',
      email: 'test@gmail.com',
      status: true,
    }

    const createdUser = await userRepo.createUser(mockUser)
    const insertedUser = await userRepo.findById({ _id: createdUser._id })

    expect(insertedUser._id).toBeTruthy()
    expect(insertedUser.firstName).toBeTruthy()
    expect(insertedUser.lastName).toBeTruthy()
    expect(insertedUser.email).toBeTruthy()
    expect(insertedUser.status).toBeTruthy()

    expect(insertedUser.firstName).toEqual(mockUser.firstName)
    expect(insertedUser.lastName).toEqual(mockUser.lastName)
    expect(insertedUser.email).toEqual(mockUser.email)
    expect(insertedUser.status).toEqual(mockUser.status)
  })
})
