import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { passwordForgot } from '@utils/api.js';

import styles from '@pages/auth/auth.module.css';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('resetPassword')) {
      navigate('/reset-password');
    }
  }, []);
  const handleClickButton = () => {
    setIsLoading(true);
    setError('');
    passwordForgot({
      email,
    })
      .then(() => {
        localStorage.setItem('resetPassword', true);
        navigate('/reset-password');
      })
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  };
  return (
    <main className={styles.main}>
      <section className={styles.section_content}>
        <section className={styles.section_inputs}>
          <p className=" mt-10 text text_type_main-medium">Восстановление пароля</p>
          <EmailInput
            disabled={isLoading}
            placeholder="Укажите e-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            name={'email'}
            isIcon={false}
            checkValid={(isValid) => setIsEmailValid(isValid)}
          />
          <Button
            disabled={!isEmailValid || isLoading}
            htmlType="button"
            type="primary"
            size="medium"
            onClick={handleClickButton}
          >
            Восстановить
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
