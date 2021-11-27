import axios from "axios";
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_LIST_USER_REQUEST,
	ORDER_LIST_USER_SUCCESS,
	ORDER_LIST_USER_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_DELETE_REQUEST,
	ORDER_DELETE_SUCCESS,
	ORDER_DELETE_FAIL,
} from "../constants/orderConstants";
import { AppThunk } from "../store";

export const createOrder =
	(order: Order): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ORDER_CREATE_REQUEST });
			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo!.token}`,
				},
			};
			const { data } = await axios.post("/api/orders", order, config);
			dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ORDER_CREATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const getOrderDetails =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ORDER_DETAILS_REQUEST });
			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo!.token}`,
				},
			};
			const { data } = await axios.get(`/api/orders/${id}`, config);
			dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ORDER_DETAILS_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const payOrder =
	(orderId: string, paymentResult: PaymentResult): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ORDER_PAY_REQUEST });
			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${userInfo!.token}`,
				},
			};
			const { data } = await axios.put(
				`/api/orders/${orderId}/pay`,
				paymentResult,
				config
			);
			dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ORDER_PAY_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const getUserOrders = (): AppThunk => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_LIST_USER_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo!.token}`,
			},
		};
		const { data } = await axios.get("/api/orders/myorders", config);
		dispatch({ type: ORDER_LIST_USER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_LIST_USER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getOrders = (): AppThunk => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_LIST_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo!.token}`,
			},
		};
		const { data } = await axios.get("/api/orders", config);
		dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deliverOrder =
	(orderId: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ORDER_DELIVER_REQUEST });
			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo!.token}`,
				},
			};
			const { data } = await axios.put(
				`/api/orders/${orderId}/deliver`,
				{},
				config
			);
			dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ORDER_DELIVER_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
export const deleteOrder =
	(orderId: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ORDER_DELETE_REQUEST });
			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo!.token}`,
				},
			};
			const { data } = await axios.delete(
				`/api/orders/${orderId}`,
				config
			);
			dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ORDER_DELETE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
