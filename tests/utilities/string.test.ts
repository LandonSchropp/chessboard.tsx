import { convertToKebabCase } from "../../src/utilities/string";

describe("convertToKebabCase", () => {

  describe("when the string is empty", () => {

    it("returns an empty string", () => {
      expect(convertToKebabCase("")).toBe("");
    });
  });

  describe("when the string only contains lowercase letters", () => {

    it("returns the string unmodified", () => {
      expect(convertToKebabCase("test")).toBe("test");
    });
  });

  describe("when the string lowercase letters and numbers", () => {

    it("returns the string unmodified", () => {
      expect(convertToKebabCase("test123")).toBe("test123");
    });
  });

  describe("when the string contains whitespace", () => {

    it("replaces the whitespace replaced with with dashes", () => {
      expect(convertToKebabCase("test  test  test")).toEqual("test-test-test");
    });
  });

  describe("when the string contains surrounding whitespace", () => {

    it("removed the surrounding whitespace", () => {
      expect(convertToKebabCase("  test  ")).toEqual("test");
    });
  });

  describe("when the string is camel case", () => {

    it("converts the string to kebab case", () => {
      expect(convertToKebabCase("testTestTest")).toEqual("test-test-test");
    });
  });

  describe("when the string is Pascal case", () => {

    it("converts the string to kebab case", () => {
      expect(convertToKebabCase("TestTestTest")).toEqual("test-test-test");
    });
  });

  describe("when the string is underscore case", () => {

    it("converts the string to kebab case", () => {
      expect(convertToKebabCase("test_test_test")).toEqual("test-test-test");
    });
  });

  describe("when the string is constant case", () => {

    it("converts the string to kebab case", () => {
      expect(convertToKebabCase("TEST_TEST_TEST")).toEqual("test-test-test");
    });
  });

  describe("when the sting contains consecutive uppercase letters", () => {

    it("converts the string to kebab case", () => {
      expect(convertToKebabCase("testTESTTest")).toEqual("test-test-test");
    });
  });

  describe("when the string contains non-alphanumeric characters", () => {

    it("treats the extra characters as whitespace", () => {
      expect(convertToKebabCase("'test😎test%test?")).toEqual("test-test-test");
    });
  });
});
