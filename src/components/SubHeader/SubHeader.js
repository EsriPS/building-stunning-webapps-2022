// Framework and third-party non-ui
import { Routes, Route } from 'react-router-dom';

// App components
import Filter from 'components/Filter';

// JSON & Styles
import { StyledSubHeader } from './SubHeader-styled';
import TrailActions from 'components/TrailActions';

// Third-party components (buttons, icons, etc.)

const SubHeader = () => {
  return (
    <StyledSubHeader>
      <Routes>
        <Route path="/details/:id" element={<TrailActions />} />
        <Route path="/details" element={<Filter />} />
      </Routes>
    </StyledSubHeader>
  );
};

export default SubHeader;
