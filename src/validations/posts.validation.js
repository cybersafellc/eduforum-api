import Joi from "joi";

const create = Joi.object({
	img_url: Joi.string().optional(),
	content: Joi.string().required(),
	users_id: Joi.string().required(),
});

const get = Joi.object({
	page: Joi.number().required(),
	take: Joi.number().required(),
});

const getById = Joi.object({
	id: Joi.string().required(),
});

const likePost = Joi.object({
	id: Joi.string().required(),
	role: Joi.string().required(),
	post_id: Joi.string().required(),
});

export default {
	create,
	get,
	getById,
	likePost,
};