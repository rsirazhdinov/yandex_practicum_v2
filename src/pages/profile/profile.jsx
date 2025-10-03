import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useMatch } from 'react-router-dom';

import { logout } from '@services/actions/auth.js';

import styles from './profile.module.css';

export const Profile = () => {
  const dispatch = useDispatch();
  const logoutRequest = useSelector((store) => store.auth.logoutRequest);
  const logoutFailed = useSelector((store) => store.auth.logoutFailed);

  const match = useMatch('/profile/orders');
  const handleExit = () => {
    dispatch(logout());
  };
  return (
    <main className={styles.main}>
      <section className={styles.main_container}>
        <section className={styles.section_left}>
          <div className={styles.p_wrapper}>
            <NavLink to="" end className={styles.a}>
              {({ isActive }) => {
                return (
                  <p
                    className={
                      isActive
                        ? 'text text_type_main-medium text_color_primary'
                        : 'text text_type_main-medium text_color_inactive'
                    }
                  >
                    Профиль
                  </p>
                );
              }}
            </NavLink>
          </div>
          <div className={styles.p_wrapper}>
            <NavLink to="orders" className={styles.a}>
              {({ isActive }) => {
                return (
                  <p
                    className={
                      isActive
                        ? 'text text_type_main-medium text_color_primary'
                        : 'text text_type_main-medium text_color_inactive'
                    }
                  >
                    История заказов
                  </p>
                );
              }}
            </NavLink>
          </div>
          <div className={styles.p_wrapper}>
            <p
              className={`text text_type_main-medium text_color_inactive ${styles.pointer}`}
              onClick={handleExit}
            >
              Выход
            </p>
          </div>
          {logoutFailed && (
            <p className="text text_type_main-small text_color_error">
              Произошла ошибка...
            </p>
          )}
          {logoutRequest && <Preloader />}
          <div className={`mt-20 ${styles.p_last} `}>
            {match ? (
              <p className="text text_type_main-small text_color_inactive">
                В этом разделе вы можете
                <br />
                посмотреть ленту заказов
              </p>
            ) : (
              <p className="text text_type_main-small text_color_inactive">
                В этом разделе вы можете
                <br />
                изменить свои персональные данные
              </p>
            )}
          </div>
        </section>
        <section className={styles.section_right}>
          <Outlet />
        </section>
      </section>
    </main>
  );
};
