import { createSelector } from 'reselect';

import type { RootState } from '../store';
export const createAppSelector = createSelector.withTypes<RootState>();

export const getIngredientById = createAppSelector(
  [
    (store): typeof store.ingredients.ingredientsHash =>
      store.ingredients.ingredientsHash,
    (_, id): typeof id => id,
  ],
  (ingredientsHash, id) => {
    return (ingredientsHash && ingredientsHash[id]) || {};
  }
);
