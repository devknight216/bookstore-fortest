import React, { useState, useEffect, FormEvent } from "react";
import {
	Form,
	Button,
	FormGroup,
	FormLabel,
	FormControl,
	InputGroup,
} from "react-bootstrap";
import { RouteChildrenProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import {
	detailsProduct,
	editProduct,
} from "../../../redux/actions/productActions";
import FormContainer from "../../FormContainer/FormContainer";
import {
	PRODUCT_EDIT_RESET,
	PRODUCT_DETAILS_RESET,
} from "../../../redux/constants/productConstants";
import axios from "axios";

const ProductEditScreen = ({
	location,
	history,
	match,
}: RouteChildrenProps<RouteParams>) => {
	const [name, setName] = useState("");
	const [author, setAuthor] = useState("");
	const [image, setImage] = useState("");
	const [category, setCategory] = useState("");
	const [brand, setBrand] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [inStock, setInStock] = useState(0);
	const [uploading, setUploading] = useState(false);
	const dispatch = useAppDispatch();

	const {
		loading: editLoading,
		success: editSuccess,
		// product: updatedProduct,
		error: editError,
	} = useAppSelector((state) => state.productEdit);

	const {
		product,
		loading: detailsLoading,
		error: detailsError,
	} = useAppSelector((state) => state.productDetails);

	useEffect(() => {
		dispatch(detailsProduct(match!.params.id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (product && product._id === match?.params.id) {
			setName(product.name);
			setAuthor(product.author);
			setImage(product.image);
			setCategory(product.category);
			setBrand(product.brand);
			setPrice(product.price);
			setDescription(product.description);
			setInStock(product.inStock);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product]);

	useEffect(() => {
		if (editSuccess) {
			dispatch({ type: PRODUCT_EDIT_RESET });
			history.push("/admin/productList");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editSuccess, history]);

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();
		if (product) {
			dispatch(
				editProduct({
					...product,
					name,
					author,
					image,
					category,
					brand,
					price,
					description,
					inStock,
				})
			);
			dispatch({ type: PRODUCT_DETAILS_RESET });
		}
	};

	const uploadFileHandler = async (event: FormEvent) => {
		const target = event.target as HTMLInputElement;
		const file = (target.files as FileList)[0];
		const formData = new FormData(); // equal to multipart/form-data
		formData.append("image", file);
		setUploading(true);
		try {
			const config = {
				headers: {
					"Content-type": "multipart/form-data",
				},
			};

			const { data } = await axios.post("/api/upload", formData, config);
			setImage(data);
			console.log(data);
			setUploading(false);
		} catch (error) {
			console.log(error);
			setUploading(false);
		}
	};

	return (
		<FormContainer>
			<h3>Edit Product</h3>
			{/* {message && <Message variant="danger">{message}</Message>} */}
			{editError && <Message variant="danger">{editError}</Message>}
			{detailsError && <Message variant="danger">{detailsError}</Message>}
			{editLoading || (detailsLoading && <Loader></Loader>)}
			<Form onSubmit={submitHandler} className="pt-4">
				<FormGroup controlId="name">
					<FormLabel>Title</FormLabel>
					<FormControl
						type="text"
						required
						placeholder="Product name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="author">
					<FormLabel>Author</FormLabel>
					<FormControl
						type="text"
						required
						placeholder="Author name"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="price">
					<FormLabel>Price</FormLabel>
					<FormControl
						type="number"
						required
						placeholder="Enter price"
						value={price}
						onChange={(e) => setPrice(parseInt(e.target.value))}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="image">
					<FormLabel>Image</FormLabel>
					<InputGroup>
						<FormControl
							style={{ width: "60%" }}
							type="text"
							required
							placeholder="Enter image URL"
							value={image}
							onChange={(e) => setImage(e.target.value)}
						></FormControl>
						<Form.File
							style={{ width: "40%" }}
							id="image-file"
							custom
							label="Choose file"
							onChange={uploadFileHandler}
						></Form.File>
					</InputGroup>
					{uploading && <Loader></Loader>}
				</FormGroup>

				<FormGroup controlId="category">
					<FormLabel>Category</FormLabel>
					<FormControl
						type="text"
						required
						placeholder="Enter category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="inStock">
					<FormLabel>In stock</FormLabel>
					<FormControl
						type="number"
						required
						placeholder="Quantity"
						value={inStock}
						onChange={(e) => setInStock(parseInt(e.target.value))}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="description">
					<FormLabel>Description</FormLabel>
					<FormControl
						type="text"
						style={{ height: "150px" }}
						as="textarea"
						required
						placeholder="Product description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></FormControl>
				</FormGroup>

				<Button className="float-right" type="submit" variant="primary">
					Save
				</Button>
				<Button
					className="mr-2 float-right"
					variant="secondary"
					onClick={() => {
						history.push("/admin/productList");
					}}
				>
					Cancel
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ProductEditScreen;
