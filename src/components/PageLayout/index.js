import { Outlet } from "react-router-dom";
import Header from "../Header";
import { useGetCategoriesQuery } from "../../api";

const PageLayout = () => {
  const { categoriesList, isLoading, isFetching, isError } =
    useGetCategoriesQuery("*", {
      selectFromResult: ({ data, isLoading, isFetching, isError }) => ({
        categoriesList: data?.categoriesList,
        isLoading: isLoading,
        isFetching: isFetching,
        isError: isError,
      }),
    });

  console.log("PageLayout");

  return (
    <div className="page">
      <Header
        categoriesList={categoriesList}
        isLoading={isLoading || isFetching}
      />
      <Outlet />
    </div>
  );
};

export default PageLayout;
