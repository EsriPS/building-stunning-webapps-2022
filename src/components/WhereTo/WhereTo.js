// Framework and third-party non-ui

// App components
import TrailSearch from 'components/TrailSearch';

// JSON & Styles
import {
  StyledWhereTo,
  StyledQuickLinksContainer,
  StyledH2,
} from './WhereTo-styled';

// Third-party components (buttons, icons, etc.)

const WhereTo = () => {
  const getQuickLinks = () => {
    const places = [
      { name: 'Denver', location: {} },
      { name: 'Aspen', location: {} },
      { name: 'Boulder', location: {} },
      { name: 'Steamboat Springs', location: {} },
      { name: 'Winter Park', location: {} },
    ];

    return places.map((place) => (
      <span key={place.name}>
        <a href="/">{place.name}</a>
        <>&nbsp;|&nbsp;</>
      </span>
    ));
  };

  return (
    <StyledWhereTo>
      <StyledH2>Where to?</StyledH2>
      <TrailSearch />
      <StyledQuickLinksContainer>{getQuickLinks()}</StyledQuickLinksContainer>
    </StyledWhereTo>
  );
};

export default WhereTo;
