import express from 'express'
import { userController } from './user.controller'
const router = express.Router()
router.post('/', userController.createUser)
router.delete('/:userId', userController.deleteUser)
router.get('/:userId', userController.getSingleUser)
router.get('/', userController.getAllUsers)
router.get('/:userId/orders', userController.getallOrders)
router.get('/:userId/orders/total-price', userController.calculateTotalPrice)
router.put('/:userId', userController.updateUser)
router.put('/:userId/orders', userController.addNewOrder)

export const userRouter = router
