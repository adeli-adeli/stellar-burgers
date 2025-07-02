import {
  initialState,
  loginUser,
  profileReducer,
  profileUser,
  registerUser,
  updateUser
} from './profileSlice';

describe('Проверяют редьюсер slice profileSlice', () => {
  //тесты для обработки состояния загрузки регистрации
  it('должен установить isLoading в true для pending', () => {
    const action = { type: registerUser.pending.type };
    const result = profileReducer(initialState, action);

    expect(result.isLoading).toBe(true);
  });

  it('При вызове Success записывает данные в user и ставит isLoading в false', () => {
    const user = {
      id: '1',
      name: 'джон',
      email: 'yandex@yandex.ru',
      password: '12346'
    };

    const action = { type: registerUser.fulfilled.type, payload: { user } };
    const prevState = { ...initialState, isLoading: true };
    const result = profileReducer(prevState, action);

    expect(result.isLoading).toBe(false);
    expect(result.user).toEqual(user);
    expect(result.isAuth).toBe(true);
    expect(result.isAuthChecked).toBe(true);
    expect(result.error).toBeNull();
  });

  it('При вызове Failed записывает данные error в и ставит isLoading в false', () => {
    const error = 'Ошибка загрузки';

    const action = { type: registerUser.rejected.type, payload: error };
    const prevState = { ...initialState, isLoading: true };
    const result = profileReducer(prevState, action);

    expect(result.isLoading).toBe(false);
    expect(result.isAuthChecked).toBe(true);
    expect(result.error).toBe(error);
  });

  //тесты для обработки состояния загрузки авторизация
  it('должен установить isLoading в true для pending', () => {
    const action = { type: loginUser.pending.type };
    const result = profileReducer(initialState, action);

    expect(result.isLoading).toBe(true);
  });

  it('При вызове Success записывает данные в user и ставит isLoading в false', () => {
    const user = {
      id: '1',
      email: 'yandex@yandex.ru',
      password: '12346'
    };

    const action = { type: loginUser.fulfilled.type, payload: { user } };
    const prevState = { ...initialState, isLoading: true };
    const result = profileReducer(prevState, action);

    expect(result.isLoading).toBe(false);
    expect(result.user).toEqual(user);
    expect(result.isAuth).toBe(true);
    expect(result.isAuthChecked).toBe(true);
    expect(result.error).toBeNull();
  });

  it('При вызове Failed записывает данные error в и ставит isLoading в false', () => {
    const error = 'Ошибка загрузки';

    const action = { type: loginUser.rejected.type, payload: error };
    const prevState = { ...initialState, isLoading: true };
    const result = profileReducer(prevState, action);

    expect(result.isLoading).toBe(false);
    expect(result.isAuthChecked).toBe(true);
    expect(result.error).toBe(error);
  });

  //тесты для обработки состояния загрузки получения данных пользователя
  it('должен установить isLoading в true для pending', () => {
    const action = { type: profileUser.pending.type };
    const result = profileReducer(initialState, action);

    expect(result.isLoading).toBe(true);
  });

  it('При вызове Success записывает данные в user и ставит isLoading в false', () => {
    const user = {
      id: '1',
      name: 'джон',
      email: 'yandex@yandex.ru',
      password: '12346'
    };

    const action = { type: profileUser.fulfilled.type, payload: { user } };
    const prevState = { ...initialState, isLoading: true };
    const result = profileReducer(prevState, action);

    expect(result.isLoading).toBe(false);
    expect(result.user).toEqual(user);
    expect(result.isAuthChecked).toBe(true);
    expect(result.error).toBeNull();
  });

  it('При вызове Failed записывает данные error в и ставит isLoading в false', () => {
    const error = 'Ошибка загрузки';

    const action = { type: profileUser.rejected.type, payload: error };
    const prevState = { ...initialState, isLoading: true };
    const result = profileReducer(prevState, action);

    expect(result.isLoading).toBe(false);
    expect(result.isAuthChecked).toBe(true);
    expect(result.error).toBe(error);
  });

  //тесты для обработки состояния загрузки обновления данных пользователя
  it('должен установить isLoading в true для pending', () => {
    const action = { type: updateUser.pending.type };
    const result = profileReducer(initialState, action);

    expect(result.isLoading).toBe(true);
  });

  it('При вызове Success записывает данные в user и ставит isLoading в false', () => {
    const user = {
      id: '1',
      name: 'джон',
      email: 'yandex@yandex.ru',
      password: '12346'
    };

    const action = { type: updateUser.fulfilled.type, payload: { user } };
    const prevState = { ...initialState, isLoading: true };
    const result = profileReducer(prevState, action);

    expect(result.isLoading).toBe(false);
    expect(result.user).toEqual(user);
    expect(result.error).toBeNull();
  });

  it('При вызове Failed записывает данные error в и ставит isLoading в false', () => {
    const error = 'Ошибка загрузки';

    const action = { type: updateUser.rejected.type, payload: error };
    const prevState = { ...initialState, isLoading: true };
    const result = profileReducer(prevState, action);

    expect(result.isLoading).toBe(false);
    expect(result.error).toBe(error);
  });
});
