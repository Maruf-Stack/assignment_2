import { Request } from 'express'
import { userServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user
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
export const userController = {
  createUser,
}
