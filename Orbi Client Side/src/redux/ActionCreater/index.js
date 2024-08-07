import { addToCart, getCartItem, removeItem } from "../../API/cartManagement";
import { login, sigin } from "../../API/loginAndSignUp.js";

export const loginAction = (name, email, password) => {
    return async (dispatch) => {
        try {
            const res = await login(name, email, password);
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: res.jwtToken,
            })
        } catch (error) {
            dispatch({
                type: "LOGIN_FAILURE",
                payload: error.message,
            })
        }
    }
}

export const siginAction = (name, email, password, phone, address, country) => {
    return async (dispatch) => {
        try {
            const res = await sigin(name, email, password, phone, address, country);
            dispatch({
                type: "SIGNUP_SUCCESS",
                payload: res.jwtToken,
            });
        } catch (error) {
            dispatch({
                type: "SIGNUP_FAILURE",
                payload: error.message,
            });
        }
    }
}

export const addToCartAction = (name, image, price, des, token) => {
    return async (dispatch) => {
        try {
            const res = await addToCart(name, image, price, des, token);
            dispatch({
                type: "ADD_TO_CART_SUCCESS",
                payload: res.item,
            })
        } catch (error) {
            dispatch({
                type: "ADD_TO_CART_FAILURE",
                payload: error.message,
            })
        }
    }
}

export const getCartItemsAction = (token) => {
    return async (dispatch) => {
        try {
            const res = await getCartItem(token);
            dispatch({
                type: "GET_ITEM_SUCCESS",
                payload: res.item,
            });
        } catch (error) {
            dispatch({
                type:"GET_ITEM_FAILURE",
                payload:error.message,
            });
        }
    }
}

export const removeItemAction = (token,id) => {
    return async (dispatch) => {
        try {
            const res = await removeItem(token,id);
            dispatch({
                type:"REMOVE_ITEM_SUCCESS",
                payload:res.item,
            })
        } catch (error) {
            dispatch({
                type: "REMOVE_ITEM_FAILURE",
                payload:error.message,
            })
        }
    }
}
