import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import { useSelector } from "react-redux";
import Context from "../../context/ContextState";

const SpecialCase = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const context = useContext(Context);
  const { CartItems } = context;
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const token  = localStorage.getItem('AuthToken');

  useEffect(() => {
    let count = 0;
    const hash = {}
    products.map((item)=>{
      hash[item._id] = item;
    });
    CartItems.map((item)=>{
      if(hash[item.id] !== undefined){
        count += 1;
      }
    })
    setNumberOfProducts(count);
  });
  
  return (
    <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">
      <Link to="/userProfile">
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
          <div className="flex justify-center items-center">
            <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">Profile</p>
        </div>
      </Link>
      <Link to="/cart">
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
          <div className="flex justify-center items-center">
            <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">Buy Now</p>
          {token && numberOfProducts > 0 && (
            <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {numberOfProducts}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default SpecialCase;
