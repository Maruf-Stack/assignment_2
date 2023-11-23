import { Model, Schema, model } from 'mongoose'
import { Address, FullName, IUser, Orders, SUserModel } from './user.interface'

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
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
])

const userSchema = new Schema<IUser, SUserModel>({
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

// creating static

userSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await UserModel.findOne({ id })
  return existingUser
}

export const UserModel = model<IUser, SUserModel>('Users', userSchema)
