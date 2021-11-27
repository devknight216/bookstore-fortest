import React, { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	detailsProduct,
} from "../../../redux/actions/productActions";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import { ArrowLeft } from "react-bootstrap-icons";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	ListGroupItem,
	FormControl,
	Spinner,
} from "react-bootstrap";
import { addItem } from "../../../redux/actions/cartActions";
import { addItemToFavorites } from "../../../redux/actions/favoriteActions";
import "./ProductScreen.scss";
import { useStartLoading } from "../../../hooks";
// import { PRODUCT_REVIEW_CREATE_RESET } from "../../../redux/constants/productConstants";

const ProductScreen = () => {
	const { product, loading, error } = useAppSelector(
		(state) => state.productDetails
	);
	console.log(product);
	const startLoading = useStartLoading(loading);
	const [imageLoading, setImageLoading] = useState(true);
	const [inCart, setInCart] = useState(false);
	const [inFavorite, setInFavorites] = useState(false);
	const { id }: params = useParams();
	const history = useHistory();
	const dispatch = useAppDispatch();
	const [qty, setQty] = useState(1);
	useEffect(() => {
		dispatch(detailsProduct(id));
	}, [id, dispatch]);

	const addToCartHandler = () => {
		dispatch(addItem(id, qty));
		setInCart(true);
	};

	const addToFavoritesHandler = () => {
		dispatch(addItemToFavorites(id));
		setInFavorites(true);
	}
	const image = (
		<Image
			src={product?.image}
			alt={product?.name}
			className="product-image"
			onLoad={() => {
				setImageLoading(false);
			}}
			fluid
			style={{ display: `${imageLoading ? "none" : "block"}` }}
		></Image>
	);

	return (
		<>
			<Button
				className="btn transparent mb-3"
				variant="link"
				onClick={() => {
					history.goBack();
				}}
			>
				<ArrowLeft color="gray" size="30"></ArrowLeft>
			</Button>
			{loading || startLoading || !product ? (
				<Loader></Loader>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						<Col
							md={4}
							style={{
								display: "grid",
								placeItems: "center",
								overflow: "hidden",
							}}
						>
							{image}
							{imageLoading && (
								<Spinner
									as="span"
									animation="grow"
									variant="light"
								/>
							)}
						</Col>
						<Col md={5}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h3>{product?.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<h4>Author: {product?.author}</h4>
								</ListGroup.Item>
								<ListGroup.Item>
									<h4>Category: {product?.category}</h4>
								</ListGroup.Item>
								<ListGroup.Item>
									<p>{product?.description}</p>
								</ListGroup.Item>
							</ListGroup>
						</Col>

						<Col md={3}>
							<Card>
								<ListGroup variant="flush">
									<ListGroupItem>
										<Row>
											<Col className="text-left">
												Status:{" "}
											</Col>
											<Col className="text-left">
												{product!.inStock > 0
													? "In Stock"
													: "Out of stock"}
											</Col>
										</Row>
									</ListGroupItem>
									{product!.inStock > 0 && (
										<ListGroupItem>
											<Row>
												<Col className="text-left">
													Quantity:
												</Col>
												<Col>
													<FormControl
														as="input"
														type="number"
														value={qty}
														placeholder="0"
														onChange={(e) => {
															setInCart(false);
															e.target.value ===
															""
																? setQty(0)
																: setQty(
																		parseInt(
																			e
																				.target
																				.value
																		)
																  );
														}}
													></FormControl>
												</Col>
											</Row>
										</ListGroupItem>
									)}
									<ListGroupItem>
										<Button
											className="btn-block"
											variant={`${
												inCart ? "success" : "primary"
											}`}
											onClick={addToCartHandler}
											disabled={
												product?.inStock === 0 ||
												qty === 0 ||
												product!.inStock < qty ||
												inCart
											}
											title={
												product?.inStock === 0
													? "No product in stock"
													: qty === 0
													? "You didn't set a quantity"
													: product!.inStock < qty
													? "Quantity of this product is lower than you want to buy"
													: inCart
													? "Item(s) already in cart. Change quantity or go to the cart"
													: `Add ${qty} items to the cart`
											}
										>
											{`${
												inCart
													? "In cart"
													: "Add to cart"
											}`}
										</Button>
									</ListGroupItem>
									<ListGroupItem>
										<Button 
											className="btn-block" 
											variant="success"
											onClick={addToFavoritesHandler}
										>
											{`${
												inFavorite
													? "In favorite"
													: "Add to favorite"
											}`}
										</Button>
									</ListGroupItem>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					
				</>
			)}
		</>
	);
};

type params = {
	id: string;
};

export default ProductScreen;
