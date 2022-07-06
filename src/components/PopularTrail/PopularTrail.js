// Framework and third-party non-ui
import { Link } from 'react-router-dom';

// App components

// JSON & Styles
import trails from './trails.json';
import {
  StyledPopularTrail,
  StyledCalciteCard,
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
      <StyledCalciteCard>
        <StyledThumbnail src={trail.photo} alt={trail.name} />
        <>
          <StyledCardTitle>{trail.name}</StyledCardTitle>
          <StyledCardDescription>{trail.description}</StyledCardDescription>
          <Link
            // style={{ width: "100%" }}
            to={`/details/${trail.id}`}
          >
            <CalciteButton width="full" scale="l">
              Check it Out
            </CalciteButton>
          </Link>
        </>
      </StyledCalciteCard>
    </StyledPopularTrail>
  );
};

export default PopularTrail;
