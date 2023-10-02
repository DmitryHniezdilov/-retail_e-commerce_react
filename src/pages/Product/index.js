import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCatalogItemQuery, useGetCatalogRandomQuery } from "../../api";
import Skeleton from "react-loading-skeleton";
import Breadcrumbs from "../../components/Breadcrumbs";
import CatalogGrid from "../../components/CatalogGrid";
import BannerPromo from "../../elements/BannerPromo";
import SliderProductInfo from "../../elements/SliderProductInfo";
import Tabs from "../../elements/Tabs";
import SvgIcon from "../../elements/SvgIcon";
import "./styles.scss";
import { DESKTOP_WIDTH_LG } from "../../utils/constants";

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

  const { catalogList, pagination, isLoadingQuery, isFetchingQuery } =
    useGetCatalogRandomQuery(
      {
        paginationLimit: 15,
      },
      {
        selectFromResult: ({
          data,
          isLoading,
          isFetching,
          isError,
          refetch,
        }) => ({
          catalogList: data?.catalogList,
          pagination: data?.catalogMeta?.pagination,
          isLoading: isLoading,
          isFetching: isFetching,
          isError: isError,
          refetch: refetch,
        }),
      }
    );

  const setCountInc = () => {
    setCount(count + 1);
  };

  const setCountDec = () => {
    setCount(count <= 1 ? 1 : count - 1);
  };

  const isProductLoading = isLoading || isFetching || !product;
  const isBannerLoading = isLoadingQuery || isFetchingQuery || !catalogList;

  const prepeareCatalogList = !isBannerLoading && catalogList.slice(0, 4);

  return (
    <>
      {!isProductLoading ? (
        <Breadcrumbs title={product?.title || ""} />
      ) : (
        <Skeleton height={112} />
      )}
      <main className="content-center center gap-xs gap-btm-sm product">
        <div className="product__info-wrap">
          <div className="product__slider">
            <SliderProductInfo isLoading={isProductLoading} />
          </div>
          {!isProductLoading ? (
            <div className="product__info">
              <h2 className="product__title">{product?.title}</h2>
              <p className="product__price">{product?.price}</p>
              <p className="product__desk">{product?.description}</p>
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
        <section className="content-center center gap-lg">
          {isBannerLoading ? (
            <Skeleton width={230} className="h3" />
          ) : (
            <h4>Related Products</h4>
          )}
          <CatalogGrid
            catalogList={prepeareCatalogList}
            isLoading={isBannerLoading}
            isBanner={true}
          />
        </section>
        <BannerPromo isLoading={isBannerLoading} />
      </main>
    </>
  );
};

export default Product;
