import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useAppDispatch } from 'src/services/store';
import {
  moveItemDown,
  moveItemUp,
  removeIngredient
} from 'src/services/slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();

    //обработчик вниз
    const handleMoveDown = () => {
      dispatch(moveItemDown(index));
    };

    //обработчик вверх
    const handleMoveUp = () => {
      dispatch(moveItemUp(index));
    };

    // обработчик удаления
    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
