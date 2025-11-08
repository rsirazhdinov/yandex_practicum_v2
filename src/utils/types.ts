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

export type TSaveOrder = {
  orderId: number;
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
