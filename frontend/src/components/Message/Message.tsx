import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const Message = ({
	variant = "primary",
	dismissible = false,
	children,
}: {
	variant?: string;
	dismissible?: boolean;
	children: React.ReactNode;
}) => {
	const [show, setShow] = useState(true);
	if (show) {
		return (
			<Alert
				variant={variant}
				dismissible={dismissible}
				onClose={() => setShow(false)}
			>
				{children}
			</Alert>
		);
	} else {
		return <></>;
	}
};

export default Message;
