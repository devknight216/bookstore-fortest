import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import CartScreen from "./screens/CartScreen/CartScreen";
import FavoriteScreen from "./screens/FavoriteScreen/FavoriteScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen/OrderScreen";
import UserListScreen from "./screens/UserListScreen/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen/ProductEditScreen";
import OrdersScreen from "./screens/OrdersScreen/OrdersScreen";

function App() {
	return (
		<Router>
			<Header></Header>
			<main className="py-3">
				<Container>
					<Route path="/" component={HomeScreen} exact></Route>
					<Route
						path="/search/:keyword"
						component={HomeScreen}
						exact
					></Route>
					<Route
						path="/search/:keyword/page/:pageNumber"
						component={HomeScreen}
						exact
					></Route>
					<Route
						path="/page/:pageNumber"
						component={HomeScreen}
					></Route>
					<Route
						path="/product/:id"
						component={ProductScreen}
						exact
					></Route>
					<Route
						path="/cart/:id?"
						component={CartScreen}
						exact
					></Route>
					<Route
						path="/favorite/:id?"
						component={FavoriteScreen}
						exact
					></Route>
					<Route path="/login" component={LoginScreen} exact></Route>
					<Route
						path="/profile"
						component={ProfileScreen}
						exact
					></Route>
					<Route
						path="/register"
						component={RegisterScreen}
						exact
					></Route>
					<Route
						path="/shipping"
						component={ShippingScreen}
						exact
					></Route>
					<Route
						path="/payment"
						component={PaymentScreen}
						exact
					></Route>
					<Route
						path="/placeorder"
						component={PlaceOrderScreen}
						exact
					></Route>
					<Route
						path="/orders/:id"
						component={OrderScreen}
						exact
					></Route>
					<Route
						path="/admin/userList"
						component={UserListScreen}
						exact
					></Route>
					<Route
						path="/admin/user/:id/edit"
						component={UserEditScreen}
						exact
					></Route>
					<Route
						path="/admin/productList"
						component={ProductListScreen}
						exact
					></Route>
					<Route
						path="/admin/productList/:pageNumber"
						component={ProductListScreen}
						exact
					></Route>
					<Route
						path="/admin/product/:id/edit"
						component={ProductEditScreen}
						exact
					></Route>
					<Route
						path="/admin/orderList"
						component={OrdersScreen}
						exact
					></Route>
				</Container>
			</main>
			<Footer></Footer>
		</Router>
	);
}

export default App;
