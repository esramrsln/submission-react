/**
 * Skenario Pengujian:
 * 1. Saat loginUser dipanggil dengan kredensial valid, harus mengembalikan token dan menyimpan ke localStorage.
 * 2. Saat loginUser dipanggil dengan kredensial invalid, harus mengembalikan error.
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loginUser, fetchMe } from '../src/features/auth/authSlice';
import client from '../src/api/client';

// Mock the API client
jest.mock('../src/api/client', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

// localStorage mock is set up in jest.setup.js
// Access it via global.localStorage
const localStorageMock = global.localStorage;

describe('Auth Thunk Tests', () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockClear();
    
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });

  test('should handle loginUser.fulfilled - save token to localStorage', async () => {
    const mockToken = 'mock-token-123';
    const mockResponse = {
      data: {
        data: {
          token: mockToken,
        },
      },
    };

    client.post.mockResolvedValue(mockResponse);

    const result = await store.dispatch(
      loginUser({ email: 'test@example.com', password: 'password123' })
    );

    expect(result.type).toBe('auth/login/fulfilled');
    expect(result.payload.token).toBe(mockToken);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('token', mockToken);
    expect(store.getState().auth.token).toBe(mockToken);
    expect(store.getState().auth.error).toBeNull();
  });

  test('should handle loginUser.rejected - return error', async () => {
    const mockError = {
      response: {
        data: {
          message: 'Invalid credentials',
        },
      },
    };

    client.post.mockRejectedValue(mockError);

    const result = await store.dispatch(
      loginUser({ email: 'wrong@example.com', password: 'wrong' })
    );

    expect(result.type).toBe('auth/login/rejected');
    expect(result.payload).toEqual(mockError.response.data);
    expect(store.getState().auth.error).toEqual(mockError.response.data);
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  test('should handle fetchMe.fulfilled - update user state', async () => {
    const mockUser = {
      id: 'user-1',
      name: 'Test User',
      email: 'test@example.com',
    };

    const mockResponse = {
      data: {
        data: {
          user: mockUser,
        },
      },
    };

    client.get.mockResolvedValue(mockResponse);

    const result = await store.dispatch(fetchMe());

    expect(result.type).toBe('auth/fetchMe/fulfilled');
    expect(result.payload).toEqual(mockUser);
    expect(store.getState().auth.user).toEqual(mockUser);
  });

  test('should handle fetchMe.rejected - clear user state', async () => {
    const mockError = {
      response: {
        data: {
          message: 'Unauthorized',
        },
      },
    };

    // Set initial user state
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          token: 'some-token',
          user: { id: 'user-1', name: 'Test User' },
          status: 'idle',
          error: null,
        },
      },
    });

    client.get.mockRejectedValue(mockError);

    const result = await store.dispatch(fetchMe());

    expect(result.type).toBe('auth/fetchMe/rejected');
    expect(store.getState().auth.user).toBeNull();
  });
});

