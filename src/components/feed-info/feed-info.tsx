import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from 'react-redux';
import { getFeedsInfo } from '../../services/order/order';
import { Preloader } from '@ui';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orderList = useSelector(getFeedsInfo);

  if (!orderList) {
    return (
      <div>
        <Preloader />
      </div>
    );
  }
  const { total, totalToday, orders } = orderList;

  const feed = { total, totalToday };
  const order = orders;
  const readyOrders = getOrders(order, 'done');
  const pendingOrders = getOrders(order, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
