import React, { FormEvent, useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router";
import "./SearchBox.scss";

const SearchBox = () => {
	const [keyword, setKeyword] = useState("");
	const history = useHistory();

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push("/");
		}
	};

	return (
		<Form onSubmit={submitHandler} inline className="search-form">
			<InputGroup>
				<Form.Control
					type="text"
					name="query"
					placeholder="Search products..."
					className="sm-ml-5"
					onChange={(e) => setKeyword(e.target.value)}
				></Form.Control>
				<InputGroup.Append>
					<Button type="submit" variant="outline-success">
						Search
					</Button>
				</InputGroup.Append>
			</InputGroup>
		</Form>
	);
};

export default SearchBox;
