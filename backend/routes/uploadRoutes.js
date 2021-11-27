import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},

	filename: function (req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		const fileTypes = /png|jpg|jpeg|bmp/;
		const extname = fileTypes.test(
			path.extname(file.originalname).toLowerCase()
		);
		const mimetype = fileTypes.test(file.mimetype);

		if (extname && mimetype) {
			cb(null, true);
		} else {
			cb("Images only!");
		}
	},
});

router.post("/", upload.single("image"), (req, res) => {
	console.log(req.file.path);
	res.send(`/${req.file.path}`);
});

export default router;
