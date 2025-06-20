import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/services/store';
import { fetchIngredients } from 'src/services/slices/ingredientsSlice';

export const ConstructorPage: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, ingredients } = useAppSelector(
    (state) => state.ingredientsSlice
  );

  // Загружаем ингредиенты при монтировании компонента только если данных нет
  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
