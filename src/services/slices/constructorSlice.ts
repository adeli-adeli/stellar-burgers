import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface InitialState {
  bun: TConstructorIngredient | null;
  constructorItems: TConstructorIngredient[];
}

const initialState: InitialState = {
  bun: null,
  constructorItems: []
};

export const ConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    //добавление
    addIngredient: (state, action) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.constructorItems.push(ingredient);
      }
    },

    //удаление
    removeIngredient: (state, action) => {
      state.constructorItems = state.constructorItems.filter(
        (item) => item.id !== action.payload
      );
    },

    //поднять вверх
    moveItemUp: (state, action) => {
      const item = action.payload;

      if (item > 0) {
        [state.constructorItems[item], state.constructorItems[item - 1]] = [
          state.constructorItems[item - 1],
          state.constructorItems[item]
        ];
      }
    },

    //переместить вниз
    moveItemDown: (state, action) => {
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
  clearConstructor,
  moveItemDown,
  moveItemUp
} = ConstructorSlice.actions;
export const constructorReducer = ConstructorSlice.reducer;
