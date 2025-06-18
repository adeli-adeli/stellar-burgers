import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from 'src/services/store';
import { closeModal, createOrder } from 'src/services/slices/constructorSlice';
import useAuth from 'src/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const { bun, constructorItems, orderModalData, orderRequest } =
    useAppSelector((state) => state.constructorSlice);
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  // обработчик клика по кнопке "Оформить заказ"
  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    //проверка авторизации
    if (!isAuth) {
      navigate('/login');
      return;
    }
    //создаем массив id ингредиентов
    const ingredients = [
      bun._id,
      ...constructorItems.map((item) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredients));
  };

  //обработчик закрытия модального окна
  const closeOrderModal = () => {
    dispatch(closeModal());
  };

  // общая стоимость
  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      (constructorItems?.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ) || 0),
    [bun, constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients: constructorItems }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
