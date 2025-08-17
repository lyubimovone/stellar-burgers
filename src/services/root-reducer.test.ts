import { rootReducer } from './root-reducer';

describe('rootReducer', () => {
  it('should return initial state', () => {
    expect(rootReducer(undefined, { type: '' })).toEqual({
      ingredients: { items: [], isLoading: false, hasError: false },
      user: {
        user: null,
        userRequest: false,
        userFailed: false,
        updateUserRequest: false,
        updateUserError: null
      },
      burgerConstructor: { bun: null, ingredients: [] },
      feed: { orders: [], total: 0, totalToday: 0, isLoading: false, hasError: false },
      order: { order: null, orderRequest: false, orderFailed: false },
      profileOrders: { orders: [], isLoading: false, hasError: false }
    });
  });
});
