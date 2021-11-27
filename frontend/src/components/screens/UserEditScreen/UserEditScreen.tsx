import React, { useState, useEffect, FormEvent } from "react";
import {
	Form,
	Button,
	FormGroup,
	FormLabel,
	FormControl,
} from "react-bootstrap";
import { RouteChildrenProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import { userDetails, userEdit } from "../../../redux/actions/userActions";
import FormContainer from "../../FormContainer/FormContainer";
import { USER_EDIT_RESET } from "../../../redux/constants/userConstants";

const UserEditScreen = ({
	location,
	history,
	match,
}: RouteChildrenProps<RouteParams>) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	const dispatch = useAppDispatch();
	const { success } = useAppSelector((state) => state.userEdit);
	const { loading, user, error } = useAppSelector(
		(state) => state.userDetails
	);

	useEffect(() => {
		dispatch(userDetails(match!.params.id));
		return () => {
			dispatch({ type: USER_EDIT_RESET });
		};
	}, [dispatch, match]);

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [user]);

	useEffect(() => {
		if (success) {
			history.push("/admin/userList");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [success]);

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();
		if (password === confirmPassword) {
			dispatch(
				userEdit({
					_id: match!.params.id,
					name,
					email,
					password,
					isAdmin,
				})
			);
		} else {
			setMessage("Passwords are not equal!");
		}
	};

	return (
		<FormContainer>
			<h3>Edit User</h3>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader></Loader>}
			<Form onSubmit={submitHandler} className="pt-4">
				<FormGroup controlId="name">
					<FormLabel>Full name</FormLabel>
					<FormControl
						type="text"
						required
						placeholder="You name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="email">
					<FormLabel>Email address</FormLabel>
					<FormControl
						type="email"
						required
						placeholder="Enter Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="password">
					<FormLabel>Password</FormLabel>
					<FormControl
						type="password"
						placeholder="New password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="confirmPassword">
					<FormLabel>Confirm password</FormLabel>
					<FormControl
						type="password"
						placeholder="Confirm new password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="isadmin">
					<Form.Check
						type="checkbox"
						label="Is Admin"
						checked={isAdmin}
						onChange={(e) => setIsAdmin(e.target.checked)}
					/>
				</FormGroup>

				<Button className="float-right" type="submit" variant="primary">
					Save
				</Button>
				<Button
					className="mr-2 float-right"
					variant="secondary"
					onClick={() => {
						history.push("/admin/userList");
					}}
				>
					Cancel
				</Button>
			</Form>
		</FormContainer>
	);
};

export default UserEditScreen;
