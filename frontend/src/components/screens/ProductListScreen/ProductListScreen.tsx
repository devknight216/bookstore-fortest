import React, { useState, useEffect } from "react";
import { Button, Table, ButtonGroup, Modal, Row, Col } from "react-bootstrap";
import { PencilFill, Trash, Plus } from "react-bootstrap-icons";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import {
	listProducts,
	deleteProduct,
	createProduct,
} from "../../../redux/actions/productActions";
import { useStartLoading } from "../../../hooks";
import { PRODUCT_CREATE_RESET } from "../../../redux/constants/productConstants";
import { removeItem } from "../../../redux/actions/cartActions";
import Pagination from "../../Pagination/PaginationComponent";

const ProductListScreen = ({ match }: RouteComponentProps<RouteParams>) => {
	const pageNumber = match.params.pageNumber || "1";

	const dispatch = useAppDispatch();
	const history = useHistory();
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const [deletedProductId, setDeletedProductId] = useState("");

	const handleCloseDeleteDialog = () => setShowDeleteDialog(false);
	const handleShowDeleteDialog = () => setShowDeleteDialog(true);

	const { loading, error, products, page, pages } = useAppSelector(
		(state) => state.productList
	);

	const startLoading = useStartLoading(loading);

	const {
		loading: deleteLoading,
		error: deleteError,
		success: deleteSuccess,
	} = useAppSelector((state) => state.productDelete);

	const { userInfo } = useAppSelector((state) => state.userLogin);

	const {
		loading: createLoading,
		product,
		error: createError,
		success: createSuccess,
	} = useAppSelector((state) => state.productCreate);

	useEffect(() => {
		if (!userInfo?.isAdmin) {
			history.push("/login");
		}

		dispatch(listProducts("", pageNumber));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [deleteSuccess, userInfo?.isAdmin, pageNumber]);

	useEffect(() => {
		if (createSuccess && product) {
			dispatch({ type: PRODUCT_CREATE_RESET });
			history.push(`/admin/product/${product._id}/edit`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createSuccess, history, product]);

	useEffect(() => {
		if (deleteConfirmation) {
			dispatch(deleteProduct(deletedProductId));
			dispatch(removeItem(deletedProductId));
			setDeleteConfirmation(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [deleteConfirmation]);

	const deleteProductHandler = (id: string) => {
		setDeletedProductId(id);
		handleShowDeleteDialog();
	};

	const createProductHandler = () => {
		dispatch(createProduct());
	};

	return (
		<>
			<Row>
				<Col className="text-left">
					<h3>Products</h3>
				</Col>
				<Col className="float-end text-right">
					<Button onClick={createProductHandler}>
						<Plus></Plus>
						Add Product
					</Button>
				</Col>
			</Row>
			{(loading || startLoading || deleteLoading || createLoading) && (
				<Loader></Loader>
			)}
			{(error || deleteError || createError) && (
				<Message variant="danger" dismissible>
					{error ? error : deleteError}
				</Message>
			)}
			{products && (
				<>
					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<th>ID</th>
								<th>Title</th>
								<th>Author</th>
								<th># IN STOCK</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>{product.author}</td>
									<td>{product.inStock}</td>
									<td>
										<ButtonGroup>
											<LinkContainer
												to={`/admin/product/${product._id}/edit`}
											>
												<Button
													className="btn-sm"
													variant="outline-info"
												>
													<PencilFill></PencilFill>
												</Button>
											</LinkContainer>
											<Button
												className="btn-sm"
												variant="outline-danger"
												onClick={() =>
													deleteProductHandler(
														product._id
													)
												}
											>
												<Trash></Trash>
											</Button>
										</ButtonGroup>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Row className="justify-content-center">
						{pages && page && (
							<Pagination
								pages={pages}
								page={page}
								isAdmin={userInfo?.isAdmin}
								keyword={""}
							></Pagination>
						)}
					</Row>
					<Modal
						show={showDeleteDialog}
						onHide={handleCloseDeleteDialog}
						backdrop="static"
						keyboard={false}
					>
						<Modal.Header closeButton>
							<Modal.Title>
								Are you sure you want to delete this product?
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							You will not be able to cancel this action!
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="secondary"
								onClick={() => {
									setDeleteConfirmation(false);
									handleCloseDeleteDialog();
								}}
							>
								Close
							</Button>
							<Button
								variant="danger"
								onClick={() => {
									setDeleteConfirmation(true);
									handleCloseDeleteDialog();
								}}
							>
								Delete
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)}
		</>
	);
};

export default ProductListScreen;
