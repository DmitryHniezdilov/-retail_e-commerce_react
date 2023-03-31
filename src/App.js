import React, { useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setInnerWidth } from "./store/reducers/innerWidthSlice";
import PageLayout from "./components/PageLayout";
// import Main from "./pages/Main/";
import NotFound from "./pages/NotFound";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";

const App = () => {
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
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Catalog />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="/:id?" element={<Catalog />} />
          <Route path="catalogs/:id?" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
