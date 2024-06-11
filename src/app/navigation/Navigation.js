import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "@src/App";
import ProductList from "@main/products/ProductList";
import ProductAdd from "@main/products/product/ProductAdd";

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
  return (
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  );
};

export default Navigation;
