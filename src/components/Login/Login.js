// Framework and third-party non-ui
import { useContext } from 'react';

// App components
import { signIn } from 'data/oauth';
import { UserContext } from 'contexts/UserContext';

// JSON & Styles

// Third-party components (buttons, icons, etc.)
import { CalciteButton } from '@esri/calcite-components-react';

const Login = ({ ...rest }) => {
  const { setUserInfo, oauthInfo } = useContext(UserContext);

  const attemptLogin = async () => {
    try {
      const userInfo = await signIn(oauthInfo);
      setUserInfo(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CalciteButton onClick={attemptLogin} {...rest}>
      Login
    </CalciteButton>
  );
};

export default Login;
