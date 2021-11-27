import React, { useState, useEffect, FormEvent } from "react";
import {
	Row,
	Col,
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
import { getUserOrders } from "../../../redux/actions/orderActions";
import { USER_EDIT_RESET } from "../../../redux/constants/userConstants";

const ProfileScreen = ({ location, history }: RouteChildrenProps) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [successUpdate, setSuccessUpdate] = useState(false);

	const dispatch = useAppDispatch();
	const { loading, error, user } = useAppSelector(
		(state) => state.userDetails
	);
	const { userInfo } = useAppSelector((state) => state.userLogin);
	const { success } = useAppSelector((state) => state.userEdit);

	// Fetch once. Independent from updating user info
	useEffect(() => {
		dispatch(getUserOrders());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		} else {
			if ((!user || user!._id !== userInfo._id) && !loading) {
				dispatch(userDetails("profile"));
			} else if (user) {
				setName(user!.name);
				setEmail(user!.email);
			}

			if (success) {
				dispatch(userDetails("profile"));
				success && setSuccessUpdate(success);
				dispatch({ type: USER_EDIT_RESET });
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, history, success, user, userInfo]);

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();
		if (password === confirmPassword) {
			dispatch(userEdit({ ...user, name, email, password } as UserInfo));
		} else {
			setMessage("Passwords are not equal!");
		}
	};

	return (
		<Row>
			<Col md={6}>
				<h3>Edit profile</h3>
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{successUpdate && (
					<Message variant="success" dismissible>
						Information updated
					</Message>
				)}
				{loading && <Loader></Loader>}
				<Form onSubmit={submitHandler}>
					<FormGroup controlId="name">
						<FormLabel>Full name</FormLabel>
						<FormControl
							type="text"
							placeholder="You name"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
								setSuccessUpdate(false);
							}}
						></FormControl>
					</FormGroup>

					<FormGroup controlId="email">
						<FormLabel>Email address</FormLabel>
						<FormControl
							type="email"
							placeholder="Enter Email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								setSuccessUpdate(false);
							}}
						></FormControl>
					</FormGroup>

					<FormGroup controlId="password">
						<FormLabel>Password</FormLabel>
						<FormControl
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setSuccessUpdate(false);
							}}
						></FormControl>
					</FormGroup>

					<FormGroup controlId="confirmPassword">
						<FormLabel>Confirm password</FormLabel>
						<FormControl
							type="password"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
								setSuccessUpdate(false);
							}}
						></FormControl>
					</FormGroup>
					<Button type="submit" variant="primary">
						Save changes
					</Button>
				</Form>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
