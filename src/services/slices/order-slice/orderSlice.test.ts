import {
  createOrder,
  getOrders,
  initialState,
  orderReducer
} from './orderSlice';

describe('Проверяют редьюсер slice orderSlice', () => {
  //тесты для обработки состояния загрузки создания заказа
  it('должен установить isLoading в true при pending', () => {
    const action = { type: createOrder.pending.type };
    const result = orderReducer(initialState, action);

    expect(result.orderRequest).toBe(true);
  });

  it('При вызове Success записывает данные в orders и ставит isLoading в false', () => {
    const order = {
      id: '1',
      name: 'order#1'
    };

    const action = { type: createOrder.fulfilled.type, payload: { order } };
    const prevState = { ...initialState, orderRequest: true, orders: [] };
    const result = orderReducer(prevState, action);

    expect(result.orderRequest).toBe(false);
    expect(result.orders).toEqual([order]);
    expect(result.orderModalData).toEqual(order);
    expect(result.orderError).toBeNull();
  });

  it('При вызове Failed записывает ошибку в error и ставит isLoading в false', () => {
    const error = 'Ошибка загрузки';

    const action = { type: createOrder.rejected.type, payload: error };
    const prevState = { ...initialState, orderRequest: true };
    const result = orderReducer(prevState, action);

    expect(result.orderRequest).toBe(false);
    expect(result.orderError).toBe(error);
  });

  //тесты для обработки состояния загрузки получения данных заказа
  it('должен установить isLoading в true для pending', () => {
    const action = { type: getOrders.pending.type };
    const result = orderReducer(initialState, action);

    expect(result.orderRequest).toBe(true);
  });

  it('При вызове Success записывает данные в orders и ставит isLoading в false', () => {
    const orders = [
      { id: '1', name: 'order#1' },
      { id: '2', name: 'order#2' }
    ];

    const action = { type: getOrders.fulfilled.type, payload: orders };
    const prevState = { ...initialState, orderRequest: true };
    const result = orderReducer(prevState, action);

    expect(result.orderRequest).toBe(false);
    expect(result.orders).toEqual(orders);
    expect(result.orderError).toBeNull();
  });

  it('При вызове Failed записывает данные в error и ставит isLoading в false', () => {
    const error = 'Ошибка загрузки';

    const action = { type: getOrders.rejected.type, payload: error };
    const prevState = { ...initialState, orderRequest: true };
    const result = orderReducer(prevState, action);

    expect(result.orderRequest).toBe(false);
    expect(result.orderError).toBe(error);
  });
});
