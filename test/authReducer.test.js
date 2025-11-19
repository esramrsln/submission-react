/**
 * Skenario Pengujian:
 * 1. Saat action loginUser.fulfilled dipanggil, token pengguna harus diperbarui.
 * 2. Saat action logout dipanggil, token harus dikosongkan.
 */

import authReducer, { logout, loginUser, fetchMe } 
  from '../src/features/auth/authSlice';

describe('Auth Reducer Tests', () => {
  test('should handle loginUser.fulfilled', () => {
    const initialState = {
      token: null,
      user: null,
      status: 'idle',
      error: null,
    };

    const action = {
      type: loginUser.fulfilled.type,
      payload: { token: 'abc123' },
    };

    const state = authReducer(initialState, action);

    expect(state.token).toBe('abc123');
    expect(state.error).toBeNull();
  });

  test('should handle logout action', () => {
    const initialState = {
      token: 'abc123',
      user: { id: 1, name: 'Esra' },
      status: 'idle',
      error: null,
    };

    const state = authReducer(initialState, logout());

    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });

  test('should handle fetchMe.fulfilled', () => {
    const initialState = {
      token: 'abc123',
      user: null,
      status: 'idle',
      error: null,
    };

    const action = {
      type: fetchMe.fulfilled.type,
      payload: { id: 1, name: 'Esra' },
    };

    const state = authReducer(initialState, action);

    expect(state.user).toEqual({ id: 1, name: 'Esra' });
  });
});
