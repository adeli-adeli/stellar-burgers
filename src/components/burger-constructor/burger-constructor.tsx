import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from 'src/services/store';
import { useNavigate } from 'react-router-dom';
import {
  bunItem,
  clearConstructor,
  constructorItems
} from 'src/services/slices/constructor-slice/constructorSlice';
import {
  closeModal,
  createOrder,
  modalData,
  request
} from 'src/services/slices/order-slice/orderSlice';
import {
  isAuthProfile,
  isLoadingProfile
} from 'src/services/slices/profile-slice/profileSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const bun = useAppSelector(bunItem);
  const constructor = useAppSelector(constructorItems);

  const orderRequest = useAppSelector(request);
  const orderModalData = useAppSelector(modalData);
  const isLoading = useAppSelector(isLoadingProfile);
  const isAuth = useAppSelector(isAuthProfile);
  const navigate = useNavigate();

  //очистка конструктора после успешного заказа
  useEffect(() => {
    if (orderModalData && !orderRequest) {
      dispatch(clearConstructor());
    }
  }, [dispatch, orderModalData, orderRequest]);

  // обработчик клика по кнопке "Оформить заказ"
  const onOrderClick = () => {
    // Прерываем выполнение, если булочка не выбрана или заказ уже отправляется
    if (!bun || orderRequest) return;

    //проверка авторизации
    if (!isAuth && !isLoading) {
      navigate('/login');
      return;
    }
    //создаем массив id ингредиентов
    const ingredients = [
      bun._id,
      ...constructor.map((item) => item._id),
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
      (constructor?.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ) || 0),
    [bun, constructor]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients: constructor }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
