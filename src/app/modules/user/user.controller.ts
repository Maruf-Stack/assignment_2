import { Request, Response } from 'express'
import { userServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const result = await userServices.createUser(user)
    res.status(400).json({
      success: true,
      message: 'student is created succesfully',
      data: result,
    })
    return result
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'cannot create user',
      error: err,
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getAllUsers()
    const resdata = users.map((user) => ({
      username: user.username,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      address: user.address,
    }))

    res.status(400).json({
      success: true,
      message: 'users retrived successfully',
      data: resdata,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'cannot get users',
      error: err,
    })
  }
}
export const userController = {
  createUser,
  getAllUsers,
}
