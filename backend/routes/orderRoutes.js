import express from "express";
import {
	addOrder,
	getOrderById,
	updateOrderToPaid,
	getUserOrders,
	getOrders,
	updateOrderToDeliver,
	deleteOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const routes = express.Router();

routes.route("/").post(protect, addOrder).get(protect, admin, getOrders);
routes.route("/myorders").get(protect, getUserOrders);
routes
	.route("/:id")
	.get(protect, getOrderById)
	.delete(protect, admin, deleteOrder);
routes.route("/:id/pay").put(protect, updateOrderToPaid);
routes.route("/:id/deliver").put(protect, updateOrderToDeliver);

export default routes;
