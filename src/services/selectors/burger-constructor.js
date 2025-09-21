import { createSelector } from 'reselect';

export const getTotalPrice = createSelector(
  [
    (store) => store.burgerConstructor.bun,
    (store) => store.burgerConstructor.ingredients,
  ],
  (bun, ingredients) => {
    let price = 0;
    if (bun) {
      price += bun.price * 2;
    }
    if (ingredients?.length > 0) {
      price += ingredients.reduce((sum, item) => sum + item.price, 0);
    }
    return price;
  }
);

export const getCount = createSelector(
  [
    (store) => store.burgerConstructor.bun,
    (store) => store.burgerConstructor.ingredients,
    (_, ingredient) => ingredient,
  ],
  (bun, ingredients, ingredient) => {
    if (ingredient.type === 'bun') {
      return ingredient?._id === bun?._id ? 2 : 0;
    } else {
      return ingredients?.filter((item) => item._id === ingredient._id).length;
    }
  }
);
