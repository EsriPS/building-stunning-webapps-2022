import styled from 'styled-components';
import { CalciteLabel } from '@esri/calcite-components-react';

const StyledFilter = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCalciteLabel = styled(CalciteLabel)`
  margin-right: 1.5rem;
  margin-bottom: -0.5rem;
`;

export { StyledFilter, StyledCalciteLabel };
