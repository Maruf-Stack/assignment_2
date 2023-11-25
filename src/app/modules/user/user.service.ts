import { IUser } from './user.interface'
import { UserModel } from './user.model'

const createUser = async (userData: IUser) => {
  const student = new UserModel(userData)
  if (await student.isUserExist(userData.userId)) {
    throw new Error('User already exist')
  }
  const result = await student.save()

  return result
}

const getAllUsers = async () => {
  const result = await UserModel.find().select('-password')
  return result
}
const getSingleUser = async (id: string) => {
  const result = await UserModel.findOne({ userId: id })

  return result
}
const deleteUser = async (id: string) => {
  const result = await UserModel.deleteOne({ userId: id })

  return result
}

const updateUser = async (userId: string, data: IUser) => {
  const result = await UserModel.findByIdAndUpdate(
    { userId },
    { $set: data },
    { new: true },
  )
  return result
}

//add new product in order

export const userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
}
