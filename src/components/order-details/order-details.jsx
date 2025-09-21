import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import done_img from '../../images/done.png';

import orderDetailsStyles from './order-details.module.css';

export default function OrderDetails() {
  const { order, saveOrderRequest, saveOrderFailed } = useSelector((store) => ({
    order: store?.order?.saveOrderData?.order?.number,
    saveOrderRequest: store?.saveOrderRequest,
    saveOrderFailed: store?.saveOrderFailed,
  }));
  if (saveOrderRequest) {
    return (
      <div className={orderDetailsStyles.order_details_box}>
        <p className="mb-15 text text_type_main-medium">Загрузка...</p>
      </div>
    );
  }
  if (saveOrderFailed) {
    return (
      <div className={orderDetailsStyles.order_details_box}>
        <p className="mb-15 text text_type_main-medium">Ошибка!</p>
      </div>
    );
  }
  return (
    <div className={orderDetailsStyles.order_details_box}>
      <p className="mb-8 text text_type_digits-large">{order}</p>
      <p className="mb-15 text text_type_main-medium">идентификатор заказа</p>
      <img
        className={` mb-15 ${orderDetailsStyles.done_img}`}
        src={done_img}
        alt="Изображение Выполнено"
      />
      <p className="mb-2 text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="mb-30 text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTyeps = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
