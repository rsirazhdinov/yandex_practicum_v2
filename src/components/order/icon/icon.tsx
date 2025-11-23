import { useSelector } from '@/services/hooks';
import { getIngredientById } from '@/services/selectors/ingredients';

import style from './icon.module.css';

//    "_id": "643d69a5c3f7b9001cfa093c",
//             "name": "Краторная булка N-200i",
//             "type": "bun",
//             "proteins": 80,
//             "fat": 24,
//             "carbohydrates": 53,
//             "calories": 420,
//             "price": 1255,
//             "image": "https://code.s3.yandex.net/react/code/bun-02.png",
//             "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
//             "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
//             "__v": 0
//         },

type IIcon = {
  ingredientId: string;
  overSixIngredients?: number;
};
export const Icon = ({ ingredientId, overSixIngredients }: IIcon): React.JSX.Element => {
  const imgObj = useSelector((store) => getIngredientById(store, ingredientId));

  return (
    <div className={style.imgContainer}>
      <img
        className={`${overSixIngredients ? style.halfOpacity : ''} style.img`}
        src={imgObj.image_mobile}
        alt="В составе бургера"
      />
      {overSixIngredients && (
        <div className={style.over}>
          <p className="text text_type_main_default text_color_primary">
            + {overSixIngredients}
          </p>
        </div>
      )}
    </div>
  );
};
