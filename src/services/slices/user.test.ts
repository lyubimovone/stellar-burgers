import { userReducer, loginUser, updateUser } from './user';
import { TUser } from '../../utils/types';

describe('user slice', () => {
  const initialState = {
    user: null,
    userRequest: false,
    userFailed: false,
    updateUserRequest: false,
    updateUserError: null
  };

  it('handles loginUser.pending', () => {
    const state = userReducer(initialState, loginUser.pending('', { email: 'a', password: 'b' } as any));
    expect(state.userRequest).toBe(true);
    expect(state.userFailed).toBe(false);
  });

  it('handles loginUser.fulfilled', () => {
    const user: TUser = { email: 'test@mail.com', name: 'Test' };
    const state = userReducer(initialState, loginUser.fulfilled(user, '', { email: 'a', password: 'b' } as any));
    expect(state.user).toEqual(user);
    expect(state.userRequest).toBe(false);
    expect(state.userFailed).toBe(false);
  });

  it('handles loginUser.rejected', () => {
    const state = userReducer(initialState, loginUser.rejected(new Error('fail'), '', { email: 'a', password: 'b' } as any));
    expect(state.userRequest).toBe(false);
    expect(state.userFailed).toBe(true);
  });

  it('handles updateUser.pending', () => {
    const state = userReducer(initialState, updateUser.pending('', { name: 'new' }));
    expect(state.updateUserRequest).toBe(true);
    expect(state.updateUserError).toBeNull();
  });

  it('handles updateUser.fulfilled', () => {
    const user: TUser = { email: 'test@mail.com', name: 'New' };
    const state = userReducer(initialState, updateUser.fulfilled(user, '', { name: 'new' }));
    expect(state.user).toEqual(user);
    expect(state.updateUserRequest).toBe(false);
    expect(state.updateUserError).toBeNull();
  });

  it('handles updateUser.rejected', () => {
    const state = userReducer(initialState, updateUser.rejected(new Error('fail'), '', { name: 'new' }));
    expect(state.updateUserRequest).toBe(false);
    expect(state.updateUserError).toBe('fail');
  });
});
