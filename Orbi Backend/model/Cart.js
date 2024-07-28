import mongoose from "mongoose";

const CartModel = mongoose.Schema({
    id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    des: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
}, { timestamps: true });

const Cart = mongoose.model('CART', CartModel);

export default Cart;