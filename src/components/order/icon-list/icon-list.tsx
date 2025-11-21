import { Icon } from '../icon/icon';

import style from './icon-list.module.css';

type TIconList = {
  ingredients: string[];
};
export const IconList = ({ ingredients }: TIconList): React.JSX.Element => {
  const overSixIngredients = (index: number): number =>
    index == 5 ? ingredients.length - 6 : 0;
  return (
    <div className={style.iconListContainer}>
      {ingredients &&
        ingredients.slice(0, 6).map((value, index) => {
          return (
            <div key={index} className={style.item} style={{ zIndex: 100 - index }}>
              <Icon
                overSixIngredients={overSixIngredients(index)}
                ingredientId={value}
              />
            </div>
          );
        })}
    </div>
  );
};
