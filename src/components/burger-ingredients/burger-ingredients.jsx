import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { ingredientTypeArray } from '../../utils/burger-types';
import BurgerCategory from '../burger-category/burger-category';

import styles from './burger-ingredients.module.css';

export default function BurgerIngredients() {
  const [current, setCurrent] = React.useState('bun');
  const ingredients = useSelector((store) => store?.ingredients?.ingredients);

  const ingredientsRequest = useSelector(
    (store) => store.ingredients.ingredientsRequest
  );
  const ingredientsFailed = useSelector((store) => store.ingredients.ingredientsFailed);

  const refNav = useRef(null);
  const refBun = useRef(null);
  const refSauce = useRef(null);
  const refMain = useRef(null);

  const bun = ingredients?.filter((item) => item.type === 'bun');
  const sauce = ingredients?.filter((item) => item.type === 'sauce');
  const main = ingredients?.filter((item) => item.type === 'main');

  useEffect(() => {
    if (current) {
      document.getElementById(current)?.scrollIntoView();
    }
  }, [current]);

  const handleScroll = () => {
    const { bottom } = refNav.current.getBoundingClientRect();
    const { top: topBun } = refBun.current.getBoundingClientRect();
    const { top: topSauce } = refSauce.current.getBoundingClientRect();
    const { top: topMain } = refMain.current.getBoundingClientRect();
    const distanceBun = Math.abs(bottom - topBun);
    const distanceSauce = Math.abs(bottom - topSauce);
    const distanceMain = Math.abs(bottom - topMain);
    if (distanceBun < distanceSauce) {
      if (distanceBun < distanceMain) {
        setCurrent('bun');
      } else {
        setCurrent('main');
      }
    } else {
      if (distanceSauce < distanceMain) {
        setCurrent('sauce');
      } else {
        setCurrent('main');
      }
    }
  };

  return (
    <section className={styles.container}>
      <p className=" mt-10 text text_type_main-large">Соберите бургер</p>
      <nav ref={refNav} className={`mt-5 ${styles.nav_box}`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </nav>
      <section
        className={`${styles.burger_category_box} mt-10 mb-6`}
        onScroll={handleScroll}
      >
        {ingredientsRequest && (
          <p className="mb-15 text text_type_main-medium">Загрузка...</p>
        )}
        {ingredientsFailed && (
          <p className="mb-15 text text_type_main-medium">
            Во время загрузки произошла ошибка...
          </p>
        )}
        {!ingredientsRequest && !ingredientsFailed && (
          <>
            <BurgerCategory
              ref={refBun}
              key="bun"
              ingredients={bun}
              title="Булки"
              titleId="bun"
            />
            <BurgerCategory
              ref={refSauce}
              key="sauce"
              ingredients={sauce}
              title="Соусы"
              titleId="sauce"
            />
            <BurgerCategory
              ref={refMain}
              key="main"
              ingredients={main}
              title="Начинки"
              titleId="main"
            />
          </>
        )}
      </section>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: ingredientTypeArray,
  handleOpenModal: PropTypes.func.isRequired,
};
