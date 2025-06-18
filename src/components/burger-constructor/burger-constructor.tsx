import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppSelector } from 'src/services/store';

export const BurgerConstructor: FC = () => {
  const { bun, constructorItems, orderModalData, orderRequest } =
    useAppSelector((state) => state.constructorSlice);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

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
