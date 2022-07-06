import styled from 'styled-components';
import { CalciteLoader } from '@esri/calcite-components-react';

const StyledSidebar = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledCalciteLoader = styled(CalciteLoader)`
  margin-top: 4rem;
`;

export { StyledSidebar, StyledCalciteLoader };
