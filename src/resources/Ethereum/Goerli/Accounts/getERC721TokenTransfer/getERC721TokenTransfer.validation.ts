import Joi from 'joi';

const getERC721Tx = Joi.object({
    contractaddress: Joi.string().required(),
    address: Joi.string().required()
})

export default { getERC721Tx };