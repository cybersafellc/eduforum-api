import usersService from "../services/users.service.js";

async function oAuthGoogle(req, res, next) {
	try {
		const response = await usersService.oAuthGoogle(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

async function createMahasiswa(req, res, next) {
	try {
		console.log(req.body);
		req.body.role = "mahasiswa";
		const response = await usersService.create(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

async function createDosen(req, res, next) {
	try {
		req.body.role = "dosen";
		const response = await usersService.create(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

async function login(req, res, next) {
	try {
		const response = await usersService.login(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

async function verify(req, res, next) {
	try {
		const response = await usersService.verify(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

async function getProfile(req, res, next) {
	try {
		const response = await usersService.getProfile(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

async function updateProfile(req, res, next) {
	try {
		req.body.id = await req.id;
		req.body.role = await req.role;
		if (req?.file?.filename) {
			req.body.profile_url = process.env.PATHPHOTO + req.file.filename;
		}
		const response = await usersService.updateProfile(req.body);
		res.status(response.status).json(response).end();
	} catch (error) {
		next(error);
	}
}

export default {
	oAuthGoogle,
	createMahasiswa,
	createDosen,
	login,
	verify,
	getProfile,
	updateProfile,
};
