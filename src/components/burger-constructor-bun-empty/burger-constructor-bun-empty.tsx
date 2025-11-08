import styles from './burger-constructor-bun-empty.module.css';

type BurgerConstructorBunEmptyProps = {
  topOrBoottom: string;
};

export const BurgerConstructorBunEmpty = ({
  topOrBoottom,
}: BurgerConstructorBunEmptyProps): React.JSX.Element => {
  const addClass = topOrBoottom === 'top' ? styles.top : styles.bottom;
  return (
    <div className={` ${styles.main} ${addClass}`}>
      <span className={styles.span}>
        <span className={styles.text}>Добавьте булку</span>
      </span>
    </div>
  );
};
