import styled from 'styled-components';

import {
  CalcitePopoverManager,
  CalcitePopover,
} from '@esri/calcite-components-react';

const StyledTrailSearch = styled(CalcitePopoverManager)`
  display: flex;
  width: 100%;
`;

const StyledCalcitePopover = styled(CalcitePopover)`
  max-height: 300px;
  width: 100%;
  overflow: auto;
`;

export { StyledTrailSearch, StyledCalcitePopover };
