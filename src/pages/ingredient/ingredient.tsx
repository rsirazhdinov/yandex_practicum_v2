import IngredientDetails from '@components/ingredient-details/ingredient-details.jsx';

import styles from './ingredient.module.css';

export const Ingredient = (): React.JSX.Element => {
  return (
    <main className={` mb-10 ${styles.main_screen}`}>
      <IngredientDetails />
    </main>
  );
};
