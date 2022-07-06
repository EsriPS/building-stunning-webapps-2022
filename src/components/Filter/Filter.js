// Framework and third-party non-ui

// App components
import FilterSelect from 'components/FilterSelect';

// JSON & Styles
import { StyledFilter, StyledCalciteLabel } from './Filter-styled';

const Filter = () => {
  return (
    <StyledFilter>
      <StyledCalciteLabel layout="inline">
        Difficulty
        <FilterSelect options={difficultyOptions} />
      </StyledCalciteLabel>

      <StyledCalciteLabel layout="inline">
        Distance
        <FilterSelect options={distanceOptions} />
      </StyledCalciteLabel>

      <StyledCalciteLabel layout="inline">
        Elevation Gain
        <FilterSelect options={gainOptions} />
      </StyledCalciteLabel>

      <StyledCalciteLabel layout="inline">
        Trail Type
        <FilterSelect options={typeOptions} />
      </StyledCalciteLabel>
    </StyledFilter>
  );
};

export default Filter;

const difficultyOptions = [
  { value: '0', label: 'Easy' },
  { value: '1', label: 'Medium' },
  { value: '2', label: 'Hard' },
];

const distanceOptions = [
  { value: '0', label: 'Short' },
  { value: '1', label: 'Medium' },
  { value: '2', label: 'Long' },
];

const gainOptions = [
  { value: '0', label: 'A little' },
  { value: '1', label: 'A lot' },
];

const typeOptions = [
  { value: '0', label: 'Paved' },
  { value: '1', label: 'Gravel' },
  { value: '2', label: 'Other' },
];
