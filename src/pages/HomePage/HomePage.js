// Framework and third-party non-ui

// App components
import Hero from 'components/Hero';
import PopularTrail from 'components/PopularTrail';

// JSON & Styles
import { HomePageLayout, PopularTrailsContainer } from './HomePage-styled';

// Third-party components (buttons, icons, etc.)

const HomePage = () => {
  return (
    <HomePageLayout>
      <Hero />
      <PopularTrailsContainer>
        <PopularTrail id={0} />
        <PopularTrail id={1} />
        <PopularTrail id={2} />
      </PopularTrailsContainer>
    </HomePageLayout>
  );
};

export default HomePage;
