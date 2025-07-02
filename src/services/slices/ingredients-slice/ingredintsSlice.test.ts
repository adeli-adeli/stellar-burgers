import {
  fetchIngredients,
  ingredientsReducer,
  initialState
} from './ingredientsSlice';

describe('Проверяют редьюсер slice ingredientsSlice', () => {
  it('должен установить isLoading в true при pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const result = ingredientsReducer(initialState, action);

    expect(result.isLoading).toBe(true);
  });

  it('при вызове Success записывает данные в ingredients и ставит isLoading в false', () => {
    const items = [
      {
        id: '1',
        name: 'Булка'
      },
      {
        id: '2',
        name: 'Соус'
      },
      {
        id: '3',
        name: 'Мясо'
      }
    ];
    const action = { type: fetchIngredients.fulfilled.type, payload: items };
    const prevState = { ...initialState, isLoading: true };
    const result = ingredientsReducer(prevState, action);

    expect(result.isLoading).toBe(false);
    expect(result.ingredients).toEqual(items);
    expect(result.error).toBeNull();
  });
  it('при вызове Failed записывает ошибку в error и ставит isLoading в false ', () => {
    const error = 'Ошибка загрузки';
    const action = { type: fetchIngredients.rejected.type, payload: error };
    const prevState = { ...initialState, isLoading: true };
    const result = ingredientsReducer(prevState, action);

    expect(result.isLoading).toBe(false);
    expect(result.error).toBe(error);
  });
});
