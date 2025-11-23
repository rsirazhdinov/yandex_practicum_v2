// {
//   "success": true,
//   "orders": [
//     {
//       "ingredients": [
//         "60d3463f7034a000269f45e9",
//         "60d3463f7034a000269f45e7"
//       ],
//       "_id": "",
//       "status": "done",
//       "number": 1,
//       "createdAt": "2021-06-23T20:11:01.403Z",
//       "updatedAt": "2021-06-23T20:11:01.406Z"
//     },
//     {
//       "ingredients": [
//         "60d3463f7034a000269f45e9"
//       ],
//       "_id": "",
//       "status": "done",
//       "number": 3,
//       "createdAt": "2021-06-23T20:13:23.654Z",
//       "updatedAt": "2021-06-23T20:13:23.657Z"
//     }
//   ],
//   "total": 2,
//   "totalToday": 2
// }

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  updatedAt: string;
  createdAt: string;
  name: string;
};

export type TFeedAction = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};
