import React from "react";
import { render, waitFor } from "@testing-library/react";
import ProductList from "app/main/products/ProductList";
import { faker } from "@faker-js/faker";
import { MemoryRouter } from "react-router-dom";

const products = Array(10)
  .fill(0)
  .map(() => ({
    id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
    image: faker.image.imageUrl(),
  }));

describe("ProductList", () => {
  beforeEach(() => {
    jest
      .spyOn(window, "fetch")
      .mockImplementation(() => Promise.resolve({ json: () => products }));
  });

  it("renders product table when API call succeeds", async () => {
    const { getByRole, debug } = render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );
    debug();
    await waitFor(() => getByRole("table"));
    expect(getByRole("table")).toBeInTheDocument();
  });

  it("renders correct table headers", async () => {
    const { getAllByRole, debug } = render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );
    debug();
    const headers = await waitFor(() => getAllByRole("table-header"));
    expect(headers).toHaveLength(5);
    expect(headers.map((header) => header.textContent)).toEqual([
      "Sr No.",
      "Product Title",
      "Product Price",
      "Product Category",
      "Image",
    ]);
  });

  it("renders correct product rows", async () => {
    const { getAllByRole, debug } = render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );
    debug();
    const rows = await waitFor(() => getAllByRole("table-row"));
    expect(rows).toHaveLength(10);
    rows.forEach((row, index) => {
      const { id, title, price, category, image } = products[index];
      expect(row.cells[0].textContent).toBe(id);
      expect(row.cells[1].textContent).toBe(title);
      expect(row.cells[2].textContent).toBe(price);
      expect(row.cells[3].textContent).toBe(category);
      expect(row.cells[4].querySelector("img").src).toBe(image);
    });
  });
});
