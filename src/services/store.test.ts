import { rootReducer } from './store';

describe('Проверяет правильную  инициализацию rootReducer', () => {
  it('возвращает корректное начальное стостояние при неизвестном экшене', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, action);

    expect(initialState).toHaveProperty('ingredientsSlice');
    expect(initialState).toHaveProperty('constructorSlice');
    expect(initialState).toHaveProperty('orderSlice');
    expect(initialState).toHaveProperty('profileSlice');
    expect(initialState).toHaveProperty('feedSlice');

    expect(initialState.constructorSlice).toBeDefined();
    expect(initialState.feedSlice).toBeDefined();
    expect(initialState.ingredientsSlice).toBeDefined();
    expect(initialState.orderSlice).toBeDefined();
    expect(initialState.profileSlice).toBeDefined();
  });
});
