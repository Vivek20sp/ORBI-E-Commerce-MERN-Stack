import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import Context from "../../../context/ContextState";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const context = useContext(Context);
  const token = localStorage.getItem('AuthToken');
  const { addToCart } = context;
  const handleOnAddCart = (productInfo) => {
    dispatch(
      addToCart({
        _id: productInfo.id,
        name: productInfo.productName,
        quantity: 1,
        image: productInfo.img,
        badge: productInfo.badge,
        price: productInfo.price,
        colors: productInfo.color,
      })
    );
    const data = addToCart(productInfo.productName, productInfo.img, productInfo.price, productInfo.des, token);
    console.log(data);
    data.then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">{productInfo.price}₹</p>
      <p className="text-base text-gray-600">{productInfo.des}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span> {productInfo.color}
      </p>
      <button
        onClick={() => handleOnAddCart(productInfo)}
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

export default ProductInfo;
