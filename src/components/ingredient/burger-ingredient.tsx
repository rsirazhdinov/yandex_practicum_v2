import { ADD_MODAL_DATA } from '@/services/constants/modal.js';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag } from 'react-dnd';

import { getCount } from '@services/selectors/burger-constructor.js';

import { useDispatch, useSelector } from '../../services/hooks';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient.module.css';
export default function BurgerIngredient({
  ingredient,
}: {
  ingredient: TIngredient;
  className?: string;
}): React.JSX.Element {
  const { image, price, name } = ingredient;
  const dispatch = useDispatch();
  const count = useSelector((store) => getCount(store, ingredient));

  const [{ opacity }, drag] = useDrag<TIngredient, unknown, { opacity: number }>({
    type: 'ingredients',
    item: { ...ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  const onClickHandle = (ingredient: TIngredient): void => {
    dispatch({
      type: ADD_MODAL_DATA,
      payload: ingredient,
    });
  };

  const ref = useRef<HTMLDivElement>(null); // If you also need a separate ref

  const combinedRef = (node: HTMLDivElement | null): void => {
    drag(node); // Pass the node to react-dnd's drag connector
    if (ref.current) {
      ref.current = node; // Assign the node to your own ref if needed
    }
  };

  return (
    <article
      ref={combinedRef}
      style={{ opacity }}
      className={styles.container}
      onClick={() => onClickHandle(ingredient)}
    >
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <img
        className={`ml-4 mr-4 mb-1 ${styles.img}`}
        src={image}
        alt={'Изображение ингредиента' + ingredient.name}
      />
      <div className={`mt-1 ${styles.price}`}>
        <p className="mr-1 text text_type_digits-default">{price}</p>{' '}
        <CurrencyIcon type="primary" />
      </div>
      <div className={`mt-1 ${styles.name}`}>
        <p className="text text_type_main-default">{name}</p>
      </div>
    </article>
  );
}
