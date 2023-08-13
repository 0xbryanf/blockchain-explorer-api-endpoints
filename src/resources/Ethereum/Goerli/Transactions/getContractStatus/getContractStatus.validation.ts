import Joi from 'joi';

const getContractStatus = Joi.object({
    txHash: Joi.string().required(),
})

export default { getContractStatus }