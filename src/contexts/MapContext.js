/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';

import { webmapId } from 'constants/map';

import { when } from '@arcgis/core/core/reactiveUtils';

export const MapContext = createContext();

const MapContextProvider = (props) => {
  const match = useMatch('/details/:fid');
  const isDetailsPage = useMatch('/details');
  const navigate = useNavigate();
  const [mapView, setMapView] = useState(null);
  const [container, setContainer] = useState(null);
  const [selection, setSelection] = useState(null);
  const [ready, setReady] = useState(false);
  const [featureList, setFeatureList] = useState([]);

  const routeFid = match && match.params.fid;

  // call right away
  useMemo(() => {
    const init = async () => {
      const { initWebMap } = await import('data/map');
      initWebMap(webmapId);
    }
   init();
  }, []);

  // call initView when the mapView is ready, and set the selection if its in the route
  useEffect(() => {
    const init = async () => {
      const { initView } = await import('data/map');
      if (container) {
        const view = await initView(container);
        setMapView(view);
      }
      setReady(true);
    };
    init();
  }, [container]);

  // Update the selected trail when the fid in the route changes
  useEffect(() => {
    if (mapView) {
      if (routeFid) {
        const updateSelection = async function () {
          await mapView.when();
          const { getTrailFeature } = await import('data/map');
          const feature = await getTrailFeature(routeFid);
          setSelection(feature);
        };
        updateSelection();
      } else {
        setSelection(null);
      }
    }
  }, [mapView, routeFid]);

  // Update the route fid when the selection changes
  useEffect(() => {
    if (!isDetailsPage) return;
    if (selection && selection.attributes) {
      navigate(`/details/${selection.attributes.FID}`);
    }
  }, [selection, navigate]);

  useEffect(() => {
    when(
      () => mapView?.stationary,
      async () => {
        const { fetchTrailsInExtent } = await import('data/map');
        const trails = await fetchTrailsInExtent();

        // If trails is undefined, abort
        if (!trails) {
          console.log('no trails!', trails);
          return;
        }

        setFeatureList(trails);
      }
    );
  }, [mapView]);

  return (
    <MapContext.Provider
      value={{
        selection,
        setSelection,
        featureList,
        mapView,
        setFeatureList,
        setContainer,
        ready,
      }}
    >
      {props.children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
