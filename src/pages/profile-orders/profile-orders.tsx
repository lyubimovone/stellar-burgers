import { useEffect, FC } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchProfileOrders } from '../../services/slices/profile-orders';
import {
  selectProfileOrders,
  selectIsProfileOrdersLoading
} from '../../services/selectors';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectProfileOrders);
  const isLoading = useAppSelector(selectIsProfileOrdersLoading);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
