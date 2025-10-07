import { rootReducer } from '../root-reducer';

describe('rootReducer', () => {
  it('должен возвращать начальное состояние при undefined', () => {
    const initialState = rootReducer(undefined, { type: 'unknown' });

    expect(initialState).toEqual({
      ingredients: {
        ingredients: [],
        loading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
        orderData: null,
        loading: false,
        error: null
      },
      auth: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        error: null
      },
      profileOrders: {
        orders: [],
        loading: false,
        error: null
      }
    });
  });

  it('должен содержать все необходимые слайсы', () => {
    const initialState = rootReducer(undefined, { type: 'unknown' });

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('auth');
    expect(initialState).toHaveProperty('feed');
    expect(initialState).toHaveProperty('profileOrders');
  });
});
