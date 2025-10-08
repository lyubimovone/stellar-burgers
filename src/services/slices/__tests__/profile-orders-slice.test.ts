import {
  profileOrdersReducer,
  initialState,
  getProfileOrders,
  startOrdersPolling,
  stopOrdersPolling
} from '../profile-orders-slice';
import { TOrder } from '@utils-types';

const mockProfileOrders: TOrder[] = [
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

describe('profileOrders slice', () => {
  it('должен возвращать начальное состояние', () => {
    expect(profileOrdersReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('getProfileOrders async thunk', () => {
    it('должен обрабатывать pending состояние', () => {
      const action = { type: getProfileOrders.pending.type };
      const state = profileOrdersReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
      expect(state.orders).toEqual([]);
    });

    it('должен обрабатывать fulfilled состояние', () => {
      const action = {
        type: getProfileOrders.fulfilled.type,
        payload: mockProfileOrders
      };
      const state = profileOrdersReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.orders).toEqual(mockProfileOrders);
    });

    it('должен обрабатывать rejected состояние', () => {
      const errorMessage = 'Ошибка загрузки истории заказов';
      const action = {
        type: getProfileOrders.rejected.type,
        error: { message: errorMessage }
      };
      const state = profileOrdersReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.orders).toEqual([]);
    });

    it('должен обрабатывать rejected состояние без сообщения об ошибке', () => {
      const action = {
        type: getProfileOrders.rejected.type,
        error: {}
      };
      const state = profileOrdersReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки истории заказов');
      expect(state.orders).toEqual([]);
    });

    it('должен очищать ошибку при новом запросе', () => {
      const stateWithError = {
        ...initialState,
        error: 'Предыдущая ошибка'
      };

      const action = { type: getProfileOrders.pending.type };
      const state = profileOrdersReducer(stateWithError, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('должен заменять существующие заказы при успешной загрузке', () => {
      const stateWithOrders = {
        ...initialState,
        orders: [mockProfileOrders[0]]
      };

      const action = {
        type: getProfileOrders.fulfilled.type,
        payload: mockProfileOrders
      };
      const state = profileOrdersReducer(stateWithOrders, action);

      expect(state.orders).toEqual(mockProfileOrders);
    });
  });

  describe('startOrdersPolling async thunk', () => {
    it('должен не обрабатывать pending состояние (не реализовано в редьюсере)', () => {
      const action = { type: startOrdersPolling.pending.type };
      const state = profileOrdersReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });

    it('должен не обрабатывать fulfilled состояние (не реализовано в редьюсере)', () => {
      const action = { type: startOrdersPolling.fulfilled.type };
      const state = profileOrdersReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });
  });

  describe('stopOrdersPolling async thunk', () => {
    it('должен не обрабатывать pending состояние (не реализовано в редьюсере)', () => {
      const action = { type: stopOrdersPolling.pending.type };
      const state = profileOrdersReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });

    it('должен не обрабатывать fulfilled состояние (не реализовано в редьюсере)', () => {
      const action = { type: stopOrdersPolling.fulfilled.type };
      const state = profileOrdersReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });
  });
});
