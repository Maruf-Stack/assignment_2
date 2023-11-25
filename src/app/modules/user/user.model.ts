import { Schema, model } from 'mongoose'
import {
  Address,
  FullName,
  IUser,
  Orders,
  SUserModel,
  UserMethod,
} from './user.interface'

import bcrypt from 'bcrypt'
import config from '../../config'
const userNameSchema = new Schema<FullName>(
  {
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
  },
  { _id: false },
)

const addressSchema = new Schema<Address>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false },
)

const orderSchema = new Schema<Orders>([
  {
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  },
])

const userSchema = new Schema<IUser, SUserModel, UserMethod>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: {
    type: String,
    required: [true, 'password is required'],
    select: false,
  },
  fullName: { type: userNameSchema },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: { type: addressSchema },
  orders: { type: [orderSchema] },
})

//instance
userSchema.methods.isUserExist = async function (id: string | number) {
  const existingUser = await UserModel.findOne({ userId: id })
  return existingUser
}
//static
userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await UserModel.findOne({ userId: id })
  return existingUser
}
userSchema.post('save', async function (doc, next) {
  doc.password = ''
  next()
})
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_sort_round),
  )
  next()
})

export const UserModel = model<IUser, SUserModel>('Users', userSchema)
