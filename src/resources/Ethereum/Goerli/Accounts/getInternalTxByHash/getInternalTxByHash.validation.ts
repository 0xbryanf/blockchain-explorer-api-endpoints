import Joi from 'joi';

const getTxByHash = Joi.object({
    txHash: Joi.string().required()
})

export default { getTxByHash };