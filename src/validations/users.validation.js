import Joi from "joi";

const oAuthGoogle = Joi.object({
	idToken: Joi.string().required(),
});

const create = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	full_name: Joi.string().required(),
	nidn_or_nim: Joi.string().required(),
	nama_perguruan_tinggi: Joi.string().required(),
	role: Joi.string().required(),
});

const login = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
});

const verify = Joi.object({
	id: Joi.string().required(),
	role: Joi.string().required(),
});

const getProfile = Joi.object({
	id: Joi.string().required(),
	role: Joi.string().required(),
});

const updateProfile = Joi.object({
	id: Joi.string().required(),
	role: Joi.string().required(),
	full_name: Joi.string().optional(),
	nidn_or_nim: Joi.string().optional(),
	nama_perguruan_tinggi: Joi.string().optional(),
	profile_url: Joi.string().optional(),
});

export default {
	oAuthGoogle,
	create,
	login,
	verify,
	getProfile,
	updateProfile,
};
