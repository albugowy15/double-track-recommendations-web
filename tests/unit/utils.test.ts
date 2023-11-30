import { getFetchUrl } from "@/lib/utils";

describe("Lib Utils Test", () => {
  it("getFetchUrl return valid url", () => {
    expect(getFetchUrl("/v1/path/path")).toBe(
      "https://api-double-track.fly.dev/v1/path/path",
    );
    expect(getFetchUrl("v1/path/path")).toBe(
      "https://api-double-track.fly.dev/v1/path/path",
    );
  });
});
