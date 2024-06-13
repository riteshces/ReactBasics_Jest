import React, { useState, useTransition, useEffect } from "react";
import { Get } from "legacy-code/http-service/services";
import LoadingSpinner from "app/components/loader-spinner/LoadingSpinner";
import HeaderStats from "app/components/header/HeaderStats";
import Sidebar from "app/components/side-bar/Sidebar";
import AdminNavbar from "app/components/navbar/AdminNavbar";
import { NavLink } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  const tableHead = {
    col: [
      "Sr No.",
      "Product Title",
      "Product Price",
      "Product Category",
      "Image",
    ],
  };

  useEffect(() => {
    startTransition(async () => {
      await Get(`${process.env.REACT_APP_PRODUCTSAPI}/products`)
        .then((json) => {
          setProducts(json);
        })
        .catch((error) => {
          setError(error);
        });
    });
  }, []);

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />

        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Product Category List
                </h6>
                <NavLink
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  to="/products/add"
                >
                  Add Product
                </NavLink>
              </div>
              <br />

              <div className="container mx-auto px-4">
                {isPending ? (
                  <LoadingSpinner />
                ) : (
                  products && (
                    <table role="table" className="table-auto w-full">
                      <thead className="bg-gray-200">
                        <tr>
                          {tableHead.col.map((item, index) => (
                            <th
                              key={index}
                              role="table-header"
                              className="border px-4 py-2 text-left"
                            >
                              {item}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr
                            key={product.id}
                            role="table-row"
                            className="bg-white"
                          >
                            <td className="border px-4 py-2">{product.id}</td>
                            <td className="border px-4 py-2">
                              {product.title}
                            </td>
                            <td className="border px-4 py-2">
                              {product.price}
                            </td>
                            <td className="border px-4 py-2">
                              {product.category}
                            </td>
                            <td className="border px-4 py-2">
                              <img
                                src={product.image}
                                height={"50px"}
                                width={"50px"}
                                alt={product.title}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
                )}

                {error && <div>Error: {error.message}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
