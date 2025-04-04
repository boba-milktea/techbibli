import normalisation from "./normalisation";

describe("normalisation", () => {
  it("converts spaces to plus signs", () => {
    expect(normalisation("Science Fiction")).toBe("science+fiction");
  });

  it("converts hyphens to plus signs", () => {
    expect(normalisation("self-help")).toBe("self+help");
  });

  it("converts spaces and hyphens to single plus signs", () => {
    expect(normalisation("Health - Wellness")).toBe("health+wellness");
  });

  it("handles multiple spaces and hyphens", () => {
    expect(normalisation("Sci   -   Fi")).toBe("sci+fi");
  });

  it("handles mixed case input", () => {
    expect(normalisation("BiOgRaPhY Books")).toBe("biography+books");
  });

  it("returns empty string for empty input", () => {
    expect(normalisation("")).toBe("");
  });

  it("handles strings with no spaces or hyphens", () => {
    expect(normalisation("Poetry")).toBe("poetry");
  });

  it("trims trailing and leading spaces before normalization", () => {
    expect(normalisation("  Science Fiction  ")).toBe("science+fiction");
  });
});
