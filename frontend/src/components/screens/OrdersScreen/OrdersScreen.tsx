import React, { useState, useEffect } from "react";
import { Button, Table, ButtonGroup, Modal } from "react-bootstrap";
import { X, Trash } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import { getOrders, deleteOrder } from "../../../redux/actions/orderActions";
import { useStartLoading } from "../../../hooks";

const OrdersScreen = () => {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const [deletedOrderId, setDeletedOrderId] = useState("");

	const handleCloseDeleteDialog = () => setShowDeleteDialog(false);
	const handleShowDeleteDialog = () => setShowDeleteDialog(true);

	const dispatch = useAppDispatch();
	const history = useHistory();
	const { loading, error, orders } = useAppSelector(
		(state) => state.orderList
	);
	const startLoading = useStartLoading(loading);
	const {
		loading: deleteLoading,
		error: deleteError,
		success: deleteSuccess,
	} = useAppSelector((state) => state.orderDelete);
	const { userInfo } = useAppSelector((state) => state.userLogin);

	useEffect(() => {
		dispatch(getOrders());
	}, [dispatch, deleteSuccess]);

	const deleteOrderHandler = (id: string) => {
		setDeletedOrderId(id);
		handleShowDeleteDialog();
	};

	useEffect(() => {
		if (deleteConfirmation) {
			dispatch(deleteOrder(deletedOrderId));
			setDeleteConfirmation(false);
		}
	}, [deleteConfirmation, dispatch, deletedOrderId]);

	useEffect(() => {
		if (!userInfo?.isAdmin) {
			history.push("/login");
		}
	}, [history, userInfo]);

	return (
		<>
			<h3>Orders</h3>
			{loading || startLoading || deleteLoading ? (
				<Loader></Loader>
			) : error || deleteError ? (
				<Message variant="danger">{error}</Message>
			) : orders && orders.length > 0 ? (
				<>
					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<th>ID</th>
								<th>Client</th>
								<th>ORDER DATE</th>
								<th>QUANTITY</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.user?.name}</td>
									<td
										title={`${new Date(
											order.createdAt
										).toLocaleTimeString()}`}
									>
										{new Date(
											order.createdAt
										).toLocaleDateString()}
									</td>
									<td>{order.itemNumber}</td>
									<td>
										<ButtonGroup>
											<LinkContainer
												to={`/orders/${order._id}`}
											>
												<Button
													className="btn-sm"
													variant="outline-info"
												>
													Details
												</Button>
											</LinkContainer>
											<Button
												className="btn-sm"
												variant="outline-danger"
												onClick={() =>
													deleteOrderHandler(
														order._id
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
					<Modal
						show={showDeleteDialog}
						onHide={handleCloseDeleteDialog}
						backdrop="static"
						keyboard={false}
					>
						<Modal.Header closeButton>
							<Modal.Title>
								Are you sure you want to delete the user?
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
			) : (
				<Message variant="light">No orders yet</Message>
			)}
		</>
	);
};

export default OrdersScreen;
