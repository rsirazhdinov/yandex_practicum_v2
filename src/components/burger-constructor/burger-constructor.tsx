import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

import { BurgerConstructorBunEmpty } from '@components/burger-constructor-bun-empty/burger-constructor-bun-empty.jsx';
import { BurgerConstructorIngredientEmpty } from '@components/burger-constructor-ingredient-empty/burger-constructor-ingredient-empty.jsx';
import { DraggableIngredient } from '@components/draggable-ingredient/draggable-ingredient.jsx';
import { addItemConstructor } from '@services/actions/burger-constructor.js';
import { saveOrderAction } from '@services/actions/order.js';
import { getTotalPrice } from '@services/selectors/burger-constructor.js';

import { useDispatch, useSelector } from '../../services/hooks';
import { ingredientTypeArray } from '../../utils/burger-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import type { TIngredient } from '@/utils/types';

import styles from './burger-constructor.module.css';

type TIngredietWithId = { id: number } & TIngredient;
export default function BurgerConstructor(): React.JSX.Element {
  const [orderDetailsModalVisible, setOrderDetailsModalVisible] =
    useState<boolean>(false);

  const user = useSelector((store) => store?.auth?.user);
  const ingredients: readonly TIngredietWithId[] = useSelector(
    (store) => store?.burgerConstructor?.ingredients
  );
  const bun = useSelector((store) => store?.burgerConstructor?.bun);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPrice = useSelector(getTotalPrice);

  const [{ isHover }, dropTarger] = useDrop<
    TIngredietWithId,
    unknown,
    { isHover: boolean }
  >({
    accept: 'ingredients',
    drop(item) {
      dispatch(addItemConstructor(item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const handleOpenOrderDetailsModal = (): void => {
    if (!user) {
      navigate('/login');
      return;
    }
    setOrderDetailsModalVisible(true);
    const ingredientsIdArray = [
      bun?._id,
      ...(ingredients?.map((item) => item._id) ?? []),
      bun?._id,
    ];

    dispatch(saveOrderAction(ingredientsIdArray));
  };

  const handleCloseOrderDetailsModal = (): void => {
    setOrderDetailsModalVisible(false);
  };

  const burgerConstructorIngredients = ingredients?.filter(
    (item) => item.type !== 'bun'
  );

  const ref = useRef<HTMLDivElement>(null); // If you also need a separate ref

  const combinedRef = (node: HTMLDivElement | null): void => {
    dropTarger(node); // Pass the node to react-dnd's drag connector
    if (ref.current) {
      ref.current = node; // Assign the node to your own ref if needed
    }
  };

  return (
    <section
      data-testid="contstructor_container"
      ref={combinedRef}
      className={` ${styles.constructor_section} ${isHover ? styles.on_hover : ''} `}
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
          data-testid="create_order"
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
