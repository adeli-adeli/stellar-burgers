import { feedReducer, getFeeds, initialState } from './feedSlice';

describe('Проверяют редьюсер slice feedSlice', () => {
  it('должен установить isLoading в true при pending', () => {
    const action = { type: getFeeds.pending.type };
    const result = feedReducer(initialState, action);

    expect(result.isLoading).toBe(true);
  });

  it('при вызове Success записывает данные в orders и ставит isLoading в false', () => {
    const items = [
      {
        id: '1',
        name: 'order#1'
      },
      {
        id: '2',
        name: 'order#2'
      }
    ];
    const action = { type: getFeeds.fulfilled.type, payload: items };
    const prevState = { ...initialState, isLoading: true };
    const result = feedReducer(prevState, action);

    expect(result.isLoading).toBe(false);
    expect(result.orders).toEqual(items);
    expect(result.error).toBeNull();
  });
  it('при вызове Failed записывает ошибку в error и ставит isLoading в false ', () => {
    const error = 'Ошибка загрузки';
    const action = { type: getFeeds.rejected.type, payload: error };
    const prevState = { ...initialState, isLoading: true };
    const result = feedReducer(prevState, action);

    expect(result.isLoading).toBe(false);

    expect(result.error).toBe(error);
  });
});
