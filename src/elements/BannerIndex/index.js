import { memo } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import bcg from "./banner-index-1.jpg";
import bcgReverse from "./banner-index-2.jpg";
import "./styles.scss";

const BannerIndex = ({
  isLoading,
  title,
  description,
  isPaperReverse,
  link = "/",
}) => {
  if (isLoading) {
    return <Skeleton classNameNameName="banner-index skeleton" />;
  }

  return (
    <div
      className={
        isPaperReverse
          ? "banner-index banner-index--reverse gap-lg gap-btm-lg-from-lg"
          : "banner-index  gap-md"
      }
    >
      <div className="banner-index__center center">
        <div className="banner-index__paper">
          <h3 className="banner-index__title">{title}</h3>
          <p className="banner-index__text">{description}</p>
          <div className="banner-index__btn-wrap">
            <Link to={link} className="btn">
              Learn more
            </Link>
          </div>
        </div>
        <figure className="banner-index__img-box">
          <img
            className="banner-index__img"
            src={isPaperReverse ? bcgReverse : bcg}
            alt={`img-banner-index-${title}`}
          ></img>
        </figure>
      </div>
    </div>
  );
};

export default memo(BannerIndex);
