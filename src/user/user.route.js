import express from 'express'
import UserController from './user.controller'
import UserService from './user.service'
import UserRepo from './user.repo'
import UserModel from './user.model'

const router = express.Router()
const userRepo = new UserRepo(UserModel)
const userService = new UserService(userRepo)
const userController = new UserController(userService)

router.get('/id/:id', (req, res) => userController.getUserById(req, res))
router.get('/email/:email', (req, res) =>
  userController.getUserByEmail(req, res)
)
router.post('/', (req, res) => userController.createUser(req, res))
router.put('/id/:id', (req, res) => userController.updateUser(req, res))

export default router
