import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { passwordReset } from '@utils/api.js';

import styles from '@pages/auth/auth.module.css';

export const ResetPassword = (): React.JSX.Element => {
  const [password, setPassword] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password');
    }
  }, []);
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    passwordReset({
      password,
      token,
    })
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate('/login');
      })
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  };
  return (
    <main className={styles.main}>
      <section className={styles.section_content}>
        <form className={styles.section_inputs} onSubmit={handleSubmitForm}>
          <p className=" mt-10 text text_type_main-medium">Восстановление пароля</p>
          <PasswordInput
            disabled={isLoading}
            placeholder="Введите новый пароль"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            name={'password'}
            checkValid={(isValid) => setIsPasswordValid(isValid)}
          />
          <Input
            disabled={isLoading}
            type="text"
            onChange={(e) => {
              setToken(e.target.value);
            }}
            placeholder="Введите код из письма"
            value={token}
            name={'token'}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Button
            disabled={!isPasswordValid || !token || isLoading}
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
          {error && (
            <p className="text text_type_main-small text_color_error">{error}</p>
          )}

          {isLoading && <Preloader />}
        </form>
        <p className={`text text_type_main-small text_color_inactive`}>
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </section>
    </main>
  );
};
