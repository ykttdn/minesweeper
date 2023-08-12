import { describe, expect, test } from "vitest";
import { toggleFlagMode } from "../../src/stores/paramsModules/toggleFlagMode";

describe("Params modules", () => {
  test("Toggle flag mode", () => {
    expect(toggleFlagMode(false)).toBe(true);
    expect(toggleFlagMode(true)).toBe(false);
  });
});
