interface Product {
	_id: string;
	name: string;
	author: string,
	image: string;
	info: string;
	category: string;
	brand: string;
	currency: string;
	price: number;
	inStock: number;
	rating: number;
	numReviews: number;
	reviews: Array<Review & { [prop: string]: string }>;
	description: string;
}

interface AppState {
	user: UserInfo;
	userInfo: UserInfo | null;
	users: Users;
	cartItems: Array<[Product, number]>;
	favoriteItems: Array<[Product, number]>;
	shippingAddress: Address | null;
	paymentMethod: string;
	order: Order;
	orderDetails: Order;
	orders: Array<Order>;
	products: Array<Product>;
	product: Product;
	loading: boolean;
	error: any;
	success: boolean;
	message: object;
	page: number;
	pages: number;
}

interface UserInfo {
	_id: string;
	name: string;
	email: string;
	isAdmin: boolean;
	token: string;
	password?: string;
}

type Users = Array<UserInfo & { [prop: string]: any }>;

interface Address {
	country: string;
	city: string;
	postalCode: string;
	address: string;
}

type Order = OrderProps & { [prop: string]: any };

// interface Order extends OrderProps {}

interface OrderProps {
	orderItems: Array<
		Partial<Product> & { quantity: number; price: number; product: string }
	>;
	shippingAddress: Address;
	paymentMethod: string;
	itemsPrice: number;
	shippingPrice: number;
	totalPrice: number;
}

interface PaymentResult {
	id: string;
	status: string;
	update_time: string;
	email_address: string;
}

interface RouteParams {
	id: string;
	keyword: string;
	pageNumber: string;
}

interface Review {
	rating: number;
	comment: string;
	name: string;
	user: string;
}
