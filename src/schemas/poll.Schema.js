import Joi from 'joi';

const postPollSchema = Joi.object({

    title: Joi.string().required(),
    expireAt: Joi.string().empty('').default('default value'),

});


export {postPollSchema}