import Joi from 'joi';

const getTxListInternal = Joi.object({
    address: Joi.string().required()
})

export default { getTxListInternal };