import {
  authReducer,
  loginUser,
  registerUser,
  logoutUser,
  getUser,
  updateUser,
  clearError
} from '../auth-slice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('auth slice', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null
  };

  it('должен возвращать начальное состояние', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('loginUser async thunk', () => {
    it('должен обрабатывать pending состояние', () => {
      const action = { type: loginUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
    });

    it('должен обрабатывать fulfilled состояние', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
    });

    it('должен обрабатывать rejected состояние', () => {
      const errorMessage = 'Ошибка входа';
      const action = {
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
    });

    it('должен обрабатывать rejected состояние без сообщения об ошибке', () => {
      const action = {
        type: loginUser.rejected.type,
        error: {}
      };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка входа');
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
    });
  });

  describe('registerUser async thunk', () => {
    it('должен не обрабатывать pending состояние (не реализовано в редьюсере)', () => {
      const action = { type: registerUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });

    it('должен не обрабатывать fulfilled состояние (не реализовано в редьюсере)', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockUser
      };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
    });
  });

  describe('logoutUser async thunk', () => {
    it('должен обрабатывать fulfilled состояние', () => {
      const stateWithUser = {
        ...initialState,
        isAuthenticated: true,
        user: mockUser
      };

      const action = { type: logoutUser.fulfilled.type };
      const state = authReducer(stateWithUser, action);

      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
    });
  });

  describe('getUser async thunk', () => {
    it('должен не обрабатывать pending состояние (не реализовано в редьюсере)', () => {
      const action = { type: getUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });

    it('должен не обрабатывать fulfilled состояние (не реализовано в редьюсере)', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: mockUser
      };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.user).toBe(null);
    });
  });

  describe('updateUser async thunk', () => {
    it('должен обрабатывать fulfilled состояние', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser
      };

      const updatedUser = { ...mockUser, name: 'Updated User' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: updatedUser
      };
      const state = authReducer(stateWithUser, action);

      expect(state.user).toEqual(updatedUser);
    });
  });

  describe('clearError', () => {
    it('должен очистить ошибку', () => {
      const stateWithError = {
        ...initialState,
        error: 'Some error'
      };

      const action = clearError();
      const state = authReducer(stateWithError, action);

      expect(state.error).toBe(null);
    });
  });
});
