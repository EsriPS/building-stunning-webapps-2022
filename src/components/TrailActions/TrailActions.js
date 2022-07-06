// Framework and third-party non-ui

// App components

// JSON & Styles
import { StyledTrailActions } from './TrailActions-styled';

// Third-party components (buttons, icons, etc.)
import { CalciteButton } from '@esri/calcite-components-react';

const TrailActions = () => {
  return (
    <StyledTrailActions>
      <CalciteButton appearance="transparent" href="/details">
        All Trails
      </CalciteButton>
    </StyledTrailActions>
  );
};

export default TrailActions;
