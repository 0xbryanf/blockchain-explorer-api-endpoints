import Joi from 'joi';

const getERC20Tx = Joi.object({
    contractaddress: Joi.string().required(),
    address: Joi.string().required()
})

export default { getERC20Tx };