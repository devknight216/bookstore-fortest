import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Button,
	ListGroupItem,
} from "react-bootstrap";
import { addItemToFavorites, removeItemFromFavorites } from "../../../redux/actions/favoriteActions";
import Message from "../../Message/Message";
import "./FavoriteScreen.scss";

const FavoriteScreen = ({
	match,
	location,
	history,
}: RouteComponentProps<RouteParams>) => {
	const productId = match.params.id;
	const dispatch = useAppDispatch();

	const { favoriteItems } = useAppSelector((state) => state.favorite);

	useEffect(() => {
		if (productId) {
			dispatch(addItemToFavorites(productId));
		}
	}, [productId, dispatch]);

	const removeItemFromFavoritesHandler = (id: string) => {
		dispatch(removeItemFromFavorites(id));
	};
	return (
		<Row>
			<Col md={12}>
				<h3 className="mb-3">Favorite Items</h3>
				{favoriteItems!.length === 0 ? (
					<Message variant="light">
						You have no favorite items <Link to="/">Go back</Link>
					</Message>
				) : (
					favoriteItems!.map((item) => {
						const product: Product = item[0];
						return (
							<ListGroup variant="flush">
								<ListGroupItem key={product._id}>
									<Row>
										<Col md={3}>
											<Image
												src={product.image}
												alt={product.name}
												fluid
												rounded
											></Image>
										</Col>
										<Col md={5}>
											<ListGroup variant="flush">
												<ListGroup.Item>
													<Link
														to={`/product/${product._id}`}
													>
														{product.name}
													</Link>
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
											<Button
												variant="link"
												onClick={() =>
													removeItemFromFavoritesHandler(
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
		</Row>
	);
};

export default FavoriteScreen;
