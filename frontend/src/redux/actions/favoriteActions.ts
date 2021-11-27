import axios from "axios";
import {
	FAVORITE_ADD_ITEM,
    FAVORITE_REMOVE_ITEM,
} from "../constants/favoriteConstants";
import { AppThunk } from "../store";

export const addItemToFavorites =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		const { data } = await axios.get(`/api/products/${id}`);
		dispatch({ type: FAVORITE_ADD_ITEM, payload: [data] });
		localStorage.setItem(
			"favoriteItems",
			JSON.stringify(getState().favorite.favoriteItems)
		);
	};
export const removeItemFromFavorites =
    (id: string): AppThunk =>
    async (dispatch, getState) => {
        dispatch({ type: FAVORITE_REMOVE_ITEM, payload: id });
        localStorage.setItem(
            "favoriteItems",
            JSON.stringify(getState().favorite.favoriteItems)
        );
};
