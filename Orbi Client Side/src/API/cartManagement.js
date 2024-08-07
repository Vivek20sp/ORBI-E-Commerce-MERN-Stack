export const addToCart = async (name, image, price, des, token) => {
    try {
        const response = await fetch("https://orbi-e-commerce-website-backend.onrender.com/cart/addNewItem", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token,
            },
            body: JSON.stringify({ name: name, image: image, price: price, des: des }),
        });

        const data = await response.json();

        if (data.error) {
            throw new Error('Internal Cart Adding Error');
        }

        return data;
    } catch (error) {
        return error;
    }
}

export const getCartItem = async (token) => {
    try {
        const response = await fetch("https://orbi-e-commerce-website-backend.onrender.com/cart/getCartItems", {
            method: "POST",
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

        return data;
    } catch (error) {
        return error;
    }
}

export const removeItem = async (token, id) => {
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
        return error;
    }
}