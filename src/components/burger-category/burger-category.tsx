import { Link, useLocation } from 'react-router-dom';

import BurgerIngredient from '../ingredient/burger-ingredient';

import type { TIngredient } from '@/utils/types';
import type { RefObject } from 'react';

import styles from './burger-category.module.css';

type BurgerCategoryProps = {
  title: string;
  titleId: string;
  ingredients: readonly TIngredient[];
  ref: RefObject<HTMLParagraphElement | null>;
};

export default function BurgerCategory({
  title,
  titleId,
  ingredients,
  ref,
}: BurgerCategoryProps): React.JSX.Element {
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
              <BurgerIngredient className="ml-6" ingredient={ingredient} />
            </Link>
          ))}
      </div>
    </>
  );
}
