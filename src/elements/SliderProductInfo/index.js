import { memo } from "react";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "./styles.scss";
import productSlider1 from "./product-slider-1.jpg";
import productSlider2 from "./product-slider-2.jpg";
import productSlider3 from "./product-slider-3.jpg";
import productSlider4 from "./product-slider-4.jpg";

const SliderProductInfo = ({ isLoading }) => {
  const imgProductList = [
    { img: productSlider1 },
    { img: productSlider2 },
    { img: productSlider3 },
    { img: productSlider4 },
    { img: productSlider1 },
  ];

  const settings = {
    customPaging: function (i) {
      return (
        <figure className="slider-product__img-box-thumb">
          <img
            className="slider-product__img-thumb"
            src={imgProductList[i].img}
            alt=""
          />
          ;
        </figure>
      );
    },
    arrows: false,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider
        {...settings}
        className="slider-elements slider-elements--thumb slider-product"
      >
        {!isLoading ? (
          imgProductList.map(({ img }, idx) => (
            <figure className="slider-product__img-box" key={idx}>
              <img
                src={img}
                alt={`product image ${idx + 1}`}
                className="slider-product__img"
              />
            </figure>
          ))
        ) : (
          <Skeleton className="slider-product__img-box" />
        )}
        {}
      </Slider>
    </div>
  );
};

export default memo(SliderProductInfo);
