import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import { ingredientTypeArray } from '../../utils/burger-types';
import BurgerIngredient from '../ingredient/burger-ingredient';

import styles from './burger-category.module.css';

export default function BurgerCategory({ title, titleId, ingredients, ref }) {
  const location = useLocation();
  return (
    <>
      <p ref={ref} id={titleId} className="text text_type_main-medium">
        {title}
      </p>
      <div className={styles.container}>
        {ingredients &&
          ingredients.map((ingredient) => (
            <Link
              className={styles.a}
              key={ingredient._id}
              to={`/ingredient/${ingredient._id}`}
              state={{ backgroundLocation: location }}
            >
              <BurgerIngredient count={1} className="ml-6" ingredient={ingredient} />
            </Link>
          ))}
      </div>
    </>
  );
}

BurgerCategory.propTypes = {
  title: PropTypes.string.isRequired,
  titleId: PropTypes.number.isRequired,
  ingredients: ingredientTypeArray,
  handleOpenModal: PropTypes.func.isRequired,
};
