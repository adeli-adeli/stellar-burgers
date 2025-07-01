import { v4 as uuidv4 } from 'uuid';
import {
  addIngredient,
  constructorReducer,
  initialState,
  moveItemDown,
  moveItemUp,
  removeIngredient
} from './constructorSlice';

jest.mock('uuid');

const baseIngredient = {
  _id: '643d69a5c3f7b9001cfa0944',
  name: 'Соус традиционный галактический',
  type: 'sauce',
  proteins: 42,
  fat: 24,
  carbohydrates: 42,
  calories: 99,
  price: 15,
  image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
  __v: 0
};

const bunIngredient = {
  ...baseIngredient,
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

describe('Проверяют редьюсер слайса constructorSlice', () => {
  beforeEach(() => {
    (uuidv4 as jest.Mock).mockReturnValue('mock-id');
  });

  it('Проверка экшена добавления ингредиента', () => {
    const addItem = constructorReducer(
      initialState,
      addIngredient(baseIngredient)
    );

    //Проверяем, что в массиве constructorItems появился добавленный ингредиент
    // Проверяем, что булка не добавилась в bun
    // Проверяем, что сгенерированный id соответствует mock-id
    // Проверяем, что ингредиент установилсь в поле constructorItems

    expect(addItem.constructorItems).toHaveLength(1);
    expect(addItem.bun).toBeNull();
    expect(addItem.constructorItems[0].id).toBe('mock-id');
    expect(addItem.constructorItems[0]).toMatchObject(baseIngredient);
  });
  it('Проверка экшена добавления булки', () => {
    const addBun = constructorReducer(
      initialState,
      addIngredient(bunIngredient)
    );

    // Проверяем, что булка установилась в поле bun
    // Проверяем, что булка не попала в массив constructorItems
    // Проверяем, что сгенерированный id соответствует mock-id

    expect(addBun.bun).toMatchObject(bunIngredient);
    expect(addBun.constructorItems).toHaveLength(0);
    expect(addBun.bun?.id).toBe('mock-id');
  });
  it('Проверка экшена удаления ингредиента', () => {
    const state = {
      ...initialState,
      constructorItems: [{ ...baseIngredient, id: 'mock-id' }]
    };

    const removeItem = constructorReducer(state, removeIngredient('mock-id'));

    // Проверяем, что ингредиент с указанным id удалён из constructorItems
    expect(removeItem.constructorItems).toHaveLength(0);
  });
  it('Проверка экшена перемещение ингредиента вверх', () => {
    const state = {
      ...initialState,
      constructorItems: [
        { ...baseIngredient, id: 'mock-id-1' },
        { ...baseIngredient, id: 'mock-id-2' }
      ]
    };

    const itemUp = constructorReducer(state, moveItemUp(1));

    //проверяем, что они поменялись местами
    expect(itemUp.constructorItems[0].id).toBe('mock-id-2');
    expect(itemUp.constructorItems[1].id).toBe('mock-id-1');
  });
  it('Проверка экшена перемещение ингредиента вниз', () => {
    const state = {
      ...initialState,
      constructorItems: [
        { ...baseIngredient, id: 'mock-id-2' },
        { ...baseIngredient, id: 'mock-id-1' }
      ]
    };

    const itemDown = constructorReducer(state, moveItemDown(0));

    //проверяем, что они вернулись на свои места
    expect(itemDown.constructorItems[0].id).toBe('mock-id-1');
    expect(itemDown.constructorItems[1].id).toBe('mock-id-2');
  });
});
