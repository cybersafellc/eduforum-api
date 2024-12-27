import { database } from "../app/database.js";
import { ResponseError } from "../errors/response-error.js";
import { Response } from "../success/response.js";
import postsValidation from "../validations/posts.validation.js";
import { validation } from "../validations/validation.js";
import crypto from "crypto";

async function create(request) {
	const result = await validation(postsValidation.create, request);
	result.id = crypto.randomUUID();
	result.count_answers = 0;
	result.count_like = 0;

	const createRes = await database.posts.create({
		data: result,
	});

	return new Response(200, "berhasil memposting!", createRes, null, false);
}

async function get(request) {
	const result = await validation(postsValidation.get, request);
	result.skip = (result.page - 1) * result.take;
	let data = {};
	const count = await database.posts.count();
	data.posts = await database.posts.findMany({
		orderBy: {
			create_at: "desc",
		},
		include: {
			user: {
				select: {
					id: true,
					username: true,
					full_name: true,
					profile_url: true,
					nidn_or_nim: true,
					nama_perguruan_tinggi: true,
					role: true,
					create_at: true,
					update_at: true,
				},
			},
			answers: {
				orderBy: {
					create_at: "desc",
				},
				include: {
					user: {
						select: {
							id: true,
							username: true,
							full_name: true,
							profile_url: true,
							nidn_or_nim: true,
							nama_perguruan_tinggi: true,
							role: true,
							create_at: true,
							update_at: true,
						},
					},
					vote_down_relations: {
						include: {
							user: {
								select: {
									id: true,
									username: true,
									full_name: true,
									profile_url: true,
									nidn_or_nim: true,
									nama_perguruan_tinggi: true,
									role: true,
									create_at: true,
									update_at: true,
								},
							},
						},
					},
					vote_down_relations: {
						include: {
							user: {
								select: {
									id: true,
									username: true,
									full_name: true,
									profile_url: true,
									nidn_or_nim: true,
									nama_perguruan_tinggi: true,
									role: true,
									create_at: true,
									update_at: true,
								},
							},
						},
					},
				},
			},
			posts_like: {
				include: {
					user: {
						select: {
							id: true,
							username: true,
							full_name: true,
							profile_url: true,
							nidn_or_nim: true,
							nama_perguruan_tinggi: true,
							role: true,
							create_at: true,
							update_at: true,
						},
					},
				},
			},
		},

		skip: result.skip,
		take: result.take,
	});
	data.pagination_info = {
		max_page: Math.ceil(count / result.take),
		page: result.page,
		take: result.take,
	};

	return new Response(200, "list postingan", data, null, false);
}

async function getById(request) {
	const result = await validation(postsValidation.getById, request);
	const post = await database.posts.findUnique({
		where: result,
		include: {
			user: {
				select: {
					id: true,
					username: true,
					full_name: true,
					profile_url: true,
					nidn_or_nim: true,
					nama_perguruan_tinggi: true,
					role: true,
					create_at: true,
					update_at: true,
				},
			},
			answers: {
				include: {
					user: {
						select: {
							id: true,
							username: true,
							full_name: true,
							profile_url: true,
							nidn_or_nim: true,
							nama_perguruan_tinggi: true,
							role: true,
							create_at: true,
							update_at: true,
						},
					},
					vote_down_relations: {
						include: {
							user: {
								select: {
									id: true,
									username: true,
									full_name: true,
									profile_url: true,
									nidn_or_nim: true,
									nama_perguruan_tinggi: true,
									role: true,
									create_at: true,
									update_at: true,
								},
							},
						},
					},
					vote_down_relations: {
						include: {
							user: {
								select: {
									id: true,
									username: true,
									full_name: true,
									profile_url: true,
									nidn_or_nim: true,
									nama_perguruan_tinggi: true,
									role: true,
									create_at: true,
									update_at: true,
								},
							},
						},
					},
				},
			},
			posts_like: {
				include: {
					user: {
						select: {
							id: true,
							username: true,
							full_name: true,
							profile_url: true,
							nidn_or_nim: true,
							nama_perguruan_tinggi: true,
							role: true,
							create_at: true,
							update_at: true,
						},
					},
				},
			},
		},
	});
	if (!post)
		throw new ResponseError(
			400,
			"tidak ditemukan postingan dengan id yang dieberikan"
		);
	return new Response(200, "postingan ditemukan", post, null, false);
}

async function likePost(request) {
	const result = await validation(postsValidation.likePost, request);
	const countPost = await database.posts.count({
		where: {
			id: result.post_id,
		},
	});
	if (!countPost)
		throw new ResponseError(
			400,
			"tidak ada postingan dengan id yang anda berikan!"
		);
	const countPostLike = await database.posts_like.count({
		where: {
			posts_id: result.post_id,
			users_id: result.id,
		},
	});
	if (countPostLike)
		throw new ResponseError(201, "kamu sudah like postingan ini!");
	const data = {
		id: crypto.randomUUID(),
		post: {
			connect: {
				id: result.post_id,
			},
		},
		user: {
			connect: {
				id: result.id,
			},
		},
	};
	const createLike = await database.posts_like.create({
		data: data,
	});
	await database.posts.update({
		where: {
			id: result.post_id,
		},
		data: {
			count_like: +1,
		},
	});
	return new Response(
		200,
		"berhasil like postingan ini!",
		createLike,
		null,
		false
	);
}

export default { create, get, getById, likePost };
