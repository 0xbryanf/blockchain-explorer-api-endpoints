import Joi from 'joi';

const getTxReceiptStatus = Joi.object({
    txHash: Joi.string().required(),
})

export default { getTxReceiptStatus }