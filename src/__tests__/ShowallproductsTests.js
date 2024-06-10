import React from "react";
import { render, waitFor, cleanup } from "@testing-library/react";
import ShowAllProducts from "../components/showallproducts";

afterEach(cleanup);

describe("ShowAllProducts", () => {
  it("renders loading message when data is being fetched", () => {
    const { getByText } = render(<ShowAllProducts />);
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("renders product table when data is fetched successfully", async () => {
    const products = [
      {
        id: 1,
        title: "Product 1",
        price: 10.99,
        category: "Electronics",
        image: "https://example.com/image1.jpg",
      },
      {
        id: 2,
        title: "Product 2",
        price: 9.99,
        category: "Clothing",
        image: "https://example.com/image2.jpg",
      },
    ];

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve({ json: () => products }));

    const { getByText } = render(<ShowAllProducts />);
    await waitFor(() => getByText("Product 1"));
    expect(getByText("Product 1")).toBeInTheDocument();
    expect(getByText("Product 2")).toBeInTheDocument();
  });

  it("renders product table with correct columns and data", async () => {
    const products = [
      {
        id: 1,
        title: "Product 1",
        price: 10.99,
        category: "Electronics",
        image: "https://example.com/image1.jpg",
      },
      {
        id: 2,
        title: "Product 2",
        price: 9.99,
        category: "Clothing",
        image: "https://example.com/image2.jpg",
      },
    ];

    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve({ json: () => products }));

    const { getByText } = render(<ShowAllProducts />);
    await waitFor(() => getByText("Product 1"));

    const tableHeaders = ["Id", "Title", "Price", "Category", "Image"];
    tableHeaders.forEach((header) => {
      expect(getByText(header)).toBeInTheDocument();
    });

    const productRows = products.map((product) => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>{product.category}</td>
        <td>
          <img src={product.image} height="50px" width="50px" />
        </td>
      </tr>
    ));

    productRows.forEach((row) => {
      expect(
        getByText(row.props.children[0].props.children)
      ).toBeInTheDocument();
    });
  });
});
