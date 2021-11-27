import React, { useState, FormEvent } from "react";
import { Form, Button, FormGroup, FormLabel } from "react-bootstrap";
import { RouteChildrenProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { savePaymentMethod } from "../../../redux/actions/cartActions";
import FormContainer from "../../FormContainer/FormContainer";
import CheckoutSteps from "../../CheckoutSteps/CheckoutSteps";

const PaymentScreen = ({ history }: RouteChildrenProps) => {
	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	const dispatch = useAppDispatch();
	const { shippingAddress } = useAppSelector((state) => state.cart);

	if (!shippingAddress) {
		history.push("/shipping");
	}

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push("/placeorder");
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3></CheckoutSteps>
			<FormContainer>
				<h3>Payment</h3>
				<Form onSubmit={submitHandler} className="pt-4">
					<FormGroup controlId="paymentMethod">
						<FormLabel as="legend">Select Method</FormLabel>
						<Form.Check
							id="PayPal"
							name="paymentMethod"
							value="PayPal"
							checked
							type="radio"
							label="PayPal or Credit Card"
							onChange={(e) => {
								setPaymentMethod(e.target.value);
							}}
						></Form.Check>
					</FormGroup>
					<Button type="submit" variant="primary">
						Continue
					</Button>
				</Form>
			</FormContainer>
		</>
	);
};

export default PaymentScreen;
