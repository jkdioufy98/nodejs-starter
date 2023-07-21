import Joi from "joi";

const saveRole = Joi.object({
    code: Joi.string().required(),
    libelle: Joi.string().required()
})

export default { saveRole };