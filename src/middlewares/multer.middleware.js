import multer from "multer";
import path from "path";
import crypto from "crypto";

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/photos");
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		const uniqueFilename = crypto.randomUUID() + ext;
		cb(null, uniqueFilename);
	},
});

const fileFilter = (req, file, cb) => {
	const allowedMimeTypes = [
		"image/jpeg",
		"image/png",
		"image/gif",
		"image/webp",
		"image/svg+xml",
	];
	if (!allowedMimeTypes.includes(file.mimetype)) {
		return cb(new Error("Invalid file type"));
	}
	cb(null, true);
};

export const multers = multer({
	storage: fileStorage,
	fileFilter: fileFilter,
}).single("file");
