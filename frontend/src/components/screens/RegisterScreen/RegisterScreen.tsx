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
import { Link, RouteChildrenProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import { register } from "../../../redux/actions/userActions";
import FormContainer from "../../FormContainer/FormContainer";

const RegisterScreen = ({ location, history }: RouteChildrenProps) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	const redirect = location.search ? location.search.split("=")[1] : "/";

	const dispatch = useAppDispatch();
	const { loading, error } = useAppSelector((state) => state.userRegister);
	const { userInfo } = useAppSelector((state) => state.userLogin);

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();
		if (password === confirmPassword) {
			dispatch(register(name, email, password));
		} else {
			setMessage("Passwords are not equal!");
		}
	};

	return (
		<FormContainer>
			<h3>Create new account</h3>
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
						required
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="confirmPassword">
					<FormLabel>Confirm password</FormLabel>
					<FormControl
						type="password"
						required
						placeholder="Confirm password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></FormControl>
				</FormGroup>
				<Button type="submit" variant="primary">
					Sign Up
				</Button>
			</Form>
			<Row>
				<Col>
					<Link
						to={redirect ? `/login?redirect=${redirect}` : "/login"}
					>
						Log into an existing account
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
