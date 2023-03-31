import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetCatalogQuery } from "../../api";
import CatalogSettings from "../../components/CatalogSettings";
import CatalogGrid from "../../components/CatalogGrid";
import BannerSecondary from "../../elements/BannerSecondary";
import { INITIAL_RANGE_VALUE, DESKTOP_WIDTH_LG } from "../../utils/constants";

const Catalog = () => {
  const { id } = useParams();
  const searchValue = useSelector((state) => state.search);
  // const innerWidth = useSelector((state) => state.innerWidth);

  const [paginationStep, setPaginationStep] = useState(
    // innerWidth > DESKTOP_WIDTH_LG ? 8 : 6
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
      search: searchValue,
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
    <>
      <BannerSecondary isLoading={isLoading || isFetching} />
      <section className="content-center center gap-sm gap-btm-md">
        <CatalogSettings
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
        />
      </section>
    </>
  );
};

export default Catalog;
