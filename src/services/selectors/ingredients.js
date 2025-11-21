import { createSelector } from 'reselect';

export const getIngredientById = createSelector(
  [(store) => store.ingredients.ingredientsHash, (_, id) => id],
  (ingredientsHash, id) => {
    return (ingredientsHash && ingredientsHash[id]) || {};
  }
);
