import mongoose from "mongoose";

const ProductModel = mongoose.Schema({
    id:{
        type:String,
        require:true,
    },
    name: {
        type: String,
        require: true,
    },
    image: [
        {
            type: String,
            data: String,
            require: true,
        }
    ],
    price: {
        type: Number,
        require: true,
    },
    color:{
        type:String,
        require:true,
    },
    badge:{
        type:Boolean,
        require:true,
    },
    des: {
        type: String,
        require: true,
    },
},{timestamp:true});

const Product = mongoose.model('ProductModel',ProductModel);

export default Product;