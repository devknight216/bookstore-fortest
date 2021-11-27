import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Button,
	Card,
	ListGroupItem,
	FormControl,
} from "react-bootstrap";
import { addItem, removeItem } from "../../../redux/actions/cartActions";
import Message from "../../Message/Message";
import "./CartScreen.scss";

const CartScreen = ({
	match,
	location,
	history,
}: RouteComponentProps<RouteParams>) => {
	const productId = match.params.id;
	const qty = location.search ? parseInt(location.search.split("=")[1]) : 1;
	const dispatch = useAppDispatch();

	const { cartItems } = useAppSelector((state) => state.cart);

	useEffect(() => {
		if (productId) {
			dispatch(addItem(productId, qty));
		}
	}, [productId, qty, dispatch]);

	const removeItemHandler = (id: string) => {
		dispatch(removeItem(id));
	};
	const checkoutHandler = () => {
		history.push("/shipping");
	};

	return (
		<Row>
			<Col md={8}>
				<h3 className="mb-3">Shopping Cart</h3>
				{cartItems!.length === 0 ? (
					<Message variant="light">
						You shopping cart is empty <Link to="/">Go back</Link>
					</Message>
				) : (
					cartItems!.map((item) => {
						const product: Product = item[0];
						const qty: number = item[1];
						return (
							<ListGroup variant="flush">
								<ListGroupItem key={product._id}>
									<Row>
										<Col md={2}>
											<Image
												src={product.image}
												alt={product.name}
												fluid
												rounded
											></Image>
										</Col>
										<Col md={5}>
											<Link
												to={`/product/${product._id}`}
											>
												{product.name}
											</Link>
										</Col>
										<Col md={2} className="text-center">
											£ {product.price}
										</Col>
										<Col md={2}>
											<FormControl
												as="select"
												value={qty}
												onChange={(e) => {
													dispatch(
														addItem(
															product._id.toString(),
															Number(
																e.target.value
															)
														)
													);
												}}
											>
												{[
													...Array(
														product.inStock
													).keys(),
												].map((key) => (
													<option
														key={key + 1}
														value={key + 1}
													>
														{key + 1}
													</option>
												))}
											</FormControl>
										</Col>
										<Col md={1}>
											<Button
												variant="link"
												onClick={() =>
													removeItemHandler(
														product._id.toString()
													)
												}
												className="delete-item"
											>
												<i className="fas fa-trash"></i>
											</Button>
										</Col>
									</Row>
								</ListGroupItem>
							</ListGroup>
						);
					})
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup>
						<ListGroupItem>
							<h4>
								{`Total price for ${cartItems!.reduce(
									(totalQty, item) => totalQty + item[1],
									0
								)} items: `}
							</h4>

							{`£ ${cartItems!
								.reduce(
									(totalPrice, item) =>
										totalPrice + item[0].price * item[1],
									0
								)
								.toFixed(2)}`}
						</ListGroupItem>
						<ListGroupItem>
							<Button
								className="btn-block"
								disabled={cartItems!.length === 0}
								onClick={checkoutHandler}
							>
								Proceed To Checkout
							</Button>
						</ListGroupItem>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
