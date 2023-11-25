import express from 'express'
import { userController } from './user.controller'
const router = express.Router()
router.post('/', userController.createUser)

router.get('/:userId', userController.getSingleUser)
router.delete('/:userId', userController.deleteUser)
router.get('/', userController.getAllUsers)
router.put('/:userId', userController.updateUser)

export const userRouter = router
