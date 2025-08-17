import { FC, useEffect } from 'react';
import { IngredientDetails } from '@components';
import { Preloader } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredients';
import {
  selectIngredients,
  selectIsIngredientsLoading
} from '../../services/selectors/ingredients';
import styles from '../pages.module.css';

export const IngredientDetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(selectIngredients);
  const isLoading = useAppSelector(selectIsIngredientsLoading);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  if (isLoading || !ingredients.length) {
    return <Preloader />;
  }

  return (
    <main className={styles.containerMain}>
      <h2 className='text text_type_main-large pb-4'>Детали ингредиента</h2>
      <IngredientDetails />
    </main>
  );
};
