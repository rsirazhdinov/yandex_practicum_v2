import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import menuItemStyles from './menu-item.module.css';

export default function MenuItem({ iconName, iconType, title, isActive }) {
  return (
    <div className={`p-5 mb-4 mt-4 ml-2 ${menuItemStyles.menu_item}`}>
      <span className={menuItemStyles.icon}>{getIconFromName(iconName, iconType)}</span>{' '}
      <p
        className={`text ml-2 text_type_main-default ${isActive ? '' : 'text_color_inactive'} ${menuItemStyles.title}`}
      >
        {title}
      </p>
    </div>
  );
}

MenuItem.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

const getIconFromName = (iconName, iconType) => {
  switch (iconName) {
    case 'burger':
      return <BurgerIcon type={iconType} />;
    case 'list':
      return <ListIcon type={iconType} />;
    case 'profile':
      return <ProfileIcon type={iconType} />;
    default:
      return <></>;
  }
};
