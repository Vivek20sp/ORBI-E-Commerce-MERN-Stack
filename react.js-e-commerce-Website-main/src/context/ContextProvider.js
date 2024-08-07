import React, { useEffect, useState } from 'react';
import Context from './ContextState';

const ContextProvider = (props) => {
    const [auth, setauth] = useState('');
    const [Items, setItems] = useState([]);
    const [loading, setloading] = useState(false);
    const [CartItems, setCartItems] = useState([]);
    const [CartItemLoading, setCartItemLoading] = useState(false);
    const token = localStorage.getItem('AuthToken');

    useEffect(() => {
        const itemData = async () => {
            setloading(true);
            try {
                const response = await fetch("https://orbi-e-commerce-website-api.onrender.com/API/getAllProduct", {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                if (data.error) {
                    console.error('items fetch error');
                    return;
                }
                setItems(data.items);
            } catch (error) {
                console.error(error.message);
            } finally {
                setloading(false);
            }
        };

        if (Items.length === 0) {
            itemData();
        }
        // eslint-disable-next-line
    }, [Items.length]);

    useEffect(() => {
        const getCartItem = async () => {
            if (!token) return;
            setCartItemLoading(true);
            try {
                const response = await fetch("https://orbi-e-commerce-website-backend.onrender.com/cart/getCartItems", {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                });

                const data = await response.json();
                if (data.error) {
                    throw new Error('Internal Cart Item Error');
                }
                setCartItems(data.cartItems);
            } catch (error) {
                console.error(error.message);
            } finally {
                setCartItemLoading(false);
            }
        };

        if (CartItems.length === 0) {
            getCartItem();
        }
        // eslint-disable-next-line
    }, [CartItems.length]);

    const loginToken = async (name, email, password) => {
        try {
            const response = await fetch("https://orbi-e-commerce-website-backend.onrender.com/auth/login", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name, email: email, password: password }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error('Login Error');
            }

            const userResponse = await fetch("https://orbi-e-commerce-website-backend.onrender.com/auth/getUserInfo", {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Auth-Token": data.jwtToken,
                },
            });

            const userResponseData = await userResponse.json();

            if (userResponseData.error) {
                throw new Error('Internal Cart Adding Error');
            }

            console.log(userResponseData.user)

            localStorage.setItem('UserProfile',JSON.stringify(userResponseData.user));

            return data;

        } catch (error) {
            return error.message;
        }
    };

    const siginToken = async (name, email, password, phone, address, country) => {
        try {
            const response = await fetch("https://orbi-e-commerce-website-backend.onrender.com/auth/sigin", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name, email: email, password: password, phone: phone, address: address, country: country }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error('Sigin Error');
            }

            const userResponse = await fetch("https://orbi-e-commerce-website-backend.onrender.com/auth/getUserInfo", {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Auth-Token": data.jwtToken,
                },
            });

            const userResponseData = await userResponse.json();

            if (userResponseData.error) {
                throw new Error('Internal Cart Adding Error');
            }

            localStorage.setItem('UserProfile', userResponseData.user);

            return data;

        } catch (error) {
            return error.message;
        }
    };

    const getUserInfo = async (token) => {
        try {
            const response = await fetch("https://orbi-e-commerce-website-backend.onrender.com/auth/getUserInfo", {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Auth-Token": token,
                },
            });

            const data = await response.json();

            if (data.error) {
                throw new Error('Internal Cart Adding Error');
            }

            return data
        } catch (error) {
            return error.message;
        }
    }

    const addToCarts = async (id, name, image, price, quantity, des, token) => {
        try {
            const response = await fetch("https://orbi-e-commerce-website-backend.onrender.com/cart/addNewItem", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({ id: id, name: name, image: image[0], price: price, quantity: quantity, des: des }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error('Internal Cart Adding Error');
            }

            // Fetch updated cart items
            const updatedCartItemsResponse = await fetch("https://orbi-e-commerce-website-backend.onrender.com/cart/getCartItems", {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            });

            const updatedCartItemsData = await updatedCartItemsResponse.json();

            if (updatedCartItemsData.error) {
                throw new Error('Error fetching updated cart items');
            }

            setCartItems(updatedCartItemsData.cartItems);

            return data;

        } catch (error) {
            return error.message;
        }
    };

    const removeItem = async (token, id) => {
        try {
            const response = await fetch(`https://orbi-e-commerce-website-backend.onrender.com/cart/removeProduct/${id}`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Auth-Token": token,
                },
            });

            const data = await response.json();

            if (data.error) {
                throw new Error('Internal Cart Items Error');
            }

            // Fetch updated cart items
            const updatedCartItemsResponse = await fetch("https://orbi-e-commerce-website-backend.onrender.com/cart/getCartItems", {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            });

            const updatedCartItemsData = await updatedCartItemsResponse.json();

            if (updatedCartItemsData.error) {
                throw new Error('Error fetching updated cart items');
            }

            setCartItems(updatedCartItemsData.cartItems);

            return data;
        } catch (error) {
            return error.message;
        }
    };

    const removeAllItemsFromCart = async (token) => {
        try {
            const response = await fetch(`https://orbi-e-commerce-website-backend.onrender.com/cart/removeAllCartItems`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Auth-Token": token,
                },
            });

            const data = await response.json();

            if (data.error) {
                throw new Error('Internal Cart Items Error');
            }

            setCartItems([]);

            return data;
        } catch (error) {
            return error.message;
        }
    }

    return (
        <Context.Provider value={{ auth, setauth, loginToken, siginToken, addToCarts, CartItems, CartItemLoading, removeItem, Items, loading, removeAllItemsFromCart, getUserInfo }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
