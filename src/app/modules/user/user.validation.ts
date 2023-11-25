import Joi from 'joi'

// fullName
const fullNameValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
})

//address
const addressValidationSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
})

const orderValidationSchema = Joi.object({
  productName: Joi.string(),
  price: Joi.number(),
  quantity: Joi.number(),
})

// user validation schema
const userValidationSchema = Joi.object({
  userId: Joi.number().integer().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: fullNameValidationSchema.required(),
  age: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()),
  address: addressValidationSchema.required(),
  order: orderValidationSchema.optional(),
})

export default userValidationSchema
