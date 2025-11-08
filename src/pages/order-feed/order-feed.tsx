import styles from './order-feed.module.css';
export const OrderFeed = (): React.JSX.Element => {
  return (
    <p className={`mt-20 text text_type_main-large ${styles.p}`}>
      Здесь будет лента заказов
    </p>
  );
};
