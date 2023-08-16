import Joi from 'joi';

const getTxListNormal = Joi.object({
    address: Joi.string().required()
})

export default { getTxListNormal };