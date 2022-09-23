import Joi from 'joi'

const postChoiceSchema = Joi.object({

    title: Joi.string().required(),
    pollId: Joi.string()

});

export { postChoiceSchema }