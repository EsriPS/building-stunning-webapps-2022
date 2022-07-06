// Framework and third-party non-ui

// App components
import TrailDifficulty from './common/TrailDifficulty';
import { getRandomImage } from 'data/images';
import { getSlope } from 'utils/utils';

// JSON & Styles
import {
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
} from './TrailCard-styled';

// Third-party components (buttons, icons, etc.)
import {
  CalciteButton,
  CalciteIcon,
  CalciteLoader,
} from '@esri/calcite-components-react';
import { Biking, Dog, Hiking, Horse, Road, Vehicle } from 'icons/icons';

const TrailDetails = ({ trail }) => {
  if (!trail) {
    return <CalciteLoader active />;
  }

  const {
    FID,
    access,
    atv,
    bike,
    dogs,
    hiking,
    horse,
    length_mi_,
    name,
    type,
  } = trail;

  const slope = getSlope(trail);

  const isHikingAllowed = () => {
    return hiking !== 'no';
  };

  const isBikingAllowed = () => {
    return bike !== 'no';
  };

  const isHorseAllowed = () => {
    return horse !== 'no';
  };

  const isDogAllowed = () => {
    return dogs !== 'no';
  };

  const isAtvAllowed = () => {
    return atv !== 'no';
  };

  const getAccess = (access) => {
    if (access === ' ') {
      return (
        <StyledCalciteChip color="green" appearance="clear">
          Year-round
        </StyledCalciteChip>
      );
    }

    return <StyledCalciteChip color="yellow">{access}</StyledCalciteChip>;
  };

  return (
    <StyledTrailDetails>
      <ImageWrapper>
        <StyledCardImage src={getRandomImage()} />
      </ImageWrapper>
      <ContentWrapper>
        <SubTitleWrapper>
          {getAccess(access)}
          <ButtonWrapper>
            <CalciteButton
              appearance="outline"
              style={{ marginRight: '0.5rem' }}
            >
              Directions
            </CalciteButton>
            <CalciteButton appearance="outline">Hotels</CalciteButton>
          </ButtonWrapper>
        </SubTitleWrapper>

        <Title>{name}</Title>

        <StatsWrapper>
          <TrailDifficulty slope={slope} />
          <DistanceWrapper>
            <CalciteIcon icon="measure-line" scale="m" /> {length_mi_}mi
          </DistanceWrapper>
          <ElevationWrapper>
            <CalciteIcon icon="altitude" scale="m" />
            {slope.toFixed(1)}%
          </ElevationWrapper>
        </StatsWrapper>

        <IconsWrapper large>
          <IconWrapper large isActive={isHikingAllowed()}>
            <Hiking key={`hiking-${FID}`} />
          </IconWrapper>
          <IconWrapper large isActive={type === 'Road'}>
            <Road key={`road-${FID}`} />
          </IconWrapper>
          <IconWrapper large isActive={isBikingAllowed()}>
            <Biking key={`biking-${FID}`} />
          </IconWrapper>
          <IconWrapper large isActive={isHorseAllowed()}>
            <Horse key={`horse-${FID}`} />
          </IconWrapper>
          <IconWrapper large isActive={isDogAllowed()}>
            <Dog key={`dog-${FID}`} />
          </IconWrapper>
          <IconWrapper large isActive={isAtvAllowed()}>
            <Vehicle key={`atv-${FID}`} />
          </IconWrapper>
        </IconsWrapper>
      </ContentWrapper>
    </StyledTrailDetails>
  );
};

export default TrailDetails;
