// Framework and third-party non-ui

// App components
import TrailCard from 'components/TrailCard';

// JSON & Styles

// Third-party components (buttons, icons, etc.)
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const getItemSize = (index) => 140;

const TrailsList = () => {
  const Row = ({ index, style }) => {
    return <TrailCard style={style} excludeImage={true} />;
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          width={width}
          height={height}
          itemCount={25}
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
