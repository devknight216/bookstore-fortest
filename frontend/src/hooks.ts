import { useEffect, useState } from "react";

function useStartLoading(loading: boolean | undefined) {
	const [startLoading, setStartLoading] = useState(true);
	useEffect(() => {
		if (loading) {
			setStartLoading(false);
		}
	}, [loading]);
	return startLoading;
}

export { useStartLoading };
