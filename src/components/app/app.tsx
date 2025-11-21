import { ModalFeed } from '@/pages/modal-feed/modal-feed';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { ProtectedRoute } from '@components/protected-route/protected-route.jsx';
import { ForgotPassword } from '@pages/auth/forgot-password/forgot-password.jsx';
import { Login } from '@pages/auth/login/login.jsx';
import { Register } from '@pages/auth/register/register.jsx';
import { ResetPassword } from '@pages/auth/reset-password/reset-password.jsx';
import { Home } from '@pages/home/home.jsx';
import { Ingredient } from '@pages/ingredient/ingredient.jsx';
import { ModalIngredient } from '@pages/modal-ingredient/modal-ingredient.jsx';
import { NotFound404 } from '@pages/not-found-404/not-found-404.jsx';
import { OrderFeed } from '@pages/order-feed/order-feed.jsx';
import { Orders } from '@pages/profile/orders/orders.jsx';
import { ProfileEdit } from '@pages/profile/profile-edit/profile-edit.jsx';
import { Profile } from '@pages/profile/profile.jsx';
import { checkUserAuth } from '@services/actions/auth.js';
import { getIngredients } from '@services/actions/ingredients.js';
import { getItemsReducer } from '@services/reducers/ingredients.js';

import { useDispatch } from '../../services/hooks';
import AppHeader from '../app-header/app-header';
import { BurgerOrderDetail } from '../burger-order-detail/burger-order-detail';

import appStyles from './app.module.css';

function App(): React.JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

  const state = location.state;

  React.useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [getItemsReducer]);

  // const handleCloseModal = () => {
  //   dispatch({
  //     type: DELETE_MODAL_DATA,
  //   });
  // };

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<ProtectedRoute onlyUnAuth component={<Register />} />}
        />
        <Route
          path="/login"
          element={<ProtectedRoute onlyUnAuth component={<Login />} />}
        />
        <Route
          path="/forgot-password"
          element={<ProtectedRoute onlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<ProtectedRoute onlyUnAuth component={<ResetPassword />} />}
        />
        <Route path="/ingredient/:id" element={<Ingredient />} />
        <Route path="/feed/:number" element={<BurgerOrderDetail />} />

        <Route path="*" element={<NotFound404 />} />

        <Route path="/profile" element={<ProtectedRoute component={<Profile />} />}>
          <Route index element={<ProtectedRoute component={<ProfileEdit />} />} />
          <Route path="orders" element={<ProtectedRoute component={<Orders />} />} />
        </Route>
        <Route path="/profile/orders/:number" element={<BurgerOrderDetail />} />
        <Route path="/feed" element={<OrderFeed />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredient/:id" element={<ModalIngredient />} />
          <Route path="/feed/:number" element={<ModalFeed />} />
          <Route path="/profile/orders/:number" element={<ModalFeed />} />
        </Routes>
      )}

      {/*{modalData && (*/}
      {/*  <Modal header="Детали ингредиента" onClose={handleCloseModal}>*/}
      {/*    <IngredientDetails/>*/}
      {/*  </Modal>*/}
      {/*)}*/}
    </div>
  );
}

export default App;
