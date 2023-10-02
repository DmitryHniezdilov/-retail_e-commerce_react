import { memo } from "react";
import Card from "../../elements/Card";
import SkeletonCard from "../../elements/SkeletonCard";
import "./styles.scss";

const CatalogGrid = ({ catalogList, isLoad, onLoad, isBanner }) => {
  return (
    <div className={`catalog-grid ${isBanner && "catalog-grid--bnr"}`}>
      <div className="catalog-grid__list">
        {catalogList
          ? catalogList.map((item) => {
              return <Card product={item} key={item.id} />;
            })
          : Array(4)
              .fill()
              .map((item, idx) => <SkeletonCard key={idx} />)}
      </div>
      {isLoad && !isBanner && (
        <div className="catalog-grid__btn-wrap catalog-grid__btn-wrap--top-enlg">
          <button
            type="button"
            className="btn"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onLoad();
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(CatalogGrid);
