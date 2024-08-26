import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
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
