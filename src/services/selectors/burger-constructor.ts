import { createSelector } from 'reselect';

import type { RootState } from '../store';
export const createAppSelector = createSelector.withTypes<RootState>();

export const getTotalPrice = createAppSelector(
  [
    (store): typeof store.burgerConstructor.bun => store.burgerConstructor.bun,
    (store): typeof store.burgerConstructor.ingredients =>
      store.burgerConstructor.ingredients,
  ],
  (bun, ingredients) => {
    let price = 0;
    if (bun) {
      price += bun.price * 2;
    }
    if (ingredients?.length > 0) {
      price += ingredients.reduce((sum: number, item) => sum + item.price, 0);
    }
    return price;
  }
);

export const getCount = createAppSelector(
  [
    (store): typeof store.burgerConstructor.bun => store.burgerConstructor.bun,
    (store): typeof store.burgerConstructor.ingredients =>
      store.burgerConstructor.ingredients,
    (_, ingredient): typeof ingredient => ingredient,
  ],
  (bun, ingredients, ingredient) => {
    if (ingredient.type === 'bun') {
      return ingredient?._id === bun?._id ? 2 : 0;
    } else {
      return ingredients?.filter((item) => item._id === ingredient._id).length;
    }
  }
);
