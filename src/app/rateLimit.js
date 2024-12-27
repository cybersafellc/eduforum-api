import rateLimit from "express-rate-limit";
import { Response } from "../utils/response.js";

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 60, // berapa request /menit bang
	standardHeaders: true,
	legacyHeaders: false,
	handler: async (req, res) => {
		const response = new Response(
			429,
			`request limit for IP:${req.ip}`,
			null,
			null,
			true
		);
		res.status(response.status).json(response).end();
	},
});

export { limiter };
