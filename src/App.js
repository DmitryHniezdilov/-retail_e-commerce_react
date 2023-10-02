import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import PageLayout from "./components/PageLayout";
import Main from "./pages/Main/";
import NotFound from "./pages/NotFound";
import Catalog from "./pages/Catalog";
import Category from "./pages/Category";
import Product from "./pages/Product";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<PageLayout />}
      handle={{
        crumb: "Home",
        path: "/",
      }}
    >
      <Route index element={<Main />} />
      <Route
        path="catalogs"
        element={<Catalog />}
        handle={{
          crumb: "Catalog",
          path: "catalogs",
        }}
      />
      <Route path="/categories/:id?" element={<Category />} />
      <Route
        path="catalogs/:id?"
        element={<Product />}
        handle={{
          crumb: "Catalog",
          path: "/catalogs",
        }}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
