// Framework and third-party non-ui
import { Link } from 'react-router-dom';

// App components
import User from 'components/User';
import TrailSearch from 'components/TrailSearch';
import Breakpoint from 'App/Breakpoint';
import Routes from 'constants/routes';

// JSON & Styles
import {
  StyledHeader,
  StyledH1,
  SearchWrapper,
  UserWrapper,
} from './Header-styled';

// Third-party components (buttons, icons, etc.)
import { CalciteIcon } from '@esri/calcite-components-react';

const Header = () => {
  return (
    <StyledHeader>
      <SearchWrapper>
        <TrailSearch />
      </SearchWrapper>
      <StyledH1>
        <Breakpoint name="desktop">
          <Link to={Routes.Home}>Discover Colorado</Link>
        </Breakpoint>
      </StyledH1>
      <UserWrapper>
        <Breakpoint name="phone">
          <CalciteIcon icon="layer-basemap" scale="l" />
        </Breakpoint>
        <User />
      </UserWrapper>
    </StyledHeader>
  );
};

export default Header;
