// Framework and third-party non-ui
import { useState } from 'react';

// App components

// JSON & Styles
import { StyledFilterSelect } from './FilterSelect-styled';

// Third-party components (buttons, icons, etc.)
import { CalciteSelect, CalciteOption } from '@esri/calcite-components-react';

const FilterSelect = ({ options }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleMultiSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  };

  return (
    <StyledFilterSelect>
      <CalciteSelect
        onCalciteSelectChange={handleMultiSelectChange}
        value={selectedValue}
        scale="s"
      >
        {options.map((option) => (
          <CalciteOption
            value={option.value}
            key={option.value}
            selected={option.value === selectedValue}
          >
            {option.label}
          </CalciteOption>
        ))}
      </CalciteSelect>
    </StyledFilterSelect>
  );
};

export default FilterSelect;
