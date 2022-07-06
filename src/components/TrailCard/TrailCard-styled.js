import styled, { css } from 'styled-components';
import { CalciteCard } from '@esri/calcite-components-react';
import { CalciteChip } from '@esri/calcite-components-react';

const StyledCard = styled(CalciteCard)`
  cursor: pointer;
`;

const StyledCardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: var(--calcite-font-weight-medium);
  margin: 0 0 0.35rem 0;
`;

const StyledCardContent = styled.div`
  padding: 0.5rem 1rem;
`;

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.5rem 0;

  ${(props) =>
    props.large &&
    css`
      margin: 1rem 0;
    `};
`;

const IconWrapper = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 5px;
  padding: 5px;
  margin-inline-end: 0.3rem;
  background: var(--semantic-inactive);
  opacity: 0.25;

  ${(props) =>
    props.isActive &&
    css`
      background: var(--semantic-active);
      opacity: 1;
    `};

  ${(props) =>
    props.large &&
    css`
      width: 1.75rem;
      height: 1.5rem;
    `};

  svg {
    fill: var(--calcite-ui-foreground);
  }
`;

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DistanceWrapper = styled.div`
  margin-inline-start: 1rem;
  svg {
    color: #17231e38;
  }
`;

const ElevationWrapper = styled.div`
  margin-inline-start: 1rem;
  svg {
    color: #17231e38;
  }
`;

const StyledTrailDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  display: flex;
`;

const Title = styled.h2`
  margin: 1rem 0 0.75rem 0;
`;

const ContentWrapper = styled.div`
  margin: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  button {
    margin-inline-start: 0.5rem;
  }
`;

const SubTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledCalciteChip = styled(CalciteChip)`
  align-self: center;
  padding: 0.25rem 1rem;
`;

const StyledCardImage = styled.img`
  display: block;
  max-height: 22rem;
  object-fit: cover;
  width: 100%;
`;

export {
  StyledCard,
  StyledCardTitle,
  StyledCardContent,
  StyledTrailDetails,
  IconsWrapper,
  IconWrapper,
  StatsWrapper,
  DistanceWrapper,
  ElevationWrapper,
  ImageWrapper,
  Title,
  ButtonWrapper,
  ContentWrapper,
  SubTitleWrapper,
  StyledCalciteChip,
  StyledCardImage,
};
