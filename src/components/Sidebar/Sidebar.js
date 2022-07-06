// Framework and third-party non-ui
import { Routes, Route } from 'react-router-dom';

// App components
import { TrailDetails } from 'components/TrailCard';

// JSON & Styles
import { StyledSidebar } from './Sidebar-styled';

// Third-party components (buttons, icons, etc.)
import TrailsList from 'components/TrailsList';

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Routes>
        <Route path="/details/:id" element={<TrailDetails />} />
        <Route path="/details" element={<TrailsList />} />
      </Routes>
    </StyledSidebar>
  );
};

export default Sidebar;
