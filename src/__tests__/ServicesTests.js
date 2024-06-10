import { fireEvent } from "@testing-library/react";
import { Get } from "../legacy_code/http.service/services";

//Test valid return from api
test("should fetch products", async () => {
  const url = "https://fakestoreapi.com/products";
  const data = await Get(url);

  expect(data).toBeInstanceOf(Array);
  expect(data.length).toBeGreaterThan(0);
  expect(data[0].title).toContain(
    "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
  );
});
