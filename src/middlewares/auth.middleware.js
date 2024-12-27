import Jwt from "jsonwebtoken";
import { ResponseError } from "../errors/response-error.js";
import { database } from "../app/database.js";

async function authorization(req, res, next) {
	try {
		const access_token = await req.headers["authorization"]?.split(" ")[1];
		const decode = Jwt.verify(
			access_token,
			process.env.JWT_SECRET,
			(err, decode) => {
				return decode;
			}
		);
		if (!decode) throw new ResponseError(400, "invalid access_token!");
		const count = await database.users.count({
			where: {
				id: decode.id,
			},
		});
		if (!count) throw new ResponseError(400, "your account is locked!");
		req.body.id = await decode.id;
		req.body.role = await decode.role;
		req.id = await decode.id;
		req.role = await decode.role;
		next();
	} catch (error) {
		next(error);
	}
}
export default { authorization };
