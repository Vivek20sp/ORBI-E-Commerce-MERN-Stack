import React, { useContext } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import Context from "../../../context/ContextState";
import Loader from "../../designLayouts/loader";

const SpecialOffers = () => {
  const context = useContext(Context);
  const { Items, loading } = context;
  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {loading ? (
          <div className=" w-full flex ms-100 justify-start align-middle items-center gap-4">
            <Loader width={200} height={200} />
            <Loader width={200} height={200} />
            <Loader width={200} height={200} />
            <Loader width={200} height={200} />
            <Loader width={200} height={200} />
            <Loader width={200} height={200} />
          </div>
        ) : (
          Items.slice(13, 17).map((item) => (
            <div key={item._id} className="px-2">
              <Product
                _id={item.id}
                img={item.image}
                productName={item.name}
                price={item.price}
                color={item.color}
                badge={item.badge}
                des={item.des}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SpecialOffers;
