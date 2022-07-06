// Framework and third-party non-ui

// App components
import WhereTo from 'components/WhereTo';
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
  return (
    <StyledHero>
      <StyledUser>
        <User />
      </StyledUser>
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
