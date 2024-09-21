import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useTimerStore } from "@/stores/timer";

describe("timer store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("start", () => {
    const { timer, startTimerIfStopped } = useTimerStore();

    expect(timer.current).toBe(0);

    startTimerIfStopped();
    vi.advanceTimersByTime(1000);

    expect(timer.current).toBe(1);

    vi.advanceTimersByTime(1000);

    expect(timer.current).toBe(2);
  });

  it("stop", () => {
    const { timer, startTimerIfStopped, stopTimer } = useTimerStore();

    startTimerIfStopped();
    vi.advanceTimersByTime(1000);

    expect(timer.current).toBe(1);

    stopTimer();
    vi.advanceTimersByTime(1000);

    expect(timer.current).toBe(1);
  });

  it("reset", () => {
    const { timer, startTimerIfStopped, resetTimer } = useTimerStore();

    startTimerIfStopped();
    vi.advanceTimersByTime(1000);

    expect(timer.current).toBe(1);

    resetTimer();

    expect(timer).toStrictEqual({ id: 0, current: 0 });

    vi.advanceTimersByTime(1000);

    expect(timer).toStrictEqual({ id: 0, current: 0 });
  });
});
