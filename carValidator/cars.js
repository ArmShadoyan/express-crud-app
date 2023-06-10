import Joi from "joi";

const CarShema = Joi.object({
    name:Joi.string().lowercase().required(),
    model:Joi.string().lowercase(),
    color:Joi.string().lowercase(),
    speed:Joi.number(),
    date:Joi.string()
})

export default CarShema;