import extractCategory from "./extractCategory";

describe("extractCategory", () => {
  it("should return unique categories from the data array", () => {
    const data = [
      { id: 1, category: "sport, fun", name: "jump" },
      { id: 2, category: "sport, cool", name: "run" },
      { id: 3, category: "fun, cool", name: "swim" },
    ];

    const result = extractCategory(data);
    const expected = ["sport", "fun", "cool"];

    // Check if result contains all expected items, regardless of order
    expect(result.sort()).toEqual(expected.sort());
  });

  it("should return an empty array when input is empty", () => {
    expect(extractCategory([])).toEqual([]);
  });

  it("should ignore objects without a category field", () => {
    const data = [
      { id: 1, name: "jump" },
      { id: 2, category: "cool", name: "run" },
    ];

    const result = extractCategory(data);
    expect(result).toEqual(["cool"]);
  });
});
