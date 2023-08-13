// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { resetTimer } from "../../src/stores/timerModules/resetTimer";
import { startTimer } from "../../src/stores/timerModules/startTimer";
import { stopTimer } from "../../src/stores/timerModules/stopTimer";
import type { Timer } from "../../src/types/timer";

describe("Timer modules", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should start & stop timer", () => {
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

    vi.advanceTimersByTime(1000);
    const current: number = timer.current;
    stopTimer(timer);
    vi.advanceTimersByTime(1000);
    expect(timer.current).toBe(current);
  });

  test("should reset timer", () => {
    const timer: Timer = startTimer({ id: 0, current: 0 });

    vi.advanceTimersByTime(1000);

    const newTimer: Timer = resetTimer(timer);

    vi.advanceTimersByTime(5000);

    expect(newTimer).toStrictEqual({ id: 0, current: 0 });
  });
});
