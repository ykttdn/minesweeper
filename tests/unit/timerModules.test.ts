// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { startTimer } from "../../src/stores/timerModules/startTimer";
import type { Timer } from "../../src/types/timer";

describe("Timer modules", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should start timer", () => {
    const timer: Timer = startTimer({ id: 0, current: 0 });

    expect(timer.id).not.toBe(0);

    vi.advanceTimersByTime(999);
    expect(timer.current).not.toBe(1);

    vi.advanceTimersByTime(1);
    expect(timer.current).toBe(1);

    vi.advanceTimersByTime(999);
    expect(timer.current).not.toBe(2);

    vi.advanceTimersByTime(1);
    expect(timer.current).toBe(2);
  });
});
