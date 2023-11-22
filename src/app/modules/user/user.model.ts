import { Schema, model } from 'mongoose'
import { Address, FullName, IUser, Orders } from './user.interface'

const userNameSchema = new Schema<FullName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
})

const addressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
})

const orderSchema = new Schema<Orders>([
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
])

const userSchema = new Schema<IUser>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: { type: userNameSchema },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: { type: addressSchema },
  orders: { type: [orderSchema] },
})

export const UserModel = model('Users', userSchema)
