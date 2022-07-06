// Framework and third-party non-ui

// App components
import TrailDifficulty from './common/TrailDifficulty';
import { getSlope } from 'utils/utils';

// JSON & Styles
import {
  StyledCard,
  StyledCardTitle,
  StyledCardContent,
  IconsWrapper,
  IconWrapper,
  StatsWrapper,
  DistanceWrapper,
  ElevationWrapper,
} from './TrailCard-styled';

import dummyFeature from 'utils/dummyFeature';

// Third-party components (buttons, icons, etc.)
import { CalciteIcon } from '@esri/calcite-components-react';
import { Biking, Dog, Hiking, Horse, Road, Vehicle } from 'icons/icons';

export default function TrailCard({
  style,
  attributes = dummyFeature.attributes,
  setSelection,
}) {
  const slope = getSlope(attributes);

  const isHikingAllowed = () => {
    return attributes.hiking !== 'no';
  };

  const isBikingAllowed = () => {
    return attributes.bike !== 'no';
  };

  const isHorseAllowed = () => {
    return attributes.horse !== 'no';
  };

  const isDogAllowed = () => {
    return attributes.dogs !== 'no';
  };

  const isAtvAllowed = () => {
    return attributes.atv !== 'no';
  };

  const handleOnClick = async () => {
    console.log('trail clicked', attributes);
  };

  return (
    <StyledCard style={style} onClick={handleOnClick}>
      <StyledCardContent>
        <StyledCardTitle>{attributes.name}</StyledCardTitle>
        <IconsWrapper>
          <IconWrapper isActive={isHikingAllowed()}>
            <Hiking key={`hiking-${attributes.FID}`} />
          </IconWrapper>
          <IconWrapper isActive={attributes.type === 'Road'}>
            <Road key={`road-${attributes.FID}`} />
          </IconWrapper>
          <IconWrapper isActive={isBikingAllowed()}>
            <Biking key={`biking-${attributes.FID}`} />
          </IconWrapper>
          <IconWrapper isActive={isHorseAllowed()}>
            <Horse key={`horse-${attributes.FID}`} />
          </IconWrapper>
          <IconWrapper isActive={isDogAllowed()}>
            <Dog key={`dog-${attributes.FID}`} />
          </IconWrapper>
          <IconWrapper isActive={isAtvAllowed()}>
            <Vehicle key={`atv-${attributes.FID}`} />
          </IconWrapper>
        </IconsWrapper>
        <StatsWrapper>
          <TrailDifficulty slope={slope} />
          <DistanceWrapper>
            <CalciteIcon icon="measure-line" scale="m" />
            {attributes.length_mi_}mi
          </DistanceWrapper>
          <ElevationWrapper>
            <CalciteIcon icon="altitude" scale="m" />
            {slope.toFixed(1)}%
          </ElevationWrapper>
        </StatsWrapper>
      </StyledCardContent>
    </StyledCard>
  );
}
