import { useEffect, useState } from "react";
import { Get } from "../legacy_code/http.service/services.js";

function ShowAllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Get("https://fakestoreapi.com/products")
      .then((json) => {
        setProducts(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-base font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 text-lg dark:border-white/10">
                  <tr>
                    <th className="px-6 py-4">Id</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-neutral-200 dark:border-white/10"
                      >
                        <td className="whitespace-nowrap px-6 py-4">
                          {product.id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {product.title}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {product.price}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {product.category}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <img
                            src={product.image}
                            height={"50px"}
                            width={"50px"}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowAllProducts;
