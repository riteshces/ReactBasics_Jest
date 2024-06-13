import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import ProductAdd from "app/main/products/product/ProductAdd";
import { toast } from "react-toastify";
import { MemoryRouter } from "react-router-dom";

describe("ProductAdd component", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ProductAdd />
      </MemoryRouter>
    );
    expect(getByText("Add Products")).toBeInTheDocument();
  });

  it("validates form correctly", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ProductAdd />
      </MemoryRouter>
    );
    const productNameInput = getByTestId("productName").querySelector("input");
    const productPriceInput =
      getByTestId("productPrice").querySelector("input");
    const productDescriptionInput =
      getByTestId("productDescription").querySelector("input");
    const productImageInput =
      getByTestId("productImage").querySelector("input");

    const productName = faker.company.name();
    const productPrice = faker.datatype.number({ min: 10, max: 1000000 });
    const productDescription = faker.lorem.paragraph();
    const productImage = "https://example.com/image.jpg";

    fireEvent.change(productNameInput, { target: { value: productName } });
    fireEvent.change(productPriceInput, { target: { value: productPrice } });
    fireEvent.change(productDescriptionInput, {
      target: { value: productDescription },
    });
    fireEvent.change(productImageInput, { target: { value: productImage } });

    fireEvent.submit(getByTestId("Add"));
    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith("Product added successfully.!");
  });

  it("calls Post API correctly", () => {
    jest.mock("legacy-code/http-service/services", () => ({
      Post: jest.fn(),
    }));

    jest.mock("react-toastify", () => ({
      toast: {
        success: jest.fn(),
        error: jest.fn(),
      },
    }));
    const postSpy = jest.spyOn(Post, "default");
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <ProductAdd />
      </MemoryRouter>
    );
    const productName = faker.company.name();
    const productPrice = faker.datatype.number({ min: 10, max: 1000000 });
    const productDescription = faker.lorem.paragraph();
    const productCategory = "Category 1";
    const productImage = "https://example.com/image.jpg";

    fireEvent.change(getByTestId("productName").querySelector("input"), {
      target: { value: productName },
    });
    fireEvent.change(getByTestId("productPrice").querySelector("input"), {
      target: { value: productPrice },
    });
    fireEvent.change(getByTestId("productDescription").querySelector("input"), {
      target: { value: productDescription },
    });
    fireEvent.change(getByTestId("productImage").querySelector("input"), {
      target: { value: productImage },
    });

    fireEvent.submit(getByTestId("Add"));
    expect(postSpy).toHaveBeenCalledTimes(1);
    expect(postSpy).toHaveBeenCalledWith(
      `${process.env.REACT_APP_PRODUCTSAPI}/products`,
      {
        productName,
        productPrice,
        productDescription,
        productCategory,
        productImage,
      }
    );
  });
});
