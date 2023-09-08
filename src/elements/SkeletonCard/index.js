import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./styles.scss";

const SkeletonCard = () => {
  return (
    <div className="scard">
      <div className="scard__link">
        <div className="scard__img-wrap">
          <Skeleton className="scard__img" />
        </div>
        <div className="scard__desc-wrap">
          <p className="scard__title">
            <Skeleton className="scard__title" />
          </p>
          <p className="scard__price-wrap">
            <span className="scard__price-old">
              <Skeleton className="scard__price-old" />
            </span>
            <span className="scard__price-cur">
              <Skeleton className="scard__price-cur" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
