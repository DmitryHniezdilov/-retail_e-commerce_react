import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./styles.scss";

const SkeletonCard = () => {
  return (
    <div className="card">
      <div className="card__link">
        <div className="card__img-wrap">
          <Skeleton width={170} height={170} />
        </div>
        <div className="card__desc-wrap">
          <p className="card__title">
            <Skeleton width={200} height={26} />
          </p>
          <p className="card__price-wrap">
            <span className="card__price-old">
              <Skeleton width={63} height={18} />
            </span>
            <span className="card__price-cur">
              <Skeleton width={98} height={18} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
