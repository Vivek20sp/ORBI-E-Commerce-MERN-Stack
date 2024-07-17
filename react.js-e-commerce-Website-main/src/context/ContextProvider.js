import React, { useEffect, useState } from 'react';
import Context from './ContextState';

const ContextProvider = (props) => {
    const [auth, setauth] = useState('');
    const [Items, setItems] = useState([]);
    const [loading, setloading] = useState(false);
    const [CartItems, setCartItems] = useState([]);
    const [CartItemLoading, setCartItemLoading] = useState(false);

    useEffect(() => {
        const itemData = async () => {
            try {
                setloading(true);
                const response = await fetch("https://orbi-e-commerce-website-api.onrender.com/API/getAllProduct", {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (data.error) {
                    console.log('items fetch error');
                } else {
                    setItems(data.items);
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setloading(false);
            }
        };

        const getCartItem = async (token) => {
            try {
                setCartItemLoading(true);
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

                console.log(data);

                setCartItems(data.cartItems);

                return data;

            } catch (error) {
                console.log(error.message);
            } finally {
                setCartItemLoading(false);
            }
        };

        if (Items.length === 0) {
            itemData();
        }
    }, [Items.length, loading]);

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
            return data;
        } catch (error) {
            return error.message;
        }
    };

    const addToCart = async (name, image, price, des, token) => {
        try {
            const response = await fetch("https://orbi-e-commerce-website-backend.onrender.com/cart/addNewItem", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json",
                    "Auth-Token": token,
                },
                body: JSON.stringify({ name: name, image: image, price: Number.parseInt(price), des: des }),
            });

            const data = await response.json();
            console.log(data);

            if (data.error) {
                throw new Error('Internal Cart Adding Error');
            }

            return data;

        } catch (error) {
            return error.message;
        }
    };

    const removeItem = async (token, id) => {
        try {
            const response = await fetch(`https://orbi-e-commerce-website-backend.onrender.com/cart/removeProduct/${id}`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            });

            const data = await response.json();

            if (data.error) {
                throw new Error('Internal Cart Items Error');
            }

            return data;
        } catch (error) {
            return error.message;
        }
    };

    return (
        <Context.Provider value={{ auth, setauth, loginToken, siginToken, addToCart, CartItems, CartItemLoading, removeItem, Items, loading }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
