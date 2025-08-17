import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchProfileOrders = createAsyncThunk(
  'profileOrders/fetchProfileOrders',
  async () => {
    const data = await getOrdersApi();
    return data;
  }
);

type TProfileOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: TProfileOrdersState = {
  orders: [],
  isLoading: false,
  hasError: false
};

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchProfileOrders.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  }
});

export const profileOrdersReducer = profileOrdersSlice.reducer;
