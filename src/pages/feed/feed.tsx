import { Modal, OrderInfo } from '@components';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getFeedsInfo } from '../../services/order/order';
import { getFeeds } from '../../services/order/actions';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orderList = useSelector(getFeedsInfo);
  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (!orderList) {
    return <Preloader />;
  }

  const { orders } = orderList;
  const order = orders;

  return (
    <FeedUI
      orders={order}
      handleGetFeeds={() => {
        [...order];
      }}
    />
  );
};
