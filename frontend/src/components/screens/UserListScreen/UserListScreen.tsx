import React, { useState, useEffect } from "react";
import { Button, Table, ButtonGroup, Modal } from "react-bootstrap";
import { Check, X, PencilFill, Trash } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import { getUserList, deleteUser } from "../../../redux/actions/userActions";
import { useStartLoading } from "../../../hooks";

const UserListScreen = () => {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const [deletedUserId, setDeletedUserId] = useState("");

	const handleCloseDeleteDialog = () => setShowDeleteDialog(false);
	const handleShowDeleteDialog = () => setShowDeleteDialog(true);

	const dispatch = useAppDispatch();
	const history = useHistory();
	const { loading, error, users } = useAppSelector((state) => state.userList);
	const startLoading = useStartLoading(loading);
	const {
		loading: deleteLoading,
		error: deleteError,
		success,
	} = useAppSelector((state) => state.userDelete);
	const { userInfo } = useAppSelector((state) => state.userLogin);

	useEffect(() => {
		dispatch(getUserList());
	}, [dispatch, success]);

	const deleteUserHandler = (id: string) => {
		setDeletedUserId(id);
		handleShowDeleteDialog();
	};

	useEffect(() => {
		if (deleteConfirmation) {
			dispatch(deleteUser(deletedUserId));
			setDeleteConfirmation(false);
		}
	}, [deleteConfirmation, dispatch, deletedUserId]);

	// stop displaying user list if admin logged out
	useEffect(() => {
		if (!userInfo?.isAdmin) {
			history.push("/login");
		}
	}, [history, userInfo]);

	return (
		<>
			<h3>Users</h3>
			{loading || startLoading || deleteLoading ? (
				<Loader></Loader>
			) : error || deleteError ? (
				<Message variant="danger">{error}</Message>
			) : (
				users && (
					<>
						<Table striped bordered hover responsive>
							<thead>
								<tr>
									<th>ID</th>
									<th>NAME</th>
									<th>EMAIL</th>
									<th>ADMIN</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr key={user._id}>
										<td>{user._id}</td>
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td>
											{user.isAdmin ? (
												<Check
													size="2em"
													color="green"
												></Check>
											) : (
												<X
													size="1.5em"
													color="gray"
												></X>
											)}
										</td>
										<td>
											<ButtonGroup>
												<LinkContainer
													to={`/admin/user/${user._id}/edit`}
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
														deleteUserHandler(
															user._id
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
				)
			)}
		</>
	);
};

export default UserListScreen;
