import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import MenuItem from '../menu-item/menu-item';

import styles from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={styles.menu}>
      <nav className={styles.menu_box}>
        <MenuItem
          className={`mt-4 mb-4 mr-2 pl-5 pr-5  ${styles.menu_item} `}
          iconName="burger"
          iconType="primary"
          title="Конструктор"
          isActive={true}
        />
        <MenuItem
          className={`mt-4 mb-4 mr-2 pl-5 pr-5  ${styles.menu_item} `}
          iconName="list"
          iconType="secondary"
          title="Лента заказов"
          isActive={false}
        />
      </nav>
      <Logo />
      <MenuItem
        className={`mt-4 mb-4 mr-2 pl-5 pr-5  ${styles.menu_item_right} `}
        iconName="profile"
        iconType="secondary"
        title="Личный кабинет"
        isActive={false}
      />
    </header>
  );
}
