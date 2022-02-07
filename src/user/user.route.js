import express from 'express'
import UserController from './user.controller'
import UserService from './user.service'
import UserRepo from './user.repo'
import UserModel from './user.model'

const router = express.Router()
const userRepo = new UserRepo(UserModel)
const userService = new UserService(userRepo)
const userController = new UserController(userService)

console.log('userController: ', userController)

router.get('/:id', (req, res) => userController.getUserById(req, res))
router.get('/:email', (req, res) => userController.getUserByEmail(req, res))
router.post('/', (req, res) => userController.createUser(req, res))
router.put('/', (req, res) => userController.updateUser(req, res))

export default router
