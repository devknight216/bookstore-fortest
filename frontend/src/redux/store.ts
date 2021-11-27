import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import {
	productListReducer,
	productReducer,
	productDeleteReducer,
	productCreateReducer,
	productEditReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
	orderReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderListReducer,
	userOrdersReducer,
	orderDeliverReducer,
	orderDeleteReducer,
} from "./reducers/orderReducers";
import {
	userDetailsReducer,
	userLoginReducer,
	userRegisterReducer,
	userEditReducer,
	userListReducer,
	userDeleteReducer,
} from "./reducers/userReducers";
import { favoriteReducer } from "./reducers/favoriteReducers";

const cartItemsFromStorage: Array<[Product, number]> = localStorage.getItem(
	"cartItems"
)
	? (JSON.parse(localStorage.getItem("cartItems") as string) as Array<
			[Product, number]
	  >)
	: ([] as Array<[Product, number]>);

const userInfoFromStorage: UserInfo = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo") as string)
	: null;

const shippingAddressFromStorage: Address = localStorage.getItem(
	"shippingAddress"
)
	? JSON.parse(localStorage.getItem("shippingAddress") as string)
	: null;

const preloadedState: any = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
	},
	userLogin: {
		userInfo: userInfoFromStorage,
	},
};

export const store = configureStore({
	reducer: {
		productList: productListReducer,
		productDetails: productReducer,
		productDelete: productDeleteReducer,
		productCreate: productCreateReducer,
		productEdit: productEditReducer,
		cart: cartReducer,
		favorite: favoriteReducer,
		userLogin: userLoginReducer,
		userRegister: userRegisterReducer,
		userDetails: userDetailsReducer,
		userEdit: userEditReducer,
		userDelete: userDeleteReducer,
		order: orderReducer,
		orderDetails: orderDetailsReducer,
		orderPay: orderPayReducer,
		orderDeliver: orderDeliverReducer,
		orderDelete: orderDeleteReducer,
		orderList: orderListReducer,
		userOrders: userOrdersReducer,
		userList: userListReducer,
	},
	preloadedState,
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>;
