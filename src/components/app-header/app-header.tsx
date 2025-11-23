import { Logo } from '@krgaa/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

import MenuItem from '../menu-item/menu-item';

import styles from './app-header.module.css';

export default function AppHeader(): React.JSX.Element {
  return (
    <header className={styles.menu}>
      <nav className={styles.menu_box}>
        <NavLink to="/" className={styles.a}>
          {({ isActive }) => {
            return (
              <MenuItem
                className={`mt-4 mb-4 mr-2 pl-5 pr-5  ${styles.menu_item} `}
                iconName="burger"
                iconType={isActive ? 'primary' : 'secondary'}
                title="Конструктор"
                isActive={isActive ? true : false}
              />
            );
          }}
        </NavLink>

        <NavLink to="/feed" className={styles.a}>
          {({ isActive }) => {
            return (
              <MenuItem
                className={`mt-4 mb-4 mr-2 pl-5 pr-5  ${styles.menu_item} `}
                iconName="list"
                iconType={isActive ? 'primary' : 'secondary'}
                title="Лента заказов"
                isActive={isActive ? true : false}
              />
            );
          }}
        </NavLink>
      </nav>
      <NavLink to={'/'}>
        <Logo />
      </NavLink>
      <NavLink to={'/profile'} className={styles.a}>
        {({ isActive }) => {
          return (
            <MenuItem
              className={`mt-4 mb-4 mr-2 pl-5 pr-5  ${styles.menu_item_right} `}
              iconName="profile"
              iconType={isActive ? 'primary' : 'secondary'}
              title="Личный кабинет"
              isActive={isActive ? true : false}
            />
          );
        }}
      </NavLink>
    </header>
  );
}
