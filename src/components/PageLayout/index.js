import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../Header";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";
import { setInnerWidth } from "../../store/reducers/innerWidthSlice";
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

  const dispatch = useDispatch();

  const handleWindowResize = () => {
    dispatch(setInnerWidth(window.innerWidth));
  };

  handleWindowResize();

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  console.log("PageLayout");

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
