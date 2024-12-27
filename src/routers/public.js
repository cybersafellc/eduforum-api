import express from "express";
import usersControllers from "../controllers/users.controller.js";
import postsController from "../controllers/posts.controller.js";

const router = express.Router();
// users service
router.post("/users/oauth/google", usersControllers.oAuthGoogle);
router.post("/users/mahasiswa", usersControllers.createMahasiswa);
router.post("/users/dosen", usersControllers.createDosen);
router.post("/users/auth", usersControllers.login);
router.use("/foto", express.static("public/photos"));
//posts service
router.get("/posts", postsController.get);
export default router;
