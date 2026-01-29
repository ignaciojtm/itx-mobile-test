import { describe, test, expect, beforeEach, vi } from 'vitest';
import { getCache, setCache, clearCache } from './cache';

beforeEach(() => {
  localStorage.clear();
  vi.useRealTimers();
});

describe('cache', () => {
  test('returns null when missing', () => {
    expect(getCache('a', 1000)).toBeNull();
  });

  test('returns value within ttl', () => {
    setCache('a', 123);
    expect(getCache('a', 1000)).toBe(123);
  });

  test('returns null when expired', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));
  
    setCache('a', 123);
  
    vi.advanceTimersByTime(2 * 60 * 60 * 1000);
  
    expect(getCache('a', 60 * 60 * 1000)).toBeNull();
  });  

  test('clear removes value', () => {
    setCache('a', 1);
    clearCache('a');
    expect(getCache('a', 1000)).toBeNull();
  });
});
