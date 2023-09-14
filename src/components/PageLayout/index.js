import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";
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

  return (
    <div className="page">
      <ScrollToTop />
      <Header
        categoriesList={categoriesList}
        isLoading={isLoading || isFetching}
      />
      <Outlet />
      <Footer
        categoriesList={categoriesList}
        isLoading={isLoading || isFetching}
      />
    </div>
  );
};

export default PageLayout;
