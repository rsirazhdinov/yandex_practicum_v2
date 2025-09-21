import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { ADD_MODAL_DATA } from '@services/actions/modal.js';
import { getCount } from '@services/selectors/burger-constructor.js';

import { ingredientType } from '../../utils/burger-types';

import styles from './ingredient.module.css';
export default function BurgerIngredient({ ingredient }) {
  const { image, price, name } = ingredient;
  const dispatch = useDispatch();
  const count = useSelector((store) => getCount(store, ingredient));

  const [{ opacity }, ref] = useDrag({
    type: 'ingredients',
    item: { ...ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging ? 1 : 0.5,
    }),
  });
  const onClickHandle = (ingredient) => {
    dispatch({
      type: ADD_MODAL_DATA,
      payload: ingredient,
    });
  };

  return (
    <article
      ref={ref}
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

BurgerIngredient.propTypes = {
  ingredient: ingredientType,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
