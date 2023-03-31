import Joi from 'joi';

const register = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required().max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required()
})

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export default { register, login };