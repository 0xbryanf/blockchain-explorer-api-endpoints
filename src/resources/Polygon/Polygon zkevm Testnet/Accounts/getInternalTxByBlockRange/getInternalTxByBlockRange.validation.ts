import Joi from 'joi';

const getTxByBlockRange = Joi.object({
    startblock: Joi.number().required(),
    endblock: Joi.number().required()
})

export default { getTxByBlockRange };