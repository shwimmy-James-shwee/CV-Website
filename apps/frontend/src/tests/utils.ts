import { vi, beforeEach, afterEach } from 'vitest';
import * as msalFetch from '../hooks/useFetchWithMsal';

// default mock useFetchWithMsal
export const defaultExecute = vi.fn(() => {
  return Promise.resolve({ status: 200 });
});

interface mockUseFetchWithMsal {
  error?: null | object;
  isLoading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute?: any;
  apiError?: msalFetch.APIErrorMessageObjType | null;
}
export const mockUseFetchWithMsal = ({ error, apiError, isLoading, execute, data }: mockUseFetchWithMsal = {}) => {
  return vi.spyOn(msalFetch, 'default').mockImplementation(() => ({
    apiError: apiError ? apiError : null,
    error: error ? error : null,
    execute: execute ? execute : defaultExecute,
    isLoading: isLoading ? isLoading : false,
    data: data ? data : null
  }));
};

// rechart responsive container
export const FakeResponsiveContainer = () => {
  beforeEach(() => {
    window.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
};
