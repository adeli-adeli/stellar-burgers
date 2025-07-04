import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useAppSelector } from 'src/services/store';
import { useParams } from 'react-router-dom';
import { selectIngredients } from 'src/services/slices/ingredients-slice/ingredientsSlice';

export const IngredientDetails: FC = () => {
  //получаем id из url
  const { id } = useParams<{ id: string }>();
  const ingredients = useAppSelector(selectIngredients);
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
