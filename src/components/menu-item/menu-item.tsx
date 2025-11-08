import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';

import menuItemStyles from './menu-item.module.css';

type TIconName = 'burger' | 'list' | 'profile';

declare type TIconTypes = 'secondary' | 'primary' | 'error' | 'success' | 'disabled';

type MenuItemProps = {
  iconName: TIconName;
  iconType: TIconTypes;
  title: string;
  isActive: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function MenuItem({
  iconName,
  iconType,
  title,
  isActive,
}: MenuItemProps): React.JSX.Element {
  return (
    <div className={`p-5 mb-4 mt-4 ml-2 ${menuItemStyles.menu_item}`}>
      <span>{getIconFromName(iconName, iconType)}</span>{' '}
      <p
        className={`text ml-2 text_type_main-default ${isActive ? 'text_color_primary' : 'text_color_inactive'} ${menuItemStyles.title}`}
      >
        {title}
      </p>
    </div>
  );
}

const getIconFromName = (
  iconName: TIconName,
  iconType: TIconTypes
): React.JSX.Element => {
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
