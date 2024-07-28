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

        if(CartItems.length === 0 && token !== null){
            getCartItem(token);
        }
    }, [Items.length, CartItems.length, CartItemLoading, loading]);

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

    const addToCarts = async (name, image, price, des, token) => {
        try {
            const response = await fetch("https://orbi-e-commerce-website-backend.onrender.com/cart/addNewItem", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({ name: name, image: image[0], price: price, des: des }),
            });

            const data = await response.json();
            
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
        <Context.Provider value={{ auth, setauth, loginToken, siginToken, addToCarts, CartItems, CartItemLoading, removeItem, Items, loading }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
