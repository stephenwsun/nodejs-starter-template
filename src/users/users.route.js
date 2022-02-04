import express from 'express'
import UserController from './users.controller'

const router = express.Router()

router.get('/:id', UserController.getUserById)
router.get('/:email', UserController.getUserByEmail)
router.post('/', UserController.createUser)
router.gut('/', UserController.updateUser)

export default router
