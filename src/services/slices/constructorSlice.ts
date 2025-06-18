import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder, TOrdersData } from '@utils-types';

interface InitialState {
  bun: TConstructorIngredient | null;
  constructorItems: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: InitialState = {
  bun: null,
  constructorItems: [],
  orderRequest: false,
  orderModalData: null
};

export const ConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    //добавление
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.constructorItems.push(ingredient);
      }
    },

    //удаление
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems = state.constructorItems.filter(
        (item) => item.id !== action.payload
      );
    },

    //состояние загрузки заказа
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },

    //данные модального окна заказа
    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      state.orderModalData = action.payload;
    },

    //поднять вверх
    moveItemUp: (state, action: PayloadAction<number>) => {
      const item = action.payload;

      if (item > 0) {
        [state.constructorItems[item], state.constructorItems[item - 1]] = [
          state.constructorItems[item - 1],
          state.constructorItems[item]
        ];
      }
    },

    //переместить вниз
    moveItemDown: (state, action: PayloadAction<number>) => {
      const item = action.payload;

      if (item < state.constructorItems.length - 1) {
        [state.constructorItems[item], state.constructorItems[item + 1]] = [
          state.constructorItems[item + 1],
          state.constructorItems[item]
        ];
      }
    },

    //очистка
    clearConstructor: (state) => {
      state.constructorItems = [];
      state.bun = null;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  setOrderModalData,
  setOrderRequest,
  clearConstructor,
  moveItemDown,
  moveItemUp
} = ConstructorSlice.actions;
export const constructorReducer = ConstructorSlice.reducer;
