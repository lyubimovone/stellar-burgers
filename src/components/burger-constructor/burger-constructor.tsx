import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { selectIsAuth } from '../../services/selectors/user';
import { useNavigate } from 'react-router-dom';
import { selectConstructor } from '../../services/selectors/burger-constructor';
import {
  selectIsOrderRequest,
  selectOrderData
} from '../../services/selectors/order';
import { createOrder, clearOrder } from '../../services/slices/order';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const constructorItems = useAppSelector(selectConstructor);
  const orderRequest = useAppSelector(selectIsOrderRequest);
  const orderModalData = useAppSelector(selectOrderData);

  const isAuth = useAppSelector(selectIsAuth);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuth) {
      navigate('/login');
      return;
    }
    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(ingredientsIds));
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
