import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetCatalogItemQuery } from "../../api";
import Skeleton from "react-loading-skeleton";
import Breadcrumbs from "../../components/Breadcrumbs";

const Product = () => {
  const { id } = useParams();

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

  return (
    <>
      {product || !isLoading ? (
        <Breadcrumbs title={product?.title || ""} />
      ) : (
        <Skeleton height={112} />
      )}
      {/* <BannerSecondary isLoading={isLoading || isFetching} /> */}
      <section className="content-center center gap-sm gap-btm-md">
        {/* {`Product ID - ${id}`} */}
        {/* <CatalogSettings
          pagination={pagination}
          selectValue={selectedSort}
          onSelect={onSelectedSort}
          isShowPriceRange={isShowPriceRange}
          onShowPriceRange={onShowPriceRange}
          setRangeValue={setRangeValue}
          rangeValue={rangeValue}
        />
        <CatalogGrid
          catalogList={catalogList}
          isLoad={isLoadGoods}
          onLoad={addGoods}
          isLoading={isLoading || isFetching}
        /> */}
      </section>
    </>
  );
};

export default Product;
