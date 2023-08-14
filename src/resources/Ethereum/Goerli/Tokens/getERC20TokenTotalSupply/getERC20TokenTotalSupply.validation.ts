import Joi from 'joi';

const getERC20TokenTotalSupply = Joi.object({
    contractAddress: Joi.string().required(),
})

export default { getERC20TokenTotalSupply }