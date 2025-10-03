import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { patchUser } from '@services/actions/auth.js';

import styles from './profile-edit.module.css';

export const ProfileEdit = () => {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');

  const patchUserRequest = useSelector((store) => store.auth.patchUserRequest);
  const patchUserFailed = useSelector((store) => store.auth.patchUserFailed);

  const resetForm = () => {
    setName(user.name);
    setEmail(user.email);
    setPassword('');
  };

  const handleSave = () => {
    console.log('handleSave');
    dispatch(
      patchUser({
        name,
        email,
        password,
      })
    );
  };

  return (
    <>
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
      />
      <Input
        disabled={patchUserRequest}
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Логин"
        value={email}
        name={'Имя'}
        icon={'EditIcon'}
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
      {(name !== user.name || email !== user.email || password) && (
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
            htmlType="button"
            type="primary"
            size="medium"
            onClick={handleSave}
          >
            Сохранить
          </Button>
        </section>
      )}
      {patchUserFailed && (
        <p className="text text_type_main-small text_color_error">Произошла ошибка...</p>
      )}
      {patchUserRequest && <Preloader />}
    </>
  );
};
