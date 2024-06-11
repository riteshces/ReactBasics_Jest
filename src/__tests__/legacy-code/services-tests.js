import { Get } from "@legacy-code/http-service/services";

describe("Get function", () => {
  beforeEach(() => {
    jest.spyOn(window, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => ({ data: "mocked data" }),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return data when fetch is successful", async () => {
    const url = "https://example.com";
    const result = await Get(url);
    expect(result).toEqual({ data: "mocked data" });
  });

  it("should log an error when fetch fails", async () => {
    jest.spyOn(console, "error");
    jest
      .spyOn(window, "fetch")
      .mockImplementation(() => Promise.reject(new Error("Fetch failed")));
    const url = "https://example.com";
    await Get(url);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      "Error:",
      new Error("Fetch failed")
    );
  });
});
