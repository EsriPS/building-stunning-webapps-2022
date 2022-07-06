// Framework and third-party non-ui

// App components

// JSON & Styles

// Third-party components (buttons, icons, etc.)
import { CalciteButton } from '@esri/calcite-components-react';

const Login = ({ ...rest }) => {
  const attemptLogin = async () => {
    console.log('attempt login');
  };

  return (
    <CalciteButton onClick={attemptLogin} {...rest}>
      Login
    </CalciteButton>
  );
};

export default Login;
