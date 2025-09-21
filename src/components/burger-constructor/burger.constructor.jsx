import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { BurgerConstructorBunEmpty } from '@components/burger-constructor-bun-empty/burger-constructor-bun-empty.jsx';
import { BurgerConstructorIngredientEmpty } from '@components/burger-constructor-ingredient-empty/burger-constructor-ingredient-empty.jsx';
import { DraggableIngredient } from '@components/draggable-ingredient/draggable-ingredient.jsx';
import { addItemConstructor } from '@services/actions/burger-constructor.js';
import { saveOrderAction } from '@services/actions/order.js';
import { getTotalPrice } from '@services/selectors/burger-constructor.js';

import { ingredientTypeArray } from '../../utils/burger-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import styles from './burger-constructor.module.css';

export default function BurgerConstructor() {
  const [orderDetailsModalVisible, setOrderDetailsModalVisible] = useState(false);

  const ingredients = useSelector((store) => store?.burgerConstructor?.ingredients);
  const bun = useSelector((store) => store?.burgerConstructor?.bun);
  const dispatch = useDispatch();
  const totalPrice = useSelector(getTotalPrice);

  const [{ isHover }, dropTarger] = useDrop({
    accept: 'ingredients',
    drop(item) {
      dispatch(addItemConstructor(item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const handleOpenOrderDetailsModal = () => {
    setOrderDetailsModalVisible(true);
    const ingredientsIdArray = [
      bun?._id,
      ...[ingredients?.map((item) => item._id)],
      bun?._id,
    ];
    dispatch(saveOrderAction(ingredientsIdArray));
  };

  const handleCloseOrderDetailsModal = () => {
    setOrderDetailsModalVisible(false);
  };

  const burgerConstructorIngredients = ingredients?.filter(
    (item) => item.type !== 'bun'
  );

  return (
    <section
      ref={dropTarger}
      className={` ${styles.constructor_section} ${isHover ? styles.onHover : ''} `}
    >
      {!bun && (
        <div className={` mt-4 ml-10 ${styles.constructor_element_box}`}>
          <BurgerConstructorBunEmpty topOrBoottom={'top'} />
        </div>
      )}
      {bun && (
        <div className={` mb-4 ml-10 ${styles.constructor_element_box}`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun?.name} (вверх)`}
            price={bun?.price}
            thumbnail={bun?.image}
          />
        </div>
      )}
      <ul className={styles.burger_constructor_box}>
        {burgerConstructorIngredients?.length > 0 ? (
          burgerConstructorIngredients.map((item, i) => (
            <DraggableIngredient key={item.id} item={item} index={i} />
          ))
        ) : (
          <BurgerConstructorIngredientEmpty />
        )}
      </ul>
      {!bun && (
        <div className={` mt-4 ml-10 ${styles.constructor_element_box}`}>
          <BurgerConstructorBunEmpty topOrBoottom={'bottom'} />
        </div>
      )}
      {bun && (
        <div className={` mt-4 ml-10 ${styles.constructor_element_box}`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun?.name} (низ)`}
            price={bun?.price}
            thumbnail={bun?.image}
          />
        </div>
      )}
      <div className={`mt-10 ${styles.btn_box}`}>
        <div className={styles.count_box}>
          <p className="text text_type_digits-medium mr-1">{totalPrice}</p>
          <CurrencyIcon className={styles.count_icon} type="primary" />
        </div>
        <Button
          disabled={!bun || ingredients?.length === 0}
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleOpenOrderDetailsModal}
        >
          Оформить Заказ
        </Button>
      </div>
      {orderDetailsModalVisible && (
        <Modal onClose={handleCloseOrderDetailsModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.propType = {
  ingredients: ingredientTypeArray,
};
