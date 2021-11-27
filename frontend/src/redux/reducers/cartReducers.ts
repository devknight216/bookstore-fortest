import { AnyAction } from "redux";
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const cartReducer = (
	state: Partial<
		Pick<AppState, "cartItems" | "shippingAddress" | "paymentMethod">
	> = {
		cartItems: [] as Array<[Product, number]>,
		shippingAddress: {} as Address,
	},
	action: AnyAction
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const inCart = state.cartItems!.find(
				(p) => p[0]._id === action.payload[0]._id
			);
			if (inCart) {
				return {
					...state,
					cartItems: state.cartItems!.map((item) =>
						item[0]._id === action.payload[0]._id
							? action.payload
							: item
					) as Array<[Product, number]>,
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems!, action.payload] as Array<
						[Product, number]
					>,
				};
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems!.filter(
					(item) => item[0]._id !== action.payload
				) as Array<[Product, number]>,
			};
		case CART_SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload as Address,
			};
		case CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			};
		default:
			return state;
	}
};
