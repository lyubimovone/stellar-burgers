import { feedReducer, getFeeds } from '../feed-slice';
import { TOrder, TOrdersData } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '64e4d7e82e34df001fda9c8f',
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2023-08-19T14:58:16.235Z',
    updatedAt: '2023-08-19T14:58:16.235Z',
    number: 12345,
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093c'
    ]
  },
  {
    _id: '64e4d7e82e34df001fda9c90',
    status: 'pending',
    name: 'Био-марсианский бургер',
    createdAt: '2023-08-19T15:30:16.235Z',
    updatedAt: '2023-08-19T15:30:16.235Z',
    number: 12346,
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa093c'
    ]
  }
];

const mockFeedsData: TOrdersData = {
  orders: mockOrders,
  total: 100,
  totalToday: 25
};

describe('feed slice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  it('должен возвращать начальное состояние', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('getFeeds async thunk', () => {
    it('должен обрабатывать pending состояние', () => {
      const action = { type: getFeeds.pending.type };
      const state = feedReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
      expect(state.orders).toEqual([]);
      expect(state.total).toBe(0);
      expect(state.totalToday).toBe(0);
    });

    it('должен обрабатывать fulfilled состояние', () => {
      const action = {
        type: getFeeds.fulfilled.type,
        payload: mockFeedsData
      };
      const state = feedReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.orders).toEqual(mockOrders);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(25);
    });

    it('должен обрабатывать rejected состояние', () => {
      const errorMessage = 'Ошибка загрузки ленты заказов';
      const action = {
        type: getFeeds.rejected.type,
        error: { message: errorMessage }
      };
      const state = feedReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.orders).toEqual([]);
      expect(state.total).toBe(0);
      expect(state.totalToday).toBe(0);
    });

    it('должен обрабатывать rejected состояние без сообщения об ошибке', () => {
      const action = {
        type: getFeeds.rejected.type,
        error: {}
      };
      const state = feedReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки ленты заказов');
      expect(state.orders).toEqual([]);
      expect(state.total).toBe(0);
      expect(state.totalToday).toBe(0);
    });

    it('должен очищать ошибку при новом запросе', () => {
      const stateWithError = {
        ...initialState,
        error: 'Предыдущая ошибка'
      };

      const action = { type: getFeeds.pending.type };
      const state = feedReducer(stateWithError, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('должен заменять существующие данные при успешной загрузке', () => {
      const stateWithData = {
        ...initialState,
        orders: [mockOrders[0]],
        total: 50,
        totalToday: 10
      };

      const action = {
        type: getFeeds.fulfilled.type,
        payload: mockFeedsData
      };
      const state = feedReducer(stateWithData, action);

      expect(state.orders).toEqual(mockOrders);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(25);
    });
  });
});
