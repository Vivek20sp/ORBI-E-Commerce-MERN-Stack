import React, { useContext } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import Context from "../../../context/ContextState";
import Loader from "../../designLayouts/loader.js";

const NewArrivals = () => {
  const context = useContext(Context);
  const { Items, loading } = context;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      {loading ? (
        <div className="flex justify-start items-center gap-4">
          <Loader width={200} height={200} />
          <Loader width={200} height={200} />
          <Loader width={200} height={200} />
          <Loader width={200} height={200} />
          <Loader width={200} height={200} />
          <Loader width={200} height={200} />
        </div>
      ) : (
        <Slider {...settings}>
          {Items.slice(0, 6).map((item) => (
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
          ))}
        </Slider>
      )}
    </div>
  );
};

export default NewArrivals;
