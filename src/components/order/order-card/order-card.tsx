import { Price } from '@/components/price/price';
import { useSelector } from '@/services/hooks';
import { OrderStatus } from '@/utils/types';
import { FormattedDate } from '@krgaa/react-developer-burger-ui-components';
import { useMatch } from 'react-router-dom';

import { IconList } from '../icon-list/icon-list';

import type { TOrder } from '@/services/types/feed';

import appStyles from './order-card.module.css';

type TOrderCard = {
  orderData: TOrder;
};

export const OrderCard = ({ orderData }: TOrderCard): React.JSX.Element => {
  const matchProfileOrders = useMatch('/profile/orders');

  const ingredientsHash = useSelector((state) => state.ingredients.ingredientsHash);

  const totalPrice = orderData?.ingredients.reduce(
    (accumulator, currentValue) =>
      accumulator +
      ingredientsHash?.[currentValue]['price'] *
        (ingredientsHash?.[currentValue]['type'] === 'bun' ? 2 : 1),
    0
  );

  return (
    <main className={appStyles.mainContainer}>
      <section className={appStyles.numberSection}>
        <div className={appStyles.number}>
          <p className="text text_type_digits-default text_color_primary">
            #{orderData.number}
          </p>
        </div>
        <div className={appStyles.date}>
          {' '}
          {orderData && (
            <FormattedDate
              className="text_color_inactive"
              date={new Date(orderData.createdAt)}
            />
          )}
        </div>
      </section>
      <section>
        <p className="mb-2 text text_type_main-medium text_color_primary">
          {orderData.name}
        </p>
        {matchProfileOrders && (
          <p
            className={`${orderData.status === 'done' ? 'text_color_success' : 'text_color_primary'} text text_type_default `}
          >
            {OrderStatus[orderData.status as keyof typeof OrderStatus]}
          </p>
        )}
      </section>
      <section className={appStyles.iconListContainer}>
        <IconList ingredients={orderData.ingredients} />
        <Price price={totalPrice} />
      </section>
    </main>
  );
};
