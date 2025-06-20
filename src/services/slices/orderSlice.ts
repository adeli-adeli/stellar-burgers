import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface InitialState {
  orders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: InitialState = {
  orders: [],
  orderRequest: false,
  orderModalData: null
};

//Асинхронный thunk для создания заказа
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    //состояние загрузки заказа
    setOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    },

    //данные модального окна заказа
    setOrderModalData: (state, action) => {
      state.orderModalData = action.payload;
    },

    //закрытие модального окна
    closeModal: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },

  // обработка состояния загрузки
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.orders = [...state.orders, action.payload.order];
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { setOrderRequest, setOrderModalData, closeModal } =
  OrderSlice.actions;

export const orderReducer = OrderSlice.reducer;
