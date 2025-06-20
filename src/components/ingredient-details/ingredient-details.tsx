import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useAppSelector } from 'src/services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  //получаем id из url
  const { id } = useParams<{ id: string }>();
  const { ingredients } = useAppSelector((state) => state.ingredientsSlice);
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
