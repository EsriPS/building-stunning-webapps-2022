// Framework and third-party non-ui
import { useContext } from 'react';

// App components
import { UserContext } from 'contexts/UserContext';
import WhereTo from 'components/WhereTo';
import Login from 'components/Login';
import User from 'components/User';

// JSON & Styles
import {
  StyledHero,
  StyledUser,
  StyledHeroContainer,
  StyledHeroTitle,
  StyledH1,
  StyledH2,
} from './Hero-styled';

// Third-party components (buttons, icons, etc.)

const Hero = () => {
  const { ready, userInfo } = useContext(UserContext);

  // Determine whether to render the User component, the Login component, or nothing
  const getUserComponent = () => {
    // Don't render anything until we know whether a user is logged in,
    // this helps avoid a flash of the Login component before ultimately
    // rendering the User component
    if (!ready) return null;

    // If userInfo exists, a user is logged in
    if (ready && userInfo) {
      return <User userInfo={userInfo} />;
    }

    // If the above conditions fail, render the Login component
    return <Login scale="l" />;
  };

  return (
    <StyledHero>
      <StyledUser>{getUserComponent()}</StyledUser>
      <StyledHeroTitle>
        <StyledH1>Discover Colorado</StyledH1>
        <StyledH2>Plan your next outdoor adventure</StyledH2>
      </StyledHeroTitle>
      <StyledHeroContainer>
        <WhereTo />
      </StyledHeroContainer>
    </StyledHero>
  );
};

export default Hero;
