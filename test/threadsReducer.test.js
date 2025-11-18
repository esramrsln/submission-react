/**
 * Skenario Pengujian:
 * 1. Saat action fetchThreads.pending dipanggil, status harus berubah menjadi "loading".
 * 2. Saat action fetchThreads.fulfilled dipanggil, status harus menjadi "succeeded" dan items harus berisi data threads.
 * 3. Saat action fetchThreads.rejected dipanggil, status harus menjadi "failed" dan error harus terisi.
 * 4. Saat action createThread.fulfilled dipanggil, thread baru harus ditambahkan ke awal array items.
 */

import threadsReducer, { fetchThreads, createThread } from '../src/features/threads/threadsSlice';

describe('Threads Reducer Tests', () => {
  const initialState = {
    items: [],
    status: 'idle',
    error: null,
  };

  test('should handle fetchThreads.pending', () => {
    const action = {
      type: fetchThreads.pending.type,
    };

    const state = threadsReducer(initialState, action);

    expect(state.status).toBe('loading');
    expect(state.items).toEqual([]);
    expect(state.error).toBeNull();
  });

  test('should handle fetchThreads.fulfilled', () => {
    const mockThreads = [
      { id: 'thread-1', title: 'Thread 1', body: 'Body 1' },
      { id: 'thread-2', title: 'Thread 2', body: 'Body 2' },
    ];

    const action = {
      type: fetchThreads.fulfilled.type,
      payload: mockThreads,
    };

    const state = threadsReducer(initialState, action);

    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(mockThreads);
    expect(state.error).toBeNull();
  });

  test('should handle fetchThreads.rejected', () => {
    const errorMessage = 'Failed to fetch threads';

    const action = {
      type: fetchThreads.rejected.type,
      payload: errorMessage,
    };

    const state = threadsReducer(initialState, action);

    expect(state.status).toBe('failed');
    expect(state.error).toBe(errorMessage);
    expect(state.items).toEqual([]);
  });

  test('should handle createThread.fulfilled - prepend new thread', () => {
    const existingThreads = [
      { id: 'thread-1', title: 'Thread 1', body: 'Body 1' },
      { id: 'thread-2', title: 'Thread 2', body: 'Body 2' },
    ];

    const stateWithThreads = {
      ...initialState,
      items: existingThreads,
      status: 'succeeded',
    };

    const newThread = { id: 'thread-3', title: 'New Thread', body: 'New Body' };

    const action = {
      type: createThread.fulfilled.type,
      payload: newThread,
    };

    const state = threadsReducer(stateWithThreads, action);

    expect(state.items).toHaveLength(3);
    expect(state.items[0]).toEqual(newThread);
    expect(state.items[1]).toEqual(existingThreads[0]);
    expect(state.items[2]).toEqual(existingThreads[1]);
  });
});

