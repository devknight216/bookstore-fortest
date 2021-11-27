import axios from "axios";
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";
import { AppThunk } from "../store";

export const addItem =
	(id: string, qty: number): AppThunk =>
	async (dispatch, getState) => {
		const { data } = await axios.get(`/api/products/${id}`);
		dispatch({ type: CART_ADD_ITEM, payload: [data, qty] });
		localStorage.setItem(
			"cartItems",
			JSON.stringify(getState().cart.cartItems)
		);
	};

export const removeItem =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		dispatch({ type: CART_REMOVE_ITEM, payload: id });
		localStorage.setItem(
			"cartItems",
			JSON.stringify(getState().cart.cartItems)
		);
	};

export const saveShippingAddress =
	(shippingAddress: Address): AppThunk =>
	async (dispatch, getState) => {
		dispatch({
			type: CART_SAVE_SHIPPING_ADDRESS,
			payload: shippingAddress,
		});
		localStorage.setItem(
			"shippingAddress",
			JSON.stringify(shippingAddress)
		);
	};

export const savePaymentMethod =
	(paymentMethod: string): AppThunk =>
	async (dispatch, getState) => {
		dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: paymentMethod });
		localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
	};
