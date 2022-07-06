// App components
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Map from 'components/Map';

// JSON & Styles
import {
  MapPageLayout,
  ContentWrapper,
  SidebarWrapper,
  MapWrapper,
} from './MapPage-styled';

// Third-party components (buttons, icons, etc.)

const MapPage = () => {
  // eslint-disable-next-line no-unused-vars
  return (
    <MapPageLayout>
      <Header />
      <ContentWrapper>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
        <MapWrapper>
          <Map />
        </MapWrapper>
      </ContentWrapper>
    </MapPageLayout>
  );
};

export default MapPage;
