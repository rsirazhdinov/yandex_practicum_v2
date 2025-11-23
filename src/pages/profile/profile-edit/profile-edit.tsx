import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

import { patchUser } from '@services/actions/auth.js';

import { useDispatch, useSelector } from '../../../services/hooks';

import type { FormEvent } from 'react';
import type React from 'react';

import styles from './profile-edit.module.css';

export const ProfileEdit = (): React.JSX.Element => {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const [name, setName] = useState<string>(user?.name || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [password, setPassword] = useState<string>('');

  const patchUserRequest = useSelector((store) => store.auth.patchUserRequest);

  const patchUserFailed = useSelector((store) => store.auth.patchUserFailed);

  const resetForm = (): void => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPassword('');
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(
      patchUser({
        name,
        email,
        password,
      })
    );
  };

  return (
    <form onSubmit={handleSubmitForm} className={styles.form}>
      <Input
        disabled={patchUserRequest}
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Имя"
        value={name}
        name={'Имя'}
        icon={'EditIcon'}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
      <Input
        disabled={patchUserRequest}
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Логин"
        value={email}
        name={'Логин'}
        icon={'EditIcon'}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
      <PasswordInput
        disabled={patchUserRequest}
        placeholder="Пароль"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        name={'email'}
        icon={'EditIcon'}
      />
      {(name !== user?.name || email !== user.email || password) && (
        <section className={styles.button_box}>
          <Button
            disabled={patchUserRequest}
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={resetForm}
          >
            Отмена
          </Button>
          <Button
            disabled={patchUserRequest}
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
        </section>
      )}
      {patchUserFailed && (
        <p className="text text_type_main-small text_color_error">Произошла ошибка...</p>
      )}
      {patchUserRequest && <Preloader />}
    </form>
  );
};
