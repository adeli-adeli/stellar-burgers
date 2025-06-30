import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';
import { v4 as uuidv4 } from 'uuid';

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
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.constructorItems.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: uuidv4()
        }
      })
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

export const bunItem = (state: RootState) => state.constructorSlice.bun;
export const constructorItems = (state: RootState) =>
  state.constructorSlice.constructorItems;

export const constructorReducer = ConstructorSlice.reducer;
