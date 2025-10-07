import {
  orderReducer,
  createOrder,
  getOrder,
  clearOrder
} from '../order-slice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
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
};

describe('order slice', () => {
  const initialState = {
    orderData: null,
    loading: false,
    error: null
  };

  it('должен возвращать начальное состояние', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('createOrder async thunk', () => {
    it('должен обрабатывать pending состояние', () => {
      const action = { type: createOrder.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
      expect(state.orderData).toBe(null);
    });

    it('должен обрабатывать fulfilled состояние', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      };
      const state = orderReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.orderData).toEqual(mockOrder);
    });

    it('должен обрабатывать rejected состояние', () => {
      const errorMessage = 'Ошибка создания заказа';
      const action = {
        type: createOrder.rejected.type,
        error: { message: errorMessage }
      };
      const state = orderReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.orderData).toBe(null);
    });

    it('должен обрабатывать rejected состояние без сообщения об ошибке', () => {
      const action = {
        type: createOrder.rejected.type,
        error: {}
      };
      const state = orderReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка создания заказа');
      expect(state.orderData).toBe(null);
    });
  });

  describe('getOrder async thunk', () => {
    it('должен обрабатывать pending состояние', () => {
      const action = { type: getOrder.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
      expect(state.orderData).toBe(null);
    });

    it('должен обрабатывать fulfilled состояние', () => {
      const action = {
        type: getOrder.fulfilled.type,
        payload: mockOrder
      };
      const state = orderReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.orderData).toEqual(mockOrder);
    });

    it('должен обрабатывать rejected состояние', () => {
      const errorMessage = 'Ошибка загрузки заказа';
      const action = {
        type: getOrder.rejected.type,
        error: { message: errorMessage }
      };
      const state = orderReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.orderData).toBe(null);
    });

    it('должен обрабатывать rejected состояние без сообщения об ошибке', () => {
      const action = {
        type: getOrder.rejected.type,
        error: {}
      };
      const state = orderReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки заказа');
      expect(state.orderData).toBe(null);
    });
  });

  describe('clearOrder', () => {
    it('должен очистить данные заказа', () => {
      const stateWithOrder = {
        ...initialState,
        orderData: mockOrder
      };

      const action = clearOrder();
      const state = orderReducer(stateWithOrder, action);

      expect(state.orderData).toBe(null);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });
  });
});
