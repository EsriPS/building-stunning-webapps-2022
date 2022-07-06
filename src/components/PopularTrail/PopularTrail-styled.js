import styled from "styled-components";

import { CalciteCard } from "@esri/calcite-components-react";

const StyledPopularTrail = styled.div`
  justify-self: center;
`;

const StyledThumbnail = styled.img`
  width: 100%;
`;

const StyledCardTitle = styled.h3`
  margin: 0.5rem 0;
  font-size: 1.25rem;
  color: var(--calcite-ui-text-2);
  font-weight: var(--calcite-font-weight-medium);
`;

const StyledCardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
  color: var(--calcite-ui-text-3);
`;

const StyledCalciteCard = styled(CalciteCard)`
  max-width: 400px;
`;

export {
  StyledPopularTrail,
  StyledThumbnail,
  StyledCardTitle,
  StyledCardDescription,
  StyledCalciteCard,
};

