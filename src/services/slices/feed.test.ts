import { feedReducer, fetchFeed } from './feed';
import { TOrder } from '../../utils/types';

describe('feed slice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    hasError: false
  };

  it('handles pending', () => {
    const state = feedReducer(initialState, fetchFeed.pending('', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.hasError).toBe(false);
  });

  it('handles fulfilled', () => {
    const data = {
      success: true,
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'order',
          createdAt: '',
          updatedAt: '',
          number: 1,
          ingredients: []
        } as TOrder
      ],
      total: 1,
      totalToday: 1
    };
    const state = feedReducer(initialState, fetchFeed.fulfilled(data, '', undefined));
    expect(state.orders).toEqual(data.orders);
    expect(state.total).toBe(1);
    expect(state.totalToday).toBe(1);
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(false);
  });

  it('handles rejected', () => {
    const state = feedReducer(initialState, fetchFeed.rejected(new Error('fail'), '', undefined));
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(true);
  });
});
