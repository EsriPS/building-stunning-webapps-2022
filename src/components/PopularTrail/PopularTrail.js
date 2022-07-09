// Framework and third-party non-ui
import { Link } from 'react-router-dom';

// App components

// JSON & Styles
import trails from './trails.json';
import {
  StyledPopularTrail,
  StyledCard,
  StyledThumbnail,
  StyledCardTitle,
  StyledCardDescription,
} from './PopularTrail-styled';

// Third-party components (buttons, icons, etc.)
import { CalciteButton } from '@esri/calcite-components-react';

const PopularTrail = ({ id }) => {
  const trail = trails[id];

  return (
    <StyledPopularTrail>
      <StyledCard>
        <StyledThumbnail src={trail.photo} alt={trail.name} />
        <>
          <StyledCardTitle>{trail.name}</StyledCardTitle>
          <StyledCardDescription>{trail.description}</StyledCardDescription>
          <Link to={`/details/${trail.id}`}>
            <CalciteButton width="full" scale="l">
              Check it Out
            </CalciteButton>
          </Link>
        </>
      </StyledCard>
    </StyledPopularTrail>
  );
};

export default PopularTrail;
