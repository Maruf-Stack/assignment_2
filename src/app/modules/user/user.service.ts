import { IUser, Orders } from './user.interface'
import { UserModel } from './user.model'

const createUser = async (userData: IUser) => {
  const user = new UserModel(userData)
  if (await user.isUserExist(userData.userId)) {
    throw new Error('User already exist')
  }
  const result = await user.save()
  const Tresult = await UserModel.findOne(
    { _id: result._id },
    { password: false },
  )

  return Tresult
}

const getAllUsers = async () => {
  const result = await UserModel.find().select('-password')

  return result
}
const getSingleUser = async (id: string) => {
  const result = await UserModel.findOne({ userId: id }, { password: false })

  return result
}
const deleteUser = async (id: string) => {
  const result = await UserModel.deleteOne({ userId: id })

  return result
}
//update user

const updateUser = async (userId: number, data: Partial<IUser>) => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $set: data },
    {
      new: true,
      runValidators: true,
      projection: { password: 0 },
    },
  )

  return result
}

//add new product in order
const addNewOrder = async (id: number, data: Orders) => {
  const result = await UserModel.findOneAndUpdate(
    { userId: id },
    { $push: { orders: data } },
    { new: true, runValidators: true },
  )
  return result
}

//getallOrders

const getallOrders = async (userId: number) => {
  const result = await UserModel.aggregate([
    { $match: { userId } },
    { $project: { orders: true, _id: 0 } },
  ])
  return result
}

//calculate the total price

const calculateTotalPrice = async (userId: number) => {
  const result = await UserModel.aggregate([
    { $match: { userId } },
    {
      $facet: {
        firstStage: [
          {
            $unwind: '$orders',
          },
          {
            $group: {
              _id: null,
              totalPrice: {
                $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
              },
            },
          },
          { $project: { totalPrice: true, _id: 0 } },
        ],
        secondStage: [{ $project: { username: true } }],
      },
    },
  ])
  return result
}
export const userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  addNewOrder,
  getallOrders,
  calculateTotalPrice,
}
