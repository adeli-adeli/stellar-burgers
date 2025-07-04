import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useAppSelector } from 'src/services/store';
import { useParams } from 'react-router-dom';
import { selectIngredients } from 'src/services/slices/ingredients-slice/ingredientsSlice';
import { ordersFeed } from 'src/services/slices/feed-slice/feedSlice';

export const OrderInfo: FC = () => {
  const ingredients = useAppSelector(selectIngredients);
  const orders = useAppSelector(ordersFeed);
  const { number } = useParams<{ number: string }>();
  const order = orders.find((item) => String(item.number) === number);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!order || !ingredients.length) return null;

    const date = new Date(order.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...order,
      ingredientsInfo,
      date,
      total
    };
  }, [order, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
