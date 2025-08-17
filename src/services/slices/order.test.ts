import { orderReducer, createOrder } from './order';
import { TOrder } from '../../utils/types';

describe('order slice', () => {
  const initialState = { order: null, orderRequest: false, orderFailed: false };

  it('handles pending', () => {
    const state = orderReducer(initialState, createOrder.pending('', []));
    expect(state.orderRequest).toBe(true);
    expect(state.orderFailed).toBe(false);
  });

  it('handles fulfilled', () => {
    const order: TOrder = {
      _id: '1',
      status: 'done',
      name: 'order',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: []
    };
    const state = orderReducer(initialState, createOrder.fulfilled(order, '', []));
    expect(state.order).toEqual(order);
    expect(state.orderRequest).toBe(false);
    expect(state.orderFailed).toBe(false);
  });

  it('handles rejected', () => {
    const state = orderReducer(initialState, createOrder.rejected(new Error('fail'), '', []));
    expect(state.orderRequest).toBe(false);
    expect(state.orderFailed).toBe(true);
  });
});
