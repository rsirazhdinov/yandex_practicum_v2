import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import { getIngredients } from '@services/actions/ingredients.js';
import { DELETE_MODAL_DATA } from '@services/actions/modal.js';
import { getItemsReducer } from '@services/reducers/ingredients.js';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger.constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import appStyles from './app.module.css';

function App() {
  const modalData = useSelector((store) => store.modal.data);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [getItemsReducer]);

  const handleCloseModal = () => {
    dispatch({
      type: DELETE_MODAL_DATA,
    });
  };

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={` mb-10 ${appStyles.main_screen}`}>
        <DndProvider backend={HTML5Backend}>
          <section className={appStyles.burger_ingredients}>
            <BurgerIngredients />
          </section>
          <section className={`pt-25 ${appStyles.burger_constructor}`}>
            <BurgerConstructor />
          </section>
        </DndProvider>
      </main>

      {modalData && (
        <Modal header="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
