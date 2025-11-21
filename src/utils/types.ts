export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: string;
};

export type TUser = {
  email: string;
  name: string;
};

export type TIngredients = {
  success: boolean;
  data: TIngredient[];
};

export type TAuthToken = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TLogin = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUser;
};

export type TOwner = {
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string;
};

export type TOrder = {
  createdAt: string;
  ingredients: TIngredient[];
  name: string;
  number: number;
  owner: TOwner;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TGetOrder = {
  success: boolean;
  orders: TOrder[];
};

export type TSaveOrder = {
  name: string;
  order: TOrder;
  success: boolean;
};

export type TGetUser = {
  success: boolean;
  user: TUser;
};

export type TLogut = {
  success: boolean;
  message: string;
};

export enum OrderStatus {
  done = 'Выполнен',
  created = 'Создан',
  pending = 'Готовится',
}
