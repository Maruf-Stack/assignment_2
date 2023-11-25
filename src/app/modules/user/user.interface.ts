import { Model } from 'mongoose'

export interface FullName {
  firstName: string
  lastName: string
}
export interface Address {
  street: string
  city: string
  country: string
}
export type Orders = [
  {
    productName: string
    price: number
    quantity: number
  },
]
export interface IUser {
  userId: number
  username: string
  password: string
  fullName: FullName
  age: number
  email: string
  isActive: boolean
  hobbies: Array<string>
  address: Address
  orders?: Orders
}
//instace

export type UserMethod = {
  isUserExist(id: string | number): Promise<IUser | null>
}

export type SUserModel = Model<IUser, Record<string, never>, UserMethod>
