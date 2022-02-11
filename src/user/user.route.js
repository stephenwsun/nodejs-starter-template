import express from 'express'

import userController from './user.controller'

const router = express.Router()

router.get('/id/:id', (req, res) => userController.getUserById(req, res))
router.get('/email/:email', (req, res) =>
  userController.getUserByEmail(req, res)
)
router.post('/', (req, res) => userController.createUser(req, res))
router.put('/id/:id', (req, res) => userController.updateUser(req, res))

export default router
