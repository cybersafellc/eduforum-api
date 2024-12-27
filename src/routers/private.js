import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import usersControllers from "../controllers/users.controller.js";
import { multers } from "../middlewares/multer.middleware.js";
import postsController from "../controllers/posts.controller.js";

const router = express.Router();
// users service
router.get(
	"/users/auth/verify",
	authMiddleware.authorization,
	usersControllers.verify
);
router.get(
	"/users/profile",
	authMiddleware.authorization,
	usersControllers.getProfile
);
router.put(
	"/users/profile",
	authMiddleware.authorization,
	multers,
	usersControllers.updateProfile
);

// posts service
router.post(
	"/posts",
	authMiddleware.authorization,
	multers,
	postsController.create
);
router.post(
	"/posts/like",
	authMiddleware.authorization,
	postsController.likePost
);
export default router;
