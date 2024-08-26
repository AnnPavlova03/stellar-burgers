import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';

import { getUser } from '../../services/user/slice';
import { getOrdersBurger } from '../../services/orderUser/actions';
import { getUserOrders } from '../../services/orderUser/orderUser';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersBurger());
  }, [getUserOrders, dispatch]);

  const orders: TOrder[] = useSelector(getUserOrders);
  return <ProfileOrdersUI orders={orders} />;
};
