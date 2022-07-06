import { geocodeUrl } from 'constants/map';

const init = async ({ view }) => {
  const { default: SearchViewModel } = await import('@arcgis/core/widgets/Search/SearchViewModel');

  const vm = new SearchViewModel({
    view,
    // TODO: I turned off "By Address" in the webmap settings, but World Geocoder is still in default sources...
    includeDefaultSources: true,
    sources: [
      {
        url: geocodeUrl,
        singleLineFieldName: 'SingleLine',
        name: 'Colorado Search',
        placeholder: 'Search Colorado',
        maxResults: 3,
        maxSuggestions: 6,
        minSuggestCharacters: 0,
      },
    ],
    goToOverride: () => {
      // Don't call view.goTo()
      return null;
    },
  });

  return vm;
};

const suggest = async ({ vm, value }) => {
  // Use the SearchViewModel to get suggestions
  const suggestResponse = await vm.suggest(value);

  // Create a lookup for our sources
  const sourceNameLookup = {};
  vm.allSources.forEach((source, i) => {
    sourceNameLookup[i] = abbrevSourceName[source.name];
  });

  // Flatten results into a single array
  let allResults = [];
  suggestResponse.results.forEach(({ results }) => {
    allResults = [...allResults, ...results];
  });

  // Format results before returning to TrailSearch component
  const formattedResults = allResults.map((suggestResult) => {
    return {
      text: suggestResult.text,
      key: `${suggestResult.key}_${suggestResult.sourceIndex}`,
      source: sourceNameLookup[suggestResult.sourceIndex],
      suggestResult,
    };
  });

  return formattedResults;
};

const search = async ({ vm, value }) => {
  // Make sure the Trail Search
  // returns all fields for custom popup
  vm.allSources.forEach((source, i) => {
    if (source.layer && source.layer.title === 'Trails') {
      source.outFields = ['*'];
    }
  });
  const searchResponse = await vm.search(value);
  return searchResponse;
};

const abbrevSourceName = {
  'Trails: name': 'Trail',
  'Trailheads: name': 'Trailhead',
  'ArcGIS World Geocoding Service': 'Place',
  'Colorado Search': 'Place',
};

export { init, suggest, search };
