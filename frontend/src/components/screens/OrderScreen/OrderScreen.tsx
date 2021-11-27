import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, RouteChildrenProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import {
	getOrderDetails,
	payOrder,
	deliverOrder,
} from "../../../redux/actions/orderActions";
import axios from "axios";
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
	ORDER_DETAILS_RESET,
} from "../../../redux/constants/orderConstants";
import "./OrderScreen.scss";

const OrderScreen = ({
	match,
	history,
}: RouteChildrenProps<{ id: string }>) => {
	const [sdkReady, setSdkReady] = useState(false);
	const dispatch = useAppDispatch();
	const orderId: string = match!.params.id;
	const { loading, error, order } = useAppSelector(
		(state) => state.orderDetails
	);
	const {
		loading: loadingPay,
		success: successPay,
		error: errorPay,
	} = useAppSelector((state) => state.orderPay);

	const { userInfo } = useAppSelector((state) => state.userLogin);

	const {
		loading: loadingDeliver,
		success: successDeliver,
		error: errorDeliver,
	} = useAppSelector((state) => state.orderDeliver);

	const successPaymentHandler = (paymentResult: PaymentResult) => {
		dispatch(payOrder(orderId, paymentResult));
	};

	const successDeliverHandler = () => {
		dispatch(deliverOrder(orderId));
	};

	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		}

		// const addPayPalScript = async () => {
		// 	const { data: clientId } = await axios.get("/api/config/paypal");
		// 	const script = document.createElement("script");
		// 	script.type = "text/javascript";
		// 	script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=GBP`;
		// 	script.async = true;
		// 	document.body.appendChild(script);
		// 	script.onload = () => {
		// 		setSdkReady(true);
		// 	};
		// };
		// addPayPalScript();

		if (!order || successPay || successDeliver) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(getOrderDetails(orderId));
		}

		return () => {
			dispatch({ type: ORDER_DETAILS_RESET });
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, orderId, successPay, successDeliver, userInfo]);

	let itemsPrice;

	if (!loading && order) {
		itemsPrice = order.orderItems.reduce(
			(acc, item) => acc + item.quantity * item.price,
			0
		);
	}

	return (
		<>
			{loading ? (
				<Loader></Loader>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						<Col md={8}>
							<h3 className="order-info-header">Order details</h3>
							<span
								title="Order ID"
								className="order-info-id-span mt-1"
							>
								<strong>ID: </strong>
								{order!._id}
							</span>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h4>Shipping</h4>
									<p className="order-info-p">
										<strong>Name: </strong>
										{order!.user?.name}{" "}
									</p>
									<p className="order-info-p">
										<strong>Email: </strong>
										<a
											href={`mailto:${
												order!.user?.email
											}`}
										>
											{order!.user?.email}
										</a>
									</p>
									<p className="order-info-p">
										<strong>Address: </strong>
										{`${order!.shippingAddress?.country}, ${
											order!.shippingAddress?.city
										}, 
                            ${order!.shippingAddress?.address}, ${
											order!.shippingAddress?.postalCode
										}`}
									</p>
								</ListGroup.Item>
								<ListGroup.Item>
									<h4>Payment Method</h4>
									<p className="order-info-p">
										<strong>Method: </strong>
										{order!.paymentMethod}
									</p>
								</ListGroup.Item>
								<ListGroup.Item>
									<h4>Order items</h4>
									{order!.orderItems?.length === 0 ? (
										<Message>Order is empty</Message>
									) : (
										<ListGroup variant="flush">
											{order!.orderItems!.map(
												(item, i) => (
													<ListGroup.Item key={i}>
														<Row>
															<Col md={2}>
																<Image
																	src={
																		item.image
																	}
																	alt={
																		item.name
																	}
																	fluid
																	rounded
																></Image>
															</Col>
															<Col md={6}>
																<Link
																	to={`/product/${item.product}`}
																>
																	{item.name}
																</Link>
															</Col>
															<Col>
																£ {item.price} x{" "}
																{item.quantity}{" "}
																= £
																{item.price *
																	item.quantity}
															</Col>
														</Row>
													</ListGroup.Item>
												)
											)}
										</ListGroup>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={4}>
							<Card>
								<ListGroup variant="flush">
									<ListGroup>
										<ListGroup.Item>
											<h4>Order Summary</h4>
										</ListGroup.Item>
										<ListGroup.Item>
											<Row>
												<Col className="text-left">
													Items
												</Col>
												<Col>£{itemsPrice}</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item>
											<Row>
												<Col className="text-left">
													Shipping
												</Col>
												<Col>
													£{order!.shippingPrice}
												</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item>
											<Row>
												<Col className="text-left">
													<strong>Total</strong>
												</Col>
												<Col>£{order!.totalPrice}</Col>
											</Row>
										</ListGroup.Item>
									</ListGroup>
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default OrderScreen;
