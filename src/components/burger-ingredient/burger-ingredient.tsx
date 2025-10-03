import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import {
  addBun,
  addIngredient
} from '../../services/slices/burger-сonstructor-slice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const constructorIngredients = useSelector(
      (state) => state.burgerConstructor.ingredients
    );
    const constructorBun = useSelector((state) => state.burgerConstructor.bun);

    const count = useMemo(() => {
      if (ingredient.type === 'bun') {
        return constructorBun?._id === ingredient._id ? 2 : 0;
      }
      return constructorIngredients.filter(
        (item) => item._id === ingredient._id
      ).length;
    }, [ingredient, constructorBun, constructorIngredients]);

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(addBun(ingredient));
      } else {
        dispatch(addIngredient(ingredient));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
