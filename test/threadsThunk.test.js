/**
 * Skenario Pengujian:
 * 1. Saat fetchThreads dipanggil dengan sukses, harus mengembalikan array threads dan update state.
 * 2. Saat fetchThreads dipanggil dan gagal, harus mengembalikan error dan update state error.
 * 3. Saat createThread dipanggil dengan sukses, harus mengembalikan thread baru.
 */

import { configureStore } from '@reduxjs/toolkit';
import threadsReducer, { fetchThreads, createThread } from '../src/features/threads/threadsSlice';
import client from '../src/api/client';

// Mock the API client
jest.mock('../src/api/client', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe('Threads Thunk Tests', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        threads: threadsReducer,
      },
    });
    jest.clearAllMocks();
  });

  test('should handle fetchThreads.fulfilled - return threads array', async () => {
    const mockThreads = [
      { id: 'thread-1', title: 'Thread 1', body: 'Body 1', category: 'general' },
      { id: 'thread-2', title: 'Thread 2', body: 'Body 2', category: 'tech' },
    ];

    const mockResponse = {
      data: {
        data: {
          threads: mockThreads,
        },
      },
    };

    client.get.mockResolvedValue(mockResponse);

    const result = await store.dispatch(fetchThreads());

    expect(result.type).toBe('threads/fetchAll/fulfilled');
    expect(result.payload).toEqual(mockThreads);
    expect(store.getState().threads.items).toEqual(mockThreads);
    expect(store.getState().threads.status).toBe('succeeded');
    expect(store.getState().threads.error).toBeNull();
  });

  test('should handle fetchThreads.rejected - return error', async () => {
    const mockError = {
      response: {
        data: {
          message: 'Failed to fetch threads',
        },
      },
    };

    client.get.mockRejectedValue(mockError);

    const result = await store.dispatch(fetchThreads());

    expect(result.type).toBe('threads/fetchAll/rejected');
    expect(result.payload).toEqual(mockError.response.data);
    expect(store.getState().threads.status).toBe('failed');
    expect(store.getState().threads.error).toEqual(mockError.response.data);
    expect(store.getState().threads.items).toEqual([]);
  });

  test('should handle fetchThreads.pending - set loading state', async () => {
    // Create a promise that we can control
    let resolvePromise;
    const pendingPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    client.get.mockReturnValue(pendingPromise);

    // Dispatch the thunk
    const dispatchPromise = store.dispatch(fetchThreads());

    // Check pending state
    expect(store.getState().threads.status).toBe('loading');

    // Resolve the promise
    resolvePromise({
      data: {
        data: {
          threads: [],
        },
      },
    });

    await dispatchPromise;
  });

  test('should handle createThread.fulfilled - return new thread', async () => {
    const newThread = {
      id: 'thread-new',
      title: 'New Thread',
      body: 'New Body',
      category: 'general',
    };

    const mockResponse = {
      data: {
        data: {
          thread: newThread,
        },
      },
    };

    client.post.mockResolvedValue(mockResponse);

    const result = await store.dispatch(
      createThread({ title: 'New Thread', body: 'New Body', category: 'general' })
    );

    expect(result.type).toBe('threads/create/fulfilled');
    expect(result.payload).toEqual(newThread);
    expect(store.getState().threads.items).toContainEqual(newThread);
    expect(store.getState().threads.items[0]).toEqual(newThread);
  });

  test('should handle createThread.rejected - return error', async () => {
    const mockError = {
      response: {
        data: {
          message: 'Failed to create thread',
        },
      },
    };

    client.post.mockRejectedValue(mockError);

    const result = await store.dispatch(
      createThread({ title: 'New Thread', body: 'New Body' })
    );

    expect(result.type).toBe('threads/create/rejected');
    expect(result.payload).toEqual(mockError.response.data);
  });
});

