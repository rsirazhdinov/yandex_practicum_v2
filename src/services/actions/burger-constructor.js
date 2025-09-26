export const ADD_ITEM_CONSTRUCTOR = 'ADD_ITEM_CONSTRUCTOR';
export const DELETE_ITEM_CONSTRUCTOR = 'DELETE_ITEM_CONSTRUCTOR';
export const MOVE_ITEM_CONSTRUCTOR = 'MOVE_ITEM_CONSTRUCTOR';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const addItemConstructor = (item) => ({
  type: ADD_ITEM_CONSTRUCTOR,
  payload: { ...item, id: getRandomInt(1, 10000) },
});
