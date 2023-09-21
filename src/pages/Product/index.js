import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import { useGetCatalogItemQuery } from "../../api";
import Skeleton from "react-loading-skeleton";
import Breadcrumbs from "../../components/Breadcrumbs";
import SliderProductInfo from "../../elements/SliderProductInfo";
import Tabs from "../../elements/Tabs";
import SvgIcon from "../../elements/SvgIcon";
import "./styles.scss";

const Product = () => {
  const { id } = useParams();
  const [count, setCount] = useState(1);

  const { product, isLoading, isFetching, isError, refetch } =
    useGetCatalogItemQuery(
      {
        id: id,
      },
      {
        selectFromResult: ({
          data,
          isLoading,
          isFetching,
          isError,
          refetch,
        }) => ({
          product: data?.product?.attributes,
          isLoading: isLoading,
          isFetching: isFetching,
          isError: isError,
          refetch: refetch,
        }),
      }
    );

  // useEffect(() => {}, []);

  console.log("product", product);

  const setCountInc = () => {
    setCount(count + 1);
  };

  const setCountDec = () => {
    setCount(count <= 1 ? 1 : count - 1);
  };

  return (
    <>
      {product || !isLoading ? (
        <Breadcrumbs title={product?.title || ""} />
      ) : (
        <Skeleton height={112} />
      )}
      {/* <BannerSecondary isLoading={isLoading || isFetching} /> */}
      <section className="content-center center gap-xs gap-btm-md product">
        <div className="product__info-wrap">
          <div className="product__slider">
            <SliderProductInfo isLoading={isLoading} />
          </div>
          {product || !isLoading ? (
            <div className="product__info">
              <h2 className="product__title">Product name</h2>
              <p className="product__price">199,50 SAR</p>
              <p className="product__desk">
                Product Short Description senectus et netus et malesuada fames
                ac turpis egestas. Vesitbulum tortor quam, feugiat vitae,
                ultricies eget, tempor sit amet, ante. Donec eu libero sit amet
                quam egestas semper. Aenean ultricies mi vitae est. Mauris
                placerat eleifend
              </p>
              <div className="product__purchase-info">
                <div className="product__purchase-counter-wrap">
                  <button
                    className="product__purchase-counter-dec"
                    onClick={setCountDec}
                  />
                  <input
                    className="product__purchase-counter"
                    type="number"
                    min="1"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                  />
                  <button
                    className="product__purchase-counter-inc"
                    onClick={setCountInc}
                  />
                </div>
                <div className="product__purchase-add-wrap">
                  <button
                    className="btn product__purchase-add"
                    type="button"
                    aria-label="add to сart"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    className="product__purchase-like"
                    aria-label="add to favourites"
                  >
                    <SvgIcon addСlass="socials__icon" icon="heart" />
                  </button>
                </div>
              </div>
              <ul className="product__purchase-specs-list">
                <li className="product__purchase-specs-item">
                  Lorem ipsum dolor sit amet,
                </li>
                <li className="product__purchase-specs-item">
                  Lorem ipsum dolor sit amet,
                </li>
                <li className="product__purchase-specs-item">
                  Lorem ipsum dolor sit amet,
                </li>
              </ul>
            </div>
          ) : (
            <div className="product__info">
              <Skeleton className="h2 product__title" />
              <Skeleton className="product__price" />
              <Skeleton className="product__desk" />
              <div className="product__purchase-info">
                <div className="product__purchase-counter-wrap">
                  <Skeleton className="product__purchase-counter" />
                </div>
                <div className="product__purchase-add-wrap">
                  <Skeleton className="product__purchase-add" />
                  <Skeleton className="product__purchase-like" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="product__tabs gap">
          <Tabs isLoading={isLoading} />
        </div>
      </section>
    </>
  );
};

export default Product;
