// Framework and third-party non-ui
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

// App components
import { init, suggest, search } from './TrailSearchController';
import { MapContext } from 'contexts/MapContext';
import { getTrailFeature } from 'data/map';

// JSON & Styles
import { StyledTrailSearch, StyledCalcitePopover } from './TrailSearch-styled';

// Third-party components (buttons, icons, etc.)
import {
  CalciteInput,
  CalciteIcon,
  CalciteList,
  CalciteListItem,
} from '@esri/calcite-components-react';

const TrailSearch = ({ ...rest }) => {
  const { mapView, setSelection } = useContext(MapContext);
  const [vm, setVm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // When the mapView is loaded from context, create a SearchViewModel
  useEffect(() => {
    async function loadVM() {
      const vm = await init({ view: mapView });
      setVm(vm);
    }
    if (mapView) {
      loadVM();
    }
  }, [mapView]);

  // When the search term changes, ask the view model for suggestions
  useEffect(() => {
    async function getSuggestions() {
      const suggestions = await suggest({
        vm,
        value: debouncedSearchTerm,
      });
      setResults(suggestions);
    }
    if (vm && debouncedSearchTerm) {
      getSuggestions();
    }
  }, [vm, debouncedSearchTerm]);

  // Clear both the search term and results
  const clearSearch = () => {
    setSearchTerm('');
    setTimeout(setResults([]), 500);
  };

  const getIcon = (source) => {
    switch (source) {
      case 'Trail':
        return 'walking';
      case 'Trailhead':
        return 'car';
      case 'Place':
        return 'pin';
      default:
        return 'globe';
    }
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

  const onItemSelect = async (event) => {
    const value = event.target.value;

    // Call the SearchViewModel's search method
    const result = await search({ vm, value });

    if (result.results[0].source.layer) {
      // If the result was from the Trails layer...

      // Get the FID from the search result
      const fid = result.results[0].results[0].feature.attributes['FID'];

      // Get the full feature object from the layer
      const feature = await getTrailFeature(fid);

      // Set the selected feature in MapContext
      setSelection(feature);
    } else {
      // If the result was from the locator...

      // Get the extent and call the map view's goTo() method
      const extent = result.results[0].results[0].extent;
      mapView.goTo(extent);
    }

    clearSearch();

    // Update the route
    navigate('/details');
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
        open={results.length}
        disable-pointer
      >
        <CalciteList>
          {results.map((item) => {
            return (
              <CalciteListItem
                onClick={onItemSelect}
                key={item.key}
                value={item.suggestResult}
                label={item.text}
                description={item.source}
              >
                <CalciteIcon slot="content-start" icon={getIcon(item.source)} />
              </CalciteListItem>
            );
          })}
        </CalciteList>
      </StyledCalcitePopover>
    </StyledTrailSearch>
  );
};

export default TrailSearch;
