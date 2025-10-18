import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerConstructor from '@components/burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '@components/burger-ingredients/burger-ingredients.jsx';

import appStyles from '@components/app/app.module.css';

export const Home = () => {
  return (
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
  );
};
