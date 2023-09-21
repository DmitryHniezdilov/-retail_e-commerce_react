import Slider from "react-slick";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "./styles.scss";
import projectBeachTower from "./project-beach-tower.jpg";
import projectDubaiMall from "./project-dubai-mall.jpg";
import projectKingRoad from "./project-king-road.jpg";
import projectKingdomTower from "./project-kingdom-tower.jpg";

const SliderProjects = ({ isLoading }) => {
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
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const projectsList = [
    {
      title: "Kingdom Tower",
      description: "Marble Flooring",
      img: projectKingdomTower,
      link: "/",
    },
    {
      title: "Dubai mall",
      description: "Wood Flooring",
      img: projectDubaiMall,
      link: "/",
    },
    {
      title: "King Road Offices",
      description: "Outdoor Flooring",
      img: projectKingRoad,
      link: "/",
    },
    {
      title: "Beach Tower Alupang",
      description: "Wood Flooring",
      img: projectBeachTower,
      link: "/",
    },
  ];

  if (isLoading) {
    return <Skeleton className="slider-projects" />;
  }

  return (
    <div className="slider-projects">
      <Slider
        {...settings}
        className="slider-projects__slick slider-elements slider-elements--arrows"
      >
        {projectsList.map(({ title, description, img, link }, idx) => (
          <div
            className="slider-projects__slide-wrap"
            key={`project-slide-${idx}`}
          >
            <Link to={link} className="slider-projects__slide-link">
              <figure className="slider-projects__img-box">
                <img
                  className="slider-projects__img"
                  src={img}
                  alt={`project ${title}`}
                ></img>
              </figure>
              <h5>{title}</h5>
              <p className="slider-projects__desc">{description}</p>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderProjects;
