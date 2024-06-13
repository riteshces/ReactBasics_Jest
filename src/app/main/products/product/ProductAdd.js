import React from "react";
import { Button, TextField } from "@mui/material";
import HeaderStats from "app/components/header/HeaderStats";
import Sidebar from "app/components/side-bar/Sidebar";
import AdminNavbar from "app/components/navbar/AdminNavbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import ProductCategory from "app/components/product-category-dropdown/ProductCategory";
import { Post } from "legacy-code/http-service/services";

const product_ValidationSchema = Yup.object().shape({
  productName: Yup.string()
    .required("Please enter product name")
    .min(2, "Product name must be at least 2 characters")
    .max(50, "Product name must not exceed 50 characters"),
  productPrice: Yup.number()
    .typeError("Please enter number value only")
    .min(10)
    .max(1000000)
    .required("Please enter product price"),
  productDescription: Yup.string()
    .required("Please enter product description")
    .max(1000, "Product description must not exceed 1000 characters"),
  productCategory: Yup.string().required("Please select product category"),
  productImage: Yup.string().required("Please enter product image url"),
});

const ProductAdd = () => {
  const formik = useFormik({
    initialValues: {
      productName: "",
      productPrice: "",
      productDescription: "",
      productImage: "",
      productCategory: "",
    },
    validationSchema: product_ValidationSchema,
    onSubmit: (values) => {
      Post(`${process.env.REACT_APP_PRODUCTSAPI}/products`, values)
        .then((res) => {
          formik.resetForm();
          toast.success("Product added successfully.!", {
            position: "top-right",
            autoClose: 2000,
            hideProgresBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        })
        .catch((error) => {
          toast.error(error, {
            position: "top-right",
            autoClose: 2000,
            hideProgresBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    },
  });

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />

        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Add Products
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-wrap mt-6 mb-6">
                  <div className="w-full lg:w-4/12 px-4">
                    <TextField
                      fullWidth
                      data-testid={"productName"}
                      name="productName"
                      label="Product Name"
                      variant="outlined"
                      value={formik.values.productName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.productName && (
                      <p className="text-red-500 text-xs italic">
                        {formik.errors.productName}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <TextField
                      fullWidth
                      data-testid={"productPrice"}
                      name="productPrice"
                      label="Product Price"
                      variant="outlined"
                      value={formik.values.productPrice}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.productPrice && (
                      <p className="text-red-500 text-xs italic">
                        {formik.errors.productPrice}
                      </p>
                    )}
                  </div>

                  <div className="w-full lg:w-4/12 px-4">
                    <TextField
                      fullWidth
                      data-testid={"productDescription"}
                      name="productDescription"
                      label="Product Description"
                      variant="outlined"
                      value={formik.values.productDescription}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.productDescription && (
                      <p className="text-red-500 text-xs italic">
                        {formik.errors.productDescription}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap mt-6 mb-6">
                  <div className="w-full lg:w-4/12 px-4">
                    <ProductCategory
                      fullWidth
                      datatestid={"productCategory"}
                      name="productCategory"
                      value={formik.values.productCategory}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.productCategory && (
                      <p className="text-red-500 text-xs italic">
                        {formik.errors.productCategory}
                      </p>
                    )}
                  </div>

                  <div className="w-full lg:w-4/12 px-4">
                    <TextField
                      fullWidth
                      data-testid={"productImage"}
                      name="productImage"
                      label="Product Image"
                      variant="outlined"
                      value={formik.values.productImage}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.productImage && (
                      <p className="text-red-500 text-xs italic">
                        {formik.errors.productImage}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-end justify-end">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="mx-5"
                    data-testid={"Add"}
                  >
                    Add
                  </Button>

                  <Link
                    to={"/products"}
                    data-testid={"Back"}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-5 rounded focus:outline-none focus:shadow-outline"
                  >
                    Back
                  </Link>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAdd;
