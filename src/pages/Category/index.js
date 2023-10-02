import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useGetCatalogQuery } from "../../api";
import CatalogSettings from "../../components/CatalogSettings";
import CatalogGrid from "../../components/CatalogGrid";
import BannerSecondary from "../../elements/BannerSecondary";
import BannerPromo from "../../elements/BannerPromo";
import { INITIAL_RANGE_VALUE, DESKTOP_WIDTH_LG } from "../../utils/constants";

const Category = () => {
  const { id } = useParams();

  const [paginationStep, setPaginationStep] = useState(
    window.innerWidth > DESKTOP_WIDTH_LG ? 8 : 6
  );

  const [rangeValue, setRangeValue] = useState(INITIAL_RANGE_VALUE);
  const [isShowPriceRange, setShowPriceRange] = useState(false);
  const [paginationLimit, setPaginationLimit] = useState(paginationStep);
  const [selectedSort, setSelectedSort] = useState("updatedAt");

  const { catalogList, pagination, isLoading, isFetching } = useGetCatalogQuery(
    {
      paginationLimit: paginationLimit,
      category: id,
      sort: selectedSort,
      between: rangeValue,
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

  const isCategoryLoading = isLoading || isFetching || !catalogList;

  const handleClosePriceRange = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setShowPriceRange(false);
      }
    },
    [setShowPriceRange]
  );

  const isLoadGoods = pagination?.total >= paginationLimit + paginationStep;
  const addGoods = () => {
    const getLastCard = document.querySelector("#js-card-scroll:last-child");

    isLoadGoods
      ? setPaginationLimit(paginationLimit + paginationStep)
      : setPaginationLimit(pagination.total);

    getLastCard.scrollIntoView({ behavior: "smooth" }); //scroll last element to top
  };

  const onSelectedSort = (e) => setSelectedSort(e.target.value);
  const onShowPriceRange = () => setShowPriceRange((current) => !current);

  useEffect(() => {
    if (isShowPriceRange) {
      document.body.addEventListener("keydown", handleClosePriceRange);
    } else {
      document.body.removeEventListener("keydown", handleClosePriceRange);
    }

    return () => {
      document.body.removeEventListener("keydown", handleClosePriceRange);
    };
  }, [isShowPriceRange, handleClosePriceRange]);

  return (
    <main>
      <BannerSecondary isLoading={isCategoryLoading} />
      <section className="content-center center gap-sm gap-btm-md">
        <CatalogSettings
          pagination={pagination}
          selectValue={selectedSort}
          onSelect={onSelectedSort}
          isShowPriceRange={isShowPriceRange}
          onShowPriceRange={onShowPriceRange}
          setRangeValue={setRangeValue}
          rangeValue={rangeValue}
          isLoad={isLoadGoods}
        />
        <CatalogGrid
          catalogList={catalogList}
          isLoad={isLoadGoods}
          onLoad={addGoods}
          isLoading={isCategoryLoading}
        />
      </section>
      <BannerPromo isLoading={isCategoryLoading} />
    </main>
  );
};

export default Category;
