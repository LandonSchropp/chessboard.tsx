import { uniqueId } from "../../src/utilities/unique-id";

describe("uniqueID", () => {

  it("contains the prefix", () => {
    expect(uniqueId("id")).toStartWith("id");
  });

  it("returns a unique ID", () => {
    expect(uniqueId("id")).not.toEqual(uniqueId("id"));
  });
});
