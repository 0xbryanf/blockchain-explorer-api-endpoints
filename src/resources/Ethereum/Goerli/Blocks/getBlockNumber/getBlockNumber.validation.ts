import Joi from 'joi';

const getBlockNumber = Joi.object({
    timeStamp: Joi.number().required(),
})

export default { getBlockNumber }