import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCatalogQuery, useGetMainQuery } from "../../api";
import Skeleton from "react-loading-skeleton";
import BannerMain from "../../elements/BannerMain";
import SliderProducts from "../../elements/SliderProducts";
import SliderProjects from "../../elements/SliderProjects";
import BannerIndex from "../../elements/BannerIndex";
import CatalogGrid from "../../components/CatalogGrid";
import {
  DESKTOP_WIDTH_XL,
  DESKTOP_WIDTH_LG,
  INITIAL_RANGE_VALUE,
} from "../../utils/constants";

const Main = () => {
  const innerWidth = useSelector((state) => state.innerWidth);
  const [isDesktop, setIsDesktop] = useState(
    innerWidth > DESKTOP_WIDTH_XL ? true : false
  );

  // const searchValue = useSelector((state) => state.search);
  const [rangeValue, setRangeValue] = useState(INITIAL_RANGE_VALUE);
  const [paginationStep, setPaginationStep] = useState(
    window.innerWidth > DESKTOP_WIDTH_LG ? 8 : 6
  );
  const [paginationLimit, setPaginationLimit] = useState(paginationStep);

  const { catalogList, pagination, isLoading, isFetching } = useGetCatalogQuery(
    {
      paginationLimit: paginationLimit,
      between: rangeValue,
    },
    {
      selectFromResult: ({ data, isLoading, isFetching, isError }) => ({
        catalogList: data?.catalogList,
        pagination: data?.catalogMeta?.pagination,
        isLoading: isLoading,
        isFetching: isFetching,
        isError: isError,
      }),
    }
  );

  const {
    data,
    bannerMainData,
    bannerIndexData,
    bannerIndexReverseData,
    isLoadingMainQuery,
    isFetchingMainQuery,
  } = useGetMainQuery(
    { populate: "*" },
    {
      selectFromResult: ({
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
      }) => ({
        data: data,
        bannerMainData: data?.bannerMainData,
        bannerIndexData: data?.bannerIndexData,
        bannerIndexReverseData: data?.bannerIndexReverseData,
        isLoadingMainQuery: isLoading,
        isFetchingMainQuery: isFetching,
        isError: isError,
        refetch: refetch,
      }),
    }
  );

  const isLoadGoods = pagination?.total >= paginationLimit + paginationStep;
  const addGoods = () => {
    const getLastCard = document.querySelector("#js-card-scroll:last-child");

    isLoadGoods
      ? setPaginationLimit(paginationLimit + paginationStep)
      : setPaginationLimit(pagination.total);

    getLastCard.scrollIntoView({ behavior: "smooth" }); //scroll last element to top
  };

  const isGlobalLoading = isLoadingMainQuery || isFetchingMainQuery || !data;

  useEffect(() => {
    innerWidth > DESKTOP_WIDTH_XL ? setIsDesktop(true) : setIsDesktop(false);
  }, [innerWidth]);

  return (
    <main>
      <BannerMain
        isLoading={isGlobalLoading}
        title={bannerMainData?.title}
        description={bannerMainData?.description}
      />
      <section className="content-center center gap-xs">
        {isGlobalLoading ? (
          <>
            <Skeleton width={230} className="h2" />
            <Skeleton height={60} className="content-center__desc" />
          </>
        ) : (
          <>
            <h2>Products</h2>
            <p className="content-center__desc">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
            </p>
          </>
        )}
        <SliderProducts isDesktop={isDesktop} isLoading={isGlobalLoading} />
      </section>
      <BannerIndex
        isLoading={isGlobalLoading}
        title={bannerIndexData?.title}
        description={bannerIndexData?.description}
        isPaperReverse={bannerIndexData?.isPaperReverse}
      />
      <section className="content-center center gap-lg">
        {isGlobalLoading ? (
          <>
            <Skeleton width={230} className="h2" />
            <Skeleton height={60} className="content-center__desc" />
          </>
        ) : (
          <>
            <h2>Projects</h2>
            <p className="content-center__desc">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
            </p>
          </>
        )}
        <SliderProjects isLoading={isGlobalLoading} />
        <div className="content-center__btn-wrap">
          <Link to="/" className="btn btn--sm">
            View All
          </Link>
        </div>
      </section>
      <section className="content-center center gap-lg hide-to-md decor-bcg decor-bcg--content">
        {isGlobalLoading ? (
          <>
            <Skeleton width={230} className="h2" />
            <Skeleton height={60} className="content-center__desc" />
          </>
        ) : (
          <>
            <h2>Tile catalog</h2>
            <p className="content-center__desc">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
            </p>
          </>
        )}
        <CatalogGrid
          catalogList={catalogList}
          isLoad={isLoadGoods}
          onLoad={addGoods}
          isLoading={isLoading || isFetching}
        />
      </section>
      <BannerIndex
        isLoading={isGlobalLoading}
        title={bannerIndexReverseData?.title}
        description={bannerIndexReverseData?.description}
        isPaperReverse={bannerIndexReverseData?.isPaperReverse}
      />
    </main>
  );
};

export default Main;
