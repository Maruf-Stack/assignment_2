import { Request, Response } from 'express'
import { userServices } from './user.service'
import { validationSchemas } from './user.validation'

//creating a user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body

    const { error, value } =
      validationSchemas.userValidationSchema.validate(user)
    console.log(value)
    const result = await userServices.createUser(value)
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
//get all users
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
//get single user
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
    const userId = Number(req.params.userId)
    const data = req.body
    const { error, value } =
      validationSchemas.userUpdateValidationschema.validate(data)
    const result = await userServices.updateUser(userId, value)

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
      return 0
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
      error: {
        code: 500,
        description: 'User not updated!',
      },
    })
  }
}

//add new order
const addNewOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId)
    const data = req.body
    const result = await userServices.addNewOrder(userId, data)

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
      return 0
    }

    res.status(200).json({
      success: true,
      message: 'order created successfully!',
      data: null,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
      error: {
        code: 500,
        description: 'something went wrong!',
      },
    })
  }
}

//getallOrders

const getallOrders = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId)
    const result = await userServices.getallOrders(userId)
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
      return 0
    }

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
      error: {
        code: 500,
        description: 'something went wrong!',
      },
    })
  }
}
//calculateTotal price
const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId)
    const result = await userServices.calculateTotalPrice(userId)

    if (result[0].secondStage.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
      return 0
    }

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result[0].firstStage,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
      error: {
        code: 500,
        description: 'something went wrong!',
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
  addNewOrder,
  getallOrders,
  calculateTotalPrice,
}
