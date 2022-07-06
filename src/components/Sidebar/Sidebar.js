// Framework and third-party non-ui
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

// App components
import { MapContext } from 'contexts/MapContext';
import { TrailDetails } from 'components/TrailCard';

// JSON & Styles
import { StyledSidebar, StyledCalciteLoader } from './Sidebar-styled';

// Third-party components (buttons, icons, etc.)
import TrailsList from 'components/TrailsList';

const Sidebar = () => {
  const { ready, selection } = useContext(MapContext);

  const getLoadingIndicator = () => {
    return <StyledCalciteLoader sizeRatio={1.5} text="Loading..." />;
  };

  if (!ready) {
    return getLoadingIndicator();
  }

  return (
    <StyledSidebar>
      <Routes>
        <Route
          path="/details/:id"
          element={<TrailDetails trail={selection && selection.attributes} />}
        />
        <Route path="/details" element={<TrailsList />} />
      </Routes>
    </StyledSidebar>
  );
};

export default Sidebar;
