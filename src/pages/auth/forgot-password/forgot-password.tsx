import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { passwordForgot } from '@utils/api.js';

import styles from '@pages/auth/auth.module.css';

export const ForgotPassword = (): React.JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('resetPassword')) {
      navigate('/reset-password');
    }
  }, []);
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    passwordForgot({
      email,
    })
      .then(() => {
        localStorage.setItem('resetPassword', String(true));
        navigate('/reset-password');
      })
      .catch((e: string) => setError(e))
      .finally(() => setIsLoading(false));
  };
  return (
    <main className={styles.main}>
      <section className={styles.section_content}>
        <form className={styles.section_inputs} onSubmit={handleSubmitForm}>
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
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Восстановить
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
