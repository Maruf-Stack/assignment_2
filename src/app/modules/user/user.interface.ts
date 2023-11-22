export interface FullName {
  firstName: string
  lastName: string
}
export interface IUser {
  userId: number
  username: string
  password: string
  fullName: FullName
  age: number
  email: string
  isActive: boolean
}
