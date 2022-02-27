import { setupDB } from '../test-setup'
import userService from './user.service'
import userRepo from './user.repo'

const DB_NAME = 'test'

const mockUser = {
  firstName: 'Stephen',
  lastName: 'Sun',
  email: 'test@gmail.com',
  status: true,
}

setupDB(DB_NAME)

describe('User service', () => {
  it('should create a user', async () => {
    const createdUser = await userService.createUser(mockUser)
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

describe('User repo', () => {
  it('should create a user', async () => {
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
