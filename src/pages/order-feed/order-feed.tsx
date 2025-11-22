import { OrderList } from '@/components/order/order-list/order-list';
import { connectFeed, disconnectFeed } from '@/services/actions/feed';
import { useDispatch, useSelector } from '@/services/hooks';
import { useEffect } from 'react';

import styles from './order-feed.module.css';
export const OrderFeed = (): React.JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectFeed('wss://norma.education-services.ru/orders/all'));
    return (): void => {
      dispatch(disconnectFeed());
    };
  }, []);

  const orders = useSelector((state) => state.feed.orders);
  const total = useSelector((state) => state.feed.total);
  const totalToday = useSelector((state) => state.feed.totalToday);
  const ordersDone = orders.filter((order) => order.status === 'done');
  const ordersInWork = orders.filter((order) => order.status !== 'done');
  return (
    <main className={` mb-10 ${styles.main}`}>
      <section className={styles.left_container}>
        <p className=" mt-10 mb-6 text text_type_main-large">Лента заказов</p>
        <OrderList orders={orders} />
      </section>
      <section className={`pt-25 ${styles.rightContainer}`}>
        <section className={styles.firstSectionContainer}>
          <section className={styles.readyContainer}>
            <section>
              <p className="text text_type_main-large">Готовы:</p>
            </section>
            <section className={styles.columnContainer}>
              <section className={styles.leftColumn}>
                {ordersDone &&
                  ordersDone.map((value) => (
                    <p
                      key={value._id}
                      className="text text_type_digits-default text_color_success"
                    >
                      {value.number}
                    </p>
                  ))}
              </section>
            </section>
          </section>
          <section className={styles.inWorkContainer}>
            <section>
              <p className="text text_type_main-large">В работе:</p>
            </section>
            <section className={styles.columnContainer}>
              <section className={styles.leftColumn}>
                {ordersInWork &&
                  ordersInWork.map((value) => (
                    <p key={value._id} className="text text_type_digits-default">
                      {value.number}
                    </p>
                  ))}
              </section>
            </section>
          </section>
        </section>
        <section>
          <section>
            <p className="text text_type_main-large">Выполнено за все время:</p>
          </section>
          <section>
            <p className="text text_type_digits-large">{total}</p>
          </section>
        </section>
        <section>
          <section>
            <p className="text text_type_main-large">Выполнено за сегодня:</p>
          </section>
          <section>
            <p className="text text_type_digits-large">{totalToday}</p>
          </section>
        </section>
      </section>
    </main>
  );
};
