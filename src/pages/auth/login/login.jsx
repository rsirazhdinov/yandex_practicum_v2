import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { login } from '@services/actions/auth.js';

import styles from '../auth.module.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const dispatch = useDispatch();
  const loginRequest = useSelector((store) => store.auth.loginRequest);
  const loginFailed = useSelector((store) => store.auth.loginFailed);

  const handleButtonClick = () => {
    dispatch(
      login({
        email,
        password,
      })
    );
  };

  return (
    <main className={styles.main}>
      <section className={styles.section_content}>
        <section className={styles.section_inputs}>
          <p className=" mt-10 text text_type_main-medium">Вход</p>
          <EmailInput
            disabled={loginRequest}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            name={'email'}
            checkValid={(isValid) => setIsEmailValid(isValid)}
          />
          <PasswordInput
            disabled={loginRequest}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            name={'email'}
            checkValid={(isValid) => setIsPasswordValid(isValid)}
          />
          <Button
            disabled={!isEmailValid || !isPasswordValid || loginRequest}
            htmlType="button"
            type="primary"
            size="medium"
            onClick={handleButtonClick}
          >
            Войти
          </Button>
          {loginFailed && (
            <p className="text text_type_main-small text_color_error">
              Произошла ошибка...
            </p>
          )}

          {loginRequest && <Preloader />}
        </section>
        <section className={styles.section_footer}>
          <p className={`text text_type_main-small text_color_inactive`}>
            Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link>
          </p>
          <p className={`text text_type_main-small text_color_inactive`}>
            Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
          </p>
        </section>
      </section>
    </main>
  );
};
