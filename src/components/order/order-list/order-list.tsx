import { Link, useLocation, useMatch } from 'react-router-dom';

import { OrderCard } from '../order-card/order-card';

import type { TOrder } from '@/services/types/feed';

import style from './order-list.module.css';

type TOrdersList = {
  orders: TOrder[];
};

export const OrderList = ({ orders }: TOrdersList): React.JSX.Element => {
  const location = useLocation();
  const matchFeed = useMatch('/feed');
  const linkUrl = matchFeed ? '/feed/' : '/profile/orders/';
  return (
    <main className={style.mainContainer}>
      {orders &&
        orders.map((order) => (
          <Link
            key={order._id}
            className={style.link}
            to={`${linkUrl}${order.number}`}
            state={{ backgroundLocation: location }}
          >
            <OrderCard orderData={order} />
          </Link>
        ))}
    </main>
  );
};
