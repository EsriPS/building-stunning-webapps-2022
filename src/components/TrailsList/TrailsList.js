// Framework and third-party non-ui
import { useContext } from 'react';

// App components
import TrailCard from 'components/TrailCard';
import { MapContext } from 'contexts/MapContext';

// JSON & Styles

// Third-party components (buttons, icons, etc.)
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { CalciteLoader } from '@esri/calcite-components-react';

const getItemSize = (index) => 140;

const TrailsList = () => {
  const { featureList, setSelection } = useContext(MapContext);

  if (!featureList.length) return <CalciteLoader active />;

  const Row = ({ index, style }) => {
    const attributes = featureList[index].attributes;
    return (
      <TrailCard
        style={style}
        attributes={attributes}
        setSelection={setSelection}
        excludeImage={true}
      />
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          width={width}
          height={height}
          itemCount={featureList.length}
          itemSize={getItemSize}
          estimatedItemSize={140}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
};

export default TrailsList;
