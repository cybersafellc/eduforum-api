import postsService from "../services/posts.service.js";

async function create(req, res, next) {
	try {
		req.body.users_id = await req.id;
		if (req?.file?.filename) {
			req.body.img_url = process.env.PATHPHOTO + req.file.filename;
		}
		const response = await postsService.create(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

async function get(req, res, next) {
	try {
		if (req?.query?.id) {
			req.body.id = req.query.id;
			const response = await postsService.getById(req.body);
			res.status(response.status).json(response).end();
		} else {
			req.body.page = req?.query?.page > 0 ? req.query.page : 1;
			req.body.take = req?.query?.take > 10 ? req.query.take : 10;
			const response = await postsService.get(req.body);
			res.status(response.status).json(response).end();
		}
	} catch (error) {
		next(error);
	}
}

async function likePost(req, res, next) {
	try {
		const response = await postsService.likePost(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

export default { create, get, likePost };
