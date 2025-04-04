import '@testing-library/jest-dom';

import { vi } from 'vitest';

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // legacy
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}


if (!window.ResizeObserver) {
  class ResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
  // @ts-ignore
  global.ResizeObserver = ResizeObserver;
}