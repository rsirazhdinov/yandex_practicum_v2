import { OrderList } from '@/components/order/order-list/order-list';
import {
  connectFeedProfile,
  disconnectFeedProfile,
} from '@/services/actions/feed-profile';
import { useDispatch, useSelector } from '@/services/hooks';
import { useEffect } from 'react';

import styles from './order.module.css';

export const Orders = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken')?.split('Bearer ')[1];
  useEffect(() => {
    dispatch(
      connectFeedProfile(`wss://norma.education-services.ru/orders?token=${token}`)
    );
  }, [dispatch(disconnectFeedProfile())]);

  const orders = useSelector((state) => state.feedProfile.orders);

  return (
    <div className={styles.container}>
      <OrderList orders={orders} />
    </div>

    // <p className="text text_type_main-medium">Здесь будет страница Истории заказов...</p>
  );
};
