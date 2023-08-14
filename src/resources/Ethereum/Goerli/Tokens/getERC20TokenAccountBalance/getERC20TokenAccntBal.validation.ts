import Joi from 'joi';

const getERC20TokenAccountBalance = Joi.object({
    contractAddress: Joi.string().required(),
    address: Joi.string().required(),
})

export default { getERC20TokenAccountBalance }