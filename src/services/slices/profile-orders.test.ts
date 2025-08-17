import { profileOrdersReducer, fetchProfileOrders } from './profile-orders';
import { TOrder } from '../../utils/types';

describe('profileOrders slice', () => {
  const initialState = { orders: [], isLoading: false, hasError: false };

  it('handles pending', () => {
    const state = profileOrdersReducer(initialState, fetchProfileOrders.pending('', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.hasError).toBe(false);
  });

  it('handles fulfilled', () => {
    const orders: TOrder[] = [
      { _id: '1', status: 'done', name: 'order', createdAt: '', updatedAt: '', number: 1, ingredients: [] }
    ];
    const state = profileOrdersReducer(initialState, fetchProfileOrders.fulfilled(orders, '', undefined));
    expect(state.orders).toEqual(orders);
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(false);
  });

  it('handles rejected', () => {
    const state = profileOrdersReducer(initialState, fetchProfileOrders.rejected(new Error('fail'), '', undefined));
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(true);
  });
});
