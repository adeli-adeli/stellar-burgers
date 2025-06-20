import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface InitialState {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: InitialState = {
  orders: [],
  isLoading: false,
  error: null
};

//Асинхронный thunk для получения заказов
export const getFeeds = createAsyncThunk(
  'feed/greFeeds',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const {} = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
