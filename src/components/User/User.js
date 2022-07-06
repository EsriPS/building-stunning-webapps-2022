// Framework and third-party non-ui

// App components
import Login from 'components/Login';
import { signOut } from 'data/oauth';

// JSON & Styles
import { StyledUser } from './User-styled';

// Third-party components (buttons, icons, etc.)
import {
  CalciteAvatar,
  CalciteDropdown,
  CalciteDropdownItem,
} from '@esri/calcite-components-react';

const User = ({ userInfo }) => {
  const getAvatar = ({ userInfo, size, ...rest }) => {
    const { fullName, thumbnailUrl } = userInfo.user;
    return (
      <CalciteAvatar
        thumbnail={thumbnailUrl}
        fullName={fullName}
        scale="l"
        {...rest}
      />
    );
  };

  const getUser = () => {
    // Display Login if user isn't logged in yet
    if (!userInfo) {
      return <Login />;
    }

    return (
      <CalciteDropdown overlay-positioning="fixed">
        {getAvatar({
          userInfo,
          style: {
            cursor: 'pointer',
            backgroundColor: '#675CAB',
          },
          slot: 'dropdown-trigger',
        })}

        <CalciteDropdownItem onClick={signOut} left-start="sign-out">
          Logout
        </CalciteDropdownItem>
      </CalciteDropdown>
    );
  };

  return <StyledUser>{getUser()}</StyledUser>;
};

export default User;
