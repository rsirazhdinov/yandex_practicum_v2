import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { login } from '@services/actions/auth.js';

import { useDispatch, useSelector } from '../../../services/hooks';

import styles from '../auth.module.css';

export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const dispatch = useDispatch();
  const loginRequest = useSelector((store) => store.auth.loginRequest);
  const loginFailed = useSelector((store) => store.auth.loginFailed);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

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
        <form className={styles.section_inputs} onSubmit={handleSubmitForm}>
          <p className=" mt-10 text text_type_main-medium">Вход</p>
          <EmailInput
            data-testid="email_input"
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
            data-testid="password_input"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            name={'email'}
            checkValid={(isValid) => setIsPasswordValid(isValid)}
          />
          <Button
            disabled={!isEmailValid || !isPasswordValid || loginRequest}
            type="primary"
            size="medium"
            htmlType="submit"
            data-testid="login_submit"
          >
            Войти
          </Button>
          {loginFailed && (
            <p className="text text_type_main-small text_color_error">
              Произошла ошибка...
            </p>
          )}

          {loginRequest && <Preloader />}
        </form>
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
