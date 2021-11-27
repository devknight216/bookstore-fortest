import express from "express";
import {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.route("/").get(getProducts).post(protect, admin, createProduct);
routes
	.route("/:id")
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct);

export default routes;
