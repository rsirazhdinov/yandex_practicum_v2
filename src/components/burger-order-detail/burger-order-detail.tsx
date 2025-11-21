import { getOrderAction } from '@/services/actions/order';
import { useDispatch, useSelector } from '@/services/hooks';
import { OrderStatus } from '@/utils/types';
import { FormattedDate } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Icon } from '../order/icon/icon';
import { Price } from '../price/price';

import styles from './burger-order-detail.module.css';

export const BurgerOrderDetail = (): React.JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { number } = useParams();

  const orderData = useSelector((state) => {
    let order = number && state.feed.orders.find((o) => o.number === +number);
    if (order) {
      return order;
    }
    order = number && state.feedProfile.orders.find((o) => o.number === +number);
    if (order) {
      return order;
    }
    return state.order.getOrderData;
  });

  useEffect(() => {
    if (!orderData && number) {
      dispatch(getOrderAction(+number));
    }
  }, []);

  const backgroundLocation = location.state?.backgroundLocation;

  const ingredientsHash =
    useSelector((state) => state.ingredients.ingredientsHash) || null;
  const countOrderData = orderData?.ingredients.reduce(
    (accumulator: Record<string, number>, currentValue) => {
      accumulator[currentValue] =
        ingredientsHash?.[currentValue]?.['type'] !== 'bun'
          ? (accumulator[currentValue] || 0) + 1
          : 2;
      return accumulator;
    },
    {}
  );

  let totalPrice = 0;
  if (ingredientsHash) {
    totalPrice =
      orderData?.ingredients.reduce(
        (accumulator, currentValue) =>
          accumulator +
          ingredientsHash?.[currentValue]?.['price'] *
            (ingredientsHash?.[currentValue]?.['type'] === 'bun' ? 2 : 1),
        0
      ) || 0;
  }

  return (
    <main className={` ${styles.mainContainer}`}>
      {!backgroundLocation && (
        <section className="mb-10">
          <p className="text text_type_digits-default text_color_primary">
            # {orderData?.number}
          </p>
        </section>
      )}
      <section className={`mt-10 mb-3 ${styles.alignItemsStart}`}>
        <p className="text text_type_main-medium text_color_primary">
          {orderData?.name}
        </p>
      </section>
      <section className={`mb-15 ${styles.alignItemsStart}`}>
        <p className="text text_type_main-default text_color_success">
          {OrderStatus[orderData?.status as keyof typeof OrderStatus]}
        </p>
      </section>
      <section className={`mb-6 ${styles.alignItemsStart}`}>
        <p className="text text_type_main-medium text_color_primary">Состав:</p>
      </section>

      <section className={`mb-10 ${styles.compound}`}>
        <section className={`mb-10 ${styles.scrollableItem}`}>
          {countOrderData &&
            Object.keys(countOrderData).map((k) => {
              return (
                <div className={`${styles.compoundItemContainer}`} key={k}>
                  <div className={`${styles.leftGroup}`}>
                    <Icon ingredientId={k} />
                    <p className="text text_type_main-default">
                      {ingredientsHash?.[k]?.['name']}
                    </p>
                  </div>
                  <div className={`mr-6 ${styles.flex}`}>
                    <p className="mr-2 text text_type_digits-default text_color_primary">
                      {countOrderData[k]}
                    </p>
                    <p className="mr-2 text text_type_digits-default text_color_primary">
                      x
                    </p>
                    {ingredientsHash?.[k]?.['price'] && (
                      <Price price={ingredientsHash?.[k]?.['price']} />
                    )}
                  </div>
                </div>
              );
            })}
        </section>
      </section>
      <section className={`${styles.priceContainer}`}>
        {orderData && <FormattedDate date={new Date(orderData.createdAt)} />}
        <Price price={totalPrice} />
      </section>
    </main>
  );
};
