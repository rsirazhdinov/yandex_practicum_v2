import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import appStyles from './price.module.css';

type IPrice = {
  price: number;
};
export const Price = ({ price }: IPrice): React.JSX.Element => {
  return (
    <div className={`${appStyles.priceContainer}`}>
      <p className="mr-1 text text_type_digits-default text_color_primary">{price}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
};
