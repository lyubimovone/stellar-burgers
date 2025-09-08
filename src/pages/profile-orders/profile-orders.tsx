import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getProfileOrders } from '../../services/slices/profile-orders-slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state) => state.profileOrders
  );

  useEffect(() => {
    dispatch(getProfileOrders());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка истории заказов...</div>; // Временная заглушка вместо Preloader
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
