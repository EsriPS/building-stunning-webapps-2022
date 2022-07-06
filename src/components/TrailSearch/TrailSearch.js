// Framework and third-party non-ui
import { useState } from 'react';

// App components

// JSON & Styles
import { StyledTrailSearch, StyledCalcitePopover } from './TrailSearch-styled';

// Third-party components (buttons, icons, etc.)
import { CalciteInput, CalciteList } from '@esri/calcite-components-react';

const TrailSearch = ({ ...rest }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Clear both the search term and results
  const clearSearch = () => {
    setSearchTerm('');
  };

  // Handle Search's user actions
  const onInput = (event) => {
    const value = event.target.value;
    if (!value) {
      return clearSearch();
    }
    if (value === searchTerm) {
      return;
    }
    setSearchTerm(value);
  };

  return (
    <StyledTrailSearch>
      <CalciteInput
        placeholder="Search..."
        onCalciteInputInput={onInput}
        style={{ width: '100%' }}
        value={searchTerm}
        icon="search"
        id="trail-search"
        type="search"
        {...rest}
      ></CalciteInput>
      <StyledCalcitePopover
        reference-element="trail-search"
        placement="bottom-start"
        open={false}
        disable-pointer
      >
        <CalciteList></CalciteList>
      </StyledCalcitePopover>
    </StyledTrailSearch>
  );
};

export default TrailSearch;
