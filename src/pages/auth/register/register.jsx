import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import {
  Input,
  EmailInput,
  Button,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '@services/actions/auth.js';

import styles from '../auth.module.css';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const dispatch = useDispatch();
  const registerRequest = useSelector((store) => store.auth.registerRequest);
  const registerFailed = useSelector((store) => store.auth.registerFailed);
  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(
      register({
        name,
        email,
        password,
      })
    );
  };

  return (
    <main className={styles.main}>
      <section className={styles.section_content}>
        <form className={styles.section_inputs} onSubmit={handleSubmitForm}>
          <p className=" mt-10 text text_type_main-medium">Регистрация</p>
          <Input
            disabled={registerRequest}
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
            value={name}
            name={'Имя'}
          />
          <EmailInput
            disabled={registerRequest}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={'email'}
            checkValid={(isValid) => setIsEmailValid(isValid)}
          />
          <PasswordInput
            disabled={registerRequest}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={'email'}
            checkValid={(isValid) => setIsPasswordValid(isValid)}
          />
          <Button
            disabled={!name || !isEmailValid || !isPasswordValid || registerRequest}
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Зарегистрироваться
          </Button>
          {registerFailed && (
            <p className="text text_type_main-small text_color_error">
              Произошла ошибка...
            </p>
          )}

          {registerRequest && <Preloader />}
        </form>
        <p className={`text text_type_main-small text_color_inactive`}>
          Уже зарегистрированы <a href="/">Войти</a>
        </p>
      </section>
    </main>
  );
};
