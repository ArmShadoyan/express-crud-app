import Joi from "joi";


//validations for user data
const userSchema = Joi.object({
    name:Joi.string().min(3).required(),
    surname:Joi.string().min(3).required(),
    login:Joi.string().min(3).required(),
    password:Joi.string().min(3).max(13).lowercase().uppercase().required(),
    email:Joi.string().email().required()
})

export default userSchema;
