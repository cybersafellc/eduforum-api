import { oAuth2Client } from "../app/googleapi.js";
import { ResponseError } from "../errors/response-error.js";
import { Response } from "../success/response.js";
import usersValidation from "../validations/users.validation.js";
import { validation } from "../validations/validation.js";
import { database } from "../app/database.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

async function oAuthGoogle(request) {
	const result = await validation(usersValidation.oAuthGoogle, request);
	const CLIENT_ID = process.env.CLIENT_ID;
	let ticket;
	try {
		ticket = await oAuth2Client.verifyIdToken({
			idToken: result.idToken,
			audience: CLIENT_ID,
		});
	} catch (error) {
		throw new ResponseError(400, "invalid idToken!");
	}
	const payload = ticket.getPayload();
	console.log(payload); // debuging
	// logika daftar / login dan mereturn access_token
	return new Response(200, "testing lihat data user", payload, null, false);
}

async function create(request) {
	const result = await validation(usersValidation.create, request);
	const count = await database.users.count({
		where: {
			OR: [
				{
					username: result.username,
				},
				{
					nidn_or_nim: result.nidn_or_nim,
				},
			],
		},
	});
	if (count)
		throw new ResponseError(
			400,
			"username atau nidn sudah terdaftar!, Silahkan Login"
		);
	// harusnya ada validasi data dosen/mahasiswa valid
	result.id = crypto.randomUUID();
	result.password = await bcrypt.hash(result.password, 10);
	const createRes = await database.users.create({
		data: result,
		select: {
			id: true,
			username: true,
			full_name: true,
			nidn_or_nim: true,
			nama_perguruan_tinggi: true,
			role: true,
		},
	});
	return new Response(
		200,
		"berhasil mendaftar!",
		createRes,
		"/users/login",
		false
	);
}

async function login(request) {
	const result = await validation(usersValidation.login, request);
	const user = await database.users.findFirst({
		where: {
			username: result.username,
		},
	});
	if (user && (await bcrypt.compare(result.password, user.password))) {
		const payload = {
			id: user.id,
			role: user.role,
		};
		const access_token = Jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});
		return new Response(200, "login berhasil", { access_token }, null, false);
	} else {
		throw new ResponseError(400, "username atau password salah!");
	}
}

async function verify(request) {
	const result = await validation(usersValidation.verify, request);
	return new Response(200, "access_token verified!", result, null, false);
}

async function getProfile(request) {
	const result = await validation(usersValidation.getProfile, request);
	const users = await database.users.findUnique({
		where: result,
		select: {
			id: true,
			username: true,
			full_name: true,
			nidn_or_nim: true,
			nama_perguruan_tinggi: true,
			profile_url: true,
			create_at: true,
			update_at: true,
		},
	});
	if (!users) throw new ResponseError(400, "your account is locked!");
	return new Response(200, "informasi profile anda", users, null, false);
}

async function updateProfile(request) {
	const result = await validation(usersValidation.updateProfile, request);
	const count = await database.users.count({
		where: {
			id: result.id,
			role: result.role,
		},
	});
	if (!count) throw new ResponseError(400, "your account is locked!");
	const updateRes = await database.users.update({
		data: {
			full_name: result.full_name,
			nidn_or_nim: result.nidn_or_nim,
			profile_url: result.profile_url,
			nama_perguruan_tinggi: result.nama_perguruan_tinggi,
		},
		where: {
			id: result.id,
			role: result.role,
		},
		select: {
			id: true,
			role: true,
			full_name: true,
			username: true,
			nidn_or_nim: true,
			profile_url: true,
			nama_perguruan_tinggi: true,
			create_at: true,
			update_at: true,
		},
	});
	return new Response(200, "berhasil mengupdate!", updateRes, null, false);
}

export default {
	oAuthGoogle,
	create,
	login,
	verify,
	getProfile,
	updateProfile,
};
