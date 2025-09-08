import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

type TProfileOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: TProfileOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const getProfileOrders = createAsyncThunk(
  'profileOrders/get',
  async () => {
    const data = await getOrdersApi();
    return data;
  }
);

let refreshInterval: NodeJS.Timeout;

export const startOrdersPolling = createAsyncThunk(
  'profileOrders/startPolling',
  async (_, { dispatch }) => {
    refreshInterval = setInterval(() => {
      dispatch(getProfileOrders());
    }, 5000);
  }
);

export const stopOrdersPolling = createAsyncThunk(
  'profileOrders/stopPolling',
  async () => {
    clearInterval(refreshInterval);
  }
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getProfileOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки истории заказов';
      });
  }
});

export const profileOrdersReducer = profileOrdersSlice.reducer;
