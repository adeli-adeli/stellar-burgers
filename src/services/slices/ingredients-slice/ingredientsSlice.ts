import { getIngredientsApi } from 'src/utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';

interface InitialState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: InitialState = {
  ingredients: [],
  isLoading: true,
  error: null
};

//Асинхронный thunk для получения ингредиентов
export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const IngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const selectIngredients = (state: RootState) =>
  state.ingredientsSlice.ingredients;
export const selectIsLoading = (state: RootState) =>
  state.ingredientsSlice.isLoading;
export const selectError = (state: RootState) => state.ingredientsSlice.error;

export const {} = IngredientsSlice.actions;

export const ingredientsReducer = IngredientsSlice.reducer;
