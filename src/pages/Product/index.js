import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetCatalogItemQuery } from "../../api";

const Product = () => {
  const { id } = useParams();

  console.log("id product", id);

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

  useEffect(() => {}, []);

  return (
    <>
      {/* <BannerSecondary isLoading={isLoading || isFetching} /> */}
      <section className="content-center center gap-sm gap-btm-md">
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
