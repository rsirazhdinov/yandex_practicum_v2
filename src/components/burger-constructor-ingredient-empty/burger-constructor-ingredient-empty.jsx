import styles from './burger-constructor-ingredient-empty.module.css';

export const BurgerConstructorIngredientEmpty = () => {
  return (
    <div className={styles.main}>
      <span className={styles.span}>
        <span className={styles.text}>Добавьте начинку</span>
      </span>
    </div>
  );
};
