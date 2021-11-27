import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PaginationComponent = ({
	pages,
	page,
	isAdmin = false,
	keyword,
}: params) => {
	return pages > 1 ? (
		<Pagination>
			{[...Array(pages).keys()].map((p) => (
				<LinkContainer
					key={p + 1}
					to={
						!isAdmin
							? keyword
								? `/search/${keyword}/page/${p + 1}`
								: `/page/${p + 1}`
							: `/admin/productList/${p + 1}`
					}
				>
					<Pagination.Item active={p + 1 === page}>
						{p + 1}
					</Pagination.Item>
				</LinkContainer>
			))}
		</Pagination>
	) : (
		<></>
	);
};

interface params {
	pages: number;
	page: number;
	isAdmin?: boolean;
	keyword: string;
}

export default PaginationComponent;
