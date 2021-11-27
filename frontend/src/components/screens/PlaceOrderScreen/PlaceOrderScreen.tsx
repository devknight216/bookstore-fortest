import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { Link, RouteChildrenProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Message from "../../Message/Message";
import CheckoutSteps from "../../CheckoutSteps/CheckoutSteps";
import { createOrder } from "../../../redux/actions/orderActions";

const PlaceOrderScreen = ({ history }: RouteChildrenProps) => {
	const dispatch = useAppDispatch();
	const { cartItems, shippingAddress, paymentMethod } = useAppSelector(
		(state) => state.cart
	);
	const { success, error, order } = useAppSelector((state) => state.order);

	useEffect(() => {
		if (success) {
			history.push(`/orders/${order!._id}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [history, success]);

	const itemsPrice = cartItems!.reduce(
		(acc, item) => acc + item[0]!.price * item[1],
		0
	);
	const shippingPrice = itemsPrice > 100 ? 0 : 25;
	const totalPrice = itemsPrice + shippingPrice;

	const placeOrderHandler = () => {
		if (shippingAddress && cartItems) {
			dispatch(
				createOrder({
					orderItems: cartItems.map((item) => ({
						name: item[0].name,
						image: item[0].image,
						quantity: item[1],
						price: item[0].price,
						product: item[0]._id,
					})),
					shippingAddress,
					paymentMethod,
					itemsPrice,
					shippingPrice,
					totalPrice,
				})
			);
		}
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h4>Shipping</h4>
							<p>
								<strong>Address: </strong>
								{`${shippingAddress?.country}, ${shippingAddress?.city}, 
								${shippingAddress?.address}, ${shippingAddress?.postalCode}`}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h4>Payment Method</h4>
							<strong>Method: </strong>
							{paymentMethod}
						</ListGroup.Item>
						<ListGroup.Item>
							<h4>Order</h4>
							{cartItems?.length === 0 ? (
								<Message>You cart is empty</Message>
							) : (
								<ListGroup variant="flush">
									{cartItems?.map((item, i) => (
										<ListGroup.Item key={i}>
											<Row>
												<Col md={1}>
													<Image
														src={item[0].image}
														alt={item[0].name}
														fluid
														rounded
													></Image>
												</Col>
												<Col md={6}>
													<Link
														to={`/product/${item[0]._id}`}
													>
														{item[0].name}
													</Link>
												</Col>
												<Col>
													£ {item[0].price} x{" "}
													{item[1]} = £
													{item[0].price * item[1]}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
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
										<Col>Items</Col>
										<Col>£{itemsPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Shipping</Col>
										<Col>£{shippingPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>
											<strong>Total</strong>
										</Col>
										<Col>£{totalPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Button
										type="button"
										className="btn-block"
										disabled={cartItems?.length === 0}
										onClick={placeOrderHandler}
									>
										Place Order
									</Button>
								</ListGroup.Item>
								{error && (
									<ListGroup.Item>
										<Message variant="danger">
											{error}
										</Message>
									</ListGroup.Item>
								)}
							</ListGroup>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
