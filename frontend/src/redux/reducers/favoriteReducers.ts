import { AnyAction } from "redux";
import {
	FAVORITE_ADD_ITEM,
	FAVORITE_REMOVE_ITEM,
} from "../constants/favoriteConstants";

export const favoriteReducer = (
	state: Partial<
		Pick<AppState, "favoriteItems">
	> = {
		favoriteItems: [] as Array<[Product, number]>,
	},
	action: AnyAction
) => {
	switch (action.type) {
		case FAVORITE_ADD_ITEM:
			const infavorite = state.favoriteItems!.find(
				(p) => p[0]._id === action.payload[0]._id
			);
			if (infavorite) {
				return {
					...state,
					favoriteItems: state.favoriteItems!.map((item) =>
						item[0]._id === action.payload[0]._id
							? action.payload
							: item
					) as Array<[Product, number]>,
				};
			} else {
				return {
					...state,
					favoriteItems: [...state.favoriteItems!, action.payload] as Array<
						[Product, number]
					>,
				};
			}
		case FAVORITE_REMOVE_ITEM:
			return {
				...state,
				favoriteItems: state.favoriteItems!.filter(
					(item) => item[0]._id !== action.payload
				) as Array<[Product, number]>,
			};
		default:
			return state;
	}
};
