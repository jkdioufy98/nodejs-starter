import Joi from 'joi';

const create = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstLog: Joi.boolean(),
    status: Joi.boolean(),
    phone: Joi.string().required(),
    address: Joi.string().required()
})

export default { create };