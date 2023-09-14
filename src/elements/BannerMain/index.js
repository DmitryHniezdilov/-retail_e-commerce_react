import { memo } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import bcg from "./banner-main-bcg.jpg";
import "./styles.scss";

const BannerMain = ({ isLoading, title, description, link = "/" }) => {
  if (isLoading) {
    return <Skeleton classNameNameName="banner-main" />;
  }

  return (
    <div className="banner-main decor-bcg decor-bcg--top">
      <figure className="banner-main__img-box">
        <img
          className="banner-main__img"
          src={bcg}
          alt="main banner background"
        ></img>
      </figure>
      <div className="banner-main__inner center">
        <div className="banner-main__text-wrap">
          <h1 className="banner-main__title">{title}</h1>
          <p className="banner-main__desc">{description}</p>
          <div className="banner-main__btn-wrap">
            <Link to={link} className="btn btn--light">
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BannerMain);
