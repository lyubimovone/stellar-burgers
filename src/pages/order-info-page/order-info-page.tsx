import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import { getOrderByNumberApi } from '@api';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredients';
import {
  selectIngredients,
  selectIsIngredientsLoading
} from '../../services/selectors/ingredients';
import styles from '../pages.module.css';

export const OrderInfoPage: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useAppDispatch();
  const ingredients: TIngredient[] = useAppSelector(selectIngredients);
  const isIngredientsLoading = useAppSelector(selectIsIngredientsLoading);
  const [order, setOrder] = useState<TOrder | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  useEffect(() => {
    if (number) {
      getOrderByNumberApi(Number(number))
        .then((data) => {
          setOrder(data.orders[0]);
        })
        .finally(() => setIsLoading(false));
    }
  }, [number]);

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

  if (isIngredientsLoading || isLoading || !orderInfo) {
    return <Preloader />;
  }

  return (
    <main className={styles.containerMain}>
      <p className='text text_type_digits-default pb-6'>#{number}</p>
      <OrderInfoUI orderInfo={orderInfo} />
    </main>
  );
};
