// Framework and third-party non-ui
import { useContext, useEffect, useMemo, useRef } from 'react';

// App components
import MapLoader from './MapLoader';
import { MapContext } from 'contexts/MapContext';

// JSON & Styles
import { StyledMap } from './Map-styled';

// Third-party components (buttons, icons, etc.)

const Map = () => {
  const { ready, selection, setContainer } = useContext(MapContext);

  const ref = useRef();

  useMemo(() => {
    if (selection) {
      // If the selected feature changes (in MapContext), call
      const filter = async () => {
        const { filterMapData } = await import('data/map');
        filterMapData([selection.attributes['FID']]);
      };
      filter();
    }
  }, [selection]);

  useEffect(() => {
    ref.current && setContainer(ref.current);
  }, [ref, setContainer]);

  return (
    <>
      {!ready ? <MapLoader /> : null}
      <StyledMap ref={ref}></StyledMap>
    </>
  );
};

export default Map;
