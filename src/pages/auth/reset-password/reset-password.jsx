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

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password');
    }
  }, []);
  const handleClickButton = () => {
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
        <section className={styles.section_inputs}>
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
          />
          <Button
            disabled={!isPasswordValid || !token || isLoading}
            htmlType="button"
            type="primary"
            size="medium"
            onClick={handleClickButton}
          >
            Сохранить
          </Button>
          {error && (
            <p className="text text_type_main-small text_color_error">{error}</p>
          )}

          {isLoading && <Preloader />}
        </section>
        <p className={`text text_type_main-small text_color_inactive`}>
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </section>
    </main>
  );
};
