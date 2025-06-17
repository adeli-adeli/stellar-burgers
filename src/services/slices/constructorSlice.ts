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
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.constructorItems.push(ingredient);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems = state.constructorItems.filter(
        (item) => item.id !== action.payload
      );
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      state.orderModalData = action.payload;
    },
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
  clearConstructor
} = ConstructorSlice.actions;
export const constructorReducer = ConstructorSlice.reducer;
