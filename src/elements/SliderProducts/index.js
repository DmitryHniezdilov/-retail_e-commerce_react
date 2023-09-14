import { Component, memo } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "./styles.scss";
import productBathroomTiles from "./product-bathroom-tiles.jpg";
import productKitchenInterior from "./product-kitchen-interior.jpg";
import productMarble from "./product-marble.jpg";
import productOutFlooring from "./product-out-flooring.jpg";

const SlideProduct = ({ title, description, img, link }) => {
  return (
    <div className="slider-products__slide-wrap">
      <Link to={link} className="slider-products__slide-link">
        <figure className="slider-products__img-box">
          <img
            className="slider-products__img"
            src={img}
            alt={`product ${title}`}
          ></img>
        </figure>
        <div className="slider-products__text-wrap">
          <h5 className="slider-products__title">{title}</h5>
          <p className="slider-products__desc">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default class SliderProducts extends Component {
  render() {
    const settings = {
      infinite: true,
      arrows: true,
      dots: false,
      focusOnSelect: true,
      autoplay: false,
      autoplaySpeed: 5000,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1365,
          settings: {
            slidesToShow: 3,
            dots: true,
          },
        },
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 2,
            dots: true,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            dots: true,
          },
        },
      ],
    };

    const productList = [
      {
        title: "Bathroom Tiles",
        description: "Ante mus blandit sapien sociosqu per consequat ad.",
        img: productBathroomTiles,
        link: "/",
      },
      {
        title: "Marble",
        description: "Ante mus blandit sapien sociosqu",
        img: productMarble,
        link: "/",
      },
      {
        title: "Outdoor Flooring",
        description: "Ante mus blandit sapien sociosqu per consequat ad.",
        img: productOutFlooring,
        link: "/",
      },
      {
        title: "Kitchen Interior",
        description: "Ante mus blandit sapien sociosqu per consequat ad.",
        img: productKitchenInterior,
        link: "/",
      },
    ];

    const isLoading = this.props.isLoading;

    if (isLoading) {
      return <Skeleton className="slider-products" />;
    }

    const isDesktop = this.props.isDesktop;

    let body;

    if (isDesktop) {
      body = (
        <div className="slider-products__slick">
          {productList.map(({ title, description, img, link }, idx) => (
            <SlideProduct
              title={title}
              description={description}
              img={img}
              link={link}
              key={idx}
            />
          ))}
        </div>
      );
    } else {
      body = (
        <Slider
          {...settings}
          className="slider-products__slick slider-elements slider-elements--arrows slider-elements--dots"
        >
          {productList.map(({ title, description, img, link }, idx) => (
            <SlideProduct
              title={title}
              description={description}
              img={img}
              link={link}
              key={idx}
            />
          ))}
        </Slider>
      );
    }

    return <div className="slider-products">{body}</div>;
  }
}
