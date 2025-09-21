import { useSelector } from 'react-redux';

import { ingredientType } from '../../utils/burger-types';

import ingredientDetailsStyles from './ingredient-details.module.css';

export default function IngredientDetails() {
  const ingredient = useSelector((store) => store?.modal?.data);
  return (
    <div className={ingredientDetailsStyles.modal_content}>
      <img
        className="mb-4"
        src={ingredient?.image_large}
        alt={'Изображение ингредиента' + ingredient?.name}
      />
      <p className="mb-8 text text_type_main-medium">{ingredient?.name}</p>
      <div className={`mb-15 ${ingredientDetailsStyles.compound}`}>
        <div className={ingredientDetailsStyles.compound_item}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient?.calories}
          </p>
        </div>
        <div className={ingredientDetailsStyles.compound_item}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient?.proteins}
          </p>
        </div>
        <div className={ingredientDetailsStyles.compound_item}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient?.fat}
          </p>
        </div>
        <div className={ingredientDetailsStyles.compound_item}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient?.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientType,
};
