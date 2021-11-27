import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

const addOrder = asyncHandler(async (req, res) => {
	const {
		orderItems,
		itemNumber,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error("No order items");
	} else {
		let orderedBookNumber = 0;
		orderItems.forEach(orderItem => {
			orderedBookNumber += orderItem.quantity;
		});
		const order = new Order({
			user: req.user._id,
			orderItems,
			itemNumber : orderedBookNumber,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			shippingPrice,
			totalPrice,
		});
		
		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});

const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

const getUserOrders = asyncHandler(async (req, res) => {
	try {
		const userOrders = await Order.find({ user: req.user._id });
		res.json(userOrders);
	} catch {
		res.status(404);
		throw new Error("Error while fetching orders");
	}
});

const getOrders = asyncHandler(async (req, res) => {
	try {
		const orders = await Order.find({}).populate("user", "id name");
		res.json(orders);
	} catch {
		res.status(404);
		throw new Error("Error while fetching orders");
	}
});

const updateOrderToDeliver = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		if (
			order.user.toString() === req.user._id.toString() ||
			req.user.isAdmin
		) {
			order.isDelivered = true;
			order.deliveredAt = Date.now();
			const updatedOrder = await order.save();
			res.json(updatedOrder);
		} else {
			res.status(404);
			throw new Error(
				"You have no rights to mark this order as delivered"
			);
		}
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

const deleteOrder = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		await order.remove();
		res.json({ message: "Order successfuly deleted" });
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

export {
	addOrder,
	getOrderById,
	updateOrderToPaid,
	getUserOrders,
	getOrders,
	updateOrderToDeliver,
	deleteOrder,
};
