import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import ProductList from "app/main/products/ProductList";
import ProductAdd from "app/main/products/product/ProductAdd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/products/add",
    element: <ProductAdd />,
  },
]);

const Navigation = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default Navigation;
