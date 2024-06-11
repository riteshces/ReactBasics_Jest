import React, { useState, useTransition, useEffect } from "react";
import { Get } from "@legacy-code/http-service/services";
import LoadingSpinner from "@app/components/loader-spinner/LoadingSpinner";

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
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {isPending ? (
                <LoadingSpinner />
              ) : (
                products && (
                  <table
                    role="table"
                    className="min-w-full text-left text-base font-light text-surface dark:text-white"
                  >
                    <thead className="border-b border-neutral-200 text-lg dark:border-white/10">
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
                          className="border-b border-neutral-200 dark:border-white/10"
                        >
                          <td className="border whitespace-nowrap px-6 py-4">
                            {product.id}
                          </td>
                          <td className="border whitespace-nowrap px-6 py-4">
                            {product.title}
                          </td>
                          <td className="border whitespace-nowrap px-6 py-4">
                            {product.price}
                          </td>
                          <td className="border whitespace-nowrap px-6 py-4">
                            {product.category}
                          </td>
                          <td className="border whitespace-nowrap px-6 py-4">
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
    </>
  );
};

export default ProductList;
