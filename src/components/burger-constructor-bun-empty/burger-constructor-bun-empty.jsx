import styles from './burger-constructor-bun-empty.module.css';

export const BurgerConstructorBunEmpty = ({ topOrBoottom }) => {
  const addClass = topOrBoottom === 'top' ? styles.top : styles.bottom;
  return (
    <div className={` ${styles.main} ${addClass}`}>
      <span className={styles.span}>
        <span className={styles.text}>Добавьте булку</span>
      </span>
    </div>
  );
};
