import React, { PropsWithChildren } from "react";
import { Row, Col, Container } from "react-bootstrap";

const FormContainer = ({ children }: PropsWithChildren<any>) => {
	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col md={5} xs={12}>
					{children}
				</Col>
			</Row>
		</Container>
	);
};

export default FormContainer;
