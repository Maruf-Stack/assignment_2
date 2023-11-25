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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'cannot create user',
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'cannot get users',
      error: err,
    })
  }
}
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await userServices.getSingleUser(userId)
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'user not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
      return 0
    }
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
      data: null,
    })
  }
}
//delete operation

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await userServices.deleteUser(userId)
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'user not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
      return 0
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
      data: null,
    })
  }
}
//update operation

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const data = req.body
    const result = await userServices.updateUser(userId, data)
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err,
      error: {
        code: 500,
        description: 'User not updated!',
      },
    })
  }
}
export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
}
