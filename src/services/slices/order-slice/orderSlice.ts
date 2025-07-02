import { getOrdersApi, orderBurgerApi } from 'src/utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from 'src/services/store';

interface InitialState {
  orders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export const initialState: InitialState = {
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

//Асинхронный thunk для получения заказов пользователя
export const getOrders = createAsyncThunk(
  'order/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
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

  // обработка состояния загрузки создания заказа
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
      })

      // обработка состояния загрузки получения данных заказа
      .addCase(getOrders.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const orders = (state: RootState) => state.orderSlice.orders;
export const request = (state: RootState) => state.orderSlice.orderRequest;
export const modalData = (state: RootState) => state.orderSlice.orderModalData;

export const { setOrderRequest, setOrderModalData, closeModal } =
  OrderSlice.actions;
export const orderReducer = OrderSlice.reducer;
