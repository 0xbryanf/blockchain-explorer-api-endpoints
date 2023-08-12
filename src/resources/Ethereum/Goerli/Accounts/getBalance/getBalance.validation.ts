import Joi from 'joi';

const getBalance = Joi.object({
    address: Joi.string().required(),
})

export default { getBalance }